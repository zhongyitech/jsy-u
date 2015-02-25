$(document).ready(function(){
	
	FUND_ADD.booleanformat = BOOLEANFORMAT;
	FUND_ADD.dateformat = DATEFORMAT;
	FUND_ADD.stringformat = STRINGFORMAT;
	FUND_ADD.numberformat = NUMBERFORMAT;
	FUND_ADD.moneyformat = MONEYFORMAT;
	FUND_ADD.page = PAGE;
	FUND_ADD.fund = FUND;
	FUND_ADD.fund_status = FUND_STATUS;
	FUND_ADD.tzqx = TZQX_REST;
	FUND_ADD.sylfw = YIELDRANGE;
	FUND_ADD.tcfpfw = TCFPFW;
	FUND_ADD.tzqx_list = TZQX_LIST;
	FUND_ADD.sylfw_list = SHOUYI_LIST;
	FUND_ADD.tcfpfw_list = TICHENG_LIST;
	
	TZQX_LIST.stringformat = STRINGFORMAT;
	TZQX_LIST.tzqx = TZQX_REST;
	TZQX_LIST.fund = FUND;
	TZQX_LIST.fund_add = FUND_ADD;
	
	SHOUYI_LIST.stringformat = STRINGFORMAT;
	SHOUYI_LIST.numberformat = NUMBERFORMAT;
	SHOUYI_LIST.rateformat = RATEFORMAT;
	SHOUYI_LIST.moneyformat = MONEYFORMAT;
	SHOUYI_LIST.fund = FUND;
	SHOUYI_LIST.sylfw = YIELDRANGE;
	SHOUYI_LIST.fund_add = FUND_ADD;
	
	TICHENG_LIST.rateformat = RATEFORMAT;
	TICHENG_LIST.fund = FUND;
	TICHENG_LIST.dm = DM;
	TICHENG_LIST.tcfpfw = TCFPFW;
	TICHENG_LIST.fund_add = FUND_ADD;
	
	FUND.ini(true);
	FUND_STATUS.ini(true);
	DM.ini(true);
	
	FUND_ADD.ini(true);
	TZQX_LIST.ini(true);
	SHOUYI_LIST.ini(true);
	TICHENG_LIST.ini(true);
});

