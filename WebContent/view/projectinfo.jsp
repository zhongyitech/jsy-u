<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <jsp:include page="./head.jsp"></jsp:include>
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" href="projectinfo.css" />
    <script type="text/javascript" src="./flowLogic.js"></script>
    <script type="text/javascript" src="./projectinfo.js"></script>
    <title>项目明细</title>
</head>

<body class="page-body">
<div id="page-wrapper">
<jsp:include page="./navi.jsp"></jsp:include>
        <div id="page-content-wrapper">
            <div id="page-content" class="page-view pad25T">
                <section id="dropdowns">
                    <div class="page-header">
                        <h1>某房地产融资项目</h1>
                    </div>
                </section>

                <%--<p>--%>
                    <%--<button class="btn btn-large btn-primary" type="button">汇款</button>--%>
                    <%--<button class="btn btn-large btn-primary" type="button">收款</button>--%>
                    <%--<button class="btn btn-large btn-primary" type="button">结算</button>--%>
                <%--</p>--%>


                <div class="center-margin col-md-10" id="fund-form">


                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>项目编号：</label>
                        </div>
                        <div class="form-input col-md-4">
                            001
                        </div>

                        <div class="form-label col-md-2">
                            <label>项目名称：</label>
                        </div>
                        <div class="form-input col-md-4">
                            某房地产融资项目
                        </div>

                    </div>

                    <div class="form-row">
                        <div class="form-label col-md-2">
                            <label>关联基金：</label>
                        </div>
                        <div class="form-input col-md-4">
                            基金1
                        </div>

                        <div class="form-label col-md-2">
                            <label>项目当前流程：</label>
                        </div>
                        <div class="form-input col-md-4">
                            调研者上传被调查对象信息
                        </div>

                    </div>

                </div>


                <!-- flow instance -->
                <div class="panel panel-default" id="panel_gatherInfo" style="display:none; ">
                    <div class="panel-body">
                        <section id="gatherInfo">
                            <div class="page-header">
                                <h3>步骤1.1：资料采集（项目部负责并填写）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">(*) 项目证照：</label>
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
                                        <label for="">(*) 债务报告：</label>
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
                                        <label for="">(*) 财务报表：</label>
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
                                        <label for="">(*) 对公批文：</label>
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
                                        <label for="">(*) 商务计划书：</label>
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

                                        <table class="item-table" id="fileupdate">
                                            <thead>
                                            <tr>
                                                <th class="text-left"></th>
                                            </tr>
                                            </thead>
                                        </table>
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
                        </section>
                    </div>
                </div>



                <!-- flow instance -->
                <div class="panel panel-default" id="panel_gatherOA" style="display:none; ">
                    <div class="panel-body">
                        <section id="gatherOA">
                            <div class="page-header">
                                <h3>步骤1.2：资料评判——OA审核</h3>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2">
                                    <label for="">评审结果：</label>
                                </div>

                                <div class="form-input col-md-4">
                                    通过
                                </div>

                            </div>
                        </section>
                    </div>
                </div>

                <!-- flow instance -->
                <div class="panel panel-default" id="panel_research" style="display:none; ">
                    <div class="panel-body">
                        <section id="research">
                            <div class="page-header">
                                <h3>步骤1.3：现场考察（方案确定）（项目部负责发起申请，法务部，财务部配合）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">

                                    <div class="form-label col-md-2">
                                        <label for="">(*) 法律进调报告：</label>
                                    </div>

                                    <div class="form-input col-md-2">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">(*) 项目进调报告：</label>
                                    </div>
                                    <div class="form-input col-md-2">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">财务报告：</label>
                                    </div>
                                    <div class="form-input col-md-2">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="备注栏"></textarea>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <textarea name="input_text" class="small-textarea" placeholder="结论栏"></textarea>
                                    </div>
                                </div>


                                <div class="form-row">
                                    <div>
                                        <table class="item-table" >
                                            <thead>
                                            <tr>
                                                <th class="text-left"><input type="button" value="添加其他文件" style="width: 100px;"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-left">
                                                    <input class="input-file" name="attachment" type="file">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="form-input col-md-10" >
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="form-row pad3B">
                                    <div>
                                        <button class="but-ui btn primary-bg large" type="button">
                                            <span class="button-content" >提交</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>


                <!-- flow instance -->
                <div class="panel panel-default" id="panel_researchOA" style="display:none; ">
                    <div class="panel-body">
                        <section id="researchOA">
                            <div class="page-header">
                                <h3>步骤1.4：现场考察——OA审核</h3>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label for="">评审结果：</label>
                                </div>

                                <div class="form-input col-md-4">
                                    通过
                                </div>

                            </div>
                        </section>
                    </div>
                </div>



                <!-- flow instance -->
                <div class="panel panel-default" id="panel_meeting" style="display:none; ">
                    <div class="panel-body">
                        <section id="meeting">
                            <div class="page-header">
                                <h3>步骤1.5：投决会（项目部负责发起申请，法务部，财务部配合）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">会议纪要：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                </div>


                                <div class="form-row">
                                    <div>
                                        <table class="item-table" >
                                            <thead>
                                            <tr>
                                                <th class="text-left"><input type="button" value="添加其他文件" style="width: 100px;"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-left">
                                                    <input class="input-file" name="attachment" type="file">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="form-input col-md-10" >
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="form-row pad3B">
                                    <div>
                                        <button class="but-ui btn primary-bg large" type="button">
                                            <span class="button-content" >提交</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>


                <!-- flow instance -->
                <div class="panel panel-default" id="panel_otherEA" style="display:none; ">
                    <div class="panel-body">
                        <section id="otherEA">
                            <div class="page-header">
                                <h3>步骤1.6：第三方法律机构（项目部负责发起申请，法务部，财务部配合）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">未知证件：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                </div>


                                <div class="form-row">
                                    <div>
                                        <table class="item-table" >
                                            <thead>
                                            <tr>
                                                <th class="text-left"><input type="button" value="添加其他文件" style="width: 100px;"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-left">
                                                    <input class="input-file" name="attachment" type="file">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="form-input col-md-10" >
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="form-row pad3B">
                                    <div>
                                        <button class="but-ui btn primary-bg large" type="button">
                                            <span class="button-content" >提交</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>



                <!-- flow instance -->
                <div class="panel panel-default" id="panel_addCompany" style="display:none; ">
                    <div class="panel-body">
                        <section id="addCompany">
                            <div class="page-header">
                                <h3>步骤2：添加有限合伙企业（项目部负责发起申请，法务部，财务部配合）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">企业名称：</label>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>
                                    <div class="form-label col-md-2   ">
                                        <label for="">执行商务合伙人：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>

                                </div>
                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">法人国籍：</label>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>
                                    <div class="form-label col-md-2   ">
                                        <label for="">法人证件类型：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>

                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">法人证件号码：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>

                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">注册地址：</label>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>
                                    <div class="form-label col-md-2   ">
                                        <label for="">注册编号：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text" id="projectname"/>
                                    </div>

                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">营业执照：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                    <div class="form-label col-md-2   ">
                                        <label for="">组织机构代码证：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">税务证件：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                    <div class="form-label col-md-2   ">
                                        <label for="">银行开户许可证：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2   ">
                                        <label for="">使用代码证：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input class="input-file" name="attachment" type="file">
                                    </div>
                                </div>


                                <div class="form-row">
                                    <div>
                                        <table class="item-table" >
                                            <thead>
                                            <tr>
                                                <th class="text-left"><input type="button" value="添加其他文件" style="width: 100px;"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-left">
                                                    <input class="input-file" name="attachment" type="file">
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div class="form-input col-md-10" >
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="form-row pad3B">
                                    <div>
                                        <button class="but-ui btn primary-bg large" type="button">
                                            <span class="button-content" >提交</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>

                <!-- flow instance -->
                <div class="panel panel-default" id="panel_makeContact" style="display:none; ">
                    <div class="panel-body">
                        <section id="makeContact">
                            <div class="page-header">
                                <h3>步骤3：项目合同——选择预发行基金以及录入合同资料（项目部负责发起申请，法务部，财务部配合）</h3>
                            </div>
                            <form class="form-bordered " action="/" method="post">
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">甲方：</label>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <input type="text" placeholder="输入公司名称"/>
                                    </div>
                                    <div class="form-label col-md-2">
                                        <label for="">乙方：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text" placeholder="输入公司名称"/>
                                    </div>

                                </div>
                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">丙方：</label>
                                    </div>

                                    <div class="form-input col-md-4">
                                        <input type="text" placeholder="输入公司名称"/>
                                    </div>

                                </div>

                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <input type="button" value="添加更多签署方"/>
                                    </div>

                                </div>


                                <div class="form-row">
                                    <div class="form-label col-md-2">
                                        <label for="">关联基金：</label>
                                    </div>
                                    <div class="form-input col-md-4">
                                        <input type="text"/>
                                    </div>

                                </div>

                            </form>




                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <form class="form-inline">
                                        <div class="form-group">
                                            <label class="sr-only" for="exampleInputEmail3">注意事项</label>
                                            <input type="email" class="form-control" id="exampleInputEmail3" placeholder="注意事项">
                                        </div>
                                        <div class="form-group">
                                            <label class="sr-only" for="exampleInputEmail4">风险提示栏</label>
                                            <input type="email" class="form-control" id="exampleInputEmail4" placeholder="风险提示栏">
                                        </div>
                                        <button type="submit" class="btn btn-default">添加</button>
                                    </form>
                                </div>
                                <div class="panel-body">
                                    <table class="table table-striped text-center mrg0B">
                                        <thead>
                                        <tr>
                                            <th class="text-center">编号</th>
                                            <th class="text-center">注意事项</th>
                                            <th class="text-center">风险提示栏</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr><td>1</td><td>规模</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>收益率</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>付息利息</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>续存期年限</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>基金合作条件</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>关联担保单位</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>关联担保个人信息</td><td><input type="text"></td></tr>
                                        <tr><td>2</td><td>项目退出</td><td><input type="text"></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div class="form-row">
                                <div>
                                    <table class="item-table" >
                                        <thead>
                                        <tr>
                                            <th class="text-left"><inputtype="button" value="添加其他文件" style="width: 100px;"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-left">
                                                <input class="input-file" name="attachment" type="file">
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="form-input col-md-10" >
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="form-row pad3B">
                                <div>
                                    <button class="but-ui btn primary-bg large" type="button">
                                        <span class="button-content" >提交</span>
                                    </button>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>



                <!-- flow instance -->
                <div class="panel panel-default" id="panel_makeContactOA" style="display:none; ">
                    <div class="panel-body">
                        <section id="makeContactOA">
                            <div class="page-header">
                                <h3>步骤3.1：项目合同——OA审核</h3>
                            </div>
                            <div class="form-row">
                                <div class="form-label col-md-2   ">
                                    <label for="">评审结果：</label>
                                </div>

                                <div class="form-input col-md-4">
                                    通过
                                </div>

                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>


</div>
</body>
</html>