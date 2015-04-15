<%--
  Created by IntelliJ IDEA.
  User: William.Wei
  Date: 2015/4/1
  Time: 18:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>付款通知书</title>
    <style type="text/css" rel="stylesheet" media="print">
        .print { width: 100%; margin: 0;}
    </style>
    <style type="text/css" rel="stylesheet" media="screen">
        .print { width: 700px; margin: 50px auto;  border: 1px dashed #CCC; border-radius: 3px;}
    </style>

</head>
<body>
<div id="print"></div>
<script type="text/javascript">
    (function(){
        var print=$("#print"),idStr= $.utils.getParam("id"),filter={};
        if(idStr){
            print.empty();
            var PayRecord=$.project.domain(idStr,"com.jsy.project.PayRecord");
            var TSProject=$.project.domain(idStr,"com.jsy.project.TSProject");
            var BankAccount=$.project.domain(idStr,"com.jsy.bankConfig.BankAccount");
            var Fund=$.project.domain(idStr,"com.jsy.fundObject.Fund");
            var FundCompanyInformation=$.project.domain(idStr,"com.jsy.fundObject.FundCompanyInformation");

            var item=PayRecord.getItem(idStr);
            var project = TSProject.getItem(item.project.id);
            var bankAccount = BankAccount.getItem(item.bankAccount.id);
            var fund = Fund.getItem(item.fund.id);
            var company = FundCompanyInformation.getItem(fund.funcCompany.id);
            if(project){
                item.manage_per= project.manage_per;
                item.community_per= project.community_per;
                item.interest_per= project.interest_per;
            }
            if(bankAccount){
                item.bankName=bankAccount.bankName;
                item.bankOfDeposit=bankAccount.bankOfDeposit;
                item.accountName=bankAccount.accountName;
                item.account=bankAccount.account;
            }
            if(company){
                item.companyName=company.companyName;
            }
            item.shouldPayBackSomeDate = new Date(item.payDate).addDay(2);
            console.log(item);
            $("#print").renderURI("/templates/payReport.html",item);
        }
    })();
</script>
</body>
</html>
