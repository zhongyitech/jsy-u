
$(document).ready(function(){
    VIEWDATA.flow=FLOW;
    VIEWDATA.init(true);


});

var VIEWDATA={
    flow: [],

    init: function(){
        this.init_view();

    },

    init_view: function(){
        this.flow.show(1);
    }


}