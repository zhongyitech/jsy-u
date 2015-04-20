<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
    <link rel="stylesheet" href="/css/projectinfo.css" />
    <title>项目字段设置</title>
</head>

<body >
<div id="page-wrapper">
<jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <div id="page-content" class="page-view pad25T">
            <section id="dropdowns">
                <div class="page-header">
                    <h1>
                        <a id="linkProject" href="#"><span id="project_name"></span></a>
                    </h1>
                </div>
            </section>


            <div id="fund-form" class="center-margin col-md-10">

                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label >利息计算方式：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <select id="interestType">
                            <option value="none"></option>
                            <option value="singleCount">单利</option>
                            <option value="costCount">复利</option>
                            <option value="dayCount">日复利</option>
                        </select>
                    </div>

                    <div id="label_daycount" class="form-label col-md-2">
                        <label>日复利日利率：</label>
                    </div>
                    <div id="value_daycount" class="form-input col-md-4">
                        <input id="daycount_per" placeholder="例如：0.0001"/>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label >管理费率：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="manage_per" placeholder="例如：0.3"/>
                    </div>

                    <div class="form-label col-md-2">
                        <label >渠道费率：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="community_per" placeholder="例如：0.3"/>
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label>违约金利率：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="penalty_per" type="text" placeholder="例如：0.3"/>
                    </div>
                    <div class="form-label col-md-2">
                        <label >期限（年）：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <div class="form-label col-md-6">
                            <input id="year1" placeholder="约定归还年数"/>
                        </div>
                        <div class="form-label col-md-6">
                            <input id="year2" placeholder="缓冲归还年数"/>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2">
                        <label >借款率：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="borrow_per" placeholder="例如：0.3"/>
                    </div>
                    <div class="form-label col-md-2">
                        <label >基金：</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input id="fundname" type="text" placeholder="自动联想"/>
                        <input id="_fundname" type="hidden"/>
                    </div>
                </div>

                <br />
                <div class="form-row pad3B">
                    <div>
                        <button class="but-ui btn primary-bg large" type="button">
                            <span class="button-content" id="submitSettings">提交</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
<script type="text/javascript" src="/js/projectAttrSettings.js"></script>
</body>
</html>