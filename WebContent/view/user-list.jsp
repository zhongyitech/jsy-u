<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<jsp:include page="./head.jsp"/>
	<link rel="stylesheet" type="text/css" href="/css/user-list.css">
	<title>用户管理</title>
</head>

<body >
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
				
				<div class="content-box box-toggle " id="user-list">
					<div class="content-box-header primary-bg">
						<span class="float-left">用户管理</span>
						
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
                        <div id="table-pager" class="page-bar"></div>
						
						<table class="table table-hover table-striped text-center mrg0B" id="view-table">
							<thead>
								<tr>
									<th class="text-center">账号(登陆名))</th>
									<th class="text-center">名称</th>
									<th class="text-center">邮件</th>
									<th class="text-center">角色(职务)</th>
									<th class="text-center">所属部门</th>
									<th class="text-center">公司</th>
									<th class="text-center">是否启用</th>
									<%--<th class="text-center">开户行</th>--%>
									<%--<th class="text-center">银行账号</th>--%>
									<%--<th class="text-center">是否启用</th>--%>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
                        <div class="mrg10T">
                            <a href="./user-create.jsp" class="btn medium bg-green" title="">
                                <span class="button-content">+ 新建用户</span>
                            </a>
                        </div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
    <script type="text/javascript" src="/js/user-list.js"></script>
</body>
</html>