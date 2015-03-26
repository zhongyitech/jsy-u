<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="page-header" class="clearfix">

    <div id="header-logo">
        <a href="javascript:;" class="tooltip-button" data-placement="bottom" title="关闭导航" id="close-sidebar">
            <i class="glyph-icon icon-caret-left"></i>
        </a>

        <a href="javascript:;" class="tooltip-button hidden" data-placement="bottom" title="打开导航" id="rm-close-sidebar">
            <i class="glyph-icon icon-caret-right"></i>
        </a>

        <i><img class="logo-image" src="/images/favicon.ico" alt="金赛银基金"></i>

        <i class="logo-text pad10A">金赛银基金</i>
    </div>

    <div class="user-profile dropdown">
        <a href="javascript:;" title="" class="user-ico clearfix" data-toggle="dropdown">
            <img width="36" src="/images/face_defaults.png" alt="Admin">
            <span id="login-username">未登录</span>
            <i class="glyph-icon icon-chevron-down"></i>
        </a>

        <ul class="dropdown-menu float-right">
            <li>
                <a href="javascript:;" title="登录" class="black-modal-80" id="user-login">
                    <i class="glyph-icon icon-flag mrg5R"></i>
                    <span class="font-bold">登录</span>
                </a>

                <div class="hide" id="black-modal-80" title="欢迎使用金赛银基金">
                    <div class="login-dialog">
                        <div class="content-box mrg0B">
                            <div class="content-box-wrapper">
                                <div class="form-row">
                                    <div class="form-input col-md-12">
                                        <div class="input-append-wrapper">
                                            <div class="input-append bg-black">
                                                <i class="glyph-icon icon-user"></i>
                                            </div>
                                            <div class="append-left">
                                                <input type="text" placeholder="请输入账号" name="" id="login-user">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row pad0B">
                                    <div class="form-input col-md-12">
                                        <div class="input-append-wrapper">
                                            <div class="input-append bg-black">
                                                <i class="glyph-icon icon-key"></i>
                                            </div>
                                            <div class="append-left">
                                                <input type="password" placeholder="请输入密码" name="" id="login-key">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="button-pane">
                                <button class="btn-ui btn bg-green large medium float-right" id="login-button"><span
                                        class="button-content">登录</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <a href="./account-edit.jsp" title="设置" id="user-edit">
                    <i class="glyph-icon icon-gear font-size-13 mrg5R"></i>
                    <span class="font-bold">设置</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" title="退出" id="user-logout">
                    <i class="glyph-icon icon-signout font-size-13 mrg5R"></i>
                    <span class="font-bold">退出</span>
                </a>
            </li>
        </ul>
    </div>

    <div class="top-icon-bar" id="notification">
        <div class="dropdown" id="notification-task">
            <a data-toggle="dropdown" href="javascript:;" title="待办事项">
                <span class="badge badge-absolute bg-red hide" id="item-total"></span>
                <i class="glyph-icon icon-bell"></i>
            </a>

            <div class="dropdown-menu">

                <div class="scrollable-content medium-box scrollable-small">
                    <ul class="no-border notifications-box" id="item-list"></ul>
                </div>

                <div class="pad10A button-pane button-pane-alt text-center">
                    <a href="./task-list.jsp" class="btn medium float-right bg-green">
                        <span class="button-content">显示所有待办事项</span>
                    </a>
                </div>

            </div>
        </div>
    </div>

</div>

