$(document).ready(function(){


    VIEWDATA.init(true);


});

var VIEWDATA={
    oldSelectData:null,             //缓存基金字段选择的id
    oldSelectedProjectId:null,      //缓存项目字段选择的id
    projects:{},                    //缓存项目下拉列表记录
    //project:null,                 =》  me.projects[me.projectid]
    payRecords:{},                  //缓存汇款记录
    init: function(){
        this.init_view();

    },

    init_view: function(){
        var me = this;

        $("#paydate").val(me.formatDate());

        $('#fundname').autocomplete(
            {
                serviceUrl: '../rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/fund/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    $("#fundname").val(suggestion.value);
                    $("#_fundname").val(suggestion.data);
                    if(me.oldSelectData!=suggestion.data){
                        me.oldSelectData=suggestion.data
                        me.load_projectinfos(suggestion.data);
                    }
                },
                transformResult: function (response) {
                    console.log(response);
                    //clear old value
                    $("#fundname").val("");
                    $("#_fundname").val("");
                    if (!response || response == '') {
                        return {
                            "query": "Unit",
                            "suggestions": []
                        };
                    } else {
                        var result = JSON.parse(response);
                        var suggestions = JSON.parse(result.suggestions);
                        result.suggestions = suggestions;
                        return result;
                    }
                }
            });


        $("#paytotal").keyup(function(){
            $(this).val(STRINGFORMAT.toYuan($(this).val()));
            me.countRemainMoney();
        });

        $('#project').change(function(){
            var projectid = $('#project').val();
            if(projectid){
                if(projectid != me.oldSelectedProjectId){
                    me.loadPayRecords(projectid);
                    me.oldSelectedProjectId=projectid;
                }
            }
        });

        $("#stopDate").blur(function(){
            var stopDate = $("#stopDate").val();

            var payRecords = [];
            var checkBoxs2 = $("input[name='pay_checkbox']:checkbox:checked");
            $.each(checkBoxs2,function(index,obj){
                payRecords.push(me.payRecords[$(obj).val()]);
            });
            if(payRecords.length!=1){
                return;
            }
            var payRecord = me.payRecords[1];
            var label_interest_type = $("#label_interest_type").html();
            var over_money = me.getOverDue(payRecord,label_interest_type,stopDate);
            $("#over_money_test").val(over_money);

        });

        $("input[name='target_type']").change(function(){
            me.countRemainMoney();
        });

        $("#add_receive").click(function(){
            var remain_money = $("#remain_money").val();


            var fundid = $("#_fundname").val();
            var projectid = $("#project").val();
            var paydate = $("#paydate").val();
            var paytotal = STRINGFORMAT.toNumber($("#paytotal").val());
            var bankid = $("input[name='bankselect'][type='radio']:checked").val();


            if(!fundid || !projectid){
                alert("请正确录入数据");
                return false;
            }

            if(!paydate || paytotal=="" || paytotal<0){
                if(parseFloat(remain_money)<=0){
                    alert("请输入收款金额或者保证余额大于零");
                    return false;
                }else{
                    paytotal = 0;
                }
            }

            //应收款的数据结构
            var receiveDetail_struct = [];
            $("input[name='shouldReceiveCheckbox'][type='checkbox']:checked").each(function(){
                //payid1_targetoriginal
                var compositeid = $(this).attr("id");
                //var splitids = compositeid.split("_");
                //var payid = splitids[0].replace("payid","");
                //var target = splitids[1].replace("target","");
                //receiveDetail_struct.push({payid:payid,target:target});
                receiveDetail_struct.push(compositeid);
            });

            if(receiveDetail_struct.length == 0){
                alert("请选择应收款项！");
                return false;
            }

            var model = {
                fundid:fundid,
                projectid:projectid,
                paydate:paydate,
                paytotal:paytotal,
                bankid:bankid,
                receiveDetail_struct:receiveDetail_struct,
                remain_money_suggest:remain_money
            };

            var params = JSON.stringify(model);
            var data = {url: '/api/receiveRecord/add_receive_record', entity: params};
            $.io.post(data).success(function(result){
                window.location.href = "new_receive_record.jsp";
            }).error(function(result){
                console.log(result);
                alert('提交时错误:'+result.msg);
            });


        });



    },


    getOverDue: function(payRecord,label_interest_type,stopDate){
        var project = this.projects[this.projectid]
        var owe_money = payRecord.amount - payRecord.payMainBack;
        var over_days = stopDate - payRecord.lastDate;
        var over_interest_pay;

        //不利用缓存了，麻烦，直接搞
        if("单利"==label_interest_type){
            over_interest_pay = (owe_money * project.interest_per * over_days / 365);
        }else if("复利"==label_interest_type){
            over_interest_pay = (owe_money * (1+project.interest_per) * over_days / 365);
        }else if("日复利"==label_interest_type){
            over_interest_pay=(owe_money * (1+project.interest_per) / 365);  //第一天
            for(var i=1;i<over_days;i++){//第二天起
                over_interest_pay += (over_interest_pay * (1+project.interest_per) / 365);
            }
        }
        return over_interest_pay;
    },

    countRemainMoney: function () {
        var me = this;
        var paytotal = $("#paytotal").val();
        paytotal = STRINGFORMAT.toNumber(paytotal);
        if(!paytotal || paytotal=="" || paytotal<0){
            if(parseFloat(remain_money)<=0){
                return;
            }else{
                paytotal = 0;
            }
        }

        var bankid = $("input[name='bankselect'][type='radio']:checked").val();
        if(!bankid){
            return;
        }
        var bankOverReceive = parseFloat($("#bankOverReceive_"+bankid).val());
        $("#remain_money").val(bankOverReceive+paytotal);


        //看table的li选中情况
        paytotal = this.countRemainMoneyByDomain(parseFloat(paytotal));

        $("#remain_money").val(paytotal);
    },

    countRemainMoneyByDomain: function (paytotal) {
        var me = this;

        var payRecords = [];
        var checkBoxs2 = $("input[name='shouldReceiveCheckbox']:checkbox:checked");
        $.each(checkBoxs2,function(index,obj){
            paytotal= paytotal-parseFloat($(obj).val());
        });


        var bankid = $("input[name='bankselect'][type='radio']:checked").val();
        var bankidOverReceive= parseFloat($("#bankOverReceive_"+bankid).val());
        paytotal = paytotal + bankidOverReceive*1;

        return paytotal;

    },

    loadPayRecords: function(projectid){
        var me = this;
        var params = JSON.stringify({ projectid: projectid});
        var data = { url: '/api/payRecord/loadPayRecordsByProject',params:params};
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                me.setTable(result);

                $("input[name='pay_checkbox']").change(function(){
                    //clear old record
                    if($(this).is(':checked')){
                        me.appendShouldPayInfo($(this).val(),$(this).closest('tr'));
                    }else{
                        var tr = $(this).closest('tr').next("tr");
                        if(tr.attr("id")=="tr"+$(this).val()){
                            tr.remove();
                        }
                    }
                });

            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    },
    appendShouldPayInfo: function(payRecordId, targetTr){
        var me = this;
        var params = JSON.stringify({ payRecordId: payRecordId});
        var data = { url: '/api/receiveRecord/shouldReceiveDetail',params:params};
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result&& result.rest_result){
                    var rest_result = JSON.parse(result.rest_result)
                    var tr = $('<tr id="tr'+payRecordId+'">');
                    $(targetTr).after(tr);
                    var td = $('<td colspan="10" align="left">');
                    $(tr).append(td);
                    $.each(rest_result,function(index,obj){
                        var checkbox = $('<input id="'+obj.id+'" name="shouldReceiveCheckbox" type="checkbox" value="'+obj.amount+'" style="height: 16px;width: 16px; position: relative;top: 3px;">');
                        td.append(checkbox);
                        var cn_change = "";
                        if(obj.target=="original"){
                            cn_change = "应再收本金";
                        }else if(obj.target=="maintain"){
                            cn_change = "应再收管理费";
                        }else if(obj.target=="channel"){
                            cn_change = "应再收渠道费";
                        }else if(obj.target=="firstyear"){
                            cn_change = "应再收年利息费";
                        }else if(obj.target=="borrow"){
                            cn_change = "应再收借款费";
                        }else if(obj.target=="penalty"){
                            cn_change = "应再收违约费";
                        }else if(obj.target=="overdue"){
                            cn_change = "应再收逾期费";
                        }
                        td.append(cn_change+':'+obj.amount);

                        checkbox.click(function(){
                            me.countRemainMoney();
                        });
                    });
                }
            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    },
    setTable: function (items) {
        var me =  this;
        var pacts = $("#pay_records_table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        var pacts2 = $("#pay_records_table2 tr");
        if (pacts2 && pacts2.length) {
            for (var i = 1; i < pacts2.length; i++) {
                $(pacts2[i]).remove();
            }
        }


        var table = $("#pay_records_table");
        var table2 = $("#pay_records_table2");

        if (table && items) {
            me.payRecords = {};             // reset
            for (var i in items) {
                me.payRecords[items[i]["id"]]=items[i];

                var row = $("<tr></tr>");
                if(items[i]["payType"]=="invest"){
                    table.append(row);
                    row.append('<td><input type="checkbox" name="pay_checkbox" value="'+items[i]["id"]+'"/></td>');
                    row.append('<td>' + items[i]["id"] + '</td>');
                    row.append('<td>' + items[i]["payDate"] + '</td>');
                    row.append('<td>' + items[i]["amount"] + '</td>');
                    row.append('<td>' + items[i]["manage_pay"] + '</td>');
                    row.append('<td>' + items[i]["community_pay"] + '</td>');
                    row.append('<td>' + items[i]["penalty_pay"] + '</td>');
                    row.append('<td>' + items[i]["interest_pay"] + '</td>');
                    row.append('<td>' + items[i]["borrow_pay"] + '</td>');
                    row.append('<td>' + items[i]["dateCount"] + '</td>');
                }else{
                    table2.append(row);
                    row.append('<td><input type="checkbox" name="pay_checkbox" value="'+items[i]["id"]+'"/></td>');
                    row.append('<td>' + items[i]["id"] + '</td>');
                    row.append('<td>' + items[i]["payDate"] + '</td>');
                    row.append('<td>' + items[i]["amount"] + '</td>');
                    row.append('<td>' + items[i]["penalty_pay"] + '</td>');
                    row.append('<td>' + items[i]["borrow_pay"] + '</td>');
                    row.append('<td>' + items[i]["over_interest_pay"] + '</td>');
                    row.append('<td>' + items[i]["dateCount"] + '</td>');

                }





            }
        }

    },
    load_projectinfos: function(fundid){
        var me = this;
        var params = JSON.stringify({ id: fundid});
        var data = { url: '/api/fundCompanyInformation/findByFund', params: params };
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                //clear old data
                me.clearPageData();

                //load new data
                var rest_result = result.rest_result;//JSON.parse(result.rest_result);
                if(rest_result && rest_result.projects){
                    me.projects = {}; // reset
                    $.each(rest_result.projects,function(index,obj){
                        me.projects[obj.id]=obj;
                        $('#project').append(
                            '<option value="'+obj.id+'" >'+obj.name+'</option>'
                        );
                    });
                }

                var projectid = $('#project').val();
                if(projectid){
                    me.projectid=projectid;
                    me.loadPayRecords(projectid);
                    me.reloadLabelRate(me.projects[projectid]);
                }


                if(rest_result&& rest_result.banks){
                    $.each(rest_result.banks,function(index,obj){
                        if(obj.defaultAccount){
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'" checked="checked"  style="height: 16px;width: 16px; position: relative;top: 3px;"><input id="bankOverReceive_'+obj.id+'" type="hidden" value="'+obj.overReceive+'">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'|收款余额:'+obj.overReceive+'</label><br>'
                            );
                        }else{
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'"   style="height: 16px;width: 16px; position: relative;top: 3px;"><input id="bankOverReceive_'+obj.id+'" type="hidden" value="'+obj.overReceive+'">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'|收款余额:'+obj.overReceive+'</label><br>'
                            );
                        }

                    });
                }


                //加载完毕银行账户后，设置剩余余额为收款余额
                var bankid = $("input[name='bankselect'][type='radio']:checked").val();
                $("#remain_money").val($("#bankOverReceive_"+bankid).val());
                $("input[name='bankselect'][type='radio']").change(function(){
                    console.log($("input[name='bankselect'][type='radio']:checked").val());
                });
            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    },

    reloadLabelRate:function(project){
        if(!project)return;
        $("#label_manage_per").html(project.manage_per);
        $("#label_community_per").html(project.community_per);
        $("#label_penalty_per").html(project.penalty_per);
        $("#label_borrow_per").html(project.borrow_per);
        $("#label_interest_per").html(project.interest_per);
        if("singleCount"==project.interestType){
            $("#label_interest_type").html("单利");
        }else if("costCount"==project.interestType){
            $("#label_interest_type").html("复利");
        }else if("dayCount"==project.interestType){
            $("#label_interest_type").html("日复利");
        }
    },
    clearPageData:function(project){
        $("#label_manage_per").html("");
        $("#label_community_per").html("");
        $("#label_penalty_per").html("");
        $("#label_borrow_per").html("");
        $("#label_interest_per").html("");
        $("#label_interest_type").html("");

        var pacts = $("#pay_records_table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        $("#project").empty();

    },
    post_complete: function(url, model){
        var me = this;
        var data = {url: url, entity: JSON.stringify(model)};



        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "200"){
                    me.result = result;
                    window.location.href = "new_receive_record.jsp";
                }

            },
            error: function(result){
                console.log(result);
                alert('提交时错误:'+result.responseText);
            }
        });
    },


    formatDate: function (){
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        return year + "-" + month + "-" + date;
    }

}