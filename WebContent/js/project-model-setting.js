/**
 * Created by libosong on 2015/4/2.
 */
/**
 * Created by libosong on 2015/3/16.
 */

$(document).ready(function() {
    //tab控件
    TabbedContent.init();

    //role信息
    ProjectModelRoleSetting.init();
});

/**
 * tab控件
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

/**
 * role信息
 */
var ProjectModelRoleSetting = {

    /**
     *
     */
    init : function(){
        ProjectModelRoleSetting.initRoleView();
        ProjectModelRoleSetting.initEvent();
    },

    /**
     * 查询7个节点的模板，然后加载进来
     */
    initRoleView : function(){
        var me = this;
        var data = {url:'/api/project/getProjectModelRole'};
        $.io.get(data).success(function(result){
            $.each(result,function(index, obj){
                if(obj.phaseIndex==1){
                    me.initGatherInfo(obj);
                }else if(obj.phaseIndex==2){
                    //me.initGatherOA(obj);
                }else if(obj.phaseIndex==3){
                    me.initResearch(obj);
                }else if(obj.phaseIndex==4){
                    //me.initResearchOA(obj);
                }else if(obj.phaseIndex==5){
                    me.initMeeting(obj);
                }else if(obj.phaseIndex==6){
                    me.initOtherEA(obj);
                }else if(obj.phaseIndex==7){
                    me.initMakeContact(obj);
                }else if(obj.phaseIndex==8){
                    //me.initMakeContactOA(obj);
                }
            });
        });

    },

    initGatherInfo: function(modlePhase){
        var me =  this;
        // load phaseParticipants
        var ids = [];
        $.each(modlePhase.phaseParticipants, function(index, obj){
            ids.push(obj.id);
        });
        var ROLE = $.project.domain(ids,"com.jsy.auth.Role",["name","authority"]);
        $.each(ids,function(index, obj){
            var role = ROLE.getItem(obj);
            me.addXianshiTableRow($("#xianshi_table1"), role);
        });


    },

    initResearch: function(modlePhase){
        var me =  this;
        // load phaseParticipants
        var ids = [];
        $.each(modlePhase.phaseParticipants, function(index, obj){
            ids.push(obj.id);
        });
        var ROLE = $.project.domain(ids,"com.jsy.auth.Role",["name","authority"]);
        $.each(ids,function(index, obj){
            var role = ROLE.getItem(obj);
            me.addXianshiTableRow($("#xianshi_table3"), role);
        });
    },

    initMeeting: function(modlePhase){
        var me =  this;
        // load phaseParticipants
        var ids = [];
        $.each(modlePhase.phaseParticipants, function(index, obj){
            ids.push(obj.id);
        });
        var ROLE = $.project.domain(ids,"com.jsy.auth.Role",["name","authority"]);
        $.each(ids,function(index, obj){
            var role = ROLE.getItem(obj);
            me.addXianshiTableRow($("#xianshi_table5"), role);
        });
    },

    initOtherEA: function(modlePhase){
        var me =  this;
        // load phaseParticipants
        var ids = [];
        $.each(modlePhase.phaseParticipants, function(index, obj){
            ids.push(obj.id);
        });
        var ROLE = $.project.domain(ids,"com.jsy.auth.Role",["name","authority"]);
        $.each(ids,function(index, obj){
            var role = ROLE.getItem(obj);
            me.addXianshiTableRow($("#xianshi_table6"), role);
        });
    },

    initMakeContact: function(modlePhase){
        var me =  this;
        // load phaseParticipants
        var ids = [];
        $.each(modlePhase.phaseParticipants, function(index, obj){
            ids.push(obj.id);
        });
        var ROLE = $.project.domain(ids,"com.jsy.auth.Role",["name","authority"]);
        $.each(ids,function(index, obj){
            var role = ROLE.getItem(obj);
            me.addXianshiTableRow($("#xianshi_table7"), role);
        });
    },

    addXianshiTableRow : function(xianshi_table, role){
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
        if(role){
            name.val(role.name);
            id.val(role.id);
        }
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
                //console.log(suggestion.data)
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
                    var result = JSON.parse(response);
                    var suggestions = JSON.parse(result.suggestions);
                    result.suggestions = suggestions;
                    return result;
                }
            }
        });
    },

    removeTableItem:function(tabletr){
        var tabletr;

        if (tabletr && tabletr.length) {
            for (var i = 0; i < tabletr.length; i++) {
                $(tabletr[i]).remove();
            }
        }
    },

    removeTr: function (xianshi_table) {
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
    },

    /**
     * 初始化事件
     */
    initEvent : function(){
        var me  = this;
        $(".setting-add").click(function(){
            var tableid = $(this).data('tableid');
            me.addXianshiTableRow($("#xianshi_table"+tableid));
        });

        $(".setting-save").click(function(){
            var tableid = $(this).data('tableid');
            var roleids = [];
            $.each($("input[name='id']","#xianshi_table"+tableid), function(index, obj){
                roleids.push($(obj).val());
            });;
            console.log(roleids);
            var data = {url:'/api/project/setProjectModelRole', params:JSON.stringify({phaseIndex:tableid,roleids:roleids})};
            $.io.post(data).success(function(){
                alert("更新成功");
            });
        });

        $(".setting-remove").click(function(){
            var tableid = $(this).data('tableid');
            me.removeTr($("#xianshi_table"+tableid));
        });

    }



}

















