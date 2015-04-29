<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>项目结算</title>
</head>

<body class="jsy-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目结算</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="项目结算">
                    <i class="glyph-icon icon-toggle icon-chevron-down"></i></a>
                </div>
                <div class="content-box-wrapper">
                    <div style="width: 900px" id="item_settingPanel">
                        <form class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-label col-md-3">
                                    <label >基金名称：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input type="text" id="fundname" placeholder="输入自动查询"/>
                                    <input type="hidden" id="_fundname" placeholder="输入自动查询"/>
                                </div>
                                <div class="form-label col-md-2">
                                    <label >项目名称：</label>
                                </div>
                                <div class="form-input col-md-3">
                                    <input type="text" id="projectname" readonly="readonly"/>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-12">
                                    <label  class="font-size-20">附件：</label>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-12">
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
                                    <label  class="font-size-20">备注：</label>
                                </div>
                                <div class="form-input col-md-12">
                                    <textarea name="input_text" id="description" class="small-textarea"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-12">
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" id="end-project">提交</span>
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
<script type="text/javascript" src="../js/end_project.js"></script>
</body>
</html>