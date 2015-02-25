/* 投资档案的状态  1:可正常计息的状态*/
var ENUM_INVEST_STATUS = {
	STATUS : {0:'未完成',1:'正常',2:'存档'},
	getStatus : function(id) {
		if(this.STATUS.hasOwnProperty(id)){
			return this.STATUS[id];
		}
		return 'NULL';
	}
};
/* 投资档案的状态的描述 */
var ENUM_INVEST_STATUS_DESCRIPT=  {
    STATUS: {},
    getStatus: function (id) {
        if (this.STATUS.hasOwnProperty(id)) {
            return this.STATUS[id];
        }
        return 'NULL';
    }
};
var algorithm_payment_period = {
    getEndDate: function (typeStr, strDate) {
    	if(typeStr.lenght<3) return '';    	
    	var title=typeStr.substr(typeStr.length-1) ;
    	var result='';
        for(var key in this.perido){
        	var obj=this.perido[key];
        	if(obj.title==title){
        		result=obj.func(strDate,typeStr.substring(0,typeStr.length-1));
        	}
        }
        return result;
    },        
    //计息付息时间的具体算法库
    perido:[
        {
            value: 0, title: "年", func: function (buyDate,value) {
                var date = new Date(buyDate);
                date.setYear(date.getFullYear() +Number.parseInt(value));
                return date;
            }
        },
        {
            value:1, title: "天", func: function (buyDate,value) {
                var date = new Date(buyDate);
                date.setDate( date.getDate()+Number.parseInt(value));
               return date;
            }
        }        
    ]
};
//---------获取总类型表中的数据------

var TYPECONFIG = {   
    result: {},
    item: {},
    map: {},
    ini: function (async) {
        var type = 1;
        if (async == "undefined") {
            async = false;
        }
        var params = JSON.stringify({ type: type });
        var data = { url: '/api/typeConfig/type', params: params };
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: async,
            success: function (result) {
                me.result = result;
                if (result && result.rest_result) {
                    me.items = JSON.parse(result.rest_result);
                    this.items_cache = true;
                }
            },
            error: function (result) {
                me.result = result;
                LOGIN.error(result);
            }
        });
    },
    getItems: function () {
        //同步加载数据
        if (!this.items_cache) {
            this.ini(false);
            this.items_cache = true;
        }
        return this.items;
    },
    getMap: function () {
        if (JSON.stringify(this.map) == "{}") {
            var items = this.getItems();
            for (var i in items) {
                this.map[items[i]['id']] = items[i];
            }
        }
        return this.map;
    },
    get: function (id) {
        var map = this.getMap();
        return map[id];
    },
    getName: function (id) {
        var item = this.get(id);
        var name = item[this.NAME_KEY];
        if (!name) {
            name = '无中文名';
        }
        return name;
    }
};

//---------END-------------------

//---------Common.DAL.js---------

//---------END Common.DAL.js-----

//---------公用方法-------

function parseISO8601(dateStringInRange) {
    var isoExp = /^s*(d{4})-(dd)-(dd)s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateStringInRange);
    if (parts) {
        month = +parts[2];
        date.setFullYear(parts[1], month - 1, parts[3]);
        if (month != date.getMonth() + 1) {
            date.setTime(NaN);
        }
    }
    return date;
}

//---------END------------
