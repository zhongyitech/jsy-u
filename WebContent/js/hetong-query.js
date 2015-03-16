$(document).ready(function () {
// FORMATPRIVED['paystatus'] = function (data) {
// return paystatus[data];
// };
    VIEWMODEL.ini(true);
});
/*
 * 合同使用情况查询界面
 */


var VIEWMODEL = {
    TABLE_ID: '#payorder-table',
    confirm_panel: '#pay_panel',
    submit_pay: '#submit_pay',
    KEYWORD_ID: '#keyword-input',
    KEYWORD_BUTTON_ID: '#keyword-button',
    PAGES_ID: '#page-numbers',
    page_start: 0,
    page_size: 10,
    pages_select: 1,
    pages_total: 0,
    pages_size: 21,
    filter_keyword: '',
    tr_key: '',
    response: {},
    items: {},
    searchPanel: Search_Panel('#search_panel'),
    DataBind: GetBIND_TABLE(),
    ini: function (async)
    {
        this.DataBind.Columns = [{
            title: '基金',
            // column_type: 'checkbox',
            // column_type: 'checkbox',
            // className: 'checkboxclass',
            fieldName: 'fundName',
            /* 以下可以不设置 */
            index: 0,
            visible: true,
            isSearch:true
        },
        {
            title: '合同编号',
            fieldName: 'contractNum',
            isSearch:true
        },
         {
             title: '合同状态',
             fieldName: 'htzt'
         },
        {
            title: '客户名称',
            // fieldName: 'receiptAccountName',
            fieldName: 'customer',
            titleClassName: '',
            className: '',
            isSearch:true
        },
        {
            title: '投资日期',
            fieldName: 'rgrq',
            formatString: '',
            isSearch:true
        },
        {
            title: '投资期限',
            // fieldName: 'receiptBankName',
            fieldName: 'tzqx',
            isSearch:true
        },
        {
            title: '投资金额',
            fieldName: 'tzje',
            formatString: 'money'
        }, {
            title: '下次提成日期',
            fieldName: 'next_gltc_time', // 'payTime',
            formatString: 'date'
        },
        {
            title: '提成金额',
            // fieldName: 'dealStatus',
            fieldName: 'next_gltc_amount',
            formatString: 'money'
        },
        {
            title: '下次付息日期',
            fieldName: 'next_pay_time',
            formatString: 'date'
        },
        {
            title: '付息金额',
            fieldName: 'next_pay_time',
            formatString: 'date'
        }];
        var that = this;
        this.DataBind.table_id = this.TABLE_ID;
        // test
        this.DataBind.ini();
        //生成查询栏
        this.searchPanel.clickSearchfunc = function (keywords)
        {
        	alert("query data...");
        	console.log(keywords);
            that.setData();
        };
        this.searchPanel.buildSearachPanel(this.DataBind.Columns);

        $(this.submit_pay).click(function ()
        {
            var orderid = that.getSelecrOrderID();
            that.pay(orderid);
        });
        $('#submit_cancelPay').click(function ()
        {
            var orderid = that.getSelecrOrderID();
            that.cancelPayOrder(orderid);
            MESSAGEBOX.dialog('您确定要取消此付款单？', 'yes,no', [{ name: 'yes', func: function () { alert('yes'); } }]);
        });
        $('#submit_otherPay').click(function ()
        {
            var orderid = that.getSelecrOrderID();
            that.cancelPayOrder(orderid);
            MESSAGEBOX.dialog('此付款单已手工支付，将此单标记为已支付状态？', 'yes,no', [{ name: 'yes', func: function () { alert('yes'); } }]);
        });
        this.iniFilter();
        this.iniPage();
        this.setData(async);
    },
    pay: function (payOrderID)
    {
        // $(this.confirm_panel).show();
        CONFIRM_DIALOG.payorders = this.getSelectOrder();
        CONFIRM_DIALOG.showDialog();
    },
    cancelPayOrder: function (payOrderID)
    {
        $(this.confirm_panel).hide();
    },
    error: function (msg)
    {
        MESSAGBOX.Show(msg);
    },
    getSelectOrder: function ()
    {
        var order = [];
        return order;
    },
    iniFilter: function ()
    {
        var me = this;
        $(this.KEYWORD_BUTTON_ID).click(function ()
        {
            // 过滤时翻至第一页
            me.selectFirst();
        });
    },
    /**
     * 获取数据并显示到前台
     * @param async
     */
    setData: function (async)
    {
        // 异步加载数据
        if (!async)
        {
            async = false;
        }
        this.page_start = (this.pages_select - 1) * this.page_size;
        this.setFilter();
        var me = this;
        var params = {};
        var entity = JSON.stringify({ startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword });
        var data = { url: '/api/paymentRecord/readAllForPage', params: params, entity: entity };

        me.response=$.io.get(data).data();
        me.setView(me.response);
//        $.ajax({
//            type: 'post',
//            url: '../rest/item/post',
//            data: data,
//            dataType: 'json',
//            async: async,
//            success: function (response)
//            {
//                me.response = response;
//                me.setView(response);
//            },
//            error: function (response)
//            {
//                me.response = response;
//                LOGIN.error(response);
//            }
//        });
    },
    setView: function (response)
    {
        this.items = response;
        this.setTable(this.items);
        this.setPage(response);
    },
    setFilter: function ()
    {// 获取过滤条件
        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();
    },
    setTable: function (items)
    {
        this.DataBind.binding(items);
    },
    iniPage: function ()
    {
        var me = this;
        $('#page-first').click(function ()
        {
            // 过滤时翻至第一页
            me.selectFirst();
        });
        $('#page-last').click(function ()
        {
            // 过滤时翻至第一页
            me.selectLast();
        });
    },
    setPage: function (response)
    {
        var total = response[REST.TOTAL_KEY];
        this.page_total = total;

        var pages_div = $(this.PAGES_ID);
        var pages = pages_div.find("a");
        if (pages.length)
        {
            for (var i = 0; i < pages.length; i++)
            {
                $(pages[i]).remove();
            }
        }
        var pages_from = this.pages_select - 16;
        if (pages_from < 1)
        {
            pages_from = 1;
        }
        var pages_to = pages_from + this.pages_size;
        var pages_total = Math.ceil(total / this.page_size);

        var me = this;
        for (var i = pages_from; i < pages_to && i <= pages_total; i++)
        {
            var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
            if (i == this.pages_select)
            {
                page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
            }
            pages_div.append(page_number);
            page_number.append(i);
            page_number.click(function (e) { me.selectPage(e); });
        }
    },
    selectPage: function (e)
    {
        this.pages_select = e.toElement.textContent;
        this.setData(true);
    },
    selectFirst: function ()
    {
        this.pages_select = 1;
        this.setData(true);
    },
    selectLast: function ()
    {
        this.pages_select = this.pages_total;
        this.setData(true);
    },
    getSelectRow: function ()
    {
        var table = this.getTable();
        var items = table.find('tr');
        for (var i = 1; i < items.length; i++)
        {
            var item = $(items.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0)
            {
                if (checkbox.get(0)['checked'])
                {
                    $(item).remove();
                }
            }
        }
    }
};

