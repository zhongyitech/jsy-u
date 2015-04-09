var App = window.App || {};
App.ResearchOA = {
    init: function (infoBean) {
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
    },
    initView: function (infoBean) {
    },
    showView: function (infoBean) {
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        $("#panel_researchOA").show();
    }
}