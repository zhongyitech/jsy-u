<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <title>新增基金</title>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/fund-create.css">
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">

        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle " id="fund-view">
                <div class="content-box-header primary-bg">
                    <span class="float-left">新增基金</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="新增基金">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <div class="center-margin col-md-10" id="fund-form">
                        <div class="form-row">

                            <div class="form-label col-md-2">
                                <label>(*)基金名称：</label>
                            </div>

                            <div class="form-input col-md-10">
                                <input type="text" name="name" class="fundName">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label>(*)状态：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select name="status" class="status"></select>
                            </div>
                            <div class="form-label col-md-2">
                                <label>(*)开售日期：</label>
                            </div>

                            <div class="form-input col-md-4">
                                <input class="tcal" type="text" name="ksrq" id="startSaleDate">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label>预期募集款：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input class="" type="text" name="yqmjk">
                            </div>
                            <div class="form-label col-md-2">
                                <label>季付募集规模：</label>
                            </div>

                            <div class="form-input col-md-4">
                                <input class="" type="text" name="jfmjgm">
                            </div>

                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label>半年付募集规模：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <input class="" type="text" name="bnfmjgm"/>
                            </div>
                            <div class="form-label col-md-2">
                                <label>年付募集规模：</label>
                            </div>

                            <div class="form-input col-md-4">
                                <input class="" type="text" name="nfmjgm"/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-label col-md-2">
                                <label>关联的有限合伙：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="fundCompany" class="funcCompany">
                                </select>
                            </div>

                            <div class="form-label col-md-2">
                                <label>关联的项目：</label>
                            </div>
                            <div class="form-input col-md-4">
                                <select id="project" class="project">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <label>基金与项目的关系在项目管理模块中进行操作.</label>
                        </div>

                    </div>

                </div>

                <div style="clear:both;"></div>

            </div>

            <div class="col-md-12 pad0A clearfix">
                <div class="col-md-5 pad0L">
                    <div id="sylfw-view" class="content-box box-toggle">
                        <h3 class="content-box-header primary-bg">
                            <span class="float-left">收益率范围</span>
                            <a href="#" class="float-right icon-separator btn toggle-button" title="收益率范围">
                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                            </a>
                        </h3>

                        <div class="content-box-wrapper">
                            <table class="table text-center mrg0B" id="sylfw-table">
                                <thead>
                                <tr>
                                    <th class="text-center" width="10px"><input type="checkbox" name="checkbox"></th>
                                    <th class="text-center" colspan="3">收益范围</th>
                                    <th class="text-center " width="60px;"><span class="text-overflow">收益率</span></th>
                                    <th class="text-center" width="40px;">版本</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>

                        <div class="button-pane">
                            <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                                    id="remove-button"><span class="button-content">删除选中行</span></button>
                            <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                                    id="add-button"><span class="button-content">增加一行</span></button>
                        </div>
                    </div>
                    <div class="content-box box-toggle" id="tzqx-view">
                        <h3 class="content-box-header primary-bg">
                            <span class="float-left">投资期限</span>
                            <a href="#" class="float-right icon-separator btn toggle-button" title="投资期限">
                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                            </a>
                        </h3>

                        <div class="content-box-wrapper">
                            <table class="table text-center mrg0B" id="tzqx-table">
                                <thead>
                                <tr>
                                    <th class="text-center">
                                        <input type="checkbox"
                                               name="checkbox">
                                    </th>
                                    <th style="width: 20%;" class="text-center">期限</th>
                                    <th class="text-center">年限单位</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>

                        <div class="button-pane">
                            <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                                    id="remove-button"><span class="button-content">删除选中行</span></button>
                            <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                                    id="add-button"><span class="button-content">增加一行</span></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 pad0R clearfix">
                    <div id="tcfpfw-view" class="content-box box-toggle">
                        <h3 class="content-box-header primary-bg">
                            <span class="float-left">提成分配范围</span>
                            <a href="#" class="float-right icon-separator btn toggle-button" title="提成分配范围">
                                <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                            </a>
                        </h3>

                        <div class="content-box-wrapper">
                            <table class="table text-center mrg0B" id="tcfpfw-table">
                                <thead>
                                <tr>
                                    <th class="text-center">部门经理</th>
                                    <th class="text-center"  width="30x;">是否包销</th>
                                    <th class="text-center"  width="100px;">业务提成比例</th>
                                    <th class="text-center" width="100px;">管理提成比例</th>
                                    <th class="text-center" width="100px;">包销收益率</th>
                                    <th class="text-center" width="60px;">提成税率</th>
                                    <th class="text-center">提成方式</th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pos-rel">
                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button">
                        <span class="button-content">提交</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/fund-create.js"></script>
</body>
</html>