var CONFIRM_DIALOG = {
    submit_id: '#submit_acceptpayorder',
    showtn_id: '#submit_pay',
    canelbtn_id: '#submit_cancelpayorder',
    payorders: [],
    panel: '#pay_panel',
    submitPayorder: function ()
    {
        var msg = '';
        if (this.payorders.length > 0)
        {
            msg = '确认对多个选择的付款单使用这个账户进行支付？';
        } else
        {
            msg = '确认使用此账户进行支付操作？<br>';
        }
        MESSAGEBOX.showYesNo(msg, this.submit);
        MESSAGEBOX.dialog(msg, 'yes,no',
          [{
              name: 'yes', func:
              this.submit
          }]);
    },
    showDialog: function ()
    {
        var that = this;
        $(this.panel).show();
        $(this.showtn_id).attr('disabled', true);
        $(this.submit_id).click(function ()
        {
            that.submitPayorder();
        });
        $(this.canelbtn_id).click(function ()
        {
            that.close();
        });
    },
    // 提交支付操作
    submit: function ()
    {
        var that = CONFIRM_DIALOG;
        if(that.payorders.length>0)
        {
           
        }
        // 调用后台的支付接口

        that.close();
    },
    getItem: function ()
    {
        var bankAccountID = 0;
        return { bankAccountid: bankAccountID };
    },
    close: function ()
    {
        this.payorders = [];
        $(this.showtn_id).attr('disabled', false);
        $(this.panel).hide();
    }
};
