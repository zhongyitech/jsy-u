<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css"/>
    <title>档案管理-档案入库</title>
</head>

<body class="jsy-body">

<div id="page-wrapper">
    <jsp:include page="./navi.jsp"></jsp:include>

    <div id="page-content-wrapper">
        <!-- #page-title -->

        <section id="dropdowns">
            <div class="page-header">
                <h1>新建项目</h1>
            </div>

            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label for="">项目方：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <input type="text" id="projectdealer"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">项目名称：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="projectname"/>
                    </div>

                </div>
                <div class="form-row">

                    <div class="form-label col-md-2   ">
                        <label for="">项目负责人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="inchargerName"/>
                        <input type="hidden" id="incharger"/>
                        <input type="hidden" id="creator"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">备注：</label>
                    </div>
                    <div class="form-input col-md-10">
                        <textarea name="input_text" id="description" class="small-textarea"></textarea>
                    </div>
                </div>

                <div role="tabpanel">
                    <!-- Nav tabs -->
                    <ul id="mytabs" class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">结构</a></li>
                        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">股权</a></li>
                        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">债务+资产</a></li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="home">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="">董事：</label>
                                        </div>

                                        <div class="form-input col-md-4">
                                            <input type="text" id="director"/>
                                        </div>
                                        <div class="form-label col-md-2   ">
                                            <label for="">监事：</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input type="text"  id="supervisor"/>
                                        </div>

                                    </div>


                                    <div class="form-row">
                                        <div class="form-label col-md-12">
                                            <label for="" class="font-size-20">股干人员架构：</label>
                                        </div>
                                        <div class="form-input col-md-10">
                                            <textarea name="input_text" class="small-textarea" id="stockStructure"></textarea>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="profile">
                            <div class="panel panel-default">
                                <div class="form-input col-md-2">
                                    <label class="sr-only" for="stockDate">时间</label>
                                    <input class="tcal filter-input" id="stockDate" />
                                </div>
                                <div class="form-input col-md-4">
                                    <label class="sr-only" for="structure">股份结构</label>
                                    <input class="form-control" id="structure" placeholder="股份结构">
                                </div>
                                <div class="form-input col-md-2">
                                    <button class="btn btn-default" id="addStock">添加</button>
                                </div>

                                <div class="panel-body">
                                    <table class="table table-striped text-center mrg0B" id="stock_table">
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
                        <div role="tabpanel" class="tab-pane" id="messages">
                            <div class="form-row">
                                <div class="form-label col-md-12">
                                    <label for="" class="font-size-20">债务：</label>
                                </div>
                                <div class="form-input col-md-10">
                                    <textarea name="input_text" class="small-textarea" id="debt"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-12">
                                    <label for="" class="font-size-20">资产：</label>
                                </div>
                                <div class="form-input col-md-10">
                                    <textarea name="input_text" class="small-textarea" id="assets"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">附件：</label>
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
        </section>

    </div>
</div>
<script type="text/javascript" src="../js/new_project.js"></script>
<%--<script type="text/javascript" src="../view/bootstrap/bootstrap.min.js"></script>--%>
</body>
</html>