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
    },
    init: function () {

        this.investmentid = PAGE.getParam('investmentid');
        var me = this;
        $(this.savebtnid).attr('disabled', true);

        $(this.savebtnid).click(function () {
            me.save();
        });
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
        //检测要合并的合同编号
        $('#input_htbh2').change(function () {
            var input = $(this).val();
            if (input != null) {
                if (me.item.contractNum == input.trim()) {
                    $.message.error("合同编号是本档案名称,请重新输入!");
                    $('#input_htbh2').val("");
                    $('#input_htbh2').focus();
                    return;
                }
                me.GetNewHtbh(input.trim());
            }
        });
        $("#addAmount").unbind().bind("keyup", function () {
            var value = parseInt($(this).val());
            if (isNaN(value)) {
                $(this).val(0);
            }
            else {
                $(this).val(value);
            }
            me.getAdditionalInfo()
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
        if ($(".valid_error").length > 0) {
            MESSAGEBOX.show("数据未填写完成,请填写数据");
            return;
        }
        var postData = {
            htbh: me.item.contractNum,
            newContractNum: $("#input_htbh2").val(),
            bz: $('#lab-bz').val(),
            real_lx: $("#real_lx").val()
            , addAmount: $("#addAmount").val()
            , unionStartDate: DATEFORMAT.toRest($("#new_payDate").val())
        };
        console.log(postData);
        var params = {};
        var entity = JSON.stringify(postData);
        var data = {
            url: '/api/mergesq/create',
            params: params,
            entity: entity
        };
        $(this.savebtnid).attr("disabled", true);
        $(this.savebtnid).html("数据提交中。。。");
        var me = this;
        $.io.post(data).success(function (resutl) {
            $(me.savebtnid).attr('disabled', true);
            $(me.savebtnid).html("申请单已经提交成功！");
            me.showinfo('申请单提交成功');
        }).error(function (error) {
            $(me.savebtnid).html("保存申请单");
            $(me.savebtnid).attr('disabled', false);
            me.showinfo(error.msg);
        });
    },

    setData: function () {
        // 格式化获取的数据
        this.item.department = "部门";
        this.item.sqr = LOGIN.getUser().chainName;
        // 手动设置转投本金金额
        $('#input_newamount').val(this.item.tzje);
        //申请时间
        this.item.scrq = DATEFORMAT.toDate(new Date());

        this.databind.binding(this.item);
        NUMBERCHECK.startCheck();
        $(this.savebtnid).attr('disabled', false);
        $("#new_payDate").val(DATEFORMAT.toDate(new Date()));
    },

    getAdditionalInfo: function (source_amount) {
        if (!source_amount) source_amount = parseInt($("#source_tzje").html());
        var addAmount = parseInt($("#addAmount").val());
        addAmount = (isNaN(addAmount)) ? 0 : addAmount;
        source_amount = (isNaN(source_amount)) ? 0 : source_amount;
        $.io.get({
            url: '/api/mergesq/unionPre',
            params: {ivid: this.investmentid, newAmount: addAmount + source_amount}
        })
            .success(function (result) {
                $("#lab_totalAmount").html(NUMBERFORMAT.toCount(result.totalAmount));
                $("#lab_totalRate").html(NUMBERFORMAT.toRate(result.totalRate));
                $("#lab_totalFxfj").html(STRINGFORMAT.toPayType(result.totalFxfj));
                $("#lab_totalTzqx").html(result.totalTzqx);
                $("#lab_muteLx").html(result.muteLx);
            });
    },
    formatValue: function (type, data) {
    },
    error: function (errormsg) {
        MESSAGEBOX.show(errormsg);
    },
    showinfo: function (msg) {
        MESSAGEBOX.show(msg);
    },
    //合并入的合同编号
    GetNewHtbh: function (htbh) {
        var me = this;
        var data = {
            url: '/api/investmentArchives/getByContractNum',
            params: {contractNum: htbh}
        };
        $.io.get(data).success(function (result) {
            if (result) {
                if (me.item && me.item.fund.id != result.fund.id) {
                    MESSAGEBOX.show("合同编号与原档案不是同一基金,不能合并!");
                    $('#input_htbh2').addClass("valid_error");
                    return;
                }
                $('#input_htbh2').removeClass("valid_error");
                $('#nnion_name').html(result.fundName);
                $('#source_tzje').html((result.bj));
                me.getAdditionalInfo(result.bj);
            } else {
                $.message.error("无此合同编号,或合同编号没有登记!!");
                $('#input_htbh2').addClass("valid_error");
            }
        }).error(function (error) {
            $('#input_htbh2').addClass("valid_error");
        });
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
        var params = JSON.stringify({
            cid: id
        });
        var data = {
            url: '/api/customer/getcustomer',
            params: params
        };
        return $.io.get(true, data).data();
    }
};