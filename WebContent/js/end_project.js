/**
 * Created by libosong on 2015/3/20.
 */

//数据加载、按钮点击事件等
$(document).ready(function () {
    EndProject.init();
});

var EndProject = {
    /**
     * 全局数据
     */
    oldSelectData:"", //前一个基金名称
    PROJECT_ID:0,

    /**
     * 界面初始化
     */
    init : function(){
        this.initView();
        this.initEvent();
    },

    /**
     * 初始化数据
     */
    initView : function(){

    },

    /**
     * 初始化事件
     */
    initEvent : function(){
        var _this = this;

        //更新project
        $("#end-project").click(function(){

            if(_this.PROJECT_ID){
                var params = {
                    id:_this.PROJECT_ID,
                    mark:$("#description").val()
                };

                var attachments = [];
                $("input[id^=invest-attachment]").each(function () {
                    var index = $(this).attr("id").replace("invest-filepath", "");

                    attachments.push({ "filePath": $(this).val(), "fileName": $("#invest-filename" + index).val() });
                });
                params.endProjectFiles = attachments;

                var data   ={url:"/api/project/endProject",params:JSON.stringify(params)};

                $.io.post(data)
                    .success(function(result){
                        window.location.href = "end_project.jsp";
                    })
                    .error(function(result){
                        alert(result)
                    });
            }
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


        //fundName 联想
        $('#fundname').autocomplete(
            {
                serviceUrl: '../rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/fund/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    $("#fundname").val(suggestion.value);
                    $("#_fundname").val(suggestion.data);

                    if(_this.oldSelectData!=suggestion.data){
                        _this.oldSelectData=suggestion.data
                        _this.setView_Project(suggestion.data);
                    }
                },
                transformResult: function (response) {
                    //clear old value
                    $("#fundname").val("");
                    $("#_fundname").val("");
                    $("#projectname").val("");
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

    /**
     * 设置项目属性
     * @param fundName
     */
    setView_Project : function(fundId){
        var params = JSON.stringify({"fundId":fundId});
        var data   = {url:"/api/project/getProjectFromFund",params:params};
        var _this = this;
        $.io.get(data)
            .success(function(result){
                _this.setView_ProjectName(result);

            })
            .error(function(result){
                alert(result);
            });
    },

    setView_ProjectName : function(pro){
        var projectName = pro["name"];
        this.PROJECT_ID = pro["id"];
        console.log(this.PROJECT_ID);
        console.log(projectName);
        $("#projectname").val(projectName);
    }
};