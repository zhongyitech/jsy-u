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
	archiveNum : '',
	submit_error : false,
	success : function() {
		// this.set();
		console.log(this.item);
		if (this.item['dazt'] != 0) {
			this.error("些投资档案已经有特殊申请了，不能再做特殊申请！");
			return;
		}
		this.databind.BindObject = this.item;
		this.setData();
		var fund_select = $('#fundselect');

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
	},
	init : function() {
		if (window.location.search.substr(1).split('&').length > 0) {
			var args = window.location.search.substr(1).split('&')[0]
					.split('=');
			var investid = args[1];
			if (investid != null) {
				this.investmentid = args[1];
			}
		}
		console.log('investmentid : ' + this.investmentid);
		// test code
		this.archiveNum = 'I2015010611';
		var me = this;
		$(this.savebtnid).attr('disabled', true);
		$("#input_ztsye").keyup(function() {

			var maxamount = parseInt($('#ysye_lab').text());
			var destamcount = parseInt($(this).val());
			if (destamcount > maxamount) {
				$('#lab_tzsy').addClass("vailderror");
			} else {
				$('#lab_tzsy').removeClass("vailderror");
			}
		});
		$(this.savebtnid).click(function() {
			me.save();
		});

		// this.databind.bindtarget_id = '#bindtarget_id';
		this.databind.AdditionalResources = {
			user : this.user,
			customer : this.customer,
			fund : this.fund,
			department : this.department
		};
		if (this.investmentid != null) {
			this.getData();
		}
		// 输入合同编号之事查询数据，并设置界面显示
		$('#input_htbh').change(function() {
			var input = $(this).val();
			if (input != null) {
				me.getDataOfHtbh(input.trim());
			}
		});

		$('#input_kcwyjbl').change(function() {
			// this.item['wyamount']=$().val()
		});

	},
	valid : function() {

	},
	save : function() {
		var me = this;
		var error = false;
		var maxamount = parseInt($('#ysye_lab').text());
		var destamcount = parseInt($('#input_ztsye').val());
		if (destamcount > maxamount) {
			this.submit_error = this.submit_error || true;
		}

		if (this.submit_error) {
			this.error("数据填写有误！请修改数据。");
			return;
		}

		// var ztjjid = $('#fundselect').val();
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
			yfsysjd : $('#lab_yfsy_descript').html(),
			yfsyze : this.item.paysy_amount,
			sqthrq : DATEFORMAT.toRest(this.item.scrq),
			thje : $('#input_newamount').val(),
			xjjmc : $('#fundselect').text().trim(),

			// 转投本金额
			ztsye : $('#input_ztje').val(),
			kcwyjbl : $('#input_kcwyjbl').val(),
			kcwyj : this.item['wyamount'],
			ydyqsyl : this.item.nhsyl,
			yqsye : this.item.ysye,
			ywtchsbl : this.item.ywtc,
			ywtchsje : this.item.ywtc_amount,
			gltchsbl : this.item.gltc,
			gltchsje : this.item.gltc_amount,

			khh : $('#custome_bank').html().trim(),
			yhzh : $('#customer_bankaccount').html().trim(),
			skr : this.customer.get(this.item.customer.id).name,
			sqr : {
				id : LOGIN.getUser().id
			},
			sqbm : this.item.department,
			// 备注
			bz : $('#lab-bz').val(),
		};
		console.log(postData);

		var params = {};
		var entity = JSON.stringify(postData);
		var data = {
			url : '/api/thclsq',
			params : params,
			entity : entity
		};

		$(this.savebtnid).attr("disabled", true);
		$(this.savebtnid).html("数据提交中。。。");

		var resultAction = false;
		$.ajax({
			type : 'post',
			url : '../rest/item/post',
			data : data,
			dataType : 'json',
			async : false,
			success : function(rest_result) {
				console.log(rest_result);
				this.rest_result = rest_result;
				if (rest_result["rest_status"] == REST.RESULT_SUCCESS) {
					if (rest_result[REST.RESULT_KEY]) {
						resultAction = true;
						me.error("申请单提交成功");
					}
				} else {
					me.error('提交申请出错。');
				}
			},
			error : function(result) {
				me.error("error");
			}
		});
		$(this.savebtnid).attr("disabled", false);
		$(this.savebtnid).html("提交申请");
		if (resultAction) {
			window.location = "./invest-list.jsp";
		}
	},
	showOkInfo : function(msg) {
		$("#infotext").html(msg);
		$('.infobox').show();
	},
	setData : function() {
		// this.archiveNum=this.item.archiveNum;
		// 格式化获取的数据
		this.item.department = "部门";
		this.item.sqr = LOGIN.getUser().chainName;
		// 申请时间
		this.item.scrq = DATEFORMAT.toDate(new Date());
		// 手动设置转投本金金额
		$('#input_newamount').val(this.item.tzje);
		$('#input_newamount').data('maxnumber', this.item.tzje);
		if (this.item['kcwyjbl'] == null) {
			this.item['kcwyjbl'] = 0.05;
		}
		this.item.wyamount = this.item.tzje * this.item.kcwyjbl;

		INVESTMENT_SY.getData(this.item.archiveNum);

		this.item.ywtc_amount = this.item.ywtc * this.item.tzje;
		// 管理提成金额
		this.item.gltc_amount = this.item.gltc * this.item.tzje;
		// 已付收益总额
		this.item.paysy_amount = INVESTMENT_SY.getYFLX();
		// 未付收益
		this.item.ysye = INVESTMENT_SY.getWFLX();

		$('#th-date').val(DATEFORMAT.toDate(Date()));

		// 设置已付收益情况信息
		$('#lab_yfsy_descript').html(INVESTMENT_SY.getYFDate());

		this.databind.binding(this.item);
		NUMBERCHECK.startCheck();
		// this.sumTzje();
		$(this.savebtnid).attr('disabled', false);
	},
	formatValue : function(type, data) {
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
				alert("error");
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
				}
				me.success();
			},
			error : function(result) {
				me.rest_result = result;
				alert("error");
			}
		});
	}
};

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
	},
	rate : function(data) {
		return NUMBERFORMAT.toRate(data);
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