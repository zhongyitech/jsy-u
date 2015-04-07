<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <%--<link rel="stylesheet" type="text/css" href="/css/.css">--%>
    <title>投资档案明细</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="info-data-template" class="template">
         <div class="content-box box-toggle">
             <div class="content-box-header primary-bg">
                 <span class="float-left">档案信息</span>
                 <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="投资档案的基金信息">
                     <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                 </a>
             </div>
             <div class="content-box-wrapper">
                 <div>
                     <div class="form-row">
                         <div class="form-input col-md-1">
                             <label>档案编号</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.archiveNum}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>合同编号</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.contractNum}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>基金名称</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.fund.fundName}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>投资金额</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{NUMBERFORMAT.toYuan($T.tzje)}</label>
                         </div>
                     </div>
                     <div class="form-row">
                         <div class="form-input col-md-1">
                             <label>投资期限</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.tzqx}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>认购日期</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{DATEFORMAT.toDate($T.rgrq)}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>到</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{DATEFORMAT.toDate($T.dqrq)}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>付息方式</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.fxfs}</label>
                         </div>
                     </div>
                     <div class="form-row">
                         <div class="form-input col-md-1">
                             <label>年华收益率</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{NUMBERFORMAT.toRate($T.nhsyl)}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>合同状态</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.status}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>业务经理</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.ywjl.chainName}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>备注</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{$T.description}</label>
                         </div>
                     </div>
                     <div class="form-row">
                         <div class="form-input col-md-1">
                             <label>管理提成比例</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{NUMBERFORMAT.toRate($T.gltc)}</label>
                         </div>
                         <div class="form-input col-md-1">
                             <label>业务提成比例</label>
                         </div>
                         <div class="form-input col-md-2">
                             <label>{NUMBERFORMAT.toRate($T.ywtc)}</label>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <div class="content-box box-toggle">
             <div class="content-box-header primary-bg">
                 <span class="float-left">客户信息</span>
                 <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="购买基金的客户信息">
                     <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                 </a>
             </div>
             <div class="content-box-wrapper">
                 <div class="form-row">
                     <div class="form-input col-md-1">
                         <label>客户名称</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.name}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>国家(地区)</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.country}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>证照类型</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.credentialsType}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>证照号码</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.credentialsNumber}</label>
                     </div>
                 </div>
                 <div class="form-row">
                     <div class="form-input col-md-1">
                         <label>开户行名称</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.khh}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>收益人账号</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.yhzh}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>联系电话</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.phone}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>联系手机</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.telphone}</label>
                     </div>
                 </div>

                 <div class="form-row">
                     <div class="form-input col-md-1">
                         <label>邮政编码</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.postalcode}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>E-Mail</label>
                     </div>
                     <div class="form-input col-md-2">
                         <label>{$T.customer.email}</label>
                     </div>
                     <div class="form-input col-md-1">
                         <label>通讯地址</label>
                     </div>
                     <div class="form-input col-md-5">
                         <label>{$T.customer.callAddress}</label>
                     </div>
                 </div>

             </div>
         </div>
         <div class="content-box box-toggle">
             <div class="content-box-header primary-bg">
                 <span class="float-left">管理提成信息</span>
                 <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="提成信息">
                     <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                 </a>
             </div>
             <div class="content-box-wrapper">
                 <table class="table table-striped text-center mrg0B">
                     <thead>
                     <tr>
                         <th class="text-center"><span class="text-overflow">提成人员</span></th>
                         <th class="text-center"><span class="text-overflow">提成金额</span></th>
                         <th class="text-center"><span class="text-overflow">提成比例</span></th>
                         <th class="text-center"><span class="text-overflow">70%发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">20%发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">10%发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">实际发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">收款人</span></th>
                         <th class="text-center"><span class="text-overflow">开户银行</span></th>
                         <th class="text-center"><span class="text-overflow">银行账号</span></th>
                     </tr>
                     </thead>
                     <tbody>
                     {#foreach $T.gltcs as item}
                     <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                         <td><span class="text-overflow">{$T.item.user.chainName}</span></td>
                         <td><span class="text-overflow">{NUMBERFORMAT.toYuan($T.item.tcje)}</span></td>
                         <td><span class="text-overflow">{NUMBERFORMAT.toRate($T.item.tcbl)}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.tcffsj)}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.glffsj2)}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.glffsj3)}</span></td>
                         <td><span class="text-overflow">{$T.item.sjffsj}</span></td>
                         <td><span class="text-overflow">{$T.item.skr}</span></td>
                         <td><span class="text-overflow">{$T.item.khh}</span></td>
                         <td><span class="text-overflow">{$T.item.yhzh}</span></td>
                         </td>
                     </tr>
                     {#/for}
                     </tbody>
                 </table>
             </div>
         </div>
         <div class="content-box box-toggle">
             <div class="content-box-header primary-bg">
                 <span class="float-left">业务提成信息</span>
                 <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="提成信息">
                     <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                 </a>
             </div>
             <div class="content-box-wrapper">
                 <table class="table table-striped text-center mrg0B">
                     <thead>
                     <tr>
                         <th class="text-center"> <span class="text-overflow ">序号</span></th>
                         <th class="text-center"><span class="text-overflow">提成人员</span></th>
                         <th class="text-center"><span class="text-overflow">提成金额</span></th>
                         <th class="text-center"><span class="text-overflow">提成比例</span></th>
                         <th class="text-center"><span class="text-overflow">应发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">经手人</span></th>
                         <th class="text-center"><span class="text-overflow">实际发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">开户银行</span></th>
                         <th class="text-center"><span class="text-overflow">银行账号</span></th>
                     </tr>
                     </thead>
                     <tbody>
                     {#foreach $T.ywtcs as item}
                     <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                         <td class="text-center">
                             <span class="text-overflow">{$T.item$index+1}</span></td>
                         <td><span class="text-overflow">{$T.item.user.chainName}</span></td>
                         <td><span class="text-overflow">{NUMBERFORMAT.toYuan($T.item.tcje)}</span></td>
                         <td><span class="text-overflow">{NUMBERFORMAT.toRate($T.item.tcbl)}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.tcffsj)}</span></td>
                         <td><span class="text-overflow">{$T.item.skr}</span></td>
                         <td><span class="text-overflow">{$T.item.sjffsj}</span></td>
                         <td><span class="text-overflow">{$T.item.khh}</span></td>
                         <td><span class="text-overflow">{$T.item.yhzh}</span></td>
                         </td>
                     </tr>
                     {#/for}
                     </tbody>
                 </table>
             </div>
         </div>
         <div class="content-box box-toggle">
             <div class="content-box-header primary-bg">
                 <span class="float-left">付息信息</span>
                 <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="投资档案的人付息情况">
                     <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                 </a>
             </div>
             <div class="content-box-wrapper">
                 <table class="table table-striped text-center mrg0B">
                     <thead>
                     <tr>
                         <th class="text-center"><span class="text-overflow">序号</span></th>
                         <th class="text-center"><span class="text-overflow">收益人名称</span></th>
                         <th class="text-center"><span class="text-overflow">付息期次</span></th>
                         <th class="text-center"><span class="text-overflow">应发放时间</span></th>
                         <th class="text-center"><span class="text-overflow">付款状态</span></th>
                         <th class="text-center"><span class="text-overflow">实际发放时间</span></th>
                     </tr>
                     </thead>
                     <tbody>
                     {#foreach $T.paymentInfo as item}
                     <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                         <td class="text-center">
                             <span class="text-overflow">{$T.item$index+1}</span></td>
                         <td><span class="text-overflow">{$T.item.customerName}</span></td>
                         <td><span class="text-overflow">{{$T.item$index}+1}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.fxsj)}</span></td>
                         <td><span class="text-overflow">{$T.item.isAllow ? "已付":"未付"}</span></td>
                         <td><span class="text-overflow">{DATEFORMAT.toDate($T.item.zfsj)}</span></td>
                         </td>
                     </tr>
                     {#/for}
                     </tbody>
                 </table>
             </div>
         </div>
    </textarea>

    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/investment-details.js"></script>
</body>
</html>