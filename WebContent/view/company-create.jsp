<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/company-create.css">
    <title>新增公司</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="company-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">新增公司</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="company-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)公司名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="name">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)公司简称:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="nickname">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)联系电话:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="phone">
                            </div>

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)传真：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input class="" placeholder="必填" type="text" id="fax">
                            </div>
                        </div>


                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)省：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="sheng">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)市:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="city">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)区/县：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="xian">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)状态:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="status">
                            </div>
                        </div>
                        <div class="form-row">

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)成立日期：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input class="tcal" placeholder="必填" type="text" id="found">
                            </div>
                            <div class="form-label col-md-2">
                                <label for="" class="label-description">总公司:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="parent-input"></select>
                            </div>

                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)注册地址:</label>
                            </div>
                            <div class="form-input col-md-10">
                                <input placeholder="必填" type="text" id="address">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)公司类型：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="type"></select>
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)协议模板:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="template">
                                    <option value=""></option>
                                    <option value="0">单GP</option>
                                    <option value="1">双GP</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="" class="label-description" id="frdb-label">法人代表:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="frdb" disabled="disabled">
                            </div>
                            <div class="form-label col-md-2">
                                <label class="label-description" id="fund-label">基金：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="fund" disabled="disabled"></select>
                            </div>


                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="" class="label-description" id="partner-label">合伙人:</label>
                            </div>

                            <div class="form-input col-md-4">
                                <div class="input-append-wrapper input-append-right">
                                    <div class="input-append bg-green pointer disabled" id="partner-button"><i
                                            class="glyph-icon icon-edit"></i></div>
                                    <div class="append-right">
                                        <input class="text-overflow" type="text" id="partner" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">负责人:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="assigner" disabled="disabled">
                            </div>
                        </div>


                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)公司描述：</label>
                            </div>

                            <div class="form-input col-md-10">
                                <textarea placeholder="" class="textarea-no-resize" id="description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>


                </div>

                <div class="button-pane" id="menu">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span
                            class="button-content">提交</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L partner-button hide"
                            id="partner-button"><span class="button-content">合伙人</span></button>
                </div>

            </div>

            <div class="hide" id="partner-dialog" title="合伙人">
                <div class="content-box mrg0B" id="partner-view">
                    <table class="table text-center mrg0B" id="view-table">
                        <thead class="primary-bg">
                        <tr>
                            <th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="primary-bg text-center">合伙人(*)</th>
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

            <div class="content-box box-toggle " id="yhzh-view">
                <h3 class="content-box-header primary-bg">
                    <span class="float-left">银行账户</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </h3>

                <div class="content-box-wrapper">
                    <table class="table text-center mrg0B" id="view-table">
                        <thead>
                        <tr>
                            <th class="text-center"><span class="text-overflow"><input type="checkbox" name="checkbox"></span>
                            </th>
                            <th class="text-center"><span class="text-overflow">(*)账号</span></th>
                            <th class="text-center"><span class="text-overflow">(*)户名</span></th>
                            <th class="text-center"><span class="text-overflow">(*)银行名称</span></th>
                            <th class="text-center"><span class="text-overflow">(*)开户行</span></th>
                            <th class="text-center"><span class="text-overflow">(*)是否默认账户</span></th>
                            <th class="text-center"><span class="text-overflow">(*)用途</span></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="button-pane">
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                            id="remove-button"><span class="button-content">删除选中行</span></button>
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="add-button">
                        <span class="button-content">增加一行</span></button>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../js/company-create.js"></script>
</body>
</html>