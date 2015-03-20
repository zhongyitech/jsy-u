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

                    <div class='tabbed_content'>
                        <div class='tabs'><!--$(.tabs span.current).ini("index")-->
                           <div class='moving_bg'> &nbsp; </div>
                           <span class='tab_item current'>资料采集</span>
                           <span class='tab_item'> 资料评判 </span>
                           <span class='tab_item'> 现场考察（方案确定）</span>
                           <span class='tab_item'> 现场考察(OA审核) </span>
                           <span class='tab_item'> 投决会 </span>
                           <span class='tab_item'> 第三方法律机构 </span>
                           <span class='tab_item'> 项目合同 </span>
                        </div>

                        <div class='slide_content'>
                            <div class='tabslider'>
                                <ul>
                                    <div class="content-box box-toggle t1">
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                    <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                    <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t2">
                                        <table id = "xianshi_table2" class="table text-center mrg0B xianshi_table" >
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t3">
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t4">
                                        <table id = "xianshi_table4" class="table text-center mrg0B xianshi_table" >
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t5">
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
                                        </table>
                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t6">
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                                <ul>
                                    <div class="content-box box-toggle t7">
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
                                        </table>

                                        <div class="button-pane">
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-remove">
                                                <span class="button-content">删除选中行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-add">
                                                <span class="button-content">增加一行</span></button>
                                            <button type="button"
                                                    class="btn-ui btn bg-green large medium float-right mrg10L setting-save">
                                                <span class="button-content">保存</span></button>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="../js/project_limittime_set.js"></script>
</body>
</html>
