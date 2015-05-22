<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>新建收款记录</title>
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">新建收款记录</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="新建收款记录">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div style="width: 900px" id="item_settingPanel">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label >基金名称：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text" id="fundname" placeholder="输入自动查询"/>
                                        <input type="hidden" id="_fundname" placeholder="输入自动查询"/>
                                    </div>
                                    <div class="form-label col-md-2">
                                        <label >项目名称：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <select id="project"></select>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label >收款日期：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input id="paydate" class="tcal filter-input" type="text" />
                                    </div>
                                    <div class="form-label col-md-2">
                                        <label >收款金额：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text" id="paytotal" placeholder="输入金额"/>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label>收款人：</label>
                                    </div>

                                    <div id="out_banklist" class="form-input col-md-10">
                                        <input id="out_company" data-id data-oldid style="width: 200px;" placeholder="请输入收款的公司或者个人" />
                                        <div id="out_banks"></div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label>汇款人：</label>
                                    </div>
                                    <div id="in_banklist" class="form-input col-md-10">
                                        <input id="in_company" data-id data-oldid style="width: 200px;" placeholder="请输入汇款的公司或者个人"/>
                                        <div id="in_banks"></div>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label >利息计算方式：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <label id="label_interest_type"></label>
                                    </div>

                                    <div class="form-label col-md-2">
                                        <label style="background-color: #ffbe00;">剩余金额：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text" id="remain_money" readonly="readonly" placeholder="自动计算余额"/>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="content-box box-toggle " id="invest_div">
                                        <div class="content-box-header primary-bg">
                                            <span class="float-left">投资款——款项性质：</span>
                                            <a href="#" class="float-right icon-separator btn toggle-button" title="投资款——款项性质：">
                                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                                            </a>

                                            <%--<input type="checkbox" id="main_money" name="target_type" value="main_money"> 本金--%>
                                            <%--<input type="checkbox" id="manage_money" name="target_type" value="manage_money"> 管理费 <label id="label_manage_per"></label>--%>
                                            <%--<input type="checkbox" id="community_money" name="target_type" value="community_money"> 渠道费 <label id="label_community_per"></label>--%>
                                            <%--<input type="checkbox" id="interest_money" name="target_type" value="interest_money"> 第一年利息 <label id="label_interest_per"></label>--%>
                                            <%--<input type="checkbox" id="over_money" name="target_type" value="over_money"> 逾期利息--%>
                                            <%--<input type="checkbox" id="penalty_money" name="target_type" value="penalty_money"> 违约金 <label id="label_penalty_per"></label>--%>
                                        </div>
                                        <div class="content-box-wrapper">
                                            <table class="table table-hover table-striped text-center mrg0B" id="pay_records_table">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">选择</th>
                                                    <th class="text-center">编号</th>
                                                    <th class="text-center">汇款日期</th>
                                                    <th class="text-center">汇款金额</th>
                                                    <th class="text-center">应收管理费</th>
                                                    <th class="text-center">应收渠道费</th>
                                                    <th class="text-center">应收违约金</th>
                                                    <th class="text-center">应收利息</th>
                                                    <th class="text-center">逾期利息费</th>
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
                                    <div class="content-box box-toggle " id="borrow_div">
                                        <div class="content-box-header primary-bg">
                                            <span class="float-left">借款——款项性质：</span>
                                            <a href="#" class="float-right icon-separator btn toggle-button" title="借款——款项性质：">
                                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                                            </a>

                                            <%--<input type="checkbox" id="main_money2" name="target_type" value="main_money"> 本金--%>
                                            <%--<input type="checkbox" id="over_money2" name="target_type" value="over_money"> 逾期利息--%>
                                            <%--<input type="checkbox" id="penalty_money2" name="target_type" value="penalty_money"> 违约金 <label id="label_penalty_per2"></label>--%>
                                            <%--<input type="checkbox" id="borrow_money" name="target_type" value="borrow_money"> 借款利息 <label id="label_borrow_per"></label>--%>
                                        </div>

                                        <div class="content-box-wrapper">
                                            <table class="table table-hover table-striped text-center mrg0B" id="pay_records_table2">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">选择</th>
                                                    <th class="text-center">编号</th>
                                                    <th class="text-center">汇款日期</th>
                                                    <th class="text-center">汇款金额</th>
                                                    <th class="text-center">应收违约金</th>
                                                    <th class="text-center">应收借贷费</th>
                                                    <th class="text-center">逾期利息费</th>
                                                    <th class="text-center">投资天数</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row pad3B">
                                    <div class="form-label col-md-12">
                                        <button class="but-ui btn primary-bg large" type="button" id="add_receive">
                                            <span class="button-content" >添加</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<script type="text/javascript" src="/js/new_receive_record.js"></script>
</body>
</html>