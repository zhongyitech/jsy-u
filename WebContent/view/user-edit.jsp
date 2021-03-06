<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/user-edit.css">
    <script type="text/javascript" src="/js/user-edit.js"></script>
    <script type="text/javascript" src="/js/datacommon.js"></script>
    <title>修改用户信息</title>
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="user-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left" >修改用户信息</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="user-form">

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label>基本信息</label>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)账号（登录名）：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <label id="account"></label>
                            </div>

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)密码：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="password" id="password">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)用户名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="输入名称" type="text" id="name">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)部门:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="department"></select>
                            </div>

                        </div>
                        <div class="form-row">

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)是否启用：</label>
                            </div>

                            <div class="form-input col-md-4">
                                <select id="enabled">
                                    <option value="true">启用</option>
                                    <option value="false">禁用</option>
                                </select>
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description" id="role-label">职务:</label>
                            </div>

                            <div class="form-input col-md-4">
                                <div class="input-append-wrapper input-append-right">
                                    <div class="input-append bg-green pointer" id="role-button"><i
                                            class="glyph-icon icon-edit"></i></div>
                                    <div class="append-right">
                                        <input class="text-overflow" type="text" id="role-input" disabled>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)邮件：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="email">
                            </div>

                        </div>

                        <%--<div class="form-row">--%>
                            <%--<div class="form-label col-md-2">--%>
                                <%--<label>银行卡信息</label>--%>
                            <%--</div>--%>
                        <%--</div>--%>

                        <%--<div class="form-row">--%>
                            <%--<div class="form-label col-md-2">--%>
                                <%--<label for="" class="label-description">收款人:</label>--%>
                            <%--</div>--%>

                            <%--<div class="form-input col-md-4">--%>
                                <%--<input placeholder="" type="text" id="skr">--%>
                            <%--</div>--%>

                            <%--<div class="form-label col-md-2">--%>
                                <%--<label for="" class="label-description">银行账号:</label>--%>
                            <%--</div><div class="form-input col-md-4">--%>
                            <%--<input placeholder="" type="text" id="yhzh">--%>
                        <%--</div>--%>
                        <%--</div>--%>

                        <%--<div class="form-row">--%>
                            <%--<div class="form-label col-md-2">--%>
                                <%--<label for="" class="label-description">开户行:</label>--%>
                            <%--</div>--%>

                            <%--<div class="form-input col-md-10">--%>
                                <%--<input placeholder="" type="text" id="khh">--%>
                            <%--</div>--%>
                        <%--</div>--%>

                        <%--<div class="form-row hide" >--%>
                            <%--<table class="table table-hover table-striped text-center mrg0B form-input" id="bankaccount_table">--%>
                                <%--<tr>--%>
                                    <%--<th class="text-center"><span>账号</span></th>--%>
                                    <%--<th class="text-center"><span>户名</span></th>--%>
                                    <%--<th class="text-center"><span>开户行</span></th>--%>
                                    <%--<th class="text-center"><span>银行名称</span></th>--%>
                                <%--</tr>--%>
                                <%--<tr>--%>
                                    <%--<td>ff</td>--%>
                                    <%--<td>df</td>--%>
                                    <%--<td>dsf</td>--%>
                                    <%--<td>da</td>--%>
                                <%--</tr>--%>
                            <%--</table>--%>
                            <%--<div class="text-right mrg5T">--%>
                                <%--<button type="button" class="btn-ui btn primary large medium mrg10L"--%>
                                        <%--id="rowadd">--%>
                                    <%--<span class="button-content">添加</span>--%>
                                <%--</button>--%>
                                <%--<button type="button" class="btn-ui btn primary large medium mrg10L"--%>
                                        <%--id="rowdel">--%>
                                    <%--<span class="button-content">删除</span>--%>
                                <%--</button>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    </div>

                    <div style="clear:both;"></div>

                </div>

                <div class="button-pane" id="menu">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span
                            class="button-content">提交</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L partner-button"
                            id="role-dialog-button"><span class="button-content">角色</span></button>
                </div>

            </div>

            <div class="hide" id="role-dialog" title="编辑角色">
                <div class="content-box mrg0B" id="role-view">
                    <table class="table table-hover text-center mrg0B" id="view-table">
                        <thead class="primary-bg">
                        <tr>
                            <th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="primary-bg text-center">(*)角色</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="button-pane">
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="save-button"><span
                                class="button-content">保存</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="remove-button"><span
                                class="button-content">删除选中行</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="add-button"><span
                                class="button-content">增加一行</span></button>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
</body>
</html>