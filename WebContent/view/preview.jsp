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
        #print {
            width: 100%;
            margin: 0;
        }
    </style>
    <style type="text/css" rel="stylesheet" media="screen">
        #print {
            width: 700px;
            margin: 50px auto;
            border: 1px dashed #CCC;
            border-radius: 3px;
        }
    </style>
</head>
<body>
<div id="print" style="display: none"></div>
<script type="text/javascript">
    (function () {
        var print = $("#print"), params = $.utils.getParams(),type=params.reporttype;
        if(params.id&&params.reporttype){
            $.io.get({
                url:"/api/special/report",
                params:params
            }).success(function(data){
                console.log(data);
                print.renderURI("/templates/"+type+".html",data);
                print.show();
            }).error(function(){
                $.message.error("查询出错！");
            });
        }else{
            $.message.error("参数有误！请指定参数（id、type）");
        }
    })();
</script>
</body>
</html>
