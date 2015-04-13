<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <title>编辑权限</title>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/authority-edit.css">
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle" ms-controller="baseInfo">
                <div class="content-box-header primary-bg">
                    <span class="float-left">角色信息</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="view-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)角色名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" ms-attr-value="name" readonly="readonly">
                            </div>

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)权限:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" ms-attr-value="authority" readonly="readonly">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-box box-toggle" ms-controller="fundRole">
                <div class="content-box-header primary-bg">
                    <span class="float-left">基金权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio" ms-repeat="items">
                            <div class="col-md-2 form-label">
                                <label>{{el.title}}：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat="el.children">
                                    <input type="checkbox" ms-attr-id="fund-role-{{el.id}}" ms-duplex-checked="el.checked"/>
                                    <label ms-attr-for="fund-role-{{el.id}}">{{el.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>

            <div class="content-box box-toggle" ms-controller="customerRole">
                <div class="content-box-header primary-bg">
                    <span class="float-left">客户档案权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio" ms-repeat="items">
                            <div class="col-md-2 form-label">
                                <label>{{el.title}}：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat="el.children">
                                    <input type="checkbox" ms-attr-id="customer-role-{{el.id}}" ms-duplex-checked="el.checked"/>
                                    <label ms-attr-for="customer-role-{{el.id}}">{{el.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>

            <div class="content-box box-toggle" id="investment-view" ms-controller="investmentRole">
                <div class="content-box-header primary-bg">
                    <span class="float-left">投资档案权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio" ms-repeat="items">
                            <div class="col-md-2 form-label">
                                <label>{{el.title}}：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat="el.children">
                                    <input type="checkbox" ms-attr-id="investment-role-{{el.id}}" ms-duplex-checked="el.checked"/>
                                    <label ms-attr-for="investment-role-{{el.id}}">{{el.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>
            <!-- 菜单权限 -->
            <div class="content-box box-toggle" ms-controller="menuRole">
                <div class="content-box-header primary-bg">
                    <span class="float-left">菜单权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio" ms-repeat="items">
                            <div class="col-md-2 form-label">
                                <input type="checkbox" ms-attr-id="menu-role-{{el.id}}" ms-attr-checked="el.checked" ms-change="change(el.id)" />
                                <label ms-attr-for="menu-role-{{el.id}}">{{el.title}}：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat="el.children">
                                    <input type="checkbox" ms-attr-id="menu-child-role-{{el.id}}" ms-attr-checked="el.checked" ms-change="change(el.parentId,el.id)" />
                                    <label ms-attr-for="menu-child-role-{{el.id}}">{{el.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" ms-on-click="submit">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/authority-edit.js"></script>
</body>
</html>