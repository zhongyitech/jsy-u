<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/fund-list.css">
    <title>收款列表</title>
</head>

<body >
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">

            <div class="content-box box-toggle ">
                <div class="content-box-header primary-bg">
                    <span class="float-left">收款列表</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="项目信息维护及管理">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="keyword-input" />
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button"><span class="button-content">搜索</span></button>
                    </div>
                </div>

                <div class="container-fluid">

                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputEmail3">项目基金</label>
                                    <input type="email" class="form-control" id="exampleInputEmail3" placeholder="项目基金">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">付款日期</label>
                                    <input type="password" class="form-control" id="exampleInputPassword3" placeholder="付款日期">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">投资金额</label>
                                    <input type="password" class="form-control" id="exampleInputPassword4" placeholder="投资金额">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">付款账户</label>
                                    <input type="password" class="form-control" id="exampleInputPassword5" placeholder="付款账户">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">付款银行</label>
                                    <input type="password" class="form-control" placeholder="付款银行">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">收款人</label>
                                    <input type="password" class="form-control" placeholder="收款人">
                                </div>
                                <div class="form-group">
                                    <label class="sr-only" for="exampleInputPassword3">付款人</label>
                                    <input type="password" class="form-control" placeholder="付款人">
                                </div>

                                <button type="submit" class="btn btn-default">查询</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div class="content-box-wrapper">

                    <div class="col-md-12 page-bar pad0R">
                        <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
                            <i class="glyph-icon icon-arrow-left"></i>
                        </a>
                        <div class="button-group float-left pages-div" id="funds-pages"></div>
                        <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
                            <i class="glyph-icon icon-arrow-right"></i>
                        </a>
                    </div>

                    <table class="table table-striped text-center mrg0B" id="funds-table">
                        <thead>
                        <tr>
                            <th class="text-center">编号</th>
                            <th class="text-center">付款日期</th>
                            <th class="text-center">项目基金</th>
                            <th class="text-center">投资金额</th>
                            <th class="text-center">应收利息</th>
                            <th class="text-center">应收管理费</th>
                            <th class="text-center">应收渠道费</th>
                            <th class="text-center">投资天数</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>2</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>3</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>4</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>5</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>6</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>7</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>8</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>9</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        <tr>
                            <td>10</td><td>2015-06-09</td><td>￥200,0000</td><td>0.05</td><td>500</td><td>0.05</td><td>500</td><td>700天</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">公共部分信息</div>
                    <div class="panel-body">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>收管理费日期 </label>
                                <span>2015-06-09</span>
                            </div>
                            <div class="form-group">
                                <label>收渠道费日期 </label>
                                <span>2015-06-09</span>
                            </div>

                        </form>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">统计信息</div>
                    <div class="panel-body">
                        <form class="form-inline">
                            <div class="form-group">
                                <label>应收利息 (不含管理费和渠道费)</label>
                                <span>500</span>
                            </div>
                            <div class="form-group">
                                <label>已收管理费 (金赛银公司收) </label>
                                <span>200</span>
                            </div>
                            <div class="form-group">
                                <label>已收渠道费</label>
                                <span>200</span>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
<script type="text/javascript" src="../js/project_list.js"></script>
</body>
</html>