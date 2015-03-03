<%--suppress XmlDuplicatedId --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/heton-query.css"/>
    <title>合同使用查询/投资档案查询</title>
</head>

<body class="page-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle view-width">
                <div class="content-box-header primary-bg">
                    <span class="float-left">合同使用情况（投资档案）</span> <a href="#"
                                                                    class="float-right icon-separator btn toggle-button"
                                                                    title="查询合同的使用及投资档案的信息"> <i
                        class="glyph-icon icon-toggle icon-chevron-down"></i>
                </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="Search notifications..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button
                                class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button">
                            <span class="button-content">搜索</span>
                        </button>

                    </div>
                </div>
                <div class="content-box-wrapper">
                    <div class="col-md-12 page-bar pad0R">
                        <a href="javascript:;"
                           class="btn large float-left mrg5R ui-state-default"
                           id="page-first"> <i class="glyph-icon icon-arrow-left"></i>
                        </a>

                        <div class="button-group float-left pages-div" id="page-numbers"></div>
                        <a href="javascript:;"
                           class="btn large float-left mrg5L ui-state-default"
                           id="page-last"> <i class="glyph-icon icon-arrow-right"></i>
                        </a>
                    </div>
                    <div class="pad3A mrg5B seach_panel " id="search_panel">
                        <div class="form-row">
                            <div class="form-input col-md-2">
                                <div class="input-append-wrapper">
                                    <div class="input-append bg-gray pad5L pad5R">
                                        <label>合同编号</label>
                                    </div>
                                    <input type="text" placeholder="查询条件" name="" id="">
                                </div>
                            </div>
                            <div class="form-input col-md-2">
                                <div class="input-append-wrapper">
                                    <div class="input-append bg-gray pad5L pad5R">
                                        <label>合同编号</label>
                                    </div>
                                    <input type="text" placeholder="查询条件" name="" id="">
                                </div>
                            </div>
                            <div class="form-input col-md-2">
                                <div class="input-append-wrapper">
                                    <div class="input-append bg-gray pad5L pad5R">
                                        <label>客户名称</label>
                                    </div>
                                    <input type="text" placeholder="查询条件" name="" id="">
                                </div>
                            </div>
                            <div class="form-input col-md-2">
                                <div class="input-append-wrapper">
                                    <div class="input-append bg-gray pad5L pad5R ">
                                        <label>投资日期</label>
                                    </div>
                                    <input type="text" placeholder="查询条件" name="" id="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <table id="payorder-table"
                           class="table table-striped text-center mrg0B"
                           id="filepackage-get-table">
                        <tr>
                            <th></th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Message box  -->
<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
    <div id="jy_panel" style="width: 98%;">
        <div class="text-center" style="height: 80px;">
            <h3 id="jsy_messagebox_msg"></h3>
        </div>
        <div class="text-center">
            <a href="#" class="btn large primary-bg " title=""
               id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
            </a> <a href="#" class="btn large primary-bg " title=""
                    id="jsy_msgbox_yes"><span class="button-content">是</span> </a> <a
                href="#" class="btn large primary-bg " title="" id="jsy_msgbox_no"><span
                class="button-content">否</span> </a> <a href="#"
                                                        class="btn large primary-bg " title=""
                                                        id="jsy_msgbox_cancel"><span
                class="button-content">取消</span> </a>
        </div>
    </div>
</div>
<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
<!-- Message box  -->
<script type="text/javascript" src="../js/datacommon.js"></script>
<script type="text/javascript" src="../js/hetong-query.js"></script>
</body>
</html>