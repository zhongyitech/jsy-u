/**
 * Created by William.Wei on 2015/4/16. weizhansheng@outlook.com
 */
(function($){
    var projectId=$.utils.getParam("id"),
        baseParams={
            id: projectId
        };
    //base info
    (function(){
        $.io.get({
            url:"/api/project/getProjectSimpleInfo",
            params:baseParams
        }).success(function(result){
            return {
                $id: "BaseModel",
                data: result,
                submit:function(){
                    $.io.post({
                        url:"/api/project/updateProjectSimpleInfo",
                        params:baseParams,
                        entity:result
                    }).success(function(){
                        $.message.log("更新成功");
                    });
                }
            }
        });
    })();

    //stockRight
    (function(){
        $.io.get({
            url:"/api/project/getProjectStockRight",
            params:baseParams
        }).success(function(result){
           var model= avalon.define({
                $id: "StockRight",
                data: result,
                stockDate:'',
                structure:'',
                add:function(){
                    if(model.stockDate==''){
                        $.message.error("请选择时间");
                        return;
                    }
                    if(model.structure==''){
                        $.message.error("请输入股份结构");
                        return;
                    }
                    $.io.post({
                        url:"/api/project/addProjectStockRight",
                        params:baseParams,
                        entity:{
                            stockDate:$.utils.dateFormat(model.stockDate,"yyyy-MM-ddThh:mm:ssZ"),
                            structure:model.structure
                        }
                    }).success(function(row){
                        model.data.push(row);
                    });
                    model.stockDate='';
                    model.structure='';
                },
                del:function(id){
                    if(confirm("确实要删除？")){
                        $.each(model.data,function(){
                            if(this.id==id) model.data.remove(this);
                        });
                        $.io.del({
                            url:"/api/project/delProjectStockRight",
                            params:{id:projectId,stock_right_id:id}
                        }).success(function(){
                            $.message.log("删除成功");
                        });
                    }
                }
            });
        });
    })();
})(jQuery);