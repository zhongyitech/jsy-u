
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
                    {"archive":archived,"operate":"eq"},
                    {"ownerName":project_incharge_name,"operate":"like"}
                ],
                "or-prperties":[],
                "orderby-prperties":[{"lastUpdated":"desc"}]
            }
        );
        console.log("params", params);

        var data = { url: '/api/project/readAllForPage', entity: params };
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
    success: function (result) {
        this.items = JSON.parse(result['rest_result']);
        this.setTable(this.items);
        this.page_total = result['rest_total'];
        this.setPage(result);
    },
    setTable: function (items) {
        var table = $("#project-table");
        table.find("tbody").empty();
        if (table && items) {
            for (var i =0;i<items.length;i++) {
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

                link = "project_limittime_setting.jsp?projectId="+ items[i]["id"];
                row.append('<td><a class="btn-ui btn bg-green large medium mrg10L btn_setting" href="'+link+'">' + '<span class="button-content">设置</span>' + '</a></td>');
//                row.append('<td>' + '<button type="button" class="btn-ui btn bg-green large medium mrg10L btn_setting" data-value="'+items[i]["id"]+'"><span class="button-content">设置</span></button>' + '</td>');
            }

//            $(".btn_setting").click(function(){
//
//                $.ajax({
//
//                });
//                var value=$(this).data("value");
//                console.log(value);
//                $('.theme-popover').show();
//
//            });
//
//            $('.theme-poptit .close').click(function(){
//                $('.theme-popover').hide();
//            })
        }
    },

    init_event: function(){
        var me = this;
        $("#search_btn").click(function () {
            me.getItems();
        });
    },
    setPage: function (data) {
        var _this=this;
        $.dom.pager("#table-pager",data).onChange(function(result){
            _this.page_start=result.startposition;
            _this.page_size=result.pagesize;
            _this.getItems(true);
        });
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
    }

}