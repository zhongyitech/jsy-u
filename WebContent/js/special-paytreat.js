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
    VIEWMODE_PAYUSER.ini();
});

var VIEWMODE_PAYUSER = {
    TABLE_ID: '#payinfo_table',
    ADD_ID: '#funds-add',
    REMOVE_ID: '#funds-remove',
    SAVE_ID: '#funds-save',
    TR_KEY: 'tr_key',
    key: 0,
    items: [],
    ini: function () {
        var me = this;
        $(this.ADD_ID).click(function () {
            me.add();
        });

        $(this.REMOVE_ID).click(function () {
            me.remove();
        });

        $(this.SAVE_ID).click(function () {
            me.save();
        });
    },
    get: function (key) {
        return this.items[key];
    },
    set: function (items) {
        if (items && items.length) {
            for (var i in items) {
                this.add(items[i]);
            }
        }
        var me = this;
        for (var i = 0; i < 5; i++) {
            me.add();
        }
    },
    add: function (item) {
        var key = this.key++;
        var table = $(this.TABLE_ID);
        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);
        tr.append('<td><input type="hidden" name="id" value=' + ((item && item.id ) || "") + '> <input type="checkbox" name="checkbox"></td>');
        tr.append('<td><div class="form-input "><input name="paydate" class="col-md-12 tcal tcalInput"></div></td>');
        tr.append('<td><div class="form-input "><input name="payamount" value="' + ((item && item.payAmount ) || "") + '"></div></td>');
        tr.append('<td><div class="form-input "><input name="pname"  value="' + ((item && item.pName) || "") + '"></div></td>');
        tr.append('<td><div class="form-input "><input name="paybankaccount"   value="' + ((item && item.payBankAccount) || "") + '"></div></td>');
        tr.append('<td><div class="form-input "><input name="cardtype"  value="' + ((item && item.cardType) || "" ) + '" ></div></td>');
        tr.append('<td><div class="form-input "><input name="cardsn"   value="' + ((item && item.cardSn ) || "" ) + '"></div></td>');
        tr.append('<td><div class="form-input "><input name="fddbr"   value="' + ((item && item.fddbr  ) || "") + '"></div></td>');
        tr.append('<td><div class="form-input "><input name="address"   value="' + ((item && item.address  ) || "" ) + '"></div></td>');
        f_tcalInit();
    },
    save: function () {//保存
        var items = this.getItems();
        //清空数组
        items.length = 0;
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs.get(i));
            var payuser = {};
            if(this.getRowValue(tr, 'id')){
                payuser['id'] = this.getRowValue(tr, 'id');
            }
            payuser['payDate'] = DATEFORMAT.toRest(this.getRowValue(tr, 'paydate'));
            payuser['payAmount'] = Number(this.getRowValue(tr, 'payamount'));
            payuser['pName'] = this.getRowValue(tr, 'pname');
            payuser['payBankAccount'] = this.getRowValue(tr, 'paybankaccount');
            payuser['cardType'] = this.getRowValue(tr, 'cardtype');
            payuser['cardSn'] = this.getRowValue(tr, 'cardsn');
            payuser['fddbr'] = this.getRowValue(tr, 'fddbr');
            payuser['address'] = this.getRowValue(tr, 'address');
            items.push(payuser);
        }
        $(".valid_error").unbind("focus").bind("focus", function () {
            if ($(this).hasClass("valid_error"))$(this).val("");
            $(this).removeClass("valid_error");
        });
        return items;
    },
    getRowValue: function (object, id) {
        var obj = object.find('input[name=' + id + ']');
        if (obj.val() == "") {
            $(obj).addClass("valid_error");
        }
        return obj.val();
    },
    getItems: function () {
        return this.items;
    },
    remove: function () {
        var table = $(this.TABLE_ID);
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs.get(i));
            var checkbox = tr.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    tr.remove();
                }
            }
        }
    }
};