var FUND_ADD = {//新增基金列表
		TABLE_ID: '#funds-table',
		ADD_ID: '#funds-add',
		REMOVE_ID: '#funds-remove',
		SAVE_ID: '#funds-save',
		TR_KEY: 'tr_key',
		key: 0,
		response: {},
		items: [],
		fund: {},
		fund_status: {},
		sylvfw: {},
		tcfpfw: {},
		tzqx_list: {},
		sylfw_list: {},
		tcfpfw_list: {},
		moneyformat: {},
		numberformat: {},
		booleanformat: {},
		dateformat: {},
		ini: function(async){
			var me = this;
			$(this.ADD_ID).click(function(){
				me.add();
			});
			
			$(this.REMOVE_ID).click(function(){
				me.remove();
			});
			
			$(this.SAVE_ID).click(function(){
				me.save();
			});
			
			var id = this.page.getParam(this.fund.ID_KEY);
			if(id){
				var item = this.fund.get(id);
				var items = [];
				if(item){
					items.push(item);
				}
				this.set(items);
			}else{
				this.set();
			}
		},
		get: function(key){
			return this.items[key];
		},
		set: function(items){
			if(items && items.length){
				for(var i in items){
					this.add(items[i]);
				}
			}
			
			var me = this;
			for(var i=0; i<5; i++){
				me.add();
			}
		},
		add: function (item){
			var me = this;
			var key = this.key++;
			var table = $(this.TABLE_ID);
			
			var tr = $('<tr key="' + key + '"></tr>');
			table.append(tr);
			
			var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var number_td = $('<td></td>');
			tr.append(number_td);
			var number_div = $('<div class="form-input col-md-12"></div>');
			number_td.append(number_div);
			var number_input = $('<input name="number" readonly="true" disabled/>');
			number_div.append(number_input);
			if(item){
				$(number_input).val(this.fund.toNumber(item));
			}
			
			var name_td = $('<td></td>');
			tr.append(name_td);
			var name_div = $('<div class="form-input col-md-12"></div>');
			name_td.append(name_div);
			var name_input = $('<input name="name"/>');
			name_div.append(name_input);
			if(item){
				$(name_input).val(this.fund.toName(item));
			}
			
			var status_td = $('<td></td>');
			tr.append(status_td);
			var status_select = $('<select class="status-name" name="status"></select>');
			status_td.append(status_select);
			var status_list = this.fund_status.getItems();
			if(status_list){
				var option = $('<option value=""></option>');
				status_select.append(option);
				for(var i in status_list){
					var status = status_list[i];
					var id = this.fund_status.toId(status);
					var name = this.fund_status.toName(status);
					var option = $('<option value="' + id + '">' + name + '</option>');
					status_select.append(option);
				}
			}
			if(item){
				 var status = this.fund.toStatus(item);
				 var id = this.fund_status.toId(status);
				$(status_select).val(id);
			}
			
			var date_td = $('<td></td>');
			tr.append(date_td);
			var date_div = $('<div class="form-input col-md-12"></div>');
			date_td.append(date_div);
			var date_input = $('<input name="date" class="col-md-12 tcal"/>');
			date_div.append(date_input);
			f_tcalInit();
			if(item){
				$(date_input).val(this.dateformat.toDate(item[this.fund.KSRQ_KEY]));
			}
			
			var plan_td = $('<td></td>');
			tr.append(plan_td);
			var plan_div = $('<div class="form-input col-md-12"></div>');
			plan_td.append(plan_div);
			var plan_input = $('<input name="plan"/>');
			plan_div.append(plan_input);
			$(plan_input).keyup(function(){
				$(this).val(me.stringformat.toYuan($(this).val()));
			});
			if(item){
				$(plan_input).val(this.numberformat.toYuan(item[this.fund.YMGM_KEY]));
			}
			
			var season_td = $('<td></td>');
			tr.append(season_td);
			var season_div = $('<div class="form-input col-md-12"></div>');
			season_td.append(season_div);
			var season_input = $('<input name="season"/>');
			season_div.append(season_input);
			$(season_input).keyup(function(){
				$(this).val(me.stringformat.toYuan($(this).val()));
			});
			if(item){
				$(season_input).val(me.numberformat.toYuan(item[this.fund.JFMJGM_KEY]));
			}
			
			var half_td = $('<td></td>');
			tr.append(half_td);
			var half_div = $('<div class="form-input col-md-12"></div>');
			half_td.append(half_div);
			var half_input = $('<input name="half"/>');
			half_div.append(half_input);
			$(half_input).keyup(function(){
				$(this).val(me.stringformat.toYuan($(this).val()));
			});
			if(item){
				$(half_input).val(me.numberformat.toYuan(item[this.fund.BNFMJGM_KEY]));
			}
			
			var year_td = $('<td></td>');
			tr.append(year_td);
			var year_div = $('<div class="form-input col-md-12"></div>');
			year_td.append(year_div);
			var year_input = $('<input name="year">');
			year_div.append(year_input);
			$(year_input).keyup(function(){
				$(this).val(me.stringformat.toYuan($(this).val()));
			});
			if(item){
				$(year_input).val(this.numberformat.toYuan(item[this.fund.NFMJGM_KEY]));
			}
			
			var tzqx_td = $('<td></td>');
			tr.append(tzqx_td);
			var tzqx_form = $('<div class="form-input col-md-12"></div>');
			tzqx_td.append(tzqx_form);
			var tzqx_wrapper = $('<div class="input-append-wrapper input-append-right"></div>');
			tzqx_form.append(tzqx_wrapper);
			var tzqx_append = $('<div class="input-append bg-green"><i class="glyph-icon icon-edit"></i></div>');
			tzqx_wrapper.append(tzqx_append);
			tzqx_append.click(function(){
				me.tzqx_list.set(key);
			});
			var tzqx_input_div = $('<div class="append-right"></div>');
			tzqx_form.append(tzqx_input_div);
			var tzqx_input = $('<input type="text" name="kxzqx" disabled/>');
			tzqx_input_div.append(tzqx_input);
			
			var shouyilv_td = $('<td></td>');
			tr.append(shouyilv_td);
			var shouyilv_form = $('<div class="form-input col-md-12"></div>');
			shouyilv_td.append(shouyilv_form);
			var shouyilv_wrapper = $('<div class="input-append-wrapper input-append-right"></div>');
			shouyilv_form.append(shouyilv_wrapper);
			var shouyilv_append = $('<div class="input-append bg-green"><i class="glyph-icon icon-edit"></i></div>');
			shouyilv_wrapper.append(shouyilv_append);
			shouyilv_append.click(function(){
				me.sylfw_list.set(key);
			});
			var shouyilv_input_div = $('<div class="append-right"></div>');
			shouyilv_form.append(shouyilv_input_div);
			var shouyilv_input = $('<input type="text" name="shouyi" disabled/>');
			shouyilv_input_div.append(shouyilv_input);
			
			var ticheng_td = $('<td></td>');
			tr.append(ticheng_td);
			var ticheng_form = $('<div class="form-input col-md-12"></div>');
			ticheng_td.append(ticheng_form);
			var ticheng_wrapper = $('<div class="input-append-wrapper input-append-right"></div>');
			ticheng_form.append(ticheng_wrapper);
			var ticheng_append = $('<div class="input-append bg-green"><i class="glyph-icon icon-edit"></i></div>');
			ticheng_wrapper.append(ticheng_append);
			ticheng_append.click(function(){
				me.tcfpfw_list.set(key);
			});
			var ticheng_input_div = $('<div class="append-right"></div>');
			ticheng_form.append(ticheng_input_div);
			var ticheng_input = $('<input type="text" name="ticheng" disabled/>');
			ticheng_input_div.append(ticheng_input);
			
			if(item){
				item[this.TR_KEY] = key;
				this.updateTZQX(item);
				this.updateShouyi(item);
				this.updateTicheng(item);
			}else{
				item = {};
				item[this.TR_KEY] = key;
				item[this.fund.TZQX_KEY]=[];
				item[this.fund.SYLFW_KEY]=[];
				item[this.fund.TCFPFW_KEY]=[];
			}
			
			this.items.push(item);
		},
		remove: function (){//删除选中行
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i =1; i<trs.length; i++){
				var tr = $(trs.get(i));
				var checkbox = tr.find('input[name="checkbox"]');
				if(checkbox.length > 0){
					if(checkbox.get(0)['checked']){
						tr.remove();
					}
				}
			}
		},
		updateTZQX: function(item){
			var tzqx = item[this.fund.TZQX_KEY];
			if(tzqx && tzqx.length){
				for(var i in tzqx){
					var id = tzqx[i][this.tzqx.ID_KEY];
					if(id){
						tzqx[i] = this.tzqx.get(id);
					}
				}
			}
			
			var key = item[this.TR_KEY];
			var table = $(this.TABLE_ID);
			var tr = table.find('tr[key="' + key + '"]');
			var tzqx_input = $(tr).find('input[name="kxzqx"]');
			if(tzqx_input && tzqx && tzqx.length>0){
				var item = tzqx[0];
				var jsz = this.tzqx.toJSZ(item);
				var dw = this.tzqx.toDW(item);
				tzqx_input.val(jsz + dw);
			}else{
				tzqx_input.val('');
			}
		},
		updateShouyi: function(item){
			var shouyilv = item[this.fund.SYLFW_KEY];
			if(shouyilv && shouyilv.length){
				for(var i in shouyilv){
					var id = shouyilv[i][this.sylfw.ID_KEY];
					if(id){
						shouyilv[i] = this.sylfw.get(id);
					}
				}
			}
			
			var key = item[this.TR_KEY];
			var shouyis = item[this.fund.SYLFW_KEY];
			var table = $(this.TABLE_ID);
			var tr = table.find('tr[key="' + key + '"]');
			var shouyi_input = $(tr).find('input[name="shouyi"]');
			if(shouyi_input && shouyis && shouyis.length>0){
				var shouyi = shouyis[0];
				var min = this.moneyformat.toYuan(shouyi['investment1']);
				var max = this.moneyformat.toYuan(shouyi['investment2']);
				var rate = this.numberformat.toRate(shouyi['yield']);
				shouyi_input.val(min + ' - ' + max + ' ：' + rate);
			}else{
				shouyi_input.val('');
			}
		},
		updateTicheng: function(item){
			var ticheng = item[this.fund.TCFPFW_KEY];
			if(ticheng && ticheng.length){
				for(var i in ticheng){
					var id = ticheng[i][this.tcfpfw.ID_KEY];
					if(id){
						ticheng[i] = this.tcfpfw.get(id);
					}
				}
			}
			
			var key = item[this.TR_KEY];
			var tichengs = item[this.fund.TCFPFW_KEY];
			var table = $(this.TABLE_ID);
			var tr = table.find('tr[key="' + key + '"]');
			var ticheng_input = $(tr).find('input[name="ticheng"]');
			if(ticheng_input && tichengs && tichengs.length>0){
				var ticheng = tichengs[0];
				var dm = DM.getName(ticheng['manageerId']);
				var baoxiao = this.booleanformat.toBaoxiao(ticheng['allSell']);
				var guanli = this.numberformat.toRate(ticheng['businessCommision']);
				var yewu = this.numberformat.toRate(ticheng['ManageCommision']);
				var shouyilv = this.numberformat.toRate(ticheng['investment']);
				ticheng_input.val(dm + '：' + baoxiao + '：' + guanli + '：' + yewu + '：' + shouyilv);
			}else{
				ticheng_input.val('');
			}
		},
		update: function(item){
			var key = item[this.TR_KEY];
			//更新前台缓存数据
			if(key || key == 0){
				this.items[key] = item;
			}
			var table = $(this.TABLE_ID);
			var tr = table.find('tr[key="' + key + '"]');
			if(tr){
				var number = tr.find('input[name="number"]');
				var number_new = item['fundNo'];
				if(number && (number_new || number_new == 0)){
					$(number).val(number_new);
				}
			}
			
			var shouyilv = item[this.fund.SYLFW_KEY];
			if(shouyilv && shouyilv.length){
				for(var i in shouyilv){
					shouyilv[i] = this.sylfw.get(shouyilv[i][this.sylfw.ID_KEY]);
				}
			}
			
			var ticheng = item[this.fund.TCFPFW_KEY];
			if(ticheng && ticheng.length){
				for(var i in ticheng){
					ticheng[i] = this.tcfpfw.get(ticheng[i][this.tcfpfw.ID_KEY]);
				}
			}
		},
		save: function (){
			var table = $(this.TABLE_ID);
			var funds = table.find('tr');
			var fundsJSON = [];
			for(var i=1; i<funds.length; i++){
				var fund = $(funds.get(i));
				var fundJSON = {};
				var number = fund.find('input[name="number"]').val();
				if(number){
					fundJSON['fundNo'] = number;
				}
				
				var name = fund.find('input[name="name"]').val();
				if(name){
					fundJSON['fundName'] = name;
				}
				
				var date = fund.find('input[name="date"]').val();
				if(date){
					fundJSON['startSaleDate'] = this.dateformat.toRest(date.trim());
				}
				
				var status = fund.find('select[name="status"]').val();
				if(status){
					fundJSON['status'] = {id: status};
				}
				
				var plan = fund.find('input[name="plan"]').val();
				if(plan){
					fundJSON['raiseFunds'] = this.moneyformat.toNumber(plan);
				}

				var season = fund.find('input[name="season"]').val();
				if(season){
					fundJSON['quarterRaise'] = this.moneyformat.toNumber(season);
				}
				
				var half = fund.find('input[name="half"]').val();
				if(half){
					fundJSON['halfRaise'] = this.moneyformat.toNumber(half);
				}
				
				var year = fund.find('input[name="year"]').val();
				if(year){
					fundJSON['yearRaise'] = this.moneyformat.toNumber(year);
				}
				
				if(JSON.stringify(fundJSON) != "{}"){
					var key = fund.attr('key');
					if(key){
						fundJSON[this.TR_KEY] = key;
					}
					
					var tzqx = this.items[key][this.fund.TZQX_KEY];
					if(tzqx){
						fundJSON[this.fund.TZQX_KEY] = tzqx;
					}
					
					var profits = this.items[key][this.fund.SYLFW_KEY];
					if(profits){
						fundJSON[this.fund.SYLFW_KEY] = profits;
					}
					
					var ticheng = this.items[key][this.fund.TCFPFW_KEY];
					if(ticheng){
						fundJSON[this.fund.TCFPFW_KEY] = ticheng;
					}
					
					var id = this.items[key]['id'];
					if(id){
						fundJSON['id'] = id;
					}
					
					//收集需要更新的数据
					fundsJSON.push(fundJSON);
				}
			}
			
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/fund/put", 
				async: true,
				data: {funds: JSON.stringify(fundsJSON)},
				dataType: "json",
				success: function(response){
					me.response = response;
					if(response){
						var items = response.rest_result;
						if(items){
							for(var i in items){
								me.update(items[i]);
							}
						}
					}
					alert('保存成功.');
				},
				error: function(response){
					me.response = response;
					if(LOGIN.error(response)){
						alert('保存失败.');
					}
				}
			});
		}
};

