<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="./head.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="./hetong-lingyong.css">
	<script type="text/javascript" src="./hetong-lingyong.js"></script>
	<title>合同领用</title>
</head>

<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
		
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
				
				<div class="content-box box-toggle view-width" id="htly-put">
					<div class="content-box-header primary-bg">
						<span class="float-left">合同领用</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="合同领用">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
					</div>

					<div class="content-box-wrapper">
						<table class="table text-center mrg0B" id="view-table">
							<thead>
								<tr>
									<th class="text-center"><input type="checkbox" name="checkbox"></th>
									<th class="text-center">序号</th>
									<th class="text-center">领用部门(*)</th>
									<th class="text-center">领用人(*)</th>
									<th class="text-center">领取时间(*)</th>
									<th class="text-center"><span class="text-overflow fund-name">基金名称(*)</span></th>
									<th class="text-center">起始编号(*)</th>
									<th class="text-center">结束编号(*)</th>
									<th class="text-center">套数</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
						
					</div>
					
					<div class="button-pane">
						<span class="font-red float-left">起始编号和结束编号格式为(JSYAN001)：5位英文+数字</span>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="tr-save"><span class="button-content">保存</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="tr-remove"><span class="button-content">删除选中行</span></button>
						<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="tr-add"><span class="button-content">增加一行</span></button>
					</div>
				</div>
				
				<div class="content-box box-toggle view-width" id="htly-list">
					<div class="content-box-header primary-bg">
						<span class="float-left">最近领用记录</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="最近领用记录">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
						
						<div class="keyword-view float-right">
							<div class="keyword-input-width float-left">
								<div class="form-input">
									<div class="form-input-icon">
										<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
										<input type="text" placeholder="Search notifications..." class="radius-top-left-100 radius-bottom-left-100 keyword-input" id="keyword-input" />
									</div>
								</div>
							</div>
							<button class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button"><span class="button-content">搜索</span></button>
						</div>
					</div>
					
					<div class="content-box-wrapper">
						<div class="col-md-12 page-bar pad0R">
							<a href="javascript:;" class="btn large float-left mrg5R ui-state-default" id="page-first">
								<i class="glyph-icon icon-arrow-left"></i>
							</a>
							<div class="button-group float-left pages-div" id="page-list"></div>
							<a href="javascript:;" class="btn large float-left mrg5L ui-state-default" id="page-last">
								<i class="glyph-icon icon-arrow-right"></i>
							</a>
						</div>
						
						<table class="table table-striped text-center mrg0B" id="view-table">
							<thead>
								<tr>
									<th class="text-center">领用时间</th>
									<th class="text-center">领用部门</th>
									<th class="text-center">领用人</th>
									<th class="text-center">基金名称</th>
									<th class="text-center">起始编号</th>
									<th class="text-center">结束编号</th>
									<th class="text-center">套数</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
</html>