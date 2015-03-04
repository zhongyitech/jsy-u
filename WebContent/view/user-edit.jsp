<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<jsp:include page="./head.jsp"/>
<link rel="stylesheet" type="text/css" href="../css/user-edit.css">
<script type="text/javascript" src="../js/user-edit.js"></script>
<title>编辑用户信息</title>
</head>

<body >
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		<div id="page-content-wrapper">
		
			<div id="page-content" class="page-view pad25T">
			
				<div class="content-box box-toggle " id="user-view">
					<div class="content-box-header primary-bg">
						<span class="float-left">编辑用户信息</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="点击">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
					</div>
					
					<div class="content-box-wrapper">
						<div class="center-margin col-md-10" id="user-form">
						
							<div class="form-row">
	                            <div class="form-label col-md-2">
	                                <label class="label-description">(*)账号：</label>
	                            </div>
	                            <div class="form-input col-md-4">
	                                <input placeholder="必填" type="text" id="account" disabled>
	                            </div>
	                            
	                            <div class="form-label col-md-2">
	                                <label class="label-description">(*)密码：</label>
	                            </div>
	                            <div class="form-input col-md-4">
	                                <input placeholder="必填" type="password" id="password">
	                            </div>
							</div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
	                                <label class="label-description">(*)名称：</label>
	                            </div><div class="form-input col-md-4">
	                                <input placeholder="输入名称" type="text" id="name">
	                            </div>
	                            
	                            <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)部门:</label>
                                        </div><div class="form-input col-md-4">
                                            <select id="department"></select>
                                        </div>
                                    
						</div><div class="form-row">
                                    
								<div class="form-label col-md-2">
	                                <label class="label-description">(*)是否启用：</label>
	                            </div>
	                            
	                            <div class="form-input col-md-4">
	                            	<select id="enabled">
	                            		<option value="true">启用</option>
	                            		<option value="false">禁用</option>
	                            	</select>
	                            </div>
                                        
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">收款人:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="skr">
                                        </div>
                                        
                                   </div>
                                   
                                   <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">开户行:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="khh">
                                        </div>
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">银行账号:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="yhzh">
                                        </div>
                                   </div>
						</div>
							
					</div>
						
						<div style="clear:both;"></div>
					<div class="button-pane">
						<button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span class="button-content">提交</span></button>
					</div>
				</div>
							
			</div>
		
		</div>
	</div>
</body>
</html>