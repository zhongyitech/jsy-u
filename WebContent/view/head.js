$(document).ready(function(){
	LOGIN.ini(true);
	NOTIFICATION.ini();
});

var REST={
		RESULT_KEY: 'rest_result',
		TOTAL_KEY: 'rest_total',
		REST_STATUS_KEY: 'rest_status',
		REST_STATUS_SUCCESS:'suc',
		REST_STATUS_ERROR:'err',	
		MSG_KEY: 'rest_information',
		STATUS_KEY: 'status',
		STATUS_OK: 200
};

var PAGE={
		INVESMENT_PRINT: './investment-print.jsp',
		FUND_LIST: './fund-list.jsp',
		FUND_EDIT: './fund-edit.jsp',
		CUSTOMER_LIST: './customer-list.jsp',
		CUSTOMER_EDIT: './customer-edit.jsp',
		USER_LIST: './user-list.jsp',
		USER_CREATE: './user-create.jsp',
		USER_EDIT: './user-edit.jsp',
		DEPARTMENT_LIST: './department-list.jsp',
		DEPARTMENT_CREATE: './department-create.jsp',
		DEPARTMENT_EDIT: './department-edit.jsp',
		COMPANY_LIST: './company-list.jsp',
		COMPANY_CREATE: './company-create.jsp',
		COMPANY_EDIT: './company-edit.jsp',
		ROLE_LIST: './role-list.jsp',
		ROLE_CREATE: './role-create.jsp',
		ROLE_EDIT: './role-edit.jsp',
		AUTHORITY_LIST: './authority-list.jsp',//权限管理页面
		AUTHORITY_EDIT: './authority-edit.jsp',//权限编辑页面
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

var TASK={
		ID_KEY: 'id',
		SSMK_KEY: 'ssmk',
		CLJS_KEY: 'cljs',//处理角色
		CLSJ_KEY: 'clsj',//处理时间
		STATUS_KEY: 'status',	
		CJSJ_KEY: 'cjsj',	
		CLR_KEY: 'clr',	
		URL_KEY: 'url',
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toSSMK: function(item){
			if(item){
				var v = item[this.SSMK_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCLJS: function(item){
			if(item){
				var v = item[this.CLJS_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCLSJ: function(item){
			if(item){
				var v = item[this.CLSJ_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toStatus: function(item){
			if(item){
				return item[this.STATUS_KEY];
			}else{
				return '';
			}
		},
		toCJSJ: function(item){
			if(item){
				var v = item[this.CJSJ_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCLR: function(item){
			if(item){
				var v = item[this.CLR_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toURL: function(item){
			if(item){
				var v = item[this.URL_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		}
	};

var NOTIFICATION={
		ini: function(){
			NOTIFICATION_TASK.ini();
		}
};

var NOTIFICATION_TASK={
		PARENT_ID: '#notification',
		VIEW_ID: '#notification-task',
		TOTAL_ID: '#item-total',
		LIST_ID: '#item-list',
		getView: function(){
			return $(this.PARENT_ID).find(this.VIEW_ID);
		},
		setView: function(response){
			this.setTotal(response);
			this.setList(response);
		},
		ini: function(){
			this.set();
		},
		set: function(){
			var params = JSON.stringify({});
			var entity = JSON.stringify({
				startposition: 0,
				pagesize: 6,
				keyword: ''
			});
			var data = {url: '/api/toDoTask/getTodo', params: params, entity: entity};
			
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					me.setView(response);
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
		},
		getListView: function(){
			return this.getView().find(this.LIST_ID);
		},
		setList: function(response){
			var list_view = this.getListView();
			var list = list_view.find('li');
			if(list && list.length){
				for(var i=0; i<list.length; i++){
					$(list[i]).remove();
				}
			}
			
			if(response){
				this.items = JSON.parse(response[REST.RESULT_KEY]);
			}else{
				this.items = [];
			}
			
			var items = this.items;
			for(var i=0; i<items.length; i++){
				this.add(items[i]);
			}
		},
		add: function(item){
			var list_view = this.getListView();
			var li = $('<li></li>');
			list_view.append(li);
			
			var icon_span = $('<span class="btn bg-red icon-notification glyph-icon icon-tasks"></span>');
			li.append(icon_span);
			
			var text_span = $('<span class="notification-text"></span>');
			li.append(text_span);
			
			var id = TASK.toId(item);
			if(id){
				var ssmk = TASK.toSSMK(item);
				var url = TASK.toURL(item);
				var a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + ssmk + '">' + ssmk + '</a>');
				text_span.append(a);
			}
			
			var time_span = $('<div class="notification-time"></div>');
			li.append(time_span);
			var time = TASK.toCJSJ(item);
			time = DATEFORMAT.toDate(time);
			time_span.text(time);
		},
		getTotalView: function(){
			return this.getView().find(this.TOTAL_ID);
		},
		setTotal: function(response){
			if(response){
				this.total = JSON.parse(response[REST.TOTAL_KEY]);
			}else{
				this.total = 0;
			}
			var total = this.total;
			var total_view = this.getTotalView();
			
			if(total){
				total_view.removeClass('hide');
				if(total > 99){
					total_view.text('99+');
				}else{
					total_view.text(total);
				}
			}else{
				total_view.addClass('hide');
			}
		}
};

var FUND={//基金
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
		TZQX_KEY: 'kxzqx',
		SYLFW_KEY: 'yieldRange',
		TCFPFW_KEY: 'tcfpfw',
		response: {},
		items: [],
		map: {},
		ini: function(async){//缓存数据
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
		getName: function(id){
			if(id){
				var map = this.getMap();
				var item = map[id];
				if(item){
					return item[this.NAME_KEY]
				}else{
					return '无基金名称';
				}
			}else{
				return '无基金名称';
			}
		},
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toNumber: function(item){
			if(item){
				if(item[this.NUMBER_KEY]){
					return item[this.NUMBER_KEY]
				}else{
					return '无编号';
				}
			}else{
				return '';
			}
		},
		toName: function(item){
			if(item){
				if(item[this.NAME_KEY]){
					return item[this.NAME_KEY]
				}else{
					return '无基金名称';
				}
			}else{
				return '';
			}
		},
		toKSRQ: function(item){
			if(item && item[this.KSRQ_KEY]){
				return DATEFORMAT.toDate(item[this.KSRQ_KEY]);
			}else{
				return '';
			}
		},
		toYMGM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.YMGM_KEY]);
			}else{
				return '';
			}
		},
		toSMJE: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.SMJE_KEY]);
			}else{
				return '';
			}
		},
		toJFMJGM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.JFMJGM_KEY]);
			}else{
				return '';
			}
		},
		toJFSM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.JFSM_KEY]);
			}else{
				return '';
			}
		},
		toBNFMJGM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.BNFMJGM_KEY]);
			}else{
				return '';
			}
		},
		toBNFSM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.BNFSM_KEY]);
			}else{
				return '';
			}
		},
		toNFMJGM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.NFMJGM_KEY]);
			}else{
				return '';
			}
		},
		toNFSM: function(item){
			if(item){
				return NUMBERFORMAT.toYuan(item[this.NFSM_KEY]);
			}else{
				return '';
			}
		},
		toStatus: function(item){
			if(item){
				return item[this.STATUS_KEY]
			}else{
				return item;
			}
		},
		toTZQX: function(item){
			if(item){
				return item[this.TZQX_KEY]
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

var TZQX_REST={
		ID_KEY: 'id',
		JSZ_KEY: 'jsz',
		DW_KEY: 'dw',
		result: {},
		item: {},
		get: function(id){
			if(!id){
				id = '';
			}
			
			var params = JSON.stringify({id: id});
			var data = {url: '/api/kxzqx/getById', params: params};
			var me = this;
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
			
			if(me.response){
				me.item = JSON.parse(me.response[REST.RESULT_KEY]);
			}
			return me.item;
		},
		getByFund: function(id){
			var params = JSON.stringify({id: id});
			var data = {url: '/api/fund/getKxzqx', params: params};
			var me = this;
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
			
			return JSON.parse(this.response['rest_result']);
		},
		toId: function(item){
			if(item){
				return item[this.ID_KEY];
			}else{
				return item;
			}
		},
		toJSZ: function(item){
			if(item){
				return item[this.JSZ_KEY];
			}else{
				return item;
			}
		},
		toDW: function(item){
			if(item){
				return item[this.DW_KEY];
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
		DQRQ_KEY: 'dqrq',//到期日期
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
			if(!id){
				return '';
			}
			
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
		},
		toDQRQ: function(item){//到期日期
			if(item){
				var v = item[this.DQRQ_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		}
};

var USERCOMMISSION={
		ID_KEY: 'id',
		USER_KEY: 'user',//提成人
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
		CARDTYPE_KEY: 'credentialsType',//证件类型
		ZJLX_KEY: 'credentialsType',//证件类型
		CARDNUMBER_KEY: 'credentialsNumber',
		ZJHM_KEY: 'credentialsNumber',
		SFZDZ_KEY: 'credentialsAddr',
		KHH_KEY: 'khh',
		YHZH_KEY: 'yhzh',
		PHONE_KEY: 'phone',
		POSTALCODE_KEY: 'postalcode',//邮政编码
		YZBM_KEY: 'postalcode',//邮政编码
		EMAIL_KEY: 'email',
		ADDRESS_KEY: 'callAddress',//通信地址
		CALLADDRESS_KEY: 'callAddress',
		UPLOADFILES_KEY: 'uploadFiles',
		ATTACHMENT_KEY: 'uploadFiles',
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
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCountry: function(item){
			if(item){
				var v = item[this.COUNTRY_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toZJLX: function(item){//证件类型
			if(item){
				var v = item[this.ZJLX_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toZJHM: function(item){//证件号码
			if(item){
				var v = item[this.CARDNUMBER_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toSFZDZ: function(item){//身份证地址
			if(item){
				var v = item[this.SFZDZ_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toKHH: function(item){//开户行
			if(item){
				var v = item[this.KHH_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toYHZH: function(item){//银行账号
			if(item){
				var v = item[this.YHZH_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toPhone: function(item){
			if(item){
				var v = item[this.PHONE_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toYZBM: function(item){//邮政编码
			if(item){
				var v = item[this.YZBM_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toPostalCode: function(item){
			var value = item[this.POSTALCODE_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toEmail: function(item){
			if(item){
				var v = item[this.EMAIL_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toAddress: function(item){
			if(item){
				var v = item[this.ADDRESS_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCallAddress: function(item){
			var value = item[this.CALLADDRESS_KEY];
			if(!value){
				value = '';
			}
			return value;
		},
		toAttachment: function(item){//附件
			if(item){
				var v = item[this.ATTACHMENT_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toRemark: function(item){//备注
			if(item){
				var v = item[this.REMARK_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
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
		BMJL_KEY: 'manageerId',
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
		toId: function(item){
			if(item){
				return item[this.ID_KEY]
			}else{
				return item;
			}
		},
		toBMJL: function(item){
			if(item){
				return item[this.BMJL_KEY]
			}else{
				return item;
			}
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

var YHZH_PURPOSE={//用途
		ID_KEY: 'id',
		NAME_KEY: 'mapName',
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({type: TYPE_Enumeration.YHZH_ID});
			var data = {url: '/api/typeConfig/type', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		}
};

var COMPANY_TYPE={
		ID_KEY: 'id',
		NAME_KEY: 'mapName',
		VALUE_KEY: 'mapValue',
		VALUE_GENNERAL: 1,
		VALUE_PARTNER: 2,
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({type: TYPE_Enumeration.COMPANY_ID});
			var data = {url: '/api/typeConfig/type', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toValue: function(item){
			if(item){
				var v = item[this.VALUE_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
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
		if(async=="undefined"){
			async = false;
		}
		var	type=3;
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

var RoomConfig={//档案室
	NAME_KEY: 'mapName',
	SHOUYI_KEY: 'rest_yield',
	TICHENG_KEY: 'rest_tc',
	YEWU_KEY: 'businessCommision',
	GUANLI_KEY: 'manageCommision',
	result: {},
	item: {},
	map: {},
	ini: function(async){
		if(async=="undefined"){
			async = false;
		}
		var	type=4;
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
	BORROW_DESTROY: 4,
	COMPANY_ID: 6,//公司类型
	YHZH_ID: 7
};

var BorrowStatus={
	IN_STORE: 11,
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
	getName:function(id) {
		var item = this.get(id);
		if (item) {
			var name = item[this.NAME_KEY];
			if (!name) {
				name = '无中文名';
			}
			return name;
		}else{
			return '无中文名';
		}
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
		getName:function(id){
			var item=this.get(id);
			if(item!=null){
				return item[this.NAME_KEY];
			}
			return '未定义';
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
				return '';
			}
		}
};

//权限
var AUTHORITY={
		ID_KEY: 'id',
		ROLE_KEY: 'role',//角色名称
		RESOURCE_KEY: 'resource',//权限
		OPERATIONS_KEY: 'operations',//操作
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({});
			var data = {url: '/api/role/readAll', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toAuthority: function(item){
			if(item){
				var v = item[this.AUTHORITY_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		}
}

//角色
var ROLE={
		ID_KEY: 'id',
		NAME_KEY: 'name',//角色名称
		AUTHORITY_KEY: 'authority',//权限
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({});
			var data = {url: '/api/role/readAll', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toAuthority: function(item){
			if(item){
				var v = item[this.AUTHORITY_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		}
}

var USER ={
		ID_KEY: 'id',
		ACCOUNT_KEY: 'username',//账号
		PASSWORD_KEY: 'password',//密码
		ENABLED_KEY: 'enabled',//是否启用
		NAME_KEY: 'chainName',//中文名
		DEPARTMENT_KEY: 'department',//部门
		SKR_KEY: 'skr',//银行账号
		KHH_KEY: 'khh',//开户行
		YHZH_KEY: 'yhzh',//银行账号
		ROLE_KEY: 'role',//角色
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
		},
		toId: function(item){
			if(item){
				return item[this.ID_KEY]
			}else{
				return item;
			}
		},
		toAccount: function(item){
			if(item){
				return item[this.ACCOUNT_KEY]
			}else{
				return '';
			}
		},
		toEnabled: function(item){
			if(item){
				var v = item[this.ENABLED_KEY];
				if(v){
					return v;
				}else{
					return false;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toDepartment: function(item){
			if(item){
				var v = item[this.DEPARTMENT_KEY];
				if(v){
					return v;
				}
			}
			return '';
		},
		toSKR: function(item){//收款人
			if(item){
				var v = item[this.SKR_KEY];
				if(v){
					return v;
				}
			}
			return '';
		},
		toKHH: function(item){//开户行
			if(item){
				var v = item[this.KHH_KEY];
				if(v){
					return v;
				}
			}
			return '';
		},
		toYHZH: function(item){//银行账号
			if(item){
				var v = item[this.YHZH_KEY];
				if(v){
					return v;
				}
			}
			return '';
		},
		toRole: function(item){//角色
			if(item){
				var v = item[this.ROLE_KEY];
				if(v){
					return v;
				}
			}
			return '';
		},
		toView: function(item){//转换为显示用字符串
			if(item){
				var account = this.toAccount(item);
				var name = this.toName(item);
				return name + '(' + account + ')';
			}else{
				return item;
			}
		}
};

var YHZH={//银行账户
		ID_KEY: 'id',
		ACCOUNT_KEY: 'account',//账号
		HM_KEY: 'accountName',//户名
		YHMC_KEY: 'bankName',//银行名称
		KHH_KEY: 'bankOfDeposit',//开户行
		ISDEFAULT_KEY: 'defaultAccount',//是否默认账号
		PURPOSE_KEY: 'purpose',//用途
		get: function(id){
			var me = this;
			var params = JSON.stringify({id: id});
			var data = {url: '/api/bankAccount/findById', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toAccount: function(item){
			if(item){
				var v = item[this.ACCOUNT_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toHM: function(item){
			if(item){
				var v = item[this.HM_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toYHMC: function(item){
			if(item){
				var v = item[this.YHMC_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toKHH: function(item){
			if(item){
				var v = item[this.KHH_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toIsDefault: function(item){
			if(item){
				var v = item[this.ISDEFAULT_KEY];
				if(v){
					return v;
				}else{
					return false;
				}
			}
			
			return '';
		},
		toPurpose: function(item){
			if(item){
				var v = item[this.PURPOSE_KEY];
				if(v){
					return v;
				}else{
					return false;
				}
			}
			
			return '';
		}
};

//公司
var COMPANY={
		ID_KEY: 'id',
		NAME_KEY: 'companyName',//公司名称
		NICKNAME_KEY: 'companyNickName',//公司简称
		TYPE_KEY: 'companyType',//公司类型
		TEMPLATE_KEY: 'protocolTemplate',//协议模板
		ADDRESS_KEY: 'address',//注册地址
		PARTNER_KEY: 'partners',//合伙人
		PARENT_KEY: 'head',//总公司
		FUND_KEY: 'fund',//基金
		FRDB_KEY: 'corporate',//法人代表
		SHENG_KEY: 'province',//省
		CITY_KEY: 'city',//市
		XIAN_KEY: 'area',//县
		STATUS_KEY: 'status',//状态
		FOUND_KEY: 'foundingDate',//成立日期
		ASSIGNER_KEY: 'responsiblePerson',//责任人
		PHONE_KEY: 'telephone',//联系电话
		FAX_KEY: 'fax',//传真
		DESCRIPTION_KEY: 'companyDescription',//公司描述
		REMARK_KEY: 'remark',//备注
		YHZH_KEY: 'bankAccount',//银行账户
		map: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({});
			var data = {url: '/api/fundCompanyInformation/readAll', params: params};
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
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toNickname: function(item){
			if(item){
				var v = item[this.NICKNAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toType: function(item){
			if(item){
				var v = item[this.TYPE_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toTemplate: function(item){
			if(item){
				var v = item[this.TEMPLATE_KEY];
				if(v){
					return v;
				}else{
					return '0';
				}
			}
			
			return '';
		},
		toAddress: function(item){
			if(item){
				var v = item[this.ADDRESS_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toPartner: function(item){
			if(item){
				var v = item[this.PARTNER_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toFund: function(item){
			if(item){
				var v = item[this.FUND_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toParent: function(item){
			if(item){
				var v = item[this.PARENT_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toFRDB: function(item){
			if(item){
				var v = item[this.FRDB_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toMJZH: function(item){
			if(item){
				var v = item[this.MJZH_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toSHENG: function(item){
			if(item){
				var v = item[this.SHENG_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toCity: function(item){
			if(item){
				var v = item[this.CITY_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toXIAN: function(item){
			if(item){
				var v = item[this.XIAN_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toStatus: function(item){
			if(item){
				var v = item[this.STATUS_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toFound: function(item){
			if(item){
				var v = item[this.FOUND_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toAssigner: function(item){
			if(item){
				var v = item[this.ASSIGNER_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toPhone: function(item){
			if(item){
				var v = item[this.PHONE_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toFax: function(item){
			if(item){
				var v = item[this.FAX_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toDescription: function(item){
			if(item){
				var v = item[this.DESCRIPTION_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toYHZH: function(item){
			if(item){
				var v = item[this.YHZH_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		}
}

var DEPARTMENT={
		ID_KEY: 'id',
		NAME_KEY: 'deptName',//部门名称
		COMPANY_KEY: 'fundCompanyInformation',//所属公司
		DESCRIPTION_KEY: 'description',//所属公司
		items_cache: false,
		items:[],
		map: {},
		success: function(result){
		},
		error: function(result){
			LOGIN.error(result);
		},
		ini: function(async){//缓存数据
			if(!async){
				async = false;
			}
			
			var params = JSON.stringify({});
			var data = {url: '/api/department/readAll', params: params};
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
			if(!this.items || !this.items.length){
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
		getName:function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		},
		toItem: function(item){
			if(item){
				var id = item[this.ID_KEY];
				if(id){
					return this.get(id);
				}
			}
			
			return '';
		},
		toId: function(item){
			if(item){
				var v = item[this.ID_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toName: function(item){
			if(item){
				var v = item[this.NAME_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toCompany: function(item){
			if(item){
				var v = item[this.COMPANY_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		},
		toDescription: function(item){
			if(item){
				var v = item[this.DESCRIPTION_KEY];
				if(v){
					return v;
				}
			}
			
			return '';
		}
};

var LOGIN={
		USERNAME_ID: '#login-username',
		USER_ID: '#login-user',
		KEY_ID: '#login-key',
		BUTTON_ID: '#login-button',
		LOGOUT_BUTTON_ID: '#user-logout',
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

			var logout_btn = $(this.LOGOUT_BUTTON_ID);
			if(logout_btn){
				$(logout_btn).click(function(){me.logout();});
			}
			
			var password_input = $(this.KEY_ID);
			password_input.keyup(function(e){
				if(e && e.keyCode==13){
					me.login();
				}
			});
			me.setView();
		},
		setUser: function(item){
			var user = item;
			var username_span = $(this.USERNAME_ID);
			if(user){
				var id = USER.toId(user);
				if(id){
					var name = USER.toName(user);
					var account = USER.toAccount(user);
					username_span.text(name + '(' + account + ')');
				}else{
					username_span.text('未登录');
				}
			}else{
				username_span.text('未登录');
			}
		},
		setView: function(){
			var me = this;
			var params = JSON.stringify({});
			var entity = JSON.stringify({});
			var data = {url: '/api/user/getUser', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: '../rest/item/get', 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					me.setUser(response);
				},
				error: function(response){
					me.response = response;
					me.setUser(response);
					me.error(response);
				}
			});
		},
		getUser: function(){
			var me = this;
			var params = JSON.stringify({});
			var entity = JSON.stringify({});
			var data = {url: '/api/user/getUser', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: '../rest/item/get', 
				async: false,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
				},
				error: function(response){
					me.response = response;
					me.error(response);
				}
			});
			return me.response;
		},
		logout: function(){
			var me = this;
			$.ajax({ 
				type: "post", 
				url: '../rest/login/logout', 
				async: false,
				data: {},
				dataType: "json",
				success: function(response){
					me.response = response;
				},
				error: function(response){
					me.response = response;
				}
			});
			
			this.setView();
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
				success: function(response){
					if(window.location.pathname == "/jsy/view/login.jsp" || window.location.pathname == "/view/login.jsp"){
						window.location= PAGE.FUND_LIST;
					}
					me.setView();
					$(me.CLOSE_ID).click();
					password.val('');
				},
				error: function(response){
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
			if(!date){
				return '';
			}
			
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
			if(number == 0){
				return '0%';
			}
			
			if(!number){
				return "";
			}
			number = NUMBER.toFixed(100 * number);
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
			if(string == '0'){
				return '0';
			}
			
			if(!string){
				return "";
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
			
			if(!string){
				return '';
			}
			
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
		},
		toFXFS: function(string){
			if(string == 'N'){
				return '年付';
			}else if(string == 'J'){
				return '季付';
			}else if(string == 'W'){
				return '半年付';
			}
			return '无付息方式';
		},
		toVers: function(s){
			if(s){
				return s[3];
			}else{
				return '';
			}
		}
};

var RATEFORMAT={
		toNumber: function (rate){
			if(!rate){
				return 0;
			}
			
			rate = rate.replace(/%/, '');
			return rate/100;
		}
};

var FILE={
		ID_KEY: 'id',
		PATH_KEY: 'filePath',
		NAME_KEY: 'fileName',
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
		},
		getForm: function(){
			return $('<form></form>').append($('#invest-attachment')[0]);;
		}
};

var NUMBER={
	isNumber:function(data){
		return !isNaN(data);
	},
	toFixed: function(n){
		return n.toFixed(9)/1;
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
			archiveNum : 'I2015010611'//archiveNum
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

//消息提示框带选择功能
var MESSAGEBOX = {
    yesfunc: null,
    nofunc: null,
    cancelfunc: null,
    show: function (msg)
    {
        this.hidebutton();
        $("#jsy_msgbox_comfirm_dialog").show();
        $("#jsy_msgbox_comfirm_dialog").click(function ()
        {
            $("#jsy_msgbox_light").css("display", "none");
            $("#jsy_msgbox_fade").css("display", "none");
            this.close();
        });
        $("#jsy_msgbox_light").css("display", "block");
        $("#jsy_msgbox_fade").css("display", "block");
        $('#jsy_messagebox_msg').html(msg);
    },
    close: function ()
    {
        this.hidebutton();
        $("#jsy_msgbox_light").css("display", "none");
        $("#jsy_msgbox_fade").css("display", "none");
    },
    hidebutton: function ()
    {
        $('#jsy_msgbox_yes').hide();
        $('#jsy_msgbox_no').hide();
        $('#jsy_msgbox_cancel').hide();
        $('#jsy_msgbox_comfirm_dialog').hide();
    },
    showYesNo: function (msg, okfunc)
    {
        var button = "yes,no";
        var funcs = [{ "yes": okfunc}];
        this.dialog(msg, button, funcs);
    },
    dialog: function (msg, button, funcs)
    {
        this.hidebutton();
        if (button == null || button == undefined)
        {
            MESSAGEBOX.show(msg);
            return;
        } else
        {
            var buts = button.split(',');
            for (var b in buts)
            {
                $('#jsy_msgbox_' + buts[b]).show();
            }
        }
        if (funcs != null && funcs != undefined)
        {
            for (var fun in funcs)
            {
                this[funcs[fun].name + 'func'] = funcs[fun].func;
            }
        }
        $('#jsy_msgbox_yes').click(function ()
        {
            if (MESSAGEBOX.yesfunc != null)
            {
                MESSAGEBOX.yesfunc();
                MESSAGEBOX.yesfunc = null;
            }
            MESSAGEBOX.close();
        });
        $('#jsy_msgbox_no').click(function ()
        {
            if (MESSAGEBOX.nofunc != null)
            {
                MESSAGEBOX.nofunc();
                MESSAGEBOX.nofunc = null;
            }
            MESSAGEBOX.close();
        });
        $('#jsy_msgbox_cancel').click(function ()
        {
            if (MESSAGEBOX.cancelfunc != null)
            {
                MESSAGEBOX.cancelfunc();
                MESSAGEBOX.cancelfunc = null;
            }
            MESSAGEBOX.close();
        });
        $("#jsy_msgbox_comfirm_dialog").click(function ()
        {
            MESSAGEBOX.close();
        });
        $("#jsy_msgbox_light").css("display", "block");
        $("#jsy_msgbox_fade").css("display", "block");
        $('#jsy_messagebox_msg').html(msg);
    }
};