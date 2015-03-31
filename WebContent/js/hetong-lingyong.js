//页面加载完成后添加点击事件
$(document).ready(function () {

    HTLY_PUT.fund = FUND;
    HTLY_PUT.user = USER;
    HTLY_PUT.department = DEPARTMENT;
    HTLY_PUT.dateformat = DATEFORMAT;
    HTLY_PUT.stringformat = STRINGFORMAT;
    HTLY_PUT.numberformat = NUMBERFORMAT;

    HTLY_LIST.fund = FUND;
    HTLY_LIST.user = USER;
    HTLY_LIST.department = DEPARTMENT;
    HTLY_LIST.dateformat = DATEFORMAT;
    HTLY_LIST.numberformat = NUMBERFORMAT;

    FUND.ini(true);
    USER.ini(true);
    DEPARTMENT.ini(true);

    HTLY_PUT.ini(true);
    HTLY_LIST.ini(true);
});

//合同领用
var HTLY = {
    ID_KEY: 'id',
    NUMBER_KEY: 'indexNum',
    DEPARTMENT_KEY: 'department',
    FUND_KEY: 'fund',
    LYR_KEY: 'receiveUser',
    LYSJ_KEY: 'receiveDate',
    QSBH_KEY: 'startNum',
    JSBH_KEY: 'endNum',
    TS_KEY: 'total'
}

