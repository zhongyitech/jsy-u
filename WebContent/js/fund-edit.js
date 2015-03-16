$(document).ready(function () {
    //异步加载所有基金状态
    FUND_STATUS.ini(true);
    //异步加载所有部门经理
    BMJL.ini(true);

    FUND_FORM.ini(true);
    TZQX_LIST.ini(true);
    TCFPFW_LIST.ini(true);
    SYLFW_LIST.ini(true);
});

var BMJL = {//异步加载所有部门经理
    ID_KEY: 'id',
    ACCOUNT_KEY: 'username',
    NAME_KEY: 'chainName',
    response: {},
    items: [],
    map: {},
    ini: function (async) {
        if (!async) {
            async = false;
        }
        //var params = JSON.stringify({authority: 'ROLE_MANAGER'});
        var data = {url: '/api/user/allDepartmentLader'};
        var me = this;
        me.items = $.io.get(true,data).data();
    },
    getItems: function () {
        if (!this.items || !this.items.length) {
            this.ini(false);
        }
        return this.items;
    },
    getMap: function () {
        if (JSON.stringify(this.map) == "{}") {
            var items = this.getItems();
            for (var i in items) {
                this.map[items[i][this.ID_KEY]] = items[i];
            }
        }
        return this.map;
    },
    get: function (id) {
        var map = this.getMap();
        return map[id];
    },
    toId: function (item) {
        if (item) {
            return item[this.ID_KEY]
        } else {
            return item;
        }
    },
    toAccount: function (item) {
        if (item) {
            return item[this.ACCOUNT_KEY]
        } else {
            return '';
        }
    },
    toName: function (item) {
        if (item) {
            return item[this.NAME_KEY]
        } else {
            return item;
        }
    },
    toView: function (item) {//转换为显示用字符串
        if (item) {
            var account = this.toAccount(item);
            var name = this.toName(item);
            return name + '(' + account + ')';
        } else {
            return item;
        }
    }
};

