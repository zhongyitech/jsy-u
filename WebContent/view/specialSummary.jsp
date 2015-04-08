<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/specialSummary.css"/>
    <title>特殊申请汇总查询</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
		<textarea id="table-data-template" class="template">
            {#param name=fields value=["","status","fundName","htbh","sqbm","sqr","sqrq","type","customer","bz"]}
            {#param name=start value=$P.callback()+1}
            {#param name=pos value=$P.start}
            <table class="table table-striped text-center mrg0B" id="view-table">
                <thead>
                <tr>
                    <th style="width: 10px;"></th>
                    <th class="text-center"><span class="">状态</span></th>
                    <th class="text-center"><span class="">基金名称</span></th>
                    <th class="text-center"><span class="">合同编号</span></th>
                    <th class="text-center"><span class="">申请部门</span></th>
                    <th class="text-center"><span class="">申请人</span></th>
                    <th class="text-center"><span class="">申请日期</span></th>
                    <th class="text-center"><span class="">特殊表类型</span></th>
                    <th class="text-center"><span class="">客户名称</span></th>
                    <th class="text-center"><span class="">备注</span></th>
                </tr>
                </thead>
                <tbody>
                {#foreach $T as item}
                <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                    <%--{#foreach $P.fields as field}--%>
                    <td><span class="text-overflow"></span></td>
                    <td><span class="text-overflow">{$T.item["status"]}</span></td>
                    <td><span class="text-overflow">{$T.item["fundName"]}</span></td>
                    <td><span class="text-overflow">{$T.item["htbh"]}</span></td>
                    <td><span class="text-overflow">{$T.item["sqbm"]}</span></td>
                    <td><span class="text-overflow">{$T.item["sqr"]}</span></td>
                    <td><span class="text-overflow">{$T.item["sqrq"]}</span></td>
                    <td><span class="text-overflow">{$T.item["type"]}</span></td>
                    <td><span class="text-overflow">{$T.item["customer"]}</span></td>
                    <td><span class="text-overflow">{ ($T.item["bz"] || "")}</span></td>
                    <%--{#/for}--%>
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
                    <span class="float-left">特殊申请单申请记录</span> <a href="#"
                                                                 class="float-right icon-separator btn toggle-button"
                                                                 title="最近领用记录"> <i
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
    <!-- Message box  -->
    <div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
        <div id="jy_panel" style="width: 98%;">
            <div class="text-center" style="height: 80px;">
                <h3 id="jsy_messagebox_msg"></h3>
            </div>
            <div class="text-center">
                <a href="#" class="btn large primary-bg" title=""
                   id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
                </a>
            </div>
        </div>
    </div>
    <div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
    <!-- Message box  -->
    <script type="text/javascript" src="/js/specialSummary.js"></script>
</body>
</html