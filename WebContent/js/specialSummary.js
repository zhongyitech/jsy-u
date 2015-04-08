(function($){
    var Util={
        _entity:{
            startposition: 0,
            pagesize: 10,
            type:"or",
            fields:["status","fundName","htbh","sqbm","sqr","sqrq","type","customer","bz"],
            value:"",
            order:{id:"desc"}
        },
        /**
         * 发送请求，接收Options参数可包含entity、params
         * @param options
         * @returns {*}
         * @private
         */
        _request:function(options){
            $.extend(true,this._entity,options.entity)
            return $.io.post({
                url: '/api/dqztsq/readAllForPage',
                entity:this._entity
            });
        },
        /**
         * 渲染方法，当前页面只接收entity参数
         * @param entity
         * @private
         */
        _render:function(entity){
            var _this=this;
            _this._request({entity:entity}).success(function(result,pager){
                _this._renderData(result);
                _this._renderPage(pager);
            });
        },
        _renderData:function(result){
            var _this=this;
            $("#table-data").renderData("#table-data-template",result,function(){
                return _this._entity.startposition;
            });
        },
        _renderPage:function(pager){
            var _this=this;
            if(!_this._entity.startposition){
                $.dom.pager("#table-pager",pager,{
                    pageSize:_this._entity.pagesize
                }).onChange(function(entity){
                    _this._render(entity);
                });
            }
        },
        _bindEvent:function(){
            var _this=this,keyword=$("#keyword-input"),searchButton=$("#keyword-button");
            keyword.unbind("keyup").bind("keyup",function(e){
                if(e.keyCode==13) _this._render({startposition: 0,value:keyword.val()});
            });
            searchButton.unbind("click").bind("click",function(){
                _this._render({startposition: 0,value:keyword.val()});
            });
        },
        render:function(){
            this._render();
            this._bindEvent();
        }
    };
    Util.render();
})(jQuery);