/**
 * Created by lioa on 2015/3/30.
 */
(function ($) {
    var Util = {

        render: function () {

            var data=$.io.post(true,{url:'/api/investmentArchives/readAllForPage'}).data()
            $("#table-data").renderData("#table-data-template", data, function () {
                return 10;
            });
        }
    };
    Util.render();

})(jQuery);