<div id="page-sidebar" class="scrollable-content">

    <div id="sidebar-menu">
        <ul>
            <li>
                <a href="javascript:;" title="基金管理"><i class="glyph-icon icon-reorder"></i>基金管理</a>
                <ul>
                    <li>
                        <a href="./fund-list.jsp" title="基金信息"><i class="glyph-icon icon-chevron-right"></i>基金信息</a>
                    </li>

                    <li>
                        <a href="./fund-create.jsp" title="新增基金"><i class="glyph-icon icon-chevron-right"></i>新增基金</a>
                    </li>

                    <li>
                        <a href="./hetong-dengji.jsp" title="合同登记"><i class="glyph-icon icon-chevron-right"></i>合同登记</a>
                    </li>

                    <li>
                        <a href="./hetong-lingyong.jsp" title="合同领用"><i
                                class="glyph-icon icon-chevron-right"></i>合同领用</a>
                    </li>

                    <li>
                        <a href="./hetong-guihuan.jsp" title="合同归还"><i
                                class="glyph-icon icon-chevron-right"></i>合同归还</a>
                    </li>
                </ul>
            <li>
                <a href="javascript:;" title="客户管理"><i class="glyph-icon icon-reorder"></i>客户管理</a>
                <ul>

                    <li><a href="./investment.jsp" title="添加投资档案"><i
                            class="glyph-icon icon-chevron-right"></i>添加投资档案</a></li>
                    <li><a href="./investment-print.jsp" title="打印投资确认书"><i class="glyph-icon icon-chevron-right"></i>打印投资确认书</a>
                    </li>

                    <li><a href="invest-list.jsp" title="客户档案管理"><i
                            class="glyph-icon icon-chevron-right"></i>投资档案管理</a></li>

                    <li><a href="hetong-query.jsp" title="Layouts &amp; Elements"> <i
                            class="glyph-icon icon-chevron-right"></i>合同查询
                    </a></li>
                    <li><a href="commission_query.jsp" title="提成申请"><i
                            class="glyph-icon icon-chevron-right"></i>提成查询</a></li>
                    <li><a href="commission_apply.jsp" title="提成申请"><i
                            class="glyph-icon icon-chevron-right"></i>提成申请</a></li>
                    <li><a href="./cash_app.jsp" title="兑付查询"><i class="glyph-icon icon-chevron-right"></i>兑付查询</a></li>
                    <li><a href="./cash_list.jsp" title="兑付申请"><i class="glyph-icon icon-chevron-right"></i>兑付申请</a>
                    </li>
                    <li><a href="./czjlrz-list.jsp" title="操作记录日志"><i
                            class="glyph-icon icon-chevron-right"></i>操作记录日志</a></li>
                </ul>
            </li>
            <li><a href="javascript:;" title="基金管理"><i
                    class="glyph-icon icon-reorder"></i>特殊申请</a>
                <ul>
                    <li><a href="specialSummary.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>汇总信息</a></li>
                    <li><a href="special-treat-list.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>特殊申请管理</a></li>
                    <li><a href="special-paytreat.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>委托付款申请</a></li>

                    <li><a href="special_treat.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>到期转投申请</a></li>
                    <li><a href="special_untreat.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>未到期转投申请</a></li>
                    <li><a href="refund_add.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>退伙申请</a></li>
                    <li><a href="continuedinvestment-add.jsp" title="到期特殊申请"><i
                            class="glyph-icon icon-chevron-right"></i>续投申请</a></li>
                    <li><a href="special-merge.jsp" title="投资档案合并wht付息申请表"><i
                            class="glyph-icon icon-chevron-right"></i>合并申请</a></li>
                </ul>
            </li>
            <li>
                <a href="javascript:;" title="项目管理"> <i class="glyph-icon icon-reorder"></i>项目管理 </a>
                <ul>
                    <li><a href="new_project.jsp" title="新建项目"><i class="glyph-icon icon-chevron-right"></i>新建项目</a>
                    </li>
                    <li><a href="project_list.jsp" title="项目列表"><i class="glyph-icon icon-chevron-right"></i>项目列表</a>
                    </li>
                    <li><a href="new_pay_record.jsp" title="新增汇款记录"><i class="glyph-icon icon-chevron-right"></i>新增汇款记录</a>
                    </li>
                    <li><a href="new_receive_record.jsp" title="新增收款记录"> <i class="glyph-icon icon-chevron-right"></i>新增收款记录</a>
                    </li>
                    <li><a href="pay_record_list.jsp" title="项目转款明细表"> <i class="glyph-icon icon-chevron-right"></i>项目转款明细表</a>
                    </li>
                    <li><a href="end_project.jsp" title="项目结算"><i class="glyph-icon icon-chevron-right"></i>项目结算</a>
                    </li>
                </ul>
            </li>
            <li><a href="javascript:;" title="Forms"> <i
                    class="glyph-icon icon-reorder"></i>档案管理
            </a>
                <ul>

                    <li><a href="filepackage-list.jsp"
                           title="Layouts &amp; Elements"> <i
                            class="glyph-icon icon-chevron-right"></i>借阅/查询
                    </a></li>
                    <li><a href="filepackage-add.jsp"
                           title="Layouts &amp; Elements"> <i
                            class="glyph-icon icon-chevron-right"></i>档案入库
                    </a></li>
                    <%--<li><a href="forms.html" title="Layouts &amp; Elements"> <i--%>
                    <%--class="glyph-icon icon-chevron-right"></i> 档案查询--%>
                    <%--</a></li>--%>
                    <%--<li><a href="forms.html" title="Layouts &amp; Elements"> <i--%>
                    <%--class="glyph-icon icon-chevron-right"></i> 档案注销--%>
                    <%--</a></li>--%>
                </ul>
            </li>
            <li><a href="javascript:;" title="Forms"> <i
                    class="glyph-icon icon-reorder"></i> 银行业务
            </a>
                <ul>
                    <li><a href="bankingpaymentorder.jsp" title="Layouts &amp; Elements"> <i
                            class="glyph-icon icon-chevron-right"></i> 付款单查询
                    </a></li>
                    <li><a href="forms.html" title="设置生成凭证使用的匹配数据"> <i
                            class="glyph-icon icon-chevron-right"></i>记账凭证生成设置
                    </a></li>
                    <li><a href="forms.html" title="查询生成的历史数据"> <i
                            class="glyph-icon icon-chevron-right"></i>记账凭证查询
                    </a></li>
                    <li><a href="./bankingTransportation.jsp" title="查询各银行的余额及其它信息"> <i
                            class="glyph-icon icon-chevron-right"></i>银行余额查询
                    </a></li>
                    <li><a href="./bankingTransportation.jsp" title="查询从银行同步的交易流水信息"> <i
                            class="glyph-icon icon-chevron-right"></i>交易明细查询
                    </a></li>
                    <li><a href="./bankingTransportation.jsp" title="查询从银行同步的交易流水信息"> <i
                            class="glyph-icon icon-chevron-right"></i>失败退票查询
                    </a></li>
                    <li><a href="./bankingTransportation.jsp" title="查询从银行同步的交易流水信息"> <i
                            class="glyph-icon icon-chevron-right"></i>电子回单管理
                    </a></li>
                    <li><a href="./bankingTransportation.jsp" title="查询从银行同步的交易流水信息"> <i
                            class="glyph-icon icon-chevron-right"></i>银行业务系统日志
                    </a></li>
                </ul>
            </li>

            <li><a href="javascript:;" title="Forms"> <i
                    class="glyph-icon icon-reorder"></i> 系统设置
            </a>
                <ul>
                    <li><a href="./customer-list.jsp" title="填写档案客户信息">
                        <i class="glyph-icon icon-chevron-right"></i>客户档案管理</a>
                    </li>
                    <li>
                        <a href="./authority-list.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>权限管理</a>
                    </li>

                    <li>
                        <a href="./company-list.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>公司管理</a>
                    </li>

                    <li>
                        <a href="./company-create.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>新增公司</a>
                    </li>

                    <li>
                        <a href="./department-list.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>部门管理</a>
                    </li>

                    <li>
                        <a href="./department-create.jsp" title="点击"><i
                                class="glyph-icon icon-chevron-right"></i>新增部门</a>
                    </li>

                    <li>
                        <a href="./role-list.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>角色管理</a>
                    </li>

                    <li>
                        <a href="./role-create.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>新增角色</a>
                    </li>

                    <li>
                        <a href="./user-list.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>用户管理</a>
                    </li>

                    <li>
                        <a href="./user-create.jsp" title="点击"><i class="glyph-icon icon-chevron-right"></i>新增用户</a>
                    </li>
                </ul>
            </li>

        </ul>
    </div>
</div>