
$(document).ready(function(){
    VIEWDATA.file = FILE;
    VIEWDATA.init(true);


});

var VIEWDATA={
    file: {},
    stockRights:[],

    init: function(sync){
        this.init_view();
        this.init_event();
    },

    init_view: function(){
        var currentUser = LOGIN.getUser();
        if(currentUser){
            $("#creatorName").val(currentUser.chainName);
            $("#creator").val(currentUser.id);
        }

    },

    init_event: function(){
        var me = this;
        $("#add-project").click(function(){
            var projectdealer = $("#projectdealer").val();
            var projectname = $("#projectname").val();
            var incharger = $("#incharger").val();
            var inchargerName = $("#inchargerName").val();
            var creator = $("#creator").val();
            var description = $("#description").val();

            var director = $("#director").val();
            var supervisor = $("#supervisor").val();
            var stockStructure = $("#stockStructure").val();
            var debt = $("#debt").val();
            var assets = $("#assets").val();

            if(!projectname){
                alert("请输入项目名称");
                return;
            }
            if(!inchargerName || incharger==""){
                alert("请输入项目负责人");
                return;
            }


            var model = {
                projectDealer:projectdealer,
                name:projectname,
                projectOwner:incharger,
                creator:LOGIN.getUser().id,
                ownerName:inchargerName,
                creatorName:LOGIN.getUser().chainName,
                pdesc:description,

                director:director,
                supervisor:supervisor,
                stockStructure:stockStructure,
                debt:debt,
                assets:assets,

                stockRights:me.stockRights
            }

            var attachments = [];
            $("input[id^=invest-filepath]").each(function () {
                var index = $(this).attr("id").replace("invest-filepath", "");

                attachments.push({ "filePath": $(this).val(), "fileName": $("#invest-filename" + index).val() });
            });
            model.startProjectFiles = attachments;

            me.add_project(model);
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
                    var result = JSON.parse(response).rest_result;
                    var suggestions = (result.suggestions);
                    result.suggestions = suggestions;
                    return result;
                }
            }
        });


        // attachements
        $("input[id^=invest-attachment]").change(function () {
            me.attach_change_event(this);
        });

        $("#add_file").click(function () {
            var index = $('#fileupdate tr').length;
            var input_invest = $("<input id='invest-attachment" + index + "' class='input-file' name='attachment' type='file'>");
            var td = $("<td class='text-left'>");
            var tr = $("<tr>");
            tr.append(td);
            td.append(input_invest)
            $('#fileupdate tr:last').after(tr);
            input_invest.change(function () {
                me.attach_change_event(input_invest);
            });
        });


        $('#mytabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $("#addStock").click(function(){
            var stockDate = $("#stockDate").val();
            var structure = $("#structure").val();
            if(!stockDate || !structure || stockDate=='' || structure==''){
                alert("请输入时间或者股份结构");
                return false;
            }


            var count = $('#stock_table tr').length;
            $('#stock_table tr:last').after('<tr><td>'+count+'</td> <td>'+stockDate+'<input hidden="hidden" id="stockDate_'+count+'" value="'+stockDate+'"/></td><td>'+structure+'<input hidden="hidden" id="structure_'+count+'" value="'+structure+'"/></td></tr>');

            //add to cache
            var stockRight = {stockDate:DATEFORMAT.toRest(stockDate),structure:structure};
            me.stockRights.push(stockRight);

            //clear data
            $("#stockDate").val("");
            $("#structure").val("");
            return false;
        });


    },
    attach_change_event: function (input_file) {
        var index = $(input_file).attr("id").replace("invest-attachment", "");

        $.utils.upload({
            files:$(input_file),
            success:function(response){
                var result=response.rest_result[0];
                var attachment_src = '/rest/file/download?path=' + result["filePath"];

                var attach_img = $("#invest-attachment-img" + index);
                if (attach_img.size() > 0) {
                    attach_img.attr("src", attachment_src);
                    $("#invest-img-key" + index).val(result["filePath"]);
                } else {
                    //$("#pics").append("<img class='attachment-img' id='invest-attachment-img" + index + "' alt='' src='" + attachment_src + "' style='width:100px;'>");
                    $("#pics").append("<input type='hidden' value='" + result["filePath"] + "' id='invest-filepath" + index + "' >");
                    $("#pics").append("<input type='hidden' value='" + result["fileName"] + "' id='invest-filename" + index + "' >");
                }
            },
            error:function(response){
                console.log(response);
            }
        });
    },
    add_project: function(model){
        console.log("model:",JSON.stringify(model));

        var me = this;
        var data = {url: '/api/project/create', entity: JSON.stringify(model)};
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