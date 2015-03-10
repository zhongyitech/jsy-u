$(document).ready(function(){


    VIEWDATA.init(true);


});

var VIEWDATA={
    oldSelectData:null,
    oldSelectedProjectId:null,
    projects:{},
    payRecords:{},
    init: function(){
        this.init_view();

    },

    init_view: function(){
        var me = this;


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

        $("#stopDate").change(function(){
            //var stopDate = $("#stopDate").val();
            console.log("ddd");
        });

        $("input[name='target_type']").change(function(){
            me.countRemainMoney();
        });



    },

    countRemainMoney: function () {
        var me = this;
        var paytotal = $("#paytotal").val();
        paytotal = STRINGFORMAT.toNumber(paytotal);
        paytotal = $.trim(paytotal);
        if(!paytotal || paytotal=="" || paytotal=="0"){
            return;
        }

        var targets = [];
        var checkBoxs = $("input[name='target_type']:checkbox:checked");
        $.each(checkBoxs,function(index,obj){
            targets.push($(obj).val());
        });
        if(targets.length==0){
            return;
        }

        var payRecords = [];
        var checkBoxs2 = $("input[name='pay_checkbox']:checkbox:checked");
        $.each(checkBoxs2,function(index,obj){
            payRecords.push(me.payRecords[$(obj).val()]);
        });
        if(payRecords.length==0){
            return;
        }


        //开始扣钱
        $.each(payRecords,function(index,payRecord){
            $.each(targets,function(index2,target){
                if("main_money"==target){
                    paytotal= paytotal-payRecord["amount"];
                }else if("manage_money"==target){
                    paytotal= paytotal-payRecord["manage_pay"];
                }else if("community_money"==target){
                    paytotal= paytotal-payRecord["community_pay"];
                }else if("interest_money"==target){
                    paytotal= paytotal-payRecord["interest_pay"];
                }else if("over_money"==target){
                    paytotal= paytotal-payRecord["over_interest_pay"];
                }else if("penalty_money"==target){
                    paytotal= paytotal-payRecord["penalty_pay"];
                }else if("borrow_money"==target){
                    paytotal= paytotal-payRecord["borrow_pay"];
                }
            });
        });

        $("#remain_money").val(paytotal);

    },

    loadPayRecords: function(projectid){
        var me = this;
        var params = JSON.stringify({ projectid: projectid});
        var data = { url: '/api/payRecord/loadPayRecordsByProject',params:params};
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                me.setTable(result);

                $("input[name='pay_checkbox']").change(function(){
                    me.countRemainMoney();
                    console.log($(this).val());
                });

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


        var table = $("#pay_records_table");

        if (table && items) {
            me.payRecords = {};     // reset
            for (var i in items) {
                me.payRecords[items[i]["id"]]=items[i];

                var row = $("<tr></tr>");
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
            }
        }

    },
    load_projectinfos: function(fundid){
        console.log("loading fundinfo:"+fundid);
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
                var rest_result = JSON.parse(result.rest_result);
                if(rest_result&& rest_result.projects){
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
                    me.loadPayRecords(projectid);
                    me.reloadLabelRate(me.projects[projectid]);
                }


                if(rest_result&& rest_result.banks){
                    $.each(rest_result.banks,function(index,obj){
                        if(obj.defaultAccount){
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'" checked="checked"  style="height: 16px;width: 16px; position: relative;top: 3px;">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'</label><br>'
                            );
                        }else{
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'"   style="height: 16px;width: 16px; position: relative;top: 3px;">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'</label><br>'
                            );
                        }

                    });

                    //$("input[name='bankselect']").change(function(){
                    //    var selected = $(this).val();
                    //    $.each(rest_result.banks,function(index,obj){
                    //        if(obj.id==selected){
                    //
                    //        }
                    //    });
                    //});
                }


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
                    window.location.href = "projectinfo.jsp?id="+me.projectid;
                }

            },
            error: function(result){
                console.log(result);
                alert('提交时错误:'+result.responseText);
            }
        });
    }

}