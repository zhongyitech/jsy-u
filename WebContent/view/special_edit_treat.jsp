<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"/>
<script type="text/javascript" src="../js/special_edit_treat.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>到期转投处理申请表</title>
<link rel="stylesheet" type="text/css" href="../css/special_edit_treat.css"/>
</head>
<body class="page-body">
	<div id="page-content-wrapper">
		<!-- #page-title -->
		<div id="page-wrapper">
			<jsp:include page="./navi.jsp"/>
			<div id="page-content" style="width: 800px">
				<div class="text-center">
					<h2>到期转投处理申请表</h2>
				</div>
				<a href="./invest-list.jsp" class="btn medium bg-gray" title="">
					<span class="button-content">返回</span>
				</a>
				<form class="form-bordered " id="bindtarget_id" action="/"
					method="post">
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 申请部门： </label>
						</div>
						<div class="form-input col-md-4">
							<input id="lab-dep" disabled="disabled" class="bind"
								data-bindtype="value" data-member="department" />
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 申请人： </label>
						</div>
						<div class="form-input col-md-4">
							<input class="bind" id="label_sqr" disabled="disabled"
								data-bindtype="value" data-member="sqr" />
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
						<div class="form-input col-md-4">
							<input class="label-info bind" id="s_fundname"
								data-bindtype="value" data-member="fundName"
								data-displaymember="fundName" />
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 合同编号:</label>
						</div>
						<div class="form-input col-md-4">
							<input class="bind" id="input_htbh" data-bindtype="value"
								data-member="contractNum" />
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 认购日期： </label>
						</div>
						<div class="form-input col-md-4">
							<input class=" label-info bind" id="label_rgrq"
								data-bindtype="value" data-member="rgrq" data-format="date" />
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 认购金额： </label>
						</div>
						<div class="form-input col-md-4">
							<input class="label-success bind" id="label_rgje"
								data-bindtype="value" data-member="tzje" data-format="money" />
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 到期日期： </label>
						</div>
						<div class="form-input col-md-4">
							<input class="label-info bind" id="label_dqrq"
								data-bindtype="value" data-member="dqrq" data-format="date" />
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
						<div class="form-input col-md-4">
							<input class=" label-info bind" id="lab-cname"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="name" />
						</div>
						<div class="form-label col-md-2  ">
							<label for="" id="lab-ttype">证件类型： </label>
						</div>
						<div class="form-input col-md-4">
							<input class="label-success bind" id="lab-ccardtype"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="credentialsType" />
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for="" id="lab-tnubmer">证件号码： </label>
						</div>
						<div class="form-input col-md-4">
							<input class=" label-info bind" id="lab-cardnumber"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="credentialsNumber" />
						</div>
						<div class="form-label col-md-2  ">
							<label for="" id="lab-ttype">法定代表人： </label>
						</div>
						<div class="form-input col-md-4">
							<input class="label-success bind" id="lab-ccardtype"
								data-bindtype="list" data-bindobject="customer"
								data-member="customer.id" data-displaymember="fddbr" />
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">3.转入新的基金信息 </label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-3   ">
							<label for="">基金名称： </label>
						</div>
						<div class="form-input col-md-4">
							<input for="" data-bingtype="value" data-member="ztjj" />
						</div>
						<div class="form-label col-md-2  ">
							<label for="">转投本金金额： </label>
						</div>
						<div class="form-input col-md-2">
							<input class="datacheck" type="text" name="input_newamount"
								id="input_newamount" data-minnumber="0" data-maxnumber="100">
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-3   ">
							<label for="">原基金需付剩余收益额 ： </label>
						</div>
						<div class="form-input col-md-2 ">
							<input class="bind" id="ysye_lab" data-bindtype="value"
								data-member="ysye" />
						</div>
						<div class="form-label col-md-2   ">
							<label for="" id="lab_tzsy">转投收益额 ： </label>
						</div>
						<div class="form-input col-md-2 ">
							<input type="text" class="datacheck" name="input_ztsye"
								id="input_ztsye" data-minnumber="0" data-maxnumber="100">
						</div>
						<div class="form-label col-md-3 ">
							<label id="valid_lab">总计：<span id="ztje_totalamount"></span></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-2 "></div>
						<div class="form-label col-md-10 text-rgith">
							<span style="" id="info">总转投金额必须是（10万的倍数（FOF
								5万倍数）不足部分需追加，若不转收益投则填写 0</span>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">4.特殊情况备注说明 </label>
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
								class="btn  large primary-bg ">保存修改</button>
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