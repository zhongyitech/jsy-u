/* 表格绑定类，自动将ITEMS中的数据绑定到表格TD中，会自动生成表头（TH)和（TD） */
function GetBIND_TABLE() {
    return {
        table_id: '#summary-table',
        thbaseClass: 'text-center',
        Columns: [],
        ths: [],
        items: [],
        ini: function () {
            // this.Columns.push(column);
        },
        showCheckBox:false,
        getItems:function(){
            if(!this.showCheckBox){
                return [];
            }
            var trs=new Array();
            $(this.table_id+' tr:gt(1)').each(function(index,tr){
                trs.push(tr);
            });
            var items=new Array();
            $(trs).each(function(i,tr){
                var input=$(tr).find('input');
                var item=new Object();
                $(input).each(function(i,input){
                   var key= $(input).attr('name');
                    if(key){
                        item[key]=$(input).val();
                    }
                });
                items.push(item);
            });
            console.log(items);
            return items;
        },
        addrow:function(item){
            var row=this._getRow(item);
            $(this.table_id).append(row);
            return row;
        },
        delSelectRow:function(){
            var rows=$(this.table_id +' input[type=checkbox]:checked').closest('tr');
            var n=rows.length;
            this.tr_key-=n;
            rows.remove();
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
            if(this.showCheckBox){
                tr+='<th class="checkboxth"></th>';
            }
            for (var key in this.Columns) {
                var col = this.Columns[key];
                if (col['visible'] && col['visible'] == false) {
                    continue;
                }
                th = '<th class="';
                th += this.thbaseClass + ' ' + col.titleClassName + '" ';
                // if (col.width != null && col.width != undefined) {
                // th += ' width="' + col.width + '" ';
                // }
                th += ' >' + col.title + '</th>';
                tr += th;
            }
            tr += '</tr>';
            return tr;
        },
        tr_key: 0,
        _getRow: function (item) {
            var tr = '<tr data-key="' + (this.tr_key++) + '">';
            var td = '';
            if(this.showCheckBox){
                tr+='<td><input type="checkbox"> </td>';
            }
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
}
// Table Bind

function Search_Panel(panel_id)
{
    return {
        panel_id: panel_id,
        clickSearchfunc: null,
        buildSearachPanel: function (columns)
        {
            var count = columns.length;
            var rowmax = 10;
            var rowcount = 0;
            var html = '',endTag='';
            for (var i = 0; i < count; i++)
            {
                var col = columns[i];
                if (col.isSearch != true)
                {
                    continue;
                }
                var rowhtml = this.getPanelItem(col.title, col.fieldName);
                if (rowcount % rowmax == 0)
                {
                    html += endTag+'<div class="form-row">';
                    endTag='</div>';
                }
                html += rowhtml;
                rowcount += 1;
            }
            html += '</div>';
            $(this.panel_id).html('');
            $(this.panel_id).append(html);
            var searchbtn = '<button class="btn medium ui-state-default float-right" type="button" id="search_btn">查询数据</button>';
            $(this.panel_id).append(searchbtn);
            var that = this;
            $('#search_btn').click(function ()
            {
                that.clickSearchfunc(that._getKeywords());
            });
        },
        getPanelItem: function (title, fieldName)
        {
            var html = '<div class="form-input float-left"><div class="input-append-wrapper">' +
					   '<div class="input-append">' +
					    title +
					   '</div><div class="append-left col-md-8 mrg0L"><input type="text" placeholder="查询条件" name="' + fieldName + '" /></div></div></div>';
            return html;
        },
        _getKeywords: function ()
        {
            var keys = new Array();
            $(this.panel_id + ' input').each(function ()
            {
                var key = $(this).attr('name');
                var value = $(this).val();
                keys.push({
                    key: key, value: value
                });
            });
            return keys;
        }
    };
}

// 不同类型控件的显示方式、选择框、文本框、下拉列表、文本、时间控件
var COLUMN_TYPE = {
    getHtml: function (column, item) {
        var type = column.column_type;
        if (type == null || type == undefined || type == '') type = "label";
        return this[type](column, item);
    },
    baseClassName: '',
    checkbox: function (column, item) {
        var html = "<input type='checkbox'  name='" + column.fieldName + "'";
        var value = item ? item[column.fieldName] : null;
        if (column.formatString != null && column.formatString != '')
            value = FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]);
        html = html + " class='" + this.baseClassName + ' ' + (column.className == undefined ? '' : column.className) + "'";
        if (value == true || value == 1) {
            html = html + " checked='checked' ";
        }
        html += ' />';
        return html;
        // <input type="checkbox" name="checkbox">
    },
    textbox: function (column, item) {
        var html = "<input type='textbox' name='"  + column.fieldName + "'";
        var value =item ? FORMATPRIVED.formatValue(column.formatString, item[column.fieldName]) :'';
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
        if (name == undefined || name == '' || data==undefined)
            return data;
        var fun = FORMATPRIVED[name];
        console.log(name);
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