/**
 * Created by William.Wei on 2014/12/17.
 */
(function($){
    var Content={
        bindTemplate:function(){
            var main=$("#main").setTemplateURL("templates/t1.html");
            main.processTemplate({
                items:[
                    {text:"1",name:"21"},
                    {text:"2"},
                    {text:"3"},
                    {text:"4"}
                ]
            });
        },
        render:function(){
            this.bindTemplate();
        }
    };
    var ContentInf=function(){
        this.render=function(){
            Content.render();
        };
    };
    $.extend(true,{
        content:new ContentInf()
    });
})(jQuery);

(function($){
    var Ajax={
        post:function(options){
            options=$.extend(true,{
                dataType:"json",
                type:"post",
                header:""
            },options);
            return $.ajax(options);
        }
    };
    $.extend(true,{
        Ajax:Ajax
    });
})(jQuery);
(function($){
    var YW={
        request1:function(){
            return $.Ajax({});
        },
        request2:function(){
            return $.Ajax({});
        },
        request3:function(){
            return $.Ajax({});
        },
        render:function(){
            this.request1().then(this.request2).then(this.request3);
        }
    };
})(jQuery);