$(document).ready(function(){


    VIEWDATA.init(true);


});

var VIEWDATA={

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
                    me.load_projectinfos(suggestion.data);
                },
                transformResult: function (response) {
                    //clear old value
                    $("#fundname").val("");
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
        var params = JSON.stringify({ startposition: me.page_start, pagesize: me.page_size, queryparam: me.filter_keyword });
        ///api/commissionInfo/addPayment?jsonStr=
        var data = { url: '/api/commissionInfo/addPayment', entity: JSON.stringify(items[i]) };
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.length>0){
                    $.each(result,function(index,obj){
                        $("#company").append(
                            '<option value="'+obj.id+'">'+obj.companyName+'</option>'
                        );
                    });

                }

            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    }


}