<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/fund-list.css">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
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

                <div class="container-fluid">

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="fundname">项目基金</label>
                                    <input id="fundname" class="form-control" placeholder="项目基金">
                                    <input id="_fundname" type="hidden"/>
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="payDate">付款日期</label>
                                    <input id="payDate" class="form-control tcal filter-input" placeholder="付款日期">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="payAmount">投资金额</label>
                                    <input id="payAmount" class="form-control" placeholder="投资金额">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="bankaccount">付款账户</label>
                                    <input id="bankaccount" class="form-control" placeholder="付款账户">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="bankinfo">付款银行</label>
                                    <input id="bankinfo" class="form-control" placeholder="付款银行">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="bank_person">收款人</label>
                                    <input id="bank_person" class="form-control" placeholder="收款人">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="payer">付款人</label>
                                    <input id="payer" class="form-control" placeholder="付款人">
                                </div>

                                <button id="search_paylist_btn" type="submit" class="btn btn-default">查询</button>
                            </form>

                        </div>
                    </div>
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

                <div class="panel panel-default">
                    <div class="panel-heading">选择记录编号：1</div>
                    <div class="panel-body">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>仍然欠款 </label>
                                <span>232323</span>
                            </div>
                        </form>

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

                <div class="panel panel-default">
                    <div class="panel-heading">统计信息</div>
                    <div class="panel-body">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>应收利息 (不含管理费和渠道费)</label>
                                <span>500</span>
                            </div>
                            <div class="form-group">
                                <label>已收管理费 (金赛银公司收) </label>
                                <span>200</span>
                            </div>
                            <div class="form-group">
                                <label>已收渠道费</label>
                                <span>200</span>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../js/pay_record_list.js"></script>
</body>
</html>