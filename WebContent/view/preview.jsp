<%--
  Created by IntelliJ IDEA.
  User: William.Wei
  Date: 2015/4/21
  Time: 10:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <jsp:include page="./head.jsp"/>
    <title>打印</title>
    <style type="text/css" rel="stylesheet" media="print">
        .print {
            width: 100%;
            margin: 0;
        }
    </style>
    <style type="text/css" rel="stylesheet" media="screen">
        .print {
            width: 700px;
            margin: 50px auto;
            border: 1px dashed #CCC;
            border-radius: 3px;
        }
    </style>
</head>
<body>
<div id="print"></div>
<script type="text/javascript">
    (function () {
        var print = $("#print"), params = $.utils.getParams(),templateURL=params.template;
        $.io.get({
            url:"",
            params:params
        }).success(function(data){
            print.renderURI(templateURL,data);
        });
    })();
</script>
</body>
</html>
