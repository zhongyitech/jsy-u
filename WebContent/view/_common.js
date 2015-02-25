$(document).ready(function(){
	LOGIN.ini(true);
});

var REST={
		RESULT_KEY: 'rest_result',
		TOTAL_KEY: 'rest_total',
		STATUS_KEY: 'status',
		STATUS_OK: 200,
		RESULT_SUCCESS:'suc',
		RESULT_ERROR:'err'		
};

var PAGE={
		INVESMENT_PRINT: './investment-print.jsp',
		getParam: function(name) { 
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) 
			return unescape(r[2]); 
			return null; 
		}
};

var CALLBACK={
	FUNCTION_KEY: 'FUNCTION',
	ARG_KEY: 'ARG'
};

var FUND ={
		ID_KEY: 'id',
		NUMBER_KEY: 'fundNo',
		NAME_KEY: 'fundName',
		KSRQ_KEY: 'startSaleDate',
		YMGM_KEY: 'raiseFunds',
		SMJE_KEY: 'rRaiseFunds',
		JFMJGM_KEY: 'quarterRaise',
		JFSM_KEY: 'rQuarterRaise',
		BNFMJGM_KEY: 'halfRaise',
		BNFSM_KEY: 'rHalfRaise',
		NFMJGM_KEY: 'yearRaise',
		NFSM_KEY: 'rYearRaise',
		STATUS_KEY: 'status',
		SYLFW_KEY: 'yieldRange',
		TCFPFW_KEY: 'tcfpfw',
		response: {},
		items: [],
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			var params = JSON.stringify({});
			var data = {url: '/api/fund', params: params};
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/item/get", 
				async: async,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response && response[REST.RESULT_KEY]){
						me.items = JSON.parse(response[REST.RESULT_KEY]);
					}
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
		},
		getItems: function(){
			//同步加载数据
			if(!this.items || !this.items.length){
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i][this.ID_KEY]] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		toNumber: function(item){
			if(item && item[this.NUMBER_KEY]){
				return item[this.NUMBER_KEY]
			}else{
				return '无编号';
			}
		},
		toName: function(item){
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无基金名称';
			}
			return name;
		},
		toKSRQ: function(item){
			if(item && item[this.KSRQ_KEY]){
				return DATEFORMAT.toDate(item[this.KSRQ_KEY]);
			}else{
				return '';
			}
		},
		toYMGM: function(item){
			return NUMBERFORMAT.toYuan(item[this.YMGM_KEY]);
		},
		toSMJE: function(item){
			return NUMBERFORMAT.toYuan(item[this.SMJE_KEY]);
		},
		toJFMJGM: function(item){
			return NUMBERFORMAT.toYuan(item[this.JFMJGM_KEY]);
		},
		toJFSM: function(item){
			return NUMBERFORMAT.toYuan(item[this.JFSM_KEY]);
		},
		toBNFMJGM: function(item){
			return NUMBERFORMAT.toYuan(item[this.BNFMJGM_KEY]);
		},
		toBNFSM: function(item){
			return NUMBERFORMAT.toYuan(item[this.BNFSM_KEY]);
		},
		toNFMJGM: function(item){
			return NUMBERFORMAT.toYuan(item[this.NFMJGM_KEY]);
		},
		toNFSM: function(item){
			return NUMBERFORMAT.toYuan(item[this.NFSM_KEY]);
		},
		toStatus: function(item){
			if(item){
				return item[this.STATUS_KEY]
			}else{
				return item;
			}
		},
		toSYLFW: function(item){
			if(item){
				return item[this.SYLFW_KEY]
			}else{
				return item;
			}
		},
		toTCFPFW: function(item){
			if(item){
				return item[this.TCFPFW_KEY]
			}else{
				return item;
			}
		}
};

