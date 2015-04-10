(function($){
    var Util={
        _entity:{
            startposition: 0,
            pagesize: 10,
            type:"or",
            fields:["summary","bankName","transactionsCode","account","accountName"],
            value:"",
            order:{id:"desc"}
        },
        /**
         * 发送请求，接收Options参数可包含entity、params
         * @param options
         * @returns {*}
         * @private
         */
        _request:function(options){
            $.extend(true,this._entity,options.entity)
            return $.io.post({
                url: '/api/bankTransactionsRecord/readAllForPage',
                entity:this._entity
            });
        },
        /**
         * 渲染方法，当前页面只接收entity参数
         * @param entity
         * @private
         */
        _render:function(entity){
            var _this=this;
            _this._request({entity:entity}).success(function(result,pager){
                _this._renderData(result);
                _this._renderPage(pager);
            });
        },
        _renderData:function(result){
            var _this=this;
            $("#table-data").renderData("#table-data-template",result,function(){
                return _this._entity.startposition;
            });
        },
        _renderPage:function(pager){
            var _this=this;
            if(!_this._entity.startposition){
                $.dom.pager("#table-pager",pager,{
                    pageSize:_this._entity.pagesize
                }).onChange(function(entity){
                    _this._render(entity);
                });
            }
        },
        _bindEvent:function(){
            var _this=this,keyword=$("#keyword-input"),searchButton=$("#keyword-button");
            keyword.unbind("keyup").bind("keyup",function(e){
                if(e.keyCode==13) _this._render({startposition: 0,value:keyword.val()});
            });
            searchButton.unbind("click").bind("click",function(){
                _this._render({startposition: 0,value:keyword.val()});
            });
        },
        render:function(){
            this._render();
            this._bindEvent();
        }
    };
    Util.render();
})(jQuery);

