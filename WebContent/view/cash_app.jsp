<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>兑付查询</title>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/cash_app.css"/>
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <textarea id="summary-data-template" class="template">
        {#param name=fields value=["fundName","amount","count","lx","bj"]}
        {#param name=start value=$P.callback()+1}
        {#param name=pos value=$P.start}
        <table class="table table-striped text-center mrg0B" id="view-table">
            <thead>
            <tr>
                <th class="text-center">基金</th>
                <th class="text-center">总金额</th>
                <th class="text-center">总笔数</th>
                <th class="text-center">利息</th>
                <th class="text-center">本金</th>
            </tr>
            </thead>
            <tbody>
            {#foreach $T as item}
            <tr data-key="{$T.item$index}" data-row="{$P.pos++}">
                <%--{#foreach $P.fields as field}--%>

                <td class="text-center">
                    <span class="text-overflow">{$T.item["fundName"]}</span>
                </td>  <td class="text-center">
                    <span class="text-overflow">{NUMBERFORMAT.toYuan($T.item["amount"])}</span>
                </td>  <td class="text-center">
                    <span class="text-overflow">{$T.item["count"]}</span>
                </td>  <td class="text-center">
                    <span class="text-overflow">{NUMBERFORMAT.toYuan($T.item["lx"])}</span>
                </td>
                    <td class="text-center">
                        <span class="text-overflow">{NUMBERFORMAT.toYuan($T.item["bj"])}</span>
                    </td>
                <%--{#/for}--%>
            </tr>
            {#/for}
            </tbody>
        </table>
        <div class="data-rows">第{$P.start}-{$P.start+$T.length-1}条</div>
    </textarea>
    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">

                <div class="content-box-header primary-bg">
                    <span class="float-left">兑付信息</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="兑付信息">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="filter-keyword"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="filter-button"><span class="button-content">搜索</span></button>
                    </div>

                    <div class="keyword-view float-right filter-status">
                        <div class="form-row pad0B">
                            <div class="form-input col-md-12">
                                <div class="input-append-wrapper">
                                    <div class="input-append">
                                        <i class="glyph-icon icon-filter"></i>
                                    </div>

                                    <div class="append-left">
                                        <select class="" id="filter-status">
                                            <option value="0">未申请</option>
                                            <option value="1">待审批</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keyword-view float-right filter-status">
                        <div class="form-row pad0B">
                            <div class="form-input col-md-12">
                                <div class="input-append-wrapper">
                                    <div class="input-append">到</div>

                                    <div class="append-left">
                                        <input class="tcal filter-input" id="filter_to"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keyword-view float-right filter-status">
                        <div class="form-row pad0B">
                            <div class="form-input col-md-12">
                                <div class="input-append-wrapper">
                                    <div class="input-append">从</div>

                                    <div class="append-left">
                                        <input class="tcal filter-input" id="filter_from"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="content-box-wrapper">

                    <div id="table-pager" class="page-bar"></div>

                    <table class="table table-striped text-center mrg0B" id="pacts-get-table">
                        <thead>
                            <tr>
                                <th><input class="item-checkbox" type="checkbox" name="checkbox"></th>
                                <th><span class="text-overflow text-center cash-fund">基金</span></th>
                                <th><span class="text-overflow text-center cash-pact">合同编号</span></th>
                                <th><span class="text-overflow text-center cash-customer">客户名称</span></th>
                                <th><span class="text-overflow text-center cash-invest">投资金额</span></th>
                                <th><span class="text-overflow text-center cash-due">投资期限</span></th>
                                <th><span class="text-overflow text-center cash-shouyi">收益率</span></th>
                                <th><span class="text-overflow text-center cash-lixi">应付利息</span></th>
                                <th><span class="text-overflow text-center cash-benjin">应付本金</span></th>
                                <th><span class="text-overflow text-center cash-zongji">总计</span></th>
                                <th><span class="text-overflow text-center bank-name">开户行</span></th>
                                <th><span class="text-overflow text-center bank-number">账户</span></th>
                                <th><span class="text-overflow text-center  country-name">国籍</span></th>
                                <th><span class="text-overflow text-center card-type">证件类型</span></th>
                                <th><span class="text-overflow text-center card-number">证件号码</span></th>
                                <th><span class="text-overflow text-center cash-fujian">附件</span></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                </div>

                <div class="button-pane">
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="submit_cash">
                        <span class="button-content">兑付申请</span></button>
                </div>
            </div>

            <div id="temp_attachment" class="content-box box-toggle ">
            </div>

            <div class="content-box box-toggle ">
                <h3 class="content-box-header primary-bg">
                    <span class="float-left">汇总</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="汇总">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </h3>

                <div class="content-box-wrapper">
                    <div id="table-pager-summary" class="page-bar"></div>
                    <table class="table table-striped text-center mrg0B" id="summary-data">

                    </table>
                </div>
            </div>

            <div class="content-box box-toggle ">
                <h3 class="content-box-header primary-bg">
                    <span class="float-left">兑付报表</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="兑付报表">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </h3>

                <div class="content-box-wrapper">
                    <div id="cash-report" class="cash-report"></div>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/cash_app.js"></script>
</body>
</html>