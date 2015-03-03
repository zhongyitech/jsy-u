<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<jsp:include page="./head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="./user-create.css">
<script type="text/javascript" src="./user-create.js"></script>
<title>新增用户</title>
</head>

<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
		<div id="page-content-wrapper">
		
			<div id="page-content" class="page-view pad25T">
			
				<div class="content-box box-toggle view-width" id="user-view">
					<div class="content-box-header primary-bg">
						<span class="float-left">新增用户</span>
						
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
	                                <input placeholder="必填" type="text" id="account">
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
		                                    <label for="" class="label-description" id="role-label">角色:</label>
		                                </div>
		                                
		                                <div class="form-input col-md-4">
		                                 	<div class="input-append-wrapper input-append-right">
		                                 		<div class="input-append bg-green pointer" id="role-button"><i class="glyph-icon icon-edit"></i></div>
		                                 		<div class="append-right">
		                                 			<input class="text-overflow" type="text" id="role-input" disabled>
		                                 		</div>
		                                 	</div>
		                                </div>
                                        
                                   </div>
                                   
                                   <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">收款人:</label>
                                        </div>
                                        
                                        <div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="skr">
                                        </div>
                                        
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">银行账号:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="yhzh">
                                        </div>
                                   </div>
                                   
                                   <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">开户行:</label>
                                        </div>
                                        
                                        <div class="form-input col-md-10">
                                            <input placeholder="" type="text" id="khh">
                                        </div>
                                   </div>
							
					</div>
						
					<div style="clear:both;"></div>
					
				</div>
				
					<div class="button-pane" id="menu">
						<button class="btn-ui btn bg-green large medium float-right mrg10L" id="submit-button"><span class="button-content">提交</span></button>
						<button class="btn-ui btn bg-green large medium float-right mrg10L partner-button" id="role-dialog-button"><span class="button-content">角色</span></button>
					</div>
							
				</div>
				
				<div class="hide" id="role-dialog" title="编辑角色">
					<div class="content-box mrg0B" id="role-view">
						<table class="table text-center mrg0B" id="view-table">
							<thead class="primary-bg">
								<tr>
									<th class="primary-bg text-center"><input type="checkbox" name="checkbox"></th>
									<th class="primary-bg text-center">(*)角色</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					
						<div class="button-pane">
							<button class="btn-ui btn bg-green large medium float-right mrg10L" id="save-button"><span class="button-content">保存</span></button>
							<button class="btn-ui btn bg-green large medium float-right mrg10L" id="remove-button"><span class="button-content">删除选中行</span></button>
							<button class="btn-ui btn bg-green large medium float-right mrg10L" id="add-button"><span class="button-content">增加一行</span></button>
						</div>
					</div>
				</div>
		
			</div>
		</div>
	</div>
</body>
</html>