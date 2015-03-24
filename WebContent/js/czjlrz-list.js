(function($){
    var Util={
        _entity:{
            startposition: 0,
            pagesize: 10,
            query:{type:"or",condition:{fields:["czr","url","method","params","address"],value:""}}
        },
        _request:function(options){
            return $.io.post($.extend(true,{
                url: '/api/operationRecord/readAllForPage'
            },options));
        },
        _render:function(options){
            var _this=this;
            _this._options= $.extend(true,{
                entity:_this._entity
            },options);
            _this._request(_this._options).success(function(result,pager){
                _this._renderData(result,pager,options);
            });
        },
        _renderData:function(result,pager,options){
            var _this=this;
            $("#table-data").renderData("#table-data-template",result);
            if(!options||!options.paged){
                $.dom.pager("#table-pager",pager,{
                    pageSize:_this._entity.pagesize
                }).onChange(function(entity){
                    _this._render({
                        entity:entity,
                        paged:true
                    });
                });
            }
        },
        _bindEvent:function(){
            var _this=this,keyword=$("#keyword-input"),searchButton=$("#keyword-button");
            keyword.unbind("keyup").bind("keyup",function(e){
                if(e.keyCode==13) _this._render({entity:{startposition: 0,query:{condition:{value:keyword.val()}}}});
            });
            searchButton.unbind("click").bind("click",function(){
                _this._render({entity:{startposition: 0,query:{condition:{value:keyword.val()}}}});
            });
        },
        render:function(){
            this._render();
            this._bindEvent();
        }
    };
    Util.render();
})(jQuery);