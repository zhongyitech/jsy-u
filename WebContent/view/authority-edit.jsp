<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <title>编辑权限</title>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/authority-edit.css">
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle" id="role-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">角色信息</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="view-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label class="label-description">(*)角色名称：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="name-input" disabled="disabled">
                            </div>

                            <div class="form-label col-md-2">
                                <label for="" class="label-description">(*)权限:</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input placeholder="必填" type="text" id="authority-input" disabled="disabled">
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>
            </div>

            <div class="content-box box-toggle" id="fund-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">基金权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="view-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="">操作权限：</label>
                            </div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="fund-create-input">
                                <label for="">新增</label>

                                <input type="checkbox" name="" id="">
                                <label for="">删除</label>

                                <input type="checkbox" name="" id="">
                                <label for="">修改</label>

                                <input type="checkbox" name="" id="">
                                <label for="">查看</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="">字段权限：</label>
                            </div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="">
                                <label for="">编号</label>

                                <input type="checkbox" name="" id="">
                                <label for="">基金名称</label>

                                <input type="checkbox" name="" id="">
                                <label for="">预募规模</label>

                                <input type="checkbox" name="" id="">
                                <label for="">实募金额</label>

                                <input type="checkbox" name="" id="">
                                <label for="">季付募集规模</label>

                                <input type="checkbox" name="" id="">
                                <label for="">季付实募</label>

                                <input type="checkbox" name="" id="">
                                <label for="">半年付募集规模</label>

                                <input type="checkbox" name="" id="">
                                <label for="">半年付实募</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2"></div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="">
                                <label for="">年付募集规模</label>

                                <input type="checkbox" name="" id="">
                                <label for="">年付实募</label>

                                <input type="checkbox" name="" id="">
                                <label for="">状态</label>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>

                <div class="button-pane" id="menu">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span
                            class="button-content">提交</span></button>
                </div>
            </div>

            <div class="content-box box-toggle" id="investment-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">投资档案权限</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="view-form">
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="">操作权限：</label>
                            </div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="">
                                <label for="">新增</label>

                                <input type="checkbox" name="" id="">
                                <label for="">删除</label>

                                <input type="checkbox" name="" id="">
                                <label for="">修改</label>

                                <input type="checkbox" name="" id="">
                                <label for="">查看</label>

                                <input type="checkbox" name="" id="">
                                <label for="">打印</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label for="">字段权限：</label>
                            </div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="">
                                <label for="">档案编号</label>

                                <input type="checkbox" name="" id="">
                                <label for="">合同编号</label>

                                <input type="checkbox" name="" id="">
                                <label for="">基金名称</label>

                                <input type="checkbox" name="" id="">
                                <label for="">认购人</label>

                                <input type="checkbox" name="" id="">
                                <label for="">认购日期</label>

                                <input type="checkbox" name="" id="">
                                <label for="">认购金额</label>

                                <input type="checkbox" name="" id="">
                                <label for="">认购期限</label>

                                <input type="checkbox" name="" id="">
                                <label for="">理财经理</label>

                                <input type="checkbox" name="" id="">
                                <label for="">地区</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2"></div>
                            <div class="form-checkbox-radio col-md-10">
                                <input type="checkbox" name="" id="">
                                <label for="">年化收益率</label>

                                <input type="checkbox" name="" id="">
                                <label for="">付息方式</label>

                                <input type="checkbox" name="" id="">
                                <label for="">到期日期</label>

                                <input type="checkbox" name="" id="">
                                <label for="">已付利息</label>

                                <input type="checkbox" name="" id="">
                                <label for="">已付本金</label>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                </div>

                <div class="button-pane" id="menu">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span
                            class="button-content">提交</span></button>
                </div>
            </div>

        </div>

    </div>

</div>
<script type="text/javascript" src="../js/authority-edit.js"></script>
</body>
</html>