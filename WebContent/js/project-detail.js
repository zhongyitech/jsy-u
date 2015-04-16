/**
 * Created by William.Wei on 2015/4/16. weizhansheng@outlook.com
 */
(function($){
    var BaseModel={
        request:function(){
            return $.io.get({url:"/api/project/getProjectSimpleInfo",params:{projectid: $.utils.getParam("id")}});
        },
        update:function(entity){
            console.log(entity);
            return $.io.post({url:"/api/project/updateProjectSimpleInfo",entity:entity});
        },
        render:function(){
            var _this=this;
            _this.request().success(function(result){
                avalon.define({
                    $id: "BaseModel",
                    project: result,
                    submit:function(){
                        _this.update(result);
                    }
                });
            });
        }
    };
    BaseModel.render();
})(jQuery);