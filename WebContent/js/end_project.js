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

                var data   ={url:"/api/project/updateProjectAttr",ok:JSON.stringify(params)};

                $.io.post(data)
                    .success(function(result){
                        console.log(result);
                    })
                    .error(function(result){
                        alert(result)
                    });
            }
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