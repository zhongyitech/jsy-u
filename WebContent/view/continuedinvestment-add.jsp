<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <jsp:include page="./head.jsp"/>
    <link rel="stylesheet" type="text/css" href="/css/continuedinvestment-add.css"/>
    <title>续投申请表</title>
</head>

<body>
<div id="page-wrapper">
    <jsp:include page="./navi.jsp"/>

    <div id="page-content-wrapper">
        <!-- #page-title -->
        <div id="page-content" style="width:800px	">
            <div class="text-center">
                <h2>续投申请表</h2>
            </div>
            <a href="./invest-list.jsp" class=" btn medium bg-gray tooltip-button" title="" data-placement="top"
               data-original-title="客户投资档案管理">
                <span class="button-content text-center float-none font-size-11 text-transform-upr">返回</span>
            </a>

            <form class="form-bordered " id="form_id" action="/" method="post">
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 申请部门： </label>
                    </div>
                    <div class="form-label col-md-2">
                        <label id="lab-dep " class=" bind " data-bindtype="value" data-member="department"></label>
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
                        <label class=" label-info bind" id="s_fundname" data-bindtype="list" data-bindobject="fund"
                               data-member="fund.id" data-displaymember="fundName"></label>
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
                        <label class=" label-info bind" id="label_rgrq" data-bindtype="value" data-member="rgrq"
                               data-format="date"
                                ></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for=""> 认购金额： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="label_rgje" data-bindtype="value" data-member="tzje"
                               data-format="money"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for=""> 到期日期： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-info bind" id="label_dqrq" data-bindtype="value" data-member="dqrq"
                               data-format="date"></label>
                    </div>
                    <div class="form-label col-md-2   ">
                        <label for=""> 基金状态： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-info bind" id="lab_fundstaus" data-bindtype="value"
                               data-member="fund_status"></label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-20">1.客户信息 </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tname"> 客户名称： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="lab-cname" data-bindtype="list" data-bindobject="customer"
                               data-member="customer.id" data-displaymember="name"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">证件类型： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="lab-ccardtype" data-bindtype="list"
                               data-bindobject="customer" data-member="customer.id"
                               data-displaymember="credentialsType"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="" id="lab-tnubmer">证件号码： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class=" label-info bind" id="lab-cardnumber" data-bindtype="list"
                               data-bindobject="customer" data-member="customer.id"
                               data-displaymember="credentialsNumber"></label>
                    </div>
                    <div class="form-label col-md-2  ">
                        <label for="" id="lab-ttype">法定代表人： </label>
                    </div>
                    <div class="form-label col-md-4">
                        <label class="label-success bind" id="lab-ccardtype" data-bindtype="list"
                               data-bindobject="customer" data-member="customer.id" data-displaymember="fddbr"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-18">3.续投情况说明 </label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-2   ">
                        <label for="">续投类型选择</label>
                    </div>
                    <div class="form-input col-md-4">
                        <select class="custom-select" id="xt_type" onchange="VIEWDATA.xtChange();">
                            <option value=1>全部投资款续投</option>
                            <option value=2>全部投资款续投，收益续投</option>
                            <option value=3>全部投资款续投，追加投资款</option>
                            <option value=4>全部投资款续投，收益续投，追加投资款</option>
                            <option value=5>部分投资款续投</option>
                        </select>
                    </div>
                    <div class="form-label col-md-3   ">
                        <label for="">新档案合同编号</label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="bind" data-bindtype="value" data-member="contractNum"></label>
                    </div>
                </div>
                <div id="select_event_target">
                    <div class="form-row">
                        <div class="form-label col-md-3   ">
                            <label for="" id="lab-tname"> 续投申请日期： </label>
                        </div>
                        <div class="form-input col-md-3">
                            <input class="item-input tcal " id="xt_sq_date"/>
                        </div>
                        <div class="form-label col-md-3  ">
                            <label for="" id="lab-ttype">续投本金额： </label>
                        </div>
                        <div class="form-input col-md-3">
                            <input id="xt_bje" class="bind" data-xttypes="5" data-bindtype="value" data-member="tzje"
                                   value="0"/>
                        </div>
                    </div>

                    <div class="form-row" id="">
                        <div class="form-label col-md-3  ">
                            <label for="" id="lab-tnubmer">追加投资金额： </label>
                        </div>
                        <div class="form-input col-md-3">
                            <input id="xt_amount" data-xttypes="3,4" value="0"/>
                        </div>
                        <div class="form-label col-md-3  ">
                            <label for="" id="lab-ttype">续投收益额 ：</label>
                        </div>
                        <div class="form-input col-md-3">
                            <input id="xt_sy_amount" class="" data-xttypes="2,4" data-bindtype="value"
                                   data-member="ysye" value="0"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-label col-md-3   ">
                            <label for="" id="lab-tname"> 续投投资期限： </label>
                        </div>
                        <div class="form-input col-md-3">
                            <select disabled="disabled" id="xt_tzqx">
                                <option value=1>1年</option>
                            </select>
                        </div>
                        <div class="form-label col-md-3  ">
                            <label for="" id="lab-totalamount">总投资金额： </label>
                        </div>
                        <div class="form-input col-md-3">
                            <input id="xt_tzje" disabled="disabled"></input>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-tnubmer">续投计息日期： </label>
                    </div>
                    <div class="form-input col-md-3">
                        <input class="tcal" id="xt_jx_date"/>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">续投到期日期：</label>
                    </div>
                    <div class="form-input col-md-3">
                        <input class="label-success tcal" id="xt_dqrq"/>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-tnubmer">续投预期收益率： </label>
                    </div>
                    <div class="form-input col-md-3">
                        <input class="datacheck" data-minnumber="0" data-maxnumber="1" id="xf_yqsy"/>
                    </div>
                    <div class="form-label col-md-3  ">
                        <label for="" id="lab-ttype">续投付息方式：</label>
                    </div>
                    <div class="form-label col-md-3">
                        <label class="label-success" id="xt_fxfs"></label>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-label col-md-12">
                        <label for="" class="font-size-18">4.特殊情况备注说明 </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-10">
                        <textarea name="input_text" id="lab-bz" class="small-textarea"></textarea>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input col-md-10 ">
                        <button type="button" id="save_btn" class="btn  large primary-bg ">提交申请</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Message box  -->
<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
    <div id="jy_panel" style="width: 98%;">
        <div class="text-center" style="height: 80px;">
            <h3 id="jsy_messagebox_msg"></h3>
        </div>
        <div class="text-center">
            <a href="#" class="btn large primary-bg" title=""
               id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
            </a>
        </div>
    </div>
</div>
<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
<!-- Message box  -->
<script type="text/javascript" src="/js/EnumCommon.js"></script>
<script type="text/javascript" src="/js/continuedinvestment-add.js"></script>
</body>
</html>