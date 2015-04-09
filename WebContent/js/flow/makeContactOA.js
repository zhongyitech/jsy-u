var App = window.App || {};
App.MakeContactOA = {
    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "makeContactOA";
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
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        if(me.isCurrent){
            $("#panel_makeContactOA").removeClass("content-box-closed");
        }
        $("#panel_makeContactOA").show();
    }
}