<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/common/bootstrap.css" />
    <link rel="stylesheet" href="/css/projectinfo.css" />
    <title>项目明细</title>
</head>

<body >
<div id="page-wrapper">
<jsp:include page="./navi.jsp"/>
        <div id="page-content-wrapper">
            <div id="page-content" class="page-view pad25T">
                <section id="dropdowns">
                    <div class="page-header">
                        <h1>
                            <span id="project_name"></span>

                            <button id="attrSettingBtn" type="button" class="btn btn-default" aria-label="Left Align">
                                <span class="glyphicon glyphicon-cog" aria-hidden="true">参数设置</span>
                            </button>

                            <button id="detailsBtn" type="button" class="btn btn-default" aria-label="Left Align">
                                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true">存档明细</span>
                            </button>

                        </h1>
                    </div>
                </section>

                <div id="fund-form" class="center-margin col-md-10">

                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>项目编号：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <span id="project_id"></span>
                        </div>

                        <div class="form-label col-md-2">
                            <label>关联基金：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <span id="fund_name"></span>
                        </div>

                    </div>




                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>项目当前流程：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <span id="currentStageName"></span>
                        </div>

                        <div class="form-label col-md-2">
                            <label>项目状态：</label>
                        </div>
                        <div class="form-input col-md-4">
                            <span id="currentStatus"></span>
                        </div>
                    </div>

                    <%--<div class="form-row">--%>
                        <%--<div class="form-label col-md-2">--%>
                            <%--<label >利息计算方式：</label>--%>
                        <%--</div>--%>
                        <%--<div class="form-input col-md-4">--%>
                            <%--<select id="interestType">--%>
                                <%--<option value="none"></option>--%>
                                <%--<option value="singleCount">单利</option>--%>
                                <%--<option value="costCount">复利</option>--%>
                                <%--<option value="dayCount">日复利</option>--%>
                            <%--</select>--%>
                        <%--</div>--%>

                        <%--<div id="label_daycount" class="form-label col-md-2">--%>
                            <%--<label>日复利日利率：</label>--%>
                        <%--</div>--%>
                        <%--<div id="value_daycount" class="form-input col-md-4">--%>
                            <%--<input id="daycount_per" placeholder="例如：0.0001"/>--%>
                        <%--</div>--%>
                    <%--</div>--%>

                </div>


                <!-- flow instance -->
                <div id="panel_gatherInfo" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.1：资料采集（项目部负责并填写）</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.1：资料采集（项目部负责并填写）">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <form class="form-bordered " action="/" method="post" id="form_gatherInfo">
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 项目证照：</label>
                                </div>

                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_certificateFiles">
                                        </ul>
                                    </div>
                                    <input id="certificateFiles" class="input-file" name="attachment" type="file" multiple/>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="certificateFilesDesc"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 债务报告：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_debtFiles">
                                        </ul>
                                    </div>
                                    <input id="debtFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="debtFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 财务报表：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_financialFiles">
                                        </ul>
                                    </div>
                                    <input id="financialFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="financialFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 对公批文：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_toPublicFiles">
                                        </ul>
                                    </div>
                                    <input id="toPublicFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="toPublicFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 评估报告：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_analyseReportFiles">
                                        </ul>
                                    </div>
                                    <input id="analyseReportFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="analyseReportFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 贷款申请书：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_loanFiles">
                                        </ul>
                                    </div>
                                    <input id="loanFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="loanFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 商务计划书：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_businessPlanFiles">
                                        </ul>
                                    </div>
                                    <input id="businessPlanFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="businessPlanFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div>
                                    <div id="others_files">
                                        <div id="exist_others">

                                        </div>
                                        <div>
                                            <div class="form-input col-md-10">
                                                <input type="button" id="gatherInfo_add_file" value="添加其他文件" style="width: 100px;">
                                            </div>
                                            <div class="form-input col-md-4">
                                                <input id="attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                            </div>
                                            <div class="form-input col-md-6">
                                                <textarea id="attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" id="complete_gather">提交</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <!-- flow instance -->
                <div id="panel_gatherOA" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.2：资料评判——OA审核</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.2：资料评判——OA审核">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper" id="oagrather_form">
                        <div class="form-row">
                            <div>
                                <div id="oa_gather_others_files">
                                    <div id="exist_oa_gather_others">

                                    </div>
                                    <div>
                                        <div class="form-input col-md-10">
                                            <input type="button" id="oa_gather_add_file" value="添加其他文件" style="width: 100px;">
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input id="oa_gather_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                        </div>
                                        <div class="form-input col-md-6">
                                            <textarea id="oa_gather_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="form-row pad3B">
                            <div>
                                <button class="but-ui btn primary-bg large" type="button">
                                    <span class="button-content" id="complete_oagather">提交</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- flow instance -->
                <div id="panel_research" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.3：现场考察（方案确定）（项目部负责发起申请，法务部，财务部配合）</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.3：现场考察（方案确定）（项目部负责发起申请，法务部，财务部配合）">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <form id="form_research" class="form-bordered " action="/" method="post">
                            <div class="form-row">

                                <div class="form-label col-md-2">
                                    <label >(*) 法律尽调报告：</label>
                                </div>

                                <div class="form-input col-md-2">
                                    <div >
                                        <ul id="exist_lowFiles">
                                        </ul>
                                    </div>
                                    <input id="lowFiles" class="input-file" name="attachment" type="file">
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="lowDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="lowDesc2" name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >(*) 项目尽职调查报告：</label>
                                </div>
                                <div class="form-input col-md-2">
                                    <div >
                                        <ul id="exist_projectFiles">
                                        </ul>
                                    </div>
                                    <input id="projectFiles" class="input-file" name="attachment" type="file">
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="projectDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="projectDesc2" name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >财务报告：</label>
                                </div>
                                <div class="form-input col-md-2">
                                    <div >
                                        <ul id="exist_finanFiles">
                                        </ul>
                                    </div>
                                    <input id="finanFiles" class="input-file" name="attachment" type="file">
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="finanDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>

                                <div class="form-input col-md-4">
                                    <textarea id="finanDesc2" name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                </div>
                            </div>


                            <div class="form-row">
                                <div>
                                    <div id="research_others_files">
                                        <div id="exist_research_others">

                                        </div>
                                        <div>
                                            <div class="form-input col-md-10">
                                                <input type="button" id="research_add_file" value="添加其他文件" style="width: 100px;">
                                            </div>
                                            <div class="form-input col-md-4">
                                                <input id="research_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                            </div>
                                            <div class="form-input col-md-4">
                                                <textarea id="research_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                            </div>
                                            <div class="form-input col-md-4">
                                                <textarea id="research_attachment2_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" id="complete_research">提交</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <!-- flow instance -->
                <div id="panel_researchOA" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.4：现场考察——OA审核</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.4：现场考察——OA审核">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper" id="research_form">
                        <div class="form-row">
                            <div>
                                <div id="oa_research_others_files">
                                    <div id="exist_oa_research_others">

                                    </div>
                                    <div>
                                        <div class="form-input col-md-10">
                                            <input type="button" id="oa_research_add_file" value="添加其他文件" style="width: 100px;">
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input id="oa_research_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                        </div>
                                        <div class="form-input col-md-6">
                                            <textarea id="oa_research_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="form-row pad3B">
                            <div>
                                <button class="but-ui btn primary-bg large" type="button">
                                    <span class="button-content" id="complete_oa_research">提交</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- flow instance -->
                <div id="panel_meeting" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.5：投决会（项目部负责发起申请，法务部，财务部配合）</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.5：投决会（项目部负责发起申请，法务部，财务部配合）">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <form id="form_meeting" class="form-bordered " action="/" method="post">

                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >(*) 会议纪要：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_meetingFiles">
                                        </ul>
                                    </div>
                                    <input id="meetingFiles" class="input-file" name="attachment" type="file" multiple>
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="meetingDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>


                            <div class="form-row">
                                <div>
                                    <div id="meeting_others_files">
                                        <div id="meeting_exist_others">

                                        </div>
                                        <div>
                                            <div class="form-input col-md-10">
                                                <input type="button" id="meeting_add_file" value="添加其他文件" style="width: 100px;">
                                            </div>
                                            <div class="form-input col-md-4">
                                                <input id="meeting_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                            </div>
                                            <div class="form-input col-md-6">
                                                <textarea id="meeting_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" id="complete_meeting">提交</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <!-- flow instance -->
                <div id="panel_otherEA" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤1.6：第三方机构（律师事务所，会计师事务所，第三方评估机构）（项目部负责发起申请，法务部，财务部配合）</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤1.6：第三方机构（律师事务所，会计师事务所，第三方评估机构）（项目部负责发起申请，法务部，财务部配合）">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <form id="form_thirdpartyLow" class="form-bordered " action="/" method="post">
                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >法律尽调报告：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_thirdpartyLowFiles">
                                        </ul>
                                    </div>
                                    <input id="thirdpartyLowFiles" class="input-file" name="attachment" type="file">
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="thirdpartyLowDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >审计报告/验资报告：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_testFiles">
                                        </ul>
                                    </div>
                                    <input id="testFiles" class="input-file" name="attachment" type="file">
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="testFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >评估报告（土地和房产）：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div >
                                        <ul id="exist_houseFiles">
                                        </ul>
                                    </div>
                                    <input id="houseFiles" class="input-file" name="attachment" type="file">
                                </div>
                                <div class="form-input col-md-6">
                                    <textarea id="houseFilesDesc" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                </div>
                            </div>


                            <div class="form-row">
                                <div>
                                    <div id="thirdpartyLow_others_files">
                                        <div id="exist_thirdpartyLow_others">

                                        </div>
                                        <div>
                                            <div class="form-input col-md-10">
                                                <input type="button" id="thirdpartyLow_add_file" value="添加其他文件" style="width: 100px;">
                                            </div>
                                            <div class="form-input col-md-4">
                                                <input id="thirdpartyLow_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                            </div>
                                            <div class="form-input col-md-6">
                                                <textarea id="thirdpartyLow_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" id="complete_thirdpartyLow">提交</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                <!-- flow instance -->
                <div id="panel_makeContact" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤2：项目合同——选择预发行基金以及录入合同资料（项目部负责发起申请，法务部，财务部配合）</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤2：项目合同——选择预发行基金以及录入合同资料（项目部负责发起申请，法务部，财务部配合）">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper">
                        <form id="form_signer" class="form-bordered " action="/" method="post">
                            <div id="div_default_signer1" class="form-row">
                                <div class="form-label col-md-2">
                                    <label >甲方：</label>
                                    <input id="signname1" value="甲方" name="exist_signer_name" type="hidden"/>
                                </div>

                                <div class="form-input col-md-4">
                                    <input id="signvalue1" name="exist_signer_value" type="text" placeholder="输入名称"/>
                                </div>
                                <div class="form-label col-md-2">
                                    <label >乙方：</label>
                                    <input id="signname2" value="乙方" name="exist_signer_name" type="hidden"/>
                                </div>
                                <div class="form-input col-md-4">
                                    <input id="signvalue2" name="exist_signer_value" type="text" placeholder="输入名称"/>
                                </div>

                            </div>
                            <div id="div_default_signer2" class="form-row">
                                <div class="form-label col-md-2">
                                    <label >丙方：</label>
                                    <input id="signname3" value="丙方" name="exist_signer_name" type="hidden"/>
                                </div>

                                <div class="form-input col-md-4">
                                    <input id="signvalue3" name="exist_signer_value" type="text" placeholder="输入名称"/>
                                </div>

                            </div>

                            <div id="add_new_sign_div" class="form-row">
                                <div class="form-label col-md-2">
                                    <input id="signX_name" type="text" placeholder="某方"/>
                                </div>

                                <div class="form-input col-md-4">
                                    <input id="signX_value" type="text" placeholder="输入某方的名称"/>
                                </div>
                                <div class="form-label col-md-2">
                                    <input id="add_more_signer" type="button" value="添加更多签署方"/>
                                </div>

                            </div>

                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >有限合伴：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <%--<select id="company">--%>
                                    <%--</select>--%>
                                    <label id="company"></label>
                                </div>

                                <div class="form-label col-md-2">
                                    <label >关联基金：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <%--<select id="relate_funds">--%>
                                    <%--</select>--%>
                                    <label id="relate_fund"></label>
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
                                <div class="form-label col-md-2   ">
                                    <label >违约金率：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input id="notNormal_per" placeholder="例如：0.3"/>
                                </div>

                                <div class="form-label col-md-2">
                                    <label >借款率：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input id="borrow_per" placeholder="例如：0.3"/>
                                </div>
                            </div>


                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label >年利率：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <input id="interest_per" placeholder="例如：0.3"/>
                                </div>
                                <div class="form-label col-md-2">
                                    <label >期限（年）：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <div class="form-label col-md-5">
                                        <input id="year1" placeholder="约定归还年数"/>
                                    </div>
                                    <div class="form-label col-md-5">
                                        <input id="year2" placeholder="缓冲归还年数"/>
                                    </div>
                                </div>

                            </div>


                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label >利息计算方式：</label>
                                </div>
                                <div class="form-input col-md-4">
                                    <label><input type="radio" name="interestType" value="singleCount">单利</label>
                                    <label><input type="radio" name="interestType" value="costCount">复利</label>
                                    <label><input type="radio" name="interestType" value="dayCount">日复利</label>
                                </div>

                                <div id="label_daycount" class="form-label col-md-2">
                                    <label>日复利日利率：</label>
                                </div>
                                <div id="value_daycount" class="form-input col-md-4">
                                    <input id="daycount_per" placeholder="例如：0.0001"/>
                                </div>
                            </div>
                        </form>

                        <div class="panel panel-default">
                            <div id="attention_head" class="panel-heading">
                                <form class="form-inline">
                                    <div class="form-group">
                                        <label class="sr-only" for="attention_name">注意事项</label>
                                        <input type="text" class="form-control" id="attention_name" placeholder="注意事项">
                                    </div>
                                    <div class="form-group">
                                        <label class="sr-only" for="attention_value">风险提示栏</label>
                                        <input type="text" class="form-control" id="attention_value" placeholder="风险提示栏">
                                    </div>
                                    <button id="add_newAttention" type="submit" class="btn btn-default">添加</button>
                                </form>
                            </div>
                            <div class="panel-body">
                                <table id="attentions" class="table table-striped text-center mrg0B">
                                    <thead>
                                    <tr>
                                        <th class="text-center">注意事项</th>
                                        <th class="text-center">风险提示栏</th>
                                    </tr>
                                    </thead>
                                    <tbody>


                                    <tr><td>规模<input id="attname1" type="hidden" value="规模"/></td>            <td><input id="attvalue1" type="text"/></td></tr>
                                    <tr><td>付息利息<input id="attname3" type="hidden" value="付息利息"/></td>        <td><input id="attvalue3" type="text"></td></tr>
                                    <tr><td>续存期年限<input id="attname4" type="hidden" value="续存期年限"/></td>       <td><input id="attvalue4" type="text"></td></tr>
                                    <tr><td>基金合作条件<input id="attname5" type="hidden" value="基金合作条件"/></td>     <td><input id="attvalue5" type="text"></td></tr>
                                    <tr><td>关联担保单位<input id="attname6" type="hidden" value="关联担保单位"/></td>     <td><input id="attvalue6" type="text"></td></tr>
                                    <tr><td>关联担保个人信息<input id="attname7" type="hidden" value="关联担保个人信息"/></td>  <td><input id="attvalue7" type="text"></td></tr>
                                    <tr><td>项目退出<input id="attname8" type="hidden" value="项目退出"/></td>         <td><input id="attvalue8" type="text"></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div class="form-row">

                            <div id="makeContact_others_files">
                                <div id="exist_makeContact_others">

                                </div>
                                <div id="div_add_more_makeContactFiles">
                                    <div class="form-input col-md-10">
                                        <input type="button" id="makeContact_add_file" value="添加其他文件" style="width: 100px;">
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input id="makeContact_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                    </div>
                                    <div class="form-input col-md-6">
                                        <textarea id="makeContact_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        <div id="div_submit_makecontact" class="form-row pad3B" >
                            <div>
                                <button class="but-ui btn primary-bg large" type="button">
                                    <span class="button-content" id="complete_makeContact">提交</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>




                <!-- flow instance -->
                <div id="panel_makeContactOA" style="display:none; " class="content-box box-toggle content-box-closed">
                    <div class="content-box-header primary-bg">
                        <span class="float-left">步骤2.1：项目合同——OA审核</span>
                        <a href="#" class="float-right icon-separator btn toggle-button" title="步骤3.1：项目合同——OA审核">
                            <i class="glyph-icon icon-toggle icon-chevron-down"></i>
                        </a>
                    </div>
                    <div class="content-box-wrapper" id="makecontact_form">
                        <div class="form-row">
                            <div>
                                <div id="oa_makecontact_others_files">
                                    <div id="exist_oa_makecontact_others">

                                    </div>
                                    <div>
                                        <div class="form-input col-md-10">
                                            <input type="button" id="oa_makecontact_add_file" value="添加其他文件" style="width: 100px;">
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input id="oa_makecontact_attachment_1"  class="input-file" name="attachment" type="file" multiple>
                                        </div>
                                        <div class="form-input col-md-6">
                                            <textarea id="oa_makecontact_attachment_txt_1"  name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="form-row pad3B">
                            <div>
                                <button class="but-ui btn primary-bg large" type="button">
                                    <span class="button-content" id="complete_oamakecontact">提交</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

</div>
<script type="text/javascript" src="/js/flow/tools.js"></script>
<script type="text/javascript" src="/js/flow/gatherInfo.js"></script>
<script type="text/javascript" src="/js/flow/gatherOA.js"></script>
<script type="text/javascript" src="/js/flow/makeContact.js"></script>
<script type="text/javascript" src="/js/flow/makeContactOA.js"></script>
<script type="text/javascript" src="/js/flow/meeting.js"></script>
<script type="text/javascript" src="/js/flow/otherEA.js"></script>
<script type="text/javascript" src="/js/flow/research.js"></script>
<script type="text/javascript" src="/js/flow/researchOA.js"></script>
<script type="text/javascript" src="/js/flow/flowLogic.js"></script>
<script type="text/javascript" src="/js/projectinfo.js"></script>
</body>
</html>