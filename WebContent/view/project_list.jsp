<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/fund-list.css">
    <link rel="stylesheet" type="text/css" href="/css/project.css">
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
    <title>项目列表</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目列表</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="项目信息维护及管理">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div style="width: 900px" id="item_settingPanel">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-label col-md-3">
                                    <label  for="">项目单号</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input type="text" class="form-control" id="project_id" placeholder="项目单号">
                                </div>
                                <div class="form-label col-md-2">
                                    <label  for="">项目名称</label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" class="form-control" id="project_name" placeholder="项目名称">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-3   ">
                                    <label  for="">基金名称</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input type="text" class="form-control" id="fund_name" placeholder="基金名称">
                                </div>
                                <div class="form-label col-md-2   ">
                                    <label for="">项目负责人</label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" class="form-control" id="project_incharge_name" placeholder="项目负责人">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label">
                                    <label>
                                        <input type="checkbox" id="archived"> 归档的结算项目
                                    </label>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label">
                                    <button type="button" class="btn-ui btn bg-green large medium" id="search_btn">查  询</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="content-box-wrapper">

                    <div id="table-pager" class="page-bar pad0R"></div>

                    <table class="table table-striped text-center mrg0B" id="project-table">
                        <thead>
                        <tr>
                            <th class="text-center">编号</th>
                            <th class="text-center">项目名称</th>
                            <th class="text-center">关联基金</th>
                            <th class="text-center">当前阶段</th>
                            <th class="text-center">创建人</th>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">限时访问设置</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <div class="theme-popover">
                        <div class="content-box-wrapper theme-poptit">
                            <a href="javascript:;" title="关闭" class="close">×</a>
                            <h4>限时设置</h4>
                        </div>
                        <div class="page-view">
                            <div class="content-box box-toggle ">
                                <table class="table text-center mrg0B" id="xianshi_table">
                                    <th class="text-center"><span class="text-overflow"><input type="checkbox"></span></th>
                                    <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                    <th class="text-center"><span class="text-overflow item-date"
                                                                  title="限时开始时间">限时开始时间</span>
                                    <th class="text-center"><span class="text-overflow item-date"
                                                                  title="限时结束时间">限时结束时间</span>
                                </table>

                                <div class="button-pane">
                                    <button type="button"
                                            class="btn-ui btn bg-green large medium float-right mrg10L"
                                            id="setting-remove"><span class="button-content">删除选中行</span></button>
                                    <button type="button"
                                            class="btn-ui btn bg-green large medium float-right mrg10L"
                                            id="setting-add"><span class="button-content">增加一行</span></button>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div class="theme-popover-mask"></div>

                </div>
            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="/js/project_list.js"></script>
</body>
</html>