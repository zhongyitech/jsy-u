<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <jsp:include page="./head.jsp"/>
    <title>提成查询</title>
    <link rel="stylesheet" type="text/css" href="/css/commission_query.css"/>
    <style type="text/css">
        .input-rate {
            text-align: center;
        }

        .item-lock {
            background-color: #ccc;
            color: red;
        }
    </style>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">

                <div class="content-box-header primary-bg">
                    <span class="float-left">提成查询</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="提成查询">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="filter-input"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="filter-button"><span class="button-content">搜索</span></button>
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
                                            <option value="0">未申请</option>
                                            <option value="1">已申请</option>
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

                    <div id="table-pager" class="page-bar"></div>

                    <table id="query_table" class="table table-striped text-center mrg0B text-center">
                        <thead>
                        <tr>
                            <th><input class="item-checkbox" type="checkbox" name="checkbox"></th>
                            <th class="text-center"><span class="text-overflow"
                                                                               title="理财经理">理财经理</span></th>
                            <th class="text-center"><span
                                    class="text-overflow" title="基金">基金</span></th>
                            <th class="text-center">认购日期</th>
                            <th class="text-center"><span class="text-overflow"
                                                                                   title="客户名称">客户名称</span></th>
                            <th class="text-center" data-bindtype="value" data-Member="tzje" data-format="money"><span class="text-overflow"
                                                                                                   title="基金">投资金额</span>
                            </th>
                            <th class="text-center"><span class="text-overflow"
                                                                                                 title="基金">客户收益率</span>
                            </th>
                            <th class="text-center">
                                <span class="text-overflow"
                                      title="认购期限">认购期限</span></th>
                            <th><span class="text-overflow" title="税前/税后">税前/税后</span></th>
                            <th><span class="text-overflow" title="税率">税率</span></th>
                            <th class="text-center"><span class="text-overflow"
                                                                                                 title="提成率">提成率</span>
                            </th>
                            <th class="text-center"><span class="text-overflow"
                                                                               title="理财经理">提成类型</span></th>
                            <th class="text-center"><span class="text-overflow" title="提成额">提成额</span></th>
                            <th class="text-center"><span class="text-overflow" title="发票金额">发票金额</span></th>
                            <th class="text-center"><span class="text-overflow" title="税金"><span class="text-overflow"
                                                                             title="提税金">提税金</span></span></th>
                            <th class="text-center"><span class="text-overflow">付款金额</span></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                </div>

                <div class="button-pane">
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L"
                            id="submit_commission"><span class="button-content">提成申请</span></button>
                    <button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="btn_expt">
                        <span class="button-content">导出数据</span></button>
                </div>
            </div>

            <div class="content-box box-toggle ">
                <h3 class="content-box-header primary-bg">
                    <span class="float-left">提成比例统计</span>
                    <a href="#" class="float-right icon-separator btn toggle-button" title="Toggle Box"> <i
                            class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>
                </h3>

                <div class="content-box-wrapper" style="width: 900px;height: 500px">
                    <div id="commission-report" class="cash-report" style="width: 900px;height: 500px"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/js/commission_query.js"></script>
</body>
</html>