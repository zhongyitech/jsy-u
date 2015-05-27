/**
 * Created by lioa on 2015/5/27.
 */
(function ($) {
    var Util = {
        render: function () {
            var data = $.project.domain(4, 'com.jsy.fundObject.Fund').getItem(4);
            console.log(data);
            $('#view_fundDetail').renderData('#table-fundDetail-template', data);
            $('#view_saleData').renderData('#table-saleData-template', data);
            $('#view_payAndTc').renderData('#table-payAndTc-template', data);
            $('#view_project').renderData('#table-project-template', data);
        }
    };
    Util.render();
})(jQuery);
