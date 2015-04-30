$(document).ready(function () {

    REPORT.dateformat = DATEFORMAT;
    REPORT.ini(true);
});

var REPORT = {
    table_id: "#pacts-get-table",
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

    ini: function (async) {

        //兑付信息与汇总表格数据加载
        this.getView();
        this.set_event();

        //报表测试数据
        //var report = echarts.init(document.getElementById('cash-report'));
        //if (report) {
        //    var option = {
        //        title: {
        //            text: '基金募集趋势及对比图',
        //            subtext: ''
        //        },
        //        tooltip: {
        //            trigger: 'axis'
        //        },
        //        legend: {
        //            x: 'center',
        //            y: 'bottom',
        //            data: ['金赛银A', '金赛银B']
        //        },
        //        toolbox: {
        //            show: true,
        //            feature: {
        //                mark: {show: true},
        //                dataView: {show: true, readOnly: false},
        //                magicType: {show: true, type: ['line', 'bar']},
        //                restore: {show: true},
        //                saveAsImage: {show: true}
        //            }
        //        },
        //        calculable: true,
        //        xAxis: [
        //            {
        //                type: 'category',
        //                boundaryGap: false,
        //                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        //            }
        //        ],
        //        yAxis: [
        //            {
        //                type: 'value',
        //                axisLabel: {
        //                    formatter: '{value}'
        //                }
        //            }
        //        ],
        //        series: [
        //            {
        //                name: '金赛银A',
        //                type: 'line',
        //                data: [11, 11, 15, 13, 12, 13, 10]
        //            },
        //            {
        //                name: '金赛银B',
        //                type: 'line',
        //                data: [1, -2, 2, 5, 3, 2, 0]
        //            }
        //        ]
        //    };
        //    report.setOption(option);
        //}

    },
    set_event: function () {
        var me = this;
        //check box event
        $("#submit_cash").click(function () {
            var selected = [];
            $('.item-checkbox:checked').each(function () {
                selected.push($(this).val());
            });
            console.log(selected.join(','));
            //window.location.href = "cash_list.jsp";

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
    post_request: function (items) {
        if (items && items.length == 0) {
            alert("请选择数据");
            return;
        }

        var me = this;
        //var params = JSON.stringify({payIds: items});
        var params = items.join(",");
        var data = {url: '/api/paymentInfo/toPay?payIds=' + params};
        var me = this;
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log(result);
                if (result && result.rest_status && result.rest_status == "suc") {
                    me.result = result;
                    console.log("relaod page...");
                }
                window.location.href = "cash_list.jsp";

            },
            error: function (result) {
                isAllSuc = false;
                if (LOGIN.error(result)) {
                    return;
                }
                alert('提交时错误.');
            }
        });


    },
    getView: function () {
        //兑付信息
        this.getItems();

        //汇总
        //this.getItems();
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
    },
    getItems: function () {
        var me = this;
        me.getFilter();

//        var entity = JSON.stringify({
//            type: me.filter_status,
//            startposition: me.page_start, pagesize: me.page_size,
//            type: 'and', condition: condition, order: {type: "asc"},
////			keyword: me.filter_keyword,
//            startsaledate1: me.filter_from, startsaledate2: me.filter_to});
        var condition={type:$('#filter-status').val()};
        var entity = {startposition: this.page_start, pagesize: this.page_size, type: 'and', condition: condition, order: {type: "asc"}};

        var data = {url: '/api/paymentInfo/readAllForPage', entity: entity};

        $.io.post(data).success(function (result, page) {
            me.result = result;
            me.success(result);
            me.setPage(page);

        });
    },
    success: function (result) {
        this.items = result;
        this.setTable(this.items);
//		this.setPage(result);
    },
    setTable: function (items) {
        var table = $("#pacts-get-table");
        table.find("tbody").empty();
        if (table && items) {
            for (var i=0;i<items.length;i++) {
                var row = $("<tr></tr>");
                table.append(row);
                row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="' + items[i]["id"] + '"></span></td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["fundName"] + '">' + items[i]["fundName"] + '</span></td>');
                row.append('<td>' + items[i]["htbh"] + '</td>');
                row.append('<td>' + items[i]["customerName"] + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["tzje"]) + '</td>');
                row.append('<td>' + items[i]["tzqx"] + '</td>');
                row.append('<td>' + items[i]["syl"] + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yflx"]) + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfbj"]) + '</td>');
                row.append('<td>' + STRINGFORMAT.toYuan(items[i]["zj"]) + '</td>');
                row.append('<td>' + items[i]["khh"] + '</td>');
                row.append('<td>' + items[i]["yhzh"] + '</td>');
                row.append('<td>' + items[i]["gj"] + '</td>');
                row.append('<td>' + items[i]["zjlx"] + '</td>');
                row.append('<td>' + items[i]["zjhm"] + '</td>');
                row.append('<td>  <a href="#" class="btn medium bg-green tooltip-button" data-placement="top" title="" data-original-title="Content" id="attach_' + items[i]["id"] + '"><i class="glyph-icon icon-hdd"></i></a> </td>');
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

(function($){
    var Util={
        _entity:{
            startposition: 0,
            pagesize: 10,
            type:"or",
            fields:["fundName","amount","count","lx","bj"],
            value:""
//            order:{id:"desc"}
        },
        _request:function(options){
            $.extend(true,this._entity,options.entity)
            return $.io.post({
                url: '/api/paymentInfo/summary',
                entity:this._entity
            });
        },
        _render:function(entity){
            var _this=this;
            _this._request({entity:entity}).success(function(result,pager){
                _this._renderData(result);
                _this._renderPage(pager);
            });
        },
        _renderData:function(result){
            var _this=this;
            $("#summary-data").renderData("#summary-data-template",result,function(){
                return _this._entity.startposition;
            });
        },
        _renderPage:function(pager){
            var _this=this;
            if(!_this._entity.startposition){
                $.dom.pager("#table-pager-summary",pager,{
                    pageSize:_this._entity.pagesize
                }).onChange(function(entity){
                    _this._render(entity);
                });
            }
        },
        _bindEvent:function(){
            var _this=this,keyword=$("#keyword-input-aummary"),searchButton=$("#keyword-button-summary");
            keyword.unbind("keyup").bind("keyup",function(e){
                if(e.keyCode==13) _this._render({startposition: 0,value:keyword.val()});
            });
            searchButton.unbind("click").bind("click",function(){
                _this._render({startposition: 0,value:keyword.val()});
            });
        },
        render:function(){
            this._render();
            this._bindEvent();
        }
    };
    Util.render();
})(jQuery);