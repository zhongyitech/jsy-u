$(document).ready(function(){


    VIEWDATA.init(true);


});

var VIEWDATA={
    oldSelectData:null,
    init: function(){
        this.init_view();

    },

    init_view: function(){
        var me = this;

        $("#paydate").val(me.formatDate());

        $("#paytotal").keyup(function(){
            $(this).val(STRINGFORMAT.toYuan($(this).val()));
        });

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

        $("#add_pay_record").click(function(){
            var fundid = $("#_fundname").val();
            var project = $("#project").val();
            var paydate = $("#paydate").val();
            var d=new Date(Date.parse(paydate.replace(/-/g,"/")));
            var curDate=new Date();
            if(d >=curDate) {
                alert("付款日期不能选择未来的时间！");
                return;
            }

            var paytotal = STRINGFORMAT.toNumber($("#paytotal").val());
            if(!paytotal || paytotal<=0){
                alert("请输入金额！");
                return;
            }

            var moneyUseType = $('input[name="moneyUseType"]:radio:checked').val();
            var bankselect = $('input[name="bankselect"]:radio:checked').val();

            var model = {
                fundid:fundid,
                project:project,
                paydate:paydate,
                paytotal:paytotal,
                moneyUseType:moneyUseType,
                bankselect:bankselect
            };

            me.post_complete('/api/payRecord/add_pay_record', model);
        });
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
                console.log(result);
                var rest_result = result.rest_result;
                if(rest_result&& rest_result.projects){
                    $.each(rest_result.projects,function(index,obj){
                        //selected="selected"
                        $('#project').append(
                            '<option value="'+obj.id+'" >'+obj.name+'</option>'
                        );
                    });
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
                    window.location.href = "new_pay_record.jsp";
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