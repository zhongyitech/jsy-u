//页面加载完成后添加点击事件]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
$(document).ready(function() {
	USER.ini(true);
	FUND.ini(true);
	VIEWDATA.fund = FUND;
	VIEWDATA.user = USER;
	VIEWDATA.customer = CUSTOMER;
	VIEWDATA.department = DEPARTMENT;
	VIEWDATA.databind = DATABIND_FORM;
	VIEWDATA.init(true);
	VIEWMODE_PAYUSER.ini();
});

var VIEWMODE_PAYUSER = {
	TABLE_ID : '#payinfo_table',
	ADD_ID : '#funds-add',
	REMOVE_ID : '#funds-remove',
	SAVE_ID : '#funds-save',
	TR_KEY : 'tr_key',
	key : 0,
	items : [],
	ini : function() {
		var me = this;
		$(this.ADD_ID).click(function() {
			me.add();
		});

		$(this.REMOVE_ID).click(function() {
			me.remove();
		});

		$(this.SAVE_ID).click(function() {
			me.save();
		});
	},
	get : function(key) {
		return this.items[key];
	},
	set : function(items) {
		if (items && items.length) {
			for ( var i in items) {
				this.add(items[i]);
			}
		}
		var me = this;
		for ( var i = 0; i < 5; i++) {
			me.add();
		}
	},
	add : function(item) {
		var me = this;
		var key = this.key++;
		var table = $(this.TABLE_ID);
		var tr = $('<tr key="' + key + '"></tr>');
		table.append(tr);

		var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
		tr.append(checkbox);

		var row = $('<td><div class="form-input "><input name="paydate" class="col-md-12 tcal tcalInput"></div></td>');
		tr.append(row);

		var row = $('<td><div class="form-input "><input name="payamount" ></div></td>');
		tr.append(row);

		var row = $('<td><div class="form-input "><input name="payaccount" ></div></td>');
		tr.append(row);

		var row = $('<td><div class="form-input "><input name="paybanknumber" ></div></td>');
		tr.append(row);
		f_tcalInit();
	},
	save : function() {//保存
		var items = this.getItems();
		//清空数组
		items.length = 0;
		var table = $(this.TABLE_ID);
		var trs = table.find('tr');

		for ( var i = 1; i < trs.length; i++) {
			var tr = $(trs.get(i));
			var payuser = {};

			var paydate = tr.find('input[name="paydate"]').val();
			if (paydate) {
				payuser['paydate'] = DATEFORMAT.toRest(yewu);
			}

			var payamount = tr.find('input[name="payamount"]').val();
			if (payamount) {
				payuser['payamount'] = tpayamount;
			}

			var payaccount = tr.find('input[name="payaccount"]').val();
			if (payaccount) {
				payuser['payaccount'] = payaccount;
			}

			var paybanknumber = tr.find('input[name="paybanknumber"]').val();
			if (payaccount) {
				payuser['paybanknumber'] = paybanknumber;
			}
			items.push(item);
		}		
		return items;
	},
	getItems : function() {
		return this.items;
	},
	remove : function() {
		var table = $(this.TABLE_ID);
		var trs = table.find('tr');
		for ( var i = 1; i < trs.length; i++) {
			var tr = $(trs.get(i));
			var checkbox = tr.find('input[name="checkbox"]');
			if (checkbox.length > 0) {
				if (checkbox.get(0)['checked']) {
					tr.remove();
				}
			}
		}
	},
};

