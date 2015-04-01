/**
 * Created by lioa on 2015/3/30.
 */
(function ($) {
    var Util = {

        render: function () {

            var data=$.io.post(true,{url:'/api/investmentArchives/readAllForPage'}).data()

            $("#show_table").setTemplateElement("Template");
            $("#show_table").processTemplate(data);
        }
    };
    Util.render();

})(jQuery);