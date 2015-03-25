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
            fieldName: 'next_tc_time', // 'payTime',
            formatString: 'date'
        },
        {
            title: '提成金额',
            // fieldName: 'dealStatus',
            fieldName: 'next_tc_amount',
            formatString: 'money'
        },
        {
            title: '下次付息日期',
            fieldName: 'next_pay_time',
            formatString: 'date'
        },
        {
            title: '付息金额',
            fieldName: 'next_pay_amount',
            formatString: 'money'
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
            me.page_start=0;
            me.setData(true);
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
        this.setFilter();
        var me = this;
        var params = {};
        var entity = JSON.stringify({ startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword });
        var data = { url: '/api/investmentArchives/ArchivesByNO', params: params, entity: entity };


//        $.io.post(true,{url:'/api/investmentArchives/ArchivesByNO'}).data
        me.response=$.io.post(data).success(function(result,pager){
            me.items = result;
            me.setTable(result);
            me.setPage(pager);
        })
    },
    setFilter: function ()
    {// 获取过滤条件
        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();
    },
    setTable: function (items)
    {
        /**
         * 绑定数据源:生成表格
         */
        this.DataBind.binding(items);
    },
    setPage: function (response)
    {
        var _this=this;
        $.dom.pager("#table-pager",response).onChange(function(param){
            _this.page_start=param.startposition;
            _this.page_size=param.pagesize;
            _this.setData(true);
        });
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
