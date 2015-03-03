<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/company-list.css">
    <title>公司管理</title>
</head>

<body class="page-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle view-width" id="company-list">
                <div class="content-box-header primary-bg">
                    <span class="float-left">公司管理</span>

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
                        <button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button"><span class="button-content">搜索</span></button>
                    </div>
                </div>

                <div class="content-box-wrapper">
                    <div class="col-md-12 page-bar pad0R">
                        <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
                            <i class="glyph-icon icon-arrow-left"></i>
                        </a>

                        <div class="button-group float-left pages-div" id="page-list"></div>
                        <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
                            <i class="glyph-icon icon-arrow-right"></i>
                        </a>
                    </div>

                    <table class="table table-striped text-center mrg0B" id="view-table">
                        <thead>
                        <tr>
                            <th class="text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="text-center">公司名称</th>
                            <th class="text-center">公司简称</th>
                            <th class="text-center">公司类型</th>
                            <th class="text-center">注册地址</th>
                            <th class="text-center">基金</th>
                            <th class="text-center">法人代表</th>
                            <th class="text-center">省</th>
                            <th class="text-center">市</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="button-pane">
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                            id="remove-button"><span class="button-content">删除选中行</span></button>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../js/company-list.js"></script>
</body>
</html>