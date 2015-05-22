<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <title>档案管理</title>

    <style type="text/css">
        .black_overlay {
            display: none;
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 5;
            -moz-opacity: 0.8;
            opacity: .80;
            filter: alpha(opacity=80);
        }

        .white_content {
            display: none;
            position: absolute;
            top: 25%;
            left: 25%;
            width: 50%;
            height: 100%;
            padding: 16px;
            border: 16px solid rgb(32, 63, 97);
            background-color: white;
            z-index: 6;
            overflow: auto;
        }

        #light {
            height: 300px;
        }

        #b_light {
            height: 300px;
        }
    </style>
</head>
<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" class="page-view pad25T">
            <div class="content-box box-toggle ">

                <div class="content-box-header primary-bg">
                    <span class="float-left">档案浏览</span>

                    <a href="#" class="float-right icon-separator btn toggle-button" title="最近领用记录">
                        <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="keyword-input"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button"><span class="button-content">搜索</span></button>
                    </div>
                </div>


                <div class="content-box-wrapper">

                    <div id="table-pager-1" class="page-bar"></div>

                    <table class="table table-hover table-striped text-center mrg0B" id="filepackage-get-table">
                        <thead>
                            <tr>
                                <th><span class="">档案号</span></th>
                                <th><span class="">档案名称</span></th>
                                <th><span class="">档案类型</span></th>
                                <th><span class="">合同编号</span></th>
                                <th><span class="">合同名称</span></th>
                                <th><span class="">项目名称</span></th>
                                <th><span class="">基金名称</span></th>
                                <th><span class="">签约方</span></th>
                                <th><span class="item-date">签约日期</span></th>
                                <th><span class="">移交人</span></th>
                                <th><span class="item-date">移交日期</span></th>
                                <th><span class="">档案室</span></th>
                                <th><span class="">档案柜编号</span></th>
                                <th><span class="">状态</span></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <br>

                    <div id="itme_details"></div>
                </div>

            </div>
            <div class="content-box box-toggle ">
                <%--<h3 class="content-box-header primary-bg">--%>
                <%--<span class="float-left">借阅记录</span> <a href="#"--%>
                <%--class="float-right icon-separator btn toggle-button"--%>
                <%--title="最近领用记录"> <i--%>
                <%--class="glyph-icon icon-toggle icon-chevron-down"></i>--%>
                <%--</a> <span class="filter-keyword"> <i--%>
                <%--class="glyph-icon icon-search transparent"></i> <input--%>
                <%--placeholder="关键字搜索..." name="" id="keyword-input2"> <span--%>
                <%--id="keyword-button2">搜索</span>--%>
                <%--</span>--%>
                <%--</h3>--%>

                <div class="content-box-header primary-bg">
                    <span class="float-left">借阅记录</span>

                    <a href="#"
                       class="float-right icon-separator btn toggle-button"
                       title="最近领用记录"> <i
                            class="glyph-icon icon-toggle icon-chevron-down"></i>
                    </a>

                    <div class="keyword-view float-right">
                        <div class="keyword-input-width float-left">
                            <div class="form-input">
                                <div class="form-input-icon">
                                    <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
                                    <input type="text" placeholder="关键字搜索..."
                                           class="radius-top-left-100 radius-bottom-left-100 keyword-input"
                                           id="keyword-input2"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
                                id="keyword-button2"><span class="button-content">搜索</span></button>
                    </div>
                </div>

                <div class="content-box-wrapper">
                    <%--<div class="items-page">--%>
                    <%--<div onselectstart="return false" class="items-page-item" id="page-first2">第一页</div>--%>
                    <%--<div onselectstart="return false" class="items-page-numbers"--%>
                    <%--id="pacts-get-pages2"></div>--%>
                    <%--<div onselectstart="return false" class="items-page-item" id="page-last2">最后一页</div>--%>
                    <%--<div class="items-page-total-label">查询结果：</div>--%>
                    <%--<div class="items-page-total" id="pacts-page-total2" title=""></div>--%>
                    <%--</div>--%>

                    <div id="table-pager-2" class="page-bar"></div>

                    <table class="table table-hover table-striped text-center mrg0B" id="inout_table">
                        <thead>
                            <tr>
                                <th><span class="">档案号</span></th>
                                <th><span class="">档案名称</span></th>
                                <th><span class="">档案类型</span></th>
                                <th><span class="">合同编号</span></th>
                                <th><span class="">合同名称</span></th>
                                <th><span class="">借阅人</span></th>
                                <th><span class="">借阅日期</span></th>
                                <th><span class="">应归还日期</span></th>
                                <th><span class="">归还日期</span></th>
                                <th><span class="">备注</span></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <br/>

                </div>
            </div>
        </div>
    </div>


    <!-- dialog -->
    <div id="light" class="white_content">
        <%--<a href="javascript:;" class="primary-bg medium radius-all-2 display-block btn black-modal-80">--%>
        <%--<span class="button-content text-center float-none font-size-11 text-transform-upr">White 60% overlay</span>--%>
        <%--</a>--%>
        <div class="hide" id="black-modal-60" title="Basic dialog title">
            <div class="pad10A">
                Dialog content here
            </div>
        </div>
        <div id="jy_panel" style="width: 600px;">
            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>档案号：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="dialog_dah" readonly="readonly"/>
                    </div>

                    <div class="form-label col-md-2  ">
                        <label>档案名称：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="dialog_damc" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>借阅人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="dialog_jyr" readonly="readonly"/>
                    </div>

                    <div class="form-label col-md-2  ">
                        <label>借阅日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="dialog_jyrq" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>归还日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input class="item-date tcal" id="dialog_ghrq"/>
                    </div>


                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>备注：</label>
                    </div>
                    <div class="form-input col-md-10">
                        <input type="text" id="dialog_bz"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-6 text-center">
                        <a href="#" class="btn large primary-bg" title="" id="comfirm_dialog">
                            <span class="button-content">确定</span>
                        </a> <a href="#" class="btn large ui-state-default" title="" id="cancel_dialog">
                        <span class="button-content">取消</span>
                    </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div id="fade" class="black_overlay"></div>


    <!-- borrow dialog -->
    <div id="b_light" class="white_content">
        <%--<a href="javascript:;" class="primary-bg medium radius-all-2 display-block btn black-modal-80">--%>
        <%--<span class="button-content text-center float-none font-size-11 text-transform-upr">White 60% overlay</span>--%>
        <%--</a>--%>
        <%--<div class="hide" id="black-modal-60" title="Basic dialog title">--%>
        <%--<div class="pad10A">--%>
        <%--Dialog content here--%>
        <%--</div>--%>
        <%--</div>--%>
        <div id="b_jy_panel" style="width: 600px;">
            <form class="form-bordered " action="/" method="post">
                <input type="hidden" id="currentPid"/>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>档案号：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="b_dialog_dah" readonly="readonly"/>
                    </div>

                    <div class="form-label col-md-2  ">
                        <label>档案名称：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="b_dialog_damc" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>借阅人：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="b_dialog_jyr_show"/>
                        <input type="hidden" id="b_dialog_jyr"/>
                    </div>

                    <div class="form-label col-md-2  ">
                        <label>借阅日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input type="text" id="b_dialog_jyrq" readonly="readonly"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>归还日期：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input class="item-date tcal" id="b_dialog_ghrq"/>
                    </div>


                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label>备注：</label>
                    </div>
                    <div class="form-input col-md-10">
                        <input type="text" id="b_dialog_bz"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-6 text-center">
                        <a href="#" class="btn large primary-bg" title="" id="b_comfirm_dialog">
                            <span class="button-content">确定</span>
                        </a> <a href="#" class="btn large ui-state-default" title="" id="b_cancel_dialog">
                        <span class="button-content">取消</span>
                    </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<div id="b_fade" class="black_overlay"></div>
<script type="text/javascript" src="/js/filepackage-management.js"></script>
</body>
</html>