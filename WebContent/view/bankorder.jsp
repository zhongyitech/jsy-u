<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <title>凭证数据查询</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="table-data-template" class="template">
            {#param name=fields value=["createDate","summary","subjectName","borrowAmount","lendAmount","transaction","company"]}
            {#param name=start value=$P.callback()+1}
            {#param name=pos value=$P.start}
            <table class="table table-striped text-center mrg0B" id="view-table">
                <thead>
                    <tr>
                        <th class="text-center">生成时间</th>
                        <th class="text-center">摘要</th>
                        <th class="text-center">科目名称</th>
                        <th class="text-center">借方金额</th>
                        <th class="text-center">贷方金额</th>
                        <th class="text-center">交易流水号</th>
                        <th class="text-center">账套(公司)</th>
                    </tr>
                </thead>
                <tbody>
                {#foreach $T as item}
                    <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                        {#foreach $P.fields as field}
                        <td class="text-center">
                            <span class="text-overflow">{$T.item[$T.field]}</span>
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
            <div class="content-box box-toggle">
                <div class="content-box-header primary-bg">
                    <span class="float-left">凭证数据查询</span>
                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="操作记录日志">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button">
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
<script type="text/javascript" src="/js/bankorder.js"></script>
</body>
</html>