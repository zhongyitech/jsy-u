<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>新建汇款记录</title>
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
            <section id="dropdowns">
                <div class="page-header">
                    <h1>新建汇款记录</h1>
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
                            <label>付款日期：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input class="tcal filter-input" id="paydate"/>
                        </div>
                        <div class="form-label col-md-2">
                            <label>投资金额：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <input type="text" id="paytotal"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>款项性质：</label>
                        </div>
                        <div class="form-input col-md-4">
                                <label>
                                    <input type="radio" name="moneyUseType" id="moneyUsepay" value="invest" checked  style="height: 16px;width: 16px; position: relative;top: 3px;">
                                    投资款
                                </label>
                                <label>
                                    <input type="radio" name="moneyUseType" id="moneyUseborrow" value="borrow" style="height: 16px;width: 16px;position: relative;top: 3px;">
                                    借款
                                </label>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>银行账户：</label>
                        </div>
                        <div id="banklist" class="form-input col-md-10">

                        </div>
                    </div>


                    <div class="form-row pad3B">
                        <div>
                            <button class="but-ui btn primary-bg large" type="button">
                                <span class="button-content" id="add_pay_record">添加</span>
                            </button>
                        </div>
                    </div>
                </form>

            </section>

    </div>
</div>
<script type="text/javascript" src="/js/new_pay_record.js"></script>
</body>
</html>