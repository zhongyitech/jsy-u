<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="./head.jsp"/>
	<link rel="stylesheet" type="text/css" href="../css/hetong-guihuan.css">
	<title>合同归还</title>
</head>

<body >
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
				
				<div class="content-box box-toggle " id="htly-put">
					<div class="content-box-header primary-bg">
						<span class="float-left">合同归还</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="合同归还">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
					</div>

					<div class="content-box-wrapper">
						<table class="table text-center mrg0B" id="view-table">
							<thead>
								<tr>
									<th class="text-center"><input type="checkbox" name="checkbox"></th>
									<th class="text-center">序号</th>
									<th class="text-center">归还部门(*)</th>
									<th class="text-center">归还人(*)</th>
									<th class="text-center">归还时间(*)</th>
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
				
				<div class="content-box box-toggle " id="htly-list">
					<div class="content-box-header primary-bg">
						<span class="float-left">最近归还记录</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="最近归还记录">
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
							<button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button"><span class="button-content">搜索</span></button>
						</div>
					</div>
					
					<div class="content-box-wrapper">
                        <div id="table-pager" class="page-bar"></div>
						
						<table class="table table-striped text-center mrg0B" id="table-data">
							<thead>
								<tr>
									<th class="text-center">归还时间</th>
									<th class="text-center">归还部门</th>
									<th class="text-center">归还人</th>
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
    <script type="text/javascript" src="../js/hetong-guihuan.js"></script>
</body>
</html>