<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
  <title>基金统计信息</title>
  <jsp:include page="head.jsp"/>
  <link rel="stylesheet" type="text/css" href="/css/fund-list.css"/>
</head>

<body >
<div id="page-wrapper">
  <jsp:include page="navi.jsp"/>

  <div id="page-content-wrapper">
    <div id="page-content" class="page-view pad25T">

      <div class="content-box box-toggle " id="fund-view">
        <div class="content-box-header primary-bg">
          <span id="fund_title" class="float-left">基金(safalfj)数据总览</span>
          <a href="#" class="float-right icon-separator btn toggle-button" title="编辑基金">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
          </a>
        </div>
        <div class="content-box-wrapper">
          </div>
        </div>
      <div id="fund-report" class="fund-report"></div>
    </div>
  </div>
</div>
<%--<script type="text/javascript" src="/js/fund-list.js"></script>--%>
</body>
</html>