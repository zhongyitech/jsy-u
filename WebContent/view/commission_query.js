$(document).ready(function () {
    USERS.ini(true);
    FUNDS.ini(true);
    VIEWDATA.fund = FUNDS;
    VIEWDATA.user = USERS;
    VIEWDATA.customer = CUSTOMER;
    VIEWDATA.deposit = DEPOSIT;
    VIEWDATA.dateformat=DATEFORMAT;
    VIEWDATA.init(true);
    
    COMMISSION_REPORT.ini(true);
});

var VIEWDATA = {
    table_id: "#query_table",
    KEYWORD_BUTTON_ID: '#filter-button',
    KEYWORD_ID: '#filter-keyword',
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
    page_total: 1,
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
        console.log("getView01");

        this.iniPage();
        console.log("getView02");

        //set event
        this.set_event();
        console.log("getView03");

    },
    set_event: function(){
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
            var item_id = $(this).attr("id").replace("select_sqsh_","");
            me.count_auto_value(item_id, me);

        });
        $("input[id^=sl_]").on('change', function (e) {
            //var optionSelected = $("option:selected", this);
            //var valueSelected = this.value;
            var item_id = $(this).attr("id").replace("sl_","");
            me.count_auto_value(item_id, me);

        });

        //税率 double sl
        //税前还是税后 boolean sqsh
        //是否已付税额  boolean sfyfse
        //发票额 BigDecimal fpje
        //付款金额 BigDecimal fkje
        //税金 BigDecimal sj
        //id Long comId
        $("#submit_commission").click(function() {
            var selected = [];
            $('.item-checkbox:checked').each(function() {
                var item = {};
                var item_id = $(this).val();
                item.comId = item_id;
                item.sfyfse = $("#pay_"+item_id).val();
                item.fpje = $("#c_fpje_"+item_id).val();
                item.sj = $("#c_sj_"+item_id).val();
                item.fkje = $("#c_fkje_"+item_id).val();
                item.sqsh = $("#select_sqsh_"+item_id).val();
                item.sl = $("#sl_"+item_id).val();
                selected.push(item);
            });

            me.post_request(selected);
        });


        $(this.KEYWORD_BUTTON_ID).click(function(){
            //过滤时翻至第一页
            me.selectFirst();
        });

        $(this.KEYWORD_ID).keyup(function(e){
            if(e && e.keyCode==13){
                me.selectFirst();
            }
        });

    },
    count_auto_value: function(item_id, me){
        var sfgs = $("#sfgs_"+item_id).val();
        if(sfgs=='undefined'){
            sfgs = false;
        }
        var rate = $("#sl_"+item_id).val();
        var amount = $("#tcje_"+item_id).attr("amount");
        var ratetbefore = $("#select_sqsh_"+item_id).val();

        //console.log(amount);
        var deposit = me.deposit.getData(JSON.parse(sfgs),parseFloat(rate),JSON.parse(ratetbefore),parseFloat(amount));

        $("#pay_"+item_id).val(deposit.pay);
        $("#fpje_"+item_id).html(STRINGFORMAT.toYuan(deposit.fp_amount));
        $("#sj_"+item_id).html(STRINGFORMAT.toYuan(deposit.rate_amount.toFixed(0)));//TODO
        $("#fkje_"+item_id).html(STRINGFORMAT.toYuan(deposit.pay_amount));

        $("#c_fpje_"+item_id).val(deposit.fp_amount);
        $("#c_sj_"+item_id).val(deposit.rate_amount);
        $("#c_fkje_"+item_id).val(deposit.pay_amount);
    },
    getView: function(){
        this.getItems();
    },
    post_request: function(items){
        var me = this;
        var arrayLength = items.length;
        if(arrayLength==0){
            alert("请选择数据");
            return;
        }
        var isAllSuc = true;
        for (var i = 0; i < arrayLength; i++) {

            var params = JSON.stringify({jsonStr: items[i]});
            ///api/commissionInfo/addPayment?jsonStr=
            var data = {url: '/api/commissionInfo/addPayment', entity: JSON.stringify(items[i])};
            var me = this;
            console.log(JSON.stringify(items[i]));
            $.ajax({
                type: 'post',
                url: '../rest/item/post',
                data: data,
                dataType: 'json',
                async: false,
                success: function(result){
                    console.log("result:"+result);
                    if(result && result.rest_status && result.rest_status == "suc"){
                        me.result = result;
                        console.log("relaod page...");
                    }
                    window.location.href = "commission_apply.jsp";
                },
                error: function(result){
                    isAllSuc = false;
                    if(LOGIN.error(result)){
                        return;
                    }
                    me.error(result);
                }
            });
        }
        if(!isAllSuc){
            alert('提交过程中，存在部分提交时错误.');
        }

    },
    getFilter: function(){//获取过滤条件
        var from_input = $(this.FROM_ID);
        this.filter_from = from_input.val();
        if(this.filter_from){
            this.filter_from = this.dateformat.toRest(this.filter_from);
        }

        var to_input = $(this.TO_ID);
        this.filter_to = to_input.val();
        if(this.filter_to){
            this.filter_to = this.dateformat.toRest(this.filter_to);
        }

        var status_select = $(this.STATUS_ID);
        this.filter_status = status_select.val();

        var keyword_input = $(this.KEYWORD_ID);
        this.filter_keyword = keyword_input.val();

        this.page_start = (this.pages_select - 1) * this.page_size;
    },
    getItems: function(){
        var me = this;
        me.getFilter();

        var params = [];
        var entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword, startsaledate1: me.filter_from, startsaledate2: me.filter_to});
        if(me.filter_from==""||me.filter_to==""){
            entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword});
        }

        //investment-print.js
        console.log("entity",entity);
        var data = {url: '/api/commissionInfo/getcommissionInfo', params: params, entity: entity};
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "suc"){
                    me.result = result;
                    me.success(result);
                }

            },
            error: function(result){
                if(LOGIN.error(result)){
                    return;
                }
                me.error(result);
                alert('获取基金信息失败，请刷新页面.');
            }
        });
    },
    success: function(result){
        this.items = JSON.parse(result['rest_result']);
        this.setTable(this.items);
        console.log("rest_total",result['rest_total']);
        this.page_total = result['rest_total'];
        this.setPage(this.page_total);
    },
    setTable: function(items){
        var pacts = $("#query_table tr");
        if(pacts && pacts.length){
            for(var i=1; i<pacts.length; i++){
                $(pacts[i]).remove();
            }
        }

        var table = $("#query_table");
        if(table && items){
            for(var i in items){
                var row = $("<tr></tr>");
                table.append(row);

                //row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
                if(items[i]["type"]==0){
                    row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
                }else{
                    $(row).attr("style","background-color: #FD0101;");
                    row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
                }

                row.append('<td>' + items[i]["ywjl"] + '</td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["fundName"] + '">' + items[i]["fundName"] + '</span></td>');
                row.append('<td>' + this.dateformat.toDate(items[i]["rgrq"]) + '</td>');
                row.append('<td>' + items[i]["customer"] + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["tzje"]) + '</td>');
                row.append('<td>' + items[i]["syl"] + '</td>');
                row.append('<td>' + items[i]["rgqx"] + '</td>');

                if(items[i]["type"] == 0){
                    if(JSON.parse(items[i]["sqsh"])){
                        row.append('<td>' +
                        "<select id='select_sqsh_"+ items[i]["id"] +"'>" +
                        "<option selected=\"selected\" value =\"true\">税前</option>" +
                        "<option value =\"false\">税后</option>" +
                        "</select>" +
                        '</td>');
                    }else{
                        row.append('<td>' +
                        "<select id='select_sqsh_"+ items[i]["id"] +"'>" +
                        "<option value =\"true\">税前</option>" +
                        "<option selected=\"selected\" value =\"false\">税后</option>" +
                        "</select>" +
                        '</td>');

                    }


                    row.append('<td><input size="4" id="sl_'+ items[i]["id"] +'" value="'+ items[i]["sl"] + '" /></td>');
                }else{
                    if(JSON.parse(items[i]["sqsh"])){
                        row.append('<td>' +
                        "<select id='select_sqsh_"+ items[i]["id"] +"' disabled='disabled'>" +
                        "<option selected=\"selected\" value =\"true\">税前</option>" +
                        "<option value =\"false\">税后</option>" +
                        "</select>" +
                        '</td>');
                    }else{
                        row.append('<td>' +
                        "<select id='select_sqsh_"+ items[i]["id"] +"' disabled='disabled'>" +
                        "<option value =\"true\">税前</option>" +
                        "<option selected=\"selected\" value =\"false\">税后</option>" +
                        "</select>" +
                        '</td>');
                    }


                    row.append('<td><input disabled="disabled" size="4" id="sl_'+ items[i]["id"] +'" value="'+ items[i]["sl"] + '" /></td>');
                }

                row.append('<td>' + items[i]["tcl"] + '</td>');
                if(items[i]["lx"] == 0){
                    row.append('<td>业务提成</td>');
                }else{
                    row.append('<td>管理提成</td>');
                }

                row.append('<td><span id="tcje_'+ items[i]["id"] +'"  amount="'+items[i]["tcje"]+'" >' + STRINGFORMAT.toYuan(items[i]["tcje"]) + '</span></td>');
                row.append('<td><span id="fpje_'+ items[i]["id"] +'"></span></td>');
                row.append('<td><span id="sj_'+ items[i]["id"] +'"></span></td>');
                row.append('<td><span id="fkje_'+ items[i]["id"] +'"></span></td>');
                row.append('<input type="hidden" id="sfgs_'+ items[i]["id"] +'" value="'+items[i]["sfgs"]+'"/>');
                row.append('<input type="hidden" id="pay_'+ items[i]["id"] +'" value=""/>');

                row.append('<input type="hidden" id="c_fpje_'+ items[i]["id"] +'" value=""/>');
                row.append('<input type="hidden" id="c_sj_'+ items[i]["id"] +'" value=""/>');
                row.append('<input type="hidden" id="c_fkje_'+ items[i]["id"] +'" value=""/>');

                this.count_auto_value(items[i]["id"], this);

            }
        }

    },
    iniPage: function(){
        var me = this;
        $('#page-first').click(function(){
            //过滤时翻至第一页
            me.selectFirst();
        });

        $('#page-last').click(function(){
            //过滤时翻至第一页
            me.selectLast();
        });
    },
    setPage: function(total){
        this.page_total = total;

        var pages_div = $(this.PAGES_ID);
        var pages = pages_div.find("a");
        if(pages.length){
            for(var i=0; i<pages.length; i++){
                $(pages[i]).remove();
            }
        }

        var pages_from = this.pages_select - 16;
        if(pages_from<1){
            pages_from = 1;
        }
        var pages_to = pages_from + this.pages_size;
        var pages_total =  Math.ceil(total/this.page_size);

        var me = this;
        for(var i=pages_from; i<pages_to && i<=pages_total; i++){
            var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
            if(i == this.pages_select){
                page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
            }
            pages_div.append(page_number);
            page_number.append(i);
            page_number.click(function(e){me.selectPage(e);});
        }

    },
    selectPage: function(e){
        this.pages_select = e.toElement.textContent;
        this.getItems(true);
    },
    selectFirst: function(){
        this.pages_select = 1;
        this.getItems(true);
    },
    selectLast: function(){
        this.pages_select = this.pages_total;
        this.getItems(true);
    }

};