var VIEWDATA = {
    table_id: "#table_ID",
    item: '',
    user: {},
    fund: {},
    customer: {},
    department: {},
    databind: GetBIND_TABLE(),
    rest_result: {},
    investmentid: null,
    userContext: {},
    savebtnid: "#save_btn",
    submit_error: [],
    loginuser: {},
    success: function () {
        // this.set();
        //console.log(this.item);
        if (this.item['dazt'] != 0) {
            this.error("些投资档案已经有特殊申请了，不能再做特殊申请！");
            return;
        }
        this.setData();
    },
    init: function () {
        this.databind.table_id = "#bindtarget_id";
        var me = this;
        var investid = PAGE.getParam('id');

        if (investid != null) {
            this.investmentid = args[1];
        }
        this.loginuser = LOGIN.getUser();
        $(this.savebtnid).click(function () {
            me.save();
        });
        this.databind.bindtarget_id = '#bindtarget_id';
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

        VIEWMODE_PAYUSER.add();
    },
    valid: function () {
        //this.submit_error = ($('#fundselect').val() == '');
        var errors = [];
        if ($("#bankaccountlist").val() == "")
            errors.push('bankaccountlist');
        if ($("#input_htbh").val() == "")
            errors.push('input_htbh');
        if (VIEWMODE_PAYUSER.save().length == 0)
            errors.push('payUserInfo');

        this.submit_error = errors;
    },
    save: function () {
        var payuser = VIEWMODE_PAYUSER.save();
        this.valid();
        if (this.submit_error.length > 0) {
            $.each(this.submit_error, function (index, obj) {
                $("#" + obj).addClass("valid_error");
            });
            $(".valid_error").unbind("focus").bind("focus", function () {
                if ($(this).hasClass("valid_error"))$(this).val("");
                $(this).removeClass("valid_error");
            });
            this.error("数据未填写完整！请修改数据。");
            return;
        }
        var fundName = $('#s_fundname').text();
        var postData = {
            archives: this.investmentid,
            customer: {
                id: this.item.customer.id
            },
            fundName: fundName,
            htbh: this.item.contractNum,
            // 备注
            bz: $('#lab-bz').val(),
            //付款人信息
            khfbs: payuser,
            mjAccount: $("#bankaccountlist").val()
        };
        console.log(postData);
        var entity = JSON.stringify(postData);
        var data = {
            url: '/api/wtfksq/create',
            entity: entity
        };
        $(this.savebtnid).attr("disabled", true);
        $(this.savebtnid).html("数据提交中。。。");

        var me = this;
        /* 禁用提交按钮*/
        $(this.savebtnid).attr('readonly', true);
        $.io.post(data).success(function (result) {
            MESSAGEBOX.show("委托付款申请成功!");
            $(me.savebtnid).html("申请单已经提交");
            $(me.savebtnid).unbind();
        }).error(function (error) {
            MESSAGEBOX.show(error.msg);
            $(me.savebtnid).attr('disabled', false);
        });
    },

    setData: function () {
        this.investmentid = this.item.id;
        // 格式化获取的数据
        this.item.department = "部门";
        this.item.sqr = this.loginuser.chainName;
        //申请时间
        this.item.scrq = DATEFORMAT.toDate(new Date());

        this.databind.binding(this.item);
        $(this.savebtnid).attr('readonly', false);
    },
    getUnPayAmount: function () {
        var me = this;
        var params = JSON.stringify({
            archiveNum: me.investmentid
        });
        var data = {
            url: '/api/investmentArchives/getProceeds',
            params: params
        };
        var result = 0;
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (rest_result) {
                me.rest_result = rest_result;
                if (rest_result[REST.RESULT_KEY]) {
                    result = JSON.parse(rest_result[REST.RESULT_KEY]);
                }
            },
            error: function (result) {
                me.rest_result = result;
                me.error("error");
            }
        });
        return result;
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
        //获取募集账户信息
        $.io.get({url: '/api/investmentArchives/getBankAccount', params: {htbh: htbh}}).success(function (result) {
            $.dom.select("#bankaccountlist", result, function (item) {
                return {text: item.bankOfDeposit + "(" + item.account + ")", value: item.id};
            });
        });
    },
    getData: function () {
        var me = this;
        var params = JSON.stringify({
            iaid: me.investmentid
        });
        var data = {
            url: '/api/dqztsq/getIAInfo',
            params: params
        };
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: true,
            success: function (rest_result) {
                me.rest_result = rest_result;
                if (rest_result[REST.RESULT_KEY]) {
                    me.item = JSON.parse(rest_result[REST.RESULT_KEY]);
                    console.log(me.item);
                    me.success();
                } else {
                    me.error("没有找到此合同编号的投资档案");
                }
            },
            error: function (result) {
                me.rest_result = result;
                me.error("error");
            }
        });
    }
};
