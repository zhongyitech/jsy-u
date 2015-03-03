<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>委托付款处理申请表</title>

</head>
<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		<div id="page-content-wrapper">
			<!-- #page-title -->
			<div id="page-content" style="width: 800px">
				<div class="text-center">
					<h2>委托付款处理申请表</h2>
					<br>
				</div>
				<form id="form_id" class="form-bordered " action="/" method="post">
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 申请部门：</label>
						</div>
						<div class="form-label col-md-4">
							<label id="lab-dep" class="bind" data-bindtype="value"
								data-member="ywlj" data-displaymember=""> </label>
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 申请人：</label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success" id="label_sqr"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">1.基金认购信息 </label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 基金名称：</label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="" data-bindtype="value"
								data-member="fundname"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 合同编号：</label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success bind" id="" data-bindtype="value"
								data-member="htbh"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 认购日期：</label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" id="label_rgrq"
								data-bindtype="value" data-member="rgrq" data-format="date"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label for=""> 认购金额：</label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success bind" data-bindtype="value"
								data-member="tzje" data-format="money"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for=""> 到期日期：</label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-info bind" data-bindtype="value"
								data-member="dqrq" data-format="date"></label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">2.客户信息（委托人）</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for="" id="lab-tname"> 客户名称：</label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info" data-bindtype="list"
								data-bindobject="customer" data-member="customer.id"
								data-displaymember="name"></label>
						</div>
						<div class="form-label col-md-2  ">
							<label for="" id="lab-ttype"> 证件类型：</label>
						</div>
						<div class="form-label col-md-4">
							<label class="label-success databind" data-bindtype="list"
								data-bindobject="customer" data-member="customer.id"
								data-displaymember="type"></label>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-2   ">
							<label for="" id="lab-tnubmer"> 证件号码：</label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info" id="lab-cardnumber"></label>
						</div>
						<div class="form-label col-md-2   ">
							<label for="" class="bind" data-bindtype="list"
								data-bindobject="customer" data-member="customer.id"
								data-displaymember="">法定代表人：</label>
						</div>
						<div class="form-label col-md-4">
							<label class=" label-info bind" data-bindtype="list"
								data-bindobject="customer" data-member="customer.id"
								data-displaymember=""></label>
						</div>
					</div>


					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">3.付款人信息（受托人）</label>
						</div>
					</div>

					<div class="form-row">
						<table class="item-table" id="userlist">
							<thead>
								<tr>
									<th><span class="pay-name">付款人</span></th>
									<th><span class="pay-date">付款日期</span></th>
									<th><span class="pay-amount">付款金额</span></th>
									<th><span class="pay-cardtype">证件类型</span></th>
									<th><span class="pay-cardnumber">证件号</span></th>
									<th><span class="pay-ceoname">法定代表人</span></th>
									<th style="width: 30px;"><span></span></th>
								</tr>
							</thead>
							<tbody>
								<tr data-index="0">
									<td><input type="text" name="name" /></td>
									<td><input type="text" name="fkrq" /></td>
									<td><input type="text" name="fkje" /></td>
									<td><select name="type"><option value="1">身份证</option>
											<option>营业执照</option></select></td>
									<td><input type="text" name="zjhm" /></td>
									<td><input type="text" size=10 name="fddbr" /></td>
									<td><input data-index="0" type="button"
										onclick="VIEWDATA.delUserRow(0);" value="删除" class="pay-del" /></td>
								</tr>
							</tbody>
						</table>
						<div>
							<button id="addUser" type="button" class="">添加付款人</button>
						</div>
					</div>

					<div class="form-row">
						<div class="form-label col-md-12">
							<label for="" class="font-size-20">4.特殊情况备注说明</label>
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-10">
							<textarea name="input_text" id="descript" class="small-textarea"></textarea>
						</div>
					</div>
					<div class="form-row">
						<div class="form-input col-md-10 ">
							<button type="button" id="savebtn" class="btn  large primary-bg ">提交申请</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>