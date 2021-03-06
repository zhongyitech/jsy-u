<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2015/3/16
  Time: 13:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="./head.jsp"/>

    <link rel="stylesheet" type="text/css" href="../css/fund-list.css">
    <link rel="stylesheet" type="text/css" href="../css/project.css">
    <link rel="stylesheet" type="text/css" href="../css/project_limittime_setting.css">
    <title>项目访问时间限制设置</title>
</head>
<body>
    <div id="page-wrapper">
        <jsp:include page="./navi.jsp"/>
        <div id="page-content-wrapper">
            <div id="page-content" class="page-view pad25T">
                <div class="content-box box-toggle ">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">限制设置项</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="限制设置项">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <div style="width: 900px;height: 500px;" id="item_settingPanel">
                            <div class="form-row">
                                <div class="tabs">
                                    <ul>
                                        <li>
                                            <a href="#normal-tabs-1" title="项目部负责并填写">
                                                资料采集
                                            </a>
                                        </li>
                                        <%--<li>--%>
                                            <%--<a href="#normal-tabs-2" title="OA审核">--%>
                                                <%--资料评判--%>
                                            <%--</a>--%>
                                        <%--</li>--%>
                                        <li>
                                            <a href="#normal-tabs-3" title="项目部负责发起申请，法务部，财务部配合">
                                                现场考察（方案确定)
                                            </a>
                                        </li>
                                        <%--<li>--%>
                                            <%--<a href="#normal-tabs-4" title="OA审核">--%>
                                                <%--现场考察(OA审核)--%>
                                            <%--</a>--%>
                                        <%--</li>--%>
                                        <li>
                                            <a href="#normal-tabs-5" title="项目部负责发起申请，法务部，财务部配合">
                                                投决会
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#normal-tabs-6" title="项目部负责发起申请，法务部，财务部配合">
                                                第三方法律机构
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#normal-tabs-7" title="项目部负责发起申请，法务部，财务部配合">
                                                项目合同
                                            </a>
                                        </li>
                                    </ul>
                                    <div id="normal-tabs-1">
                                        <div class="form-bordered">
                                            <div class="form-row t1">
                                                <table id = "xianshi_table1" class="table text-center mrg0B xianshi_table" >
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                                                        <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时开始时间">限时开始时间</span>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时结束时间">限时结束时间</span>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_1" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_1" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_1" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_1" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_1" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_1" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                                <div class="button-pane">
                                                    <button type="button"
                                                            class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                        <span class="button-content">保存</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div id="normal-tabs-2">--%>
                                        <%--<div class="form-bordered">--%>
                                            <%--<div class="form-row t2">--%>
                                                <%--<table id = "xianshi_table2" class="table text-center mrg0B xianshi_table" >--%>
                                                    <%--<thead>--%>
                                                    <%--<tr>--%>
                                                        <%--<th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>--%>
                                                        <%--<th class="text-center"><span class="text-overflow">用户名称</span></th>--%>
                                                        <%--<th class="text-center"><span class="text-overflow item-date"--%>
                                                                                      <%--title="限时开始时间">限时开始时间</span>--%>
                                                        <%--<th class="text-center"><span class="text-overflow item-date"--%>
                                                                                      <%--title="限时结束时间">限时结束时间</span>--%>
                                                    <%--</tr>--%>
                                                    <%--</thead>--%>
                                                <%--</table>--%>

                                                <%--<div class="button-pane">--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">--%>
                                                        <%--<span class="button-content">删除选中行</span></button>--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-add">--%>
                                                        <%--<span class="button-content">增加一行</span></button>--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-save">--%>
                                                        <%--<span class="button-content">保存</span></button>--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                        <%--</div>--%>

                                    <%--</div>--%>
                                    <div id="normal-tabs-3">
                                        <div class="form-bordered">
                                            <div class="form-row t3">
                                                <table id = "xianshi_table3" class="table text-center mrg0B xianshi_table" >
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                                                        <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时开始时间">限时开始时间</span>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时结束时间">限时结束时间</span>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_3" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_3" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_3" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_3" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_3" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_3" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div class="button-pane">
                                                    <button type="button"
                                                            class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                        <span class="button-content">保存</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div id="normal-tabs-4">--%>
                                        <%--<div class="form-bordered">--%>
                                            <%--<div class="form-row t4">--%>
                                                <%--<table id = "xianshi_table4" class="table text-center mrg0B xianshi_table" >--%>
                                                    <%--<thead>--%>
                                                    <%--<tr>--%>
                                                        <%--<th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>--%>
                                                        <%--<th class="text-center"><span class="text-overflow">用户名称</span></th>--%>
                                                        <%--<th class="text-center"><span class="text-overflow item-date"--%>
                                                                                      <%--title="限时开始时间">限时开始时间</span>--%>
                                                        <%--<th class="text-center"><span class="text-overflow item-date"--%>
                                                                                      <%--title="限时结束时间">限时结束时间</span>--%>
                                                    <%--</tr>--%>
                                                    <%--</thead>--%>
                                                <%--</table>--%>

                                                <%--<div class="button-pane">--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">--%>
                                                        <%--<span class="button-content">删除选中行</span></button>--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-add">--%>
                                                        <%--<span class="button-content">增加一行</span></button>--%>
                                                    <%--<button type="button"--%>
                                                            <%--class="btn-ui btn bg-green large medium float-right mrg10L setting-save">--%>
                                                        <%--<span class="button-content">保存</span></button>--%>
                                                <%--</div>--%>
                                            <%--</div>--%>
                                        <%--</div>--%>

                                    <%--</div>--%>
                                    <div id="normal-tabs-5">
                                        <div class="form-bordered">
                                            <div class="form-row t5">
                                                <table id = "xianshi_table5" class="table text-center mrg0B xianshi_table" >
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                                                        <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时开始时间">限时开始时间</span>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时结束时间">限时结束时间</span>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_5" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_5" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_5" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_5" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_5" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_5" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="button-pane">
                                                    <button type="button"
                                                            class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                        <span class="button-content">保存</span></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div id="normal-tabs-6">
                                        <div class="form-bordered">
                                            <div class="form-row t6">
                                                <table id = "xianshi_table6" class="table text-center mrg0B xianshi_table" >
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                                                        <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时开始时间">限时开始时间</span>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时结束时间">限时结束时间</span>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_6" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_6" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_6" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_6" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" name="checkbox"></td>
                                                            <td><div class="form-input "><input name="accessor_6" data-id data-oldid class="form-data-field" ></div></td>
                                                            <td><div class="form-input "><input name="fromDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                            <td><div class="form-input "><input name="toDate_6" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div class="button-pane">
                                                    <button type="button"
                                                            class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                        <span class="button-content">保存</span></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div id="normal-tabs-7">
                                        <div class="form-bordered">
                                            <div class="form-row t7">
                                                <table id = "xianshi_table7" class="table text-center mrg0B xianshi_table" >
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                                                        <th class="text-center"><span class="text-overflow">用户名称</span></th>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时开始时间">限时开始时间</span>
                                                        <th class="text-center"><span class="text-overflow item-date"
                                                                                      title="限时结束时间">限时结束时间</span>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td><input type="checkbox" name="checkbox"></td>
                                                        <td><div class="form-input "><input name="accessor_7" data-id data-oldid class="form-data-field" ></div></td>
                                                        <td><div class="form-input "><input name="fromDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        <td><div class="form-input "><input name="toDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" name="checkbox"></td>
                                                        <td><div class="form-input "><input name="accessor_7" data-id data-oldid class="form-data-field" ></div></td>
                                                        <td><div class="form-input "><input name="fromDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        <td><div class="form-input "><input name="toDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" name="checkbox"></td>
                                                        <td><div class="form-input "><input name="accessor_7" data-id data-oldid class="form-data-field" ></div></td>
                                                        <td><div class="form-input "><input name="fromDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        <td><div class="form-input "><input name="toDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" name="checkbox"></td>
                                                        <td><div class="form-input "><input name="accessor_7" data-id data-oldid class="form-data-field" ></div></td>
                                                        <td><div class="form-input "><input name="fromDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        <td><div class="form-input "><input name="toDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" name="checkbox"></td>
                                                        <td><div class="form-input "><input name="accessor_7" data-id data-oldid class="form-data-field" ></div></td>
                                                        <td><div class="form-input "><input name="fromDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                        <td><div class="form-input "><input name="toDate_7" class="form-data-field col-md-12 tcal tcalInput" ></div></td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                                <div class="button-pane">
                                                    <button type="button"
                                                            class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                        <span class="button-content">保存</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="../js/project_limittime_setting.js"></script>
</body>
</html>
