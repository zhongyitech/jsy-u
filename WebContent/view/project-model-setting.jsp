<%--
  Created by IntelliJ IDEA.
  User: libosong
  Date: 2015/4/2
  Time: 10:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<html>
<head>
  <jsp:include page="./head.jsp"/>
  <%--<link rel="stylesheet" type="text/css" href="assets/css/minified/aui-production.min.css" />--%>
  <%--<script type="text/javascript" src="assets/js/minified/aui-production.min.js"></script>--%>
  <title>项目模板角色设置</title>
</head>
<body>
  <div id="page-wrapper">
    <jsp:include page="./navi.jsp"></jsp:include>
      <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
          <div class="content-box box-toggle ">
            <div class="content-box-header primary-bg">
                <span class="float-left">项目模板角色设置</span> <a href="#"
                                                        class="float-right icon-separator btn toggle-button"
                                                        title="项目模板角色设置"> <i
                      class="glyph-icon icon-toggle icon-chevron-down"></i>
                </a>
              </div>
            <div class="content-box-wrapper">
                <div style="width: 900px" id="item_settingPanel">

                  <div class="tabs">
                    <ul>
                      <li>
                        <a href="#normal-tabs-1" title="项目部负责并填写">
                          资料采集
                        </a>
                      </li>
                      <li>
                        <a href="#normal-tabs-2" title="OA审核">
                          资料评判
                        </a>
                      </li>
                      <li>
                        <a href="#normal-tabs-3" title="项目部负责发起申请，法务部，财务部配合">
                          现场考察（方案确定)
                        </a>
                      </li>
                      <li>
                        <a href="#normal-tabs-4" title="OA审核">
                          现场考察(OA审核)
                        </a>
                      </li>
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
                              <th class="text-center "><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center "><span class="text-overflow">角色名称</span></th>
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
                      </div>
                    </div>
                    <div id="normal-tabs-2">
                      <div class="form-bordered">
                        <div class="form-row t2">
                          <table id = "xianshi_table2" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>

                    </div>
                    <div id="normal-tabs-3">
                      <div class="form-bordered">
                        <div class="form-row t3">
                          <table id = "xianshi_table3" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>
                    </div>
                    <div id="normal-tabs-4">
                      <div class="form-bordered">
                        <div class="form-row t4">
                          <table id = "xianshi_table4" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>

                    </div>
                    <div id="normal-tabs-5">
                      <div class="form-bordered">
                        <div class="form-row t5">
                          <table id = "xianshi_table5" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>

                    </div>
                    <div id="normal-tabs-6">
                      <div class="form-bordered">
                        <div class="form-row t6">
                          <table id = "xianshi_table6" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>

                    </div>
                    <div id="normal-tabs-7">
                      <div class="form-bordered">
                        <div class="form-row t7">
                          <table id = "xianshi_table7" class="table text-center mrg0B xianshi_table" >
                            <thead>
                            <tr>
                              <th class="text-center"><span class="text-overflow"><input type="checkbox" /></span></th>
                              <th class="text-center"><span class="text-overflow">角色名称</span></th>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
  </div>

  <script type="text/javascript" src="../js/project-model-setting.js"></script>
</body>
</html>
