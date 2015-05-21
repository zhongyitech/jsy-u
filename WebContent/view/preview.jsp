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

        #auth_name {
            border: none;
            border-collapse: separate;
        }
        #auth_name td + td {
            border: none;
        }
    </style>
    <style type="text/css" rel="stylesheet" media="screen">
        #print {
            width: 700px;
            margin: 50px auto;
            border: 1px dashed #CCC;
            border-radius: 3px;
        }

        #auth_name {
            border: none;
            border-collapse: separate;
        }

        #auth_name td + td {
            border: none;
        }
    </style>
</head>
<body>
<div id="print" style="display: none"></div>
<script type="text/javascript">
    (function () {
        var print = $("#print"), params = $.utils.getParams(), type = params.reporttype;
        var types = ["fket", "speical_dq", "speical_undq", "th", "xt", "merger"];
        if (params.id && params.reporttype) {
            $.io.get({
                url: "/api/special/report",
                params: params
            }).success(function (data) {
                        console.log(data);
                        var templateName = types[type - 1]
                        //是退伙申请，需要判断单又GP
                        if (type == 4) {
                        }
                        //是续投申请
                        if (type == 5) {
                        }
                        print.renderURI("/templates/" + templateName + ".html", data);
                        print.show();
                    }
            ).
                    error(function () {
                        $.message.error("查询出错！");
                    });
        }
        else {
            $.message.error("参数有误！请指定参数（id、type）");
        }
    })();
</script>
</body>
</html>