var NIANHUA={//年化收益和提成
		SHOUYI_KEY: 'rest_yield',
		TICHENG_KEY: 'rest_tc',
		YEWU_KEY: 'businessCommision',
		GUANLI_KEY: 'manageCommision',
		result: {},
		item: {},
		getByFidAndMidAndIid: function(fundid, managerid, investment){
			var params = JSON.stringify({fundid: fundid, managerid: managerid, investment: investment});
			var data = {url: '/api/investmentArchives/getYield', params: params};
			var me = this;
			$.ajax({ 
				type: 'post', 
				url: '../rest/item/get',
				data: data,
				dataType: 'json',
				async: false,
				success: function(result){
					me.result=result;
				},
				error: function(result){
					me.result=result;
					LOGIN.error(result);
				}
			});
			
			this.item = me.result[REST.RESULT_KEY];
			return this.item;
		}
};

var YIELDRANGE={
		ID_KEY: 'id',
		MIN_KEY: 'investment1',
		MAX_KEY: 'investment2',
		YIELD_KEY: 'yield',
		ajax_type: 'post',
		ajax_url: "../rest/yieldRange/getyieldrangebyid",
		ajax_data: {},
		ajax_dataType: 'json',
		ajax_async: false,
		item: {},
		result: {},
		success_callbacks:[],
		error_callbacks:[],
		add_success_callback: function(callback){//添加成功回调函数
			this.success_callbacks.push(callback);
		},
		success: function(){//执行成功回调函数
			var callbacks = this.success_callbacks;
			for(var i=0; i<callbacks.length; i++){
				callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
			}
		},
		add_error_callback: function(callback){//添加失败回调函数
			this.success_callbacks.push(callback);
		},
		error: function(){//执行失败回调函数
			LOGIN.error(this.result);
			var callbacks = this.error_callbacks;
			for(var i=0; i<callbacks.length; i++){
				callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
			}
		},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
		},
		get: function(id){
			this.ajax_data = {id: id};
			var me = this;
			$.ajax({ 
				type: me.ajax_type, 
				url: me.ajax_url, 
				data: me.ajax_data,
				dataType: me.ajax_dataType,
				async: me.ajax_async,
				success: function(result){
					me.result=result;
					me.success();
				},
				error: function(result){
					me.result=result;
					me.error();
				}
			});
			this.item = JSON.parse(this.result[REST.RESULT_KEY]);
			return this.item;
		},
		toMin: function(item){
			if(item){
				return item[this.MIN_KEY]
			}else{
				return item;
			}
		},
		toMax: function(item){
			if(item){
				return item[this.MAX_KEY]
			}else{
				return item;
			}
		},
		toYield: function(item){
			if(item){
				return item[this.YIELD_KEY]
			}else{
				return item;
			}
		}
};

var INVESTMENT={
		ID_KEY: 'id',
		ARCHIVENUM_KEY: 'archiveNum',
		CONTRACT_KEY: 'contractNum',
		DYCS_KEY: 'dycs',
		FUND_KEY: 'fund',
		USERNAME_KEY: 'username',
		CUSTOMER_KEY: 'customer',
		YWJL_KEY: 'ywjl',
		TZJE_KEY: 'tzje',
		NHSYL_KEY: 'nhsyl',
		TZQX_KEY: 'tzqx',
		RGRQ_KEY: 'rgrq',
		DQRQ_KEY: 'dqrq',
		FXFS_KEY: 'fxfs',
		DABZ_KEY: 'dabz',
		BMJL_KEY: 'bmjl',
		BM_KEY: 'bm',
		YWTC_KEY: 'ywtc',
		GLTC_KEY: 'gltc',
		DESCRIPTION_KEY: 'description',
		GLTCS_KEY: 'gltcs',
		YWTCS_KEY: 'ywtcs',
		ZJDYSJ_KEY: 'zjdysj',
		response: {},
		item: {},
		items: [],
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
		},
		getItems: function(){
			//同步加载数据
			if(!this.items || !this.items.length){
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i][this.ID_KEY]] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var params = JSON.stringify({id: id});
			var data = {url: '/api/investmentArchives/GetById', params: params};
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/item/get", 
				async: false,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response && response[REST.RESULT_KEY]){
						me.item = JSON.parse(response[REST.RESULT_KEY]);
					}
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
			return me.item;
		},
		getName:function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		}
};

