/**
 * 全部流程都在一个页面内展现，这里统一处理
 * @type {{stepPanels: string[], gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string, currentStep: string, show: Function, gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string}}
 */
var FLOW={
    projectid:null,

    /**
     * 尝试联系后台获取数据，后台会根据请求的项目id，返回信息，内容有
     * 0.项目信息
     * 1.模块的信息
     * 2.节点展现信息
     *      节点是否可见
     *      节点是否可编辑
     *      节点的具体内容
     *
     */
    show: function(projectid){
        this.projectid=projectid;
        this.initEvent();
        this.initView();

    },
    initEvent: function(){
        var me = this;
        //隐藏日复利
        $("#label_daycount").hide();
        $("#value_daycount").hide();


        //设置日复利input事件
        $("#daycount_per").focusout(function(){
            var daycount_per = $("#daycount_per").val();
            var data = {url: '/api/project/updateProjectDaycount_per', params: JSON.stringify({daycount_per:daycount_per,projectid:me.projectid})};
            $.io.post(data).success(function(result){
            }).error(function(result){
                alert('提交时错误:'+result);
            });
        });

        //设置利息类型事件
        $("#interestType").change(function(){
            var interestType = $("#interestType").val();
            if("singleCount"==interestType){
                $("#label_daycount").hide();
                $("#value_daycount").hide();
                me.saveProjectInterestType(interestType);
            }else if("costCount"==interestType){
                $("#label_daycount").hide();
                $("#value_daycount").hide();
                me.saveProjectInterestType(interestType);
            }else if("dayCount"==interestType){
                $("#label_daycount").show();
                $("#value_daycount").show();
                me.saveProjectInterestType(interestType);
            }
        });
    },
    initView: function(){
        var me = this;
        var model = {projectid:me.projectid};
        var data = {url: '/api/project/stepInfo', params: JSON.stringify(model)};
        $.io.get(data).success(function(rest_result){
            //首先初始化基本信息
            me.init_project_baseInfo(rest_result.project);

            //然后就是流程信息
            if(rest_result.gatherInfoBean){
                App.GatherInfo.init(rest_result.project, rest_result.gatherInfoBean)
            }
            if(rest_result.gatherOABean){
                App.GatherOA.init(rest_result.project, rest_result.gatherOABean);
            }
            if(rest_result.researchBean){
                App.Research.init(rest_result.project, rest_result.researchBean);
            }
            if(rest_result.researchOABean){
                App.ResearchOA.init(rest_result.project, rest_result.researchOABean);
            }
            if(rest_result.meetingBeans){
                App.Meeting.init(rest_result.project, rest_result.meetingBeans);
            }
            if(rest_result.otherEABean){
                App.OtherEA.init(rest_result.project, rest_result.otherEABean);
            }
            if(rest_result.makeContactBean){
                App.MakeContact.init(rest_result.project, rest_result.makeContactBean);
            }
            if(rest_result.makeContactOABean){
                App.MakeContactOA.init(rest_result.project, rest_result.makeContactOABean);
            }

        }).error(function(result){
            alert("加载项目流程信息错误，请联系管理员："+result);
        });
    },

    init_project_baseInfo: function(project){
        if(!project)return;
        $("#project_id").html(project.id);
        $("#project_name").html(project.name);
        $("#fund_name").html(project.fundNames);
        $("#currentStageName").html(project.currentStageName);
        if(project.archive){
            $("#currentStatus").html("结项完毕");
        }else{
            $("#currentStatus").html("活跃");
        }


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
    },

    saveProjectInterestType: function (interestType) {
        var me = this;
        var data = {url: '/api/project/saveProjectInterestType', params: JSON.stringify({interestType:interestType, projectid:me.projectid})};
        $.io.post(data);
    }


}


