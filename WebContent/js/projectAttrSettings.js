
$(document).ready(function(){

    VIEWDATA.init(true);

});

var VIEWDATA={
    projectid:null,
    init: function(){
        this.projectid = $.urlParam("id");
        this.init_event();
        this.init_view();

    },

    init_event: function(){
        var me = this;
        //隐藏日复利
        $("#label_daycount").hide();
        $("#value_daycount").hide();


        $("#manage_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#community_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#penalty_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#borrow_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#daycount_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#interestType").change(function(){
            if($(this).val()=="singleCount"){
                $("#interestType").val("singleCount");
            }else if($(this).val()=="costCount"){
                $("#interestType").val("costCount");
            }else if($(this).val()=="dayCount"){
                $("#interestType").val("dayCount");
                $("#label_daycount").show();
                $("#value_daycount").show();
            }
        });


        $("#linkProject").click(function(){
            window.location.href = "projectinfo.jsp?id="+me.projectid;
        });


        $("#submitSettings").click(function(){
            var interestType = $("#interestType").val();
            var daycount_per
            if("dayCount"==interestType){
                var temp = $("#daycount_per").val();
                if(!temp || temp==""){
                    alert("请输入日复利利率");
                    return false;
                }
                daycount_per = me.formatPer($("#daycount_per").val());
            }else{
                daycount_per = 0;
            }
            var interest_per = me.formatPer($("#interest_per").val());
            var manage_per = me.formatPer($("#manage_per").val());
            var community_per = me.formatPer($("#community_per").val());
            var penalty_per = me.formatPer($("#penalty_per").val());
            var borrow_per = me.formatPer($("#borrow_per").val());
            var year1 = me.formatPer($("#year1").val());
            var year2 = me.formatPer($("#year2").val());

            var model = {
                projectid:me.projectid,
                daycount_per:daycount_per,
                interestType:interestType,
                manage_per:manage_per,
                community_per:community_per,
                penalty_per:penalty_per,
                borrow_per:borrow_per,
                interest_per:interest_per,
                year1:year1,
                year2:year2,
                fund:{
                    id:$("#_fundname").val()
                }
            }

            var data = {url: '/api/project/saveProjectSettings', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectAttrSetting.jsp?id="+me.projectid;
            });
        });
        $('#fundname').autocomplete({
                serviceUrl: '/rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/fund/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    $("#fundname").val(suggestion.value);
                    $("#_fundname").val(suggestion.data);
                },
                transformResult: function (response) {
                    //clear old value
                    $("#fundname").val("");
                    $("#_fundname").val("");
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

    formatPer: function(perData){
        if(this.isNumber(perData)){
            return perData;
        }else if(this.isString(perData)){
            var rtn;
            if(perData.indexOf('%')!=-1){
                rtn = perData.replace("%","")/100;
            }else{
                rtn = parseFloat(perData);
            }

            console.log(isNaN(rtn));
            if(this.isNumber(rtn)){
                return rtn;
            }else{
                alert(perData+"无法识别，请输入数值");
                throw new Error(perData+"无法识别，请输入数值");
            }

        }else{
            alert(perData+"无法识别，请输入数值");
            throw new Error(perData+"无法识别，请输入数值");
        }


    },

    isNumber: function(obj){
        return (typeof obj=='number')&&obj.constructor==Number;
    },

    isString: function(str){
        return (typeof str=='string')&&str.constructor==String;
    },

    init_view: function(){
        var me = this;
        var model = {projectid:me.projectid};
        var data = {url: '/api/project/projectSettingInfo', params: JSON.stringify(model)};
        $.io.get(data).success(function(project){
            $("#project_name").html(project.name);

            //加载日复利
            $("#daycount_per").val(project.daycount_per);

            //加载利息类型
            if(project.interestType=="singleCount"){
                $("#interestType").val("singleCount");
            }else if(project.interestType=="costCount"){
                $("#interestType").val("costCount");
            }else if(project.interestType=="dayCount"){
                $("#interestType").val("dayCount");
                $("#label_daycount").show();
                $("#value_daycount").show();
            }

            $("#interest_per").val(project.interest_per);
            $("#manage_per").val(project.manage_per);
            $("#community_per").val(project.community_per);
            $("#penalty_per").val(project.penalty_per);
            $("#borrow_per").val(project.borrow_per);
            $("#year1").val(project.year1);
            $("#year2").val(project.year2);
            $("#fundname").val(project.fundName);
            console.log(project);
            $("#_fundname").val(project.fundId);

        }).error(function(result){
            alert("加载项目流程信息错误，请联系管理员："+result);
        });
    }

    //saveProjectInterestType: function (interestType) {
    //    var me = this;
    //    var data = {url: '/api/project/saveProjectInterestType', params: JSON.stringify({interestType:interestType, projectid:me.projectid})};
    //    $.io.post(data);
    //}


}