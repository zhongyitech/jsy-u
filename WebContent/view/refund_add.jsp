<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="../css/refund_add.css"/>
    <title>退伙处理申请表</title>

</head>
<body class="jsy-body">
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" style="width: 800px">

            <div class="text-center">
                <h2>退伙处理申请表</h2>
            </div>
            <a href="./invest-list.jsp" class="btn medium bg-gray" title="">
                <span class="button-content">返回</span> </a>

            <form class="form-bordered " action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 申请部门： </label>
                    </div>
                    <div class="form-label col-md-2">
                        <label id="lab-dep " class=" bind " data-bindtype="value"
                               data-member="department"></label>
                    </div>
                    <div class="form-label col-md-2  text-right">
                        <label for="">申请人： </label>
                    </div>
                    <div class="form-label col-md-2 text-center">
                        <label id="label_sqr " class=" bind " data-bindtype="value" data-member="sqr"></label>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for=""> 申请时间： </label>
                    </div>
                    <div class="form-label col-md-2 text-center">
                        <label id="lab-scrq " class=" bind " data-bindtype="value" data-member="scrq"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">1.原基金认购信息 </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 基金名称： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="s_fundname"
                               data-bindtype="list" data-bindobject="fund" data-member="fund.id"
                               data-displaymember="fundName"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for=""> 合同编号:</label>
                    </div>
                    <div class="form-input col-md-4">
                        <input class="bind" id="input_htbh" data-bindtype="value" data-member="contractNum"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 认购日期： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="label_rgrq"
                               data-bindtype="value" data-member="rgrq" data-format="date"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for=""> 认购金额： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="label_rgje"
                               data-bindtype="value" data-member="tzje" data-format="money"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 到期日期： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-info bind" id="label_dqrq"
                               data-bindtype="value" data-member="dqrq" data-format="date"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">2.客户信息 </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tname"> 客户名称： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="lab-cname"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="name"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">证件类型： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="lab-ccardtype"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="credentialsType"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tnubmer">证件号码： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="lab-cardnumber"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="credentialsNumber"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">法定代表人： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="lab-ccardtype"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="fddbr"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-18">3.退伙情况说明 </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 已付收益情况： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-info bind" id="lab_yfsy_descript"
                               data-bindtype="value" data-member="" data-format="date"></label>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for=""> 已付收益总额： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-info bind" id="label_dqrq"
                               data-bindtype="value" data-member="paysy_amount"
                               data-format="money"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-3  ">
                        <label for="">退伙金额(*)： </label>
                    </div>
                    <div class="form-input col-md-3">
                        <input class="datacheck" type="text" name="input_newamount"
                               id="input_newamount" data-minnumber="0">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-3   ">
                        <label for="" id="lab-tname">合同中约定扣除违约金： </label>
                    </div>
                    <div class="form-input col-md-3">
                        <input disabled="disabled" class="bind" id="input_kcwyjbl" data-bindtype="value"
                               data-member="kcwyjbl" data-format="rate"/>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">扣除违约金金额： </label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="bind" id="wyamount" data-bindtype="value" data-member="wyamount"
                               data-format="money"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-tnubmer">合同中约定预期收益率： </label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class=" label-info bind" id="lab-cardnumber"
                               data-bindtype="value" data-member="nhsyl" data-format="rate"></label>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">未付剩余收益额：</label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="label-success bind" id="lab-ccardtype"
                               data-bindtype="value" data-member="ysye" data-format="money"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-3   ">
                        <label for="" id="lab-tname"> 应收回业务提成： </label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class=" label-info bind" id="lab-cname"
                               data-bindtype="value" data-member="ywtc" data-format="rate"></label>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">金额： </label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="label-success bind" id="ywtc_amount"
                               data-bindtype="value" data-member="ywtc_amount"
                               data-format="money"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-tnubmer">应收回管理提成： </label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class=" label-info bind" id="lab-cardnumber"
                               data-bindtype="value" data-member="gltc" data-format="rate"></label>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">金额：</label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="label-success bind" id="ywtc_amount"
                               data-bindtype="value" data-member="gltc_amount"
                               data-format="money"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-18">4.收款账户信息 </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tname">收款人账户名： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="custome_account"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="name"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">收款人开户行： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="custome_bank"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="khh"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tname">收款人账号： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="customer_bankaccount"
                               data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="yhzh"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-18">5.特殊情况备注说明 </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-10">
                        <textarea name="input_text" id="lab-bz" class="small-textarea"></textarea>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-4 ">
                        <button type="button" id="save_btn" class="btn  large primary-bg ">提交申请</button>
                        <a href="./invest-list.jsp" class=""><span>取消</span></a>
                    </div>
                    <div class="form-input col-md-8 ">
                        <div class="infobox hide error-bg mrg0A">
                            <p id="infotext">
                                Error message box using the color scheme. <a href="#"
                                                                             title="Link example">Link example</a>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Message box  -->
<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
    <div id="jy_panel" style="width: 98%;">
        <div class="text-center" style="height:80px;">
            <h3 id="jsy_messagebox_msg"></h3>
        </div>
        <div class="text-center">
            <a href="#" class="btn large primary-bg" title="" id="jsy_msgbox_comfirm_dialog"><span
                    class="button-content">确定</span>
            </a>
        </div>
    </div>
</div>
<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
<!-- Message box  -->
<script type="text/javascript" src="../js/refund_add.js"></script>
</body>
</html>