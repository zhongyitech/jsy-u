<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/department-create.css">
    <title>新增部门</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="department-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">新增部门</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="department-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)部门名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="输入新部门的名称" type="text" id="name" class="deptName">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)所属公司:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="company" name="company" class="company"></select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">职能：</label>
                            </div>
                            <div class="form-input col-md-4">
                            <select id="performance" name="performance" class="performance">
                            </select>
                            </div>
                            <div class="form-label col-md-2">
                                <label for="" class="label-description">上级部门</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="parentDepartment" class="parentDepartment" name="parentDepartment"></select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">描述：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <textarea placeholder="" class="textarea-no-resize" id="description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>

                    <div class="button-pane">
                        <button class="btn-ui btn bg-green  medium float-right mrg10L" id="submit-continue-button"><span
                                class="button-content">保存-继续新增</span></button>
                        <button class="btn-ui btn bg-green  medium float-right mrg10L" id="submit-button"><span
                                class="button-content">保存</span></button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/department-create.js"></script>
</body>
</html>