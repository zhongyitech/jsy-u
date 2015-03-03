<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/invest-list.css"/>
    <title>客户投资信息管理</title>
</head>
<body class="page-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>
    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle view-width">
                <div class="content-box-header primary-bg">
                    <span class="float-left">客户投资信息管理</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="最近领用记录">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="Search notifications..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button">
                            <span class="button-content">搜索</span></button>
                    </div>

                </div>
                <div class="content-box-wrapper">
                    <div class="col-md-12 page-bar pad0R">
                        <a href="javascript:;"
                           class="btn large float-left mrg5R ui-state-default"
                           id="page-first"> <i class="glyph-icon icon-arrow-left"></i>
                        </a>

                        <div class="button-group float-left pages-div" id="page-numbers"></div>
                        <a href="javascript:;"
                           class="btn large float-left mrg5L ui-state-default"
                           id="page-last"> <i class="glyph-icon icon-arrow-right"></i>
                        </a>
                    </div>
                    <table class="table table-striped" id="investment-table">
                        <colgroup>
                            <col style="width: 90px;"/>
                        </colgroup>
                        <tr>
                            <th><span class="text-overflow">认购人</span></th>
                            <th><span class="text-overflow">基金名称</span></th>
                            <th><span class="text-overflow">档案编号</span></th>
                            <th><span class="text-overflow">合同编号</span></th>
                            <th><span class="text-overflow">认购日期</span></th>
                            <th><span class="text-overflow">认购金额</span></th>
                            <th><span class="text-overflow">认购期限</span></th>
                            <th><span class="text-overflow">理财经理</span></th>
                            <th><span class="text-overflow">地区</span></th>
                            <th><span class="text-overflow">年经收益率</span></th>
                            <th><span class="text-overflow">付息方式</span></th>
                            <th><span class="text-overflow">到期日期</span></th>
                            <th><span class="text-overflow">委托情况</span></th>
                            <th><span class="text-overflow">已付利息</span></th>
                            <th><span class="text-overflow">已付本金</span></th>
                            <th><span class="text-overflow">操作</span></th>
                            <th><span class="text-overflow"></span></th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>3</td>
                            <td></td>
                            <td>2</td>
                            <td>2</td>
                            <td>2</td>
                            <td>
                                <div class="dropdown">
                                    <a href="javascript:;" title="" class="btn medium "
                                       data-toggle="dropdown"> <span class="button-content">
												<i class="glyph-icon font-size-11 icon-cog"></i> <i
                                            class="glyph-icon font-size-11 icon-chevron-down"></i>
										</span>
                                    </a>
                                    <ul class="dropdown-menu float-right">
                                        <li><a href="javascript:;" title=""><i
                                                class="glyph-icon icon-calendar mrg5R"></i>完成客户信息</a></li>
                                        <li class="divider"></li>
                                        <li><a href="javascript:;" class="" title=""><i
                                                class="glyph-icon icon-edit mrg5R"></i>查看投资档案明细</a></li>
                                        <li class="divider"></li>
                                        <li><a href="javascript:;" class="" title=""><i
                                                class="glyph-icon icon-edit mrg5R"></i>到期转投处理申请</a></li>
                                        <li><a href="javascript:;" class="" title=""><i
                                                class="glyph-icon icon-edit mrg5R"></i>未到期转投处理申请</a></li>
                                        <li><a href="javascript:;" class="" title=""><i
                                                class="glyph-icon icon-edit mrg5R"></i>退伙处理申请</a></li>
                                        <li><a href="javascript:;" class="" title=""><i
                                                class="glyph-icon icon-edit mrg5R"></i>基金续投申请</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="../js/invest-list.js"></script>
<script type="text/javascript" src="../js/EnumCommon.js"></script>
</body>
</html>