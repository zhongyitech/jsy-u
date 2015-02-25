<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<jsp:include page="./head.jsp"></jsp:include>
<title>提成查询</title>
<style type="text/css">
.input-rate {
	text-align: center;
}
.item-lock{
	background-color: #ccc;
	color:red;
}
</style>
</head>
<link rel="stylesheet" type="text/css" href="./commission_query.css"></link>
<body class="page-body">
	<div id="page-wrapper">
	<jsp:include page="./navi.jsp"></jsp:include>
	<script type="text/javascript" src="./commission_query.js"></script>
	
	<div id="page-content-wrapper">
		<div id="page-content" class="page-view pad25T">
			<div class="content-box box-toggle view-width">

				<div class="content-box-header primary-bg">
					<span class="float-left">提成查询</span>

					<a href="#" class="float-right icon-separator btn toggle-button" title="提成查询">
						<i class="glyph-icon icon-toggle icon-chevron-down"></i>
					</a>

					<div class="keyword-view float-right">
						<div class="keyword-input-width float-left">
							<div class="form-input">
								<div class="form-input-icon">
									<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
									<input type="text" placeholder="Search notifications..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="filter-input" />
								</div>
							</div>
						</div>
						<button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="filter-button"><span class="button-content">搜索</span></button>
					</div>

					<div class="keyword-view float-right filter-status">
						<div class="form-row pad0B">
							<div class="form-input col-md-12">
								<div class="input-append-wrapper">
									<div class="input-append bg-white">
									    <i class="glyph-icon icon-filter"></i>
									</div>
									
									<div class="append-left">
										<select class="" id="filter-status">
											<option value="not-apply"></option>
											<option value="not-apply">未申请</option>
											<option value="apply">已申请</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="keyword-view float-right filter-status">
						<div class="form-row pad0B">
							<div class="form-input col-md-12">
								<div class="input-append-wrapper">
									<div class="input-append bg-white">到</div>
									
									<div class="append-left">
										<input class="tcal filter-input" id="filter_to" />
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div class="keyword-view float-right filter-status">
						<div class="form-row pad0B">
							<div class="form-input col-md-12">
								<div class="input-append-wrapper">
									<div class="input-append bg-white">从</div>
									
									<div class="append-left">
										<input class="tcal filter-input" id="filter_from" />
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>

				<div class="content-box-wrapper">

					<div class="col-md-12 page-bar pad0R">
						<a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
							<i class="glyph-icon icon-arrow-left"></i>
						</a>
						<div class="button-group float-left pages-div" id="page-numbers"></div>
						<a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
							<i class="glyph-icon icon-arrow-right"></i>
						</a>
					</div>

					<table id="query_table" class="table table-striped text-center mrg0B">
						<colgroup>
						<col style="width:30px">							
						<col style="width:80px">							
						<col style="width:120px">							
						<col style="width:100px">							
						<col style="width:100px">							
						</colgroup>
						<tr>
							<th><input class="item-checkbox" type="checkbox" name="checkbox"></th>
							<th data-bindtype="value" data-Member="ywjl" ><span class="text-overflow" title="理财经理">理财经理</span></th>
							<th data-bindtype="value" data-Member="fundName" class="text-center"><span class="text-overflow" title="基金">基金</span></th>
							<th data-bindtype="value" data-Member="rgrq" data-format="date">认购日期</th>
							<th data-bindtype="value" data-Member="customer" >客户名称</th>
							<th data-bindtype="value" data-Member="tzje" data-format="money"><span class="text-overflow" title="基金">投资金额</span></th>
							<th data-bindtype="value" data-Member="syl" data-format="rate"><span class="text-overflow" title="基金">客户收益率</span></th>
							<th data-bindtype="value" data-Member="tzqx" data-format="">认购期限</th>
							<th><span class="text-overflow" title="理财经理">税前/税后</span></th>
							<th >税率</th>
							<th data-bindtype="value" data-Member="tcl" data-format="rate"><span class="text-overflow" title="提成率">提成率</span></th>
							<th data-bindtype="value" data-member="type" ><span class="text-overflow" title="理财经理">提成类型</span></th>
							<th >提成额</th>
							<th>发票金额</th>
							<th ><span class="text-overflow" title="税金">税金</span></th>
							<th ><span>付款金额</span></th>
						</tr>
						<tr></tr>
					</table>

				</div>
				
					<div class="button-pane">
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="submit_commission"><span class="button-content">提成申请</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="btn_expt"><span class="button-content">导出数据</span></button>
					</div>
			</div>
			
			<div class="content-box box-toggle view-width">
				<h3 class="content-box-header primary-bg">
					<span class="float-left">提成比例统计</span> 
					<a href="#" class="float-right icon-separator btn toggle-button" title="Toggle Box"> <i class="glyph-icon icon-toggle icon-chevron-down"></i>
					</a>
				</h3>
				<div class="content-box-wrapper" style="">
					<div id="commission-report" class="cash-report"></div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>