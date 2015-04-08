
$(document).ready(function(){
    VIEWDATA.init(true);

});

var VIEWDATA={

    table_id: "#pay_records_table",
    PAGES_ID: '#funds-pages',
    page_size: 10,
    page_start: 0,
    page_total: 1,
    pages_select: 1,
    pages_size: 21,


    table_id2: "#receives_table",
    PAGES_ID2: '#funds-pages2',
    page_size2: 10,
    page_start2: 0,
    page_total2: 1,
    pages_select2: 1,
    pages_size2: 21,

    status: {},
    dateformat: {},

    init: function(sync){
        this.init_view();
        this.init_event();
    },

    init_view: function(){
        var me = this;
        //this.getItems();
        $("#paydate").val(DATEFORMAT.toDate(new Date()));

        $("#paydate").change(function(){
            var dateText = $("#paydate").val();
            var stopDate = DATEFORMAT.toDate($(this).val());
            var pay_records = [];
            $("input[name='pay_records'][type='radio']", "#pay_records_table").each(function(){
                pay_records.push($(this).val());
            });

            //获取数据变化情况
            var params = JSON.stringify(
                {
                    "payRecords":pay_records,
                    "stopDate":stopDate
                }
            );
            var data = { url: '/api/payRecord/changeByDate', entity: params };
            $.ajax({
                type: 'post',
                url: '../rest/item/post',
                data: data,
                dataType: 'json',
                async: false,
                success: function (result) {
                    console.log("readAllForPage", result);
                    if (result && result.rest_status && result.rest_status == "200") {
                        var items = JSON.parse(result['rest_result']);
                        me.setTable(items);
                    }

                },
                error: function (result) {
                    if (LOGIN.error(result)) {
                        return;
                    }
                }
            });
        });
        //$("#paydate").datepicker({
        //    onSelect: function(dateText) {
        //
        //    }
        //});
    },
    getItems: function () {

        var me = this;
        me.getFilter();

        //get 查询字段
        var fundid = $("#_fundname").val();
        var bank_person = $("#bank_person").val();
        var payer = $("#payer").val();

        var params = JSON.stringify(
            {
                "page":{"offset": me.page_start, "max": me.page_size},
                "and-prperties":[
                    {"fund":parseInt(fundid),"operate":"eq"},
                ],
                "or-prperties":[],
                "orderby-prperties":[{"lastUpdated":"desc"}]
            }
        );

        //获取付款明细
        var data = { url: '/api/payRecord/readAllForPage', entity: params };
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log("readAllForPage", result);
                if (result && result.rest_status && result.rest_status == "200") {
                    me.result = result;
                    me.success(result);
                }

            },
            error: function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
            }
        });

    },

    getItems2: function () {

        var me = this;
        me.getFilter();

        //get 查询字段
        var fundid = $("#_fundname").val();
        var bank_person = $("#bank_person").val();
        var payer = $("#payer").val();


        //获取收款明细
        var params2 = JSON.stringify(
            {
                "page":{"offset": me.page_start2, "max": me.page_size2},
                "fundid":parseInt(fundid),
                "bank_person":bank_person,
                "orderby-prperties":[{"lastUpdated":"desc"}]
            }
        );
        var data = { url: '/api/receiveRecord/findReceiveByFund', entity: params2 };
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                if (result && result.rest_status && result.rest_status == "200") {
                    me.success2(result);
                }
            },
            error: function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
            }
        });
    },


    getFilter: function () {//获取过滤条件
        this.page_start = (this.pages_select - 1) * this.page_size;
    },
    success: function (result) {
        this.items = JSON.parse(result['rest_result']);
        this.setTable(this.items);
        this.page_total = result['rest_total'];
        this.setPage(this.page_total);
    },
    setTable: function (items) {
        var me = this;
        var pacts = $("#pay_records_table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        var table = $("#pay_records_table");
        if (table && items) {
            for (var i in items) {
                var row = $("<tr></tr>");
                table.append(row);

                row.append('<td><input type="radio" name="pay_records" value="' + items[i]["id"] + '"</td>');
                row.append('<td>' + DATEFORMAT.toDate(items[i]["payDate"]) + '</td>');
                row.append('<td>' + items[i]["fundname"] + '</td>');
                row.append('<td>' + items[i]["amount"] + '</td>');
                row.append('<td>' + items[i]["interest_bill"] + '</td>');
                row.append('<td>' + items[i]["manage_bill"] + '</td>');
                row.append('<td>' + items[i]["community_bill"] + '</td>');
                row.append('<td>' + items[i]["overDue"] + '</td>');
                row.append('<td>' + items[i]["penalty_bill"] + '</td>');
                row.append('<td>' + items[i]["investDays"] + '</td>');

                var delbtn = $('<a data-id="' + items[i]["id"] + '" href="#">删除</a>');
                delbtn.click(function(){
                    var statu = confirm("确定删除?");
                    if(!statu){
                        return false;
                    }
                    var params = JSON.stringify({"payRecordId":$(this).data("id")});
                    var data = { url: '/api/payRecord/del', params: params };
                    $.io.post(data).success(function(){
                        me.getItems();
                    }).error(function(result){
                        if(result.msg){
                            alert(result.msg);
                        }else{
                            alert("删除错误，请重试！");
                        }
                    });

                });
                var td = $('<td>');
                td.append(delbtn);
                row.append(td);
            }
        }


        $("input[name='pay_records'][type='radio']").click(function(){
            var payRecordId = $(this).val();
            var stopDate  = $("#paydate").val();
            var params = JSON.stringify({payRecordId:payRecordId,stopDate:stopDate});

            //获取收款记录

            var data2 = { url: '/api/receiveRecord/findByPayRecord', params: params };
            $.io.get(data2).success(function (result) {
                $("#payrecord_own_money").html(result.rest_totalBalance);
                me.setReceiveDetailRecordItems(result.rest_result);
            }).error(function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
            });

        });
    },
    setPage: function (total) {
        this.page_total = total;

        var pages_div = $(this.PAGES_ID);
        var pages = pages_div.find("a");
        if (pages.length) {
            for (var i = 0; i < pages.length; i++) {
                $(pages[i]).remove();
            }
        }

        var pages_from = this.pages_select - 16;
        if (pages_from < 1) {
            pages_from = 1;
        }
        var pages_to = pages_from + this.pages_size;
        var pages_total = Math.ceil(total / this.page_size);

        var me = this;
        for (var i = pages_from; i < pages_to && i <= pages_total; i++) {
            var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
            if (i == this.pages_select) {
                page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
            }
            pages_div.append(page_number);
            page_number.append(i);
            page_number.click(function (e) { me.selectPage(e); });
        }
    },
    selectPage: function (e) {
        this.pages_select = e.toElement.textContent;
        this.getItems(true);
    },
    selectFirst: function () {
        this.pages_select = 1;
        this.getItems(true);
    },
    selectLast: function () {
        this.pages_select = this.pages_total;
        this.getItems(true);
    },

    success2: function (result) {
        this.items = JSON.parse(result['rest_result']);
        this.setTable2(this.items);
        this.page_total = result['rest_total'];
        this.setPage2(this.page_total);
    },
    setTable2: function (items) {
        var me = this;
        var pacts = $("#receives_table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        var table = $("#receives_table");
        if (table && items) {
            for (var i in items) {
                var row = $("<tr></tr>");
                table.append(row);

                //row.append('<td><input type="radio" name="pay_records" value="' + items[i]["id"] + '"</td>');
                row.append('<td>' + DATEFORMAT.toDate(items[i]["receiveDate"]) + '</td>');
                row.append('<td>' + items[i]["fundname"] + '</td>');
                row.append('<td>' + items[i]["amount"] + '</td>');

                row.append('<td>' + items[i]["accountName"] + '</td>');
                row.append('<td>' + items[i]["account"] + '</td>');
                //row.append('<td>' + items[i]["remain_charge"] + '</td>');

                var delbtn = $('<a data-id="' + items[i]["id"] + '" href="#">删除</a>');
                delbtn.click(function(){
                    var statu = confirm("确定删除?");
                    if(!statu){
                        return false;
                    }
                    var params = JSON.stringify({"recvRecordId":$(this).data("id")});
                    var data = { url: '/api/receiveRecord/del', params: params };
                    $.io.post(data).success(function(){
                        me.getItems2();
                    }).error(function(result){
                        if(result.msg){
                            alert(result.msg);
                        }else{
                            alert("删除错误，请重试！");
                        }
                    });

                });
                var td = $('<td>');
                td.append(delbtn);
                row.append(td);
            }
        }

    },
    setPage2: function (total) {
        this.page_total = total;

        var pages_div = $(this.PAGES_ID2);
        var pages = pages_div.find("a");
        if (pages.length) {
            for (var i = 0; i < pages.length; i++) {
                $(pages[i]).remove();
            }
        }

        var pages_from = this.pages_select - 16;
        if (pages_from < 1) {
            pages_from = 1;
        }
        var pages_to = pages_from + this.pages_size2;
        var pages_total = Math.ceil(total / this.page_size2);

        var me = this;
        for (var i = pages_from; i < pages_to && i <= pages_total; i++) {
            var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
            if (i == this.pages_select) {
                page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
            }
            pages_div.append(page_number);
            page_number.append(i);
            page_number.click(function (e) { me.selectPage2(e); });
        }
    },
    selectPage2: function (e) {
        this.pages_select2 = e.toElement.textContent;
        this.getItems2(true);
    },
    selectFirst2: function () {
        this.pages_select2 = 1;
        this.getItems2(true);
    },
    selectLast2: function () {
        this.pages_select2 = this.pages_total;
        this.getItems2(true);
    },

    init_event: function(){
        var me = this;
        $('#fundname').autocomplete(
            {
                serviceUrl: '../rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/fund/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    $("#fundname").val(suggestion.value);
                    $("#_fundname").val(suggestion.data);
                    if(me.oldSelectData!=suggestion.data){
                        me.oldSelectData=suggestion.data;
                        //me.load_projectinfos(suggestion.data);
                    }
                },
                transformResult: function (response) {
                    //clear old value
                    $("#fundname").val("");
                    $("#_fundname").val("");
                    if (!response || response == '') {
                        return {
                            "query": "Unit",
                            "suggestions": []
                        };
                    } else {
                        var result = JSON.parse(response);
                        var suggestions = JSON.parse(result.suggestions);
                        result.suggestions = suggestions;
                        return result;
                    }
                }
            });


        $("#payAmount").keyup(function(){
            $(this).val(STRINGFORMAT.toYuan($(this).val()));
        });

        $("#search_paylist_btn").click(function(){
            me.getItems();
            me.getItems2();

            return false;
        });


    },

    setReceiveDetailRecordItems: function (items) {
        var pacts = $("#receive_records_table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        var table = $("#receive_records_table");
        if (table && items) {
            for (var i in items) {
                var row = $("<tr></tr>");
                table.append(row);

                var cn_change;
                if(items[i]["target"]=="original"){
                    cn_change = "本金";
                }else if(items[i]["target"]=="maintain"){
                    cn_change = "管理费";
                }else if(items[i]["target"]=="channel"){
                    cn_change = "渠道费";
                }else if(items[i]["target"]=="firstyear"){
                    cn_change = "年利息费";
                }else if(items[i]["target"]=="borrow"){
                    cn_change = "借款费";
                }else if(items[i]["target"]=="penalty"){
                    cn_change = "违约费";
                }else if(items[i]["target"]=="overdue"){
                    cn_change = "逾期费";
                }

                row.append('<td>' + cn_change + '</td>');
                row.append('<td>' + items[i]["amount"] + '</td>');
                row.append('<td>' + items[i]["dateCreated"] + '</td>');
            }
        }
    }


}