//页面加载完成后添加点击事件]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
$(document).ready(function () {
    USER.ini(true);
    FUND.ini(true);
    VIEWDATA.fund = FUND;
    VIEWDATA.user = USER;
    VIEWDATA.customer = CUSTOMER;
    VIEWDATA.dateformat = DATEFORMAT;
    VIEWDATA.init(true);
});

var VIEWDATA = {
    table_id: "#ywtc_table",
    KEYWORD_BUTTON_ID: '#keyword-button',
    KEYWORD_ID: '#filter-keyword',
    PAGES_ID: '#page-numbers',
    PAGES_TOTAL: '#pacts-page-total',
    STATUS_ID: '#filter-status',
    FROM_ID: '#filter_from',
    TO_ID: '#filter_to',
    STATUS_KEY: 'status',
    filter_keyword: '',
    filter_status: '',
    filter_from: '',
    filter_to: '',
    page_size: 10,
    page_start: 0,
    page_total: 1,
    pages_select: 1,
    pages_size: 21,
    status: {},
    dateformat: {},


    table_id2: "#gltc_table",
    KEYWORD_BUTTON_ID2: '#filter-button2',
    KEYWORD_ID2: '#filter-keyword2',
    PAGES_ID2: '#page-numbers2',
    PAGES_TOTAL2: '#pacts-page-total2',
    STATUS_ID2: '#filter-status2',
    FROM_ID2: '#filter_from2',
    TO_ID2: '#filter_to2',
    STATUS_KEY2: 'status2',
    filter_keyword2: '',
    filter_status2: '',
    filter_from2: '',
    filter_to2: '',
    page_size2: 10,
    page_start2: 0,
    page_total2: 1,
    pages_select2: 1,
    pages_size2: 21,
    status2: {},
    dateformat2: {},


    item: '',
    user: {},
    fund: {},
    deposit: {},
    customer: {},
    init: function () {
        this.getView();
    },
    getView: function () {
        this.getItems();
        this.getItems2();
        this.setEvent();
    },
    setEvent: function () {
        var me = this;
        $("#funds-save").click(function () {
            var selected = [];
            $('.item-checkbox:checked', "#ywtc_table").each(function () {
                selected.push($(this).val());
            });

            $('.item-checkbox:checked', "#gltc_table").each(function () {
                selected.push($(this).val());
            });

            console.log(selected);
            me.post_request(selected);
        });

        $(this.KEYWORD_BUTTON_ID).click(function () {
            //过滤时翻至第一页
            me.page_start = 0;
            me.getItems(true);
        });

        $(this.KEYWORD_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.getItems(true);
            }
        });

        $(this.KEYWORD_BUTTON_ID2).click(function () {
            //过滤时翻至第一页
            me.page_start2 = 0;
            me.getItems2(true);
        });

        $(this.KEYWORD_ID2).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start2 = 0;
                me.getItems2(true);
            }
        });
    },

    post_request: function (items) {
        if (items && items.length == 0) {
            alert("请选择数据");
            return;
        }
        var me = this;
        var params = items.join(",");
        var singlePay = true;
        if (items.length > 1) {
            singlePay = !confirm("选择了多条兑付数据,是否要批量量转账?");
        } else {
            if (!confirm('您确定要对此业务提成单进行支付操作？'))
                return;
        }
        if (singlePay) {
            $.each(items, function (i, item) {
                var data = {url: '/api/payment/toPay?id=' + item};
                $.io.get(data).success(function (result) {
                    $.message.log("申请付款成功! 银行受理流水号为:" + result.FrontLogNo);
                    alert("申请付款成功! 银行受理流水号为:" + result.FrontLogNo);
                }).error(function (error) {
                    alert('申请付款操作失败:\n ' + error.msg);
                });
            });
            me.getItems();
            //window.location.href = "cash_list.jsp";
        } else {
            var data = {url: '/api/payment/toPays?ids=' + params};
            $.io.get(data).success(function (result) {
                $.message.log("申请付款成功!");
                alert("申请付款成功!");
                me.getItems();
            }).error(function (error) {
                alert('申请付款操作失败:\n ' + error.msg);
            });
        }
    },
    getFilter: function () {//获取过滤条件
        var from_input = $(this.FROM_ID);
        this.filter_from = from_input.val();
        if (this.filter_from) {
            this.filter_from = this.dateformat.toRest(this.filter_from);
        }
        var to_input = $(this.TO_ID);
        this.filter_to = to_input.val();
        if (this.filter_to) {
            this.filter_to = this.dateformat.toRest(this.filter_to);
        }
        var status_select = $(this.STATUS_ID);
        this.filter_status = status_select.val();
        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();
    },

    getItems: function () {
        var me = this;
        me.getFilter();

        var entity = JSON.stringify({
            status: me.filter_status,
            type: "yw", startposition: me.page_start, pagesize: me.page_size,
            keyword: me.filter_keyword, startsaledate1: me.filter_from, startsaledate2: me.filter_to
        });
        var data = {url: '/api/payment/getCommissions', entity: entity};
        $.io.post(data).success(function (result, pager) {
            me.setTable(result);
            me.setPage(pager);
        });
    },

    setTable: function (items) {
        $("#ywtc_table tbody").empty();
        var table = $("#ywtc_table");
        if (table && items) {
            for (var i = 0; i < items.length; i++) {
                var row = $("<tr></tr>");
                table.append(row);
                row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"></span></td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["bmjl"] + '">' + items[i]["bmjl"] + '</span></td>');
                row.append('<td>' + items[i]["fundName"] + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
                row.append('<td>' + items[i]["customerName"] + '</td>');
                row.append('<td>' + items[i]["zh"] + '</td>');
                row.append('<td>' + items[i]["khh"] + '</td>');
                if (items[i]["status"] == 0) {
                    row.append('<td>未付</td>');
                } else if (items[i]["status"] == 1) {
                    row.append('<td>付款中</td>');
                } else if (items[i]["status"] == 2) {
                    row.append('<td>已付</td>');
                } else {
                    row.append('<td>未知状态</td>');
                }
            }
        }
    },

    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager-1", response).onChange(function (param) {
            _this.page_start = param.startposition;
            _this.page_size = param.pagesize;
            _this.getItems(true);
        });
    },
    getFilter2: function () {//获取过滤条件
        var from_input = $(this.FROM_ID2);
        this.filter_from2 = from_input.val();
        if (this.filter_from2) {
            this.filter_from2 = this.dateformat.toRest(this.filter_from2);
        }

        var to_input = $(this.TO_ID2);
        this.filter_to2 = to_input.val();
        if (this.filter_to2) {
            this.filter_to2 = this.dateformat.toRest(this.filter_to2);
        }

        var status_select = $(this.STATUS_ID2);
        this.filter_status2 = status_select.val();

        var keyword_input = $(this.KEYWORD_ID2);
        this.filter_keyword2 = keyword_input.val();

    },
    getItems2: function () {
        var me = this;
        me.getFilter2();

        var data = {
            url: '/api/payment/getCommissions', entity: {
                type: "gl", startposition: me.page_start2, pagesize: me.page_size2,
                keyword: me.filter_keyword2, startsaledate1: me.filter_from2, startsaledate2: me.filter_to2,
                status: me.filter_status2
            }
        };
        $.io.post(data).success(function (result, pager) {
            me.setTable2(result);
            me.setPage2(pager);
        });
    },
    setTable2: function (items) {
        $("#gltc_table tbody").empty();

        var table = $("#gltc_table");

        if (table && items) {
            for (var i = 0; i < items.length; i++) {

                var row = $("<tr></tr>");
                table.append(row);

                row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"></span></td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["bmjl"] + '">' + items[i]["bmjl"] + '</span></td>');
                row.append('<td>' + items[i]["fundName"] + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
                row.append('<td>' + items[i]["customerName"] + '</td>');
                row.append('<td>' + items[i]["zh"] + '</td>');
                row.append('<td>' + items[i]["khh"] + '</td>');
                if (items[i]["status"] == 0) {
                    row.append('<td>未付</td>');
                } else if (items[i]["status"] == 1) {
                    row.append('<td>付款中</td>');
                } else if (items[i]["status"] == 2) {
                    row.append('<td>已付</td>');
                } else {
                    row.append('<td>未知状态</td>');
                }

            }
        }

    },
    setPage2: function (response) {
        var _this = this;
        _this.page_start2 == 0 && $.dom.pager("#table-pager-2", response).onChange(function (param) {
            _this.page_start2 = param.startposition;
            _this.page_size2 = param.pagesize;
            _this.getItems2(true);
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
    money_zhcn: function (data) {
        return data;
    },
    rate: function (data) {
        return data * 100 + "%";
    }
};



