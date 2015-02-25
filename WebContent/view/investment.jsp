<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<jsp:include page="./head.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="./investment.css">
<script type="text/javascript" src="./investment.js"></script>
<title>投资档案</title>
</head>

<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"></jsp:include>
		<div id="page-content-wrapper">
			<div id="page-content" class="page-view pad25T">
			
				<div class="content-box box-toggle view-width">
				
					<div class="content-box-header primary-bg">
						<span class="float-left">投资档案</span>
						
						<a href="#" class="float-right icon-separator btn toggle-button" title="基金信息维护及管理">
							<i class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
					</div>

					<div class="content-box-wrapper">

						<div id="form-wizard" class="form-wizard">
                            <ul>
                                <li>
                                    <a href="#step-1">
                                        <label class="wizard-step">1</label>
                                        <span class="wizard-description">投资档案信息<small>投资档案与提成信息</small></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#step-2">
                                        <label class="wizard-step">2</label>
                                        <span class="wizard-description">确认书打印<small>投资档案打印预览</small></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#step-3">
                                        <label class="wizard-step">3</label>
                                        <span class="wizard-description">客户信息<small>填写客户信息时必须填写证件号码</small></span>
                                    </a>
                                </li>
                            </ul>

                            <div id="step-1">
                                <form action="" class="col-md-12 center-margin">
                                
                                <div class="center-margin col-md-10">
	                                <div class="form-row">
	                                        <div class="form-label col-md-2">
	                                            <label class="label-description">档案编号：</label>
	                                        </div>
	                                        
	                                        <div class="form-input col-md-4">
	                                            <input type="text" id="invest-number" disabled>
	                                        </div>
	                                        
	                                        <div class="form-label col-md-2">
                                            <label class="label-description">(*)合同状态：</label>
                                    </div>
                                        
                                        <div class="form-input col-md-4">
				                            <select id="invest-status" disabled>
				                            	<option value="1">正常</option>
				                            </select>
                                        </div>
	                                </div>
	                                    
	                                    <div class="form-row">
	                                        <div class="form-label col-md-2">
	                                            <label class="label-description">(*)合同编号：</label>
	                                        </div>
	                                        <div class="form-input col-md-4">
	                                            <input type="text" id="invest-pact">
	                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)客户名称：</label>
                                        </div><div class="form-input col-md-4">
                                            <input type="text" id="invest-customername">
                                        </div>
	                                    </div><div class="form-row">
	                                        <div class="form-label col-md-2">
	                                            <label class="label-description">(*)基金名称：</label>
	                                        </div>
	                                        <div class="form-input col-md-4">
												<select id="invest-fund"></select>
	                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)业务经理：</label>
                                        </div><div class="form-input col-md-4">
											<select id="invest-busniessmanager"></select>
                                        </div>
	                                    </div><div class="form-row">
	                                        <div class="form-label col-md-2">
	                                            <label for="" class="label-description">(*)投资金额：</label>
	                                        </div>
	                                        <div class="form-input col-md-4">
	                                            <input type="text" id="invest-money">
	                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)部门经理：</label>
                                        </div><div class="form-input col-md-4">
                                        	<select id="invest-dm" disabled></select>
                                        </div>
	                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)投资期限：</label>
                                        </div>
                                        <div class="form-input col-md-4">
											<select id="invest-due" disabled>
				                            	<option value="1年">1年</option>
				                            </select>
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)部门：</label>
                                        </div><div class="form-input col-md-4">
                                            <select id="invest-department" disabled></select>
                                        </div>
                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)认购日期：</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input class="tcal" type="text" id="invest-from">
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)年化收益率：</label>
                                        </div><div class="form-input col-md-4">
                                            <input type="text" id="invest-yearrate" disabled>
                                        </div>
                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)到期日期：</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input class="tcal" type="text" id="invest-to">
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)业务提成比例：</label>
                                        </div><div class="form-input col-md-4">
                                            <input type="text" id="invest-yewu" disabled>
                                        </div>
                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)付息方式：</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                        	<select id="invest-paytype" disabled>
				                            	<option value=""></option>
				                            	<option value="N">年付</option>
				                            	<option value="J">季付</option>
				                            	<option value="W">半年付</option>
				                            </select>
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">管理提成比例：</label>
                                        </div><div class="form-input col-md-4">
                                            <input type="text" id="invest-guanli" disabled>
                                        </div>
                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">备注：</label>
                                        </div>
                                        <div class="form-input col-md-10">
                                            <textarea placeholder="请输入备注信息" class="textarea-no-resize" id="invest-tichengcomment"></textarea>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div class="content-box box-toggle">
							            <h3 class="content-box-header primary-bg">
							                <span class="float-left">管理提成</span>
							                <a href="#" class="float-right icon-separator btn toggle-button" title="Toggle Box">
							                    <i class="glyph-icon icon-toggle icon-chevron-down"></i>
							                </a>
							            </h3>
							                
							            <div class="content-box-wrapper">
										    <table class="table text-center mrg0B" id="guanli-table">
											   <thead>
											      <tr>
											         <th class="text-center"><span class="text-overflow"><input type="checkbox" name="checkbox"></span></th>
											         <th class="text-center"><span class="text-overflow">(*)提成人</span></th>
											         <th class="text-center"><span class="text-overflow">(*)比例</span></th>
											         <th class="text-center"><span class="text-overflow">(*)管理提成金额</span></th>
											         <th class="text-center"><span class="text-overflow item-date" title="70%提成应发放时间">(*)70%提成应发放时间</span></th>
											         <th class="text-center"><span class="text-overflow item-date" title="20%提成应发放时间">(*)20%提成应发放时间</span></th>
											         <th class="text-center"><span class="text-overflow item-date" title="10%提成应发放时间">(*)10%提成应发放时间</span></th>
											         <th class="text-center"><span class="text-overflow">(*)收款人</span></th>
											         <th class="text-center"><span class="text-overflow">实际发放时间</span></th>
											         <th class="text-center"><span class="text-overflow bank-name">(*)开户银行</span></th>
											         <th class="text-center"><span class="text-overflow bank-number">(*)银行账号</span></th>
											      </tr>
											   </thead>
											   <tbody></tbody>
											</table>
											
										</div>
										
										<div class="button-pane">
											<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="guanli-remove"><span class="button-content">删除选中行</span></button>
											<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="guanli-add"><span class="button-content">增加一行</span></button>
										</div>
									</div>
									
									<div class="content-box box-toggle">
										<div class="content-box-header primary-bg">
											<span class="float-left">业务提成</span>
											
											<a href="#" class="float-right icon-separator btn toggle-button" title="业务提成">
												<i class="glyph-icon icon-toggle icon-chevron-down"></i>
											</a>
										</div>
										
										<div class="content-box-wrapper">
										    <table class="table text-center mrg0B" id="yewu-table">
											   <thead>
											      <tr>
											         <th class="text-center"><span class="text-overflow"><input type="checkbox"></span></th>
											         <th class="text-center"><span class="text-overflow">(*)提成人</span></th>
											         <th class="text-center"><span class="text-overflow">(*)比例</span></th>
											         <th class="text-center"><span class="text-overflow">(*)业务提成金额</span></th>
											         <th class="text-center"><span class="text-overflow" title="提成应发放时间">(*)提成应发放时间</span></th>
											         <th class="text-center"><span class="text-overflow">(*)收款人</span></th>
											         <th class="text-center"><span class="text-overflow">实际发放时间</span></th>
											         <th class="text-center"><span class="text-overflow">(*)开户银行</span></th>
											         <th class="text-center"><span class="text-overflow">(*)银行账号</span></th>
											      </tr>
											   </thead>
											   <tbody></tbody>
											</table>
										</div>
										
										<div class="button-pane">
											<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="yewu-remove"><span class="button-content">删除选中行</span></button>
											<button type="button" class="btn-ui btn bg-green large medium float-right mrg10L" id="yewu-add"><span class="button-content">增加一行</span></button>
										</div>
									</div>
									
								</form>
                            </div>
                            
                            <div id="step-2">
                                <form action="" class="col-md-12 center-margin">
                                	<div class="print-page" id="invest-print">
										<div class="print-head">
											<span class="print-number"> 编号（<a name="print-number">________</a>）</span>
										</div>
										
										<p class="print-title">客户投资确认书</p>
									
										<div class="print-content">
											<p>尊敬的客户<a class="print-underline" name="print-customer">________</a></p>
											<p class="print-section">您好！</p>
											<p class="print-section">感谢您投资<a class="print-underline" name="print-fund">________</a>，成为该有限合伙企业的有限合伙人，您的实际投资金额为人民币：<a class="print-underline" name="print-money">________</a>万元整， 期限为<a class="print-underline" name="print-year">________</a>。本合伙企业承诺预期收益率为<a class="print-underline" name="print-shouyi">________</a>/年。</p>
											<p class="print-section">您的计息起始日期为<a class="print-underline" name="print-from">________</a>，</p>
										
											<div name="print-paydate"></div>
										
											<p class="print-section">根据《XXXX》、《XXXXXX》等约定，您作为<a class="print-underline" name="print-fund">________</a>的有限合伙人，享受权利并承担相应义务。本合伙企业将按照上述协议的约定，积极履行自己的职责，确保您的投资安全！</p>
										
											<p class="print-section">特此确认！</p>
										</div>
									
									    <div class="print-bottom">
									    <p class="print-right"><a name="print-fund">________</a></p>
									    <p class="print-right"><a name="print-from">________</a></p>
									    </div>
									</div>
								</form>
                            </div>
                            
                            <div id="step-3">
                                <form action="" class="col-md-10 center-margin" >
									
                                <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label class="label-description">客户名称：</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input placeholder="输入客户名称" type="text" id="invest-customer-name">
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">国家（地区）:</label>
                                        </div><div class="form-input col-md-4">
                                            <select id="invest-country">
                                                <option value=""></option>
                                                <option value="中国">中国</option>
                                                <option value="其它地区">其它地区</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">证件类型:</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <select id="invest-cardtype">
                                                <option></option>
                                                <option value="身份证">身份证</option>
                                                <option value="护照">护照</option>
                                            </select>
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)证件号码:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="请输入证件号" type="text" id="invest-cardnumber">
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">(*)住址（身份证地址）:</label>
                                        </div>
                                        <div class="form-input col-md-10">
                                            <input placeholder="请输入身份证地址" type="text" id="invest-sfzdz">
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">开户行名称:</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input placeholder="请输入开户行银行" type="text" id="invest-bankname">
                                        </div><div class="form-label col-md-2 ">
                                            <label for="" class="label-description">收益人账号:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="请输入银行账号" type="text" id="invest-banknumber">
                                        </div>
                                    </div><div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">联系电话:</label>
                                        </div>
                                        <div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="invest-phone">
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">邮政编码:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="invest-zip">
                                        </div>
                                    </div><div class="form-row">
                                        
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">E-Mail:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="invest-email">
                                        </div><div class="form-label col-md-2">
                                            <label for="" class="label-description">通讯地址:</label>
                                        </div><div class="form-input col-md-4">
                                            <input placeholder="" type="text" id="invest-address">
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label for="" class="label-description">附件:</label>
                                        </div>
                                        
                                        <div class="form-input col-md-10">
                                            <input id="invest-attachment" class="input-file" name="attachment" type="file" multiple="multiple">
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2"></div>
										<div class="form-input col-md-10" id="invest-attachment-img"></div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-label col-md-2">
                                            <label class="label-description">备注信息:</label>
                                        </div>
                                        <div class="form-input col-md-10">
                                            <textarea placeholder="请输入备注信息" class="textarea-no-resize" id="invest-yhbz"></textarea>
                                        </div>
                                    </div>
								</form>
                            </div>

						</div>
					</div>
				</div>
			
			</div>
		</div>
	</div>
</body>
</html>