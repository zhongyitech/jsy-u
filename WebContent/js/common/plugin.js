/**
 * Created by William.Wei on 2015/3/12. weizhansheng@outlook.com
 */
/**
 * plugins
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
                text:item.text,
                value:item.value
            }
        };
        _self._object=$(id);
        _self._data=data;
        _self._dom=[];
        $.each(data,function(i,v){
            var object=_self._callback(v);
            _self._dom.push(["<option value='", object.value,"'>", object.text,"</option>"].join(Constant.empty));
        });
        _self._object.html(_self._dom.join(Constant.empty));
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
    $.extend(true,{
        dom:{
            select:function(id,data,fn){
                return new Select(id,data,fn);
            }
        }
    })
})(jQuery);