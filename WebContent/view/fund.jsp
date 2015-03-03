<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/fund.css">
    <title>基金</title>
</head>

<body class="page-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle view-width">
                <div class="content-box-header primary-bg">
                    <span class="float-left">基金信息维护及管理</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="基金信息维护及管理">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper">
                    <table class="table text-center mrg0B" id="funds-table">
                        <thead>
                        <tr>
                            <th class="text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="text-center">基金编号</th>
                            <th class="text-center">基金名称(*)</th>
                            <th class="text-center">状态(*)</th>
                            <th class="text-center">开售日期(*)</th>
                            <th class="text-center">预期募集款</th>
                            <th class="text-center">季付募集规模</th>
                            <th class="text-center"><span class="text-overflow" title="半年付募集规模">半年付募集规模</span></th>
                            <th class="text-center">年付募集规模</th>
                            <th class="text-center">投资期限</th>
                            <th class="text-center">收益率范围</th>
                            <th class="text-center">提成分配范围</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-save"><span
                            class="button-content">保存</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-remove"><span
                            class="button-content">删除选中行</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-add"><span
                            class="button-content">增加一行</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L black-modal-70 hide"
                            id="tcfpfw-button"><span class="button-content">提成分配范围</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L black-modal-60 hide"
                            id="sylfw-button"><span class="button-content">收益率范围</span></button>
                    <button class="btn-ui btn bg-green large medium float-right mrg10L hide" id="tzqx-button"><span
                            class="button-content">收益率范围</span></button>
                </div>
            </div>

            <div class="hide" id="black-modal-60" title="收益率范围">
                <div class="content-box mrg0B">
                    <table class="table text-center mrg0B" id="sylfw-table">
                        <thead class="primary-bg">
                        <tr>
                            <th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="primary-bg text-center" colspan="3">收益范围(*)</th>
                            <th class="primary-bg text-center">收益率(*)</th>
                            <th class="primary-bg text-center">合同版本(*)</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="button-pane">
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="sylfw-save"><span
                                class="button-content">保存</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="sylfw-remove"><span
                                class="button-content">删除选中行</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="sylfw-add"><span
                                class="button-content">增加一行</span></button>
                    </div>
                </div>
            </div>

            <div class="hide" id="tzqx-dialog" title="投资期限">
                <div class="content-box mrg0B">
                    <table class="table text-center mrg0B" id="tzqx-table">
                        <thead class="primary-bg">
                        <tr>
                            <th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="primary-bg text-center">期限(*)</th>
                            <th class="primary-bg text-center">单位(*)</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="button-pane">
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="tzqx-save"><span
                                class="button-content">保存</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="tzqx-remove"><span
                                class="button-content">删除选中行</span></button>
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="tzqx-add"><span
                                class="button-content">增加一行</span></button>
                    </div>
                </div>
            </div>

            <div class="hide" id="black-modal-70" title="提成分配范围">
                <div class="content-box mrg0B">
                    <table class="table text-center mrg0B" id="tcfpfw-table">
                        <thead class="primary-bg">
                        <tr>
                            <th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
                            <th class="primary-bg text-center user-view">部门经理(*)</th>
                            <th class="primary-bg text-center tcfpfw-sfbx">是否包销</th>
                            <th class="primary-bg text-center"><span class="text-overflow" title="业务提成比例">业务提成比例</span>
                            </th>
                            <th class="primary-bg text-center"><span class="text-overflow" title="管理提成比例">管理提成比例</span>
                            </th>
                            <th class="primary-bg text-center"><span class="text-overflow" title="包销收益率">包销收益率</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <div class="button-pane">
                        <button class="btn-ui btn bg-green large medium float-right mrg10L" id="tcfpfw-save"><span
                                class="button-content">保存</span></button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>
<script type="text/javascript" src="../js/fund.js"></script>
</body>
</html>