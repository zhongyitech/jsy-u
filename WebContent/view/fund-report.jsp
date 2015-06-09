<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <title>基金统计信息</title>
    <jsp:include page="head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/fund-list.css"/>
    <style type="text/css">
        .dev_box {
            margin: 5px auto 0px 0px;
            padding: 0 0 0 0;
            border: 1px solid #cccccc;
        }

        .form-bordered .form-label {
            padding: 5px 10px;
        !important;
        }

        .ui-tabs-panel {
            height: 240px;
        }

        .content-box {
            margin-bottom: 2px;
        }
        .ui-tabs{
            margin-bottom: 0px;

        }
    </style>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="navi.jsp"/>
     <textarea id="table-fundDetail-template" class="template">
         <form class="form-bordered" action="" method="">
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">基金编号</div>
                 <div class="form-label col-md-6">{$T.fundNo}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">基金名称</div>
                 <div class="form-labelcol-md-6">{$T.fundName}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">收益率范围</div>
                 <div class="form-labelcol-md-6">{$T.fundNo}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">开售日期</div>
                 <div class="form-labelcol-md-6">{DATEFORMAT.toDate($T.startSaleDate)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">预募规模</div>
                 <div class="form-label col-md-6">{NUMBERFORMAT.toYuan($T.raiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">实募规模</div>
                 <div class=" form-label col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">季付募集规模</div>
                 <div class="form-label col-md-6">{NUMBERFORMAT.toYuan($T.quarterRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">季付实募</div>
                 <div class="form-label  col-md-6">{NUMBERFORMAT.toYuan($T.rQuarterRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">年付募集规模</div>
                 <div class="form-label  col-md-6">{NUMBERFORMAT.toYuan($T.yearRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">年付实募</div>
                 <div class="form-label  col-md-6">{NUMBERFORMAT.toYuan($T.rYearRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">半年付募集规模</div>
                 <div class="form-label col-md-6">{NUMBERFORMAT.toYuan($T.halfRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">半年付实募</div>
                 <div class="form-label col-md-6">{NUMBERFORMAT.toYuan($T.rHalfRaise)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">进度</div>
                 <div class="form-label col-md-6">{NUMBERFORMAT.toRate($T.rRaiseFunds/$T.raiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">停募日期</div>
                 <div class=" form-label col-md-6">{$T.stopRaise ? DATEFORMAT.toDate($T.stopRaise):'-'}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">停募原因</div>
                 <div class="form-label col-md-6">{$T.stopRaiseReason : '-'}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">状态</div>
                 <div class="form-label col-md-6">{$T.status.id}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">备注</div>
                 <div class="form-label col-md-6">{($T.memo || '')}</div>
             </div>
         </form>
     </textarea>
        <textarea id="table-payAndTc-template" class="template">
         <form class="form-bordered" action="" method="">
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已付利息</div>
                 <div class=" col-md-6">{$T.fundNo}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">未付利息</div>
                 <div class="col-md-6">{$T.fundName}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已付本金</div>
                 <div class="col-md-6">{$T.fundNo}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">未付本金</div>
                 <div class="col-md-6">{DATEFORMAT.toDate($T.startSaleDate)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">转投合计</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.raiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">退伙合计</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>

         </form>
     </textarea>
    <textarea id="table-project-template" class="template">
         <form class="form-bordered" action="" method="">
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">投资项目</div>
                 <div class=" col-md-6">{$T.project}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">投资日期</div>
                 <div class="col-md-6">{$T.fundName}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">应投金额</div>
                 <div class="col-md-6">{$T.fundNo}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">实投金额</div>
                 <div class="col-md-6">{DATEFORMAT.toDate($T.startSaleDate)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已收管理费</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.raiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已收渠道费</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已收项目利息</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">未收项目利息</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">已收项目本金</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>
             <div class="form-row">
                 <div class="form-label col-md-6 text-center">未收项目本金</div>
                 <div class=" col-md-6">{NUMBERFORMAT.toYuan($T.rRaiseFunds)}</div>
             </div>

         </form>
     </textarea>
    <textarea id="table-saleData-template" class="template">
        <div class="nav-list-horizontal">
            <ul class="row mrg10T">
                <li>
                    <div class="nav-wrp">
                        <h3><i class="glyph-icon icon-caret-up font-green font-size-17 pad5R"></i>$1486</h3>
                        <span class="font-gray">月销售数据</span>
                    </div>
                </li>
                <li>
                    <div class="nav-wrp">
                        <h3><i class="glyph-icon icon-caret-up font-green font-size-17 pad5R"></i>{$T.rQuarterRaise}
                        </h3>
                        <span class="font-gray">季度销售数据</span>
                    </div>
                </li>
                <li>
                    <div class="nav-wrp">
                        <h3><i class="glyph-icon iicon-caret-up font-green font-size-17 pad5R"></i>$622</h3>
                        <span class="font-gray">半年销售数据</span>
                    </div>
                </li>
                <li>
                    <div class="nav-wrp">
                        <h3><i class="glyph-icon icon-caret-up font-green font-size-17 pad5R"></i>$65</h3>
                        <span class="font-gray">年销售</span>
                    </div>
                </li>
            </ul>
        </div>
    </textarea>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad15T">
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left id_fundName" >基金(safalfj)</span>数据总览<a href="./fund-list.jsp" class="btn medium hover-green" title="">
                    <span class="button-content">返回</span>
                </a>
                </div>
                <div class="content-box-wrapper ">
                    <%--基金收付数据趋及对比图--%>
                    <div id="fund_review_summary" class="dev_box pad5A" style="height: 260px;width: 1000px">
                        <%--销售数据饼图--%>
                        <div id="fund_chart_salse_01" class="dev_box"
                             style="height: 240px;width: 300px;display: inline-block"></div>
                        <%--销售数据曲线图--%>
                        <div id="fund_chart_salse_02" class="dev_box"
                             style="height: 240px;width: 680px;display: inline-block"></div>
                    </div>
                    <%--基金明细信息及销售统计数据及图表--%>
                    <div id="fund_review_details" class="dev_box pad5A" style="width: 1000px">
                        <div class="form-row">
                            <div class="form-label col-md-3 " id="view_fundDetail">
                            </div>
                            <div class="form-input col-md-9">
                                <div class="form-row" id="view_saleData">

                                </div>
                                <div class="form-row">
                                    <div id="char_saleData" class="dev_box"
                                         style="width: 95%;height: 320px;margin-left: auto;margin-right:15px "></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left id_fundName">基金</span><span>兑付及提成数据统计</span>
                </div>
                <div class="content-box-wrapper">
                    <div id="fund_payAndTc_details" class="dev_box pad5A" style="width: 1000px">
                        <div class="form-row">
                            <div class="form-label col-md-3 " id="view_payAndTc">
                            </div>
                            <div class="form-input col-md-9">
                                <div class="content-box box-toggle ">
                                    <div class="content-box-header primary-bg">兑付</div>
                                    <div class="content-box-wrapper">
                                        <div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all">
                                            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                                                role="tablist">
                                                <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
                                                    role="tab" tabindex="0" aria-controls="normal-tabs-1"
                                                    aria-labelledby="ui-id-4" aria-selected="true">
                                                    <a href="#normal-tabs-1" title="Tab 1" class="ui-tabs-anchor"
                                                       role="presentation" tabindex="-1" id="ui-id-4">
                                                        日
                                                    </a>
                                                </li>
                                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1"
                                                    aria-controls="normal-tabs-2" aria-labelledby="ui-id-5"
                                                    aria-selected="false">
                                                    <a href="#normal-tabs-2" title="Tab 2" class="ui-tabs-anchor"
                                                       role="presentation" tabindex="-1" id="ui-id-5">
                                                        月
                                                    </a>
                                                </li>
                                            </ul>
                                            <div id="normal-tabs-1" aria-labelledby="ui-id-4"
                                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                 role="tabpanel" aria-expanded="true" aria-hidden="false"
                                                 style="display: block;">
                                            </div>
                                            <div id="normal-tabs-2" aria-labelledby="ui-id-5"
                                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                 role="tabpanel" aria-expanded="false" aria-hidden="true"
                                                 style="display: none;">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="content-box box-toggle ">
                                    <div class="content-box-header primary-bg"> 提成</div>
                                    <div class="content-box-wrapper">
                                        <div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all">
                                            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                                                role="tablist">
                                                <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
                                                    role="tab" tabindex="0" aria-controls="pay_normal-tabs-1"
                                                    aria-labelledby="ui-id-6" aria-selected="true">
                                                    <a href="pay_#normal-tabs-1" title="Tab 1" class="ui-tabs-anchor"
                                                       role="presentation" tabindex="-1" id="ui-id-6">
                                                        日
                                                    </a>
                                                </li>
                                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1"
                                                    aria-controls="pay_normal-tabs-2" aria-labelledby="ui-id-7"
                                                    aria-selected="false">
                                                    <a href="#pay_normal-tabs-2" title="Tab 2" class="ui-tabs-anchor"
                                                       role="presentation" tabindex="-1" id="ui-id-7">
                                                        月
                                                    </a>
                                                </li>
                                            </ul>
                                            <div id="pay_normal-tabs-1" aria-labelledby="ui-id-6"
                                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                 role="tabpanel" aria-expanded="true" aria-hidden="false"
                                                 style="display: block;">

                                            </div>
                                            <div id="pay_normal-tabs-2" aria-labelledby="ui-id-7"
                                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                 role="tabpanel" aria-expanded="false" aria-hidden="true"
                                                 style="display: none;">
                                                tab 2 contentggggg
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box box-toggle ">
                    <div class="content-box-header primary-bg">
                        <span class="float-left id_fundName">基金</span><span>投资项目情况汇总</span>
                    </div>
                    <div class="content-box-wrapper">
                        <div id="fund_project_details" class="dev_box pad5A" style="width: 1000px">
                            <div class="form-row">
                                <div class="form-label col-md-3 " id="view_project">
                                </div>
                                <div class="form-input col-md-9">
                                    <div class="content-box box-toggle ">
                                        <div class="content-box-header primary-bg">收款</div>
                                        <div class="content-box-wrapper">
                                            <div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all">
                                                <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                                                    role="tablist">
                                                    <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active"
                                                        role="tab" tabindex="0" aria-controls="project_normal-tabs-1"
                                                        aria-labelledby="ui-id-4" aria-selected="true">
                                                        <a href="#project_normal-tabs-1" title="Tab 1"
                                                           class="ui-tabs-anchor"
                                                           role="presentation" tabindex="-1" id="ui-id-8">
                                                            日
                                                        </a>
                                                    </li>
                                                    <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1"
                                                        aria-controls="project_normal-tabs-2" aria-labelledby="ui-id-5"
                                                        aria-selected="false">
                                                        <a href="#project_normal-tabs-2" title="Tab 2"
                                                           class="ui-tabs-anchor"
                                                           role="presentation" tabindex="-1" id="ui-id-9">
                                                            月
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div id="project_normal-tabs-1" aria-labelledby="ui-id-8"
                                                     class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                     role="tabpanel" aria-expanded="true" aria-hidden="false"
                                                     style="display: block;">
                                                    tab 1 content 收款1
                                                </div>
                                                <div id="project_normal-tabs-2" aria-labelledby="ui-id-9"
                                                     class="ui-tabs-panel ui-widget-content ui-corner-bottom"
                                                     role="tabpanel" aria-expanded="false" aria-hidden="true"
                                                     style="display: none;">
                                                    tab 2 content 收款2
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript" src="/js/fund-report.js"></script>
</body>
</html>