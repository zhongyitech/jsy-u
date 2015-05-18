<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/customer-edit.css">
    <title>编辑客户信息</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="customer-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left" id="action_title">-</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="编辑客户信息">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="customer-form">

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)客户名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="输入客户名称" type="text" id="name" class="name">
                            </div>
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)国家（地区）:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="country" name="country">
                                    <option value="中国大陆">中国大陆</option>
                                    <option value="港澳台">港澳台</option>
                                    <option value="其它地区">其它地区</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row" id="customer_select_panel">
                            <div class="form-label col-md-12">
                                <label>选择下列的用户：</label>
                                <span>用户1</span>
                            </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">证件类型:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="cardtype" class="credentialsType">
                                    <option value="身份证" >身份证</option>
                                    <option value="护照">护照</option>
                                    <option value="营业执照">营业执照</option>
                                    <option value="其它">其它</option>
                                </select>
                            </div>

                            <div class="form-label col-md-2">
                                <label class="label-description">(*)证件号码:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="请输入证件号" class="credentialsNumber" type="text" id="cardnumber">
                            </div>
                        </div>
                        <div class="form-row hide" id="fddr-panel">
                            <div class="form-label col-md-2">
                                <label class="label-description">法定代表人:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="法定代表人" type="text" id="fddbr" class="fddbr" name="fddbr">
                            </div>

                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">住址（证件地址）:</label>
                            </div>
                            <div class="form-input col-md-10">
                                <input placeholder="自然人填身份证地址，机构填写营业执照注册地址" type="text" id="sfzdz">
                            </div>
                        </div>


                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)开户行名称:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="请输入开户行银行" type="text" id="bankname" class="khh">
                            </div>
                            <div class="form-label col-md-2 ">
                                <label class="label-description">(*)收益人账号:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="请输入银行账号" type="text" id="banknumber" class="yhzh">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)联系电话:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="phone" class="telephone">
                            </div>
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)邮政编码:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="zip" class="postalcode">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)E-Mail:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="email" class="email">
                            </div>
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)通讯地址:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="" type="text" id="address" class="callAddress">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">附件:</label>
                            </div>

                            <div class="form-input col-md-10">
                                <input id="attachment" name="attachment" class="input-file" type="file" multiple="multiple">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2"></div>
                            <div class="form-input col-md-10" id="attachment-img"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">备注信息:</label>
                            </div>
                            <div class="form-input col-md-10">
                                <textarea placeholder="请输入备注信息" class="textarea-no-resize" id="remark"></textarea>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">同步添加客户信息</label>
                            </div>
                            <div class="form-input col-md-10">
                                <input type="checkbox" checked="checked" id="syncCustomer" name="syncCustomer">
                            </div>
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span
                            class="button-content">提交</span></button>
                </div>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript" src="/js/customer-edit.js"></script>
</body>
</html>