var TZQX_LIST = {//投资期限
    VIEW_ID: '#tzqx-view',
    TABLE_ID: '#tzqx-table',
    ADD_ID: '#add-button',
    REMOVE_ID: '#remove-button',
    tzqx: TZQX_REST,
    stringformat: STRINGFORMAT,
    ini: function (async) {
        if (!async) {
            async = false;
        }

        this.iniAddButton();
        this.iniRemoveButton();
    },
    set: function (items) {
        this.items = items;
        if (items && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var id = TZQX_REST.toId(item);
                item = TZQX_REST.get(id);
                this.addTr(item);
            }
        }

        for (var i = 0; i < 3; i++) {
            this.addTr();
        }
    },
    iniAddButton: function () {
        var me = this;
        var button = this.getAddButton();
        if (button) {
            button.click(function () {
                me.addTr();
            });
        }
    },
    iniRemoveButton: function () {
        var me = this;
        var button = this.getRemoveButton();
        if (button) {
            button.click(function () {
                me.removeTr();
            });
        }
    },
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.TABLE_ID);
        }
    },
    getItems: function () {
        var me = this;
        var table = me.getTable();
        var trs = table.find('tr');

        var items = [];
        for (var i = 1; i < trs.length; i++) {
            var item = {};
            var tr = $(trs.get(i));
            var jsz = tr.find('input[name="qx"]').val();
            if (jsz) {
                item[this.tzqx.JSZ_KEY] = jsz;
            }

            var dw = tr.find('select[name="dw"]').val();
            if (dw) {
                item[this.tzqx.DW_KEY] = dw;
            }

            if (JSON.stringify(item) != '{}') {
                items.push(item);
            }
        }
        return items;
    },
    getAddButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.ADD_ID);
        }
    },
    getRemoveButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.REMOVE_ID);
        }
    },
    addTr: function (item) {//增加一行
        var me = this;

        var table = this.getTable();
        var tr = $('<tr></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var me = this;
        var jsz_td = $('<td></td>');
        tr.append(jsz_td);
        var jsz_div = $('<div class="form-input col-md-12"></div>');
        jsz_td.append(jsz_div);
        var jsz_input = $('<input name="qx"/>');
        jsz_div.append(jsz_input);
        $(jsz_input).keyup(function () {
            var v = STRINGFORMAT.toNumber($(this).val());
            $(this).val(v);
        });
        if (item) {
            var jsz = TZQX_REST.toJSZ(item);
            $(jsz_input).val(jsz);
        }

        var dw_td = $('<td></td>');
        tr.append(dw_td);
        var dw_select = $('<select class="" name="dw"></select>');
        dw_td.append(dw_select);
        dw_select.append('<option value=""></option>');
        dw_select.append('<option value="年">年</option>');
        dw_select.append('<option value="天">天</option>');
        if (item) {
            var v = TZQX_REST.toDW(item);
            $(dw_select).val(v);
        }
    },
    removeTr: function () {//删除选中行
        var table = this.getTable();
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var item = $(trs.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
};

var TCFPFW_LIST = {//提成分配范围
    VIEW_ID: '#tcfpfw-view',
    TABLE_ID: '#tcfpfw-table',
    ADD_ID: '#add-button',
    REMOVE_ID: '#remove-button',
    tr_key: 'tr-key',
    tr_value: 0,
    bmjl: BMJL,
    tcfpfw: TCFPFW,
    stringformat: STRINGFORMAT,
    rateformat: RATEFORMAT,
    ini: function (async) {
        if (!async) {
            async = false;
        }
    },
    set: function (items) {
        var map = {};
        if (items && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item = TCFPFW.get(item[TCFPFW.ID_KEY]);
                map[item[TCFPFW.BMJL_KEY]] = item;
            }
        }

        items = BMJL.getItems();

        if (items && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var id = BMJL.toId(item);
                item = map[id];
                if (!item) {
                    item = {};
                    item[TCFPFW.BMJL_KEY] = id;
                }
                this.addTr(item);
            }
        }
    },
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.TABLE_ID);
        }
    },
    getItems: function () {
        var me = this;
        var table = me.getTable();
        var trs = table.find('tr');

        var items = [];
        for (var i = 1; i < trs.length; i++) {
            var tr = $(trs.get(i));
            var item = {};
            var dm = tr.find('select[name="dm"]').val();
            if (dm) {
                item['manageerId'] = dm.trim();
            }

            var baoxiao = tr.find('input[name="sfbx"]');
            if (baoxiao && baoxiao.length > 0) {
                item['allSell'] = baoxiao[0]['checked'];
            }

            var yewu = tr.find('input[name="ywtcbl"]').val();
            if (yewu) {
                item['businessCommision'] = this.rateformat.toNumber(yewu.trim());
            }

            var guanli = tr.find('input[name="gltcbl"]').val();
            if (guanli) {
                item[this.tcfpfw.GLTCBL_KEY] = this.rateformat.toNumber(guanli.trim());
            }

            var shouyilv = tr.find('input[name="bxsyl"]').val();
            if (shouyilv) {
                item['investment'] = this.rateformat.toNumber(shouyilv.trim());
            }

            if (JSON.stringify(item) != '{}') {
                items.push(item);
            }
        }

        return items;
    },
    setSFBX: function (tr_key) {
        var me = this;
        var table = me.getTable();
        var tr = table.find('tr[' + me.tr_key + '=' + tr_key + ']');
        var sfbx_checkbox = tr.find('input[name=sfbx]');
        var sfbx = sfbx_checkbox[0]['checked'];
        if (sfbx) {
            var ywtcbl_input = tr.find('input[name=ywtcbl]');
            ywtcbl_input.attr('disabled', true);

            var gltcbl_input = tr.find('input[name=gltcbl]');
            gltcbl_input.attr('disabled', true);

            var bxsyl_input = tr.find('input[name=bxsyl]');
            bxsyl_input.attr('disabled', false);
        } else {
            var ywtcbl_input = tr.find('input[name=ywtcbl]');
            ywtcbl_input.attr('disabled', false);

            var gltcbl_input = tr.find('input[name=gltcbl]');
            gltcbl_input.attr('disabled', false);

            var bxsyl_input = tr.find('input[name=bxsyl]');
            bxsyl_input.attr('disabled', true);
        }
    },
    addTr: function (item) {//增加一行
        var me = this;

        var tr_key = me.tr_value++;
        var table = this.getTable();
        var tr = $('<tr></tr>');
        tr.attr(me.tr_key, tr_key);
        table.append(tr);

        var dm_td = $('<td></td>');
        tr.append(dm_td);
        var dm_select = $('<select class="user-name" name="dm" disabled></select>');
        dm_td.append(dm_select);

        var uid = TCFPFW.toBMJL(item);
        var user = BMJL.get(uid);
        var username = BMJL.toView(user);
        var option = $('<option value="' + uid + '">' + username + '</option>');
        dm_select.append(option);

        var sfbx_td = $('<td></td>');
        tr.append(sfbx_td);
        var sfbx_input = $('<input type="checkbox" name="sfbx"/>');
        sfbx_td.append(sfbx_input);
        sfbx_input.change(function () {
            me.setSFBX(tr_key);
        });

        var ywtcbl_td = $('<td></td>');
        tr.append(ywtcbl_td);
        var ywtcbl_div = $('<div class="form-input col-md-12"></div>');
        ywtcbl_td.append(ywtcbl_div);
        var ywtcbl_input = $('<input name="ywtcbl"/>');
        ywtcbl_div.append(ywtcbl_input);
        $(ywtcbl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(STRINGFORMAT.toRate($(this).val()));
            }
        });
        if (item) {
            var ywtcbl = TCFPFW.toYWTCBL(item);
            $(ywtcbl_input).val(NUMBERFORMAT.toRate(ywtcbl));
        }

        var gltcbl_td = $('<td></td>');
        tr.append(gltcbl_td);
        var gltcbl_div = $('<div class="form-input col-md-12"></div>');
        gltcbl_td.append(gltcbl_div);
        var gltcbl_input = $('<input name="gltcbl"/>');
        gltcbl_div.append(gltcbl_input);
        $(gltcbl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(STRINGFORMAT.toRate($(this).val()));
            }
        });
        if (item) {
            var gltcbl = TCFPFW.toGLTCBL(item);
            $(gltcbl_input).val(NUMBERFORMAT.toRate(gltcbl));
        }

        var bxsyl_td = $('<td></td>');
        tr.append(bxsyl_td);
        var bxsyl_div = $('<div class="form-input col-md-12"></div>');
        bxsyl_td.append(bxsyl_div);
        var bxsyl_input = $('<input name="bxsyl" disabled/>');
        bxsyl_div.append(bxsyl_input);
        $(bxsyl_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                $(this).val(STRINGFORMAT.toRate($(this).val()));
            }
        });
        if (item) {
            var bxsyl = TCFPFW.toBXSYL(item);
            $(bxsyl_input).val(NUMBERFORMAT.toRate(bxsyl));
        }

        if (item) {//最后设置是否包销
            var sfbx = TCFPFW.toSFBX(item);
            sfbx_input[0]['checked'] = sfbx;
            this.setSFBX(tr_key);
        }
    },
    removeTr: function () {//删除选中行
        var table = this.getTable();
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var item = $(trs.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
};

var SYLFW = {//收益率范围
    ID_KEY: 'id',
    MIN_KEY: 'investment1',
    MAX_KEY: 'investment2',
    YIELD_KEY: 'yield',
    VERS_KEY: 'vers',
    ajax_type: 'post',
    ajax_url: "../rest/yieldRange/getyieldrangebyid",
    ajax_data: {},
    ajax_dataType: 'json',
    ajax_async: false,
    item: {},
    result: {},
    success_callbacks: [],
    error_callbacks: [],
    add_success_callback: function (callback) {//添加成功回调函数
        this.success_callbacks.push(callback);
    },
    success: function () {//执行成功回调函数
        var callbacks = this.success_callbacks;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
        }
    },
    add_error_callback: function (callback) {//添加失败回调函数
        this.success_callbacks.push(callback);
    },
    error: function () {//执行失败回调函数
        LOGIN.error(this.result);
        var callbacks = this.error_callbacks;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i][CALLBACK.FUN_KEY](callbacks[i][CALLBACK.ARG_KEY]);
        }
    },
    ini: function (async) {
        //默认异步加载数据
        if (!async) {
            async = false;
        }
    },
    get: function (id) {
        this.ajax_data = {id: id};
        var me = this;
        $.ajax({
            type: me.ajax_type,
            url: me.ajax_url,
            data: me.ajax_data,
            dataType: me.ajax_dataType,
            async: me.ajax_async,
            success: function (result) {
                me.result = result;
                me.success();
            },
            error: function (result) {
                me.result = result;
                me.error();
            }
        });
        this.item = JSON.parse(this.result[REST.RESULT_KEY]);
        return this.item;
    },
    toId: function (item) {
        if (item) {
            return item[this.ID_KEY]
        } else {
            return item;
        }
    },
    toMin: function (item) {
        if (item) {
            return item[this.MIN_KEY]
        } else {
            return item;
        }
    },
    toMax: function (item) {
        if (item) {
            return item[this.MAX_KEY]
        } else {
            return item;
        }
    },
    toYield: function (item) {
        if (item) {
            return item[this.YIELD_KEY]
        } else {
            return item;
        }
    },
    toVers: function (item) {
        if (item) {
            return item[this.VERS_KEY]
        } else {
            return item;
        }
    }
};

