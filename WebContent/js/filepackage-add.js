$(document).ready(function () {
    VIEWDATA.fund = FUND;
    VIEWDATA.file = FILE;
    TypeConfig.ini(true);
    RoomConfig.ini(true);
    VIEWDATA.init(true);
});

var VIEWDATA = {
    fund: {},
    file: {},

    init: function (sync) {
        this.init_view();
        this.init_event();
    },

    init_view: function () {

        var items = TypeConfig.getItems();
        $.each(items, function (index, value) {
            if (value) {
                console.log("value:", value);
                $("#fptype").append("<option value=" + value.id + ">" + value.mapName + "</option>");
            }
        });

        var items = RoomConfig.getItems();
        $.each(items, function (index, value) {
            if (value)
                $("#saveposition").append("<option value=" + value.id + ">" + value.mapName + "</option>");
        });

        $("#transferDate").val(DATEFORMAT.toDate(new Date()));

    },

    init_event: function () {
        var me = this;
        $("#add-filepackage").click(function () {
            me.add_filePackage(false);
        });

        $("#continue-add-filepackage").click(function () {
            me.add_filePackage(true);
        });

        //合同编号 变更事件：根据档案类型进行数据获取和设置
        $("#contractNum").focusout(function (e) {
            var contractNum = $("#contractNum").val();
            me.getDataOfHtbh(contractNum);
        });

        $("input[id^=invest-attachment]").change(function () {
            me.attach_change_event(this);
        });

        $("#add_file").click(function () {
            var index = $('#fileupdate tr').length;
            var input_invest = $("<input id='invest-attachment" + index + "' class='input-file' name='attachment' type='file'>");
            var td = $("<td class='text-left'>");
            var tr = $("<tr>");
            tr.append(td);
            td.append(input_invest)
            $('#fileupdate tr:last').after(tr);
            input_invest.change(function () {
                me.attach_change_event(input_invest);
            });
        });

        $('#fundName_show').autocomplete(
            {
                serviceUrl: '../rest/auto/get',
                type: 'POST',
                params: {
                    url: '/api/fund/nameLike'
                },
                paramName: 'params',
                onSelect: function (suggestion) {
                    //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    $("#fundName").val(suggestion.data);
                },
                transformResult: function (response) {
                    //clear old value
                    $("#fundName_show").val("");
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
        $('#transfer').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/user/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#transferid").val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $("#transferid").val("");
                if (!response || response == '') {
                    return {
                        "query": "Unit",
                        "suggestions": []
                    };
                } else {
                    var result = JSON.parse(response).rest_result;
                    var suggestions = (result.suggestions);
                    result.suggestions = suggestions;
                    return result;
                }
            }
        });

        $("#projectName").autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/project/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#projectName").val(suggestion.value);
            },
            transformResult: function (response) {
                //clear old value
                $("#projectName").val("");
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
    },
    add_filePackage: function (isContinue) {
        var fpname = $("#fpname").val();//档案包名称
        var fpno = $("#fpno").val(); //档案包编号
        var fpcode = $("#fpcode").val();//档案条码
        var contractNum = $("#contractNum").val();//合同编号
        var contractNo = $("#contractNo").val();//合同名称
        var fundName = $("#fundName_show").val(); //基金名称
        var projectName = $("#projectName").val(); //项目名称
        var signedPartner = $("#signedPartner").val(); //签约方
        var signedDate = $("#signedDate").val(); //签约日期
        var transfer = $("#transferid").val(); //移交人
        var transferDate = $("#transferDate").val(); //移交日期
        var fptype = $("#fptype").val(); //档案包类型
        var saveposition = $("#saveposition").val(); //档案存放位置 //档案室
        var cabinetno = $("#cabinetno").val(); //档案柜编号
        var description = $("#description").val();//描述
        if (!fpcode) {
            alert("请输入档案条码");
            return;
        }
        if (!fpno) {
            alert("请输入档案号");
            return;
        }
        if (!fpname) {
            alert("请输入档案包名称");
            return;
        }

        if (!fptype) {
            alert("请输入档案类型");
            return;
        }
        if (!contractNum) {
            alert("请输入合同编号");
            return;
        }
        if (!fundName) {
            fundName = $('#fundName_show').val();
            if (!fundName) {
                alert("请输入正确的合同编号");
                return;
            }
        }
        if (!contractNo) {
            alert("请输入合同名称");
            return;
        }
        if (!projectName) {
            alert("请输入项目名称");
            return;
        }
        if (!signedPartner) {
            alert("请输入签约方");
            return;
        }
        if (!signedDate) {
            alert("请输入签约日期");
            return;
        }
        if (!transfer) {
            alert("请输入移交人，或者确认移交人存在");
            return;
        }
        if (!transferDate) {
            alert("请输入移交日期");
            return;
        }
        if (!saveposition) {
            alert("请输入档案室");
            return;
        }
        if (!cabinetno) {
            alert("请输入档案柜编号");
            return;
        }
        if (!description) {
            alert("请输入备注");
            return;
        }

        var filepackage = {
            fpname: fpname,
            fpno: fpno,
            fpcode: fpcode,
            contractNum: contractNum,
            contractNo: contractNo,
            fundName: fundName,
            projectName: projectName,
            signedPartner: signedPartner,

            signedDate: DATEFORMAT.toRest(signedDate),
            transfer: transfer,
            transferDate: DATEFORMAT.toRest(transferDate),

            fptype: fptype,
            saveposition: saveposition,
            cabinetno: cabinetno,
            description: description,
            information: "empty"
        }

        var attachments = [];
        $("input[id^=invest-filepath]").each(function () {
            var index = $(this).attr("id").replace("invest-filepath", "");

            attachments.push({"filePath": $(this).val(), "fileName": $("#invest-filename" + index).val()});
        });
        filepackage.uploadFiles = attachments;

        this.post_request(filepackage, isContinue);
    },
    attach_change_event: function (input_file) {
        var index = $(input_file).attr("id").replace("invest-attachment", "");

        var fileId = "#" + $(input_file).attr("id");
        $.utils.upload({
            files: fileId,
            success: function (response) {
                var attachments = response.rest_result;
                var attachment_src = '../rest/file/download?path=' + attachments[0][this.file.PATH_KEY];

                var attach_img = $("#invest-attachment-img" + index);
                if (attach_img.size() > 0) {
                    attach_img.attr("src", attachment_src);
                    $("#invest-img-key" + index).val(attachments[0][this.file.PATH_KEY]);
                } else {
                    console.log(attachments[0]);
                    $("#pics").append("<img class='attachment-img' id='invest-attachment-img" + index + "' alt='' src='" + attachment_src + "' style='width:100px;'>");
                    $("#pics").append("<input type='hidden' value='" + attachments[0][this.file.PATH_KEY] + "' id='invest-filepath" + index + "' >");
                    $("#pics").append("<input type='hidden' value='" + attachments[0]["fileName"] + "' id='invest-filename" + index + "' >");
                }
            }
        });


    },
    getDataOfHtbh: function (htbh) {
        var me = this;
        $.io.get({url: '/api/investmentArchives/contractNumIsUse', params: {num: htbh}})
            .success(function (result) {
                if (!$.io.get(true, {url: '/api/filePackage/exist', params: {num: htbh}}).data()) {
                    me.resetDefaultDate(result);
                }else{
                    me.resetDefaultDate(null);
                    $.message.error("使用该合同编号的档案已经入库!")
                }
            }).error(function (error) {
                alert("请求数据出错!" + error.msg);
            });
    },
    //设置界面数据
    resetDefaultDate: function (result) {
        if (result) {
            var fund = this.fund.get(result.fund.id)
            $("#fundName_show").val(fund.fundName);
            $("#fundName").val(fund.id);
            $("#signedDate").val(DATEFORMAT.toDate(result.rgrq));
            $("#contractNum").removeClass('valid_error');

        } else {
            $("#contractNum").addClass('valid_error');

            $("#contractNum").val('');
            $("#contractNum").attr("placeholder", "合同编号没有使用")
            $("#fundName_show").val("");
            $("#fundName").val("");
            $("#signedDate").val("");
        }
    },
    post_request: function (filepackage, isContinue) {
        console.log("filepackage:", JSON.stringify(filepackage));

        var me = this;
        var data = {url: '/api/filePackage', entity: JSON.stringify(filepackage)};
        console.log(data);
        var me = this;

        $.io.post(true, data)
            .success(function (result) {
                me.result = result;
                if (isContinue) {
                    window.location.href = "filepackage-add.jsp";
                } else {
                    window.location.href = "filepackage-list.jsp";
                }
            }).error(function (error) {
                alert(error.msg);
            });

//        $.ajax({
//            type: 'post',
//            url: '../rest/item/post',
//            data: data,
//            dataType: 'json',
//            async: false,
//            success: function (result) {
//                console.log(result);
//                if (result && result.rest_status && result.rest_status == "suc") {
//                    me.result = result;
//                    console.log("relaod page...");
//                    if (isContinue) {
//                        window.location.href = "filepackage-add.jsp";
//                    } else {
//                        window.location.href = "filepackage-list.jsp";
//                    }
//                }
//            },
//            error: function (result) {
//                isAllSuc = false;
//                if (LOGIN.error(result)) {
//                    return;
//                }
//                alert('提交时错误.');
//            }
//        });
    }
}