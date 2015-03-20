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
     * 字段数据
     */
    PROJECT_ID: "projectId",

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
        this.PROJECT_ID  = PAGE.getParam(this.PROJECT_ID);
//        console.log(projectId);
        this.initViewLimittime(this.PROJECT_ID);
    },

    /**
     * 初始化table
     * @param result
     */
    initViewLimittime:function(projectId){
        for(var i=1; i<2; i++){
            var params = JSON.stringify({"projectId":projectId,"phaseIndex":i});
            var data   = {url:"/api/project/getSpecailAccess",params:params};
            var _this = this;
            $.io.get(data)
                .success(function(result){
                    console.log(result);
                    _this.initTable(result);
                })
                .error(function(result){
                    alert(result);
                });
        }
    },

    initTable:function(index,result){
        var tabletr;

        var item = JSON.parse(result["rest_result"]);
        console.log(item);
        switch(index){
            case 1 :
                tabletr = $("#xianshi_table1 tr");
                break;
            case 2 :
                tabletr = $("#xianshi_table2 tr");
                break;
            case 3 :
                tabletr = $("#xianshi_table3 tr");
                break;
            case 4 :
                tabletr = $("#xianshi_table4 tr");
                break;
            case 5 :
                tabletr = $("#xianshi_table5 tr");
                break;
            case 6 :
                tabletr = $("#xianshi_table6 tr");
                break;
            case 7 :
                tabletr = $("#xianshi_table7 tr");
                break;
            default :
                tabletr = $("#xianshi_table1 tr");
        }

        if (tabletr && tabletr.length) {
            for (var i = 1; i < tabletr.length; i++) {
                $(tabletr[i]).remove();
            }
        }

        var table = null;
        switch(index){
            case 1 :
                table = $("#xianshi_table1");
                break;
            case 2 :
                table = $("#xianshi_table2");
                break;
            case 3 :
                table = $("#xianshi_table3");
                break;
            case 4 :
                table = $("#xianshi_table4");
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

        if(table && item){
            for(var it in item){


                var key = this.key++;
                var tr = $('<tr key="' + key + '"></tr>');
                table.append(tr);

                var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
                tr.append(checkbox);

                var row = $('<td><div class="form-input "><input name="accessor" class="form-data-field" value=\""+item[it]["accessor"]+"\" ></div></td>');
                tr.append(row);

                var row = $('<td><div class="form-input "><input name="fromDate" class="form-data-field col-md-12" value=\""+item[it]["fromDate"]+"\"></div></td>');
                tr.append(row);

                var row = $('<td><div class="form-input "><input name="toDate" class="form-data-field col-md-12" value=\""+item[it]["toDate"]+"\"></div></td>');
                tr.append(row);
                f_tcalInit();
            }
        }
    },

    /**
     * 绑定事件
     */
    initEvent : function() {
        //保存 绑定
        $(".t1 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(1);
        });
        $(".t2 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(2);
        });
        $(".t3 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(3);
        });
        $(".t4 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(4);
        });
        $(".t5 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(5);
        });
        $(".t6 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(6);
        });
        $(".t7 .setting-save").click(function () {
            ProjectLimittimeSetting.saveSettingResult(7);
        });

        //添加行 绑定
        $(".t1 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(1);
        });
        $(".t2 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(2);
        });
        $(".t3 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(3);
        });
        $(".t4 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(4);
        });
        $(".t5 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(5);
        });
        $(".t6 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(6);
        });
        $(".t7 .setting-add").click(function () {
            ProjectLimittimeSetting.addXianshiTableRow(7);
        });
    },

    /**
     * 添加一行
     * @param index tab下标
     */
    addXianshiTableRow : function(index){
        var xianshi_table;
        switch (index){
            case 1 :
                xianshi_table = $("#xianshi_table1");
                break;
            case 2 :
                xianshi_table = $("#xianshi_table2");
                break;
            case 3 :
                xianshi_table = $("#xianshi_table3");
                break;
            case 4 :
                xianshi_table = $("#xianshi_table4");
                break;
            case 5 :
                xianshi_table = $("#xianshi_table5");
                break;
            case 6 :
                xianshi_table = $("#xianshi_table6");
                break;
            case 7 :
                xianshi_table = $("#xianshi_table7");
                break;
            default :
                xianshi_table = $("#xianshi_table1");
        }
        var key = this.key++;
        var tr = $('<tr key="' + key + '"></tr>');
        xianshi_table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var row = $('<td><div class="form-input "><input name="accessor" class="form-data-field"></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="fromDate" class="form-data-field col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="toDate" class="form-data-field col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);
        f_tcalInit();
    },

    /**
     * 保存
     * @param index tab下标
     */
    saveSettingResult : function(index){
        var xianshi_table;
        var phaseIndex = 0;
        switch (index){
            case 1 :
                phaseIndex = 1;
                xianshi_table = $("#xianshi_table1");
                break;
            case 2 :
                phaseIndex = 2;
                xianshi_table = $("#xianshi_table2");
                break;
            case 3 :
                phaseIndex = 3;
                xianshi_table = $("#xianshi_table3");
                break;
            case 4 :
                phaseIndex = 4;
                xianshi_table = $("#xianshi_table4");
                break;
            case 5 :
                phaseIndex = 5;
                xianshi_table = $("#xianshi_table5");
                break;
            case 6 :
                phaseIndex = 6;
                xianshi_table = $("#xianshi_table6");
                break;
            case 7 :
                phaseIndex = 7;
                xianshi_table = $("#xianshi_table7");
                break;
            default :
                xianshi_table = $("#xianshi_table1");
        }

        var rows = xianshi_table.find("tr");

        var _this=this;
        rows.each(function(i){
            var cells = rows.eq(i).find("input.form-data-field");
            var tempObj={};
            cells.each(function(idx){
                var obj=cells.eq(idx);
                tempObj[obj.attr("name")]=obj.val();
            });
            if($.isEmptyObject(tempObj))return;

            var model = $.extend(true,{
                projectId:_this.PROJECT_ID,
                phaseIndex:index
            },tempObj);

            var data   = {url:"/api/project/setSpecailAccess",entity:JSON.stringify(model)};
            $.io.post(data)
                .success(function(result){

                })
                .error(function(result){
                    alert(result)
            });
        });


    }
}