var STRING_JSY = {//字符串的业务格式化转换
    toVers: function (s) {
        if (s) {
            var v = s[0];
            if (v) {
                return v.toUpperCase();
            }
            return v;
        } else {
            return '';
        }
    }
}

var SYLFW_LIST = {//收益率范围
    VIEW_ID: '#sylfw-view',
    TABLE_ID: '#sylfw-table',
    ADD_ID: '#add-button',
    REMOVE_ID: '#remove-button',
    sylfw: SYLFW,
    string_jsy: STRING_JSY,
    stringformat: STRINGFORMAT,
    rateformat: RATEFORMAT,
    moneyformat: MONEYFORMAT,
    ini: function (async) {
        this.iniAddButton();
        this.iniRemoveButton();
    },
    set: function (items) {
        this.items=items.sort(
          function(a,b){
              return a.id>b.id;
          }
        );
        if (items && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var id = SYLFW.toId(item);
                item = SYLFW.get(id);
                this.addTr(item);
            }
        }
        for (var i = 0; i < 3; i++) {
            this.addTr();
        }
    },
    iniAddButton: function () {
        var me = this;
        var button = this.getAddButton();
        if (button) {
            button.click(function () {
                me.addTr();
            });
        }
    },
    iniRemoveButton: function () {
        var me = this;
        var button = this.getRemoveButton();
        if (button) {
            button.click(function () {
                me.removeTr();
            });
        }
    },
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.TABLE_ID);
        }
    },
    getAddButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.ADD_ID);
        }
    },
    getRemoveButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.REMOVE_ID);
        }
    },
    getItems: function () {
        var me = this;
        var table = me.getTable();
        var trs = table.find('tr');

        var items = [];
        for (var i = 1; i < trs.length; i++) {
            var item = {};
            var tr = $(trs.get(i));
            var min = tr.find('input[name="min"]').val();
            if (min) {
                item['investment1'] = MONEYFORMAT.toNumber(min);
            }

            var max = tr.find('input[name="max"]').val();
            if (max) {
                item['investment2'] = MONEYFORMAT.toNumber(max);
            }

            var rate = tr.find('input[name="rate"]').val();
            if (rate) {
                item['yield'] = this.rateformat.toNumber(rate);
            }

            var vers = tr.find('input[name="vers"]').val();
            if (vers) {
                item['vers'] = this.string_jsy.toVers(vers);
            }

            if (JSON.stringify(item) != '{}') {
                items.push(item);
            }
        }

        return items;
    },
    addTr: function (item) {//增加一行
        var me = this;

        var table = this.getTable();
        var tr = $('<tr></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var me = this;
        var min_td = $('<td></td>');
        tr.append(min_td);
        var min_div = $('<div class="form-input col-md-12"></div>');
        min_td.append(min_div);
        var min_input = $('<input name="min"/>');
        min_div.append(min_input);
        $(min_input).keyup(function () {
            var money = STRINGFORMAT.toYuan($(this).val());
            $(this).val(money);
        });
        if (item) {
            var min = SYLFW.toMin(item);
            $(min_input).val(NUMBERFORMAT.toYuan(min));
        }

        var label = $('<td><span class="form-label"> ≤ 金额  < </span></td>');
        tr.append(label);

        var max_td = $('<td></td>');
        tr.append(max_td);
        var max_div = $('<div class="form-input col-md-12"></div>');
        max_td.append(max_div);
        var max_input = $('<input name="max"/>');
        max_div.append(max_input);
        $(max_input).keyup(function () {
            var money = STRINGFORMAT.toYuan($(this).val());
            $(this).val(money);
        });
        if (item) {
            var max = SYLFW.toMax(item);
            $(max_input).val(NUMBERFORMAT.toYuan(max));
        }

        var yield_td = $('<td></td>');
        tr.append(yield_td);
        var yield_div = $('<div class="form-input col-md-12"></div>');
        yield_td.append(yield_div);
        var yield_input = $('<input name="rate"/>');
        yield_div.append(yield_input);
        $(yield_input).keyup(function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                var rate = STRINGFORMAT.toRate($(this).val());
                $(this).val(rate);
            }
        });
        if (item) {
            var yield = SYLFW.toYield(item);
            $(yield_input).val(NUMBERFORMAT.toRate(yield));
        }

        var vers_td = $('<td></td>');
        tr.append(vers_td);
        var vers_div = $('<div class="form-input col-md-12"></div>');
        vers_td.append(vers_div);
        var vers_input = $('<input name="vers"/>');
        vers_div.append(vers_input);
        $(vers_input).keyup(function (e) {
            $(this).val(STRING_JSY.toVers($(this).val()));
        });
        if (item) {
            var vers = SYLFW.toVers(item);
            $(vers_input).val(vers);
        }
    },
    removeTr: function () {//删除选中行
        var table = this.getTable();
        var trs = table.find('tr');
        for (var i = 1; i < trs.length; i++) {
            var item = $(trs.get(i));
            var checkbox = item.find('input[name="checkbox"]');
            if (checkbox.length > 0) {
                if (checkbox.get(0)['checked']) {
                    $(item).remove();
                }
            }
        }
    }
};

