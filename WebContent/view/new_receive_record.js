
$(document).ready(function(){
    VIEWDATA.init(true);


});

var VIEWDATA={

    init: function(sync){
        this.init_view();
        this.init_event();
    },

    init_view: function(){


    },

    init_event: function(){
        var me = this;

        $('#fundname').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/fund/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#fundid").val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $("#fundid").val("");
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


        $('#projectname').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/project/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#projectid").val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $("#projectid").val("");
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
        });


        $("#add-record").click(function(){
            var fundid = $("#fundid").val();
            var projectid = $("#projectid").val();
            var receiveDate = $("#date").val();
            var amount = MONEYFORMAT.toNumber($("#otal").val());

            var payTargets ="";
            $('input[name=receiveType]:checked').each(function(){
                payTargets += ($(this).val()+",")
            });


            var model = {
                receiveDate:DATEFORMAT.toRest(receiveDate),
                amount:amount,
                payTargets:payTargets,
                project:projectid,
                fund:fundid
            };
            me.add_receive_record(model);
        });



    },
    add_receive_record: function(model){
        console.log("model:",JSON.stringify(model));

        var me = this;
        var data = {url: '/api/receiveRecord/create', entity: JSON.stringify(model)};
        console.log(data);
        var me = this;
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
                    console.log("relaod page...");
                    //window.location.href = "project_list.jsp";
                }

            },
            error: function(result){
                isAllSuc = false;
                if(LOGIN.error(result)){
                    return;
                }
                alert('提交时错误.');
            }
        });
    }
}