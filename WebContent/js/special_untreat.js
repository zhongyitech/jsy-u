//页面加载完成后添加点击事件]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
$(document).ready(function () {
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
    table_id: "#table_ID",
    item: '',
    user: {},
    fund: {},
    customer: {},
    department: {},
    databind: DATABIND_FORM,
    rest_result: {},
    investmentid: null,
    userContext: {},
    savebtnid: "#save_btn",
    archiveNum: '',
    submit_error: false,
    success: function () {
        // this.set();
        console.log(this.item);
        if (this.item['dazt'] != 0) {
            this.error("些投资档案已经有特殊申请了，不能再做特殊申请！");
            return;
        }
        this.databind.BindObject = this.item;
        this.setData();
        var fund_select = $('#fundselect');
        $('#fundselect').find('option').remove();
        $.io.get({url: '/api/fund/selectList', params: {exInclude: this.item.fund.id}}).success(function (result) {
            $.dom.select(fund_select, result);
        });
    },
    init: function () {

        if (window.location.search.substr(1).split('&').length > 0) {
            var args = window.location.search.substr(1).split('&')[0].split('=');
            var investid = args[1];
            if (investid != null) {
                this.investmentid = args[1];
            }
        }
        console.log('investmentid : ' + this.investmentid);
        var me = this;
        $(this.savebtnid).attr('disabled', true);
        $("#input_ztsye").keyup(function () {

            var maxamount = parseInt($('#ysye_lab').text());
            var destamcount = parseInt($(this).val());
            if (destamcount > maxamount) {
                $('#lab_tzsy').addClass("vailderror");
            } else {
                $('#lab_tzsy').removeClass("vailderror");
            }
        });
        $(this.savebtnid).click(function () {
            me.save();
        });
        //this.databind.bindtarget_id = '#bindtarget_id';
        this.databind.AdditionalResources = {
            user: this.user,
            customer: this.customer,
            fund: this.fund,
            department: this.department
        };
        if (this.investmentid != null) {
            this.getData();
        }
        //输入合同编号之事查询数据，并设置界面显示
        $('#input_htbh').change(function () {
            var input = $(this).val();
            if (input != null) {
                me.getDataOfHtbh(input.trim());
            }
        });

        $("#new_htbh").change(function () {
            $.io.get({url: '/api/investmentArchives/contractNumCanAdd', params: {num: $("#new_htbh").val()}})
                .success(function (result) {
                    if (result) {
                        $("#fundselect").val(result.fund.id);
                        $("#new_htbh").removeClass('valid_error');
                        $("#new_htbh").attr("placeholder", "合同编号")
                    } else {
                        $("#new_htbh").addClass('valid_error');
                        $("#new_htbh").attr("placeholder", "合同编号没有登记")
                    }
                }).error(function (error) {
                    $("#new_htbh").addClass('valid_error');
                    $("#new_htbh").attr("placeholder", error.msg);
                });
        });
    },
    valid: function () {
        this.submit_error = this.submit_error || ($('#fundselect').val() == '') || ($('#input_htbh').val() == '');
    },
    save: function () {
        this.valid();
        var me = this;

        if (this.submit_error) {
            this.showinfo("数据填写有误！请修改数据。");
            return;
        }
        var ztjjid = $('#fundselect').val();
        var fundName = $('#s_fundname').text();
        var postData = {
            oldArchivesId: this.investmentid,
            customer: {
                id: this.item.customer.id
            },
            ztjj: {
                id: ztjjid
            },
            fundName: fundName,
            newfundName: $("#fundselect").find("option:selected").text().trim(),
            htbh: this.item.contractNum,
            dqrq: DATEFORMAT.toRest(this.item.dqrq),
            rgrq: DATEFORMAT.toRest(this.item.rgrq),
            rgje: this.item.tzje,
            yfsysjd: $('#lab_yfsy_descript').html().trim(),
            yfsyze: this.item.paysy_amount,
            xjjmc: $("#fundselect").find("option:selected").text().trim(),
            xhtbh: $('#inew_htbh').val().trim(),

            kcwyjbl: 0,
            kcwyj: 0,

            yqsye: this.item.ysye,
            ydyqsyl: this.item.nhsyl,
            ywtchsbl: this.item.ywtc,
            ywtchsje: this.item.ywtc_amount,
            gltchsbl: this.item.gltc,
            gltchsje: this.item.gltc_amount,

            // 转变投本金额
            ztje: $('#input_ztje').val(),
            sqr: {
                id: LOGIN.getUser().id
            },
            sqbm: this.item.department,
            // 备注
            bz: $('#lab-bz').val(),
        };
        console.log(postData);
        var params = {};
        var entity = JSON.stringify(postData);
        var data = {
            url: '/api/wdqztsq',
            params: params,
            entity: entity
        };
        $(this.savebtnid).attr("disabled", true);
        $(this.savebtnid).html("数据提交中。。。");
        $.io.post(data).success(function (resutl) {
            $(me.savebtnid).attr('disabled', true);
            $(me.savebtnid).html("申请单已经提交成功！");
            me.showinfo('申请单提交成功');
        })
            .error(function (error) {
                $(me.savebtnid).html("提交申请");
                $(me.savebtnid).attr('disabled', false);
                me.showinfo(error.msg);
            });
        //$.ajax({
        //	type : 'post',
        //	url : '../rest/item/post',
        //	data : data,
        //	dataType : 'json',
        //	async : false,
        //	success : function(rest_result) {
        //		console.log(rest_result);
        //		this.rest_result = rest_result;
        //		if (rest_result[REST.RESULT_KEY]) {
        //			me.showinfo("申请单提交成功");
        //			posResault=true;
        //		}
        //		else{
        //			me.error('提交申请出错。');
        //		}
        //	},
        //	error : function(result) {
        //		me.error("error");
        //	}
        //});
        //$(this.savebtnid).attr('disabled',posResault);
        //if(posResault){
        //	$(this.savebtnid).html("申请单已经提交成功！");
        //}else{
        //	$(this.savebtnid).html("提交申请");
        //}
    },

    setData: function () {
        // 格式化获取的数据
        this.item.department = "部门";
        this.item.sqr = LOGIN.getUser().chainName;
        // 手动设置转投本金金额
        $('#input_newamount').val(this.item.tzje);
        //申请时间
        this.item.scrq = DATEFORMAT.toDate(new Date());
        //添加违约金信息
        if (this.item['kcwyjbl'] == null) {
            this.item['kcwyjbl'] = 0.05;
        }
        this.item.wyamount = this.item.tzje * this.item.kcwyjbl;

        INVESTMENT_SY.getData(this.item.archiveNum);

        this.item.ywtc_amount = this.item.ywtc * this.item.tzje;
        //管理提成金额
        this.item.gltc_amount = this.item.gltc * this.item.tzje;
        //已付收益总额
        this.item.paysy_amount = INVESTMENT_SY.getYFLX();
        //未付收益
        this.item.ysye = INVESTMENT_SY.getWFLX();

        //设置已付收益情况信息
        $('#lab_yfsy_descript').html(INVESTMENT_SY.getYFDate());

        $('#input_ztje').val(this.item.tzje);
        $('#input_ztje').data('maxnumber', this.item.tzje);

        this.databind.binding(this.item);
        NUMBERCHECK.startCheck();
        $(this.savebtnid).attr('disabled', false);
    },
    formatValue: function (type, data) {
    },
    error: function (errormsg) {
        MESSAGEBOX.show(errormsg);
    },
    showinfo: function (msg) {
        MESSAGEBOX.show(msg);
    },
    getDataOfHtbh: function (htbh) {
        var me = this;
        var data = {
            url: '/api/investmentArchives/getByContractNum',
            params: {contractNum: htbh}
        };
        $.io.get(data).success(function (result) {
            if (result) {
                me.item = result;
                me.success();
                $('#input_htbh').removeClass("valid_error");
            } else {
                $.message.error("此合同编号没有使用!");
                $('#input_htbh').addClass("valid_error");
            }
        }).error(function (error) {
            $('#input_htbh').addClass("valid_error");
        });
        //$.ajax({
        //	type : 'post',
        //	url : '../rest/item/post',
        //	data : data,
        //	dataType : 'json',
        //	async : false,
        //	success : function(rest_result) {
        //		me.rest_result = rest_result;
        //		var result=JSON.parse(rest_result[REST.RESULT_KEY]);
        //		if (result) {
        //		 	if(result.length > 0){
        //			me.item = result[0];
        //			console.log(me.item);
        //			me.success();
        //			}else{
        //				me.error("没有找到此合同编号的投资档案");
        //			}
        //		}else{
        //			me.error("返回数据有误");
        //		}
        //	},
        //	error : function(result) {
        //		me.rest_result = result;
        //		("error:" +result);
        //	}
        //});
    },
    getData: function () {
        var me = this;
        var data = {
            url: '/api/investmentArchives/getByIdSpecial',
            params: {id: me.investmentid}
        };
        $.io.get(data).success(function (result) {
            if (result) {
                me.item = result;
                me.success();
                $('#input_htbh').removeClass("valid_error");
            } else {
                $.message.error("获取数据出错!");
            }
        });
    }
};


// 数据格式化类
var FORMATPRIVED = {
    formatValue: function (name, data) {
        var fun = FORMATPRIVED[name];
        if (fun != null) {
            return fun(data);
        }
        return data;
    },
    money: function (data) {
        return MONEYFORMAT.toYuan(data);
    },
    date: function (data) {
        return DATEFORMAT.toDate(data);
    },
    time: function (data) {
        return DATEFORMAT.toTime(data);
    },
    rate: function (data) {
        return NUMBERFORMAT.toRate(data);
    }
};
var CUSTOMER = {
    itmes: {},
    success: {},
    item: {},
    get: function (id) {
        var rest_result = {};
        var item = {};
        var params = JSON.stringify({
            cid: id
        });
        var data = {
            url: '/api/customer/getcustomer',
            params: params
        };
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                rest_result = result;
            },
            error: function (result) {
            }
        });

        if (rest_result[REST.RESULT_KEY]) {
            item = (rest_result[REST.RESULT_KEY]);
        }
        return item;
    }
};