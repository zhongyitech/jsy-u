<%--suppress XmlDuplicatedId --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"/>
<script type="text/javascript" src="/js/special_untreat.js"></script>
<title>未到期转投处理申请表</title>
</head>
<link rel="stylesheet" type="text/css" href="/css/special_untreat.css"/>
<body >
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		<div id="page-content-wrapper">
			<!-- #page-title -->
			<div id="page-content" style="width: 800px">
				<div class="text-center">
					<h2>未到期转投处理申请表</h2>
				</div>
				<a href="./invest-list.jsp" class="btn medium bg-gray" title="">
					<span class="button-content">返回</span>
				</a>
				<form class="form-bordered " action="/" method="post">
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label> 申请部门： </label>
						</div>
						<div class="form-label col-md-2">
							<label id="lab-dep " class=" bind " data-bindtype="value"
								data-member="department"></label>
						</div>
						<div class="form-label col-md-2  text-right">
							<label>申请人： </label>
						</div>
						<div class="form-label col-md-2 text-center">
							<label id="label_sqr " class=" bind " data-bindtype="value"
								data-member="sqr"></label>
						</div>
						<div class="form-label col-md-2   ">
							<label> 申请时间： </label>
						</div>
						<div class="form-label col-md-2 text-center">
							<label id="lab-scrq " class="bind" data-bindtype="value"
								data-member="scrq"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label class="font-size-20">1.原基金认购信息 </label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label> 基金名称： </label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="s_fundname"
								data-bindtype="list" data-bindobject="fund"
								data-member="fund.id" data-displaymember="fundName"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label> 合同编号:</label>
						</div>
						<div class="form-input col-md-4">
							<input class="bind" id="input_htbh" data-bindtype="value"
								data-member="contractNum" />
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label> 认购日期： </label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="label_rgrq"
								data-bindtype="value" data-member="rgrq" data-format="date"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label> 认购金额： </label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success bind" id="label_rgje"
								data-bindtype="value" data-member="tzje" data-format="money"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label> 已付收益情况： </label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-info bind" id="lab_yfsy_descript"
								data-bindtype="value" data-member="" data-format="date"></label>
						</div>
						<div class="form-label col-md-2   ">
							<label> 已付收益总额： </label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-info bind" id="label_dqrq"
								data-bindtype="value" data-member="paysy_amount"
								data-format="money"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label class="font-size-20">2.客户信息 </label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label id="lab-tname"> 客户名称： </label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="lab-cname"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="name"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label id="lab-ttype">证件类型： </label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success bind" id="lab-ccardtype"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="credentialsType"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label id="lab-tnubmer">证件号码： </label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="lab-cardnumber"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="credentialsNumber"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label id="lab-ttype">法定代表人： </label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success bind" id="lab-ccardtype"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="fddbr"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-12">
							<label class="font-size-18">3.转入新的基金信息 </label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label>基金名称： </label>
						</div>
						<div class="form-input col-md-4">
							<select id="fundselect">
							</select>
						</div>
						<div class="form-label col-md-2  ">
							<label>合同编号： </label>
						</div>
						<div class="form-input col-md-4">
							<input type="text" name="new_htbh" id="new_htbh" maxlength="9">
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-6   "></div>
						<div class="form-label col-md-2   ">
							<label id="lab_ztje">转投金额 ： </label>
						</div>
						<div class="form-input col-md-4 ">
							<input class="datacheck" type="text" name="input_ztje"
								id="input_ztje" data-minnumber="0" data-maxnumber="100">
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label class="font-size-18">4.退出原基金之情况 </label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-3   ">
							<label id="lab-tname"> 合同中约定扣除违约金： </label>
						</div>
						<div class="form-label col-md-3">
							<label class="bind" data-bindtype="value"
								data-member=kcwyjbl data-format="rate"></label>
						</div>
						<div class="form-label col-md-3  ">
							<label id="lab-ttype">扣除违约金金额： </label>
						</div>
						<div class="form-label col-md-3">
							<label class="bind" data-bindtype="value" data-member="wyamount"
								data-format="money"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-3  ">
							<label id="lab-tnubmer">合同中约定预期收益率： </label>
						</div>
						<div class="form-label col-md-3">
							<label class=" label-info bind" id="lab-cardnumber"
								data-bindtype="value" data-member="nhsyl" data-format="rate"></label>
						</div>
						<div class="form-label col-md-3  ">

							<label id="lab-ttype">未付剩余收益额：</label>
						</div>
						<div class="form-label col-md-3">
							<label class="label-success bind" id="lab-ccardtype"
								data-bindtype="value" data-member="ysye" data-format="money"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-3   ">
							<label id="lab-tname"> 应收回业务提成： </label>
						</div>
						<div class="form-label col-md-3">
							<label class=" label-info bind" id="lab-cname"
								data-bindtype="value" data-member="ywtc" data-format="rate"></label>
						</div>
						<div class="form-label col-md-3  ">
							<label id="lab-ttype">金额： </label>
						</div>
						<div class="form-label col-md-3">
							<label class="label-success bind" id="lab-ccardtype"
								data-bindtype="value" data-member="ywtc_amount"
								data-format="money"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-3  ">
							<label id="lab-tnubmer">应收回管理提成： </label>
						</div>
						<div class="form-label col-md-3">
							<label class=" label-info bind" id="lab-cardnumber"
								data-bindtype="value" data-member="gltc" data-format="rate"></label>
						</div>
						<div class="form-label col-md-3  ">
							<label id="lab-ttype">金额：</label>
						</div>
						<div class="form-label col-md-3">
							<label class="label-success bind" id="lab-ccardtype"
								data-bindtype="value" data-member="ywtc_amount"
								data-format="money"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label class="font-size-18">5.特殊情况备注说明 </label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-10">
							<textarea name="input_text" id="lab-bz" class="small-textarea"></textarea>
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-10 ">
							<button type="button" id="save_btn"
								class="btn  large primary-bg ">提交申请</button>
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
</body>
</html>