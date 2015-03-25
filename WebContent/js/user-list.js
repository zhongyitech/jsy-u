//数据加载、按钮点击事件等
$(document).ready(function () {
    USER_LIST.ini(true);
});

//用户列表
var USER_LIST = {
    page_start: 0,
    page_size: 10,
    page_total: 1,
    pages_select: 1,
    pages_size: 31,
    VIEW_ID: '#user-list',
    TABLE_ID: '#view-table',
    PAGES_LIST_ID: '#page-list',
    PAGES_FIRST_ID: '#page-first',
    PAGES_LAST_ID: '#page-last',
    KEYWORD_BUTTON_ID: '#keyword-button',
    KEYWORD_INPUT_ID: '#keyword-input',
    filter_keyword: '',
    tr_key: 'tr_key',
    tr_value: 0,
    items: [],
    getView: function () {
        return $(this.VIEW_ID);
    },
    getTable: function () {
        return this.getView().find(this.TABLE_ID);
    },
    ini: function (async) {
        if (!async) {
            async = false;
        }

        var me = this;
        this.getView().find(this.KEYWORD_BUTTON_ID).click(function () {
            me.page_start=0;
            me.set(true);
        });

        this.getView().find(this.KEYWORD_INPUT_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start=0;
                me.set(true);
            }
        });

        this.set(async);
    },
    set: function (async) {
        var me = this;
        var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
        this.filter_keyword = keyword_input.val();

        var entity = JSON.stringify({
            startposition: me.page_start,
            pagesize: me.page_size,
            keyword: this.filter_keyword
        });
        var params = JSON.stringify({});
        var data = {url: '/api/user/readAllForPage', params: params, entity: entity};

        $.io.post(data)
            .success(function (result,pager) {
                me.setPage(pager);
                me.setTable(result);
            });
    },
    setPage: function (response) {//设置页数选择列表
        var _this=this;
        _this.page_start==0&& $.dom.pager("#table-pager",response).onChange(function (param) {
            _this.page_size=param.pagesize;
            _this.page_start=param.startposition;
            _this.set(true);
        });
    },
    setTable: function (response) {
        var table = this.getView().find(this.TABLE_ID);
        table.find("tbody").empty();
        if (response) {
            for (var i = 0; i < response.length; i++) {
                this.add(response[i]);
            }
        }
    },
    add: function (item) {//table增加一行
        if(!item){
            return;
        }
        var key = this.tr_value++;
        var table = this.getTable();

        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);

        var account = USER.toAccount(item);
        var account_td = $('<td class="text-center"></td>');
        tr.append(account_td);
        if (account) {
            var url = PAGE.USER_EDIT + '?' + USER.ID_KEY + '=' + USER.toId(item);
            var account_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + account + '">' + account + '</a>');
            account_td.append(account_a);
        } else {
            account_td.append($('<span class="span-12"></span>'));
        }

        var enabled = USER.toEnabled(item)?'是':'否';
        var enabled_td = $('<td class="text-center"><span class="text-overflow" title="' + enabled + '">' + enabled + '</span></td>');
        tr.append(enabled_td);

        var name = USER.toName(item);
        var name_td = $('<td class="text-center"><span class="text-overflow" title="' + name + '">' + name + '</span></td>');
        tr.append(name_td);

        var department = USER.toDepartment(item);
        $.project.domain(item.department.id,item.department.class,'deptName');
        department = DEPARTMENT.toItem(department);
        var dname = DEPARTMENT.toName(department);
        var department_td = $('<td class="text-center"><span class="text-overflow" title="' + dname + '">' + dname + '</span></td>');
        tr.append(department_td);

        var company = COMPANY.toItem(DEPARTMENT.toCompany(department));
        company = COMPANY.toName(company);
        var company_td = $('<td class="text-center"><span class="text-overflow" title="' + company + '">' + company + '</span></td>');
        tr.append(company_td);

        var skr = USER.toSKR(item);
        var skr_td = $('<td class="text-center"><span class="text-overflow" title="' + skr + '">' + skr + '</span></td>');
        tr.append(skr_td);

        var khh = USER.toKHH(item);
        var khh_td = $('<td class="text-center"><span class="text-overflow" title="' + khh + '">' + khh + '</span></td>');
        tr.append(khh_td);

        var yhzh = USER.toYHZH(item);
        var yhzh_td = $('<td class="text-center"><span class="text-overflow" title="' + yhzh + '">' + yhzh + '</span></td>');
        tr.append(yhzh_td);
    }
};

