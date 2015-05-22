<%--suppress XmlDuplicatedId --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/bankingpaymentorder.css"/>
    <title>银行付款单</title>
</head>
<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="table-data-template" class="template">
        {#param name=fields value=["fundName","contractNum","customerName","yfk","khh","zh","fpe","zfsj","yfsj","status","frontLogNo","payStatus"]}
        {#param name=start value=$P.callback()+1}
        {#param name=pos value=$P.start}
        <table class="table table-hover table-striped text-center mrg0B" id="view-table">
            <thead>
            <tr>
                <th class="text-center">基金名称</th>
                <th class="text-center">合同编号</th>
                <th class="text-center">客户名称</th>
                <th class="text-center">应付款</th>
                <th class="text-center">开户行</th>
                <th class="text-center">账号</th>
                <th class="text-center">发票额</th>
                <th class="text-center">要求支付时间</th>
                <th class="text-center">支付时间</th>
                <th class="text-center">兑付状态</th>
                <th class="text-center">交易流水号</th>
                <th class="text-center">交易状态</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                {#foreach $P.fields as field}
                <td class="text-center">
                    <span class="text-overflow">{format($T.item[$T.field],$T.field)}</span>
                </td>
                {#/for}
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
                    <span class="float-left">侍款单记录</span>
                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="侍款单记录">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeHolder="关键字搜索..."
                                           class="radius-top-left-10 radius-bottom-left-10 keyword-input"
                                           id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-10 radius-bottom-right-10" id="keyword-button">
                            <span class="button-content">搜索</span>
                        </button>
                        <button class="btn large medium float-left keyword-button radius-all-10 mrg10L">
                            <span class="button-content">高级</span>
                        </button>
                    </div>
                </div>
                <div class="content-box-wrapper">
                    <div class="pad3A mrg5B seach_panel clearfix" id="search_panel"></div>
                    <div id="table-pager" class="page-bar"></div>
                    <table id="table-data" class="table table-striped text-center mrg0B" >
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
<script type="text/javascript" src="/js/datacommon.js"></script>
<script type="text/javascript" src="/js/bankingpaymentorder.js"></script>
</body>
</html>