$(document).ready(function () {
	
	
});

//Table Bind
var DATABIND_TABLE = {
    table_id: '#summary-table',
    thbaseClass: 'text-center',
    Columns: [],
    ths: [],
    items: [],
    ini: function () {
        this.Columns = [{
            title: '序号',
            fieldName: 'index',
            titleClassName: '',
            formatString: '',
            readOnly: false,
            //column_type: 'checkbox',
            className: '',
            /* 以下可以不设置 */
            index: 0,
            visible: true
        },
        {
            title: '类型',
            fieldName: 'type',
            titleClassName: '',
        },
        {
            title: '基金名称',
            fieldName: 'fundName',
            formatString: '',
            column_type:'a',
            url:'/',
        },
        {
            title: '合同编号',
            fieldName: 'htbh',
            titleClassName: '',
            className: '',
        },
        {
            title: '认购日期',
            fieldName: 'rgrq',
            formatString:'date',
            titleClassName: '',
        }, {
            title: '金额',
            fieldName: 'amount',
            formatString: 'money',
            titleClassName: '',
        }, {
            title: '投资日期',
            fieldName: 'tzqx',
            formatString: 'date',
            titleClassName: '',
        },
        {
            title: '部门',
            fieldName: 'department',
            titleClassName: '',
        }];
        //this.Columns.push(column);
    },
    binding: function (items) {
        if (items != null || items != undefined)
            this.items = items;
        this._setTable();
    },
    //生成表格
    _setTable: function () {
        var tr = this._createTableHead();
        $(this.table_id + ' tr').remove();
        $(this.table_id).append(tr);
        var dr = '';
        for (var key in this.items) {
            var row = this.items[key];
            dr = this._getRow(row);
            $(this.table_id).append(dr);
        }
    },
    _createTableHead: function () {
        var tr = '<tr>';
        var th = '';
        for (var key in this.Columns) {
            var col = this.Columns[key];
            if (col['visible'] && col['visible'] == false) {
                continue;
            }
            th = '<th class="';
            th += this.thbaseClass + ' ' + col.titleClassName + '" ';
            //            if (col.width != null && col.width != undefined) {
            //                th += ' width="' + col.width + '" ';
            //            }
            th += ' >' + col.title + '</th>';
            tr += th;
        }
        tr += '</tr>';
        return tr;
    },
    tr_key:0,
    _getRow: function (item) {
        var tr = '<tr key="'+(this.tr_key++) +'">';
        var td = '';
        for (var key in this.Columns) {
            var col = this.Columns[key];
            if (col['visible'] && col['visible'] == false) {
                continue;
            }
            td = '<td>';
            td += COLUMN_TYPE.getHtml(col, item);
            td += '</td>';
            tr += td;
        }
        tr += "</tr>";
        return tr;
    }
};
//不同类型控件的显示方式、选择框、文本框、下拉列表、文本、时间控件
var COLUMN_TYPE = {
    getHtml: function (column, item) {
        var type = column.column_type;
        if (type == null || type == undefined || type == '') type = "label";
        return this[type](column, item);
    },
    baseClassName: '',
    checkbox: function (column, item) {
        var html = "<input type='checkbox'  name='" + column.fieldName + "'";
        var value = item[column.fieldName];
        if (column.formatString != null && column.formatString != '')
            value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        if (value == true || value == 1) {
            html = html + " checked='checked' ";
        }
        html += ' />';
        return html;
        //<input type="checkbox" name="checkbox">
    },
    textbox: function (column, item) {
        var html = "<input name='" + column.fieldName + "'";
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html = html + " value='" + value + "' />";
        return html;
    },
    selectList: function (column, item) {
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        var html = '<select name="' + column.fieldName + '"';
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html = html + ' >' + value + '</select>';
        return html;
    },
    label: function (column, item) {
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        var html = '<label name="' + column.fieldName + '"';
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html = html + ' >' + value + '</label>';
        return html;
    },
    span: function (column, item, url) {
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        var html = '<span name="' + column.fieldName + '"';
        html = html + ' href="' + url + '"';
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html = html + ' >' + value + '</span>';
        return html;
    },
    a: function (column, item) {
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        var html = '<a name="' + column.fieldName + '"';
        html = html + " class=' " + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html += ' href="' + column.url + '"';
        html = html + ' >' + value + '</a>';	
        return html;
    },
    dateInput: function (column, item) {
        var value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        var html = '<label name="' + column.fieldName + '"';
        html = html + " class='tcal tcalInput " + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        html = html + ' >' + value + '</label>';
        return html;
    }
};
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