<%--
  Created by IntelliJ IDEA.
  User: William.Wei
  Date: 2015/4/16
  Time: 14:20
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/project-detail.css">
    <title>存档明细</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle" ms-controller="BaseModel">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目基本信息</span>

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>
                <div class="content-box-wrapper clearfix">
                    <div class="col-md-11">
                        <div class="col-md-6">
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-1" title="董事">董事：</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="detail-id-1" ms-duplex="project.director" />
                                </div>
                            </div>
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-3" title="股干人员架构">股干人员架构：</label>
                                </div>
                                <div class="col-md-9">
                                    <textarea id="detail-id-3" rows="3" ms-duplex="project.stockStructure"></textarea>
                                </div>
                            </div>
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-4" title="债务">债务：</label>
                                </div>
                                <div class="col-md-9">
                                    <textarea id="detail-id-4" rows="3" ms-duplex="project.debt"></textarea>
                                </div>
                            </div>
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-7" title="项目结算备注">项目结算备注：</label>
                                </div>
                                <div class="col-md-9">
                                    <textarea id="detail-id-7" rows="3" ms-duplex="project.endSummary"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-2" title="监事">监事：</label>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" id="detail-id-2" ms-duplex="project.supervisor" />
                                </div>
                            </div>
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-5" title="资产">资产：</label>
                                </div>
                                <div class="col-md-9">
                                    <textarea id="detail-id-5" rows="3" ms-duplex="project.assets"></textarea>
                                </div>
                            </div>
                            <div class="form-row form-input">
                                <div class="col-md-3 form-label">
                                    <label for="detail-id-6" title="项目备注">项目备注：</label>
                                </div>
                                <div class="col-md-9">
                                    <textarea id="detail-id-6" rows="3" ms-duplex="project.pdesc"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-pane">
                    <button class="btn-ui btn bg-green large medium float-right mrg10L" ms-click="submit">
                        <span class="button-content">更新</span>
                    </button>
                </div>
            </div>
            <div class="content-box box-toggle" data-ms-controller="StockRight">
                <div class="content-box-header primary-bg">
                    <span class="float-left">项目股权信息</span>

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper clearfix">
                    <div class="form-row form-input">
                        <div class="col-md-4">
                            <div class="col-md-4 form-label">
                                <label for="t-cal" title="时间">时间：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="tcal" id="t-cal" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="col-md-4 form-label">
                                <label for="stock-rights" title="股份结构">股份结构：</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="stock-rights" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button class="btn-ui btn bg-green medium mrg10L">
                                <span class="button-content">添加</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <table class="table table-striped text-center mrg0B">
                            <thead>
                                <tr>
                                    <th class="text-center">编号</th>
                                    <th class="text-center">时间</th>
                                    <th class="text-center">股份结构</th>
                                    <th class="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2013-12-31</td>
                                    <td>股份结构</td>
                                    <td>
                                        <button class="btn-ui btn bg-green medium mrg10L">
                                            <span class="button-content">删除</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="content-box box-toggle" data-ms-controller="EndProject">
                <div class="content-box-header primary-bg">
                    <span class="float-left">附件信息</span>

                    <a href="javascript:;" class="float-right icon-separator btn toggle-button" title="点击">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </div>

                <div class="content-box-wrapper clearfix">
                    <div class="col-md-6">
                        <div class="form-row">
                            <div class="col-md-8">
                                <div class="col-md-4 form-label">
                                    <label for="start-project-file" title="选择项目文件">选择项目文件：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="file" id="start-project-file" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <button class="btn-ui btn bg-green medium mrg10L">
                                    <span class="button-content">上传项目文件</span>
                                </button>
                            </div>
                        </div>
                        <table class="table table-striped text-center mrg0B">
                            <thead>
                            <tr>
                                <th class="text-center">编号</th>
                                <th class="text-center">文件名</th>
                                <th class="text-center">文件路径</th>
                                <th class="text-center">文件类型</th>
                                <th class="text-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2013-12-31</td>
                                <td>股份结构</td>
                                <td>股份结构</td>
                                <td>
                                    <button class="btn-ui btn bg-green medium mrg10L">
                                        <span class="button-content">删除</span>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <div class="form-row">
                            <div class="col-md-8">
                                <div class="col-md-4 form-label">
                                    <label for="end-project-file" title="选择结算文件">选择结算文件：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="file" id="end-project-file" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <button class="btn-ui btn bg-green medium mrg10L">
                                    <span class="button-content">上传结算文件</span>
                                </button>
                            </div>
                        </div>
                        <table class="table table-striped text-center mrg0B">
                            <thead>
                            <tr>
                                <th class="text-center">编号</th>
                                <th class="text-center">文件名</th>
                                <th class="text-center">文件路径</th>
                                <th class="text-center">文件类型</th>
                                <th class="text-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>2013-12-31</td>
                                <td>股份结构</td>
                                <td>股份结构</td>
                                <td>
                                    <button class="btn-ui btn bg-green medium mrg10L">
                                        <span class="button-content">删除</span>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/project-detail.js"></script>
</body>
</html>