//页面加载完成后添加点击事件
$(document).ready(function () {

    HTDJ_PUT.fund = FUND;
    HTDJ_PUT.user = USER;
    HTDJ_PUT.department = DEPARTMENT;
    HTDJ_PUT.htdj = HTDJ;

    HTDJ_PUT.dateformat = DATEFORMAT;
    HTDJ_PUT.stringformat = STRINGFORMAT;
    HTDJ_PUT.numberformat = NUMBERFORMAT;

    HTDJ_LIST.fund = FUND;
    HTDJ_LIST.user = USER;

    HTDJ_LIST.department = DEPARTMENT;
    HTDJ_LIST.htdj = HTDJ;

    HTDJ_LIST.dateformat = DATEFORMAT;
    HTDJ_LIST.numberformat = NUMBERFORMAT;

    FUND.ini(true);
    USER.ini(true);
    DEPARTMENT.ini(true);

    HTDJ_PUT.ini(true);
    HTDJ_LIST.ini(true);

});

//合同登记
var HTDJ = {
    ID_KEY: 'id',
    FUND_KEY: 'fund',
    DJR_KEY: 'djr',
    DJSJ_KEY: 'djsj',
    QSBH_KEY: 'qsbh',
    JSBH_KEY: 'jsbh',
    SUM_KEY: 'sum'
}

