//数据格式化控制
var status = {0: "未付", 1: "付款中", 2: "已付"};
function format(item, field) {
    switch (field) {
        case "fpe":
        case "yfk":
            return NUMBERFORMAT.toYuan(item);
            break;
        case "scsj":
        case "yfsj":
            return item || "" ;
            break;
        case "zfsj":
            return item ? DATEFORMAT.toDate(item) : "";
            break;
        case "status":
            switch (item) {
                case 0:
                    return "未付";
                    break;
                case 1:
                    return "付款中";
                    break;
                case 2:
                    return "已付";
                    break;
            }
            break;
        default :
            return item;
    }
}

(function ($) {

    var Util = {
        format: function (item) {
            return item + ",";
        },
        _entity: {
            startposition: 0,
            pagesize: 10,
            type: "or",
            fields: ["fundName", "contractNum", "customerName", "yfk", "khh", "zh", "fpe", "zfsj", "yfsj", "scsj", "status"],
            value: "",
            order: {status: "asc"}
        },
        /**
         * 发送请求，接收Options参数可包含entity、params
         * @param options
         * @returns {*}
         * @private
         */
        _request: function (options) {
            $.extend(true, this._entity, options.entity)
            return $.io.post({
                url: '/api/payment/readAllForPage',
                entity: this._entity
            });
        },
        /**
         * 渲染方法，当前页面只接收entity参数
         * @param entity
         * @private
         */
        _render: function (entity) {
            var _this = this;
            _this._request({entity: entity}).success(function (result, pager) {
                _this._renderData(result);
                _this._renderPage(pager);
            });
        },
        _renderData: function (result) {
            var _this = this;
            $("#table-data").renderData("#table-data-template", result, function () {
                return _this._entity.startposition;
            });
        },
        _renderPage: function (pager) {
            var _this = this;
            if (!_this._entity.startposition) {
                $.dom.pager("#table-pager", pager, {
                    pageSize: _this._entity.pagesize
                }).onChange(function (entity) {
                    _this._render(entity);
                });
            }
        },
        _bindEvent: function () {
            var _this = this, keyword = $("#keyword-input"), searchButton = $("#keyword-button");
            keyword.unbind("keyup").bind("keyup", function (e) {
                if (e.keyCode == 13) _this._render({startposition: 0, value: keyword.val()});
            });
            searchButton.unbind("click").bind("click", function () {
                _this._render({startposition: 0, value: keyword.val()});
            });
        },
        render: function () {
            this._render();
            this._bindEvent();
        }
    };
    Util.render();
})(jQuery);


