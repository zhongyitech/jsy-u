<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>档案管理-档案入库</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" style="width: 700px">
            <div>
                <h3>新建档案</h3>
            </div>
            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">档案条码：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>

                    <div class="form-label col-md-2  ">
                        <label for="">档案号：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">档案名称：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="">档案类型：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <select></select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">合同编号：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="">合同名称： </label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">项目名称： </label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="">基金名称： </label>
                    </div>
                    <div class="form-input col-md-4">
                        <select id="fundselect">
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tname">签约方： </label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">签约日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tnubmer">称交人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tnubmer">移交日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">档案室 ：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <select id="fundselect">
                        </select>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="">档案柜编号：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" name="input_newamount" id="input_newamount">
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">备注：</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-10">
                        <textarea name="input_text" id="" class="small-textarea"></textarea>
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
                                <th class="text-left">文件名称</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-left"><input name="file" type="file"/></td>
                                <td><input type="button" value="删除"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>

                <div class="form-row pad3B">
                    <div>
                        <button class="but-ui btn primary-bg large" type="button">
                            <span class="button-content">保存档案</span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>