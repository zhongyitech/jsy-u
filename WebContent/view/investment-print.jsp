<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/investment-print.css">
    <title>打印投资确认书</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">打印投资确认书</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="最打印投资确认书">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="搜素关键字..."
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
                    <table class="table table-hover table-striped text-center mrg0B" id="investment-table">
                        <thead>
                        <tr>
                            <th class="text-center"><input id="checkbox-selector" type="checkbox" name="checkbox"></th>
                            <th class="text-center"><span class="text-overflow">合同编号</span></th>
                            <th class="text-center"><span class="text-overflow">基金名称</span></th>
                            <th class="text-center"><span class="text-overflow">客户名称</span></th>
                            <th class="text-center"><span class="text-overflow">认购日期</span></th>
                            <th class="text-center"><span class="text-overflow">投资金额</span></th>
                            <th class="text-center"><span class="text-overflow">收益率</span></th>
                            <th class="text-center"><span class="text-overflow">投资期限</span></th>
                            <th class="text-center"><span class="text-overflow">付息方式</span></th>
                            <th class="text-center"><span class="text-overflow">最近打印日期</span></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="print-button"><span
                            class="button-content">打印选择的确认书</span></button>
                </div>
            </div>

            <div id="print-list"></div>

        </div>

    </div>

</div>
<script type="text/javascript" src="/js/investment-print.js"></script>
</body>
</html>