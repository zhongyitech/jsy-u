<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<textarea class="template" id="navigate-template">
    <ul>
        {#foreach $T as menu}
        <li>
            <a href="javascript:;" title="{$T.menu.title}"><i class="glyph-icon icon-reorder"></i>{$T.menu.title}</a>
            <ul>
                {#foreach $T.menu.children as item}
                <li>
                    <a href="{$T.item.url}" title="{$T.item.title}"><i class="glyph-icon icon-chevron-right"></i>{$T.item.title}</a>
                </li>
                {#/for}
            </ul>
        <li>
        {#/for}
    </ul>
</textarea>
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
                                <button class="btn-ui btn bg-green large medium float-right" id="login-button">
                                    <span class="button-content">登录</span>
                                </button>
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
        <div class="copyright">技术支持QQ群：364396548</div>
    </div>
</div>
<div id="page-sidebar" class="scrollable-content">
    <div id="sidebar-menu"></div>
</div>
<div id="loader-overlay" class="ui-front hide loader ui-widget-overlay bg-gray opacity-60" style=""><img src="/images/loader-dark.gif" alt=""></div>

<script type="text/javascript">
//    var data=[
//        {text:"基金管理",items:[
//            {text:"基金信息",link:"fund-list.jsp"},
//            {text:"新增基金",link:"fund-create.jsp"},
//            {text:"合同登记",link:"hetong-dengji.jsp"},
//            {text:"合同领用",link:"hetong-lingyong.jsp"},
//            {text:"合同归还",link:"hetong-guihuan.jsp"}
//        ]},
//        {text:"客户管理",items:[
//            {text:"添加投资档案",link:"investment.jsp"},
//            {text:"打印投资确认书",link:"investment-print.jsp"},
//            {text:"客户档案管理",link:"invest-list.jsp"},
//            {text:"合同查询",link:"hetong-query.jsp"},
//            {text:"提成查询",link:"commission_query.jsp"},
//            {text:"提成申请",link:"commission_apply.jsp"},
//            {text:"兑付查询",link:"cash_app.jsp"},
//            {text:"兑付申请",link:"cash_list.jsp"},
//            {text:"操作记录日志",link:"czjlrz-list.jsp"}
//        ]},
//        {text:"特殊申请",items:[
//            {text:"汇总信息",link:"specialSummary.jsp"},
//            {text:"特殊申请管理",link:"special-treat-list.jsp"},
//            {text:"委托付款申请",link:"special-paytreat.jsp"},
//            {text:"到期转投申请",link:"special_treat.jsp"},
//            {text:"未到期转投申请",link:"special_untreat.jsp"},
//            {text:"退伙申请",link:"refund_add.jsp"},
//            {text:"续投申请",link:"continuedinvestment-add.jsp"},
//            {text:"合并申请",link:"special-merge.jsp"}
//        ]},
//        {text:"项目管理",items:[
//            {text:"新建项目",link:"new_project.jsp"},
//            {text:"项目列表",link:"project_list.jsp"},
//            {text:"新增汇款记录",link:"new_pay_record.jsp"},
//            {text:"新增收款记录",link:"new_receive_record.jsp"},
//            {text:"项目转款明细表",link:"pay_record_list.jsp"},
//            {text:"项目结算",link:"end_project.jsp"}
//        ]},
//        {text:"档案管理",items:[
//            {text:"借阅/查询",link:"filepackage-list.jsp"},
//            {text:"档案入库",link:"filepackage-add.jsp"}
//        ]},
//        {text:"银行业务",items:[
//            {text:"付款单查询",link:"bankingpaymentorder.jsp"},
//            {text:"记账凭证生成设置",link:"bankingTransportation.jsp"},
//            {text:"记账凭证查询",link:"bankingTransportation.jsp"},
//            {text:"银行余额查询",link:"bankingTransportation.jsp"},
//            {text:"交易明细查询",link:"bankingTransportation.jsp"},
//            {text:"失败退票查询",link:"bankingTransportation.jsp"},
//            {text:"电子回单管理",link:"bankingTransportation.jsp"},
//            {text:"银行业务系统日志",link:"bankingTransportation.jsp"}
//        ]},
//        {text:"系统设置",items:[
//            {text:"客户档案管理",link:"customer-list.jsp"},
//            {text:"项目模板角色设置",link:"project-model-setting.jsp"},
//            {text:"权限管理",link:"authority-list.jsp"},
//            {text:"公司(有限合伙)管理",link:"company-list.jsp"},
//            {text:"部门管理",link:"department-list.jsp"},
//            {text:"角色管理",link:"role-list.jsp"},
//            {text:"用户管理",link:"user-list.jsp"},
//            {text:"新增用户",link:"user-create.jsp"}
//        ]}
//    ];
    $("#sidebar-menu").renderData("#navigate-template",$.io.get(true,{url:"/api/menusRole/getMenus"}).data());
</script>