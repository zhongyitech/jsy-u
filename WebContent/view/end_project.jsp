<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css"/>
    <title>项目结算</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <section id="dropdowns">
            <div class="page-header">
                <h1>项目结算</h1>
            </div>
            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label for="">项目：</label>
                    </div>

                    <div class="form-input col-md-4">
                        <input type="text" id="projectname" placeholder="输入自动查询"/>
                    </div>
                    <div class="form-label col-md-2">
                        <label for="">基金：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="paydate"/>
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
                                <th class="text-left"><input type="button" id="add_file" value="添加附件"
                                                             style="width: 100px;"></th>
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


                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">备注：</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-10">
                        <textarea name="input_text" id="description" class="small-textarea"></textarea>
                    </div>
                </div>

                <div class="form-row pad3B">
                    <div>
                        <button class="but-ui btn primary-bg large" type="button">
                            <span class="button-content" id="add-project">添加</span>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </div>
</div>
<script type="text/javascript" src="/js/new_project.js"></script>
</body>
</html>