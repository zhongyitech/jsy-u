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

            var item=PayRecord.getItem(idStr);
            var project = $.project.domain(item.project.id,"com.jsy.project.TSProject").getItem(item.project.id);
            var bankAccount;
            if(item.bankAccountFrom){
                bankAccount = $.project.domain(item.bankAccountFrom.id,"com.jsy.bankConfig.BankAccount").getItem(item.bankAccountFrom.id);
            }

            var fund = $.project.domain(item.fund.id,"com.jsy.fundObject.Fund").getItem(item.fund.id);
            var company;
            if(fund && fund.funcCompany){
                company = $.project.domain(fund.funcCompany.id,"com.jsy.fundObject.FundCompanyInformation").getItem(fund.funcCompany.id);
            }


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
            }else{
                item.companyName="未确定";
            }
            item.shouldPayBackSomeDate = new Date(item.payDate).addDay(2);
            console.log(item);
            $("#print").renderURI("/templates/payReport.html",item);
        }
    })();
</script>
</body>
</html>
