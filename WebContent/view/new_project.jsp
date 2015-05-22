<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="head.jsp"/>
    <%--<link rel="stylesheet" href="./bootstrap/css/bootstrap.css"/>--%>
<%--<link rel="stylesheet" href="/css/project.css"/>--%>
    <title>新建项目</title>
</head>

<body>

<div id="page-wrapper">
    <jsp:include page="./navi.jsp"></jsp:include>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle">
                <div class="content-box-header primary-bg">
                    <span class="float-left">新建项目</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="新建项目">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div style="width: 900px" id="item_settingPanel">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-label col-md-3   ">
                                    <label > 项目方：<span class="required">*</span> </label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" id="projectdealer"/>
                                </div>
                                <div class="form-label col-md-3  ">
                                    <label > 项目名称： <span class="required">*</span></label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" id="projectname" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-3   ">
                                    <label > 项目负责人：<span class="required">*</span></label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" id="inchargerName" placeholder="自动联想"/>
                                    <input type="hidden" id="incharger"/>
                                    <input type="hidden" id="creator"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-3">
                                    <label class="font-size-20">备注：</label>
                                </div>
                                <div class="form-input col-md-9">
                                    <textarea name="input_text" id="description" class="small-textarea"></textarea>
                                </div>
                            </div>
                            <div style="height: 20px">
                            </div>

                            <div class="form-row">
                                <div class="tabs">
                                    <ul>
                                        <li>
                                            <a href="#normal-tabs-1" title="Tab 1">
                                                结构
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#normal-tabs-2" title="Tab 2">
                                                股权
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#normal-tabs-3" title="Tab 3">
                                                债务+资产
                                            </a>
                                        </li>
                                    </ul>
                                    <div id="normal-tabs-1">
                                        <div class="form-bordered">
                                            <div class="form-row">
                                                <div class="form-label col-md-3">
                                                    <label >董事：</label>
                                                </div>

                                                <div class="form-input col-md-3">
                                                    <input type="text" id="director"/>
                                                </div>
                                                <div class="form-label col-md-3   ">
                                                    <label >监事：</label>
                                                </div>
                                                <div class="form-input col-md-3">
                                                    <input type="text"  id="supervisor"/>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-label col-md-3">
                                                    <label class="font-size-20">股干人员架构：</label>
                                                </div>
                                                <div class="form-input col-md-9">
                                                    <textarea name="input_text" class="small-textarea" id="stockStructure"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="normal-tabs-2">
                                        <div class="form-bordered">
                                            <div class="form-row">
                                                <div class="form-input col-md-2">
                                                    <label class="sr-only" for="stockDate">时间</label>
                                                </div>
                                                <div class="form-input col-md-3">
                                                    <input class="tcal filter-input" id="stockDate" />
                                                </div>
                                                <div class="form-input col-md-2">
                                                    <label class="sr-only" for="structure">股份结构</label>
                                                </div>
                                                <div class="form-input col-md-3">
                                                    <input class="form-control" id="structure" placeholder="股份结构">
                                                </div>
                                                <div class="form-input col-md-2">
                                                    <button class="but-ui btn primary-bg large" id="addStock">添加</button>
                                                </div>
                                            </div>


                                            <div class="form-row">
                                                <div class="panel-body">
                                                    <table class="table table-hover table-striped text-center mrg0B" id="stock_table">
                                                        <thead>
                                                        <tr>
                                                            <th class="text-center">编号</th>
                                                            <th class="text-center">时间</th>
                                                            <th class="text-center">股份结构</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div id="normal-tabs-3">
                                        <div class="form-bordered">
                                            <div class="form-row">
                                                <div class="form-label col-md-3">
                                                    <label class="font-size-20">债务：</label>
                                                </div>
                                                <div class="form-input col-md-9">
                                                    <textarea name="input_text" class="small-textarea" id="debt"></textarea>
                                                </div>
                                            </div>

                                            <div class="form-row">
                                                <div class="form-label col-md-3">
                                                    <label class="font-size-20">资产：</label>
                                                </div>
                                                <div class="form-input col-md-9">
                                                    <textarea name="input_text" class="small-textarea" id="assets"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <%--不能删除 否则有问题--%>
                            <div class="form-row">
                                <div id="tab">
                                    <div class="tabList">
                                        <ul>
                                        </ul>
                                    </div>
                                    <div class="tabCon">
                                        <div class="cur" id="home">

                                        </div>
                                        <div class="panel panel-default">

                                        </div>
                                        <div role="tabpanel" class="tab-pane" id="messages">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <%--end--%>

                            <div class="form-row">
                                <div class="form-label col-md-12">
                                    <label class="font-size-20">附件：</label>
                                </div>
                            </div>
                            <div class="form-row">
                                <div>
                                    <table class="item-table" id="fileupdate">
                                        <thead>
                                        <tr>
                                            <th class="text-left"><input type="button" id="add_file" value="添加附件" style="width: 100px;"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-left">
                                                <input id="invest-attachment1" class="input-file" name="attachment" type="file">
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="form-input col-md-10" id="pics">
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button" id="add-project">
                                        <span class="button-content" >添加项目</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/new_project.js"></script>
<%--<script type="text/javascript" src="/view/bootstrap/bootstrap.min.js"></script>--%>
</body>
</html>