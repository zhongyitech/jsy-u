
$(document).ready(function(){
    VIEWDATA.init(true);

});

var VIEWDATA={
    table_id: "#project-table",
    PAGES_ID: '#model-pages',
    page_size: 10,
    page_start: 0,
    page_total: 1,
    pages_select: 1,
    pages_size: 21,
    key : 0,
    status: {},
    dateformat: {},
    SETTING_RMEBTN_ID : "setting-remove",
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
        var project_id = $("#project_id").val();
        var project_name = $("#project_name").val();
        var fund_name = $("#fund_name").val();
        var project_incharge_name = $("#project_incharge_name").val();
        var archived = $('#archived').is(":checked");


        var params = JSON.stringify(
            {
                "page":{"offset": me.page_start, "max": me.page_size},
                "and-prperties":[
                    {"id":project_id,"operate":"eq"},
                    {"name":project_name,"operate":"like"},
                    {"fundNames":fund_name,"operate":"like"},
                    {"isEnded":archived,"operate":"eq"},
                    {"ownerName":project_incharge_name,"operate":"like"}
                ],
                "or-prperties":[],
                "orderby-prperties":[{"lastUpdated":"desc"}]
            }
        );
        console.log("params", params);

        var data = { url: '/api/project/readAllForPage', entity: params };
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
                me.error(result);
                alert('获取项目信息失败，请刷新页面.');
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
        var pacts = $("#project-table tr");
        if (pacts && pacts.length) {
            for (var i = 1; i < pacts.length; i++) {
                $(pacts[i]).remove();
            }
        }

        var table = $("#project-table");
        if (table && items) {
            for (var i in items) {
                var row = $("<tr></tr>");
                table.append(row);

                row.append('<td>' + items[i]["id"] + '</td>');
                var link = "projectinfo.jsp?id="+ items[i]["id"];
                row.append('<td><a href="'+link+'">' + items[i]["name"] + '</a></td>');
                if(items[i]["fundNames"]){
                    row.append('<td>' + items[i]["fundNames"] + '</td>');
                }else{
                    row.append('<td>尚未关联</td>');
                }

                row.append('<td>' + items[i]["currentStageName"] + '</td>');
                row.append('<td>' + items[i]["creatorName"] + '</td>');
                row.append('<td>' + items[i]["dateCreated"] + '</td>');
                row.append('<td>' + '<button type="button" class="btn-ui btn bg-green large medium mrg10L btn_setting" data-value="'+items[i]["id"]+'"><span class="button-content">设置</span></button>' + '</td>');
            }

            $(".btn_setting").click(function(){

                $.ajax({

                });
                var value=$(this).data("value");
                console.log(value);
                $('.theme-popover').show();

            });

            $('.theme-poptit .close').click(function(){
                $('.theme-popover').hide();
            })
        }
    },

    init_event: function(){
        var me = this;
        $("#search_btn").click(function () {
            me.getItems();
        });

        $("#setting-add").click(function(){
            me.addXianshiTableRow();
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
    post_request: function(filepackage, isContinue){
        console.log("filepackage:",JSON.stringify(filepackage));

        var me = this;
        var data = {url: '/api/filePackage', entity: JSON.stringify(filepackage)};
        console.log(data);
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
                alert('提交时错误.');
            }
        });
    },

    addXianshiTableRow : function(){

        var key = this.key++;
        var xianshi_table = $("#xianshi_table");

        var tr = $('<tr key="' + key + '"></tr>');
        xianshi_table.append(tr);

        var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
        tr.append(checkbox);

        var row = $('<td><div class="form-input "><input name="username" ></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="fromdate" class="col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);

        var row = $('<td><div class="form-input "><input name="todata" class="col-md-12 tcal tcalInput"></div></td>');
        tr.append(row);
        f_tcalInit();
    }
}