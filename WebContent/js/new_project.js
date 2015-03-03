
$(document).ready(function(){
    VIEWDATA.init(true);

});

var VIEWDATA={

    init: function(sync){
        this.init_view();
        this.init_event();
    },

    init_view: function(){
        $("#creatorName").val(LOGIN.getUser().chainName);
        $("#creator").val(LOGIN.getUser().id);


    },

    init_event: function(){
        var me = this;
        $("#add-project").click(function(){
            var projectname = $("#projectname").val();
            var incharger = $("#incharger").val();
            var inchargerName = $("#inchargerName").val();
            var creator = $("#creator").val();
            var description = $("#description").val();

            me.add_project({
                "name":projectname,
                projectOwner:incharger,
                creator:LOGIN.getUser().id,
                ownerName:inchargerName,
                creatorName:LOGIN.getUser().chainName,
                pdesc:description
            });
            //window.location.href = "project_list.jsp"
        });

        $('#inchargerName').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/user/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#incharger").val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $("#incharger").val("");
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
    add_project: function(model){
        console.log("model:",JSON.stringify(model));

        var me = this;
        var data = {url: '/api/project/create', entity: JSON.stringify(model)};
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
                    window.location.href = "project_list.jsp";
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