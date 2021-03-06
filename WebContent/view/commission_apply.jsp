<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <jsp:include page="./head.jsp"/>
    <title>提成申请</title>
    <link rel="stylesheet" type="text/css" href="/css/cash_list.css"/>
</head>
<body>
<div id="page-wrapper">
<jsp:include page="./navi.jsp"/>
<div id="page-content-wrapper">
<!-- #page-title -->
<div id="page-content" class="page-view pad25T">

<div class="content-box box-toggle view-width">

    <div class="content-box-header primary-bg">
        <span class="float-left">业务提成申请单</span>

        <a href="#" class="float-right icon-separator btn toggle-button" title="业务提成申请单">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>

        <div class="keyword-view float-right">
            <div class="keyword-input-width float-left">
                <div class="form-input">
                    <div class="form-input-icon">
                        <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                        <input type="text" placeholder="关键字搜索..."
                               class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                               id="filter-keyword"/>
                    </div>
                </div>
            </div>
            <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                    id="keyword-button"><span class="button-content">搜索</span></button>
        </div>

        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append">
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
                        <div class="input-append">到</div>

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
                        <div class="input-append">从</div>

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
        <table id="ywtc_table" class="table table-hover table-striped text-center mrg0B">
            <thead>
                <tr>
                    <th><input class="item-checkbox" type="checkbox"name="checkbox"></th>
                    <th class="text-center " width="100px;" >提成人员</th>
                    <th class="text-center" >基金名称</th>
                    <th class="text-center" width="90px" >付款金额</th>
                    <th class="text-center" >收款人</th>
                    <th class="text-center" >收款账户</th>
                    <th class="text-center" >开户行</th>
                    <th class="text-center" width="80px">付款状态</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <%--<div class="items-page">--%>
        <%--<div onselectstart="return false" class="page-first" id="page-first">第一页</div>--%>

        <%--<div onselectstart="return false" class="page-numbers" id="page-numbers"></div>--%>

        <%--<div onselectstart="return false" class="page-last" id="page-last">最后一页</div>--%>

        <%--<div class="items-page-total-label">查询结果：</div>--%>

        <%--<div class="items-page-total" id="pacts-page-total" title="">0个</div>--%>
        <%--</div>--%>

    </div>
</div>
<div class="content-box box-toggle view-width">


    <div class="content-box-header primary-bg">
        <span class="float-left">管理提成申请单</span>

        <a href="#" class="float-right icon-separator btn toggle-button" title="业务提成申请单">
            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>

        <div class="keyword-view float-right">
            <div class="keyword-input-width float-left">
                <div class="form-input">
                    <div class="form-input-icon">
                        <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                        <input type="text" placeholder="关键字搜索..."
                               class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                               id="filter-keyword2"/>
                    </div>
                </div>
            </div>
            <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="filter-button2"><span class="button-content">搜索</span></button>
        </div>

        <div class="keyword-view float-right filter-status">
            <div class="form-row pad0B">
                <div class="form-input col-md-12">
                    <div class="input-append-wrapper">
                        <div class="input-append">
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
                        <div class="input-append">到</div>

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
                        <div class="input-append">从</div>

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

        <table id="gltc_table" class="table table-striped text-center mrg0B">
            <thead>
                <tr>
                    <th><input class="item-checkbox" type="checkbox" name="checkbox"></th>
                    <th class="text-center" width="100px;">提成人员</th>
                    <th class="text-center">基金名称</th>
                    <th class="text-center" width="90px">付款金额</th>
                    <th class="text-center">收款人</th>
                    <th class="text-center">收款账户</th>
                    <th class="text-center">开户行</th>
                    <th data-bindtype="value" data-Member="paystatus" width="90px">付款状态</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>


</div>
    <div class="button-pane">
        <button type="button" class="btn-ui btn primary-bg large medium float-right mrg10L" id="funds-save">
            <span class="button-content">申请付款</span></button>
    </div>
<div class="content-box box-toggle view-width">
    <h3 class="content-box-header primary-bg">
        <span class="float-left">数据汇总</span>
        <a href="#" class="float-right icon-separator btn toggle-button" title="Toggle Box"> <i
                class="glyph-icon icon-toggle icon-chevron-down"></i>
        </a>
    </h3>

    <div class="content-box-wrapper">
        <table id="total_table" class="table table-striped text-center mrg0B">
            <colgroup>
            </colgroup>
            <tr>
                <th>基金</th>
                <th>总金额</th>
                <th>笔数</th>
                <th>管理提成金额</th>
                <th>业务提成金额</th>
            </tr>
        </table>
    </div>
</div>

</div>
</div>
</div>
<script type="text/javascript" src="/js/commission_apply.js"></script>
</body>
</html>