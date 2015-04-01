<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/fund-list.css">
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
    <title>项目转款明细表</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目转款明细表</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="项目信息维护及管理">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                </div>

                <div class="content-box-wrapper">
                    <div style="width: 900px" id="item_settingPanel">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">基金名称：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input id="fundname" class="form-control" placeholder="基金名称">
                                        <input id="_fundname" type="hidden"/>
                                    </div>
                                    <div class="form-label col-md-2">
                                        <label for="">收款人：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input id="bank_person" class="form-control" placeholder="收款人">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">付款人：</label>
                                    </div>
                                    <div class="form-input col-md-10">
                                        <input id="payer" class="form-control" placeholder="付款人">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-12">
                                        <button id="search_paylist_btn" type="submit" class="but-ui btn primary-bg large">查询</button>
                                    </div>
                                </div>

                                <div style="height: 20px">

                                </div>
                                <div class="form-row">
                                    <div class="content-box box-toggle ">
                                        <div class="content-box-header primary-bg">
                                            <span class="float-left">汇款记录</span>
                                            <a href="#" class="float-right icon-separator btn toggle-button" title="汇款记录">
                                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                                            </a>
                                        </div>

                                        <div class="content-box-wrapper">
                                            <div class="col-md-12 page-bar pad0R">
                                                <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
                                                    <i class="glyph-icon icon-arrow-left"></i>
                                                </a>
                                                <div class="button-group float-left pages-div" id="funds-pages"></div>
                                                <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
                                                    <i class="glyph-icon icon-arrow-right"></i>
                                                </a>
                                            </div>
                                            <table class="table table-striped text-center mrg0B" id="pay_records_table">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">选择</th>
                                                    <th class="text-center">付款日期</th>
                                                    <th class="text-center">项目基金</th>
                                                    <th class="text-center">汇款金额</th>
                                                    <th class="text-center">应收利息</th>
                                                    <th class="text-center">应收管理费</th>
                                                    <th class="text-center">应收渠道费</th>
                                                    <th class="text-center">投资天数</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="content-box box-toggle ">
                                        <div class="content-box-header primary-bg">
                                            <span class="float-left">收款记录</span>
                                            <a href="#" class="float-right icon-separator btn toggle-button" title="收款记录">
                                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                                            </a>
                                        </div>

                                        <div class="content-box-wrapper">
                                            <div class="col-md-12 page-bar pad0R">
                                                <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first2">
                                                    <i class="glyph-icon icon-arrow-left"></i>
                                                </a>
                                                <div class="button-group float-left pages-div" id="funds-pages2"></div>
                                                <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last2">
                                                    <i class="glyph-icon icon-arrow-right"></i>
                                                </a>
                                            </div>
                                            <table class="table table-striped text-center mrg0B" id="receives_table">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">选择</th>
                                                    <th class="text-center">收款日期</th>
                                                    <th class="text-center">项目基金</th>
                                                    <th class="text-center">收款金额</th>
                                                    <th class="text-center">银行户名</th>
                                                    <th class="text-center">银行帐号</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div style="height: 25px">

                    </div>

                    <div style="width: 900px" id="item_settingPanel_Ec">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="content-box box-toggle ">
                                    <div class="content-box-header primary-bg">
                                        <span class="float-left">仍然欠款</span>
                                        <a href="#" class="float-right icon-separator btn toggle-button" title="仍然欠款">
                                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                                        </a>
                                    </div>

                                    <div class="content-box-wrapper">
                                        <table class="table table-striped text-center mrg0B" id="receive_records_table">
                                            <thead>
                                            <tr>
                                                <th class="text-center">款项性质</th>
                                                <th class="text-center">数额</th>
                                                <th class="text-center">付款时间</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <%--<div style="height: 25px">--%>

                    <%--</div>--%>

                    <%--<div style="width: 900px" id="item_settingPanel_Ex">--%>
                    <%--<form class="form-bordered " action="/" method="post">--%>
                    <%--<div class="form-row">--%>
                    <%--<div class="content-box box-toggle ">--%>
                    <%--<div class="content-box-header primary-bg">--%>
                    <%--<span class="float-left">统计信息</span>--%>
                    <%--<a href="#" class="float-right icon-separator btn toggle-button" title="统计信息">--%>
                    <%--<i class="glyph-icon icon-toggle icon-chevron-down"></i>--%>
                    <%--</a>--%>
                    <%--</div>--%>

                    <%--<div class="content-box-wrapper">--%>
                    <%--<form class="form-inline">--%>
                    <%--<div class="form-group">--%>
                    <%--<label>应收利息 (不含管理费和渠道费)</label>--%>
                    <%--<span>500</span>--%>
                    <%--</div>--%>
                    <%--<div class="form-group">--%>
                    <%--<label>已收管理费 (金赛银公司收) </label>--%>
                    <%--<span>200</span>--%>
                    <%--</div>--%>
                    <%--<div class="form-group">--%>
                    <%--<label>已收渠道费</label>--%>
                    <%--<span>200</span>--%>
                    <%--</div>--%>

                    <%--</form>--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <%--</div>--%>
                    <%--</form>--%>
                    <%--</div>--%>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/pay_record_list.js"></script>
</body>
</html>