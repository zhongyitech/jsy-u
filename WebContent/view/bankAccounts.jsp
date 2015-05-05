<%--suppress XmlDuplicatedId --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <%--<link rel="stylesheet" type="text/css" href="/cs.css"/>--%>
    <title>银行余额查询</title>
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="table-data-template" class="template">
            {#param name=fields value=["accountName","account","purpose","bankOfDeposit","Balance","CcyCode","AccountStatus"]}
            {#param name=start "
            {#param name=pos value=$P.start}
            <table class="table table-striped text-center mrg0B" id="view-table">
                <thead>
                <tr>
                    <th class="text-center">公司名称</th>
                    <th class="text-center">银行户名</th>
                    <th class="text-center">账户</th>
                    <th class="text-center">用途</th>
                    <th class="text-center">开户行</th>
                    <th class="text-center">可用余额</th>
                    <th class="text-center">账面余额</th>
                    <th class="text-center">币种</th>
                    <th class="text-center">账户状态</th>
                </tr>
                </thead>
                <tbody>
                {#foreach $T as item}
                <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                   <td><span class="text-overflow">{$T.item["accountName"] }</span></td>
                   <td><span class="text-overflow">{$T.item["AccountName"] }</span></td>
                    <td> <span class="text-overflow">{$T.item["account"] }</span></td>
                    <td><span class="text-overflow">{$T.item.purpose.mapName }</span></td>
                    <td><span class="text-overflow">{$T.item["bankOfDeposit"] }</span></td>
                    <td><span class="text-overflow">{$T.item["Balance"] }</span></td>
                    <td><span class="text-overflow">{$T.item["TotalAmount"] }</span></td>
                    <td> <span class="text-overflow">{$T.item["CcyCode"] }</span></td>
                    <td><span class="text-overflow">{$T.item["AccountStatus"] }</span></td>
                </tr>
                {#/for}
                </tbody>
            </table>
            <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">银行余额查询</span> <a href="#"
                                                                class="float-right icon-separator btn toggle-button"
                                                                title="银行交易流水记录"> <i
                        class="glyph-icon icon-toggle icon-chevron-down"></i>
                </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button
                                class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button">
                            <span class="button-content">搜索</span>
                        </button>
                    </div>

                </div>
                <div class="content-box-wrapper">
                    <div id="table-pager" class="page-bar"></div>
                    <div id="table-data"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Message box  -->
<%--<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">--%>
    <%--<div id="jy_panel" style="width: 98%;">--%>
        <%--<div class="text-center" style="height: 80px;">--%>
            <%--<h3 id="jsy_messagebox_msg"></h3>--%>
        <%--</div>--%>
        <%--<div class="text-center">--%>
            <%--<a href="#" class="btn large primary-bg" title=""--%>
               <%--id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>--%>
            <%--</a>--%>
        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>
<%--<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>--%>
<!-- Message box  -->
<script type="text/javascript" src="/js/bankAccounts.js"></script>
</body>
</html>