var SHOUYI_LIST = {
		OVERLAY_ID: '#shouyi-overlay',
		LAYOUT_ID: '#shouyi-layout',
		TABLE_ID: '#sylfw-table',
		ADD_ID: '#sylfw-add',
		REMOVE_ID: '#sylfw-remove',
		SAVE_ID: '#sylfw-save',
		CLOSE_ID: '.ui-dialog-titlebar-close',
		SYLFW_BUTTON_ID: '#sylfw-button',
		numberformat: NUMBERFORMAT,
		sylfw: {},
		fund_add: {},
		fund: {},
		parent_id: 0,
		items: [],
		ini: function(async){
			var me = this;
			$(this.CLOSE_ID).click(function(){
				me.close();
			});
			
			$(this.ADD_ID).click(function(){
				me.add();
			});
			
			$(this.REMOVE_ID).click(function(){
				me.remove();
			});
			
			$(this.SAVE_ID).click(function(){
				me.save();
			});
		},
		show: function(){
			$(this.SYLFW_BUTTON_ID).click();
			/*$(this.OVERLAY_ID).removeClass("hide");
			$(this.LAYOUT_ID).removeClass("hide");*/
		},
		close: function(){
			$(this.CLOSE_ID).click();
			/*$(this.OVERLAY_ID).addClass("hide");
			$(this.LAYOUT_ID).addClass("hide");*/
		},
		add: function (item){//增加一行
			var table = $(this.TABLE_ID);
			var tr = $('<tr></tr>');
			table.append(tr);
			
			var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var me = this;
			var min_td = $('<td></td>');
			tr.append(min_td);
			var min_div = $('<div class="form-input col-md-12"></div>');
			min_td.append(min_div);
			var min_input = $('<input name="min"/>');
			min_div.append(min_input);
			$(min_input).keyup(function(){
				var money = me.stringformat.toYuan($(this).val());
				$(this).val(money);
			});
			if(item){
				var min = this.sylfw.toMin(item);
				$(min_input).val(this.numberformat.toYuan(min));
			}
			
			var label = $('<td><span class="form-label"> ≤ 金额  < </span></td>');
			tr.append(label);
			
			var max_td = $('<td></td>');
			tr.append(max_td);
			var max_div = $('<div class="form-input col-md-12"></div>');
			max_td.append(max_div);
			var max_input = $('<input name="max"/>');
			max_div.append(max_input);
			$(max_input).keyup(function(){
				var money = me.stringformat.toYuan($(this).val());
				$(this).val(money);
			});
			if(item){
				var max = this.sylfw.toMax(item);
				$(max_input).val(this.numberformat.toYuan(max));
			}
			
			var yield_td = $('<td></td>');
			tr.append(yield_td);
			var yield_div = $('<div class="form-input col-md-12"></div>');
			yield_td.append(yield_div);
			var yield_input = $('<input name="rate"/>');
			yield_div.append(yield_input);
			$(yield_input).keyup(function(e){
				if(e.which == 8){
					$(this).val('');
				}else{
					var rate = me.stringformat.toRate($(this).val());
					$(this).val(rate);
				}
			});
			if(item){
				var yield = this.sylfw.toYield(item);
				$(yield_input).val(this.numberformat.toRate(yield));
			}
			
			var vers_td = $('<td></td>');
			tr.append(vers_td);
			var vers_div = $('<div class="form-input col-md-12"></div>');
			vers_td.append(vers_div);
			var vers_input = $('<input name="vers"/>');
			vers_div.append(vers_input);
			$(vers_input).keyup(function(e){
				$(this).val(me.stringformat.toFirst($(this).val()));
			});
			if(item){
				var vers = this.sylfw.toVers(item);
				$(vers_input).val(vers);
			}
		},
		remove: function (){//删除选中行
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				var item = $(trs.get(i));
				var checkbox = item.find('input[name="checkbox"]');
				if(checkbox.length > 0){
					if(checkbox.get(0)['checked']){
						$(item).remove();
					}
				}
			}
		},
		set: function(parent_id){
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				$(trs.get(i)).remove();
			}
			
			this.parent_id = parent_id;
			var fund = this.fund_add.get(this.parent_id);
			this.items = this.fund.toSYLFW(fund);
			for(var i in this.items){
				this.add(this.items[i]);
			}
			
			for(var i=0; i<3; i++){
				this.add();
			}
			this.show();
		},
		save: function (){//确认编辑
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			
			var items = [];
			for(var i=1; i<trs.length; i++){
				var item = {};
				var tr = $(trs.get(i));
				var min = tr.find('input[name="min"]').val();
				if(min){
					item['investment1'] = this.moneyformat.toNumber(min);
				}
				
				var max = tr.find('input[name="max"]').val();
				if(max){
					item['investment2'] = this.moneyformat.toNumber(max);
				}
				
				var rate = tr.find('input[name="rate"]').val();
				if(rate){
					item['yield'] = this.rateformat.toNumber(rate);
				}
				
				var vers = tr.find('input[name="vers"]').val();
				if(vers){
					item['vers'] = this.stringformat.toFirst(vers);
				}
				
				if(min && max && rate && vers){
					items.push(item);
				}else if(!min && !max && !rate && !vers){
					continue;
				}else if(!min){
					alert('请输入最低收益范围.');
					return;
				}else if(!max){
					alert('请输入最高收益范围.');
					return;
				}else if(!rate){
					alert('请输入收益率.');
					return;
				}else if(!vers){
					alert('请输入合同版本.');
					return;
				}
			}
			
			var fund = this.fund_add.get(this.parent_id);
			fund[this.fund_add.fund.SYLFW_KEY] = items;
			this.fund_add.updateShouyi(fund);
			this.close();
		}
};