var USERCOMMISSION={
		ID_KEY: 'id',
		USER_KEY: 'user',
		TCJE_KEY: 'tcje',
		TCBL_KEY: 'tcbl',
		TCFFSJ_KEY: 'tcffsj',
		GLFFSJ2_KEY: 'glffsj2',
		GLFFSJ3_KEY: 'glffsj3',
		SKR_KEY: 'skr',
		SJFFSJ_KEY: 'sjffsj',
		KHH_KEY: 'khh',
		YHZH_KEY: 'yhzh',
		response: {},
		item: {},
		items: [],
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
		},
		getItems: function(){
			//同步加载数据
			if(!this.items || !this.items.length){
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i][this.ID_KEY]] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var params = JSON.stringify({id: id});
			var data = {url: '/api/userCommision', params: params};
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/item/get", 
				async: false,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response && response[REST.RESULT_KEY]){
						me.item = JSON.parse(response[REST.RESULT_KEY]);
					}
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
			return me.item;
		},
		toUser:function(item){
			return item[this.USER_KEY];
		}
};

var CUSTOMER={
		ID_KEY: 'id',
		NAME_KEY: 'name',
		COUNTRY_KEY: 'country',
		CARDTYPE_KEY: 'credentialsType',
		CARDNUMBER_KEY: 'credentialsNumber',
		KHH_KEY: 'khh',
		YHZH_KEY: 'yhzh',
		PHONE_KEY: 'phone',
		POSTALCODE_KEY: 'postalcode',
		EMAIL_KEY: 'email',
		CALLADDRESS_KEY: 'callAddress',
		UPLOADFILES_KEY: 'uploadFiles',
		REMARK_KEY: 'remark',
		response: {},
		item: {},
		get: function(id){
			var me = this;
			var params = JSON.stringify({cid: id});
			var data = {url: '/api/customer/getcustomer', params: params};
			$.ajax({ 
				type: 'post', 
				url: '../rest/item/get', 
				data: data,
				dataType: 'json',
				async: false,
				success: function(response){
					me.response=response;
				},
				error: function(response){
					me.response=response;
					LOGIN.error(response);
				}
			});
			
			if(this.response[REST.RESULT_KEY]){
				me.item = JSON.parse(me.response[REST.RESULT_KEY]);
			}
			return me.item;
		},
		getName: function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		},
		getCountry: function(id){
			var item = this.get(id);
			var value = item[this.COUNTRY_KEY];
			if(!value){
				value = '其它';
			}
			return value;
		},
		getCardType: function(id){
			var item = this.get(id);
			var value = item[this.CARDTYPE_KEY];
			if(!value){
				value = '其它';
			}
			return value;
		},
		getCardNumber: function(id){
			var item = this.get(id);
			var value = item[this.CARDNUMBER_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		getKHH: function(id){
			var item = this.get(id);
			var value = item[this.KHH_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		getYHZH: function(id){
			var item = this.get(id);
			var value = item[this.YHZH_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toPhone: function(item){
			var value = item[this.PHONE_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toPostalCode: function(item){
			var value = item[this.POSTALCODE_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toEmail: function(item){
			var value = item[this.EMAIL_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toCallAddress: function(item){
			var value = item[this.CALLADDRESS_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toRemark: function(item){
			var value = item[this.REMARK_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toUploadFiles: function(item){
			if(item){
				return item[this.UPLOADFILES_KEY];
			}else{
				return item;
			}
		}
};

var TCFPFW = {
		ID_KEY: 'id',
		SFBX_KEY: 'allSell',
		YWTCBL_KEY: 'businessCommision',
		GLTCBL_KEY: 'manageCommision',
		BXSYL_KEY: 'investment',
		ajax_type: 'post',
		ajax_url: "../rest/item/get",
		ajax_data: {},
		ajax_dataType: 'json',
		ajax_async: false,
		rest_url: '/api/tcfpfw/gettcfpfwbyid',
		result: {},
		success_callbacks:[],
		error_callbacks:[],
		add_success_callback: function(callback){//添加成功回调函数
			this.success_callbacks.push(callback);
		},
		success: function(){//执行成功回调函数
			var callbacks = this.success_callbacks;
			for(var i=0; i<callbacks.length; i++){
				callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
			}
		},
		add_error_callback: function(callback){//添加失败回调函数
			this.success_callbacks.push(callback);
		},
		error: function(){//执行失败回调函数
			LOGIN.error(this.result);
			var callbacks = this.error_callbacks;
			for(var i=0; i<callbacks.length; i++){
				callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
			}
		},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
		},
		get: function(id){
			var item = {};
			var params = JSON.stringify({id: id});
			this.ajax_data = {url: this.rest_url, params: params};
			var me = this;
			$.ajax({ 
				type: me.ajax_type, 
				url: me.ajax_url, 
				data: me.ajax_data,
				dataType: me.ajax_dataType,
				async: me.ajax_async,
				success: function(result){
					me.result=result;
					me.success();
				},
				error: function(result){
					me.result=result;
					me.error();
				}
			});
			
			if(this.result[REST.RESULT_KEY]){
				item = JSON.parse(this.result[REST.RESULT_KEY]);
			}
			return item;
		},
		getByFundAndDM: function(fundid, dmid){
			var me = this;
			var item = {};
			var params = JSON.stringify({fundid: fundid, managerid: dmid});
			this.ajax_data = {url: '/api/tcfpfw/getcommision', params: params};
			$.ajax({ 
				type: me.ajax_type, 
				url: me.ajax_url, 
				data: me.ajax_data,
				dataType: me.ajax_dataType,
				async: me.ajax_async,
				success: function(result){
					me.result=result;
					me.success();
				},
				error: function(result){
					me.result=result;
					me.error();
				}
			});
			
			if(this.result[REST.RESULT_KEY]){
				item = JSON.parse(this.result[REST.RESULT_KEY]);
			}
			return item;
		},
		toSFBX: function(item){
			if(item){
				return item[this.SFBX_KEY]
			}else{
				return item;
			}
		},
		toYWTCBL: function(item){
			if(item){
				return item[this.YWTCBL_KEY]
			}else{
				return item;
			}
		},
		toGLTCBL: function(item){
			if(item){
				return item[this.GLTCBL_KEY]
			}else{
				return item;
			}
		},
		toBXSYL: function(item){
			if(item){
				return item[this.BXSYL_KEY]
			}else{
				return item;
			}
		}
};

var TypeConfig={//年化收益和提成
	NAME_KEY: 'mapName',
	SHOUYI_KEY: 'rest_yield',
	TICHENG_KEY: 'rest_tc',
	YEWU_KEY: 'businessCommision',
	GUANLI_KEY: 'manageCommision',
	result: {},
	item: {},
	map: {},
	ini: function(async){
		var type = 1;
		if(async=="undefined"){
			async = false;
		}
		var params = JSON.stringify({type: type});
		var data = {url: '/api/typeConfig/type', params: params};
		var me = this;
		$.ajax({
			type: 'post',
			url: '../rest/item/get',
			data: data,
			dataType: 'json',
			async: async,
			success: function(result){
				me.result=result;
				if(result && result.rest_result){
					me.items = JSON.parse(result.rest_result);
					this.items_cache = true;
				}
			},
			error: function(result){
				me.result=result;
				LOGIN.error(result);
			}
		});
	},
	getItems: function(){
		//同步加载数据
		if(!this.items_cache){
			this.ini(false);
			this.items_cache = true;
		}
		return this.items;
	},
	getMap: function(){
		if(JSON.stringify(this.map) == "{}"){
			var items = this.getItems();
			for(var i in items){
				this.map[items[i]['id']] = items[i];
			}
		}
		return this.map;
	},
	get: function(id){
		var map = this.getMap();
		return map[id];
	},
	getName:function(id){
		var item = this.get(id);
		var name = item[this.NAME_KEY];
		if(!name){
			name = '无中文名';
		}
		return name;
	}
};


var TYPE_Enumeration={
	FUND_ID: 1,
	BORROW_IN: 1,
	BORROW_OUT: 2,
	BORROW_LOST: 3,
	BORROW_DESTROY: 4
};

var BorrowStatus={
	NAME_KEY: 'mapName',
	SHOUYI_KEY: 'rest_yield',
	TICHENG_KEY: 'rest_tc',
	YEWU_KEY: 'businessCommision',
	GUANLI_KEY: 'manageCommision',
	result: {},
	item: {},
	map: {},
	ini: function(async){
		var type = 5;
		if(async=="undefined"){
			async = false;
		}
		var params = JSON.stringify({type: type});
		var data = {url: '/api/typeConfig/type', params: params};
		var me = this;
		$.ajax({
			type: 'post',
			url: '../rest/item/get',
			data: data,
			dataType: 'json',
			async: async,
			success: function(result){
				me.result=result;
				if(result && result.rest_result){
					me.items = JSON.parse(result.rest_result);
					this.items_cache = true;
				}
			},
			error: function(result){
				me.result=result;
				LOGIN.error(result);
			}
		});
	},
	getItems: function(){
		//同步加载数据
		if(!this.items_cache){
			this.ini(false);
			this.items_cache = true;
		}
		return this.items;
	},
	getMap: function(){
		if(JSON.stringify(this.map) == "{}"){
			var items = this.getItems();
			for(var i in items){
				this.map[items[i]['id']] = items[i];
			}
		}
		return this.map;
	},
	get: function(id){
		var map = this.getMap();
		return map[id];
	},
	getName:function(id){
		var item = this.get(id);
		var name = item[this.NAME_KEY];
		if(!name){
			name = '无中文名';
		}
		return name;
	}
};


//基金的状态
var FUND_STATUS={
		ID_KEY: 'id',
		NAME_KEY: 'mapName',
		ajax_type: 'post',
		ajax_url: "../rest/status/get",
		ajax_data: {type: 1},
		ajax_dataType: 'json',
		items_cache: false,//是否缓存完毕
		items: [],
		map: {},
		success: function(){},
		error: function(result){
			LOGIN.error(result);
		},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var me = this;
			$.ajax({ 
				type: me.ajax_type, 
				url: me.ajax_url, 
				data: me.ajax_data,
				dataType: me.ajax_dataType,
				async: async,
				success: function(result){
					if(result && result.rest_result){
						me.items = JSON.parse(result.rest_result);
					}
					me.items_cache = true;
					me.success();
				},
				error: function(result){
					me.error(result);
				}
			});
		},
		getItems: function(){
			if(!this.items_cache){
				//同步加载数据
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i]['id']] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		toId: function(item){
			if(item){
				return item[this.ID_KEY];
			}else{
				return item;
			}
		},
		toName: function(item){
			if(item){
				return item[this.NAME_KEY];
			}else{
				return '无状态';
			}
		}
};

var USER ={
		ID_KEY: 'id',
		NAME_KEY: 'chainName',
		DEPARTMENT_KEY: 'department',
		response: {},
		item: {},
		items: [],
		map: {},
		ini: function(async){
			//默认同步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({});
			var data = {url: '/api/user/findUserFromRole', params: params};
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/item/get", 
				async: async,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response && response[REST.RESULT_KEY]){
						me.items = JSON.parse(response[REST.RESULT_KEY]);
					}
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
		},
		getItems: function(){
			//同步加载数据
			if(!this.items || !this.items.length){
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i][this.ID_KEY]] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		getName:function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		},
		getDM: function(id){
			var user = this.get(id);
			var authority = 'ROLE_MANAGER';
			var department = user[this.DEPARTMENT_KEY];
			var departmentid = department[DEPARTMENT.ID_KEY];
			
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/user/get", 
				async: false,
				data: {
					authority: authority,
					departmentid: departmentid
				},
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response && response[REST.RESULT_KEY]){
						me.item = JSON.parse(response[REST.RESULT_KEY]);
					}
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
			
			return me.item;
		}
};

var DEPARTMENT={
		ID_KEY: 'id',
		NAME_KEY: 'deptName',
		items_cache: false,
		items:[],
		map: {},
		success: function(result){
		},
		error: function(result){
			LOGIN.error(result);
		},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/department/getAll", 
				async: async,
				data: {},
				dataType: "json",
				success: function(result){
					me.items = JSON.parse(result.rest_result);
				},
				error: function(result){
					if(LOGIN.error(result)){
						return;
					}
				}
			});
		},
		getItems: function(){
			//同步加载数据
			if(!this.items_cache){
				this.ini(false);
				this.items_cache = true;
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i]['id']] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		getName:function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		}
};

var LOGIN={
		USER_ID: '#login-user',
		KEY_ID: '#login-key',
		BUTTON_ID: '#login-button',
		LOGIN_ID: '#user-login',
		CLOSE_ID: '.ui-dialog-titlebar-close',
		response: {},
		user: {},
		ini: function(){
			var me = this;
			var login_btn = $(this.BUTTON_ID);
			if(login_btn){
				$(login_btn).click(function(){me.login();});
			}
			
			var password_input = $(this.KEY_ID);
			password_input.keyup(function(e){
				if(e && e.keyCode==13){
					me.login();
				}
			});
		},
		getUser: function(){
			if(JSON.stringify(this.user) == '{}'){
				var me = this;
				$.ajax({ 
					type: "post", 
					url: '../rest/login/user', 
					async: false,
					data: {},
					dataType: "json",
					success: function(response){
						me.response = response;
						me.user = response;
					},
					error: function(response){
						me.response = response;
						me.error(response);
					}
				});
			}
			return this.user;
		},
		login: function(){
			var username = $(this.USER_ID);
			var usernameValue = "";
			if(username){
				usernameValue = username.val();
			}
			
			var password = $(this.KEY_ID);
			var passwordValue = "";
			if(password){
				passwordValue = password.val();
			}
			
			if(!usernameValue){
				alert("请填写账号!");
				return false;
			}
			
			if(!passwordValue){
				alert("请填写密码!");
				return false;
			}
			
			var me = this;
			var login_status = true;
			$.ajax({ 
				type: "post", 
				url: '../rest/login/login', 
				async: false,
				data: {username: usernameValue, password: passwordValue},
				dataType: "json",
				success: function(result){
					if(window.location.pathname == "/jsy/view/login.jsp" || window.location.pathname == "/view/login.jsp"){
						window.location="./fund-list.jsp";
					}
					$(me.CLOSE_ID).click();
				},
				error: function(result){
					login_status = false;
					alert('登录失败，请刷新页面.');
				}
			});
			
			return login_status;
		},
		error: function(response){
			if(response && response.status == 401){
				$(this.LOGIN_ID).click();
				return false;
			}
			return true;
		}
};

var DATEFORMAT={
		toFormate: function(date, fmt){
			var time = new Date(date);
		    var o = {
		            "M+": time.getMonth() + 1, //月份 
		            "d+": time.getDate(), //日 
		            "h+": time.getHours(), //小时 
		            "m+": time.getMinutes(), //分 
		            "s+": time.getSeconds(), //秒 
		            "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		            "S": time.getMilliseconds() //毫秒 
		        };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		},
		toNumber: function(date){
			var fmt = "yyyyMMdd";
			return this.toFormate(date, fmt);
		},
		toCH: function(date){
			var fmt = "yyyy年MM月dd日";
			return this.toFormate(date, fmt);
		},
		toDate:function(date){
			var fmt="yyyy-MM-dd";
			return this.toFormate(date,fmt);
		},
		toTime: function(date){
			var fmt="yyyy-MM-dd hh:mm:ss";
			return this.toFormate(date,fmt);
		},
		toRest: function(date){
			var fmt="yyyy-MM-ddThh:mm:ssZ";
			return this.toFormate(date,fmt);
		}
};

var BOOLEANFORMAT={
		toBaoxiao: function(boolean){
			if(boolean){
				return '包销';
			}else{
				return '非包销';
			}
		}
};

var MONEYFORMAT={
		toCont: function(string){
			if(!string){
				return "";
			}
			string = JSON.stringify(string);
			if(string < 1){
				return string;
			}
			string = string.replace(/\D/g, '');
			return string.replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
		},
		toNumber: function (string){
			if(!string){
				return "0";
			}
			string = JSON.stringify(string);
			return string.replace(/\D/g, '');
		},
		toYuan: function(number){
			if(!number){
				return "";
			}
			number = JSON.stringify(number);
			number = number.replace(/\D/g, '');
			if(!number){
				return "";
			}
			return '￥' + number.replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
		}
};

var NUMBERFORMAT={
		toCount: function(number){
			if(!number){
				return "0";
			}
			number = JSON.stringify(number);
			number = number.replace(/\D/g, '');
			return number.replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
		},
		toRate: function(number){
			if(!number){
				return "";
			}
			
			number = 100 * number;
			return number + '%';
		},
		toYuan: function(number){
			if(!number){
				return "￥0";
			}
			number = JSON.stringify(number);
			number = number.replace(/\D/g, '');
			if(!number){
				return "";
			}
			return '￥' + number.replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
		}
};

var STRINGFORMAT={
		toNumber: function (string){
			if(!string){
				return "0";
			}
			string = JSON.stringify(string);
			return string.replace(/\D/g, '');
		},
		toYuan: function(number){
			if(!number){
				return "";
			}
			number = JSON.stringify(number);
			number = number.replace(/\D/g, '');
			if(!number){
				return "";
			}
			return '￥' + number.replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
		},
		toRate: function(string){
			if(!string){
				return '';
			}
			string = string.replace(/[^\d\.]/g, '');
			return string.replace(/(\.)(\d*)(\.)/ig, '$1$2') + '%';
		},
		toPayType: function(string){
			if(string == 'N'){
				return '年付';
			}else if(string == 'J'){
				return '季付';
			}else if(string == 'W'){
				return '半年付';
			}
			return '无付息方式';
		}
};

var RATEFORMAT={
		toNumber: function (rate){
			if(!rate){
				return "0";
			}
			
			rate = rate.replace(/%/, '');
			return rate/100;
		}
};

var FILE={
		ID_KEY: 'id',
		PATH_KEY: 'filePath',
		response: {},
		item: {},
		get: function(id){
			var me = this;
			var params = JSON.stringify({id: id});
			var data = {url: '/api/uploadFile/getById', params: params};
			$.ajax({ 
				type: 'post', 
				url: '../rest/item/get', 
				data: data,
				dataType: 'json',
				async: false,
				success: function(response){
					me.response=response;
				},
				error: function(response){
					me.response=response;
					LOGIN.error(response);
				}
			});
			
			if(me.response && me.response[REST.RESULT_KEY]){
				me.item = JSON.parse(me.response[REST.RESULT_KEY]);
			}
			return me.item;
		},
		toId: function(item){
			if(item){
				return item[this.ID_KEY];
			}else{
				return item;
			}
		},
		toItem: function(item){
			var id = this.toId(item);
			return this.get(id);
		},
		toPath: function(item){
			if(item && item[this.PATH_KEY]){
				return item[this.PATH_KEY];
			}else{
				return 404;
			}
			
		},
		upload: function(files){
			var rest_result = {};
			var data = new FormData();
			for(var i in files){
				data.append(i, files[i]);
			}
			
			$.ajax({
				type: 'POST',
				url: '../rest/file/upload', 
				data: data,/*必须false才会自动加上正确的Content-Type*/
				contentType: false,/*必须false才会避开jQuery对 formdata的默认处理,XMLHttpRequest会对formdata进行正确的处理*/
				processData: false,
				async: false,
				success: function(result){
					rest_result = result;
				},
				error: function(result){
					rest_result = result;
					LOGIN.error(result);
				}
			});
			var items = rest_result[REST.RESULT_KEY];
			return items;
		}
};

var NUMBER={
	isNumber:function(data){
		return !isNaN(data);
	}			
};
var DATABIND_FORM = {
	bindtarget_id : '',
	ini : function() {
		this.getColumns();
	},
	BindObject : {},
	AdditionalResources : [],
	_columns : null,
	getProperty : function(object, path) {
		var paths = path.split('.');
		var temp = object;
		for ( var i = 0; i < paths.length; i++) {
			var property = paths[i];
			temp = temp[property];
		}
		;
		return temp;
	},
	getColumns : function() {
		var columns = [];
		$(this.bindtarget_id + " .bind").each(function() {
			var cols = $(this).data();
			if (cols.member) {
				cols.context = $(this);
				columns.push(cols);
			}
		});
		this._columns = columns;
		console.log(columns);
		return columns;
	},
	/* start binding object value */
	binding : function(dataobject) {
		console.log(dataobject);
		if (dataobject != null) {
			this.BindObject = dataobject;
		}
		this.getColumns();
		for ( var key in this._columns) {
			var column = this._columns[key];
			var value = "";
			if (column['member'] != null) {
				if (column.bindtype == 'value') {
					value = this.getProperty(this.BindObject, column.member);
				}
				if (column.bindtype == "list" && column.bindobject != null)
					value = this.AdditionalResources[column.bindobject]
				.get(this.getProperty(this.BindObject,
					column.member))[column.displaymember];
			}
			if (column.format != null) {
				// todo edit
				value = FORMATPRIVED.formatValue(column.format, value);
			}
			var tagtype=column.context.prop('tagName');
			if(tagtype=='LABEL'){
				column.context.html(value);
			}
			if(tagtype=="INPUT"){
				column.context.val(value);
			}
		}
	}
};
//数据大小验证
var NUMBERCHECK={
	items:{},
	errorfunc:null,
	startCheck:function(){
		var me=this;
		$('input[class=datacheck]').each(function(){
		    var object=$($(this)[0]);
		    if(object.data('minnumber')!=null && object.data('maxnumber') !=null){
		    	me.items[$(this)[0].id]=$(this).data();
		    	$(this).keyup(function(){		    		
		    		var number=parseInt($(this).val());
		    		var item=me.items[$(this)[0].id];
		    		if(!NUMBER.isNumber($(this).val())){
		    			if(me.errorfunc){
		    				$(this).val(item['minnumber']);
		    			 	me.errorfunc(this,'NaN');
		    			 }
		    			return;
		    		}
		    		if(number < item['minnumber']){
		    			$(this).val(item['minnumber']);
		    			 if(me.errorfunc){
		    			 	me.errorfunc(this,'min');
		    			 }
		    		}
		    		if(number > item['maxnumber']){
		    			$(this).val(item['maxnumber']);
		    			if(me.errorfunc){
		    			 	me.errorfunc(this,"max");
		    			 }
		    		}
		    	});
		    }			
		});
	}
};
var INVESTMENT_SY={
    items:[],
    rest_result:'',
    getYFLX:function(){    	
    	var result=0;
    	for(var key in this.items){
    		var item=this.items[key];
    		if(item.sffx){
    			result+=item.lx;
    		}
    	}
    	return result;
    },
    getWFLX:function(){
    	var result=0;
    	for(var key in this.items){
    		var item=this.items[key];
    		if(!item.sffx){
    			result+=item.lx;
    		}
    	}
    	return result;
    },
    getYFDate:function(){
    	var result='';
        var data=[];
        for(var key in this.items){
    		var item=this.items[key];
    		if(item.sffx){
    			data.push(item);
    		}
    	}
    	var length = data.length;
    	if(length==0){return "没有数据";}
    	if(length==1){
    		result=DATEFORMAT.toCH(data[0].fxsj);
    		return result;
    	}else{
    		result=DATEFORMAT.toCH(data[0].fxsj);
    		result=result+" 至 " +DATEFORMAT.toCH(data[length-1].fxsj);
    	}   
    	return result; 	
    },
    getData:function(archiveNum){
    	var me=this;
		var params = JSON.stringify({
			archiveNum : archiveNum 
			//archiveNum
		});
		var data = {
			url : '/api/investmentArchives/getProceeds',
			params : params
		};
		var result=0;
		$.ajax({
			type : 'post',
			url : '../rest/item/get',
			data : data,
			dataType : 'json',
			async : false,
			success : function(rest_result) {
				me.rest_result = rest_result;
				if (rest_result[REST.RESULT_KEY]) {
					result = JSON.parse(rest_result[REST.RESULT_KEY]);
					me.items=result;
				}
			},
			error : function(result) {
				me.rest_result = result;
				//alert("error");
			}
		});
		return result;
    }
};

var MESSAGEBOX={
		show:function(msg){
			  $("#jsy_msgbox_comfirm_dialog").click(function(){
					$("#jsy_msgbox_light").css("display","none");
					$("#jsy_msgbox_fade").css("display","none");
				});	
			  $("#jsy_msgbox_light").css("display","block");
			  $("#jsy_msgbox_fade").css("display","block");
			  $('#jsy_messagebox_msg').html(msg);	  
			}
		};