//$(document).ready(function () {
//    FORMATPRIVED['paystatus'] = function (data) {
//        return paystatus[data];
//    };
//    VIEWMODEL.ini(true);
//});
///*  汇款单查询和支付模块
// * API :
// * 1. 获取付款单对应的投资档案中的基金的“支付 账户”
// * 2. 获取基金的支付银行账户
// */
//var paystatus = {
//    0: '未付', 1: '已付', 2: '取消', 3: '支付失败'
//};
//
//var VIEWMODEL = {
//    TABLE_ID: '#payorder-table',
//    confirm_panel: '#pay_panel',
//    submit_pay: '#submit_pay',
//    KEYWORD_ID: '#keyword-input',
//    KEYWORD_BUTTON_ID: '#keyword-button',
//    PAGES_ID: '#page-numbers',
//    page_start: 0,
//    page_size: 10,
//    pages_select: 1,
//    pages_total: 0,
//    pages_size: 21,
//    filter_keyword: '',
//    tr_key: '',
//    response: {},
//    items: {},
//    DataBind: GetBIND_TABLE(),
//    searchPanel: Search_Panel('#search_panel'),
//    ini: function (async) {
//        this.DataBind.Columns = [
//            {
//                title: '基金',
//                //column_type: 'checkbox',
//                //column_type: 'checkbox',
//                //className: 'checkboxclass',
//                fieldName: 'fundName',
//                /* 以下可以不设置 */
//                index: 0,
//                visible: true,
//                isSearch: true
//            },
//            {
//                title: '付款账户',
//                fieldName: 'paymentAccountName',
//                isSearch: true
//            },
//            {
//                title: '付款账号',
//                fieldName: 'paymentAccount',
//                isSearch: true
//            },
//            {
//                title: '收款人',
//                //fieldName: 'receiptAccountName',
//                fieldName: 'customer',
//                titleClassName: '',
//                className: '',
//                isSearch: true
//            },
//            {
//                title: '收款账号',
//                fieldName: 'receiptAccount',
//                formatString: '',
//                titleClassName: '',
//                isSearch: true
//            },
//            {
//                title: '开户行',
//                //fieldName: 'receiptBankName',
//                fieldName: 'fxfs'
//            },
//            {
//                title: '金额',
//                fieldName: 'sum',
//                formatString: 'money'
//            },
//            {
//                title: '支付时间',
//                fieldName: 'reallyPaytime', // 'payTime',
//                formatString: 'date'
//            },
//            {
//                title: '处理状态',
//                //fieldName: 'dealStatus',
//                fieldName: 'bj',
//                formatString: 'paystatus',
//                titleClassName: '',
//                isSearch: true
//            },
//            {
//                title: '流水号',
//                fieldName: 'bankTransactionCode',
//                isSearch: true
//            },
//            {
//                title: '备注',
//                fieldName: 'remark',
//                titleClassName: ''
//            }
//        ];
//        var that = this;
//        this.DataBind.table_id = this.TABLE_ID;
//        //test
//        this.DataBind.ini();
//        this.searchPanel.clickSearchfunc = function (keywords) {
//            alert("query data...");
//            console.log(keywords);
//            that.setData();
//        };
//        this.searchPanel.buildSearachPanel(this.DataBind.Columns);
//
//        $(this.submit_pay).click(function () {
//            var orderid = that.getSelecrOrderID();
//            that.pay(orderid);
//        });
//        $('#submit_cancelPay').click(function () {
//            var orderid = that.getSelecrOrderID();
//            that.cancelPayOrder(orderid);
//            MESSAGEBOX.dialog('您确定要取消此付款单？', 'yes,no', [
//                { name: 'yes', func: function () {
//                    alert('yes');
//                } }
//            ]);
//        });
//        $('#submit_otherPay').click(function () {
//            var orderid = that.getSelecrOrderID();
//            that.cancelPayOrder(orderid);
//            MESSAGEBOX.dialog('此付款单已手工支付，将此单标记为已支付状态？', 'yes,no', [
//                { name: 'yes', func: function () {
//                    alert('yes');
//                } }
//            ]);
//        });
//        this.iniFilter();
//        this.setData(async);
//    },
//    pay: function (payOrderID) {
//        //$(this.confirm_panel).show();
//        CONFIRM_DIALOG.payorders = this.getSelectOrder();
//        CONFIRM_DIALOG.showDialog();
//    },
//    cancelPayOrder: function (payOrderID) {
//        $(this.confirm_panel).hide();
//    },
//    error: function (msg) {
//        MESSAGBOX.Show(msg);
//    },
//    getSelectOrder: function () {
//        var order = [];
//        return order;
//    },
//    iniFilter: function () {
//        var me = this;
//        $(this.KEYWORD_BUTTON_ID).click(function () {
//            me.page_start = 0;
//            me.setData(true);
//        });
//    },
//    setData: function (async) {
//        //异步加载数据
//        if (!async) {
//            async = false;
//        }
//        this.page_start = (this.pages_select - 1) * this.page_size;
//        this.setFilter();
//        var me = this;
//        var params = {};
//        var entity = JSON.stringify({ startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword });
//        var data = { url: '/api/payment/readAllForPage', params: params, entity: entity };
//
//        $.io.post(data).success(function (result, page) {
//            me.setView(result,page);
////            me.setPage(page);
//        });
//
////        $.ajax({
////            type: 'post',
////            url: '../rest/item/post',
////            data: data,
////            dataType: 'json',
////            async: async,
////            success: function (response)
////            {
////                me.response = response;
////                me.setView(response);
////            },
////            error: function (response)
////            {
////                me.response = response;
////                LOGIN.error(response);
////            }
////        });
//    },
//    setView: function (response,page) {
//        this.items = response;
//        this.setTable(this.items);
//        this.setPage(page);
//    },
//    setFilter: function () {//获取过滤条件
//        var keyword_input = $(this.KEYWORD_ID);
//        this.filter_keyword = keyword_input.val();
//    },
//    setTable: function (items) {
//        this.DataBind.binding(items);
//
//    },
//    setPage: function (response) {
//        var _this = this;
//        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
//            _this.page_size = param.pagesize;
//            _this.page_start = param.startposition;
//            _this.setData(true);
//        });
//    },
//    getSelectRow: function () {
//        var table = this.getTable();
//        var items = table.find('tr');
//        for (var i = 1; i < items.length; i++) {
//            var item = $(items.get(i));
//            var checkbox = item.find('input[name="checkbox"]');
//            if (checkbox.length > 0) {
//                if (checkbox.get(0)['checked']) {
//                    $(item).remove();
//                }
//            }
//        }
//    }
//};
//var CONFIRM_DIALOG = {
//    submit_id: '#submit_acceptpayorder',
//    showtn_id: '#submit_pay',
//    canelbtn_id: '#submit_cancelpayorder',
//    payorders: [],
//    panel: '#pay_panel',
//    submitPayorder: function () {
//        var msg = '';
//        if (this.payorders.length > 0) {
//            msg = '确认对多个选择的付款单使用这个账户进行支付？';
//        } else {
//            msg = '确认使用此账户进行支付操作？<br>';
//        }
//        MESSAGEBOX.showYesNo(msg, this.submit);
//        MESSAGEBOX.dialog(msg, 'yes,no',
//            [
//                {
//                    name: 'yes', func: this.submit
//                }
//            ]);
//    },
//    showDialog: function () {
//        var that = this;
//        $(this.panel).show();
//        $(this.showtn_id).attr('disabled', true);
//        $(this.submit_id).click(function () {
//            that.submitPayorder();
//        });
//        $(this.canelbtn_id).click(function () {
//            that.close();
//        });
//    },
//    //提交支付操作
//    submit: function () {
//        var that = CONFIRM_DIALOG;
//        if (that.payorders.length > 0) {
//
//        }
//        //调用后台的支付接口
//
//        that.close();
//    },
//    getItem: function () {
//        var bankAccountID = 0;
//        return { bankAccountid: bankAccountID };
//    },
//    close: function () {
//        this.payorders = [];
//        $(this.showtn_id).attr('disabled', false);
//        $(this.panel).hide();
//    }
//};
