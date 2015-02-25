<%--suppress XmlDuplicatedId --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="./bankingpaymentorder.css"></link>
<script type="text/javascript" src="./bankingpaymentorder.js"></script>
<title>银行付款单</title>
</head>
<link rel="stylesheet" type="text/css" href=""></link>
<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
		<div id="page-content-wrapper">
			<!-- #page-title -->
			<div id="page-content" class="page-view pad25T">
				<div class="content-box box-toggle view-width">
					<div class="content-box-header primary-bg">
						<span class="float-left">待付付款单 </span> <a href="#"
							class="float-right icon-separator btn toggle-button"
							title="最近领用记录"> <i
							class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
						<div class="keyword-view float-right">
							<div class="keyword-input-width float-left">
								<div class="form-input">
									<div class="form-input-icon">
										<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
										<input type="text" placeholder="Search notifications..."
											class="radius-top-left-100 radius-bottom-left-100 keyword-input"
											id="keyword-input" />
									</div>
								</div>
							</div>
							<button
								class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
								id="keyword-button">
								<span class="button-content">搜索</span>
							</button>
						</div>

					</div>
					<div class="content-box-wrapper">
					<div class="col-md-12 page-bar pad0R">
							<a href="javascript:;"
								class="btn large float-left mrg5R ui-state-default"
								id="page-first"> <i class="glyph-icon icon-arrow-left"></i>
							</a>
							<div class="button-group float-left pages-div" id="page-numbers"></div>
							<a href="javascript:;"
								class="btn large float-left mrg5L ui-state-default"
								id="page-last"> <i class="glyph-icon icon-arrow-right"></i>
							</a>
						</div>
						<table id="payorder-table"
							class="table table-striped text-center mrg0B"
							id="filepackage-get-table">
							<tr>
								<th></th>
							</tr>
						</table>
						<div class="button-pane">
							<button type="button"
								class="btn-ui btn bg-green large medium mrg10L" id="submit_pay">
								<span class="button-content">确认支付</span>
							</button>
							<button type="button"
								class="btn-ui btn primary large medium mrg10L"
								id="submit_cancelPay">
								<span class="button-content">取消付款单</span>
							</button>
							<button type="button"
								class="btn-ui btn primary large medium mrg10L"
								id="submit_otherPay">
								<span class="button-content">已支付</span>
							</button>
						</div>
						<div class="mrg10T hide" id='pay_panel'>
							<form class="form-bordered " id="bindtarget_id" action="/"
								style="width: 500px;">
								<div class="form-row">
									<div class="form-label col-md-12   ">
										<label for="">选择用来支付的账户</label>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label col-md-3 text-right">
										<label for="">基金公司：</label>
									</div>
									<div class="form-input col-md-9 ">
										<select id="select_fundAccount" name="fundINC">
										</select>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label col-md-3 text-right  ">
										<label for="">银行账户：</label>
									</div>
									<div class="form-input col-md-9 ">
										<select id="paymentBankAcccountName" name="bankaccount">
										</select>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label col-md-3 text-right">
										<label for="">开户行：</label>
									</div>
									<div class="form-label col-md-9">
										<label for="" id="paymentBankName"></label>
									</div>
								</div>
								<div class="form-row">
									<div class="form-label col-md-3 text-right">
										<label for="">付款账号：</label>
									</div>
									<div class="form-label col-md-9">
										<label for="" id="paymentBankAccount"></label>
									</div>
								</div>
								<div class="form-row pad5A text-right">
									<button type="button"
										class="btn-ui btn primary large medium mrg10L"
										id="submit_cancelpayorder">
										<span class="button-content">取消</span>
									</button>
									<button type="button"
										class="btn-ui btn bg-green large medium mrg10L"
										id="submit_acceptpayorder">
										<span class="button-content">支付 付款单</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
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
				<a href="#" class="btn large primary-bg " title=""
					id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
				</a> <a href="#" class="btn large primary-bg " title=""
					id="jsy_msgbox_yes"><span class="button-content">是</span> </a> <a
					href="#" class="btn large primary-bg " title="" id="jsy_msgbox_no"><span
					class="button-content">否</span> </a> <a href="#"
					class="btn large primary-bg " title="" id="jsy_msgbox_cancel"><span
					class="button-content">取消</span> </a>
			</div>
		</div>
	</div>
	<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>
	<!-- Message box  -->

</body>
</html>