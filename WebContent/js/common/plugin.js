/**
 * Created by William.Wei on 2015/3/12. weizhansheng@outlook.com
 */
/**
 * hook
 */
(function () {
    window.console=window.console||{
        log:function(){
            return;
        }
    }
})();
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
        _callback:{
            success:function(data){
                console.log("notice",data);
            },
            error:function(data){
                alert("[Error]: \""+data.msg+"\"\n[Result]: \""+data.result+"\"");
            },
            fail:function(){
                alert("请求失败!（非200返回）");
            }
        },
        _success: function (data) {
            return data&&data[this._key.status]==this._status.success;
        },
        _error: function (data) {
            return data&&data[this._key.status]==this._status.error;
        },
        _return:function(fn,response){
            if(fn&&fn.call)response?(response[this._key.pager]?fn.call(fn,this.result(response),response[this._key.pager]):fn.call(fn,this.result(response))):fn.call(fn,response);
        },
        result:function(data){
          return data[this._key.result];
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
         * sync 方法可以直接取数据，不必要采用回调形式
         */
        if(xhr&&!xhr.isAsync()){
            this.data=function(){
                return Util.result(xhr.data());
            }
        }
        /**
         * rest success
         * @param fn
         * @returns {XHR}
         */
        this.success=function(fn){
            xhr&&xhr.then(function(data){
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
            xhr&&xhr.then(function(data){
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
            var _this=this;
            _this._notice=true;
            xhr&&xhr.error(function(data){
                if(_this._notice) _this._notice=Util.doFail(data,fn);
            }).fail(function(data){
                if(_this._notice) _this._notice=Util.doFail(data,fn);
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
     * @param argsObj
     * @returns {XHR}
     */
    var request=function(url,argsObj){
        var args=Array.prototype.slice.apply(argsObj),_sync=false;
        if(args.length){
            if(args[0]&&typeof args[0]=="boolean") _sync=args.shift();
            var useOptions=Util.buildOptions(args.shift(), $.extend(true,args.shift()||{},{url:url}));
            if(_sync)
                return new XHR($.Sync.post(useOptions));
            return new XHR($.Async.post(useOptions));
        }
        return null;
    };
    $.extend(true,{
        io:{
            /**
             * sync/data options
             * @returns {XHR}
             */
            get: function () {
                return request(RestURI.get,arguments);
            },
            post: function () {
                return request(RestURI.post,arguments);
            },
            put: function () {
                return request(RestURI.put,arguments);
            },
            delete: function () {
                return request(RestURI.delete,arguments);
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
        _data:{},
        _type_config_uri:"/api/typeConfig/type",
        _getKey:function(key){
            return "_"+key;
        },
        request:function(type,async){
            var key=this._getKey(type),
                typeObj=this._cache[key];
            if(typeObj) return typeObj;
            return this._cache[key]=$.io.get(!async,{
                url:this._type_config_uri,
                params:{
                    type:type
                }
            });
        },
        clearCache:function(type){
            var _key=this._getKey(type);
            delete this._cache[_key];
            delete this._data[_key];
        },
        cacheItems:function(type,data,propKey){
            var _self=this;
            this._data[this._getKey(type)]={};
            $.each(data||[], function(i,v) {
                if(!v)return;
                _self._data[_self._getKey(type)][_self._getKey(v[propKey])]=v;
            });
        },
        checkCache:function(type){
            return !!this._data[this._getKey(type)];
        },
        search:function (type,key) {
            var _key=this._getKey(type),obj=this._data[_key];
            return key?obj&&obj[this._getKey(key)]||null:this._cache[_key].data();
        }
    };
    $.extend(true,{
        project:{
            /**
             * @param async/type 是否异步/类型id
             * @param clear 是否先清空缓存
             * @returns {*}
             */
            type: function () {
                var args=Array.prototype.slice.apply(arguments),_async=false;
                if(args.length){
                    if(args[0]&&typeof args[0]=="boolean") _async=args.shift();
                    var type=args.shift();
                    if(args.shift()) TypeConfig.clearCache(type);
                    var xhr=TypeConfig.request(type,_async);
                    if(!_async){
                        /**
                         * @param id typeId
                         * @param prop result->key/callback
                         * @returns {*}
                         */
                        xhr.getItem=function(id,prop){
                            TypeConfig.checkCache(type)||xhr.success(function(data){
                                TypeConfig.cacheItems(type,data,"id");
                            });
                            var result=TypeConfig.search(type,id);
                            if(prop&&typeof prop=="function"){
                                return prop.call(this,result);
                            }
                            return result?(prop?result[prop]:result):null;
                        };
                    }
                    return xhr;
                }
                return null;
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
     * @param selector
     * @param data
     * @param fn
     * @constructor
     */
    var Select=function(selector,data,fn){
        var _self=this;
        _self._callback=fn||function(item){
            return {
                text:item["mapName"],
                value:item["id"]
            }
        };
        _self._object=$(selector);
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
            var option=_self._object.find(["option[value=",value,"]"].join(Constant.empty));
            option.attr("selected",true);
            _self._selected={
                text:option.text(),
                value:option.val()
            };
        };
        _self.getSelected=function(){
            return _self._selected;
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