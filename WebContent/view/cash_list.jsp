<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>兑付申请</title>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/cash_list.css"/>
</head>
<body>
<div id="page-wrapper">
<jsp:include page="./navi.jsp"/>
<div id="page-content-wrapper">
<div id="page-content" class="page-view pad25T">

<div class="content-box box-toggle view-width">
    <h3 class="content-box-header primary-bg">
        <span class="float-left">兑付汇总</span>
        <a href="#" class="float-right icon-separator btn toggle-button" title="兑付汇总">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>
    </h3>

    <div class="content-box-wrapper">
        <table class="table table-striped text-center mrg0B" id="cash-collect">
            <thead>
            <tr>
                <th class="text-center">基金</th>
                <th class="text-center">总金额</th>
                <th class="text-center">笔数</th>
                <th class="text-center">利息</th>
                <th class="text-center">本金</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="content-box box-toggle view-width">

    <div class="content-box-header primary-bg">
        <span class="float-left">兑付利息</span>

        <a href="#" class="float-right icon-separator btn toggle-button" title="兑付利息">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>

        <div class="keyword-view float-right">
            <div class="keyword-input-width float-left">
                <div class="form-input">
                    <div class="form-input-icon">
                        <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                        <input type="text" placeholder="关键字搜索..."
                               class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="filter-keyword"/>
                    </div>
                </div>
            </div>
            <button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                    id="filter-button"><span class="button-content">搜索</span></button>
        </div>

        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">
                            <i class="glyph-icon icon-filter"></i>
                        </div>

                        <div class="append-left">
                            <select class="" id="filter-status">
                                <option value="0">未付款</option>
                                <option value="1">付款中</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">到</div>

                        <div class="append-left">
                            <input class="tcal filter-input" id="filter_to"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">从</div>

                        <div class="append-left">
                            <input class="tcal filter-input" id="filter_from"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="content-box-wrapper">

        <div id="table-pager-1" class="page-bar"></div>

        <table class="table table-striped text-center mrg0B" id="cash-interest">
            <thead>
                <tr>
                    <th class="text-center"><input type="checkbox"></th>
                    <th class="text-center">基金</th>
                    <th class="text-center">合同编号</th>
                    <th class="text-center">客户名称</th>
                    <th class="text-center">应付利息</th>
                    <th class="text-center">开户行</th>
                    <th class="text-center">账户</th>
                    <th class="text-center">部门经理</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>

<div class="content-box box-toggle view-width">
    <div class="content-box-header primary-bg">
        <span class="float-left">兑付本金</span>

        <a href="#" class="float-right icon-separator btn toggle-button" title="提成查询">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>

        <div class="keyword-view float-right">
            <div class="keyword-input-width float-left">
                <div class="form-input">
                    <div class="form-input-icon">
                        <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                        <input type="text" placeholder="关键字搜索..."
                               class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="filter-keyword2"/>
                    </div>
                </div>
            </div>
            <button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                    id="filter-button2"><span class="button-content">搜索</span></button>
        </div>


        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">
                            <i class="glyph-icon icon-filter"></i>
                        </div>

                        <div class="append-left">
                            <select class="" id="filter-status2">
                                <option value="0">未付款</option>
                                <option value="1">付款中</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">到</div>

                        <div class="append-left">
                            <input class="tcal filter-input" id="filter_to2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append bg-white">从</div>

                        <div class="append-left">
                            <input class="tcal filter-input" id="filter_from2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="content-box-wrapper">

        <div id="table-pager-2" class="page-bar"></div>

        <table class="table table-striped text-center mrg0B" id="cash-benjin">
            <thead>
                <tr>
                    <th class="text-center"><input type="checkbox"></th>
                    <th class="text-center">基金</th>
                    <th class="text-center">合同编号</th>
                    <th class="text-center">客户名称</th>
                    <th class="text-center">应付本金</th>
                    <th class="text-center">开户行</th>
                    <th class="text-center">账户</th>
                    <th class="text-center">部门经理</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

    </div>

    <div class="button-pane">
        <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="cash-add"><span
                class="button-content">申请付款</span></button>
    </div>
</div>


<div id="bankaccount_select" class="white_content">
    <div id="b_jy_panel" style="width: 600px;">
        <form class="form-bordered " action="/" method="post">
            <div class="form-row">
                <div class="form-input col-md-12 ">
                    <h4>设置支付账号</h4>
                </div>
            </div>
            <div class="form-row" class="">
                <table id="sel_table" class="table table-striped">
                    <colgroup>
                        <col width="40%"/>
                    </colgroup>
                    <tr>
                        <th>基金名称</th>
                        <th>支付银行账户</th>
                    </tr>
                    <tr>
                        <td><span>基金名称基金名称基基金名称基金名称基金名称金名称基金名称基金名称</span></td>
                        <td><select>
                            <option>选择兑付账户</option>
                            <option>中国建设刍深圳分行</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>d</td>
                        <td><select>
                            <option>选择兑付账户</option>
                        </select></td>
                    </tr>
                </table>
            </div>
            <div class="form-row">
                <div class="form-input col-md-12 text-right">
                    <a href="javascript:;" id="btn_ok" class="btn medium primary-bg" title="确认使用此账户进行支付">
                        <span class="button-content">OK</span>
                    </a>
                    <a href="javascript:;" id="btn_cancel" class="btn medium ui-state-default" title="取消操作">
                        <span class="button-content">取消</span>
                    </a>
                </div>
            </div>
        </form>
    </div>
</div>

</div>
</div>
</div>
<script type="text/javascript" src="/js/cash_list.js"></script>
</body>
</html>