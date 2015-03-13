
$(document).ready(function(){
    VIEWDATA.init(true);

});

var VIEWDATA={

    table_id: "#pay_records_table",
    PAGES_ID: '#model-pages',
    page_size: 10,
    page_start: 0,
    page_total: 1,
    pages_select: 1,
    pages_size: 21,
    status: {},
    dateformat: {},

    init: function(sync){
        this.init_view();
        this.init_event();
    },

    init_view: function(){
        this.getItems();
    },
    getItems: function () {

        var me = this;
        me.getFilter();

        //get 查询字段
        var fundid = $("#_fundname").val();
        var payDate = $("#payDate").val();
        var payAmount = STRINGFORMAT.toNumber($("#payAmount").val());
        var bankaccount = $("#bankaccount").val();
        var bankinfo = $("#bankinfo").val();
        var bank_person = $("#bank_person").val();
        var payer = $("#payer").val();


        var params = JSON.stringify(
            {
                "page":{"offset": me.page_start, "max": me.page_size},
                "and-prperties":[
                    {"fund":fundid,"operate":"eq"},
                ],
                "or-prperties":[],
                "orderby-prperties":[{"lastUpdated":"desc"}]
            }
        );
        console.log("params", params);

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
                row.append('<td>' + items[i]["payDate"] + '</td>');
                row.append('<td>' + items[i]["fundname"] + '</td>');
                row.append('<td>' + items[i]["amount"] + '</td>');
                row.append('<td>' + items[i]["interest_bill"] + '</td>');
                row.append('<td>' + items[i]["manage_bill"] + '</td>');
                row.append('<td>' + items[i]["community_bill"] + '</td>');
                row.append('<td>' + items[i]["investDays"] + '</td>');
            }
        }
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
        });

        $("input[name='pay_records'][type='radio']").click(function(){
            var payRecordId = $(this).val();

            var params = JSON.stringify({payRecordId:payRecordId});
            console.log(params);
            var data = { url: '/api/receiveRecord/findByPayRecord', params: params };
            $.ajax({
                type: 'post',
                url: '../rest/item/get',
                data: data,
                dataType: 'json',
                async: false,
                success: function (result) {
                    if (result && result.rest_status && result.rest_status == "200") {
                        console.log(result);
                        var items = JSON.parse(result['rest_result']);
                        me.setReceiveRecordItems(items);
                    }
                },
                error: function (result) {
                    if (LOGIN.error(result)) {
                        return;
                    }
                }
            });
        });

    },

    setReceiveRecordItems: function (items) {
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

                row.append('<td>' + items[i]["target"] + '</td>');
                row.append('<td>' + items[i]["amount"] + '</td>');
                row.append('<td>' + items[i]["dateCreated"] + '</td>');
            }
        }
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
    post_request: function(filepackage, isContinue){
        console.log("filepackage:",JSON.stringify(filepackage));

        var me = this;
        var data = {url: '/api/filePackage', entity: JSON.stringify(filepackage)};
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "200"){
                    me.result = result;
                    if(isContinue){
                        window.location.href = "filepackage-add.jsp";
                    }else{
                        window.location.href = "filepackage-list.jsp";
                    }

                }

            },
            error: function(result){
                isAllSuc = false;
                if(LOGIN.error(result)){
                    return;
                }
            }
        });
    }
}