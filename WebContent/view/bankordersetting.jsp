<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/company-edit.css">
    <title>记账凭证生成设置</title>
    <style type="text/css">
        .table td {
            padding: 1px 1px;
        }
    </style>
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="banktosummary-data-template" class="template">
        <table class="table table-hover table-striped text-center mrg0B" id="banktosummary-table">
            <thead>
            <tr>
                <%--根据客户权限多加一列操作列--%>
                <th class="text-center">摘要名称</th>
                <th class="text-center">关键词</th>
                <th class="text-center">银行账号</th>
                <th class="text-center">匹配顺序</th>
                <th class="text-center">操作</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}">
                <td class="form-input"><input type="hidden" name="id" value="{$T.item['id']}"><span><input
                        name="summary" value="{$T.item['summary']}"/></span>
                </td>
                <td class="form-input"><input name="remark" value="{$T.item['remark']}"/></td>
                <td class="form-input"><input name="accountName" value="{$T.item['accountName']}"></td>
                <td class="form-input"><label>{$T.item['indexlocation']}</label></td>
                <td>
                    <button class="del-btn" data-itemid="{$T.item$index}">删除</button>
                    <button class="up-btn" data-itemid="{$T.item$index}">上移</button>
                    <button class="down-btn" data-itemid="{$T.item$index}">下移</button>
                </td>
            </tr>
            {#/for}
            </tbody>
        </table>
    </textarea>
    <textarea id="subject-data-template" class="template">
        <table class="table table-hover table-striped text-center mrg0B" id="subject-table">
            <thead>
            <tr>
                <%--根据客户权限多加一列操作列--%>
                <th class="text-center">一级科目名称</th>
                <th class="text-center">二级科目名称</th>
                <th class="text-center">三级科目名称</th>
                <th class="text-center">借贷方式</th>
                <th class="text-center">摘要</th>
                <th class="text-center">账套（银行账号名称）</th>
                <th class="text-center" width="120px"></th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}">
                <td class="form-input"><input type="hidden" name="id" value="{$T.item['id']}"><input name="subject"
                                                                                                     value="{$T.item['subject']}"/>
                </td>
                <td class="form-input"><input name="subjectLevel2" value="{$T.item['subjectLevel2']||''}"/></td>
                <td class="form-input"><input name="subjectLevel3" value="{$T.item['subjectLevel3']||''}"/></td>
                <td class="form-input"><select name="borrow">
                    <option value="true" {$T.item[
                    'borrow'] ? 'selected' : ''}>借</option>
                    <option value="false" {$T.item[
                    'borrow'] ? '' : 'selected'}>贷</option>
                </select></td>
                <td class="form-input">
                    <%--<select>--%>
                    <%--<option value="{$T.item['sumName']}" >{$T.item['sumName']}</option>--%>
                    <%--</select>--%>
                    <input name="sumName" value="{$T.item['sumName']}"/>
                </td>
                <td class="form-input"><input name="company" value="{$T.item['company']}"/></td>
                <%--<td><span ><input name="defaultAccount" value="{$T.item['defaultAccount']}" /></span></td>--%>
                <td><span class="text-overflow">
                    <button class="del-btn" data-itemid="{$T.item$index}">删除</button>
                </span></td>
            </tr>
            {#/for}
            </tbody>
        </table>
    </textarea>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle " id="company-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">银行备注-摘要匹配数据设置</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>
                <div class="content-box-wrapper">
                    <div id="banktosummary-pager" class="page-bar"></div>
                    <div class="table table-striped text-center mrg0B" id="banktosummary-data">
                    </div>
                    <div class="form-row mrg10T">
                        <div class="form-input col-md-6">
                            <button class="btn medium bg-primary" title="" id="banktosummary-new">
                                <span class="button-content">+ 新行</span>
                            </button>
                        </div>
                        <div class="form-input col-md-6">
                            <button class="btn medium bg-green float-right mrg10L" title="" id="banktosummary-save">
                                <span class="button-content">保存</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-box box-toggle " id="">
                <div class="content-box-header primary-bg">
                    <span class="float-left">科目匹配设置</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>
                <div class="content-box-wrapper">
                    <div id="subject-pager" class="page-bar"></div>
                    <div class="table table-striped text-center mrg0B" id="subject-data">
                    </div>
                    <div class="form-row mrg10T">
                        <div class="form-input col-md-6">
                            <button class="btn medium bg-primary" title="" id="subject-new">
                                <span class="button-content">+新行</span>
                            </button>
                        </div>
                        <div class="form-input col-md-6">
                            <button class="btn medium bg-green float-right mrg10L" title="" id="subject-save">
                                <span class="button-content">保存</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">凭证生成参数设置</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>
                <div class="content-box-wrapper">
                    <div id="setting-pager" class="page-bar">
                        <span>[开户行] [公司名称] [账号后4位] [对方户名] [对方账号]</span> <span>中括号使用英文半角输入</span>
                    </div>
                    <div class="table table-striped text-center mrg0B" id="setting-data">
                    </div>
                    <div CLASS="mrg10T">
                        <div class="button-pane">
                            <button class="btn-ui btn bg-green large medium float-right mrg10L" id="save-button"><span
                                    class="button-content">保存设置</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<script type="text/javascript" src="/js/bankordersetting.js"></script>
</body>
</html>