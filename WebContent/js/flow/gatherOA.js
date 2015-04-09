var App = window.App || {};
App.GatherOA = {
    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "gatherOA";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
    },
    initView: function (infoBean) {
    },
    showView: function (infoBean) {
        var me = this;
        //处理显示效果
        if(infoBean.accessable){//可以编辑
            console.log("can modify gatherOA");
        }else{//不可以编辑
            console.log("can not modify gatherOA");
        }

        if(me.isCurrent){
            $("#panel_gatherOA").removeClass("content-box-closed");
        }
        $("#panel_gatherOA").show();

    }
}