var DM = {
		ID_KEY: 'id',
		NAME_KEY: 'chainName',
		items: [],
		map: {},
		rest_result: {},
		success: function(){},
		error: function(result){
			LOGIN.error(result);
		},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			var me = this;
			$.ajax({ 
				type: "post", 
				url: "../rest/user/getAll", 
				async: async,
				data: {},
				dataType: "json",
				success: function(result){
					me.rest_result = result;
					if(result && result[REST.RESULT_KEY]){
						me.items = JSON.parse(result[REST.RESULT_KEY]);
					}
					me.success();
				},
				error: function(result){
					me.error(result);
				}
			});
		},
		getItems: function(){
			if(!this.items || !this.items.length){
				this.ini(false);
			}
			return this.items;
		},
		getMap: function(){
			if(JSON.stringify(this.map) == "{}"){
				var items = this.getItems();
				for(var i in items){
					this.map[items[i]['id']] = items[i];
				}
			}
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		getName:function(id){
			var item = this.get(id);
			var name = item[this.NAME_KEY];
			if(!name){
				name = '无中文名';
			}
			return name;
		}
};

var TICHENG_LIST = {
		OVERLAY_ID: "#ticheng-overlay",
		LAYOUT_ID: "#ticheng-layout",
		ID_KEY: 'manageerId',
		TABLE_ID: "#tcfpfw-table",
		ADD_ID: "#tcfpfw-add",
		REMOVE_ID: "#tcfpfw-remove",
		SAVE_ID: "#tcfpfw-save",
		TCFPFW_BUTTON_ID: "#tcfpfw-button",
		CLOSE_ID: ".ui-dialog-titlebar-close",
		map_cache: false,//数据是否缓存完成
		moneyformat: MONEYFORMAT,
		numberformat: NUMBERFORMAT,
		stringformat: STRINGFORMAT,
		rateformat: RATEFORMAT,
		tr_name: 0,
		items: [],
		map: {},
		dm: {},
		fund_add: {},
		tcfpfw: {},
		ini: function(async){
			//默认异步加载数据
			if(!async){
				async = true;
			}
			
			var me = this;
			$(this.CLOSE_ID).click(function(){
				me.close();
			});
			
			$(this.SAVE_ID).click(function(){
				me.save();
			});
		},
		getItems: function(){
			return this.items;
		},
		setItems: function(items){
			this.map_cache = false;
			this.items = items;
			this.map = {};
		},
		getMap: function(){
			if(!this.map_cache){
				var items = this.items;
				for(var i=0; i<items.length; i++){
					var item = items[i];
					this.map[item[this.ID_KEY]]=item;
				}
			}
			
			this.map_cache = true;
			return this.map;
		},
		get: function(id){
			var map = this.getMap();
			return map[id];
		},
		show: function(){
			$(this.TCFPFW_BUTTON_ID).click();
		},
		close: function(){
			$(this.CLOSE_ID).click();
		},
		add: function (item){//增加一行记录
			if(!item){
				return;
			}
			
			var table = $(this.TABLE_ID);
			var tr = $('<tr></tr>');
			table.append(tr);
			var checkbox = $('<td><input class="item-checkbox" type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var dm_td = $('<td></td>');
			tr.append(dm_td);
			var dm_select = $('<select class="user-name" name="dm" disabled></select>');
			dm_td.append(dm_select);
			var user = this.dm.get(item[this.ID_KEY]);
			var username = this.dm.getName(user['id']);
			var option = $('<option value="' + user['id'] + '">' + username + '</option>');
			dm_select.append(option);
			
			var sfbx_td = $('<td></td>');
			tr.append(sfbx_td);
			var sfbx_input = $('<input type="checkbox" name="baoxiao"/>');
			sfbx_td.append(sfbx_input);
			if(item){
				var sfbx = this.tcfpfw.toSFBX(item);
				sfbx_input[0]['checked']=sfbx;
			}
			
			var me = this;
			
			var ywtcbl_td = $('<td></td>');
			tr.append(ywtcbl_td);
			var ywtcbl_div = $('<div class="form-input col-md-12"></div>');
			ywtcbl_td.append(ywtcbl_div);
			var ywtcbl_input = $('<input name="yewu"/>');
			ywtcbl_div.append(ywtcbl_input);
			$(ywtcbl_input).keyup(function(e){
				if(e.which == 8){
					$(this).val('');
				}else{
					$(this).val(me.stringformat.toRate($(this).val()));
				}
			});
			if(item){
				var ywtcbl = this.tcfpfw.toYWTCBL(item);
				$(ywtcbl_input).val(this.numberformat.toRate(ywtcbl));
			}
			
			var gltcbl_td = $('<td></td>');
			tr.append(gltcbl_td);
			var gltcbl_div = $('<div class="form-input col-md-12"></div>');
			gltcbl_td.append(gltcbl_div);
			var gltcbl_input = $('<input name="guanli"/>');
			gltcbl_div.append(gltcbl_input);
			$(gltcbl_input).keyup(function(e){
				if(e.which == 8){
					$(this).val('');
				}else{
					$(this).val(me.stringformat.toRate($(this).val()));
				}
			});
			if(item){
				var gltcbl = this.tcfpfw.toGLTCBL(item);
				$(gltcbl_input).val(this.numberformat.toRate(gltcbl));
			}
			
			var bxsyl_td = $('<td></td>');
			tr.append(bxsyl_td);
			var bxsyl_div = $('<div class="form-input col-md-12"></div>');
			bxsyl_td.append(bxsyl_div);
			var bxsyl_input = $('<input name="shouyilv"/>');
			bxsyl_div.append(bxsyl_input);
			$(bxsyl_input).keyup(function(e){
				if(e.which == 8){
					$(this).val('');
				}else{
					$(this).val(me.stringformat.toRate($(this).val()));
				}
			});
			if(item){
				var bxsyl = this.tcfpfw.toBXSYL(item);
				$(bxsyl_input).val(this.numberformat.toRate(bxsyl));
			}
			
		},
		set: function(parent_id){
			var table = $(this.TABLE_ID);
			
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				$(trs.get(i)).remove();
			}
			
			this.parent_id = parent_id;
			var fund = this.fund_add.get(this.parent_id);
			this.setItems(fund[this.fund_add.fund.TCFPFW_KEY]);
			
			var dms = this.dm.getItems();
			for(var i = 0; i<dms.length; i++){
				var dm = dms[i];
				var ticheng = this.get(dm[this.dm.ID_KEY]);
				if(!ticheng){
					ticheng = {};
					ticheng[this.ID_KEY]=dm[this.dm.ID_KEY];
				}
				this.add(ticheng);
			}
			
			this.show();
		},
		save: function (){//保存
			var items = this.getItems();
			//清空数组
			items.length = 0;
			
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			
			for(var i=1; i<trs.length; i++){
				var tr = $(trs.get(i));
				var item = {};
				items.push(item);
				var dm = tr.find('select[name="dm"]').val();
				if(dm){
					item['manageerId'] = dm.trim();
				}
				
				var baoxiao = tr.find('input[name="baoxiao"]');
				if(baoxiao && baoxiao.length>0){
					item['allSell'] = baoxiao[0]['checked'];
				}
				
				var yewu = tr.find('input[name="yewu"]').val();
				if(yewu){
					item['businessCommision'] = this.rateformat.toNumber(yewu.trim());
				}
				
				var guanli = tr.find('input[name="guanli"]').val();
				if(guanli){
					item[this.tcfpfw.GLTCBL_KEY] = this.rateformat.toNumber(guanli.trim());
				}
				
				var shouyilv = tr.find('input[name="shouyilv"]').val();
				if(shouyilv){
					item['investment'] = this.rateformat.toNumber(shouyilv.trim());
				}
			}
			
			var fund = this.fund_add.get(this.parent_id);
			fund[this.fund.TCFPFW_KEY] = items;
			this.fund_add.updateTicheng(fund);
			this.close();
		}
};

