<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/department-list.css">
    <title>部门管理</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="department-list">
                <div class="content-box-header primary-bg">
                    <span class="float-left">部门管理</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
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

                    <table class="table table-hover table-striped text-center mrg0B" id="view-table">
                        <thead>
                            <tr>
                                <th class="text-center"><input type="checkbox" name="checkbox"></th>
                                <th class="text-center">部门名称</th>
                                <th class="text-center">上级部门</th>
                                <th class="text-center">所属公司</th>
                                <th class="text-center">职能</th>
                                <th class="text-center">描述</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div class="mrg10T">
                        <a href="./department-create.jsp" class="btn medium bg-green" title="">
                            <span class="button-content">+ 新部门</span>
                        </a>
                    </div>
                </div>

                <div class="button-pane">
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                            id="remove-button"><span class="button-content">删除选中行</span></button>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/department-list.js"></script>
</body>
</html>