//批量新增合同登记
var HTDJ_PUT = {
    VIEW_ID: '#htdj-put',
    TABLE_ID: '#view-table',
    ADD_ID: '#tr-add',
    REMOVE_ID: '#tr-remove',
    SAVE_ID: '#tr-save',
    tr_key: 'tr_key',
    tr_value: 0,
    htdj: HTDJ,
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
        //更改为只显示一行
        for (var i = 0; i < 1; i++) {
            me.add();
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

        var user_td = $('<td class="form-input"></td>');
        tr.append(user_td);
        var user_select = $('<select class="user-name " name="' + HTDJ.DJR_KEY + '"></select>');
        user_td.append(user_select);
        $.io.get({url:'/api/user/selectList'}).success(function(result){
            $.dom.select(user_select,result);
        });
        //var users = this.user.getItems();
        //if (users) {
        //    var option = $('<option value=""></option>');
        //    user_select.append(option);
        //    for (var i in users) {
        //        var user = users[i];
        //        var id = this.user.toId(user);
        //        var name = this.user.toName(user);
        //        var option = $('<option value="' + id + '">' + name + '</option>');
        //        user_select.append(option);
        //    }
        //}

        var date_td = $('<td></td>');
        tr.append(date_td);
        var date_div = $('<div class="form-input col-md-12"></div>');
        date_td.append(date_div);
        var date_input = $('<input name="' + me.htdj.DJSJ_KEY + '" class="col-md-12 tcal"/>');
        date_input.val(new Date().toLocaleDateString())

        date_div.append(date_input);
        f_tcalInit();

        var fund_td = $('<td class="form-input"></td>');
        tr.append(fund_td);
        var fund_select = $('<select name="' + HTDJ.FUND_KEY + '"></select>');
        fund_td.append(fund_select);

        var funds = $.io.get(true, {url: '/api/fund/selectList'}).data()

        $.dom.select(fund_select, funds);

        var from_td = $('<td></td>');
        tr.append(from_td);
        var from_div = $('<div class="form-input col-md-12"></div>');
        from_td.append(from_div);
        var from_input = $('<input name="' + HTDJ.QSBH_KEY + '" class="col-md-12" maxlength=9 />');
        from_div.append(from_input);

        var to_td = $('<td></td>');
        tr.append(to_td);
        var to_div = $('<div class="form-input col-md-12"></div>');
        to_td.append(to_div);
        var to_input = $('<input name="' + HTDJ.JSBH_KEY + '" maxlength=9 class="col-md-12"/>');
        to_div.append(to_input);

        var count_td = $('<td></td>');
        tr.append(count_td);
        var count_div = $('<div class="form-input col-md-12"></div>');
        count_td.append(count_div);
        var count_input = $('<input name="' + HTDJ.SUM_KEY + '" class="col-md-12 disabled" readonly="true" />');
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

            var djr_select = item_tr.find('select[name=' + me.htdj.DJR_KEY + ']');
            if (djr_select) {
//					$(djr_select).readonly=true
                $(djr_select).attr('readonly', true);
            }

            var djsj_input = item_tr.find('input[name=' + me.htdj.DJSJ_KEY + ']');
            if (djsj_input) {
                $(djsj_input).attr('readonly', true);
//					$(djsj_input).attr('disabled', true);
            }

            var fund_select = item_tr.find('select[name=' + me.htdj.FUND_KEY + ']');
            if (fund_select) {
                $(fund_select).attr('readonly', true);
//					$(fund_select).attr('disabled', true);
            }

            var qsbh_input = item_tr.find('input[name=' + me.htdj.QSBH_KEY + ']');
            if (qsbh_input) {
                $(qsbh_input).attr('readonly', true);
//					$(qsbh_input).attr('disabled', true);
            }

            var jsbh_input = item_tr.find('input[name=' + me.htdj.JSBH_KEY + ']');
            if (jsbh_input) {
                $(jsbh_input).attr('readonly', true);
//					$(jsbh_input).attr('disabled', true);
            }

            var count_input = item_tr.find('input[name=' + HTDJ.SUM_KEY + ']');
            var count = item[HTDJ.SUM_KEY];
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

            var djr = tr.find('select[name=' + HTDJ.DJR_KEY + ']').val();
            if (djr) {
                itemJSON[HTDJ.DJR_KEY] = {id: djr};
            }

            var djsj = tr.find('input[name=' + HTDJ.DJSJ_KEY + ']').val();
            if (djsj) {
                itemJSON[HTDJ.DJSJ_KEY] = this.dateformat.toRest(djsj.trim());
            }

            var fund = tr.find('select[name=' + HTDJ.FUND_KEY + ']').val();
            if (fund) {
                itemJSON[HTDJ.FUND_KEY] = {id: fund.trim()};
            }

            var qsbh = tr.find('input[name=' + HTDJ.QSBH_KEY + ']').val();
            if (qsbh) {
                itemJSON[HTDJ.QSBH_KEY] = qsbh.trim();
            }

            var jsbh = tr.find('input[name=' + HTDJ.JSBH_KEY + ']').val();
            if (jsbh) {
                itemJSON[HTDJ.JSBH_KEY] = jsbh.trim();
            }

            if (JSON.stringify(itemJSON) != "{}") {
                var key = tr.attr('key');
                if (key) {
                    itemJSON[this.tr_key] = key;
                }

                if (qsbh && jsbh) {
                    itemJSON[HTDJ.SUM_KEY] = this.stringformat.toNumber(jsbh) - this.stringformat.toNumber(qsbh) + 1;
                }

                var id = this.items[key][HTDJ.ID_KEY];
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
        var data = {url: '/api/contractRegister', params: params, entity: entity};
        var ajax_status = true;
//			var tr_key = item[this.tr_key];
        $.io.post(true, data)
            .success(function (result) {
                me.items[me.tr_key] = result;
                me.setTr(result);
                //alert('合同登记成功。');
                $.message.log('合同登记成功。')
                window.location.reload();
            })
            .error(function (error) {
                //alert()
                $.message.log('合同登记失败:' + error.msg)
                ajax_status = false
            });

//

        return ajax_status;
    }
};

var HTDJ_LIST = {
    page_start: 0,
    page_size: 10,
    page_total: 1,
    pages_select: 1,
    pages_size: 31,
    VIEW_ID: '#htdj-list',
    TABLE_ID: '#view-table',
    PAGES_LIST_ID: '#page-list',
    PAGES_FIRST_ID: '#page-first',
    PAGES_LAST_ID: '#page-last',
    KEYWORD_BUTTON_ID: '#keyword-button',
    KEYWORD_INPUT_ID: '#keyword-input',
    filter_keyword: '',
    tr_key: 'tr_key',
    tr_value: 0,
    htdj: HTDJ,
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
            me.set(true);
        });

        this.getView().find(this.KEYWORD_INPUT_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.set(true);
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

        var data = {url: '/api/contractRegister/readAllForPage', entity: {
            startposition: me.page_start,
            pagesize: me.page_size,
            keyword: this.filter_keyword
        }};
        $.io.post(data).success(function (result, pager) {
            me.setTable(result);
            me.setPage(pager);
        });
    },
    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
            _this.page_size = param.pagesize;
            _this.page_start = param.startposition;
            _this.set(true);
        });
    },
    fundids: [],
    setTable: function (response) {
        this.getTable().empty();
        var _self = this;

        if (response) {
            _self.fundids.length = 0;
            $.each(response, function (i, item) {
                _self.fundids.push(item.fund.id);
            });
            for (var i=0;i<response.length;i++) {
                this.add(response[i]);
            }
        }
    },
    add: function (item) {//增加一行
        var me = this;
        var key = this.tr_value++;
        var items = this.getTable();

        var item_tr = $('<tr key="' + key + '"></tr>');
        items.append(item_tr);

        var time = item[this.htdj.DJSJ_KEY];
        if (time) {
            time = this.dateformat.toDate(time.trim());
        } else {
            time = '';
        }
        var time_td = $('<td><span class="" title="' + time + '">' + time + '</span></td>');
        item_tr.append(time_td);

        var user = item[this.htdj.DJR_KEY];
        var username = user&&this.user.getName(user[this.user.ID_KEY])||"";
        var user_td = $('<td><span class="item-value" title="' + username + '">' + username + '</span></td>');
        item_tr.append(user_td);

        var fund = item[this.htdj.FUND_KEY];
//        var fundname = this.fund.getName(fund[this.fund.ID_KEY]);
        var fundname = fund&&me.getFundName(fund.id)||"";


        var fund_td = $('<td><span class="item-value" title="' + fundname + '">' + fundname + '</span></td>');
        item_tr.append(fund_td);

        var from = item[this.htdj.QSBH_KEY];
        if (!from) {
            from = '';
        }
        var from_td = $('<td><span class="item-value" title="' + from + '">' + from + '</span></td>');
        item_tr.append(from_td);

        var to = item[this.htdj.JSBH_KEY];
        if (!to) {
            to = '';
        }
        var to_td = $('<td><span class="item-value" title="' + to + '">' + to + '</span></td>');
        item_tr.append(to_td);

        var count = item[this.htdj.SUM_KEY];
        if (count) {
            count = this.numberformat.toCount(count);
        } else {
            count = '';
        }
        var count_td = $('<td><span class="item-value" title="' + count + '">' + count + '</span></td>');
        item_tr.append(count_td);
    },
    getFundName: function (id) {
        return  $.project.domain(this.fundids, 'com.jsy.fundObject.Fund', 'fundName').getItem(id).fundName;
    }
};