var TZQX_LIST = {
		TABLE_ID: '#tzqx-table',
		ADD_ID: '#tzqx-add',
		REMOVE_ID: '#tzqx-remove',
		SAVE_ID: '#tzqx-save',
		SHOW_ID: '#tzqx-button',
		CLOSE_ID: '.ui-dialog-titlebar-close',
		numberformat: NUMBERFORMAT,
		tzqx: {},
		fund_add: {},
		fund: {},
		parent_id: 0,
		items: [],
		ini: function(async){
			var me = this;
			$(this.CLOSE_ID).click(function(){
				me.close();
			});
			
			$(this.ADD_ID).click(function(){
				me.add();
			});
			
			$(this.REMOVE_ID).click(function(){
				me.remove();
			});
			
			$(this.SAVE_ID).click(function(){
				me.save();
			});
		},
		show: function(){
			$(this.SHOW_ID).click();
		},
		close: function(){
			$(this.CLOSE_ID).click();
		},
		add: function (item){
			var table = $(this.TABLE_ID);
			var tr = $('<tr></tr>');
			table.append(tr);
			
			var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var me = this;
			var jsz_td = $('<td></td>');
			tr.append(jsz_td);
			var jsz_div = $('<div class="form-input col-md-12"></div>');
			jsz_td.append(jsz_div);
			var jsz_input = $('<input name="jsz"/>');
			jsz_div.append(jsz_input);
			$(jsz_input).keyup(function(){
				var v = me.stringformat.toNumber($(this).val());
				$(this).val(v);
			});
			if(item){
				var jsz = this.tzqx.toJSZ(item);
				$(jsz_input).val(jsz);
			}
			
			var dw_td = $('<td></td>');
			tr.append(dw_td);
			var dw_select = $('<select class="" name="dw"></select>');
			dw_td.append(dw_select);
			dw_select.append('<option value=""></option>');
			dw_select.append('<option value="年">年</option>');
			dw_select.append('<option value="天">天</option>');
			if(item){
				var v = this.tzqx.toDW(item);
				$(dw_select).val(v);
			}
		},
		remove: function (){//删除选中行
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				var item = $(trs.get(i));
				var checkbox = item.find('input[name="checkbox"]');
				if(checkbox.length > 0){
					if(checkbox.get(0)['checked']){
						$(item).remove();
					}
				}
			}
		},
		set: function(parent_id){
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				$(trs.get(i)).remove();
			}
			
			this.parent_id = parent_id;
			var fund = this.fund_add.get(this.parent_id);
			var items = this.fund.toTZQX(fund);
			this.items = items;
			if(items){
				for(var i in this.items){
					this.add(this.items[i]);
				}
			}
			
			for(var i=0; i<3; i++){
				this.add();
			}
			this.show();
		},
		save: function (){//确认编辑
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			
			var items = [];
			for(var i=1; i<trs.length; i++){
				var item = {};
				var tr = $(trs.get(i));
				var jsz = tr.find('input[name="jsz"]').val();
				if(jsz){
					item[this.tzqx.JSZ_KEY] = jsz;
				}
				
				var dw = tr.find('select[name="dw"]').val();
				if(dw){
					item[this.tzqx.DW_KEY] = dw;
				}
				
				if(jsz && dw){
					items.push(item);
				}else if(!jsz && !dw){
					continue;
				}else if(!jsz){
					alert('请输入期限.');
					return;
				}else if(!dw){
					alert('请选择单位.');
					return;
				}
			}
			
			var fund = this.fund_add.get(this.parent_id);
			fund[this.fund.TZQX_KEY] = items;
			this.fund_add.updateTZQX(fund);
			this.close();
		}
};
