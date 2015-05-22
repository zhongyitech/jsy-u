<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <%--<link rel="stylesheet" type="text/css" href="/css/czjlrz-list.css">--%>
    <title>操作记录日志</title>
    <style type="text/css">
        .report-page p{
            text-indent:2em;
            line-height:2em;
            margin-top:0px;
            margin-bottom:0px;
        }
    </style>
</head>

<body>
<div>

    <textarea id="Template_confirm" class="template">
        <div class="report-page" >
            <p>编号:<span>{T.num}</span></p>
            <p>客户投资确认书</p>
           <p></p>

        </div>
    </textarea>

    <%--<jsp:include page="./navi.jsp"/>--%>
    <textarea id="table-data-template" class="template">
        {#param name=fields value=["czr","czsj","url","method","params","address"]}
        {#param name=start value=$P.callback()+1}
        {#param name=pos value=$P.start}
        <table class="table table-hover table-striped text-center mrg0B" id="view-table">
            <thead>
            <tr>
                <th class="text-center">操作人</th>
                <th class="text-center">操作时间</th>
                <th class="text-center">访问模块</th>
                <th class="text-center">请求方式</th>
                <th class="text-center">请求参数</th>
                <th class="text-center">客户端</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                {#foreach $P.fields as field}
                <td class="text-center">
                    <span class="text-overflow">{$T.field=="czsj"?$.utils.dateFormat($T.item['czsj'],'yyyy-MM-dd hh:mm:ss'):$T.item[$T.field]}</span>
                </td>
                {#/for}
            </tr>
            {#/for}
            </tbody>
        </table>
        <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>
    <div id="show_table">
    </div>
</div>
<script type="text/javascript" src="/js/investmentReport.js"></script>
</body>
</html>