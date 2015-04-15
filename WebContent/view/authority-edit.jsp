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

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击">
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

            <div class="content-box box-toggle" ms-repeat="items" ms-controller="Role" ms-class="content-box-closed:el.close">
                <div class="content-box-header primary-bg">
                    <span class="float-left">{{el.name}}权限</span>

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击" ms-click="toggle(el.id)">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio">
                            <div class="col-md-2 form-label">
                                <label>操作权限：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B"  ms-repeat-op="el.ops">
                                    <input type="checkbox" ms-attr-id="role-op-{{el.id}}-{{op.id}}" ms-duplex-checked="op.checked" ms-change="change" />
                                    <label ms-attr-for="role-op-{{el.id}}-{{op.id}}">{{op.title}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-row form-checkbox-radio">
                            <div class="col-md-2 form-label">
                                <label>字段权限：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat-prop="el.props">
                                    <input type="checkbox" ms-attr-id="role-field-{{el.id}}-{{prop.id}}" ms-duplex-checked="prop.checked" ms-change="change" />
                                    <label ms-attr-for="role-field-{{el.id}}-{{prop.id}}">{{prop.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" ms-click="submit(el.id)">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>
            
            <!-- 菜单权限 -->
            <div class="content-box box-toggle" ms-controller="menuRole">
                <div class="content-box-header primary-bg">
                    <span class="float-left">菜单权限</span>

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10">
                        <div class="form-row form-checkbox-radio" ms-repeat="items">
                            <div class="col-md-2 form-label">
                                <input type="checkbox" ms-attr-id="menu-role-{{el.id}}" ms-duplex-checked="el.checked" data-duplex-changed="check" ms-data-id="el.id" />
                                <label ms-attr-for="menu-role-{{el.id}}">{{el.title}}：</label>
                            </div>
                            <div class="col-md-10">
                                <div class="col-md-3 mrg15B" ms-repeat="el.children">
                                    <input type="checkbox" ms-attr-id="menu-child-role-{{el.id}}" ms-duplex-checked="el.checked" data-duplex-changed="check" ms-data-id="el.parentId" data-one="true" />
                                    <label ms-attr-for="menu-child-role-{{el.id}}">{{el.title}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" ms-click="submit">
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