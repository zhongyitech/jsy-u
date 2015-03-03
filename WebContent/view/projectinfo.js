$.urlParam = function (name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

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
        this.flow.show($.urlParam("id"));
    }


}