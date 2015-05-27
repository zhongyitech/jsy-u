<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/customer-list.css">
    <title>客户信息管理</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="table-data-template" class="template">
        {#param name=fields value=["name","credentialsType","credentialsNumber","country","fddbr","phone","remark","id"]}
        {#param name=start value=$P.callback()+1}
        {#param name=pos value=$P.start}
        <table class="table table-hover table-striped text-center mrg0B" id="view-table">
            <thead>
            <tr>
                <%--根据客户权限多加一列操作列--%>
                <th class="text-center">客户名称</th>
                <th class="text-center">证件类型</th>
                <th class="text-center">证件号码</th>
                <th class="text-center">地区</th>
                <th class="text-center">法定代表人</th>
                <th class="text-center">联系电话</th>
                <th class="text-center">备注</th>
                <th class="text-center">详细</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                <td><span class="text-overflow">{$T.item["name"]}</span></td>
                <td><span class="text-overflow">{$T.item["credentialsType"]}</span></td>
                <td><span class="text-overflow">{$T.item["credentialsNumber"]}</span></td>
                <td><span class="text-overflow">{$T.item["country"]}</span></td>
                <td><span class="text-overflow">{ ($T.item["fddbr"] || '-')}</span></td>
                <td><span class="text-overflow">{$T.item["phone"]}</span></td>
                <td><span class="text-overflow">{$T.item["remark"]}</span></td>
                <td><span class="text-overflow"><button class="detail-btn" data-itemid="{$T.item$index}">编辑</button>
                <button class="del-btn" data-itemid="{$T.item$index}">删除</button></span></td>
            </tr>
            {#/for}
            </tbody>
        </table>
        <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>
    <textarea id="banks-data-template" class="template">
        <table class="table table-hover table-striped text-center mrg0B" id="bank-table">
            <thead>
            <tr>
                <%--根据客户权限多加一列操作列--%>
                <th class="text-center">开户行</th>
                <th class="text-center">户名</th>
                <th class="text-center">账号</th>
                <th class="text-center">是否默认账户</th>
                <th class="text-center">&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}">
                <td class="form-input"><span><input name="bankOfDeposit" value="{$T.item['bankOfDeposit']}"/></span>
                </td>
                <td class="form-input"><span><input name="accountName"
                                                    value="{$T.item['accountName']}"/></span></td>
                <td class="form-input"><span><input name="account" value="{$T.item['account']}"/></span></td>
                <%--<td><span ><input name="defaultAccount" value="{$T.item['defaultAccount']}" /></span></td>--%>
                <td><span><input type="radio" name="defaultAccount"
                                 {$T.item["defaultAccount"]==true?'checked':''} /></span></td>
                <td><span class="text-overflow"><button class="bankdel-btn" data-itemid="{$T.item$index}">删除
                </button></span></td>
            </tr>
            {#/for}
            </tbody>
        </table>
        <div class="mrg3T">
            <button class="btn medium bg-green" id="bank-new-row">
                <span class="button-content"> + </span>
            </button>
        </div>
    </textarea>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle " id="customer-list">
                <div class="content-box-header primary-bg">
                    <span class="float-left">修改客户信息(非投资档案关联的客户信息)</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="客户信息修改">
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

                    <div class="table table-striped text-center mrg0B" id="table-data">
                        <%--<thead>--%>
                        <%--<tr>--%>
                        <%--<th class="text-center">证照号码</th>--%>
                        <%--<th class="text-center">客户名称</th>--%>
                        <%--<th class="text-center">身份证地址</th>--%>
                        <%--<th class="text-center">开户行名称</th>--%>
                        <%--<th class="text-center">收益人账号</th>--%>
                        <%--<th class="text-center">联系电话</th>--%>
                        <%--<th class="text-center">E-Mail</th>--%>
                        <%--</tr>--%>
                        <%--</thead>--%>
                        <%--<tbody></tbody>--%>
                    </div>
                    <div CLASS="mrg10T">
                        <button class="btn medium bg-green" title="">
                            <span class="button-content" id="user-new">+ 新客户</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="content-box box-toggle " id="customer_details">
                <div class="content-box-header primary-bg">
                    <span class="float-left" id="action_name"></span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="客户信息修改">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                </div>
                <div class="content-box-wrapper pad10A hide" id="userinfo">
                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label class="label-description">客户名称：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="输入客户名称" type="text" id="name" name="name" class="name">
                            <input type="hidden" name="customerId" id="customerId" value="-1"/>
                        </div>

                        <div class="form-label col-md-2">
                            <label for="" class="label-description">国家（地区）:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <select id="country" name="country" class="country">
                                <option value="中国大陆">中国大陆</option>
                                <option value="港澳台">港澳台</option>
                                <option value="其它地区">其它地区</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">证件类型:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <select id="cardtype" class="credentialsType" name="credentialsType">
                                <option value="身份证">身份证</option>
                                <option value="护照">护照</option>
                                <option value="营业执照">营业执照</option>
                            </select>
                        </div>

                        <div class="form-label col-md-2">
                            <label for="" class="label-description">(*)证件号码:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="请输入证件号" class="credentialsNumber" type="text" id="cardnumber"
                                   name="credentialsNumber">
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
                            <label for="" class="label-description">住址:</label>
                        </div>
                        <div class="form-input col-md-10">
                            <input placeholder="自然人填身份证地址，机构填写营业执照注册地址" type="text" id="sfzdz" class="credentialsAddr"
                                   name="credentialsAddr">
                        </div>
                    </div>

                    <%--<div class="form-row">--%>
                    <%--<div class="form-label col-md-2">--%>
                    <%--<label for="" class="label-description">开户行名称:</label>--%>
                    <%--</div>--%>
                    <%--<div class="form-input col-md-4">--%>
                    <%--<input placeholder="请输入开户行银行" type="text" id="bankname" class="khh" name="khh">--%>
                    <%--</div>--%>
                    <%--<div class="form-label col-md-2 ">--%>
                    <%--<label for="" class="label-description">收益人账号:</label>--%>
                    <%--</div>--%>
                    <%--<div class="form-input col-md-4">--%>
                    <%--<input placeholder="请输入银行账号" type="text" id="banknumber" class="yhzh" name="yhzh">--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">联系电话:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="" type="text" id="phone" class="phone" name="phone">
                        </div>
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">邮政编码:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="" type="text" id="zip" class="postalcode" name="postalcode">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">E-Mail:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="" type="text" id="email" class="email" name="email">
                        </div>
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">通讯地址:</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input placeholder="" type="text" id="address" class="callAddress" name="callAddress">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label for="" class="label-description">附件:</label>
                        </div>

                        <div class="form-input col-md-10">
                            <input id="attachment" class="input-file" type="file" multiple="multiple">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class=" col-md-6">
                            <label for="" class="label-description">银行信息</label>
                        </div>
                    </div>
                    <div class="form-row pad10A pad0T">
                        <div class="col-md-12" id="banks-data">
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
                            <textarea placeholder="请输入备注信息" class="textarea-no-resize" id="remark"
                                      name="remark"></textarea>
                        </div>
                    </div>
                    <div class="button-pane">
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="save-button"><span
                                class="button-content">保存</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<script type="text/javascript" src="/js/customer-list.js"></script>
</body>
</html>