var FUND_FORM = {//基金表单
    VIEW_ID: '#fund-view',
    FORM_ID: '#fund-form',
    SUBMIT_ID: '#submit-button',
    NAME_INPUT: 'input[name=name]',
    STATUS_SELECT: 'select[name=status]',
    KSRQ_INPUT: 'input[name=ksrq]',
    YQMJK_INPUT: 'input[name=yqmjk]',
    JFMJGM_INPUT: 'input[name=jfmjgm]',
    BNFMJGM_INPUT: 'input[name=bnfmjgm]',
    NFMJGM_INPUT: 'input[name=nfmjgm]',
    item: {},
    getView: function () {
        return $(this.VIEW_ID);
    },
    getForm: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.FORM_ID);
        }
    },
    getStatusSelect: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.STATUS_SELECT);
        }
    },
    setStatus: function (item) {
        var status_select = this.getStatusSelect();
        var status = FUND.toStatus(item);
        status_select.val(FUND_STATUS.toId(status));
    },
    getYQMJKInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.YQMJK_INPUT);
        }
    },
    setYQMJK: function (item) {
        this.getYQMJKInput().val(FUND.toYMGM(item));
    },
    getJFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.JFMJGM_INPUT);
        }
    },
    setJFMJGM: function (item) {
        this.getJFMJGMInput().val(FUND.toJFMJGM(item));
    },
    getBNFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.BNFMJGM_INPUT);
        }
    },
    setBNFMJGM: function (item) {
        this.getBNFMJGMInput().val(FUND.toBNFMJGM(item));
    },
    getNFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.NFMJGM_INPUT);
        }
    },
    setNFMJGM: function (item) {
        this.getNFMJGMInput().val(FUND.toNFMJGM(item));
    },
    getSubmitButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.SUBMIT_ID);
        }
    },
    iniSubmitButton: function () {
        var me = this;
        var button = this.getSubmitButton();
        if (button) {
            button.click(function () {
                me.submit();
            });
        }
    },
    ini: function (async) {
        var me = this;

        if (!async) {
            async = false;
        }

        me.iniStatus();
        me.iniYQMJK();
        me.iniJFMJGM();
        me.iniBNFMJGM();
        me.iniNFMJGM();
        me.iniSubmitButton();

        var id = PAGE.getParam(FUND.ID_KEY);
        if (id) {
            var item = FUND.get(id);
            this.set(item);
        }
    },
    set: function (item) {
        this.item = item;

        this.setName(item);
        this.setStatus(item);
        this.setKSRQ(item);
        this.setYQMJK(item);
        this.setJFMJGM(item);
        this.setBNFMJGM(item);
        this.setNFMJGM(item);

        SYLFW_LIST.set(FUND.toSYLFW(item));
        TZQX_LIST.set(FUND.toTZQX(item));
        TCFPFW_LIST.set(FUND.toTCFPFW(item));
    },
    getNameInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.NAME_INPUT);
        }
    },
    setName: function (item) {
        var name_input = this.getNameInput();
        name_input.val(FUND.toName(item));
    },
    getKSRQInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.KSRQ_INPUT);
        }
    },
    setKSRQ: function (item) {
        var ksrq_input = this.getKSRQInput();
        ksrq_input.val(FUND.toKSRQ(item));
    },
    iniStatus: function () {
        var status_select = this.getStatusSelect();
        if (status_select) {
            var status_list = FUND_STATUS.getItems();
            var option = $('<option value=""></option>');
            status_select.append(option);
            for (var i in status_list) {
                var status = status_list[i];
                var id = FUND_STATUS.toId(status);
                var name = FUND_STATUS.toName(status);
                var option = $('<option value="' + id + '">' + name + '</option>');
                status_select.append(option);
            }
        }
    },
    iniYQMJK: function () {
        var me = this;
        var yqmjk_input = this.getYQMJKInput();
        if (yqmjk_input) {
            yqmjk_input.keyup(function () {
                $(this).val(STRINGFORMAT.toYuan($(this).val()));
            });
        }
    },
    iniJFMJGM: function () {
        var me = this;
        var input = this.getJFMJGMInput();
        if (input) {
            input.keyup(function () {
                $(this).val(STRINGFORMAT.toYuan($(this).val()));
            });
        }
    },
    iniBNFMJGM: function () {
        var me = this;
        var input = this.getBNFMJGMInput();
        if (input) {
            input.keyup(function () {
                $(this).val(STRINGFORMAT.toYuan($(this).val()));
            });
        }
    },
    iniNFMJGM: function () {
        var me = this;
        var input = this.getNFMJGMInput();
        if (input) {
            input.keyup(function () {
                $(this).val(STRINGFORMAT.toYuan($(this).val()));
            });
        }
    },
    getItem: function () {
        var me = this;
        var item = me.item;
        var form = me.getForm();
        var number = form.find('input[name="number"]').val();
        if (number) {
            item['fundNo'] = number;
        }

        var name = form.find('input[name="name"]').val();
        if (name) {
            item['fundName'] = name;
        }

        var date = form.find('input[name="ksrq"]').val();
        if (date) {
            item['startSaleDate'] = DATEFORMAT.toRest(date.trim());
        }

        var status = form.find('select[name="status"]').val();
        if (status) {
            item['status'] = {id: status};
        }

        var plan = form.find('input[name="yqmjk"]').val();
        if (plan) {
            item['raiseFunds'] = MONEYFORMAT.toNumber(plan);
        }

        var season = form.find('input[name="jfmjgm"]').val();
        if (season) {
            item['quarterRaise'] = MONEYFORMAT.toNumber(season);
        }

        var half = form.find('input[name="bnfmjgm"]').val();
        if (half) {
            item['halfRaise'] = MONEYFORMAT.toNumber(half);
        }

        var year = form.find('input[name="nfmjgm"]').val();
        if (year) {
            item['yearRaise'] = MONEYFORMAT.toNumber(year);
        }

        var sylfw = SYLFW_LIST.getItems();
        if (sylfw) {
            item[FUND.SYLFW_KEY] = sylfw;
        }

        var tzqx = TZQX_LIST.getItems();
        if (tzqx) {
            item[FUND.TZQX_KEY] = tzqx;
        }

        var tcfpfw = TCFPFW_LIST.getItems();
        if (tcfpfw) {
            item[FUND.TCFPFW_KEY] = tcfpfw;
        }

        me.item = item;
        return item;
    },
    submit: function () {//提交
        var me = this;
        var item = me.getItem();
        var params = JSON.stringify({id: item[FUND.ID_KEY]});
        var entity = JSON.stringify(item);
        var data = {url: '/api/fund/update', params: params, entity: entity};
        $.ajax({
            type: "post",
            url: "../rest/item/put",
            async: true,
            data: data,
            dataType: "json",
            success: function (response) {
                me.response = response;
                window.location = PAGE.FUND_LIST;
            },
            error: function (response) {
                me.response = response;
                if (LOGIN.error(response)) {
                    alert('编辑基金失败，请补全带*号的必填信息.');
                }
            }
        });
    }
};