var VIEWDATA = {
	table_id : "#table_ID",
	item : '',
	user : {},
	fund : {},
	customer : {},
	department : {},
	databind : DATABIND_FORM,
	rest_result : {},
	investmentid : null,
	userContext : {},
	savebtnid : "#save_btn",
	submit_error : false,
	loginuser : {},
	success : function() {
		// this.set();
		//console.log(this.item);
		if (this.item['dazt'] != 0) {
			this.error("些投资档案已经有特殊申请了，不能再做特殊申请！");
			return;
		}
		this.databind.BindObject = this.item;
		this.setData();
		var fund_select = $('#fundselect');
		//		fund_select.clear();
		$('#fundselect').find('option').remove();
		var funds = this.fund.getItems();
		if (funds) {
			var option = $('<option></option>');
			fund_select.append(option);
			for ( var i in funds) {
				var fundid = funds[i][this.fund.ID_KEY];
				var fundname = funds[i][this.fund.NAME_KEY];
				var option = $('<option value="' + fundid + '">' + fundname
						+ '</option>');
				fund_select.append(option);
			}
		}
		NUMBERCHECK.startCheck();
	},
	init : function() {
		var me = this;
		NUMBERCHECK.errorfunc = function(object, type) {
			console.log(type);
			console.log(object);
		};
		if (window.location.search.substr(1).split('&').length > 0) {
			var args = window.location.search.substr(1).split('&')[0]
					.split('=');
			var investid = args[1];
			if (investid != null) {
				this.investmentid = args[1];
			}
		}
		this.loginuser = LOGIN.getUser();

		console.log('investmentid : ' + this.investmentid);
		$(this.savebtnid).attr('disabled', true);
		//转投收益额验证
		$("#input_ztsye").keyup(function() {
			me.sumTzje();
		});
		$(this.savebtnid).click(function() {
			me.save();
		});

		//验证总金额		
		$('#input_newamount').keyup(function() {
			me.sumTzje();
		});

		this.databind.bindtarget_id = '#bindtarget_id';
		this.databind.AdditionalResources = {
			user : this.user,
			customer : this.customer,
			fund : this.fund,
			department : this.department
		};
		if (this.investmentid != null) {
			this.getData();
		}
		//输入合同编号之事查询数据，并设置界面显示
		$('#input_htbh').change(function() {
			var input = $(this).val();
			if (input != null) {
				me.getDataOfHtbh(input.trim());
			}
		});
	},
	valid : function() {
		this.submit_error = ($('#fundselect').val() == '');
	},
	//计算总金额并设置提示信息
	sumTzje : function() {
		var total = 0;
		total = parseInt($('#input_ztsye').val())
				+ parseInt($('#input_newamount').val());

		$('#ztje_totalamount').text(total);

		var result = this.validTotalAmount(total);
		if (!result) {
			$('#valid_lab').addClass("vailderror");
		} else {
			$('#valid_lab').removeClass("vailderror");
		}
		console.log(this.submit_error);
	},
	validTotalAmount : function(amount) {
		var result = (amount % 100000) == 0;
		this.submit_error = this.submit_error | (!result);
		return result;
	},
	save : function() {

		this.valid();
		this.sumTzje();

		var payuser = VIEWMODE_PAYUSER.save();

		if (this.submit_error) {
			this.error("数据填写有误！请修改数据。");
			return;
		}
		var ztjjid = $('#fundselect').val();
		var fundName = $('#s_fundname').text();
		var postData = {
			oldArchivesId : this.investmentid,
			customer : {
				id : this.item.customer.id
			},
			fundName : fundName,
			htbh : this.item.contractNum,
			dqrq : DATEFORMAT.toRest(this.item.dqrq),
			rgrq : DATEFORMAT.toRest(this.item.rgrq),
			rgje : this.item.tzje,

			sqr : {
				id : this.loginuser.id
			},
			sqbm : this.item.department,
			// 备注
			bz : $('#lab-bz').val(),
			//付款人信息
			payuser : payuser,
			bankaccount : $("#bankaccount").find("option:selected").text()
					.trim(),
		};
		console.log(postData);

		var params = {};
		var entity = JSON.stringify(postData);
		var data = {
			url : '/api/dqztsq',
			params : params,
			entity : entity
		};

		$(this.savebtnid).attr("disabled", true);
		$(this.savebtnid).html("数据提交中。。。");

		var me = this;
		var posResault = false;
		$.ajax({
			type : 'post',
			url : '../rest/item/post',
			data : data,
			dataType : 'json',
			async : false,
			success : function(rest_result) {
				console.log(rest_result);
				this.rest_result = rest_result;
				if (rest_result[REST.RESULT_KEY]) {
					me.showinfo('申请单提交成功');
					posResault = true;
				} else {
					me.error('提交申请出错。');
				}
			},
			error : function(result) {
				me.error("error");
			}
		});
		$(this.savebtnid).attr('disabled', posResault);
		if (posResault) {
			$(this.savebtnid).html("申请单已经提交成功！");
		} else {
			$(this.savebtnid).html("提交申请");
		}
	},

	setData : function() {
		this.investmentid = this.item.id;
		// 格式化获取的数据
		this.item.department = "部门";
		this.item.sqr = this.loginuser.chainName;
		//申请时间
		this.item.scrq = DATEFORMAT.toDate(new Date());

		INVESTMENT_SY.getData(this.item.archiveNum);
		this.item.ysye = INVESTMENT_SY.getWFLX(); //this. getUnPayAmount();

		// 手动设置转投本金金额
		$('#input_newamount').val(this.item.tzje);
		$('#input_ztsye').val(this.item.ysye);

		$('#input_newamount').data('maxnumber', this.item.tzje);
		$('#input_ztsye').data('maxnumber', this.item.ysye);

		//设置转投收益的最大输入值
		this.databind.binding(this.item);
		this.sumTzje();
		$(this.savebtnid).attr('disabled', false);
	},
	getUnPayAmount : function() {
		var me = this;
		var params = JSON.stringify({
			archiveNum : me.investmentid
		});
		var data = {
			url : '/api/investmentArchives/getProceeds',
			params : params
		};
		var result = 0;
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
				}
			},
			error : function(result) {
				me.rest_result = result;
				me.error("error");
			}
		});
		return result;
	},
	error : function(errormsg) {
		MESSAGEBOX.show(errormsg);
	},
	showinfo : function(msg) {
		MESSAGEBOX.show(msg);
	},
	getDataOfHtbh : function(htbh) {
		var me = this;
		var params = JSON.stringify({
			keyword : htbh
		});
		var data = {
			url : '/api/investmentArchives/readAllForPage',
			entity : params
		};
		$.ajax({
			type : 'post',
			url : '../rest/item/post',
			data : data,
			dataType : 'json',
			async : false,
			success : function(rest_result) {
				me.rest_result = rest_result;
				var result = JSON.parse(rest_result[REST.RESULT_KEY]);
				if (result) {
					if (result.length > 0) {
						me.item = result[0];
						console.log(me.item);
						me.success();
					} else {
						me.error("没有找到此合同编号的投资档案");
					}
				} else {
					me.error("返回数据有误");
				}
			},
			error : function(result) {
				me.rest_result = result;
				("error:" + result);
			}
		});
	},
	getData : function() {
		var me = this;
		var params = JSON.stringify({
			iaid : me.investmentid
		});
		var data = {
			url : '/api/dqztsq/getIAInfo',
			params : params
		};
		$.ajax({
			type : 'post',
			url : '../rest/item/get',
			data : data,
			dataType : 'json',
			async : true,
			success : function(rest_result) {
				me.rest_result = rest_result;
				if (rest_result[REST.RESULT_KEY]) {
					me.item = JSON.parse(rest_result[REST.RESULT_KEY]);
					console.log(me.item);
					me.success();
				} else {
					me.error("没有找到此合同编号的投资档案");
				}
			},
			error : function(result) {
				me.rest_result = result;
				me.error("error");
			}
		});
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
		return temp;
	},
	setProperty : function(object, path, value) {
		var paths = path.split('.');
		var temp = object;
		var icount = paths.length;
		for ( var i = 0; i < paths.length - 1; i++) {
			temp = object[paths[i]];
		}
		temp[paths[icount - 1]] = value;
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
	//将值写回去绑定的对象
	writeToBindObject : function() {
		if (this.BindObject != null) {
			for ( var key in this._columns) {
				var col = this._columns[key];
				if (col['bindtype'] == 'value') {
					var member = col['member'];
					var value = null;
					var tagtype = col.context.prop('tagName');
					if (tagtype == 'LABEL') {
						value = col.context.html();
					}
					if (tagtype == "INPUT") {
						value = col.context.val();
					}
					if (value == null) {
						value = col.context.html();
					}
					this.setProperty(this.BindObject, member, value);
				}
			}
		}
	},
	/* start binding object value */
	binding : function(dataobject) {
		// console.log(dataobject);
		// console.log(getUser());
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
					//this._bingtypes['value'](column);
				}
				if (column.bindtype == "list" && column.bindobject != null) {
					value = this.AdditionalResources[column.bindobject]
							.get(this.getProperty(this.BindObject,
									column.member))[column.displaymember];
				}
			}
			if (column.format != null) {
				// todo edit
				value = FORMATPRIVED.formatValue(column.format, value);
			}
			var tagtype = column.context.prop('tagName');
			if (tagtype == 'LABEL' || tagtype == 'SPAN' || tagtype == 'BUTTON') {
				column.context.html(value);
			}
			if (tagtype == "INPUT") {
				column.context.val(value);
			}
		}
	},
};
//数据大小验证
// var NUMBERCHECK={
// 	items:{},
// 	errorfunc:{},
// 	startCheck:function(){
// 		var me=this;
// 		$('input[class=datacheck]').each(function(){
// 		    var object=$($(this)[0]);
// 		    if(object.data('minnumber')!=null && object.data('maxnumber') !=null){
// 		    	me.items[$(this)[0].id]=$(this).data();
// 		    	$(this).keyup(function(){		    		
// 		    		var number=parseInt($(this).val());
// 		    		var item=me.items[$(this)[0].id];
// 		    		if(!NUMBER.isNumber($(this).val())){
// 		    			if(me.errorfunc){
// 		    				$(this).val(item['minnumber']);
// 		    			 	me.errorfunc(this,'NaN');
// 		    			 }
// 		    			return;
// 		    		}
// 		    		if(number < item['minnumber']){
// 		    			$(this).val(item['minnumber']);
// 		    			 if(me.errorfunc){
// 		    			 	me.errorfunc(this,'min');
// 		    			 }
// 		    		}
// 		    		if(number > item['maxnumber']){
// 		    			$(this).val(item['maxnumber']);
// 		    			if(me.errorfunc){
// 		    			 	me.errorfunc(this,"max");
// 		    			 }
// 		    		}
// 		    	});
// 		    }			
// 		});
// 	}
// };
// 数据格式化类
var FORMATPRIVED = {
	formatValue : function(name, data) {
		var fun = FORMATPRIVED[name];
		if (fun != null) {
			return fun(data);
		}
		return data;
	},
	money : function(data) {
		return MONEYFORMAT.toYuan(data);
	},
	date : function(data) {
		return DATEFORMAT.toDate(data);
	},
	time : function(data) {
		return DATEFORMAT.toTime(data);
	}
};
var CUSTOMER = {
	itmes : {},
	success : {},
	item : {},
	get : function(id) {
		var rest_result = {};
		var item = {};
		var params = JSON.stringify({
			cid : id
		});
		var data = {
			url : '/api/customer/getcustomer',
			params : params
		};
		$.ajax({
			type : 'post',
			url : '../rest/item/get',
			data : data,
			dataType : 'json',
			async : false,
			success : function(result) {
				rest_result = result;
			},
			error : function(result) {
			}
		});

		if (rest_result[REST.RESULT_KEY]) {
			item = JSON.parse(rest_result[REST.RESULT_KEY]);
		}
		return item;
	}
};
