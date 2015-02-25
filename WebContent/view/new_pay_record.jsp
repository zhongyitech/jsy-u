<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"></jsp:include>
    <script type="text/javascript" src="./new_pay_record.js"></script>
    <script type="text/javascript" src="../jquery/jquery.autocomplete.js"></script>
    <title>新建汇款记录</title>

</head>
<link rel="stylesheet" type="text/css" href="autocomplete.css"/>
<link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
<body class="jsy-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"></jsp:include>
    <div id="page-content-wrapper">
        <!-- #page-title -->
            <section id="dropdowns">
                <div class="page-header">
                    <h1>新建汇款记录</h1>
                </div>
                <form class="form-bordered " action="/" method="post">
                    <div class="form-row">
                        <div class="form-label col-md-2   ">
                            <label for="">基金名称：</label>
                        </div>

                        <div class="form-input col-md-4">
                            <input type="text" id="fundname" placeholder="输入自动查询"/>
                            <input type="hidden" id="fundid"/>
                        </div>
                        <div class="form-label col-md-2   ">
                            <label for="">项目名称：</label>
                        </div>

                        <div class="form-input col-md-4">
                            <input type="text" id="projectname" placeholder="输入自动查询"/>
                            <input type="hidden" id="projectid"/>
                        </div>

                    </div>
                    <div class="form-row">
                        <div class="form-label col-md-2   ">
                            <label for="">付款日期：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input class="tcal filter-input" id="paydate" />
                        </div>
                        <div class="form-label col-md-2   ">
                            <label for="">投资金额($)：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text" id="paytotal"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2   ">
                            <label for="">款项性质：</label>
                        </div>
                        <div class="form-input col-md-4">
                                <label>
                                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="invest" checked style="height: 2em;">
                                    投资款
                                </label>
                                <label>
                                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="borrow" style="height: 2em;">
                                    借款
                                </label>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2  ">
                            <label for="">付款账户：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）" readonly="readonly"/>
                        </div>
                        <div class="form-label col-md-2   ">
                            <label for="">付款银行：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）(下拉选择)" readonly="readonly"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2  ">
                            <label for="">付款人：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）" readonly="readonly"/>
                        </div>
                        <div class="form-label col-md-2   ">
                            <label for="">收款人：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）(下拉选择)" readonly="readonly"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2  ">
                            <label for="">收款账户：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）" readonly="readonly"/>
                        </div>
                        <div class="form-label col-md-2   ">
                            <label for="">收款银行：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text"  placeholder="自动带出（不在合同环节中录入的）(下拉选择)" readonly="readonly"/>
                        </div>
                    </div>




                    <div class="form-row pad3B">
                        <div>
                            <button class="but-ui btn primary-bg large" type="button">
                                <span class="button-content" id="add-pay-record">添加</span>
                            </button>
                        </div>
                    </div>
                </form>

            </section>

    </div>
</div>
</body>
</html>