//批量领用合同
var HTLY_PUT = {
    VIEW_ID: '#htly-put',
    TABLE_ID: '#view-table',
    ADD_ID: '#tr-add',
    REMOVE_ID: '#tr-remove',
    SAVE_ID: '#tr-save',
    tr_key: 'tr_key',
    tr_value: 0,
    htly: HTLY,
    items: [],
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        return this.getView().find(this.TABLE_ID);
    },
    ini: function (async) {
        var me = this;
        this.getView().find(this.ADD_ID).click(function () {
            me.add();
        });

        this.getView().find(this.REMOVE_ID).click(function () {
            me.remove();
        });

        this.getView().find(this.SAVE_ID).click(function () {
            me.save();
        });
        //only init add one row
        for (var i = 0; i < 1; i++) {
            me.add();
        }
    },
    getAndDemparent: function (id, eventObj) {

        if (id != null && id != '') {
            var data = $.io.get(true,{url:'/api/user/findUserDepartment',params:{uid:id}}).data()
//                $.project.domain(1, 'com.jsy.system.Department').data()
            if (data.count == 0) return;
            var target = $(eventObj.closest('tr')).find('input[name=department]');
            if(target!=null || target!=undefined){
                target.val(data.deptName);
                target.attr('value',data.deptName);
            }
        }
    },
    add: function () {//增加一行
        var me = this;
        var key = this.tr_value++;
        var table = this.getTable();

        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var number_td = $('<td></td>');
        tr.append(number_td);
        var number_div = $('<div class="form-input col-md-12"></div>');
        number_td.append(number_div);
        var number_input = $('<input name="' + me.htly.NUMBER_KEY + '" class="col-md-12 disabled" readonly="true" />');
        number_div.append(number_input);

        var department_td = $('<td class="form-input"></td>');
        tr.append(department_td);
//        var department_select = $('<select name="' + me.htly.DEPARTMENT_KEY + '"></select>');
        var department_select = $('<div class="form-input col-md-12"><input readonly="true" name="' + me.htly.DEPARTMENT_KEY + '" class="col-md-12 disabled"/></div>');
        department_td.append(department_select);

//        var departments = this.department.getItems();
//        if (departments) {
//            var option = $('<option value=""></option>');
//            department_select.append(option);
//            for (var i in departments) {
//                var department = departments[i];
//                var id = this.department.toId(department);
//                var name = this.department.toName(department);
//                var option = $('<option value="' + id + '">' + name + '</option>');
//                department_select.append(option);
//            }
//        }

        var user_td = $('<td class="form-input"></td>');
        tr.append(user_td);
        var user_select = $('<select class="user-name" name="' + me.htly.LYR_KEY + '"></select>');
        user_td.append(user_select);
        var users = this.user.getItems();
        if (users) {
            var option = $('<option value=""></option>');
            user_select.append(option);
            for (var i in users) {
                var user = users[i];
                var id = this.user.toId(user);
                var name = this.user.toName(user);
                var option = $('<option value="' + id + '">' + name + '</option>');
                user_select.append(option);
            }
        }

        var date_td = $('<td></td>');
        tr.append(date_td);
        var date_div = $('<div class="form-input col-md-12"></div>');
        date_td.append(date_div);
        var date_input = $('<input name="' + me.htly.LYSJ_KEY + '" class="col-md-12 tcal"/>');
        date_div.append(date_input);
        f_tcalInit();

        var fund_td = $('<td class="form-input"></td>');
        tr.append(fund_td);


        var fund_select = $('<select name="' + me.htly.FUND_KEY + '"></select>');

        $('.user-name').change(function () {
            var id = $(this).val();
            me.getAndDemparent(id, this)
        });

        var funds = $.io.get(true, {url: '/api/fund/selectList'}).data()
        $.dom.select(fund_select, funds);

        fund_td.append(fund_select);
//			var funds = this.fund.getItems();
//			if(funds){
//				var option = $('<option></option>');
//				fund_select.append(option);
//				for(var i in funds){
//					var fund = funds[i];
//					var id = this.fund.toId(fund);
//					var name = this.fund.toName(fund);
//					var option = $('<option value="' + id + '">' + name + '</option>');
//					fund_select.append(option);
//				}
//			}

        var from_td = $('<td></td>');
        tr.append(from_td);
        var from_div = $('<div class="form-input col-md-12"></div>');
        from_td.append(from_div);
        var from_input = $('<input name="' + me.htly.QSBH_KEY + '" class="col-md-12"/>');
        from_div.append(from_input);

        var to_td = $('<td></td>');
        tr.append(to_td);
        var to_div = $('<div class="form-input col-md-12"></div>');
        to_td.append(to_div);
        var to_input = $('<input name="' + me.htly.JSBH_KEY + '" class="col-md-12"/>');
        to_div.append(to_input);

        var count_td = $('<td></td>');
        tr.append(count_td);
        var count_div = $('<div class="form-input col-md-12"></div>');
        count_td.append(count_div);
        var count_input = $('<input name="' + me.htly.TS_KEY + '" class="col-md-12 disabled" readonly="true" />');
        count_div.append(count_input);

        this.items.push({});
    },
    remove: function () {//删除选中行
        var table = this.getTable();
        var items = table.find('tr');
        for (var i = 1; i < items.length; i++) {
            var item = $(items.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    },
    setTr: function (item) {
        var me = this;
        //更新前台缓存数据
        var key = item[this.tr_key];
        if (key || key == 0) {
            this.items[key] = item;
        }

        var items_table = $(this.TABLE_ID);
        var item_tr = items_table.find('tr[key="' + key + '"]');
        if (item_tr) {

            var number_input = item_tr.find('input[name=' + me.htly.NUMBER_KEY + ']');
            if (number_input) {
                $(number_input).val(item[me.htly.NUMBER_KEY]);
            }

            var djr_select = item_tr.find('select[name=' + me.htly.DEPARTMENT_KEY + ']');
            if (djr_select) {
                $(djr_select).attr('disabled', true);
            }

            var lyr_select = item_tr.find('select[name=' + me.htly.LYR_KEY + ']');
            if (lyr_select) {
                $(lyr_select).attr('disabled', true);
            }

            var djsj_input = item_tr.find('input[name=' + me.htly.LYSJ_KEY + ']');
            if (djsj_input) {
                $(djsj_input).attr('disabled', true);
            }

            var fund_select = item_tr.find('select[name=' + me.htly.FUND_KEY + ']');
            if (fund_select) {
                $(fund_select).attr('disabled', true);
            }

            var qsbh_input = item_tr.find('input[name=' + me.htly.QSBH_KEY + ']');
            if (qsbh_input) {
                $(qsbh_input).attr('disabled', true);
            }

            var jsbh_input = item_tr.find('input[name=' + me.htly.JSBH_KEY + ']');
            if (jsbh_input) {
                $(jsbh_input).attr('disabled', true);
            }

            var count_input = item_tr.find('input[name=' + me.htly.TS_KEY + ']');
            var count = item[me.htly.TS_KEY];
            if (count_input && (count || count == 0)) {
                $(count_input).val(this.numberformat.toCount(count));
            }

        }
    },
    save: function () {
        var me = this;
        var items_table = $(this.TABLE_ID);
        var trs = items_table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs.get(i));
            var itemJSON = {};

            var department = tr.find('select[name=' + me.htly.DEPARTMENT_KEY + ']').val();
            if (department) {
                itemJSON[me.htly.DEPARTMENT_KEY] = {id: department};
            }

            var lyr = tr.find('select[name=' + me.htly.LYR_KEY + ']').val();
            if (lyr) {
                itemJSON[me.htly.LYR_KEY] = {id: lyr};
            }

            var lysj = tr.find('input[name=' + me.htly.LYSJ_KEY + ']').val();
            if (lysj) {
                itemJSON[me.htly.LYSJ_KEY] = this.dateformat.toRest(lysj.trim());
            }

            var fund = tr.find('select[name=' + me.htly.FUND_KEY + ']').val();
            if (fund) {
                itemJSON[me.htly.FUND_KEY] = {id: fund.trim()};
            }

            var qsbh = tr.find('input[name=' + me.htly.QSBH_KEY + ']').val();
            if (qsbh) {
                itemJSON[me.htly.QSBH_KEY] = qsbh.trim();
            }

            var jsbh = tr.find('input[name=' + me.htly.JSBH_KEY + ']').val();
            if (jsbh) {
                itemJSON[me.htly.JSBH_KEY] = jsbh.trim();
            }

            if (JSON.stringify(itemJSON) != "{}") {
                var key = tr.attr('key');
                if (key) {
                    itemJSON[this.tr_key] = key;
                }

                if (qsbh && jsbh) {
                    itemJSON[me.htly.TS_KEY] = this.stringformat.toNumber(jsbh) - this.stringformat.toNumber(qsbh) + 1;
                }

                var id = this.items[key][me.htly.ID_KEY];
                if (!id) {
                    //批量登记失败
                    if (!me.put(itemJSON)) {
                        return;
                    }
                }
            }
        }
    },
    put: function (item) {
        var me = this;
        var params = JSON.stringify({});
        var entity = JSON.stringify(item);
        var data = {url: '/api/registerContract/useContract', params: params, entity: entity};
        var ajax_status = true;
        var tr_key = item[this.tr_key];

        $.io.post(data).success(function (result) {
            alert('合同归还成功。');
            window.location.reload();

        }).error(function (error) {
            alert(error.msg);
        });

        return ajax_status;
    }
};

