<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"></jsp:include>
    <script type="text/javascript" src="./new_receive_record.js"></script>
    <script type="text/javascript" src="../jquery/jquery.autocomplete.js"></script>
    <title>新建收款记录</title>
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
</head>
<link rel="stylesheet" type="text/css" href="autocomplete.css"/>

<body class="jsy-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"></jsp:include>
    <div id="page-content-wrapper">
        <!-- #page-title -->

        <section id="dropdowns">
            <div class="page-header">
                <h1>新建收款记录</h1>
            </div>
            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">项目名称：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <input type="text" id="projectname" placeholder="输入自动查询"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">基金名称：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <input type="text" id="fundname" placeholder="输入自动查询"/>
                    </div>

                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">付款日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paydate"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">付款金额：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paytotal"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">款项性质：</label>
                    </div>
                    <div class="form-input col-md-8">
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox1" value="option1"> 本金
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox2" value="option2"> 第一年利息
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox4" value="option3"> 管理费
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox5" value="option3"> 渠道费
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox6" value="option3"> 逾期利息
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox7" value="option3"> 违约金
                        </label>
                        <label class="checkbox ">
                            <input type="checkbox" id="inlineCheckbox8" value="option3"> 借款
                        </label>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-body">
                        <table class="table table-striped text-center mrg0B" id="funds-table">
                            <thead>
                            <tr>
                                <th class="text-center">选择</th>
                                <th class="text-center">编号</th>
                                <th class="text-center">付款日期</th>
                                <th class="text-center">投资金额</th>
                                <th class="text-center">应收利息</th>
                                <th class="text-center">应收管理费</th>
                                <th class="text-center">应收渠道费</th>
                                <th class="text-center">投资天数</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input type="checkbox"/></td><td>1</td><td>2015-06-09</td><td>￥200,0000</td><td>105</td><td>500</td><td>500</td><td>700天</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td><td>2</td><td>2015-06-09</td><td>￥200,0000</td><td>105</td><td>500</td><td>500</td><td>700天</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td><td>3</td><td>2015-06-09</td><td>￥200,0000</td><td>105</td><td>500</td><td>500</td><td>700天</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td><td>4</td><td>2015-06-09</td><td>￥200,0000</td><td>105</td><td>500</td><td>500</td><td>700天</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>




                <div class="form-row">
                    <div class="form-label col-md-2  ">
                        <label for="">付款账户：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="payaccount" placeholder="自动带出（不在合同环节中录入的）"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">付款银行：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paybank" placeholder="自动带出（不在合同环节中录入的）(下拉选择)"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2  ">
                        <label for="">付款人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="payaccount" placeholder="自动带出（不在合同环节中录入的）"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">收款人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paybank" placeholder="自动带出（不在合同环节中录入的）(下拉选择)"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2  ">
                        <label for="">收款账户：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="payaccount" placeholder="自动带出（不在合同环节中录入的）"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">收款银行：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paybank" placeholder="自动带出（不在合同环节中录入的）(下拉选择)"/>
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
</body>
</html>