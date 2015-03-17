/**
 * Created by libosong on 2015/3/16.
 */

/**
 * 初始化
 */
$(document).ready(function() {
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
        var projectId = PAGE.getParam(this.PROJECT_ID);


        $.io.get()
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
                xianshi_table = $(".t1 .xianshi_table");
                break;
            case 2 :
                xianshi_table = $(".t2 .xianshi_table");
                break;
            case 3 :
                xianshi_table = $(".t3 .xianshi_table");
                break;
            case 4 :
                xianshi_table = $(".t4 .xianshi_table");
                break;
            case 5 :
                xianshi_table = $(".t5 .xianshi_table");
                break;
            case 6 :
                xianshi_table = $(".t6 .xianshi_table");
                break;
            case 7 :
                xianshi_table = $(".t7 .xianshi_table");
                break;
            default :
                xianshi_table = $(".t1 .xianshi_table");
        }
        var key = this.key++;
        var tr = $('<tr key="' + key + '"></tr>');
        xianshi_table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var row = $('<td><div class="form-input "><input name="username" ></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="fromdate" class="col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="todata" class="col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);
        f_tcalInit();
    },

    /**
     * 保存
     * @param index tab下标
     */
    saveSettingResult : function(index){

    },

    /**
     * 初始化 table
     * @param index
     */
    initSettingTable : function(index){
//        var params = JSON.stringify({'projectId':})
//        $.io.get()
    }
}