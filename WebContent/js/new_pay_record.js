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
                console.log(result);
                var rest_result = JSON.parse(result.rest_result);
                if(rest_result&& rest_result.projects){
                    $.each(rest_result.projects,function(index,obj){
                        $('#project').append(
                            '<option value="'+obj.id+'" selected="selected">'+obj.name+'</option>'
                        );
                    });
                }

                if(rest_result&& rest_result.banks){
                    $.each(rest_result.banks,function(index,obj){
                        if(obj.defaultAccount){
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'" checked="checked"  style="height: 16px;width: 16px; position: relative;top: 3px;">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'</label>'
                            );
                        }else{
                            $('#banklist').append(
                                '<label><input type="radio" name="bankselect" value="'+obj.id+'"   style="height: 16px;width: 16px; position: relative;top: 3px;">'+obj.bankName+'|开户行:'+obj.bankOfDeposit+'|户名:'+obj.accountName+'|账号:'+obj.account+'|用途:'+obj.purposeName+'</label>'
                            );
                        }

                    });

                    $("input[name='bankselect']").change(function(){
                        var selected = $(this).val();
                        $.each(rest_result.banks,function(index,obj){
                            if(obj.id==selected){

                            }
                        });
                    });
                }


            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    }


}