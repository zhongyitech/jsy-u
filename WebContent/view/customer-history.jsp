<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="./head.jsp"/>
	<link rel="stylesheet" type="text/css" href="../css/customer-history.css">
	<title>客户信息修改记录</title>
</head>

<body >
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
				
				<div class="content-box box-toggle " id="customer-history">
					<div class="content-box-header primary-bg">
						<span class="float-left">客户信息修改记录</span>
						
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
							<button class="btn large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100" id="keyword-button"><span class="button-content">搜索</span></button>
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
									<th class="text-center">操作人</th>
									<th class="text-center">操作时间</th>
									<th class="text-center">证照号码</th>
									<th class="text-center">客户名称</th>
									<th class="text-center">身份证地址</th>
									<th class="text-center">开户行名称</th>
									<th class="text-center">收益人账号</th>
									<th class="text-center">联系电话</th>
									<th class="text-center">E-Mail</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
				
			</div>
		</div>
	</div>
    <script type="text/javascript" src="../js/customer-history.js"></script>
</body>
</html>