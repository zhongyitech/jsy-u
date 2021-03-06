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
});

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
	submit_error:false,
	loginuser:{},
	success : function() {
		// this.set();
		console.log(this.item);
		if(this.item['dazt']!=0){
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
		NUMBERCHECK.errorfunc=function(object,type){
				console.log(type);
				console.log(object);
		};
		if(window.location.search.substr(1).split('&').length>0)
        {
			var args=window.location.search.substr(1).split('&')[0].split('=');
			var investid=args[1];
			if(investid!=null){
				this.investmentid=args[1];
			}
		}
		this.loginuser=LOGIN.getUser();
		
		console.log('investmentid : '+this.investmentid);				
		$(this.savebtnid).attr('disabled',true);
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
		if(this.investmentid!=null){
			this.getData();
		}	
			//输入合同编号之事查询数据，并设置界面显示
		$('#input_htbh').change(function(){
			var input=$(this).val();
			if(input!=null){				
				me.getDataOfHtbh(input.trim());
				}
		});
	},
	valid:function(){
		this.submit_error=($('#fundselect').val()=='');
	},
	//计算总金额并设置提示信息
	sumTzje : function() {
		var total = 0;
		total = parseInt($('#input_ztsye').val()) + parseInt($('#input_newamount').val());
		
		$('#ztje_totalamount').text(total);

		var result=this.validTotalAmount(total);
		   if(!result){
		   	   $('#valid_lab').addClass("vailderror");
		   }else{
		   		$('#valid_lab').removeClass("vailderror");
		   }	
		console.log(this.submit_error);
	},
	validTotalAmount : function(amount) {
		var result= (amount % 100000 )== 0 ;
		this.submit_error =  this.submit_error |  (!result);
		return result;
	},
	save : function() {
		
		this.valid();		
		this.sumTzje();
		
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
			ztjj : {
				id : ztjjid
			},
			fundName : fundName,
			newfundName:$("#fundselect").find("option:selected").text().trim(),
			htbh : this.item.contractNum,
			dqrq : DATEFORMAT.toRest(this.item.dqrq),
			rgrq :DATEFORMAT.toRest(this.item.rgrq),
			rgje : this.item.tzje,

			// 转投收益额
			ztsye : $('#input_ztsye').val(),
			// 转变投本金额
			ztje : $('#input_newamount').val(),
			sqr : {
				id : this.loginuser.id
			},
			sqbm : this.item.department,
			// 备注
			bz : $('#lab-bz').val(),
		};
		console.log(postData);

		var params = {};
		var entity = JSON.stringify(postData);
		var data = {
			url : '/api/dqztsq',
			params : params,
			entity : entity
		};

		$(this.savebtnid).attr("disabled",true);
		$(this.savebtnid).html("数据提交中。。。");

		var me=this;
		var posResault=false;
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
					
					posResault=true;
				}						
				else{
					me.error('保存申请单出错。');
				}		
			},
			error : function(result) {
				me.error("error");
			}
		});	
		$(this.savebtnid).attr('disabled',posResault);
		if(posResault){
			$(this.savebtnid).html("申请单已经提交成功！");
		}else{
			$(this.savebtnid).html("保存申请单");
		}
	},
	
	setData : function() {
		this.investmentid=this.item.id;
		// 格式化获取的数据
		this.item.department = "部门";
		this.item.sqr = this.loginuser.chainName;

		INVESTMENT_SY.getData(this.item.archiveNum);
		this.item.ysye = INVESTMENT_SY.getWFLX() ;  //this. getUnPayAmount();

		// 手动设置转投本金金额
		$('#input_newamount').val(this.item.tzje);
		$('#input_ztsye').val(this.item.ysye);

		$('#input_newamount').data('maxnumber',this.item.tzje);
		$('#input_ztsye').data('maxnumber',this.item.ysye);		
		
        //设置转投收益的最大输入值
		this.databind.binding(this.item);
		this.sumTzje();		
		$(this.savebtnid).attr('disabled',false);
	},
	getUnPayAmount:function(){
        var me=this;
		var params = JSON.stringify({
			archiveNum : me.investmentid
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
				}
			},
			error : function(result) {
				me.rest_result = result;
				me.error("error");
			}
		});
		return result;
	},
	error:function(errormsg){
		MESSAGEBOX.show(errormsg);
	},
	showinfo:function(msg){
		MESSAGEBOX.show(msg);	
	},
	getDataOfHtbh:function(htbh){
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
				var result=JSON.parse(rest_result[REST.RESULT_KEY]);
				if (result) {
				 	if(result.length > 0){					
					me.item = result[0];
					console.log(me.item);
					me.success();
					}else{
						me.error("没有找到此合同编号的投资档案");
					}
				}else{
					me.error("返回数据有误");
				}
			},
			error : function(result) {
				me.rest_result = result;
				("error:" +result);
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
				}else{
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
