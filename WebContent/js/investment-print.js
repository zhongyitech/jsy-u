$(document).ready(function () {
    PRINT_LIST.investment = INVESTMENT;
    PRINT_LIST.customer = CUSTOMER;
    PRINT_LIST.fund = FUND;

    PRINT_LIST.numberformat = NUMBERFORMAT;
    PRINT_LIST.dateformat = DATEFORMAT;

    INVESTMENT_LIST.investment = INVESTMENT;
    INVESTMENT_LIST.fund = FUND;
    INVESTMENT_LIST.customer = CUSTOMER;

    INVESTMENT_LIST.dateformat = DATEFORMAT;
    INVESTMENT_LIST.numberformat = NUMBERFORMAT;
    INVESTMENT_LIST.stringformat = STRINGFORMAT;

    INVESTMENT_LIST.print_list = PRINT_LIST;

    INVESTMENT_LIST.ini(true);
});

var INVESTMENT_LIST = {
    TABLE_ID: '#investment-table',
    PRINT_BUTTON_ID: '#print-button',
    KEYWORD_ID: '#keyword-input',
    KEYWORD_BUTTON_ID: '#keyword-button',
    PAGES_ID: '#page-numbers',
    page_start: 0,
    page_size: 10,
    pages_select: 1,
    pages_total: 0,
    pages_size: 21,
    filter_keyword: '',
    tr_key: 0,
    response: {},
    items: {},
    investment: {},
    fund: {},
    customer: {},
    dateformat: {},
    numberformat: {},
    stringformat: {},
    print_list: {},
    ini: function (async) {
        this.iniFilter();
        this.iniMenu();

        this.set(async);
    },
    iniMenu: function () {
        var me = this;
        $(this.PRINT_BUTTON_ID).click(function () {
            var id=[],trs=$("#investment-table input[type=checkbox]:checked").closest("tr");
            trs.each(function(i){
                var item=me.items[trs.eq(i).attr("key")];
                item&&item.id&&id.push(item.id);
            });
            if(id.length){
                PRINT_LIST.update(id);
                window.open("./print.jsp?id="+id.toString());
                location.reload();
            }else{
                alert("请选择要打印的项！");
            }
        });
    },
    iniFilter: function () {
        var me = this;
        $(this.KEYWORD_BUTTON_ID).click(function () {
            //每次点击搜索翻至搜索结果的第1页
            me.page_start = 0;
            me.set(true);
        });

        $(this.KEYWORD_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.set(true);
            }
        });
    },
    print: function () {
        var me = this;
        var print_items = [];
        var items_tr = $(me.TABLE_ID + ' tr');
        if (items_tr && items_tr.length) {
            for (var i = 1; i < items_tr.length; i++) {
                var tr = $(items_tr.get(i));
                var checkbox = tr.find('input[name=checkbox]');
                if (checkbox.get(0)['checked']) {
                    var key = tr.attr('key');
                    print_items.push(me.items[key]);
                }
            }
        }
        me.print_list.print(print_items);
    },
    set: function (async) {
        //异步加载数据
        if (!async) {
            async = false;
        }

        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();

        var me = this;
        var params = {};
        var entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword});
        var data = {url: '/api/investmentArchives/readAllForPage', params: params, entity: entity};
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: async,
            success: function (response) {
                me.response = response;
                me.setView(response);
            },
            error: function (response) {
                me.response = response;
                LOGIN.error(response);
            }
        });
    },
    setView: function (response) {
        this.setTable(response);
        this.setPage(response);
        $.dom.checkbox("#checkbox-selector","#investment-table");
    },
    fundids: [],
    setTable: function (response) {
        this.items = response[REST.RESULT_KEY];

        var items = this.items;
        $(this.TABLE_ID).find("tbody").empty();

        var _self = this;
        if (items) {
            _self.fundids.length = 0;
            $.each(items, function (i, item) {
                _self.fundids.push(item.fund.id);
            });
            this.tr_key = 0;
            for (var i=0;i<items.length;i++) {
                this.add(items[i]);
            }
        }
    },
    add: function (item) {//增加一行
        var key = this.tr_key++;
        var table = $(this.TABLE_ID);

        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);

        var checkbox = $('<td><input type="checkbox" class="item-checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var url = "./investment.jsp?id=" + item[this.investment.ID_KEY];
        var number = item[this.investment.CONTRACT_KEY];
        var number_td = $('<td><a class="invest-number" target="_blank" href="' + url + '" title="' + number + '">' + number + '</a></td>');
        tr.append(number_td);

        var fund = item[this.investment.FUND_KEY];
        if (fund) {
//            fund = this.fund.getName(fund[this.fund.ID_KEY]);
            fund = $.project.domain(this.fundids, "com.jsy.fundObject.Fund", 'fundName').getItem(fund[this.fund.ID_KEY]).fundName;

        }
        var fund_td = $('<td><span class="fund-name" title="' + fund + '">' + fund + '</span></td>');
        tr.append(fund_td);

        var customer = item[this.investment.USERNAME_KEY];
        if (!customer) {
            customer = '';
        }
        var customer_td = $('<td><span class="user-name" title="' + customer + '">' + customer + '</span></td>');
        tr.append(customer_td);

        var rgrq = item[this.investment.RGRQ_KEY];
        rgrq = this.dateformat.toDate(rgrq);

        var rgrq_td = $('<td><span class="item-date" title="' + rgrq + '">' + rgrq + '</span></td>');
        tr.append(rgrq_td);

        var tzje = item[this.investment.TZJE_KEY];
        tzje = this.numberformat.toYuan(tzje);

        var tzje_td = $('<td><span class="item-money" title="' + tzje + '">' + tzje + '</span></td>');
        tr.append(tzje_td);

        var nhsyl = item[this.investment.NHSYL_KEY];
        nhsyl = this.numberformat.toRate(nhsyl);

        var nhsyl_td = $('<td><span class="shouyi-rate" title="' + nhsyl + '">' + nhsyl + '</span></td>');
        tr.append(nhsyl_td);

        var tzqx = item[this.investment.TZQX_KEY];
        if (!tzqx) {
            tzqx = '';
        }
        var tzqx_td = $('<td><span class="invest-due" title="' + tzqx + '">' + tzqx + '</span></td>');
        tr.append(tzqx_td);

        var fxfs = item[this.investment.FXFS_KEY];
        fxfs = this.stringformat.toPayType(fxfs);
        var fxfs_td = $('<td><span class="invest-paytype" title="' + fxfs + '">' + fxfs + '</span></td>');
        tr.append(fxfs_td);

        var zjdysj = item[this.investment.ZJDYSJ_KEY];
        if (zjdysj) {
            zjdysj = this.dateformat.toDate(zjdysj);
        } else {
            zjdysj = '';
        }
        var zjdysj_td = $('<td><span class="item-date" title="' + zjdysj + '">' + zjdysj + '</span></td>');
        tr.append(zjdysj_td);
    },
    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
            _this.page_start = param.startposition;
            _this.page_size = param.pagesize;
            _this.set(true);
        });
    }
};

