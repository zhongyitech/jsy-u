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
//			var params = JSON.stringify({authority: 'ROLE_MANAGER'});
        var data = {url: '/api/user/allDepartmentLader'};

        var me = this;

        $.io.get(true, data)
            .success(function (result) {
                me.items = result;
            });

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
            for (var i = 0; i < items.length; i++) {
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

        this.iniTable();
        this.iniAddButton();
        this.iniRemoveButton();
    },
    iniTable: function () {
//			for(var i=0; i<3; i++){
//				this.addTr();
//			}
        //修改为只增加一行数据
        this.addTr();
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
    addTr: function () {//增加一行
        var me = this;

        var table = this.getTable();
        var tr = $('<tr></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var me = this;
        tr.append('<td class="form-input"><input class="in_vail_number" name="qx" value="1" /></td> ');
        //var jsz_td = $('<td></td>');
        //tr.append(jsz_td);
        //var jsz_div = $('<div class="form-input col-md-12"></div>');
        //jsz_td.append(jsz_div);
        //var jsz_input = $('<input name="qx"/>');
        //jsz_div.append(jsz_input);
        //$(jsz_input).keyup(function () {
        //    var v = STRINGFORMAT.toNumber($(this).val());
        //    $(this).val(v);
        //});

        //var dw_td = $('<td></td>');
        //tr.append(dw_td);
        //var dw_select = $('<select class="" name="dw"></select>');
        //dw_td.append(dw_select);
        //dw_select.append('<option value=""></option>');
        //dw_select.append('<option value="年">年</option>');
        //dw_select.append('<option value="天">天</option>');
        tr.append('<td class="form-input"><select class="" name="dw" ><option value="年">年</option><option value="天">天</option></select></td> ');

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

        this.iniTable();
    },
    iniTable: function () {
        var me = this;
        var items = this.bmjl.getItems();
        for (var i = 0; i < items.length; i++) {
            this.addTr(items[i]);
        }

        $(".in_vail_rate").unbind().bind('keyup', function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                var rate = STRINGFORMAT.toRate($(this).val());
                $(this).val(rate);
            }
        });
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
            var dm = tr.find('input[name="dm"]').val();
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

            item["rateBefore"] = tr.find('select[name="rateBefore"]').val();
            item["rate"] = this.rateformat.toNumber(tr.find('input[name="rate"]').val());

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

        //var dm_td = $('<td class="form-input"></td>');
        //tr.append(dm_td);
        //var dm_select = $('<select class="user-name" name="dm" disabled></select>');
        //dm_td.append(dm_select);
        //
        //var uid = this.bmjl.toId(item);
        //var username = this.bmjl.toView(item);
        //var option = $('<option value="' + uid + '">' + username + '</option>');
        //dm_select.append(option);
        //
        //var sfbx_td = $('<td class="form-input"></td>');
        //tr.append(sfbx_td);
        //var sfbx_input = $('<input type="checkbox" name="sfbx"/>');
        //sfbx_td.append(sfbx_input);
        //sfbx_input.change(function () {
        //    me.setSFBX(tr_key);
        //});
        //
        //var ywtcbl_td = $('<td class="form-input"></td>');
        //tr.append(ywtcbl_td);
        //var ywtcbl_div = $('<div class="col-md-12"></div>');
        //ywtcbl_td.append(ywtcbl_div);
        //var ywtcbl_input = $('<input name="ywtcbl"/>');
        //ywtcbl_div.append(ywtcbl_input);
        //$(ywtcbl_input).keyup(function (e) {
        //    if (e.which == 8) {
        //        $(this).val('');
        //    } else {
        //        $(this).val(STRINGFORMAT.toRate($(this).val()));
        //    }
        //});
        //
        //var gltcbl_td = $('<td class="form-input"></td>');
        //tr.append(gltcbl_td);
        //var gltcbl_div = $('<div class=" col-md-12"></div>');
        //gltcbl_td.append(gltcbl_div);
        //var gltcbl_input = $('<input name="gltcbl"/>');
        //gltcbl_div.append(gltcbl_input);
        //$(gltcbl_input).keyup(function (e) {
        //    if (e.which == 8) {
        //        $(this).val('');
        //    } else {
        //        $(this).val(STRINGFORMAT.toRate($(this).val()));
        //    }
        //});
        //
        //var bxsyl_td = $('<td class="form-input"></td>');
        //tr.append(bxsyl_td);
        //var bxsyl_div = $('<div class="col-md-12"></div>');
        //bxsyl_td.append(bxsyl_div);
        //var bxsyl_input = $('<input name="bxsyl" disabled/>');
        //bxsyl_div.append(bxsyl_input);
        //$(bxsyl_input).keyup(function (e) {
        //    if (e.which == 8) {
        //        $(this).val('');
        //    } else {
        //        $(this).val(STRINGFORMAT.toRate($(this).val()));
        //    }
        //});

        var userName = item && item.chainName
        var userID = item && item.id;
        tr.append('<td class="form-input"><input type="hidden" name="dm" value="' + userID + '" /> <Label>' + userName + '</Label></td>');
        tr.append('<td class="form-input"><input class="sl_bx" type="checkbox" name="sfbx"/></td>');
        tr.append('<td class="form-input"><input  class="in_vail_rate" name="ywtcbl" /></td>');
        tr.append('<td class="form-input"><input  class="in_vail_rate" name="gltcbl" /></td>');
        tr.append('<td class="form-input"><input class="in_vail_rate"  name="bxsyl" disabled /></td>');
        tr.append('<td class="form-input"><input  class="in_vail_rate" name="rate" /></td>');
        tr.append('<td class="form-input"><select name="rateBefore" ><option value="false">税后 </option><option value="true">税前</option></select> </td>');
        $(".sl_bx").change(function () {
            me.setSFBX(tr_key);
        });
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
        if (!async) {
            async = false;
        }

        this.iniTable();
        this.iniAddButton();
        this.iniRemoveButton();
    },
    iniTable: function () {
        this.addTr();
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
    addTr: function () {//增加一行
        var me = this;
        var table = this.getTable();
        var tr = $('<tr></tr>');
        table.append(tr);

        tr.append('<td class="form-input"><input type="checkbox" name="checkbox"></td>');
        tr.append('<td class="form-input"><input class="in_vail_money" name="min"/></td>');
        tr.append('<td class="form-label"><label>≤ 金额 <</label></td>');
        tr.append('<td class="form-input"><input  class="in_vail_money" name="max" /></td>');
        tr.append('<td class="form-input"><input   class="in_vail_rate" name="rate"/></td>');
        tr.append('<td class="form-input"><input   class="in_vail_ver" name="vers"/></td>');

        //金额验证
        $(".in_vail_money").unbind().bind('keyup', function () {
            var money = STRINGFORMAT.toYuan($(this).val());
            $(this).val(money);
        });
        //版本验证
        $(".in_vail_ver").unbind().bind('keyup', function () {
            $(this).val(me.string_jsy.toVers($(this).val()));
        });
        //税率验证
        $(".in_vail_rate").unbind().bind('keyup', function (e) {
            if (e.which == 8) {
                $(this).val('');
            } else {
                var rate = STRINGFORMAT.toRate($(this).val());
                $(this).val(rate);
            }
        });
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
    STATUS_SELECT: 'select[name=status]',
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
    getYQMJKInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.YQMJK_INPUT);
        }
    },
    getJFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.JFMJGM_INPUT);
        }
    },
    getBNFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.BNFMJGM_INPUT);
        }
    },
    getNFMJGMInput: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.NFMJGM_INPUT);
        }
    },
    getSubmitButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.SUBMIT_ID);
        }
    },
    iniSubmitButton: function () {
        var me = this;
        var button = $("#submit-button");
        if (button) {
            button.click(function () {
                me.submit();
            });
        }
    },
    ini: function (async) {
        var me = this;
        me.iniStatus();
        me.iniYQMJK();
        me.iniJFMJGM();
        me.iniBNFMJGM();
        me.iniNFMJGM();
        me.iniSubmitButton();
        me.iniSelectCompany();
    },
    iniSelectCompany: function () {
        $.dom.select("#fundCompany", $.io.get({url: "/api/fundCompanyInformation/listForAddFund"}), function (item) {
            return {text: item.companyName, value: item.id}
        });
        $.dom.select("#project", $.io.get({url: "/api/project/selectList"}), function (item) {
            return {text: item.mapName, value: item.id}
        });
        $("#fundCompany").unbind().bind("change", function () {
            var text = $(this).find("option:selected").text();
            $("#fund_name").val(text);
        });
    },
    iniStatus: function () {
        var status_select = this.getStatusSelect();
        if (status_select) {
            $.dom.select(status_select, $.project.type(1).data(), function (item) {
                return {text: item.mapName, value: item.id};
            });
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
        var item = {};
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

        item["funcCompany"] = $('#fundCompany').val();
        item["project"] = $('#project').val();
        item["limitRules"] = $('#limitRules').val();
        item["minInvestmentAmount"] =MONEYFORMAT.toNumber($('#minInvestmentAmount').val());

        me.item = item;
        return item;
    },
    submit: function () {//提交
        var me = this;
        var data = {url: '/api/fund', entity: me.getItem()};

        $.io.put(true, data).success(function (result) {
            window.location = PAGE.FUND_LIST
        }).error(function (error) {
            console.log(error);
        });
    }
};

