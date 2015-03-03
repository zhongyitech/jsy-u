<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/fund-list.css">
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
    <title>项目列表</title>
</head>

<body class="page-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle view-width">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目列表</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="项目信息维护及管理">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>


                </div>

                <div class="container-fluid">

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="project_id">项目单号</label>
                                    <input type="text" class="form-control" id="project_id" placeholder="项目单号">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="project_name">项目名称</label>
                                    <input type="text" class="form-control" id="project_name" placeholder="项目名称">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="fund_name">基金名称</label>
                                    <input type="text" class="form-control" id="fund_name" placeholder="基金名称">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="project_incharge_name">项目负责人</label>
                                    <input type="text" class="form-control" id="project_incharge_name" placeholder="项目负责人">
                                </div>

                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="archived"> 归档的结算项目
                                    </label>
                                </div>
                                <button type="button" class="btn btn-default" id="search_btn">查询</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div class="content-box-wrapper">

                    <div class="col-md-12 page-bar pad0R">
                        <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
                            <i class="glyph-icon icon-arrow-left"></i>
                        </a>
                        <div class="button-group float-left " id="model-pages"></div>
                        <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
                            <i class="glyph-icon icon-arrow-right"></i>
                        </a>
                    </div>

                    <table class="table table-striped text-center mrg0B" id="project-table">
                        <thead>
                        <tr>
                            <th class="text-center">编号</th>
                            <th class="text-center">项目名称</th>
                            <th class="text-center">关联基金</th>
                            <th class="text-center">当前阶段</th>
                            <th class="text-center">创建人</th>
                            <th class="text-center">创建时间</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../js/project_list.js"></script>
</body>
</html>