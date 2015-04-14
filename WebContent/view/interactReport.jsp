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
    <title>往来询证函</title>
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

            $.io.get({url:'/api/fund/getInteract',params:{fundid:idStr}}).success(function(result){
                console.log(result);
                $("#print").renderURI("/templates/interactReport.html",result);
            });

        }
    })();
</script>
</body>
</html>
