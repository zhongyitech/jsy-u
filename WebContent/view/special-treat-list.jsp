<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="./head.jsp"/>
<link rel="stylesheet" type="text/css" href="../css/special-treat-list.css"/>
<script type="text/javascript" src="../js/special-treat-list.js"></script>
<title>特殊申请表管理</title>
</head>

<body class="page-body">
	<div id="page-wrapper">
		<jsp:include page="./navi.jsp"/>
		<div id="page-content-wrapper">
			<!-- #page-title -->
			<div id="page-content" class="page-view pad25T">
				<div class="content-box box-toggle view-width">
					<div class="content-box-header primary-bg">
						<span class="float-left">特殊申请单管理</span> <a href="#"
							class="float-right icon-separator btn toggle-button"
							title="最近领用记录"> <i
							class="glyph-icon icon-toggle icon-chevron-down"></i>
						</a>
						<div class="keyword-view float-right">
							<div class="keyword-input-width float-left">
								<div class="form-input">
									<div class="form-input-icon">
										<i class="glyph-icon icon-search transparent keyowrd-icon"></i>
										<input type="text" placeholder="Search notifications..."
											class="radius-top-left-100 radius-bottom-left-100 keyword-input"
											id="keyword-input" />
									</div>
								</div>
							</div>
							<button
								class="btn bg-white large medium float-left keyword-button radius-top-right-100 radius-bottom-right-100"
								id="keyword-button">
								<span class="button-content">搜索</span>
							</button>
						</div>

					</div>
					<div class="content-box-wrapper">
						<div class="col-md-12 page-bar pad0R">
							<a href="javascript:;"
								class="btn large float-left mrg5R ui-state-default"
								id="page-first"> <i class="glyph-icon icon-arrow-left"></i>
							</a>
							<div class="button-group float-left pages-div" id="pacts-pages"></div>
							<a href="javascript:;"
								class="btn large float-left mrg5L ui-state-default"
								id="page-last"> <i class="glyph-icon icon-arrow-right"></i>
							</a>
						</div>
						
						<table class="table table-striped text-center" id="investment-table">
							<colgroup>
								<col style="width: 50px;" />
								<col style="width: 80px;" />
							</colgroup>
							<tr>
								<th style="width: 10px;"></th>
								<th><span class="">状态</span></th>
								<th><span class="">基金名称</span></th>
								<th><span class="">合同编号</span></th>
								<th><span class="">申请部门</span></th>
								<th><span class="">申请人</span></th>
								<th><span class="">申请日期</span></th>
								<th><span class="">特殊表类型</span></th>
								<th><span class="">客户名称</span></th>
								<th><span class="">备注</span></th>
							</tr>
							<tr>
								<td>1</td>
								<td></td>
								<td>3</td>
								<td>2</td>
								<td>2</td>
								<td>2</td>
								<td>2</td>
								<td>2</td>
								<td>2</td>
								<td>
									<div class="dropdown">
										<a href="javascript:;" title="" class="btn medium "
											data-toggle="dropdown"> <span class="button-content">
												<i class="glyph-icon font-size-11 icon-cog"></i> <i
												class="glyph-icon font-size-11 icon-chevron-down"></i>
										</span>
										</a>
										<ul class="dropdown-menu float-right">
											<li><a href="javascript:;" title=""><i
													class="glyph-icon icon-calendar mrg5R"></i>打印委托协议</a></li>
											<li class="divider"></li>
											<li><a href="javascript:;" title=""><i
													class="glyph-icon icon-calendar mrg5R"></i>作废申请单</a></li>
										</ul>
									</div>
								</td>
							</tr>
						</table>
					</div>					
					</div>
				
				<div class="content-box box-toggle view-width">
						<div class="content-box-header primary-bg">
							<span class="float-left">协议打印数据设置</span> <a href="#"
								class="float-right icon-separator btn toggle-button"
								title="最近领用记录"> <i
								class="glyph-icon icon-toggle icon-chevron-down"></i>
							</a>
						</div>
						<div class="content-box-wrapper">
							<div style="width: 700px" id="item_settingPanel">
								<form class="form-bordered " id="bindtarget_id" action="/"
									method="post">
									<div class="form-row">
										<div class="form-label col-md-3   ">
											<label for=""> 基金名称： </label>
										</div>
										<div class="form-input col-md-4">
											<select id="fund_list"></select>
										</div>
										<div class="form-label col-md-2  ">
											<label for=""> 名称简写:</label>
										</div>
										<div class="form-input col-md-3">
											<input class="bind" id="input_htbh" data-bindtype="value"
												data-member="shortName" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label for=""> 续投协议名称： </label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="fundname" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label for=""> 注册地址： </label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="incAddress" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label for=""> 注册号： </label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label for=""> 执行事务合伙人： </label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label for=""> 基金投向： </label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-12 ">
											<h3>GP组成设置</h3>
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-12 ">
											<label><span class="font-size-16">甲方</span></label>
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>公司名称：</label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>法定代表人：</label>

										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
										
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>地址：</label>

										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									
									<div class="form-row">
										<div class="form-label col-md-12 ">
											<label><span class="font-size-16">乙方（单 GP不需要填写）</span></label>
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>公司名称：</label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>法定代表人：</label>
										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>
									<div class="form-row">
										<div class="form-label col-md-3 ">
											<label>地址：</label>

										</div>
										<div class="form-input col-md-6 ">
											<input class="bind" data-bindtype="value"
												data-member="businessLicense" />
										</div>
									</div>									
								</form>
								<div class="pad10T">
									<button class="btn-ui btn bg-green large medium mrg10L" id="">
										<span class="button-content">保存设置</span>
									</button>
								</div>
							</div>
						</div>
			</div>
			</div>
		</div>
	</div>
	<div id="jsy_msgbox_light" class="jsy_white_content jsy_light">
		<div id="jy_panel" style="width: 98%;">
			<div class="text-center" style="height: 80px;">
				<h3 id="jsy_messagebox_msg">dsfsafdasfasfaf</h3>
			</div>
			<div class="text-center">
				<a href="#" class="btn large primary-bg" title=""
					id="jsy_msgbox_comfirm_dialog"><span class="button-content">确定</span>
				</a>
			</div>
		</div>
	</div>
	<div id="jsy_msgbox_fade" class="jsy_black_overlay"></div>

</body>
</html>