$(document).ready(function () {
    USER.ini(true);
    FUND.ini(true);
    TypeConfig.ini(true);
    BorrowStatus.ini(true);

    VIEWDATA.fund = FUND;
    VIEWDATA.user = USER;
    VIEWDATA.customer = CUSTOMER;
    VIEWDATA.init(true);
});


var VIEWDATA = {
    filePackages: {},

    table_id: "#filepackage-get-table",
    KEYWORD_BUTTON_ID: '#keyword-button',
    KEYWORD_ID: '#keyword-input',
    PAGES_ID: '#pacts-get-pages',
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

    table_id2: "#inout_table",
    KEYWORD_BUTTON_ID2: '#keyword-button2',
    KEYWORD_ID2: '#keyword-input2',
    PAGES_ID2: '#pacts-get-pages2',
    PAGES_TOTAL2: '#pacts-page-total2',
    STATUS_ID2: '#filter-status2',
    FROM_ID2: '#filter_from2',
    TO_ID2: '#filter_to2',
    STATUS_KEY2: 'status2',
    filter_keyword2: '',
    filter_status2: '',
    filter_from2: '',
    filter_to2: '',
    page_size2: 10,
    page_start2: 0,
    pages_select2: 1,
    pages_size2: 21,
    status2: {},
    dateformat2: {},

    user: {},
    fund: {},
    customer: {},

    init: function () {
        this.getView();
        this.getView2();
        this.setEvent();
    },
    getView: function () {
        this.getItems();
    },
    getView2: function () {
        this.getItems2();
    },
    post_request: function (items) {
        var me = this;
        var arrayLength = items.length;
        if (arrayLength == 0) {
            alert("请选择数据");
            return;
        }
        var isAllSuc = true;
        for (var i = 0; i < arrayLength; i++) {

            var params = JSON.stringify({ jsonStr: items[i] });
            ///api/commissionInfo/addPayment?jsonStr=
            var data = { url: '/api/commissionInfo/addPayment', entity: JSON.stringify(items[i]) };
            var me = this;
            console.log(JSON.stringify(items[i]));
            $.ajax({
                type: 'post',
                url: '../rest/item/post',
                data: data,
                dataType: 'json',
                async: false,
                success: function (result) {
                    console.log("result:" + result);
                    if (result && result.rest_status && result.rest_status == "suc") {
                        me.result = result;
                        console.log("relaod page...");
                    }
                    window.location.href = "commission_apply.jsp";

                },
                error: function (result) {
                    isAllSuc = false;
                    if (LOGIN.error(result)) {
                        return;
                    }

                }
            });
        }

        if (!isAllSuc) {
            alert('提交过程中，存在部分提交时错误.');
        }

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

        var params = JSON.stringify({ startposition: me.page_start, pagesize: me.page_size, queryparam: me.filter_keyword });
        console.log("params", params);

        var data = { url: '/api/filePackage/readAllForPage', params: params };
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log("readAllForPage", result);
                if (result && result.rest_status && result.rest_status == "suc") {
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
        this.items = result.rest_result
//            JSON.parse(result['rest_result']);
        this.setTable(this.items);
        this.setPage(result);
    },
    setTable: function (items) {
        var table = $("#filepackage-get-table");
        table.find("tbody").empty();
        if (table && items) {
            for (var i in items) {
                var row = $("<tr></tr>");
                table.append(row);

                this.filePackages[items[i]["id"]] = { fpno: items[i]["fpno"], fpname: items[i]["fpname"], fptype: TypeConfig.getName(items[i]["fptype"].id), fpcode: items[i]["fpcode"], contractNo: items[i]["contractNo"] }

                row.append('<td>' + items[i]["fpno"] + '</td>');
                row.append('<td>' + items[i]["fpname"] + '</td>');
                row.append('<td>' + TypeConfig.getName(items[i]["fptype"].id) + '</td>');
                row.append('<td>' + items[i]["fpcode"] + '</td>');
                row.append('<td>' + items[i]["contractNo"] + '</td>');
                row.append('<td>' + items[i]["projectName"] + '</td>');
                row.append('<td><span class="funds-item-name" title="' + items[i]["fundName"] + '">' + items[i]["fundName"] + '</span></td>');
                row.append('<td>' + items[i]["signedPartner"] + '</td>');
                row.append('<td>' + DATEFORMAT.toDate(items[i]["signedDate"]) + '</td>');
                row.append('<td>' + USER.getName(items[i]["transfer"].id) + '</td>');
                row.append('<td>' + DATEFORMAT.toDate(items[i]["transferDate"]) + '</td>');
                row.append('<td>' + items[i]["saveposition"] + '</td>');
                row.append('<td>' + items[i]["cabinetno"] + '</td>');
                var pid = items[i]['id'];
                if (items[i]["borrowstatus"].id == BorrowStatus.IN_STORE) {
                    row.append(
						"<td>" +

						"	<div class=\"dropdown\">" +
						"		" + BorrowStatus.getName(items[i]["borrowstatus"].id) + "" +
						"		<a href=\"javascript:;\" title=\"\" class=\"btn medium \" data-toggle=\"dropdown\">" +
						"			<span class=\"button-content\">" +
						"				<i class=\"glyph-icon font-size-11 icon-cog\"></i> <i class=\"glyph-icon font-size-11 icon-chevron-down\"></i>" +
						"			</span>" +
						"		</a>" +
						"		<ul class=\"dropdown-menu float-right\">" +

						"			<li>" +
						"				<a href=\"javascript:;\" title=\"\" id=\"borrow_" + pid + "\"> <i class=\"glyph-icon icon-calendar mrg5R\"></i> 借阅" +
						"				</a>" +
						"			</li>" +
						"		</ul>" +
						"	</div>" +
						"</td>");
                }
                else {
                    row.append(
						"<td>" +

						"	<div class=\"dropdown\">" +
						"		" + BorrowStatus.getName(items[i]["borrowstatus"].id) + "" +
						"		<a href=\"javascript:;\" title=\"\" class=\"btn medium \" data-toggle=\"dropdown\">" +
						"			<span class=\"button-content\">" +
						"				<i class=\"glyph-icon font-size-11 icon-cog\"></i> <i class=\"glyph-icon font-size-11 icon-chevron-down\"></i>" +
						"			</span>" +
						"		</a>" +
						"		<ul class=\"dropdown-menu float-right\">" +

						"			<li>" +
						"				<a href=\"javascript:;\" title=\"\" id=\"return_" + pid + "\"> <i class=\"glyph-icon icon-edit mrg5R\"></i> 归还" +
						"				</a>" +
						"			</li>" +
						"		</ul>" +
						"	</div>" +
						"</td>");
                }
                //row.append('<td>' + BorrowStatus.getName(items[i]["borrowstatus"].id) + '</td>');
            }
        }
    },

    getBorrower: function (filePackage_id) {
        var params = JSON.stringify({ fpid: filePackage_id });
        var data = { url: '/api/borrowFilesPackageRecords/findByFilepackageId', params: params };
        var me = this;
        console.log(params);
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log("result:", result);
                if (result && result.rest_status && result.rest_status == 'suc') {
                    $("#dialog_jyr").val(result.rest_result);
                }
            },
            error: function (result) {
                isAllSuc = false;
                if (LOGIN.error(result)) {
                    return;
                }
            }
        });
    },
    setEvent: function () {
        var me = this;
        $("a[id^=return_]").click(function () {


            $("#light").css("display", "block");
            $("#fade").css("display", "block");

            //console.log(this.id.replace("return_", ""));
            //console.log($( "td:eq(2)",$(this).closest("tr")).html());
            //档案号 0
            $("#dialog_dah").val($("td:eq(1)", $(this).closest("tr")).html());


            var fpid = $(this).attr('id').replace('return_', '');
            $('#currentPid').val(fpid);

            //档案名称 1
            $("#dialog_damc").val($("td:eq(2)", $(this).closest("tr")).html());


            //借阅人 当前人
            me.getBorrower($("td:eq(1)", $(this).closest("tr")).html());

            //借阅时间 当前时间
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = d.getFullYear() + '-' +
				(month < 10 ? '0' : '') + month + '-' +
				(day < 10 ? '0' : '') + day;
            $("#dialog_jyrq").val(output);
            
            $('#dialog_jyr').val()
        });

        $("a[id^=borrow_]").click(function () {
            $("#b_light").css("display", "block");
            $("#b_fade").css("display", "block");

            //console.log(this.id.replace("return_", ""));
            //console.log($( "td:eq(2)",$(this).closest("tr")).html());
            //档案号 0
            var fpid = $(this).attr('id').replace('borrow_', '');
            $('#currentPid').val(fpid);
            $("#b_dialog_dah").val($("td:eq(1)", $(this).closest("tr")).html());

            //档案名称 1
            $("#b_dialog_damc").val($("td:eq(2)", $(this).closest("tr")).html());

            //借阅时间 当前时间
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = d.getFullYear() + '-' +
				(month < 10 ? '0' : '') + month + '-' +
				(day < 10 ? '0' : '') + day;
            $("#b_dialog_jyrq").val(output);
        });

        $('#b_dialog_jyr_show').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/user/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#b_dialog_jyr").val(suggestion.data);

            },
            transformResult: function (response) {
                //clear old value
                $("#b_dialog_jyr").val("");
                if (!response || response == '') {
                    return {
                        "query": "Unit",
                        "suggestions": []
                    };
                } else {
                    var result = JSON.parse(response);
                    result.suggestions = JSON.parse(result.suggestions);
                    return result;
                }
            }
        });


        $("#cancel_dialog").click(function () {
            $("#light").css("display", "none");
            $("#fade").css("display", "none");

            me.clearDialogValue();
        });

        $("#comfirm_dialog").click(function () {
            var returnTime = DATEFORMAT.toRest($("#dialog_ghrq").val());

            $("#light").css("display", "none");
            $("#fade").css("display", "none");
            var pid = $("#currentPid").val();
            var params = JSON.stringify({ filePackage: { id: pid }, returned: true, returnTime: returnTime, returnRemark: $("#dialog_bz").val() });
            console.log("params", params);

            var data = { url: '/api/borrowFilesPackageRecords', entity: params };
            var me = this;
            $.ajax({
                type: 'post',
                url: '../rest/item/put',
                data: data,
                dataType: 'json',
                async: false,
                success: function (result) {
                    console.log("borrowFilesPackageRecords", result);
                    if (result && result.rest_status && result.rest_status == "suc") {
                        window.location.href = "filepackage-list.jsp";
                    }

                },
                error: function (result) {
                    if (LOGIN.error(result)) {
                        return;
                    }
                }
            });


            me.clearDialogValue();
        });


        $("#b_cancel_dialog").click(function () {
            $("#b_light").css("display", "none");
            $("#b_fade").css("display", "none");

            me.clearDialogValue();
        });

        $("#b_comfirm_dialog").click(function () {
            var ShouldReturnTime = DATEFORMAT.toRest($("#b_dialog_ghrq").val());
            var BorrowTime = DATEFORMAT.toRest($("#b_dialog_jyrq").val());


            $("#b_light").css("display", "none");
            $("#b_fade").css("display", "none");
            var pid = $("#currentPid").val();
            var params = JSON.stringify({ filePackage: { id: pid }, user: { id: $("#b_dialog_jyr").val() }, borrowTime: BorrowTime, shouldReturnTime: ShouldReturnTime, remark: $("#b_dialog_bz").val() });
            console.log("params", params);

            var data = { url: '/api/borrowFilesPackageRecords', entity: params };
            var me = this;
            $.ajax({
                type: 'post',
                url: '../rest/item/post',
                data: data,
                dataType: 'json',
                async: false,
                success: function (result) {
                    console.log("borrowFilesPackageRecords", result);
                    if (result && result.rest_status && result.rest_status == "suc") {
                        window.location.href = "filepackage-list.jsp";
                    }

                },
                error: function (result) {
                    if (LOGIN.error(result)) {
                        return;
                    }
                }
            });

            me.clearDialogValue2();
        });

        $(this.KEYWORD_BUTTON_ID).click(function () {
            //过滤时翻至第一页
            me.page_start=0;
            me.getItems(true);
        });

        $(this.KEYWORD_ID).keyup(function (e) {
            if (e.keyCode == 13) {
                me.page_start=0;
                me.getItems(true);
            }
        });

    },

    clearDialogValue: function () {
        //档案号 0
        $("#dialog_dah").val("");

        //档案名称 1
        $("#dialog_damc").val("");

        //借阅人 当前人
        $("#dialog_jyr").val("");

        //归还日期
        $("#dialog_ghrq").val("");

        //备注
        $("#dialog_bz").val("");
    },

    clearDialogValue2: function () {
        //档案号 0
        $("#b_dialog_dah").val("");

        //档案名称 1
        $("#b_dialog_damc").val("");

        //借阅人 当前人
        $("#b_dialog_jyr").val("");

        //归还日期
        $("#b_dialog_ghrq").val("");

        //备注
        $("#b_dialog_bz").val("");
    },
    setPage: function (response) {
        var _this=this;
        _this.page_start==0&&$.dom.pager("#table-pager-1",response).onChange(function (param) {
            _this.page_size=param.pagesize;
            _this.page_start=param.startposition;
            _this.getItems2(true);
        });
    },
    //set page for table2

    getFilter2: function () {//获取过滤条件
        var from_input = $(this.FROM_ID2);
        this.filter_from2 = from_input.val();
        if (this.filter_from2) {
            this.filter_from2 = this.dateformat.toRest(this.filter_from2);
        }

        var to_input = $(this.TO_ID2);
        this.filter_to2 = to_input.val();
        if (this.filter_to2) {
            this.filter_to2 = this.dateformat.toRest(this.filter_to2);
        }

        var status_select = $(this.STATUS_ID2);
        this.filter_status2 = status_select.val();

        var keyword_input = $(this.KEYWORD_ID2);
        this.filter_keyword2 = keyword_input.val();
    },
    getItems2: function () {
        var me = this;
        me.getFilter2();

        var params = JSON.stringify({ type: "gl" });
        var entity = JSON.stringify({ startposition: me.page_start2, pagesize: me.page_size2, keyword: me.filter_keyword2, startsaledate1: me.filter_from2, startsaledate2: me.filter_to2 });
        if (me.filter_from2 == "" || me.filter_to2 == "") {
            entity = JSON.stringify({ startposition: me.page_start2, pagesize: me.page_size2, keyword: me.filter_keyword2 });
        }
        var data = { url: '/api/borrowFilesPackageRecords/readAllForPage', params: params, entity: entity };
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log("borrow", result);
                if (result && result.rest_status && result.rest_status == "suc") {
                    me.result = result;
                    me.success2(result);
                }

            },
            error: function (result) {
                if (LOGIN.error(result)) {
                    return;
                }
                alert('获取基金信息失败，请刷新页面.');
            }
        });
    },
    success2: function (result) {
        this.items = JSON.parse(result['rest_result']);
        this.setTable2(this.items);
        this.setPage2(result);
    },
    setTable2: function (items) {
        var table = $("#inout_table");
        table.find("tbody").empty();
        if (table && items) {
            for (var i in items) {

                var row = $("<tr></tr>");
                table.append(row);

                //row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');

                row.append('<td>' + this.filePackages[items[i]["filePackage"].id].fpno + '</td>');
                row.append('<td>' + this.filePackages[items[i]["filePackage"].id].fpname + '</td>');
                row.append('<td>' + this.filePackages[items[i]["filePackage"].id].fptype + '</td>');
                row.append('<td>' + this.filePackages[items[i]["filePackage"].id].fpcode + '</td>');
                row.append('<td>' + this.filePackages[items[i]["filePackage"].id].contractNo + '</td>');

                row.append('<td>' + items[i]["user"].id + '</td>');
                row.append('<td>' + items[i]["borrowTime"] + '</td>');
                row.append('<td>' + items[i]["shouldReturnTime"] + '</td>');
                row.append('<td>' + items[i]["returnTime"] + '</td>');
                row.append('<td>' + items[i]["returnRemark"] + '</td>');

            }
        }

    },
    setPage2: function (response) {
        var _this=this;
        _this.page_start2==0&&$.dom.pager("#table-pager-2",response).onChange(function (param) {
            _this.page_size2=param.pagesize;
            _this.page_start2=param.startposition;
            _this.getItems2(true);
        });
    }
};


var FILEPACK_MAG = {

};