//$(document).ready(function () {
//    DATABIND_TABLE.ini();
//    DATABIND_TABLE.ColumnTypes = COLUMN_TYPE;
//
//    FORMATPRIVED['mtype'] = function (data) {
//        return data == 0 ? '未处理' : '已处理';
//    };
//    //添加 一个新的生成类型
//    COLUMN_TYPE['a'] = function (column, item) {
//        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
//        return '<button>' + value + '</button>';
//    };
//
//    // DATABIND_TABLE.binding([{createDate:'2014-06-09',manageType:0}
//    // ]);
//    INVESTMENT_LIST.investment = INVESTMENT;
//    INVESTMENT_LIST.fund = FUND;
//    INVESTMENT_LIST.customer = CUSTOMER;
//    INVESTMENT_LIST.dateformat = DATEFORMAT;
//    INVESTMENT_LIST.numberformat = NUMBERFORMAT;
//    INVESTMENT_LIST.stringformat = STRINGFORMAT;
//
//    INVESTMENT_LIST.ini(true);
//});
//
//var INVESTMENT_LIST = {
//    TABLE_ID: '#investment-table',
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
//    investment: {},
//    fund: {},
//    customer: {},
//    dateformat: {},
//    numberformat: {},
//    stringformat: {},
//    ini: function (async) {
//        this.iniFilter();
//        this.setData(async);
//    },
//    iniFilter: function () {
//        var me = this;
//        $(this.KEYWORD_BUTTON_ID).click(function () {
//            // 过滤时翻至第一页
//            me.page_start=0;
//            me.setData(true);
//        });
//    },
//    setData: function (async) {
//        // 异步加载数据
//        if (!async) {
//            async = false;
//        }
//        this.page_start = (this.pages_select - 1) * this.page_size;
//        this.setFilter();
//        var me = this;
//        var params = {};
//        var entity = JSON.stringify({
//            startposition: me.page_start,
//            pagesize: me.page_size,
//            keyword: me.filter_keyword
//        });
//        var data = {
//            url: '/api/investmentArchives/IAOutput',
//            params: params,
//            entity: entity
//        };
//        $.ajax({
//            type: 'post',
//            url: '../rest/item/post',
//            data: data,
//            dataType: 'json',
//            async: async,
//            success: function (response) {
//                me.response = response;
//                me.setView(response);
//            },
//            error: function (response) {
//                me.response = response;
//                LOGIN.error(response);
//            }
//        });
//    },
//    setView: function (response) {
//        this.items = JSON.parse(response[REST.RESULT_KEY]);
//        // this.setTable(this.items);
//        DATABIND_TABLE.binding(this.items);
//        this.setPage(response);
//
//    },
//    setFilter: function () {// 获取过滤条件
//        var keyword_input = $(this.KEYWORD_ID);
//        this.filter_keyword = keyword_input.val();
//    },
//    setPage: function (response) {
//        var _this=this;
//        _this.page_start==0&& $.dom.pager("#table-pager",response).onChange(function (param) {
//            _this.page_size=param.pagesize;
//            _this.page_start=param.startposition;
//            _this.setData(true);
//        });
//    }
//};
//
//// Table Bind
//var DATABIND_TABLE = {
//    table_id: '#summary-table',
//    thbaseClass: 'text-center',
//    Columns: [],
//    ColumnTypes: null,
//    ths: [],
//    items: [],
//    ini: function () {
//        if (this.ColumnTypes == null) {
//            this.ColumnTypes = COLUMN_TYPE;
//        }
//
//        this.Columns = [{
//            title: '序号',
//            fieldName: 'contractNum',
//            titleClassName: '',
//            formatString: '',
//            readOnly: false,
//            // column_type: 'checkbox',
//            className: '',
//            /* 以下可以不设置 */
//            index: 0,
//            visible: false
//        }, {
//            title: '写入时间',
//            fieldName: 'dqrq',
//            formatString: 'date',
//            titleClassName: 'date',
//        }, {
//            title: '银行名称',
//            // fieldName: 'bankName',
//            fieldName: 'country',
//            formatString: '',
//            column_type: 'a',
//            url: '/',
//        }, {
//            title: '开户行',
//            fieldName: 'bankOfDeposit',
//            titleClassName: '',
//            className: '',
//        }, {
//            title: '户名',
//            fieldName: 'accountName',
//            titleClassName: '',
//        }, {
//            title: '账号',
//            fieldName: 'account',
//            titleClassName: '',
//        }, {
//            title: '对方账号',
//            fieldName: 'otherSideAccount',
//            titleClassName: '',
//        }, {
//            title: '对方户名',
//            fieldName: 'otherSideName',
//            titleClassName: '',
//        }, {
//            title: '发生额',
//            fieldName: 'actionAmount',
//            titleClassName: '',
//        }, {
//            title: '余额',
//            fieldName: 'balance',
//            titleClassName: '',
//        }, {
//            title: '处理状态',
//            fieldName: 'manageType',
//            formatString: 'mtype',
//            titleClassName: '',
//        }];
//        // this.Columns.push(column);
//    },
//    binding: function (items) {
//        if (items != null || items != undefined)
//            this.items = items;
//        this._setTable();
//    },
//    // 生成表格
//    _setTable: function () {
//        var tr = this._createTableHead();
//        $(this.table_id + ' tr').remove();
//        $(this.table_id).append(tr);
//        var dr = '';
//        for (var key in this.items) {
//            var row = this.items[key];
//            dr = this._getRow(row);
//            $(this.table_id).append(dr);
//        }
//    },
//    _createTableHead: function () {
//        var tr = '<tr>';
//        var th = '';
//        for (var key in this.Columns) {
//            var col = this.Columns[key];
//            if (col['visible'] && col['visible'] == false) {
//                continue;
//            }
//            th = '<th class="';
//            th += this.thbaseClass + ' ' + col.titleClassName + '" ';
//            // if (col.width != null && col.width != undefined) {
//            // th += ' width="' + col.width + '" ';
//            // }
//            th += ' >' + col.title + '</th>';
//            tr += th;
//        }
//        tr += '</tr>';
//        return tr;
//    },
//    tr_key: 0,
//    _getRow: function (item) {
//        var tr = '<tr key="' + (this.tr_key++) + '">';
//        var td = '';
//        for (var key in this.Columns) {
//            var col = this.Columns[key];
//            if (col['visible'] && col['visible'] == false) {
//                continue;
//            }
//            td = '<td>';
//            td += this.ColumnTypes.getHtml(col, item);
//            td += '</td>';
//            tr += td;
//        }
//        tr += "</tr>";
//        return tr;
//    }
//};
//// 不同类型控件的显示方式、选择框、文本框、下拉列表、文本、时间控件
//var COLUMN_TYPE = {
//    getHtml: function (column, item) {
//        var type = column.column_type;
//        if (type == null || type == undefined || type == '')
//            type = "label";
//        return this[type](column, item);
//    },
//    baseClassName: '',
//    checkbox: function (column, item) {
//        var html = "<input type='checkbox'  name='" + column.fieldName + "'";
//        var value = item[column.fieldName];
//        if (column.formatString != null && column.formatString != '')
//            value = FORMATPRIVED.formatValue(column.formatString,
//             item[column.fieldName]);
//        html = html + " class='" + this.baseClassName + ' '
//        + (column.className == undefined ? '' : column.className) + "'";
//        if (value == true || value == 1) {
//            html = html + " checked='checked' ";
//        }
//        html += ' />';
//        return html;
//        // <input type="checkbox" name="checkbox">
//    },
//    textbox: function (column, item) {
//        var html = "<input name='" + column.fieldName + "'";
//        var value = FORMATPRIVED.formatValue(column.formatString,
//            item[column.fieldName]);
//        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html = html + " value='" + value + "' />";
//        return html;
//    },
//    selectList: function (column, item) {
//        var value = FORMATPRIVED.formatValue(column.formatString,
//          item[column.fieldName]);
//        var html = '<select name="' + column.fieldName + '"';
//        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html = html + ' >' + value + '</select>';
//        return html;
//    },
//    label: function (column, item) {
//        var value = FORMATPRIVED.formatValue(column.formatString,
//          item[column.fieldName]);
//        var html = '<label name="' + column.fieldName + '"';
//        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html = html + ' >' + value + '</label>';
//        return html;
//    },
//    span: function (column, item, url) {
//        var value = FORMATPRIVED.formatValue(column.formatString,
//          item[column.fieldName]);
//        var html = '<span name="' + column.fieldName + '"';
//        html = html + ' href="' + url + '"';
//        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html = html + ' >' + value + '</span>';
//        return html;
//    },
//    a: function (column, item) {
//        var value = FORMATPRIVED.formatValue(column.formatString,
//          item[column.fieldName]);
//        var html = '<a name="' + column.fieldName + '"';
//        html = html + " class=' " + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html += ' href="' + column.url + '"';
//        html = html + ' >' + value + '</a>';
//        return html;
//    },
//    dateInput: function (column, item) {
//        var value = FORMATPRIVED.formatValue(column.formatString,
//          item[column.fieldName]);
//        var html = '<label name="' + column.fieldName + '"';
//        html = html + " class='tcal tcalInput " + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
//        html = html + ' >' + value + '</label>';
//        return html;
//    }
//};
//var FORMATPRIVED = {
//    formatValue: function (name, data) {
//        var fun = FORMATPRIVED[name];
//        if (fun != null) {
//            return fun(data);
//        }
//        return data;
//    },
//    money: function (data) {
//        return MONEYFORMAT.toYuan(data);
//    },
//    date: function (data) {
//        return DATEFORMAT.toDate(data);
//    },
//    time: function (data) {
//        return DATEFORMAT.toTime(data);
//    }
//};