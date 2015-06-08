<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="./head.jsp"/>
<title>金赛银基金</title>
</head>

<body class="login-body">
	<div class="login-div">
		<div class="content-box mrg0B">
			<div class="content-box-header primary-bg">
				<div class="glyph-icon icon-separator">
		            <img class="login-img" src="/images/favicon.ico" />
		        </div>
		        <span class="login-title">欢迎使用金赛银基金</span>
		    </div>
		
			<div class="content-box-wrapper">
				<div class="form-row">
					<div class="form-input col-md-12">
						<div class="input-append-wrapper">
							<div class="input-append bg-black">
							    <i class="glyph-icon icon-user"></i>
							</div>
							<div class="append-left">
							    <input type="text" placeholder="请输入账号" name="" id="login-user" />
							</div>
						</div>
					</div>
				</div>

				<div class="form-row pad0B">
					<div class="form-input col-md-12">
						<div class="input-append-wrapper">
							<div class="input-append bg-black">
							    <i class="glyph-icon icon-key"></i>
							</div>
							<div class="append-left">
							    <input type="password" placeholder="请输入密码" name="" id="login-key" />
							</div>
						</div>
					</div>
				</div>
			</div>
		
			<div class="button-pane">
				<button class="btn-ui btn  large medium float-right" id="login-button"><span class="button-content">登录</span></button>
			</div>
		</div>
	</div>
</body>
</html>

