$(document).ready(function () {
    USER.ini(true);
    FUND.ini(true);
    VIEWDATA.fund = FUND;
    VIEWDATA.user = USER;
    VIEWDATA.customer = CUSTOMER;
    VIEWDATA.deposit = DEPOSIT;
    VIEWDATA.dateformat = DATEFORMAT;
    VIEWDATA.init(true);

    //COMMISSION_REPORT.ini(true);
});

var VIEWDATA = {
    table_id: "#query_table",
    KEYWORD_BUTTON_ID: '#filter-button',
    KEYWORD_ID: '#filter-input',
    PAGES_ID: '#page-numbers',
    PAGES_TOTAL: '#pacts-page-total',
    STATUS_ID: '#filter-status',
    FROM_ID: '#filter_from',
    TO_ID: '#filter_to',
    STATUS_KEY: 'status',
    filter_keyword: '',
    filter_status: '',
    filter_from: '',
    filter_to: '',
    page_size: 10,
    page_start: 0,
    pages_select: 1,
    pages_size: 21,
    status: {},
    dateformat: {},
    item: '',
    user: {},
    fund: {},
    deposit: {},
    customer: {},
    init: function () {
        //http://192.168.1.59:8080/jsy-rest/api/commissionInfo/getcommissionInfo
        this.getView();
        this.set_event();
    },
    set_event: function () {
        var me = this;
        //$('#select_sqsh').on('change', function (e) {
        //    //var optionSelected = $("option:selected", this);
        //    //var valueSelected = this.value;
        //    console.log($( "#select_sqsh").val());
        //    console.log(me.deposit.getData(sfgs,rate,$("#select_sqsh").val(),amount));
        //});

        $("select[id^=select_sqsh]").on('change', function (e) {
            //var optionSelected = $("option:selected", this);
            //var valueSelected = this.value;
            var item_id = $(this).attr("id").replace("select_sqsh_", "");
            me.count_auto_value(item_id, me);

        });
        $("input[id^=sl_]").on('change', function (e) {
            //var optionSelected = $("option:selected", this);
            //var valueSelected = this.value;
            var item_id = $(this).attr("id").replace("sl_", "");
            me.count_auto_value(item_id, me);

        });

        //税率 double sl
        //税前还是税后 boolean sqsh
        //是否已付税额  boolean sfyfse
        //发票额 BigDecimal fpje
        //付款金额 BigDecimal fkje
        //税金 BigDecimal sj
        //id Long comId
        $("#submit_commission").click(function () {
            var selected = [];
            $('.item-checkbox:checked').each(function () {
                var item = {};
                var item_id = $(this).val();
                item.comId = item_id;
                item.sfyfse = $("#pay_" + item_id).val();
                item.fpje = $("#c_fpje_" + item_id).val();
                item.sj = $("#c_sj_" + item_id).val();
                item.fkje = $("#c_fkje_" + item_id).val();
                item.sqsh = $("#select_sqsh_" + item_id).val();
                item.sl = $("#sl_" + item_id).val();
                selected.push(item);
            });

            me.post_request(selected);
        });


        $(this.KEYWORD_BUTTON_ID).click(function () {
            //过滤时翻至第一页
            me.page_start = 0;
            me.getItems(true);
        });

        $(this.KEYWORD_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start = 0;
                me.getItems(true);
            }
        });

    },
    count_auto_value: function (item_id, me) {
        var sfgs = $("#sfgs_" + item_id).val();
        if (sfgs == 'undefined') {
            sfgs = false;
        }
        var rate = $("#sl_" + item_id).val();
        var amount = $("#tcje_" + item_id).attr("amount");
        var ratetbefore = $("#select_sqsh_" + item_id).val();

        //console.log(amount);
        var deposit = me.deposit.getData(JSON.parse(sfgs), parseFloat(rate), JSON.parse(ratetbefore), parseFloat(amount));

        $("#pay_" + item_id).val(deposit.pay);
        $("#fpje_" + item_id).html(STRINGFORMAT.toYuan(deposit.fp_amount));
        $("#sj_" + item_id).html(STRINGFORMAT.toYuan(deposit.rate_amount.toFixed(0)));
        $("#fkje_" + item_id).html(STRINGFORMAT.toYuan(deposit.pay_amount));

        $("#c_fpje_" + item_id).val(deposit.fp_amount);
        $("#c_sj_" + item_id).val(deposit.rate_amount);
        $("#c_fkje_" + item_id).val(deposit.pay_amount);
    },
    getView: function () {
        this.getItems();
    },
    post_request: function (items) {
        var arrayLength = items.length;
        if (arrayLength == 0) {
            alert("请选择数据");
            return;
        }
        for (var i = 0; i < arrayLength; i++) {

//            var params = JSON.stringify({jsonStr: items[i]});
            var data = {url: '/api/commissionInfo/addPayment', params: items[i]};

            $.io.post(data).success(function (result) {
                window.location.href = "commission_apply.jsp";
            }).error(function (error) {
                alert("申请操作出错了:" + error.msg);
            });
        }
//        if (!isAllSuc) {
//            alert('提交过程中，存在部分提交时错误.');
//        }
    },
    getFilter: function () {//获取过滤条件
        var from_input = $(this.FROM_ID);
        this.filter_from = from_input.val();
        if (this.filter_from) {
            this.filter_from = this.dateformat.toRest(this.filter_from);
        }

        var to_input = $(this.TO_ID);
        this.filter_to = to_input.val();
        if (this.filter_to) {
            this.filter_to = this.dateformat.toRest(this.filter_to);
        }

        var status_select = $(this.STATUS_ID);
        this.filter_status = status_select.val();

        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();

        this.page_start = (this.pages_select - 1) * this.page_size;
    },
    getItems: function () {
        var me = this;
        me.getFilter();
        //var entity = JSON.stringify({type: this.filter_status, startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword, startsaledate1: me.filter_from, startsaledate2: me.filter_to});

        var condition = {'type': $('#filter-status').val()  };
        var rgrq = DATEFORMAT.toRest($('#filter_from').val());
        var endrqrq = DATEFORMAT.toRest($('#filter_to').val());

        var entity = {startposition: me.page_start, pagesize: me.page_size, type: 'and', condition: condition, order: {type: "asc"}};
        //investment-print.js
        var data = {url: '/api/commissionInfo/getcommissionInfo', entity: entity};

        $.io.post(data)
            .success(function (result, page) {
                me.success(result, page);
            });
    },
    success: function (result, page) {
        this.items = (result)
        this.setTable(this.items);
        this.setPage(page);
        this.set_event();
    },
    setTable: function (items) {
        $("#query_table tbody").empty();
        var table = $("#query_table");
        if (table && items) {
            for (var i in items) {
                var enable = "";
                var row = $("<tr></tr>");
                if (items[i]['type'] != 0) {
                    row = $("<tr class='disabled'></tr>");
                    enable = " disabled='disabled' ";
                }
                table.append(row);

                row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"' + enable + '></span></td>');
//                if(items[i]["type"]==0){
//                    row.append('<td><span class="text-overflow fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
//                }else{
//                    $(row).attr("style","background-color: #2381e9;");
//                    row.append('<td><span class="text-overflow fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
//                }

                row.append('<td><span class="text-overflow">' + items[i]["ywjl"] + '</span></td>');
                row.append('<td><span class=" text-overflow funds-item-name" title="' + items[i]["fundName"] + '">' + items[i]["fundName"] + '</span></td>');
                row.append('<td><span class="text-overflow">' + this.dateformat.toDate(items[i]["rgrq"]) + '</span></td>');
                row.append('<td><span class="text-overflow">' + items[i]["customer"] + '</td>');
                row.append('<td><span class="text-overflow">' + STRINGFORMAT.toYuan(items[i]["tzje"]) + '</span></td>');
                row.append('<td><span class="text-overflow">' + items[i]["syl"] + '</span></td>');
                row.append('<td><span class="text-overflow">' + items[i]["rgqx"] + '</span></td>');

                if (items[i]["type"] == 0) {
                    if (JSON.parse(items[i]["sqsh"])) {
                        row.append('<td>' +
                            "<select id='select_sqsh_" + items[i]["id"] + "'>" +
                            "<option selected=\"selected\" value =\"true\">税前</option>" +
                            "<option value =\"false\">税后</option>" +
                            "</select>" +
                            '</td>');
                    } else {
                        row.append('<td>' +
                            "<select id='select_sqsh_" + items[i]["id"] + "'>" +
                            "<option value =\"true\">税前</option>" +
                            "<option selected=\"selected\" value =\"false\">税后</option>" +
                            "</select>" +
                            '</td>');

                    }


                    row.append('<td><input size="4" id="sl_' + items[i]["id"] + '" value="' + items[i]["sl"] + '" /></td>');
                } else {
                    if (JSON.parse(items[i]["sqsh"])) {
                        row.append('<td>' +
                            "<select id='select_sqsh_" + items[i]["id"] + "' disabled='disabled'>" +
                            "<option selected=\"selected\" value =\"true\">税前</option>" +
                            "<option value =\"false\">税后</option>" +
                            "</select>" +
                            '</td>');
                    } else {
                        row.append('<td>' +
                            "<select id='select_sqsh_" + items[i]["id"] + "' disabled='disabled'>" +
                            "<option value =\"true\">税前</option>" +
                            "<option selected=\"selected\" value =\"false\">税后</option>" +
                            "</select>" +
                            '</td>');
                    }


                    row.append('<td><input disabled="disabled" size="4" id="sl_' + items[i]["id"] + '" value="' + items[i]["sl"] + '" /></td>');
                }

                row.append('<td>' + items[i]["tcl"] + '</td>');
                if (items[i]["lx"] == 0) {
                    row.append('<td><span class="text-overflow">业务提成</span></td>');
                } else {
                    row.append('<td><span class="text-overflow">管理提成</span></td>');
                }

                row.append('<td><span id="tcje_' + items[i]["id"] + '"  amount="' + items[i]["tcje"] + '" >' + STRINGFORMAT.toYuan(items[i]["tcje"]) + '</span></td>');
                row.append('<td><span id="fpje_' + items[i]["id"] + '"></span></td>');
                row.append('<td><span id="sj_' + items[i]["id"] + '"></span></td>');
                row.append('<td><span id="fkje_' + items[i]["id"] + '"></span></td>');
                row.append('<input type="hidden" id="sfgs_' + items[i]["id"] + '" value="' + items[i]["sfgs"] + '"/>');
                row.append('<input type="hidden" id="pay_' + items[i]["id"] + '" value=""/>');

                row.append('<input type="hidden" id="c_fpje_' + items[i]["id"] + '" value=""/>');
                row.append('<input type="hidden" id="c_sj_' + items[i]["id"] + '" value=""/>');
                row.append('<input type="hidden" id="c_fkje_' + items[i]["id"] + '" value=""/>');

                this.count_auto_value(items[i]["id"], this);

            }
        }

    },
    setPage: function (response) {
        var _this = this;
        _this.page_start == 0 && $.dom.pager("#table-pager", response).onChange(function (param) {
            _this.page_start = param.startposition;
            _this.page_size = param.pagesize;
            _this.getItems(true);
        });
    }
};


