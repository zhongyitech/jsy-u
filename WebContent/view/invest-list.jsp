<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <%--<link rel="stylesheet" type="text/css" href="/css/invest-list.css"/>--%>
    <title>客户投资信息管理</title>
</head>
<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">客户投资档案浏览</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="投资档案列表">
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
                                id="keyword-button">
                            <span class="button-content">搜索</span></button>
                    </div>

                </div>
                <div class="content-box-wrapper">
                    <div id="table-pager" class="page-bar"></div>
                    <table class="table table-hover table-striped text-center" id="investment-table">
                        <thead>
                            <tr>
                                <th><span class="text-overflow">认购人</span></th>
                                <th><span class="text-overflow">基金名称</span></th>
                                <th width="100px"><span class="">档案编号</span></th>
                                <th width="100px;"><span class="text-overflow">合同编号</span></th>
                                <th width="75px"><span class="text-overflow">认购日期</span></th>
                                <th width="70px"><span class="text-overflow">认购金额</span></th>
                                <th width="60px;"><span class="text-overflow">认购期限</span></th>
                                <th width="60px"><span class="text-overflow">理财经理</span></th>
                                <th><span class="text-overflow">地区</span></th>
                                <th width="50px"><span class="text-overflow">年收益率</span></th>
                                <th width="60px"><span class="text-overflow">付息方式</span></th>
                                <th width="75px"><span class="text-overflow">到期日期</span></th>
                                <th><span class="text-overflow">委托情况</span></th>
                                <th width="70px"><span class="text-overflow">已付利息</span></th>
                                <th width="70px"><span class="text-overflow">已付本金</span></th>
                                <%--<th><span class="text-overflow">操作</span></th>--%>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/invest-list.js"></script>
<script type="text/javascript" src="/js/EnumCommon.js"></script>
</body>
</html>