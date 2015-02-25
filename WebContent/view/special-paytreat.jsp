<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"></jsp:include>
<script type="text/javascript" src="./special-paytreat.js"></script>
<script type="text/javascript" src="./special-common.js"></script>
<link rel="stylesheet" type="text/css" href="./special-paytreat.css"></link>
<title>委托付款申请表</title>
</head>
<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
		<div id="page-content-wrapper">
			<div id="page-content" style="width: 800px">
				<div class="text-center">
					<h2>委托付款处理申请表</h2>
				</div>
				<a href="./invest-list.jsp" class="btn medium bg-gray" title="">
					<span class="button-content">返回</span>
				</a>
				<form class="form-bordered " id="bindtarget_id" action=""
					method="post">
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
							<label id="label_sqr " class=" bind " data-bindtype="value"
								data-member="sqr"></label>
						</div>
						<div class="form-label col-md-2   ">
							<label for=""> 申请时间： </label>
						</div>
						<div class="form-label col-md-2 text-center">
							<label id="lab-scrq " class=" bind " data-bindtype="value"
								data-member="scrq"></label>
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
							<label class="label-info bind" id="s_fundname"
								data-bindtype="list" data-bindobject="fund"
								data-member="fund.id" data-displaymember="fundName"></label>
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
							<label for=""> 募集账户： </label>
						</div>
						<div class="form-input col-md-4">
							<select id="bankaccountlist" data-bindtype="value"
								data-member="bankaccount">
								<option></option>
							</select>
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
							<label for="" class="font-size-20">3.付款人信息（受托人） </label>
						</div>
						
					</div>
					<div class="form-row ">
						<table id="payinfo_table" class="table table-striped text-center">
							<colgroup>
								<col style="width: 20px;" />
								<col style="width: 100px;" />
								<col style="width: 80px;"/>
								<col style="width: 80px;"/>
								<col style="width: 150px;"/>
								<col style="width: 80px;"/>
								<col style="width: 90px;"/>
								<col style="width: 90px;"/>
								<col />
							</colgroup>
							
							<tr>
							    <th class="text-center"><input type="checkbox" name="checkbox"></th>
								<th class="text-center">付款日期</th>
								<th>付款金额</th>
								<th>受托人</th>
								<th>付款账号</th>
								<th>证件类型</th>
								<th>证件号码</th>
								<th>法定代表人</th>
								<th>住址</th>
							</tr>		
														
							<!-- 					
							<tr>
								<td >
									<div class="form-input ">
										<input name="paydate" class="col-md-12 tcal tcalInput">
									</div>
								</td>
								<td>
									<div class="form-input ">
										<input name="payamount">
									</div>
								</td>
								<td>
									<div class="form-input ">
										<input name="payaccount">
									</div>
								</td>
								
								<td>
									<div class="form-input ">
										<input name="paybanknumber">
									</div>									
								</td>					
							</tr>
							 -->
						</table>
						<div class="button-pane">
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-save"><span class="button-content">保存</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-remove"><span class="button-content">删除选中行</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-add"><span class="button-content">增加一行</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L black-modal-70 hide" id="tcfpfw-button"><span class="button-content">提成分配范围</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L black-modal-60 hide" id="sylfw-button"><span class="button-content">收益率范围</span></button>
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
						<div class="form-label col-md-12 ">
							<input id="accept_checkbox" type="checkbox" name="acceptbox"> <span
								class="font-size-18">业务部申明：承诺对上述所有信息已做核实，并保证所提供的身份证、银行卡真实有效。</span>
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