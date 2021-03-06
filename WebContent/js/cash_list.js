$(document).ready(function () {

    $('#pay_submit').click(function () {
        window.location.href = "./app.jsp";
    });
    VIEWDATA.dateformat = DATEFORMAT;
    VIEWDATA.init(true);

});

var VIEWDATA = {
    table_id: "#cash-interest",
    KEYWORD_BUTTON_ID: '#filter-button',
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


    table_id2: "#cash-benjin",
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
        $("#cash-add").click(function () {
            var selected = [];
            $('.item-checkbox:checked', "#cash-interest").each(function () {
                selected.push($(this).val());
            });

            $('.item-checkbox:checked', "#cash-benjin").each(function () {
                selected.push($(this).val());
            });

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
        //var params = JSON.stringify({payIds: items});
        var params = items.join(",");
        var singlePay = true;
        if (items.length > 1) {
            singlePay = !confirm("选择了多条兑付数据,是否要批量量转账?");
        }
        if (singlePay) {
            $.each(items, function (i, item) {
                var data = {url: '/api/payment/toPay?id=' + item};
                $.io.get(data).success(function (result) {
                    $.message.log("申请付款成功! 银行受理流水号为:" + result.FrontLogNo);
                    alert("申请付款成功! 银行受理流水号为:" + result.FrontLogNo);
                });
            });
            me.getItems();
            //window.location.href = "cash_list.jsp";
        } else {
            var data = {url: '/api/payment/toPays?ids=' + params};
            $.io.get(data).success(function (result) {
                $.message.log("申请付款成功!")
                alert("申请付款成功!");
                me.getItems();
            });
        }
        //$.ajax({
        //	type: 'post',
        //	url: '../rest/item/get',
        //	data: data,
        //	dataType: 'json',
        //	async: false,
        //	success: function(result){
        //		if(result && result.rest_status && result.rest_status == "suc"){
        //			me.result = result;
        //			console.log("relaod page...");
        //		}
        //		window.location.href = "cash_list.jsp";
        //	},
        //	error: function(result){
        //		isAllSuc = false;
        //		if(LOGIN.error(result)){
        //			return;
        //		}
        //		alert('提交时错误.');
        //	}
        //});
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
            type: "lx",
            startposition: me.page_start,
            pagesize: me.page_size,
            keyword: me.filter_keyword,
            startsaledate1: me.filter_from,
            startsaledate2: me.filter_to
        });
        var data = {url: '/api/payment/getPayments', entity: entity};
        $.io.post(data).success(function (result, pager) {
            me.setTable(result);
            me.setPage(pager);
        });
        //
        //$.ajax({
        //	type: 'post',
        //	url: '../rest/item/post',
        //	data: data,
        //	dataType: 'json',
        //	async: false,
        //	success: function(result){
        //		console.log(result);
        //		if(result && result.rest_status && result.rest_status == "suc"){
        //			me.result = result;
        //			me.success(result);
        //		}
        //
        //	},
        //	error: function(result){
        //		if(LOGIN.error(result)){
        //			return;
        //		}
        //	}
        //});
    },

    //success: function(result){
    //	this.items = result['rest_result'];
    //	this.setTable(this.items);
    //	this.setPage(result);
    //},

    //业务提成申请单
    setTable: function (items) {
        var table = $("#cash-interest");
        table.find("tbody").empty();
        if (table && items) {
            for (var i = 0; i < items.length; i++) {
                var row = $("<tr></tr>");
                table.append(row);

                row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"></span></td>');
                //if(items[i]["status"]==0){
                //	row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
                //}else{
                //	$(row).attr("style","background-color: #FD0101;");
                //	row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
                //}

                row.append('<td>' + items[i]["fundName"] + '</td>');
                row.append('<td>' + items[i]["contractNum"] + '</td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["customerName"] + '">' + items[i]["customerName"] + '</span></td>');

                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
                row.append('<td>' + items[i]["khh"] + '</td>');
                row.append('<td>' + items[i]["zh"] + '</td>');
                row.append('<td>' + items[i]["bmjl"] + '</td>');

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
    //set page for table2
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


        var entity = JSON.stringify({
            status: me.filter_status2,
            type: "bj",
            startposition: me.page_start2,
            pagesize: me.page_size2,
            keyword: me.filter_keyword2,
            startsaledate1: me.filter_from2,
            startsaledate2: me.filter_to2
        });
        var data = {url: '/api/payment/getPayments', entity: entity};
        $.io.post(data).success(function (result, pager) {
            me.setTable2(result);
            me.setPage2(pager);
        });
        //$.ajax({
        //	type: 'post',
        //	url: '../rest/item/post',
        //	data: data,
        //	dataType: 'json',
        //	async: false,
        //	success: function(result){
        //		console.log(result);
        //		if(result && result.rest_status && result.rest_status == "suc"){
        //			me.result = result;
        //			me.success2(result);
        //		}
        //
        //	},
        //	error: function(result){
        //		if(LOGIN.error(result)){
        //			return;
        //		}
        //	}
        //});
    },
    //success2: function(result){
    //	this.items = result['rest_result'];
    //	this.setTable2(this.items);
    //	this.setPage2(result);
    //},
    setTable2: function (items) {
        var table = $("#cash-benjin");
        table.find("tbody").empty();
        if (table && items) {
            for (var i = 0; i < items.length; i++) {
                var row = $("<tr></tr>");
                table.append(row);

                //row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
                if (items[i]["status"] == 0) {
                    row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"></span></td>');
                } else {
                    $(row).attr("style", "background-color: #FD0101;");
                    row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="' + items[i]["id"] + '"></span></td>');
                }

                row.append('<td>' + items[i]["fundName"] + '</td>');
                row.append('<td>' + items[i]["contractNum"] + '</td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["customerName"] + '">' + items[i]["customerName"] + '</span></td>');

                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
                row.append('<td>' + items[i]["khh"] + '</td>');
                row.append('<td>' + items[i]["zh"] + '</td>');
                row.append('<td>' + items[i]["bmjl"] + '</td>');

            }
        }

    },

    setPage2: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager-2", response).onChange(function (param) {
            _this.page_start2 = param.startposition;
            _this.page_size2 = param.pagesize;
            _this.getItems(true);
        });
    }
};

var DigitalBox = {
    show: function (fundNames) {
        this.input_items = fundNames;
        $(this.box_id).show();
    },
    _hide: function () {
        $(this.box_id).hide();
    },
    ini: function () {
        var that = this;
        $(this.btn_ok).click(function () {
            if (that.okEvent != null) {
                that.okEvent(that._getChoiceValue());
            }
            that._hide();
        });
        $(this.btn_cancel).click(function () {
            if (that.cancelEvent != null && that.cancelEvent !== undefined) {
                that.cancelEvent();
            }
            that._hide();
        });
    },
    _getData: function (fundName) {
        var params = JSON.stringify({fundName: fundName});
        var data = {url: '/api/bankAccount/paylist', params: params};
        var bankaccounts = null;
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log(result);
                if (result && result.rest_status && result.rest_status == "suc") {
                    bankaccounts = result.rest_result;
                }
            },
            error: function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
                alert('获取基金信息失败，请刷新页面.');
            }
        });
        return bankaccounts;
    },
    _setInfo: function (bankAccountGroup) {

    },
    _getBankAccounts: function (fundName) {

    },
    _getChoiceValue: function () {
        return '';
    },
    //
    box_id: '',
    btn_ok: '',
    btn_cancel: '',
    okEvent: null,
    cancelEvent: null,
    input_items: []
}