//页面加载完成后添加点击事件]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
$(document).ready(function () {
    USER.ini(true);
    FUND.ini(true);
    FUND_STATUS.ini(true);
    VIEWDATA.fund = FUND;
    VIEWDATA.user = USER;
    VIEWDATA.customer = CUSTOMER;
    VIEWDATA.department = DEPARTMENT;
    VIEWDATA.databind = DATABIND_FORM;
    VIEWDATA.fund_status = FUND_STATUS;
    VIEWDATA.init(true);
});

var VIEWDATA = {
    table_id: "#table_ID",
    item: '',
    user: {},
    fund: {},
    customer: {},
    department: {},
    databind: {},
    fund_status: {},
    rest_result: {},
    investmentid: null,
    userContext: {},
    savebtnid: "#save_btn",
    select_id: '#xt_type',
    select_event_target: '#select_event_target',
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

        NUMBERCHECK.startCheck();
    },
    init: function () {
        if (window.location.search.substr(1).split('&').length > 0) {
            var args = window.location.search.substr(1).split('&')[0].split('=');
            var investid = args[1];
            if (investid != null) {
                this.investmentid = args[1];
            }
        }
        var me = this;
        $(this.savebtnid).attr('disabled', true);
        $("#xt_tzje").change(function () {
            var amount = parseInt($(this).html());
            var result = me.validTotalAmount(amount);
            if (result) {
                $('#lab-totalamount').addClass("vailderror");
            } else {
                $('#lab-totalamount').removeClass("vailderror");
            }
        });
        $(this.savebtnid).click(function () {
            me.save();
        });

        // 续投本金设置
        $('#xt_bje').keyup(function () {
            me.sumTzje();
        });
        $('#xt_amount').keyup(function () {
            me.sumTzje();
        });
        $('#xt_sy_amount').keyup(function () {
            me.sumTzje();
        });

        $('#xt_sq_date').change(function () {
            this.buildEndDate();
        });

        // this.databind.bindtarget_id = '#bindtarget_id';
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
    },
    buildEndDate: function () {
        var typestr = $("#xt_tzqx").find("option:selected").text().trim();
        var value = $('#xt_jx_date').val().trim();
        $('#xt_dqrq').val(DATEFORMAT.toDate(algorithm_payment_period.getEndDate(typestr, value)));
    },
    sumTzje: function () {
        total = parseInt($('#xt_bje').val()) + parseInt($('#xt_amount').val())
            + parseInt($('#xt_sy_amount').val());

        $('#xt_tzje').val(total);
        var result = this.validTotalAmount(total);
        if (!result) {
            $('#lab-totalamount').addClass("vailderror");
        } else {
            $('#lab-totalamount').removeClass("vailderror");

            $.io.get({
                url: '/api/jjxtsq/reviewXt',
                params: {vid: this.investmentid, totalAmount: total}
            }).success(function (result) {
                $('#xf_yqsy').val(NUMBERFORMAT.toRate(result.totalRate));
            });
        }
    },

    validTotalAmount: function (amount) {
        var result = (amount % 100000 ) == 0;
        this.submit_error = !result;
        return result;
    },
    save: function () {
        var me = this;
        if (this.submit_error) {
            me.error("数据填写有误！请修改数据。");
            return;
        }
        var fundName = $('#s_fundname').text();
        var postData = {
            oldArchivesId: this.investmentid,
            customer: {
                id: this.item.customer.id
            },
            fundName: fundName,
            htbh: this.item.contractNum,
            dqrq: DATEFORMAT.toRest(this.item.dqrq),
            rgrq: DATEFORMAT.toRest(this.item.rgrq),
            rgje: this.item.tzje,

            typeConfig: this.item.fund_status,
            //续投类型
            xtType: $("#xt_type").val(),
            xtsqrq: DATEFORMAT.toRest($('#xt_sq_date').val()),
            // 续投投收益额
            xtsye: $('#xt_sy_amount').val(),
            // 续投本金额
            xtbje: $('#xt_bje').val(),
            //追加投资额
            zjtzje: $('#xt_amount').val(),
            //续投投资期限
            xttzqx: $('#xt_tzqx').val(),
            //总投资金额
            ztzje: $('#xt_tzje').val(),
            //续投计息日期
            xtjxrq: DATEFORMAT.toRest($('#xt_jx_date').val()),
            //续投到期日期
            xtdqrq: DATEFORMAT.toRest($('#xt_dqrq').val()),
            //续投预期收益率
            xtyqsyl: $('#xf_yqsy').val(),
            //续投计息方式
            xtjxfs: $('#xt_fxfs').html(),
            xhtbh: $('#new_htbh').val(),
            // 备注
            bz: $('#lab-bz').val(),
        };
        var params = {};
        var entity = JSON.stringify(postData);
        var data = {
            url: '/api/jjxtsq',
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
                $(me.savebtnid).html("保存申请单");
                $(me.savebtnid).attr('disabled', false);
                me.showinfo(error.msg);
            });
    },

    setData: function () {
        // 格式化获取的数据
        this.item.department = "部门";
        this.item.sqr = LOGIN.getUser().chainName;
        //申请时间
        this.item.scrq = DATEFORMAT.toDate(new Date());
        // 设置基金状态
        this.item.fund_status = this.fund_status.getName(this.fund
            .get(this.item.fund.id).status.id);
        // 未付收益额
        INVESTMENT_SY.getData(this.item.archiveNum);
        this.item.ysye = INVESTMENT_SY.getYFLX();

        this.databind.binding(this.item);

        $('#xt_sq_date').val(DATEFORMAT.toDate(new Date()));
        $('#xt_jx_date').val(DATEFORMAT.toDate(new Date()));
        $(this.select_id).trigger("change");

        $('#xt_fxfs').html(STRINGFORMAT.toPayType(this.item.fxfs));

        this.sumTzje();
        this.buildEndDate();
        $(this.savebtnid).attr('disabled', false);

    },
    selectChanged: function (type) {
        switch (type) {
            case "1":
                $('#xt_sy_amount').val(0);
                $('#xt_amount').val(0);
                break;
            case "2":
                $('#xt_sy_amount').val(this.item.ysye);
                break;
            case "3":
                $('#xt_sy_amount').val(0);
                break;
            case "4":
                $('#xt_sy_amount').val(this.item.ysye);
                break;
            case "5":
                $('#xt_sy_amount').val(0);
                $('#xt_amount').val(0);
                break;
        }
    },
    formatValue: function (type, data) {
    },
    xtChange: function () {
        var value = $(this.select_id).val();
        //console.log(value);
        var me = this;
        $(this.select_event_target + ' input').each(function (object) {
            var types = $(this).data('xttypes');
            //	console.log(types);
            if (types != null) {
                var arraytypes = types.toString().split(',');
                var disabled = true;
                if (arraytypes.indexOf(value) >= 0) {
                    disabled = false;
                }
                $(this).attr('disabled', disabled);
            }
        });
        me.selectChanged($('#xt_type').val());
        me.sumTzje();
    },
    // 获取未付收益额
    getUnPayAmount: function () {
        var me = this;
        var params = JSON.stringify({
            archiveNum: me.investmentid
        });
        var data = {
            url: '/api/investmentArchives/getProceeds',
            params: params
        };
        return $.io.get(true, data).data();
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

var DATABIND_FORM = {
    bindtarget_id: '',
    ini: function () {
        this.getColumns();
    },
    BindObject: {},
    AdditionalResources: [],
    _columns: null,
    getProperty: function (object, path) {
        var paths = path.split('.');
        var temp = object;
        for (var i = 0; i < paths.length; i++) {
            var property = paths[i];
            temp = temp[property];
        }
        ;
        return temp;
    },
    getColumns: function () {
        var columns = [];
        $(this.bindtarget_id + " .bind").each(function () {
            var cols = $(this).data();
            if (cols.member) {
                cols.context = $(this);
                columns.push(cols);
            }
        });
        this._columns = columns;
        //console.log(columns);
        return columns;
    },
    /* start binding object value */
    binding: function (dataobject) {
        //console.log(dataobject);
        if (dataobject != null) {
            this.BindObject = dataobject;
        }
        this.getColumns();
        for (var key in this._columns) {
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
            var tagtype = column.context.prop('tagName');
            if (tagtype == 'LABEL') {
                column.context.html(value);
            }
            if (tagtype == "INPUT") {
                column.context.val(value);
            }
        }
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
    }
};