var HTLY_LIST = {
    page_start: 0,
    page_size: 10,
    page_total: 1,
    pages_select: 1,
    pages_size: 31,
    VIEW_ID: '#htly-list',
    TABLE_ID: '#view-table',
    PAGES_LIST_ID: '#page-list',
    PAGES_FIRST_ID: '#page-first',
    PAGES_LAST_ID: '#page-last',
    KEYWORD_BUTTON_ID: '#keyword-button',
    KEYWORD_INPUT_ID: '#keyword-input',
    filter_keyword: '',
    tr_key: 'tr_key',
    tr_value: 0,
    htly: HTLY,
    items: [],
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        return this.getView().find("tbody");
    },
    ini: function (async) {
        //是否异步加载数据
        if (!async) {
            async = false;
        }

        var me = this;
        this.getView().find(this.KEYWORD_BUTTON_ID).click(function () {
            //每次点击搜索翻至搜索结果的第1页
            me.page_start = 0;
            me.set(async);
        });

        this.getView().find(this.KEYWORD_INPUT_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.set(async);
            }
        });
        this.set(async);
    },
    set: function (async) {
        var me = this;

        if (!async) {
            async = false;
        }

        var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
        this.filter_keyword = keyword_input.val();

        var params = JSON.stringify();
        var entity = JSON.stringify({
            startposition: me.page_start,
            pagesize: me.page_size,
            keyword: this.filter_keyword
        });
        var data = {url: '/api/registerContract/readUseForPage', params: params, entity: entity};
        $.io.post(data).success(function (result, pager) {
            me.setTable(result);
            me.setPage(pager);
        });
    },
    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
            _this.page_start = param.startposition;
            _this.page_size = param.pagesize;
            _this.set();
        });
    },
    setTable: function (response) {
        this.getTable().empty();
        if (response) {
            for (var i in response) {
                this.add(response[i]);
            }
        }
    },
    add: function (item) {//增加一行
        var key = this.tr_value++;
        var items = this.getTable();

        var item_tr = $('<tr key="' + key + '"></tr>');
        items.append(item_tr);

        var time = item[this.htly.LYSJ_KEY];
        if (time) {
            time = this.dateformat.toDate(time.trim());
        } else {
            time = '';
        }
        var time_td = $('<td><span class="" title="' + time + '">' + time + '</span></td>');
        item_tr.append(time_td);

        var department = item[this.htly.DEPARTMENT_KEY];
        var departmentname = '';
        if (department) {
            departmentname = this.department.getName(department[this.department.ID_KEY]);
        }
        var department_td = $('<td><span class="item-value" title="' + departmentname + '">' + departmentname + '</span></td>');
        item_tr.append(department_td);

        var user = item[this.htly.LYR_KEY];
        var username = '';
        if (user) {
            username = this.user.getName(user[this.user.ID_KEY]);
        }
        var user_td = $('<td><span class="item-value" title="' + username + '">' + username + '</span></td>');
        item_tr.append(user_td);

        var fund = item[this.htly.FUND_KEY];
        var fundname = this.fund.getName(fund[this.fund.ID_KEY]);
        var fund_td = $('<td><span class="item-value" title="' + fundname + '">' + fundname + '</span></td>');
        item_tr.append(fund_td);

        var from = item[this.htly.QSBH_KEY];
        if (!from) {
            from = '';
        }
        var from_td = $('<td><span class="item-value" title="' + from + '">' + from + '</span></td>');
        item_tr.append(from_td);

        var to = item[this.htly.JSBH_KEY];
        if (!to) {
            to = '';
        }
        var to_td = $('<td><span class="item-value" title="' + to + '">' + to + '</span></td>');
        item_tr.append(to_td);

        var count = item[this.htly.TS_KEY];
        if (count) {
            count = this.numberformat.toCount(count);
        } else {
            count = '';
        }
        var count_td = $('<td><span class="item-value" title="' + count + '">' + count + '</span></td>');
        item_tr.append(count_td);
    }
};