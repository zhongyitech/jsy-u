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
  <title>打印</title>
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
      var idArray=idStr.split(","),
      xhr=$.project.domain(idArray,"com.jsy.archives.InvestmentArchives");
      $.each(idArray,function(idx,id){
        var item=xhr.getItem(id);
        if(!item||item=="")return;
        if(item.id&&!filter[item.id]) filter[item.id]=$("<div>").prop("id","print-"+item.id).addClass("print").appendTo(print);
        item.fundName=$.project.domain(item.fund.id,"com.jsy.fundObject.Fund","fundName").getItem(item.fund.id).fundName;
        $.io.post({url:'/api/investmentArchives/getPayTimes',entity:{date:DATEFORMAT.toRest(item['rgrq']),qx:item['tzqx'],fxfs:item['fxfs']}}).success(function(result){
          item.items=result;
          filter[item.id].renderURI("/templates/report_1.html",item);
          $("div").renderURI("/templates/report_1.html",item);
        });
      });
    }
  })();
</script>
</body>
</html>
