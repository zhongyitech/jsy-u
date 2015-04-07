(function($){
    var Util={
        _params:{
            id:18
        },
        /**
         * 发送请求，接收Options参数可包含entity、params
         * @param options
         * @returns {*}
         * @private
         */
        _request:function(){
            //$.extend(true,this._entity,options.entity)
            return $.io.get({
                url: '/api/investmentArchives/detail',
                params:this._params
            });
        },
        _getUserName:function(id){
            return $.project.domain(id,"com.jsy.auth.User","chainName").getItem(id).chainName;
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
                //_this._renderPage(pager);
            });
        },
        _renderData:function(result){
            var _this=this;
            $("#page-content").renderData("#info-data-template",result,{callback:function(){
                return _this._entity.startposition;
            },util:_this});
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