<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<jsp:include page="./head.jsp"></jsp:include>
<title>提成申请</title>
</head>
<link rel="stylesheet" type="text/css" href="./cash_list.css"></link>
<body class="jsy-body">
	<div id="page-wrapper">
	<jsp:include page="./navi.jsp"></jsp:include>
	<script type="text/javascript" src="./commission_apply.js"></script>
	<div id="page-content-wrapper">
		<!-- #page-title -->
		<div id="page-content" class="page-view pad25T">

			<div class="content-box box-toggle view-width">

				<div class="content-box-header primary-bg">
					<span class="float-left">业务提成申请单</span>

					<a href="#" class="float-right icon-separator btn toggle-button" title="业务提成申请单">
						<i class="glyph-icon icon-toggle icon-chevron-down"></i>
					</a>
					<div class="keyword-view float-right">
						<div class="keyword-input-width float-left">
							<div class="form-input">
								<div class="form-input-icon">
									<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
									<input type="text" placeholder="Search notifications..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="filter-keyword" />
								</div>
							</div>
						</div>
						<button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button"><span class="button-content">搜索</span></button>
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
											<option value="not-apply">未付款</option>
											<option value="apply">已付款</option>
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

				<div class="content-box-wrapper"  >
					<div class="col-md-12 page-bar pad0R">
						<a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
							<i class="glyph-icon icon-arrow-left"></i>
						</a>
						<div class="button-group float-left pages-div" id="page-numbers"></div>
						<a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
							<i class="glyph-icon icon-arrow-right"></i>
						</a>
					</div>
					<table id="ywtc_table" class="table table-striped text-center mrg0B">
						<colgroup>
							<col width="30" />
						</colgroup>
						<tr>
							<th><input class="item-checkbox" type="checkbox"
								name="checkbox"></th>
							<th data-bindtype="value" data-Member="ywjl">提成人员</th>
							<th data-bindtype="value" data-Member="fundname">基金名称</th>
							<th data-bindtype="value" data-Member="payamount" data-format="money">付款金额</th>							
							<th data-bindtype="value" data-Member="skr">收款人</th>
							<th data-bindtype="value" data-Member="account">收款账户</th>
							<th data-bindtype="value" data-Member="bank">开户行</th>
							<th data-bindtype="value" data-Member="paystatus">付款状态</th>
						</tr>
					</table>
					<%--<div class="items-page">--%>
						<%--<div onselectstart="return false" class="page-first" id="page-first">第一页</div>--%>

						<%--<div onselectstart="return false" class="page-numbers" id="page-numbers"></div>--%>

						<%--<div onselectstart="return false" class="page-last" id="page-last">最后一页</div>--%>

						<%--<div class="items-page-total-label">查询结果：</div>--%>

						<%--<div class="items-page-total" id="pacts-page-total" title="">0个</div>--%>
					<%--</div>--%>

				</div>
			</div>
			<div class="content-box box-toggle view-width">


				<div class="content-box-header primary-bg">
					<span class="float-left">管理提成申请单</span>

					<a href="#" class="float-right icon-separator btn toggle-button" title="业务提成申请单">
						<i class="glyph-icon icon-toggle icon-chevron-down"></i>
					</a>

					<div class="keyword-view float-right">
						<div class="keyword-input-width float-left">
							<div class="form-input">
								<div class="form-input-icon">
									<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
									<input type="text" placeholder="Search notifications..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="filter-keyword2" />
								</div>
							</div>
						</div>
						<button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="filter-button2"><span class="button-content">搜索</span></button>
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
											<option value="not-apply">未付款</option>
											<option value="apply">已付款</option>
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


				<div class="content-box-wrapper"  >

					<div class="col-md-12 page-bar pad0R">
						<a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first2">
							<i class="glyph-icon icon-arrow-left"></i>
						</a>
						<div class="button-group float-left pages-div" id="page-numbers2"></div>
						<a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last2">
							<i class="glyph-icon icon-arrow-right"></i>
						</a>
					</div>

					<table id="gltc_table" class="table table-striped text-center mrg0B">
						<colgroup>
							<col width="30" />
						</colgroup>
						<tr>
							<th><input class="item-checkbox" type="checkbox"
								name="checkbox"></th>
							<th>提成人员</th>
							<th>基金名称</th>
							<th>付款金额</th>
							<th>收款人</th>
							<th>收款账户</th>
							<th>开户行</th>
						    <th data-bindtype="value" data-Member="paystatus">付款状态</th>
						</tr>
					</table>
					
					

				</div>
				
				<div class="button-pane">
					<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="funds-save"><span class="button-content">申请付款</span></button>
				</div>
			</div>
			
			<div class="content-box box-toggle view-width">
				<h3 class="content-box-header primary-bg">
					<span class="float-left">数据汇总</span> 
					<a href="#" class="float-right icon-separator btn toggle-button" title="Toggle Box"> <i class="glyph-icon icon-toggle icon-chevron-down"></i>
					</a>					
				</h3>
				<div class="content-box-wrapper"  >
					<table id="total_table" class="table table-striped text-center mrg0B">
						<colgroup>
						</colgroup>
						<tr>
							<th>基金</th>
							<th>总金额</th>
							<th>笔数</th>
							<th>管理提成金额</th>
							<th>业务提成金额</th>			
						</tr>						
					</table>
				</div>
			</div>
		</div>		
	</div>
	</div>
</body>
</html>