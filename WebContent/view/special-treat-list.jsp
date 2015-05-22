<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/special-treat-list.css"/>
    <script type="text/javascript" src="/js/special-treat-list.js"></script>
    <title>特殊申请表管理</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
		 <textarea id="table-data-template" class="template">
            {#param name=fields value=["czr","czsj","url","method","params","address"]}
            {#param name=start value=$P.callback()+1}
            {#param name=pos value=$P.start}
            <table class="table table-hover table-hover table-striped text-center mrg0B" id="view-table">
                <thead>
                <tr>
                    <th class="text-center" style="width: 5em;"><span>状态</span></th>
                    <th class="text-center"><span class=""></span></th>
                    <th class="text-center"><span class="">基金名称</span></th>
                    <th class="text-center"><span class="">合同编号</span></th>
                    <th class="text-center"><span class="">目标合同编号</span></th>
                    <th class="text-center"><span class="">申请部门</span></th>
                    <th class="text-center"><span class="">申请人</span></th>
                    <th class="text-center"><span class="">申请日期</span></th>
                    <th class="text-center"><span class="">申请表类型</span></th>
                    <th class="text-center"><span class="">客户名称</span></th>
                    <th class="text-center"><span class="">备注</span></th>
                    <th class="text-center"><span class=""></span></th>
                </tr>
                </thead>
                <tbody>
                {#foreach $T as item}
                <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                    <td class="text-center">
                        {#if $T.item.status==0}
                        <span class="badge bg-orange tooltip-button text-center" title=""
                              data-original-title="label with .bg-green">审核中</span>
                        {#/if}
                        {#if $T.item.status==1}
                        <span class="label bg-green tooltip-button  text-center" title=""
                              data-original-title="label with .bg-orange">已通过</span>
                        {#/if}
                        {#if $T.item.status==3}
                        <span class="label bg-red tooltip-button  text-center" title=""
                              data-original-title="label with .bg-orange">取消</span>
                        {#/if}
                    <td>
                        {#if $T.item.sType!="合并申请"}
                        <a class="btn" href="preview.jsp?id={$T.item.id}&reporttype={$T.item.sq_type}">查看</a>
                        {#/if}
                    </td>
                    <td>{$T.item.fundName}</td>
                    <td>{$T.item.htbh}</td>
                    <td>{$T.item.xhtbh || '-'}</td>
                    <td>{$T.item.sqbm}</td>
                    <td>{$T.item.sqr.chainName}</td>
                    <td>{$T.item.scrq}</td>
                    <td>{$T.item.sType}</td>
                    <td>{$T.item.customer.name}</td>
                    <td>{$T.item.bz}</td>
                    <td class="text-center">
                        {#if $T.item.status==0}
                        <button class="btn medium bg-orange mrg5L btn_cancel" data-index="{$T.item.id}"
                                data-stype="{$T.item.sq_type}">取消申请
                        </button>
                        <button class="btn medium bg-green btn_accept" data-index="{$T.item.id}"
                                data-stype="{$T.item.sq_type}">同意申请
                        </button>
                        {#/if}
                    </td>
                </tr>
                {#/for}
                </tbody>
            </table>
            <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">特殊申请单管理</span> <a href="#"
                                                               class="float-right icon-separator btn toggle-button"
                                                               title="最近领用记录"> <i
                        class="glyph-icon icon-toggle icon-chevron-down"></i>
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
                        <button
                                class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button">
                            <span class="button-content">搜索</span>
                        </button>
                    </div>

                </div>
                <div class="content-box-wrapper">
                    <div>
                        <div class="form-row">
                            <div class="form-input col-md-2">
                                <label> 特殊申请类型：</label><select id="sq_type"></select>
                            </div>
                            <div class="form-label col-md-2">
                            </div>
                        </div>
                    </div>
                    <div id="table-pager" class="page-bar"></div>
                    <div id="table-data"></div>

                </div>
            </div>

            <%--<div class="content-box box-toggle ">--%>
            <%--<div class="content-box-header primary-bg">--%>
            <%--<span class="float-left">协议打印数据设置</span> <a href="#"--%>
            <%--class="float-right icon-separator btn toggle-button"--%>
            <%--title="最近领用记录"> <i--%>
            <%--class="glyph-icon icon-toggle icon-chevron-down"></i>--%>
            <%--</a>--%>
            <%--</div>--%>
            <%--<div class="content-box-wrapper">--%>
            <%--<div style="width: 700px" id="item_settingPanel">--%>
            <%--<form class="form-bordered " id="bindtarget_id" action="/"--%>
            <%--method="post">--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3   ">--%>
            <%--<label for=""> 基金名称： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-4">--%>
            <%--<select id="fund_list"></select>--%>
            <%--</div>--%>
            <%--<div class="form-label col-md-2  ">--%>
            <%--<label for=""> 名称简写:</label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-3">--%>
            <%--<input class="bind" id="input_htbh" data-bindtype="value"--%>
            <%--data-member="shortName" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label for=""> 续投协议名称： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="fundname" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label for=""> 注册地址： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="incAddress" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label for=""> 注册号： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label for=""> 执行事务合伙人： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label for=""> 基金投向： </label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-12 ">--%>
            <%--<h3>GP组成设置</h3>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-12 ">--%>
            <%--<label><span class="font-size-16">甲方</span></label>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>公司名称：</label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>法定代表人：</label>--%>

            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%----%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>地址：</label>--%>

            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%----%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-12 ">--%>
            <%--<label><span class="font-size-16">乙方（单 GP不需要填写）</span></label>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>公司名称：</label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>法定代表人：</label>--%>
            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="form-row">--%>
            <%--<div class="form-label col-md-3 ">--%>
            <%--<label>地址：</label>--%>

            <%--</div>--%>
            <%--<div class="form-input col-md-6 ">--%>
            <%--<input class="bind" data-bindtype="value"--%>
            <%--data-member="businessLicense" />--%>
            <%--</div>--%>
            <%--</div>									--%>
            <%--</form>--%>
            <%--<div class="pad10T">--%>
            <%--<button class="btn-ui btn bg-green large medium mrg10L" id="">--%>
            <%--<span class="button-content">保存设置</span>--%>
            <%--</button>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--</div>--%>
        </div>
    </div>
</div>
<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
    <div id="jy_panel" style="width: 98%;">
        <div class="text-center" style="height: 80px;">
            <h3 id="jsy_messagebox_msg">dsfsafdasfasfaf</h3>
        </div>
        <div class="text-center">
            <a href="#" class="btn large primary-bg" title=""
               id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
            </a>
        </div>
    </div>
</div>
<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
</body>
</html>