var DEPOSIT = {
    getData: function (sfgs, rate, ratetbefore, amount) {
        this.rate = rate;
        this.amout = amount;
        if (sfgs) {
            //公司 税前
            if (ratetbefore) {
                return {
                    fp_amount: amount,
                    pay_amount: amount,
                    rate_amount: 0,
                    pay: true
                };
                //公司 税后
            } else {
                var ratevalue = amount * rate;
                return {
                    fp_amount: amount + ratevalue,
                    pay_amount: amount + ratevalue,
                    rate_amount: ratevalue,
                    pay: true
                };
            }

        } else {
            //个人 税前
            if (ratetbefore) {
                var ratevalue = amount * rate;
                return {
                    fp_amount: amount,
                    pay_amount: amount - ratevalue,
                    rate_amount: ratevalue,
                    pay: false
                };
                //个人 税后
            } else {
                var ratevalue = amount * rate;
                return {
                    fp_amount: amount + ratevalue,
                    pay_amount: amount,
                    rate_amount: ratevalue,
                    pay: true
                };
            }
        }
    }
};

var COMMISSION_REPORT = {
    REPORT_ID: 'commission-report',
    ini: function (async) {
        var report = echarts.init(document.getElementById(this.REPORT_ID));
        if (report) {
            var option = {
                title: {
                    text: '基金募集趋势及对比图',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: ['金赛银A', '金赛银B']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '金赛银A',
                        type: 'line',
                        data: [11, 11, 15, 13, 12, 13, 10]
                    },
                    {
                        name: '金赛银B',
                        type: 'line',
                        data: [1, -2, 2, 5, 3, 2, 0]
                    }
                ]
            };
            report.setOption(option);
        }
    }
};