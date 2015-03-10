<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>新建收款记录</title>
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
</head>

<body class="jsy-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->

        <section id="dropdowns">
            <div class="page-header">
                <h1>新建收款记录</h1>
            </div>
            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label>基金名称：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <input type="text" id="fundname" placeholder="输入自动查询"/>
                        <input type="hidden" id="_fundname" placeholder="输入自动查询"/>
                    </div>
                    <div class="form-label col-md-2">
                        <label>项目名称：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <select id="project"></select>
                    </div>

                </div>
                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label for="">付款日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="paydate" class="tcal filter-input" type="text" />
                    </div>
                    <div class="form-label col-md-2">
                        <label for="">付款金额：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paytotal"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label>银行账户：</label>
                    </div>
                    <div id="banklist" class="form-input col-md-10">

                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label for="">款项性质：</label>
                    </div>
                    <div class="form-input col-md-8">
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox1" value="option1"> 本金
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox4" value="option3"> 管理费 <label id="label_manage_per"></label>
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox5" value="option3"> 渠道费 <label id="label_community_per"></label>
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox2" value="option2"> 第一年利息 <label id="label_interest_per"></label>
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox6" value="option3"> 逾期利息
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox7" value="option3"> 违约金 <label id="label_penalty_per"></label>
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox8" value="option3"> 借款 <label id="label_borrow_per"></label>
                        </label>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="table table-striped text-center mrg0B" id="pay_records_table">
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
                                <th class="text-center">应收借贷费</th>
                                <th class="text-center">投资天数</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>






                <div class="form-row pad3B">
                    <div>
                        <button class="but-ui btn primary-bg large" type="button">
                            <span class="button-content" id="add-project">添加</span>
                        </button>
                    </div>
                </div>
            </form>
        </section>

    </div>
</div>
<script type="text/javascript" src="../js/new_receive_record.js"></script>
</body>
</html>