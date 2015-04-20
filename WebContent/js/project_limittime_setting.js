/**
 * Created by libosong on 2015/3/16.
 */

/**
 * 初始化
 */
$(document).ready(function() {
    $.io.registerCallback({
        error:function(msg){

        }
    });
    TabbedContent.init();

    ProjectLimittimeSetting.init();
});

/**
 * tab 标签
 * @type {{init: init, slideContent: slideContent}}
 */
var TabbedContent = {
    init: function() {
        $(".tab_item").mouseover(function() {

            var background = $(this).parent().find(".moving_bg");

            $(background).stop().animate({
                left: $(this).position()['left']
            }, {
                duration: 300
            });

            TabbedContent.slideContent($(this));

        });
    },

    slideContent: function(obj) {
        var margin = $(obj).parent().parent().find(".slide_content").width();
        margin = margin * ($(obj).prevAll().size() - 1);
        margin = margin * -1;

        $(obj).parent().parent().find(".tabslider").stop().animate({
            marginLeft: margin + "px"
        }, {
            duration: 300
        });
    }
}

var ProjectLimittimeSetting = {
    /**
     * project ID 缓存
     */
    PROJECT_ID : 0,


    /**
     * 初始化
     */
    init : function(){
        ProjectLimittimeSetting.initView();
        ProjectLimittimeSetting.initEvent();
    },

    /**
     * 初始化界面数据
     */
    initView : function(){
        this.PROJECT_ID  = PAGE.getParam("projectId");
        this.initViewLimittime(this.PROJECT_ID);
    },

    /**
     * 初始化table
     * @param result
     */
    initViewLimittime:function(projectId){
        var _this = this;

        var params = {
            projectId:projectId
        };
        var data   = {url:"/api/project/getSpecailAccess",params:JSON.stringify(params)};

        $.io.get(true,data)
            .success(function(result){
                var itemMap = _this.sortItemByPhase(result);
                $.each(itemMap,function(index, obj){
                    _this.initTable(obj.items);
                });


            })
            .error(function(result){
                console.log(result.msg);
                alert(result.msg);
            });


    },

    //这里的item是全部的！
    sortItemByPhase:function(item){
        var table = null

        var itemMap = [];
        var phase1 = {phaseIndex:1,items:[]};
        var phase3 = {phaseIndex:3,items:[]};
        var phase5 = {phaseIndex:5,items:[]};
        var phase6 = {phaseIndex:6,items:[]};
        var phase7 = {phaseIndex:7,items:[]};
        for(var i =1; i<item.length + 1; i++){
            var it = item[i-1];
            var index = it["phaseIndex"];  // 根据数据的phaseIndex判断是第几个tab

            switch(index){
                case 1 :
                    phase1.items.push(it);
                    break;
                case 3 :
                    phase3.items.push(it);
                    break;
                case 5 :
                    phase5.items.push(it);
                    break;
                case 6 :
                    phase6.items.push(it);
                    break;
                case 7 :
                    phase7.items.push(it);
                    break;
                default :
                    break;
            }

        }

        var itemMap = [phase1,phase3,phase5,phase6,phase7];
        return itemMap;

    },
    initTable:function(item){
        var table = null;

        for(var i =1; i<item.length + 1; i++){
            var it = item[i-1];
            var index = it["phaseIndex"];  // 根据数据的phaseIndex判断是第几个tab
            switch(index){
                case 1 :
                    table = $("#xianshi_table1");
                    break;
                case 3 :
                    table = $("#xianshi_table3");
                    break;
                case 5 :
                    table = $("#xianshi_table5");
                    break;
                case 6 :
                    table = $("#xianshi_table6");
                    break;
                case 7 :
                    table = $("#xianshi_table7");
                    break;
                default :
                    table = $("#xianshi_table1");
            }

            var key = this.key++;

            var tr = $("tr",table).eq(i);

            console.log(it);
            var userName = $.project.domain(it["accessor"],"com.jsy.auth.User","userName").getItem(it["accessor"]).chainName;
            $("input[name^='accessor_']",tr).val(userName);
            $("input[name^='accessor_']",tr).data("id",it["accessor"]);
            $("input[name^='fromDate_']",tr).val(DATEFORMAT.toDate(it["fromDate"]));
            $("input[name^='toDate_']",tr).val(DATEFORMAT.toDate(it["toDate"]));
        }
    },

    /**
     * 绑定事件
     */
    initEvent : function() {
        var me  =  this;
        //提交操作！！！
        $("button").click(function(){
            var phaseIndexes = [1,3,4,5,6,7]
            var entity = {projectid:parseFloat(me.PROJECT_ID)};
            var phaseDatas = [];
            $.each(phaseIndexes,function(index,phaseIndex){

                var datas = [];


                $.each($("tr","#xianshi_table"+phaseIndex).slice(1),function(index, obj){
                    var accessor = $("input[name='accessor_"+phaseIndex+"']",obj).data("id");
                    var fromDate = $("input[name='fromDate_"+phaseIndex+"']",obj).val();
                    var toDate = $("input[name='toDate_"+phaseIndex+"']",obj).val();

                    if(accessor&&fromDate&&toDate&&accessor!=""&&fromDate!=""&&toDate!=""){
                        var data = {
                            accessor:accessor,
                            fromDate:fromDate,
                            toDate:toDate
                        }
                        datas.push(data);
                    }
                });

                if(datas.length>0){
                    var temp = {
                        phaseIndex:phaseIndex,
                        datas:datas
                    }
                    phaseDatas.push(temp);
                }
            });

            entity.phaseDatas=phaseDatas;
            var data = {url:'/api/project/setSpecailAccess',entity:JSON.stringify(entity)}
            $.io.post(data).success(function(){
                alert("数据更新成功");
            });

        });

        $.each($("input[name^='accessor_']"),function(index, obj){
            var index = $(obj).attr("name").replace("accessor_","");
            $(obj).autocomplete({
                serviceUrl: '../rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/user/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    $(obj).val(suggestion.value);
                    $(obj).data("id",suggestion.data);
                },
                transformResult: function (response) {
                    //clear old value
                    $(obj).val("");
                    $(obj).data("id","");
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
        });

    }


}