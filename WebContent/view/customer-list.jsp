<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/customer-list.css">
    <title>客户信息管理</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="table-data-template" class="template">
        {#param name=fields value=["name","credentialsType","credentialsNumber","country","fddbr","telephone","remark","id"]}
        {#param name=start value=$P.callback()+1}
        {#param name=pos value=$P.start}
        <table class="table table-striped text-center mrg0B" id="view-table">
            <thead>
            <tr>
                <%--根据客户权限多加一列操作列--%>
                <th class="text-center">客户名称</th>
                <th class="text-center">证件类型</th>
                <th class="text-center">证件号码</th>
                <th class="text-center">地区</th>
                <th class="text-center">法定代表人</th>
                <th class="text-center">联系电话</th>
                <th class="text-center">备注</th>
                <th class="text-center">详细</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                {#foreach $P.fields as field}
                <td class="text-center">

                    {#if $T.field=='id'}
                    <%--todo:添加一个跳转到详细信息页面的连接 wzs--%>
                    <span class="text-overflow"><a>详细信息</a></span>
                    {#else}
                    <span class="text-overflow">{$T.item[$T.field]}</span>
                    {#/if}
                </td>
                {#/for}
            </tr>
            {#/for}
            </tbody>
        </table>
        <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="customer-list">
                <div class="content-box-header primary-bg">
                    <span class="float-left">修改客户信息(非投资档案关联的客户信息)</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="客户信息修改">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
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
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button"><span class="button-content">搜索</span></button>
                    </div>
                </div>

                <div class="content-box-wrapper">
                    <div id="table-pager" class="page-bar"></div>

                    <div class="table table-striped text-center mrg0B" id="table-data">
                        <%--<thead>--%>
                        <%--<tr>--%>
                            <%--<th class="text-center">证照号码</th>--%>
                            <%--<th class="text-center">客户名称</th>--%>
                            <%--<th class="text-center">身份证地址</th>--%>
                            <%--<th class="text-center">开户行名称</th>--%>
                            <%--<th class="text-center">收益人账号</th>--%>
                            <%--<th class="text-center">联系电话</th>--%>
                            <%--<th class="text-center">E-Mail</th>--%>
                        <%--</tr>--%>
                        <%--</thead>--%>
                        <%--<tbody></tbody>--%>
                    </div>
                    <div CLASS="mrg10T">
                        <a href="./customer-create.jsp" class="btn medium bg-green" title="">
                            <span class="button-content">+ 新客户</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="content-box box-toggle " id="customer_details">
                <div class="content-box-header primary-bg">
                    <span class="float-left">客户详细信息</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="客户信息修改">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                </div>
                <div class="content-box-wrapper">



                </div>

            </div>

        </div>

    </div>


</div>
<script type="text/javascript" src="/js/customer-list.js"></script>
</body>
</html>