var VIEWSCRIPT = {
    /*通赤税率获取发票、税金、付款金额*/
    getMoney: function (rate, amount) {
        var result = {};
        return result;
    },

};

// 数据格式化类
var FORMATPRIVED = {
    formatValue: function (name, data) {
        var fun = FORMATPRIVED[name];
        if (fun != null) {
            return fun(data);
        }
        return data;
    },
    money: function (data) {
        if (data == null) {
            data = 0;
        }
        return MONEYFORMAT.toYuan(data);
    },
    date: function (data) {
        return DATEFORMAT.toDate(data);
    },
    time: function (data) {
        return DATEFORMAT.toTime(data);
    }
	, money_zhcn: function (data) {
	    return data;
	},
    rate: function (data) {
        return data * 100 + "%";
    }
};
var CUSTOMER = {
    itmes: {},
    success: {},
    item: {},
    get: function (id) {
        var me = this;
        $
				.ajax({
				    type: "get",
				    url: "http://192.168.1.59:18080/jsy-rest/api/customer/getcustomer",
				    async: false,
				    data: {
				        cid: id
				    },
				    dataType: "json",
				    success: function (result) {
				        if (result && result.rest_result) {
				            me.item = JSON.parse(result.rest_result);
				        }
				    },
				    beforeSend: function (request) {
				        request.setRequestHeader("authorization", "r554ad1rchgd8j0j0aiql7itq3d1ted2");
				        request.setRequestHeader("accept", "application/json");
				        request.setRequestHeader("Content-Type",
								"application/json;charset=UTF-8");
				    },
				    error: function (result) {
				        // me.error(result);
				    }
				});
        return me.item;
    }
};
var USERS = {
    items: [],
    map: {},
    success: function () {
    },
    error: function (result) {
        LOGIN.error(result);
    },
    ini: function (async) {
        // 默认异步加载数据
        if (!async) {
            async = false;
        }
        var me = this;
        $.ajax({
            type: "post",
            url: "../rest/user/getAll",
            async: async,
            data: {},
            dataType: "json",
            success: function (result) {
                if (result && result.rest_result) {
                    me.items = JSON.parse(result.rest_result);
                    me.success();
                }
            },
            error: function (result) {
                me.error(result);
            }
        });
    },
    getItems: function () {
        if (!this.items || this.items.length == 0) {
            // 同步加载数据
            this.ini(false);
        }
        return this.items;
    },
    getMap: function () {
        if (JSON.stringify(this.map) == "{}") {
            var items = this.getItems();
            for (var i in items) {
                this.map[items[i]['id']] = items[i];
            }
        }
        return this.map;
    },
    get: function (id) {
        var map = this.getMap();
        return map[id];
    }
};
var FUNDS = {
    items: [],
    map: {},
    success: function () {
    },
    error: function (result) {
        LOGIN.error(result);
    },
    ini: function (async) {
        // 默认异步加载数据
        if (!async) {
            async = false;
        }
        var me = this;
        $.ajax({
            type: "post",
            url: "../rest/fund/getAll",
            async: async,
            data: {},
            dataType: "json",
            success: function (result) {
                if (result && result.rest_result) {
                    me.items = JSON.parse(result.rest_result);
                }
                me.success();
            },
            error: function (result) {
                me.error();
            }
        });
    },
    getItems: function () {
        if (!this.items || this.items.length == 0) {
            // 同步加载数据
            this.ini();
        }
        return this.items;
    },
    getMap: function () {
        if (JSON.stringify(this.map) == "{}") {
            var items = this.getItems();
            for (var i in items) {
                this.map[items[i]['id']] = items[i];
            }
        }
        return this.map;
    },
    get

	: function (id) {
	    var map = this.getMap();
	    return map[id];
	}
};
var DEPARTMENTS = {
    items: [],
    itemMap: {},
    item: {},
    ini: function () {
        var me = this;
        $.ajax({
            type: "post",
            url: "../rest/department/getAll",
            async: true,
            data: {},
            dataType: "json",
            success: function (result) {
                me.items = JSON.parse(result.rest_result);
            },
            error: function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
            }
        });
    },
    get: function (id) {
        if (JSON.stringify(this.itemMap) == "{}") {
            for (var i in this.items) {
                this.itemMap[this.items[i]['id']] = this.items[i];
            }
        }
        return this.itemMap[id];
    },
    getDepartMent: function (id) {
        var me = this;
        var url = "http://192.168.1.59:18080/jsy/api/department";
        $.ajax({
            type: "get",
            url: url,
            async: false,
            data: {
                id: id
            },
            dataType: "json",
            success: function (result) {
                me.item = JSON.parse(result.rest_result)[0];
            },
            beforeSend: function (request) {
                request.setRequestHeader("authorization", "r554ad1rchgd8j0j0aiql7itq3d1ted2");
                request.setRequestHeader("accept", "application/json");
                request.setRequestHeader("Content-Type",
						"application/json;charset=UTF-8");
            },
            error: function (result) {
            }
        });
        return me.item;
    }
};
var DEPOSIT= {
    getData:function(sfgs,rate,ratetbefore,amount){
        this.rate=rate;
        this.amout=amount;
        if(sfgs){
            //公司 税前
            if(ratetbefore){
                return {
                    fp_amount:amount,
                    pay_amount:amount,
                    rate_amount:0,
                    pay:true
                };
                //公司 税后
            }else{
                var ratevalue=amount*rate;
                return {
                    fp_amount:amount+ratevalue,
                    pay_amount:amount+ratevalue,
                    rate_amount:ratevalue,
                    pay:true
                };
            }

        }else{
            //个人 税前
            if(ratetbefore){
                var ratevalue=amount*rate;
                return {
                    fp_amount:amount,
                    pay_amount:amount-ratevalue,
                    rate_amount:ratevalue,
                    pay:false
                };
                //个人 税后
            }else{
                var ratevalue=amount*rate;
                return {
                    fp_amount:amount+ratevalue,
                    pay_amount:amount,
                    rate_amount:ratevalue,
                    pay:true
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