var PRINT_LIST = {
    ITEM_KEY: 'key',
    LIST_ID: '#print-list',
    item_key: 0,
    items: {},
    investment: {},
    customer: {},
    fund: {},
    numberformat: {},
    dateformat: {},
    print: function (items) {
        this.items = items;

        if (this.update(items)) {
            this.set(items);
            window.print();
        }
    },
    fundids: [],
    set: function (items) {
        var print_list = $(this.LIST_ID + ' div');
        for (var i = 0; i < print_list.length; i++) {
            $(print_list.get(i)).remove();
        }

        this.item_key = 0;
        var _self = this;
        _self.fundids.length = 0;
        $.each(items, function (i, item) {
            _self.fundids.push(item.fund.id);
        });

        for (var i = 0; i < items.length; i++) {
            this.add(items[i]);
        }
    },
    getFundName: function (id) {
        return  $.project.domain(this.fundids, 'com.jsy.fundObject.Fund', 'fundName').getItem(id).fundName;
    },
    add: function (item) {
        var key = this.item_key++;
        var items = $(this.LIST_ID);
        var item_div = $('<div class="print-page" key="' + key + '"></div>');
        items.append(item_div);

        var head = $('<div class="print-head"></div>');
        item_div.append(head);

        var number = item[this.investment.CONTRACT_KEY];
        var dycs = item[this.investment.DYCS_KEY];
        var number_span = $('<span class="print-number"> 编号（<a name="print-number">' + number + dycs + '</a>）</span>');
        head.append(number_span);

        var title = $('<p class="print-title">客户投资确认书</p>');
        item_div.append(title);

        var content = $('<div class="print-content"></div>');
        item_div.append(content);

        var customer_name = item[this.investment.USERNAME_KEY];
        var customer_p = $('<p>尊敬的客户<a class="print-underline" name="print-customer">' + customer_name + '</a></p>');
        content.append(customer_p);

        var salutation = $('<p class="print-section">您好！</p>');
        content.append(salutation);

        var section_fund = $('<p class="print-section"></p>');
        content.append(section_fund);

        section_fund.append('感谢您投资');

        var fund = item[this.investment.FUND_KEY];
        var fund_name = this.getFundName(fund.id)

        var fund_a = $('<a class="print-underline" name="print-fund">' + fund_name + '</a>');
        section_fund.append(fund_a);

        section_fund.append('，成为该有限合伙企业的有限合伙人，您的实际投资金额为人民币：');

        var tjze = item[this.investment.TZJE_KEY];
        tjze = tjze / 10000;
        tjze = this.numberformat.toCount(tjze);
        var tjze_a = $('<a class="print-underline" name="print-money">' + tjze + '</a>');
        section_fund.append(tjze_a);

        section_fund.append('万元整，期限为');

        var tzqx = item[INVESTMENT.TZQX_KEY];
        var due = $('<a class="print-underline" name="print-year">' + tzqx + '</a>');
        section_fund.append(due);

        section_fund.append('。本合伙企业承诺预期收益率为');

        var shouyi = item[this.investment.NHSYL_KEY];
        shouyi = this.numberformat.toRate(shouyi);
        var shouyi_a = $('<a class="print-underline" name="print-shouyi">' + shouyi + '</a>');
        section_fund.append(shouyi_a);

        var fxfs = item[this.investment.FXFS_KEY];
        if (fxfs == 'N') {
            section_fund.append('/年。您的计息起始日期为');

            var from = item[this.investment.RGRQ_KEY];
            from = this.dateformat.toCH(from);
            var section_from = $('<a class="print-underline" name="print-from">' + from + '</a>');
            section_fund.append(section_from);

            var rgrq = item[this.investment.RGRQ_KEY];
            rgrq = this.dateformat.toDate(rgrq);

            var dqrq = INVESTMENT.toDQRQ(item);
            var last = DATEFORMAT.toCH(dqrq);
            section_fund.append('，付息和归还本金日为');
            section_fund.append('<a class="print-underline">' + last + '</a>');
            section_fund.append('。到账时间为付息日或归还本金日起三个工作日内。(周六、周日及法定节假日顺延)');
        } else if (fxfs == 'J') {
            section_fund.append('/年。');

            var from = item[this.investment.RGRQ_KEY];
            from = this.dateformat.toCH(from);
            var section_from = $('<p class="print-section">您的计息起始日期为<a class="print-underline" name="print-from">' + from + '</a>，</p>');
            content.append(section_from);

            var section_paydate = $('<div name="print-paydate"></div>');
            content.append(section_paydate);

            var rgrq = item[this.investment.RGRQ_KEY];
            rgrq = this.dateformat.toDate(rgrq);

            var dqrq = INVESTMENT.toDQRQ(item);
            var last = DATEFORMAT.toCH(dqrq);

            var first = new Date(rgrq);
            first = first.setMonth(first.getMonth() + 3);
            first = DATEFORMAT.toCH(first);
            section_paydate.append('<p class="print-section">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

            var second = new Date(rgrq);
            second = second.setMonth(second.getMonth() + 6);
            second = DATEFORMAT.toCH(second);
            section_paydate.append('<p class="print-section">第二次付息日为<a class="print-underline">' + second + '</a>,</p>');

            var third = new Date(rgrq);
            third = third.setMonth(third.getMonth() + 9);
            third = DATEFORMAT.toCH(third);
            section_paydate.append('<p class="print-section">第三次付息日为<a class="print-underline">' + third + '</a>,</p>');

            section_paydate.append('<p class="print-section">第四次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            section_paydate.append('<p class="print-section">到账时间为付息日或归还本金日起三个工作日内。(周六、周日及法定节假日顺延)</p>');
        } else if (fxfs == 'W') {
            section_fund.append('/年。');

            var from = item[this.investment.RGRQ_KEY];
            from = this.dateformat.toCH(from);
            var section_from = $('<p class="print-section">您的计息起始日期为<a class="print-underline" name="print-from">' + from + '</a>，</p>');
            content.append(section_from);

            var section_paydate = $('<div name="print-paydate"></div>');
            content.append(section_paydate);

            var rgrq = item[this.investment.RGRQ_KEY];
            rgrq = this.dateformat.toDate(rgrq);

            var dqrq = INVESTMENT.toDQRQ(item);
            var last = DATEFORMAT.toCH(dqrq);

            var first = new Date(rgrq);
            first = first.setMonth(first.getMonth() + 6);
            first = DATEFORMAT.toCH(first);
            section_paydate.append('<p class="print-section">第一次付息日为<a class="print-underline">' + first + '</a>,</p>');

            section_paydate.append('<p class="print-section">第二次付息和归还本金日为<a class="print-underline">' + last + '</a>。</p>');
            section_paydate.append('<p class="print-section">到账时间为付息日或归还本金日起三个工作日内。(周六、周日及法定节假日顺延)</p>');
        }

        var section_pact = $('<p class="print-section"></p>');
        content.append(section_pact);

        section_pact.append('根据《XXXX》、《XXXXXX》等约定，您作为');

        var pact_fund = $('<a class="print-underline" name="print-fund">' + fund_name + '</a>');
        section_pact.append(pact_fund);

        section_pact.append('的有限合伙人，享受权利并承担相应义务。本合伙企业将按照上述协议的约定，积极履行自己的职责，确保您的投资安全！');

        var section_last = $('<p class="print-section">特此确认！</p>');
        content.append(section_last);

        var section_tips = $('<p class="print-section bold">友情提示：若您于本投资期限届满后继续投资本合伙企业或转投本公司其他基金合伙企业，请与投资期限届满前三个工作日与您的理财经理联系，并办理相关续投或转投手续。</p>');
        content.append(section_tips);

        var bottom = $('<div class="print-bottom"></div>');
        item_div.append(bottom);

        var bottom_fund = $('<p class="print-right"><a name="print-fund">' + fund_name + '</a></p>');
        bottom.append(bottom_fund);

        var now = this.dateformat.toCH(new Date());
        var bottom_date = $('<p class="print-right"><a name="print-from">' + now + '</a></p>');
        bottom.append(bottom_date);
    },
    update: function (items) {
        for (var i = 0; i < items.length; i++) {
            var id = items[i];
            var params = JSON.stringify({id: id});
            var entity = JSON.stringify({});
            var data = {url: '/api/investmentArchives/updateforprint', params: params, entity: entity};
            var me = this;
            $.ajax({
                type: 'post',
                url: '../rest/item/put',
                data: data,
                dataType: 'json',
                async: false,
                success: function (response) {
                    me.response = response;
                },
                error: function (response) {
                    me.response = response;
                    LOGIN.error(response);
                }
            });

            if (this.response[REST.RESULT_KEY]) {
                me.item = (this.response[REST.RESULT_KEY]);
                me.items[i] = me.item;
            } else {
                return false;
            }
        }
        return true;
    }
};