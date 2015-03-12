/**
 * Created by William.Wei on 2015/3/12. weizhansheng@outlook.com
 */
/**
 * project ajax
 */
(function($){
    var BaseURI="../rest/item/";
    var RestURI={
        get:BaseURI+"get",
        post:BaseURI+"post",
        put:BaseURI+"put",
        delete:BaseURI+"delete"
    };
    var Util={
        _status:{
            success:"suc",
            error:"err"
        },
        _key:{
            status:"rest_status",
            result:"rest_result",
            pager:"rest_pager"
        },
        _callback:{},
        _success: function (data) {
            return data&&data[this._key.status]==this._status.success;
        },
        _error: function (data) {
            return data&&data[this._key.status]==this._status.error;
        },
        _return:function(fn,response){
            if(fn&&fn.call)response?(response[this._key.pager]?fn.call(fn,response[this._key.result],response[this._key.pager]):fn.call(fn,response[this._key.result])):fn.call(fn,response);
        },
        buildOptions:function(data,options){
            var useData=data||{params:{},entity:{}},
                params=useData.params,
                entity=useData.entity;
            if(typeof params=="object"){
                params=JSON.stringify(params);
            }
            if(typeof entity=="object"){
                entity=JSON.stringify(entity);
            }
            return $.extend(true,options||{},{data:data},{data:{entity:entity,params:params}});
        },
        doSuccess:function(data,fn){
            this._success(data)&&this._return(fn||this._callback.success, data);
        },
        doError:function(data,fn){
            this._error(data)&&this._return(fn||this._callback.error,data);
        },
        doFail:function(data,fn){
            this._return(fn||this._callback.fail,data);
        },
        registerCallback: function (callback) {
            $.extend(true,this._callback,callback);
        }
    };
    /**
     * 二次封装，success、error后台成功或异常，fail为js异常
     * @param xhr
     * @constructor
     */
    var XHR=function(xhr){
        /**
         * rest success
         * @param fn
         * @returns {XHR}
         */
        this.success=function(fn){
            xhr.then(function(data){
                Util.doSuccess(data,fn);
            });
            return this;
        };
        /**
         * rest error
         * @param fn
         * @returns {XHR}
         */
        this.error=function(fn){
            xhr.then(function(data){
                Util.doError(data,fn);
            });
            return this;
        };
        /**
         * js error
         * @param fn
         * @returns {XHR}
         */
        this.fail=function(fn){
            xhr.error(function(data){
                Util.doFail(data,fn);
            });
            return this;
        };
        /**
         * call default
         */
        this.success();
        this.error();
        this.fail();
    };
    /**
     * 请求统一入口,暂时全部Post
     * @param url
     * @param data
     * @param options
     * @param async
     * @returns {XHR}
     */
    var request=function(url,data,options,async){
        var useOptions=Util.buildOptions(data, $.extend(true,options||{},{url:url}));
        if(async)
            return new XHR($.Async.post(useOptions));
        return new XHR($.Sync.post(useOptions));
    };
    $.extend(true,{
        io:{
            get: function (data,options) {
                return request(RestURI.get,data,options,!0);
            },
            post: function (data,options) {
                return request(RestURI.post,data,options,!0);
            },
            put: function (data,options) {
                return request(RestURI.put,data,options,!0);
            },
            delete: function (data,options) {
                return request(RestURI.delete,data,options,!0);
            },
            syncGet: function (data,options) {
                return request(RestURI.get,data,options,0);
            },
            syncPost: function (data,options) {
                return request(RestURI.post,data,options,0);
            },
            syncPut: function (data,options) {
                return request(RestURI.put,data,options,0);
            },
            syncDelete: function (data,options) {
                return request(RestURI.delete,data,options,0);
            },
            registerCallback:function(callback){
                Util.registerCallback(callback);
            },
            isXHR:function(xhr){
                return xhr.constructor==XHR;
            }
        }
    })
})(jQuery);
/**
 * common project method
 */
(function($){
    var TypeConfig={
        _cache:{},
        _type_config_uri:"/api/typeConfig/type",
        _getKey:function(type_id){
            return "_"+type_id;
        },
        getItem:function(type_id){
            var key=this._getKey(type_id),
                type=this._cache[key];
            if(type) return type;
            return this._cache[key]=$.io.get({
                url:this._type_config_uri,
                params:{
                    type:type_id
                }
            });
        },
        clearItem:function(type_id){
            delete this._cache[this._getKey(type_id)];
        }
    };
    $.extend(true,{
        project:{
            type: function (type,clear) {
                if(clear) TypeConfig.clearItem(type);
                return TypeConfig.getItem(type);
            }
        }
    });
})(jQuery);
/**
 * plugins
 * some dom element render plugin
 */
(function($){
    var Constant={
        empty:""
    };
    var Utils={
    };
    /**
     * select options
     * @param id
     * @param data
     * @param fn
     * @constructor
     */
    var Select=function(id,data,fn){
        var _self=this;
        _self._callback=fn||function(item){
            return {
                text:item["mapName"],
                value:item["id"]
            }
        };
        _self._object=$(id);
        _self._dom=[];
        if(!$.io.isXHR(data)){
            var dataCopy= $.extend(true,{},data);
            data={
                success:function(fn){
                    fn.call(this,dataCopy);
                }
            };
        }
        data.success(function(response){
            _self._data=response;
            $.each(_self._data,function(i,v){
                var object=_self._callback.call(v,v);
                _self._dom.push(["<option value='", object.value,"'>", object.text,"</option>"].join(Constant.empty));
            });
            _self._object.html(_self._dom.join(Constant.empty));
        });
        _self.select=function(value){
            _self._object.find(["option[value=",value,"]"].join(Constant.empty)).attr("selected",true);
        };
        _self.getSelected=function(){
            var selected=_self._object.find("option:checked");
            return {
                text:selected.text(),
                value:selected.val()
            };
        };
    };
    var Pager=function(id,curPage,fn){
        var _self=this;
        _self._callback=fn|| function () {
            alert("no callback!");
        };
        _self._curPage=curPage||1;
        _self._firstPage=1;
        _self._lastPage=1;
        _self.page=function(pageNum){

        };
        _self.prev=function(){

        };
        _self.next=function(){

        };
        _self.first=function(){

        };
        _self.last=function(){

        };
    };
    $.extend(true,{
        dom:{
            select:function(id,data,fn){
                return new Select(id,data,fn);
            },
            pager:function(id,curPage){
                return new Pager(id,curPage);
            }
        }
    })
})(jQuery);