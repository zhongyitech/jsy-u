<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<jsp:include page="./head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="./fund-list.css">
<script type="text/javascript" src="./fund-list.js"></script>
<title>基金管理</title>
</head>

<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
	
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
			
				<div class="content-box box-toggle view-width">
					<div class="content-box-header primary-bg">
						<span class="float-left">基金信息维护及管理</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="点击">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
						
                        <div class="keyword-view float-right">
                             <div class="keyword-input-width float-left">
	                             <div class="form-input">
	                                 <div class="form-input-icon">
	                                     <i class="glyph-icon icon-search transparent keyowrd-icon"></i>
	                                     <input type="text" placeholder="关键字搜索..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="keyword-input" />
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
											<select class="" id="filter-status"></select>
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
											<input class="tcal filter-input" id="filter-to" />
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
											<input class="tcal filter-input" id="filter-from" />
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					
					<div class="content-box-wrapper">
						<table class="total-table">
							<tr>
								<td>
									<div class="fund-total-item-label">基金总数</div>
									<div class="fund-total-item-value" id="fund-fund-count">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">在募基金</div>
									<div class="fund-total-item-value" id="fund-raise-count">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">预募总额</div>
									<div class="fund-total-item-value" id="fund-plan-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">实募总额</div>
									<div class="fund-total-item-value" id="fund-real-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">季付募集规模</div>
									<div class="fund-total-item-value" id="season-plan-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">季付实募总额</div>
									<div class="fund-total-item-value" id="season-real-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">半年付募集规模</div>
									<div class="fund-total-item-value" id="half-plan-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">半年付实募总额</div>
									<div class="fund-total-item-value" id="half-real-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">年付募集规模</div>
									<div class="fund-total-item-value" id="year-plan-total">查询中...</div>
								</td>
								
								<td>
									<div class="fund-total-item-label">年付实募总额</div>
									<div class="fund-total-item-value" id="year-real-total">查询中...</div>
								</td>
							</tr>
						</table>
					
						<div class="col-md-12 page-bar pad0R">
			                <a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
			                    <i class="glyph-icon icon-arrow-left"></i>
			                </a>
			                <div class="button-group float-left pages-div" id="funds-pages"></div>
			                <a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
			                    <i class="glyph-icon icon-arrow-right"></i>
			                </a>
						</div>
            
						<table class="table table-striped text-center mrg0B" id="funds-table">
				            <thead>
				                <tr>
				                    <th class="text-center">编号</th>
				                    <th class="text-center">基金名称</th>
				                    <th class="text-right">预募规模</th>
				                    <th class="text-right">实募金额</th>
				                    <th class="text-right">季付募集规模</th>
				                    <th class="text-right">季付实募</th>
				                    <th class="text-right">半年付募集规模</th>
				                    <th class="text-right">半年付实募</th>
				                    <th class="text-right">年付募集规模</th>
				                    <th class="text-right">年付实募</th>
				                    <th class="text-center">状态</th>
				                </tr>
				            </thead>
				            <tbody></tbody>
						</table>
					</div>
				</div>
			
				<div id="fund-report" class="fund-report"></div>
			</div>
		</div>
	</div>
</body>
</html>