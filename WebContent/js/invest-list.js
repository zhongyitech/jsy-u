$(document).ready(function () {
    INVESTMENT_LIST.investment = INVESTMENT;
    INVESTMENT_LIST.fund = FUND;
    INVESTMENT_LIST.customer = CUSTOMER;
    INVESTMENT_LIST.dateformat = DATEFORMAT;
    INVESTMENT_LIST.numberformat = NUMBERFORMAT;
    INVESTMENT_LIST.stringformat = STRINGFORMAT;

    INVESTMENT_LIST.ini(true);
});

var INVESTMENT_LIST = {
    TABLE_ID: '#investment-table',
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
    investment: {},
    fund: {},
    customer: {},
    dateformat: {},
    numberformat: {},
    stringformat: {},
    ini: function (async) {
        this.iniFilter();
        this.setData(async);
    },
    iniFilter: function () {
        var me = this;
        $("#keyword-button").click(function () {
            //过滤时翻至第一页
            me.page_start = 0;
            me.setData(true);
        });
        $("#keyword-input").on("keyup", function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.setData(true);
            }
        });
    },
    setData: function (async) {
        //异步加载数据
        if (!async) {
            async = false;
        }
        this.setFilter();
        var me = this;
        var params = {};
        //todo: 定义指定查询功能参数
        var entity = JSON.stringify({
                startposition: me.page_start, pagesize: me.page_size, type: "or",
                fields: ["tzqx"],
                value: $("#keyword-input").val(),
                order: {customer: "asc"}
            }
        );
        var data = {url: '/api/investmentArchives/IAOutput', params: params, entity: entity};

        $.io.post(data).success(function (result, page) {
            me.setView(result);
            me.setPage(page);
        }).error(function (error) {
            alert(error.msg);
        });
    },

    setView: function (response) {
        this.items = response;
        this.setTable(this.items);
//        this.setPage(response);

    },
    setFilter: function () {//获取过滤条件
        var keyword_input = $("#keyword-input");
        this.filter_keyword = keyword_input.val();
    },
    setTable: function (items) {
        $(this.TABLE_ID).find("tbody").empty();
        if (items) {
            this.tr_key = 0;
            for (var i=0;i<items.length;i++) {
                this.addTr(items[i]);
            }
        }
        var me = this;
        //绑定事件
        $('.btn_row_action').click(function () {
            var rowkey = $(this).data('rowindex');
            var item = me.items[rowkey];
            console.log(item);
            var actionname = $(this).data('actionname');
            //this.menus[actionname[]];
            var menu = me.menus[actionname];
            if (menu != null && menu.actionfunc != null) {
                console.log(actionname);
                menu.actionfunc(item);
            }
        });
    },
    addTr: function (item) {//增加一行
        var key = this.tr_key++;
        var table = $(this.TABLE_ID);

        var tr = $('<tr key="' + key + '"></tr>');
        table.append(tr);

        var customer = item['customer'];
        var customer_td = ""
        if (customer) {
            customer_td = $('<td><span class=" text-overflow"  title="' + customer + '">' + customer['name'] + '</span></td>');
        } else {
            customer_td = $('<td>' + item['username'] + '<a href="./customer.jsp?id=' + item['id'] + '&type=complted&username=' + item['username'] + '" class="btn medium bg-orange" title=""><span class="button-content">填写</span></a></td>');
        }
        tr.append(customer_td);

        var fund_td = $('<td><span   title="' + item['fund'] + '">' + item['fund'] + '</span></td>');
        tr.append(fund_td);


        var markNum = item['markNum'];

        var markNum_td = $('<td><span   title="' + markNum + '">' + markNum + '</span></td>');
        tr.append(markNum_td);

        var contractNum = item['contractNum'];

        var contractNum_td = "<td><div class='dropdown'>" +
            "<a href=javascript:;' title='' class='btn medium '	data-toggle='dropdown'> <span class='button-content'>" + contractNum +
            "<i class='glyph-icon font-size-11 icon-chevron-down'></i>	</span></a>" +
            "<ul class='dropdown-menu float-right'>" +
//		    "<li><a href='javascript:;' title='' btn_row_action data-rowindex='"+key+"' data-actionname='completedInvestment'><i class='glyph-icon icon-calendar mrg5R ' ></i>完成客户信息</a></li>"+
            "<li><a href='./investment-details.jsp?id=" + item.id + "' class=' btn_row_action' title='' data-rowindex='" + key + "' data-actionname='viewInvestment'><i class='glyph-icon icon-edit mrg5R'></i>查看投资档案明细</a></li><li class='divider'></li>";
        "<li class='divider'></li>";
        if (item['dazt'] == 0) {
            var menus = this.getMenus();
            for (var mkey in menus) {
                var m = menus[mkey];
                if (m.name === "dqzt") {
                    contractNum_td += '<li class="divider"></li>';
                }
                contractNum_td = contractNum_td + "<li><a href='javascript:;' class=' btn_row_action' title='' data-rowindex='" + key + "' data-actionname='" + m.name + "'><i class='glyph-icon icon-edit mrg5R'></i>" + m.title + "</a></li>";
            }
        }
        contractNum_td = contractNum_td + "</ul></div></td>";
        tr.append(contractNum_td);

        var rqrq = item['rgrq'];
        rqrq = this.dateformat.toDate(rqrq);

        var rqrq_td = $('<td><span   class="text-overflow" title="' + rqrq + '">' + rqrq + '</span></td>');
        tr.append(rqrq_td);

        var rqje = NUMBERFORMAT.toYuan(item['sjtzje']);

        var rqje_td = $('<td><span   class="text-overflow" title="' + rqje + '">' + rqje + '</span></td>');
        tr.append(rqje_td);

        var value = '';
        var row = '';
        value = item['tzqx'];
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        value = item['ywjl'];
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        value =item['customer'] ?  item['customer']['country'] :'';
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        value = item['nhsyl'];
        value = this.numberformat.toRate(value);
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        value = item['fxfs'];
        value = this.stringformat.toPayType(value);
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        value = item['dqrq'];
        value = this.dateformat.toDate(value);
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        var statusid = item['dazt'];
        value = FUNDWTSTATUS.get(statusid);
        var vurl = FUNDWTSTATUS.getUrl(statusid) + "?investmentid=" + statusid;
        row = $("<td><a class='' target='_blank' href='" + vurl + "' class='text-overflow' title='" + value + "'>" + value + "</a></td>");
        tr.append(row);

        value = NUMBERFORMAT.toYuan(item['lx']);
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);


        value = NUMBERFORMAT.toYuan(item['bj']);
        row = $('<td><span   class="text-overflow" title="' + value + '">' + value + '</span></td>');
        tr.append(row);

        tr.append("<td></td>");
    },
    menus: null,
    getMenus: function (item) {
        if (this.menus == null) {
            this.initActionMenu();
        }
        //根据值做菜单是否显示的过渡
        return this.menus;
    },
    initActionMenu: function () {
        //getdata 做权限管理
        var me = this;
        this.menus = {
            editInvestment: {
                title: '修改投资档案', name: 'editInvestment', actionfunc: function (item) {
                    var location = "./investment.jsp?id=" + item.id + "&type=edit";
                    window.location = location;
                }
            },
            completedInvestmentUserInfo: {
                title: '填写或修改客户信息', name: 'completedInvestmentUserInfo', actionfunc: function (item) {
                    var location = "./customer.jsp?id=" + item.id + "&type=edit&username=" + item.username;
                    window.location = location;
                }
            },
            dqzt: {
                title: '到期转投处理申请', name: 'dqzt', actionfunc: function (item) {
                    var location = "./special_treat.jsp?investmentid=" + item.id;
                    window.location = location;
                }
            },
            wdqzt: {
                title: '未到期转投处理申请', name: 'wdqzt', actionfunc: function (item) {
                    var location = "./special_untreat.jsp?investmentid=" + item.id;
                    window.location = location;
                }
            },
            thcq: {
                title: '退伙处理申请', name: 'thcq', actionfunc: function (item) {
                    var location = "./refund_add.jsp?investmentid=" + item.id;
                    window.location = location;
                }
            },
            jjxt: {
                title: '基金续投申请', name: 'jjxt', actionfunc: function (item) {
                    var location = "./continuedinvestment-add.jsp?investmentid=" + item.id;
                    window.location = location;
                }
            }
        };
    },
    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
            _this.page_start = param.startposition;
            _this.page_size = param.pagesize;
            _this.setData(true);
        });
    }
};

var FUNDWTSTATUS = {
    items: null,
    urls: [
        "./special_treat.jsp",
        "./special_untreat.jsp",
        "./continuedinvestment-add.jsp",
        "./refund_add.jsp"
    ],
    ini: function () {
        this.items = [
            "无", "到期", "未到期", "续投", "退伙", "", "委付款", "委收款",
        ];
    },
    get: function (status_id) {
        if (this.items == null) {
            this.ini();
        }
        return this.items[status_id];
    },
    getUrl: function (status_id) {
        if (status_id - 1 >= this.urls.length) {
            return "";
        }
        if (status_id == 0) {
            return "";
        }
        return this.urls[status_id - 1];
    }
};
var Context = {
    id: 1,
    name: 'administrator',
    loginuser: 'administrator'
};
