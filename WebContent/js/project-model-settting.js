/**
 * Created by libosong on 2015/4/2.
 */
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

    ProjectModelRoleSetting.init();
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

var ProjectModelRoleSetting = {

    /**
     * 初始化
     */
    init : function(){
        ProjectModelRoleSetting.initView();
        ProjectModelRoleSetting.initEvent();
    },

    /**
     * 初始化界面数据
     */
    initView : function(){
        this.initViewRoles();
    },

    /**
     * 初始化table
     * @param result
     */
    initViewRoles:function(){
        var _this = this;
        for(var i=1; i<8; i++){
            _this.removeTableItem(i);
            var params = {
                phaseIndex:i
            };
            var data   = {url:"/api/project/getProjectModelRole",params:JSON.stringify(params)};

            $.io.get(data)
                .success(function(result){
                    _this.initTable(result);

                })
                .error(function(result){
                    //alert(result);
                });
        }
    },

    removeTableItem:function(index){
        var tabletr;
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
            for (var i = 0; i < tabletr.length; i++) {
                $(tabletr[i]).remove();
            }
        }
    },
    initTable:function(result){
        var json = JSON.parse(result);
        //console.log(json);
        if(!json)
            return;

        var index = json["phaseIndex"];
        var item = [];
        item = JSON.parse(json["roles"]);
        console.log(item);
        var table = null;
        if(item){

            for(var i =1; i<item.length + 1; i++){
                var it = item[i-1];
                console.log(it);

                console.log("index=" + index);
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

                var key = this.key++;
                var tr = $('<tr key="' + key + '"></tr>');
                table.append(tr);

                var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
                tr.append(checkbox);

                var row = $('<td><div class="form-input "><input name="name" class="form-data-field" value="'+it["name"]+'" ><input name="id" type="hidden" class="form-data-field-hidden" value="'+it["id"]+'" ></div></td>');
                tr.append(row);
                tr.append(row);
                //f_tcalInit();
            }
        }
    },

    /**
     * 绑定事件
     */
    initEvent : function() {
        //保存 绑定
        $(".t1 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(1);
        });
        $(".t2 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(2);
        });
        $(".t3 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(3);
        });
        $(".t4 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(4);
        });
        $(".t5 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(5);
        });
        $(".t6 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(6);
        });
        $(".t7 .setting-save").click(function () {
            ProjectModelRoleSetting.saveSettingResult(7);
        });

        //添加行 绑定
        $(".t1 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(1);
        });
        $(".t2 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(2);
        });
        $(".t3 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(3);
        });
        $(".t4 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(4);
        });
        $(".t5 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(5);
        });
        $(".t6 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(6);
        });
        $(".t7 .setting-add").click(function () {
            ProjectModelRoleSetting.addXianshiTableRow(7);
        });

        //删除行 绑定
        $(".t1 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(1);
        });
        $(".t2 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(2);
        });
        $(".t3 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(3);
        });
        $(".t4 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(4);
        });
        $(".t5 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(5);
        });
        $(".t6 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(6);
        });
        $(".t7 .setting-remove").click(function () {
            ProjectModelRoleSetting.removeTr(7);
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

        var checkbox = $('<td><input type="checkbox" name="checkbox" ></td>');
        tr.append(checkbox);

        var td  = $('<td></td>');
        tr.append(td);

        var div = $('<div class="form-input"></div>');
        td.append(div);
        var name = $('<input name="name" class="form-data-field">');
        var id  = $('<input name="id" class="form-data-field-hidden" type="hidden">');
        div.append(name);
        div.append(id);
        $(name).autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/role/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                console.log(suggestion.data)
                $(name).val(suggestion.value);
                $(id).val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $(name).val("");
                $(id).val("");
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

        var _this=this;

        var params = JSON.stringify({phaseIndex:index });
        var data   = {url:"/api/project/removeProjectModelrRoles",params:params};
        $.io.del(data)
            .success(function(result){
                var rows = xianshi_table.find("tr");
                rows.each(function(i){
                    var cells = rows.eq(i).find("input.form-data-field-hidden");
                    var tempObj={};
                    cells.each(function(idx){
                        var obj=cells.eq(idx);
                        tempObj["id"]=obj.val();
                    });
                    console.log(tempObj);
                    if($.isEmptyObject(tempObj))return;
                    var model = $.extend(true, {
                            phaseIndex:phaseIndex
                        },tempObj);
                    var data   = {url:"/api/project/setProjectModelRole",params:JSON.stringify(model)};
                    $.io.post(data)
                        .success(function(result){

                        })
                        .error(function(result){
                            alert(result)
                        });
                });
            })
            .error(function(result){
                alert(result)
            });
    },

    removeTr: function (index) {//删除选中行
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
        var trs = xianshi_table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var item = $(trs.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
}