//数据加载、按钮点击事件等
$(document).ready(function(){
	COMPANY_FORM.ini(true);
});

//公司信息表单
var COMPANY_FORM={
		VIEW_ID: '#company-view',
		FORM_ID: '#company-form',
		MENU_ID: '#menu',
		SUBMIT_ID: '#submit-button',
		NAME_ID: '#name',
		NICKNAME_ID: '#nickname',
		TYPE_ID: '#type',
		TEMPLATE_ID: '#template',
		ADDRESS_ID: '#address',
		PARTNER_ID: '#partner',
		PARTNER_LABEL: '#partner-label',
		PARTNER_BUTTON: '#partner-button',
		FUND_LABEL: '#fund-label',
		PARENT_INPUT: '#parent-input',
		FUND_ID: '#fund',
		FRDB_ID: '#frdb',
		FRDB_LABEL: '#frdb-label',
		SHENG_ID: '#sheng',
		CITY_ID: '#city',
		XIAN_ID: '#xian',
		PHONE_ID: '#phone',
		DESCRIPTION_ID: '#description',
		FOUND_ID: '#found',
		ASSIGNER_ID: '#assigner',
		FAX_ID: '#fax',
		STATUS_ID: '#status',
		item: {},
		getView: function(){
			return $(this.VIEW_ID);
		},
		getMenu: function(){
			var view = this.getView();
			if(view){
				return view.find(this.MENU_ID);
			}
		},
		getMenuPartner: function(){
			var v = this.getMenu();
			if(v){
				return v.find(this.PARTNER_BUTTON);
			}
		},
		getForm: function(){
			var view = this.getView();
			if(view){
				return view.find(this.FORM_ID);
			}
		},
		getNameView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.NAME_ID);
			}
		},
		setName: function(item){
			this.getNameView().val(COMPANY.toName(item));
		},
		getNicknameView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.NICKNAME_ID);
			}
		},
		setNickname: function(item){
			this.getNicknameView().val(COMPANY.toNickname(item));
		},
		getTypeView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.TYPE_ID);
			}
		},
		setType: function(item){
			var value = COMPANY.toType(item);
			this.getTypeView().val(COMPANY_TYPE.toId(value));
			
			var me = this;
			var type = COMPANY_TYPE.get(me.getTypeView().val());
			var value = COMPANY_TYPE.toValue(type);
			
			var frdb_label = me.getFRDBLabel();
			var frdb_input = me.getFRDBView();
			if(value == COMPANY_TYPE.VALUE_GENNERAL){
				frdb_label.text('(*)法人代表:');
				frdb_input.attr('disabled', false);
				frdb_input.attr('placeholder', '必填');
			}else{
				frdb_label.text('法人代表:');
				frdb_input.attr('disabled', true);
				frdb_input.attr('placeholder', '');
				frdb_input.val('');
			}
			
			var partner_label = me.getPartnerLabel();
			var partner_button = me.getPartnerButton();
			
			var fund_label = me.getFundLabel();
			var fund_input = me.getFundView();
			if(value == COMPANY_TYPE.VALUE_PARTNER){
				partner_label.text('(*)合伙人:');
				partner_button.removeClass('disabled');
				
				fund_label.text('(*)基金:');
				fund_input.attr('disabled', false);
			}else{
				partner_label.text('合伙人:');
				partner_button.addClass('disabled');
				me.item[COMPANY.PARTNER_KEY]=[];
				me.setPartner(me.item);
				
				fund_label.text('基金:');
				fund_input.val('');
				fund_input.attr('disabled', true);
			}
		},
		iniTypeView: function(item){
			var view = this.getTypeView();
			if(view){
				var items = COMPANY_TYPE.getItems();
				var option = $('<option value=""></option>');
				view.append(option);
				for(var i in items){
					var item = items[i];
					var id = COMPANY_TYPE.toId(item);
					var name = COMPANY_TYPE.toName(item);
					var option = $('<option value="' + id + '">' + name + '</option>');
					view.append(option);
				}
			}
			
			var me = this;
			view.change(function(){
				var type = COMPANY_TYPE.get(me.getTypeView().val());
				if(type){
					me.item[COMPANY.TYPE_KEY] = type;
				}else{
					me.item[COMPANY.TYPE_KEY] = null;
				}
				me.setType(me.item);
			});
		},
		getTemplateView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.TEMPLATE_ID);
			}
		},
		setTemplate: function(item){
			var v = COMPANY.toTemplate(item);
			this.getTemplateView().val(v);
		},
		getAddressView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ADDRESS_ID);
			}
		},
		setAddress: function(item){
			this.getAddressView().val(COMPANY.toAddress(item));
		},
		getPartnerLabel: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PARTNER_LABEL);
			}
		},
		getPartnerView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PARTNER_ID);
			}
		},
		setPartner: function(item){
			var v = [];
			var items = COMPANY.toPartner(item);
			if(items){
				for(var i=0; i<items.length; i++){
					var o = COMPANY.toItem(items[i]);
					v.push(COMPANY.toName(o))
				}
			}
			var view = this.getPartnerView();
			view.val(v);
			
			PARTNER_LIST.set(COMPANY.toPartner(item));
		},
		getPartnerButton: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PARTNER_BUTTON);
			}
		},
		iniPartnerButton: function(){
			var me = this;
			var v = me.getPartnerButton();
			if(v){
				v.click(function(){
					if(!$(me.getPartnerButton()).hasClass('disabled')){
						$(me.getMenuPartner()).click();
					}
				});
			}
		},
		getPartnerButton: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PARTNER_BUTTON);
			}
		},
		iniPartnerView: function(){
			PARTNER_LIST.ini();
		},
		setYHZH: function(item){
			var v = [];
			var items = COMPANY.toYHZH(item);
			if(items){
				for(var i=0; i<items.length; i++){
					var id = YHZH.toId(items[i]);
					if(id){
						items[i] = YHZH.toItem(items[i]);
					}
				}
			}
			
			YHZH_LIST.set(items);
		},
		iniYHZH: function(){
			YHZH_LIST.ini();
		},
		getFundLabel: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FUND_LABEL);
			}
		},
		getFundView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FUND_ID);
			}
		},
		setFund: function(item){
			var fund = COMPANY.toFund(item);
			this.getFundView().val(FUND.toId(fund));
		},
		iniFundView: function(){
			var view = this.getFundView();
			if(view){
				var items = FUND.getItems();
				var option = $('<option value=""></option>');
				view.append(option);
				for(var i in items){
					var item = items[i];
					var id = FUND.toId(item);
					var name = FUND.toName(item);
					var option = $('<option value="' + id + '">' + name + '</option>');
					view.append(option);
				}
			}
		},
		getParentInput: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PARENT_INPUT);
			}
		},
		setParent: function(item){
			var company = COMPANY.toParent(item);
			this.getParentInput().val(COMPANY.toId(company));
		},
		iniParentInput: function(){
			var view = this.getParentInput();
			if(view){
				var items = COMPANY.getItems();
				var option = $('<option value=""></option>');
				view.append(option);
				var cid = PAGE.getParam(COMPANY.ID_KEY);
				for(var i in items){
					var item = items[i];
					var id = COMPANY.toId(item);
					
					if(cid != id ){
						var name = COMPANY.toName(item);
						var option = $('<option value="' + id + '">' + name + '</option>');
						view.append(option);
					}
				}
			}
		},
		getFRDBLabel: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FRDB_LABEL);
			}
		},
		getFRDBView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FRDB_ID);
			}
		},
		setFRDB: function(item){
			this.getFRDBView().val(COMPANY.toFRDB(item));
		},
		getSHENGView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.SHENG_ID);
			}
		},
		setSHENG: function(item){
			this.getSHENGView().val(COMPANY.toSHENG(item));
		},
		getCityView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.CITY_ID);
			}
		},
		setCity: function(item){
			this.getCityView().val(COMPANY.toCity(item));
		},
		getXIANView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.XIAN_ID);
			}
		},
		setXIAN: function(item){
			this.getXIANView().val(COMPANY.toXIAN(item));
		},
		getStatusView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.STATUS_ID);
			}
		},
		setStatus: function(item){
			this.getStatusView().val(COMPANY.toStatus(item));
		},
		getFoundView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FOUND_ID);
			}
		},
		setFound: function(item){
			var v = COMPANY.toFound(item);
			this.getFoundView().val(DATEFORMAT.toDate(v));
		},
		getAssignerView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ASSIGNER_ID);
			}
		},
		setAssigner: function(item){
			this.getAssignerView().val(COMPANY.toAssigner(item));
		},
		getPhoneView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PHONE_ID);
			}
		},
		setPhone: function(item){
			this.getPhoneView().val(COMPANY.toPhone(item));
		},
		getFaxView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.FAX_ID);
			}
		},
		setFax: function(item){
			this.getFaxView().val(COMPANY.toFax(item));
		},
		getDescriptionView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.DESCRIPTION_ID);
			}
		},
		setDescription: function(item){
			this.getDescriptionView().val(COMPANY.toDescription(item));
		},
		getSubmitButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.SUBMIT_ID);
			}
		},
		iniSubmitButton: function(){
			var me = this;
			var button = this.getSubmitButton();
			if(button){
				button.click(function(){
					me.submit();
				});
			}
		},
		ini: function(async){
			if(!async){
				async = false;
			}
			
			this.iniTypeView();
			this.iniFundView();
			this.iniParentInput();
			this.iniPartnerView();
			this.iniPartnerButton();
			this.iniYHZH();
			
			this.iniSubmitButton();
			
			var id = PAGE.getParam(COMPANY.ID_KEY);
			var item = COMPANY.get(id);
			if(item){
				this.set(item);
			}else{
				this.set({});
			}
		},
		set: function(item){
			this.item = item;
			
			this.setName(item);
			this.setNickname(item);
			this.setType(item);
			this.setTemplate(item);
			this.setAddress(item);
			this.setPartner(item);
			this.setFund(item);
			this.setFRDB(item);
			this.setSHENG(item);
			this.setCity(item);
			this.setXIAN(item);
			this.setStatus(item);
			this.setFound(item);
			this.setAssigner(item);
			this.setPhone(item);
			this.setFax(item);
			this.setDescription(item);
			this.setYHZH(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			
			var name = this.getNameView().val();
			if(name){
				item[COMPANY.NAME_KEY] = name;
			}
			
			var nickname = this.getNicknameView().val();
			if(nickname){
				item[COMPANY.NICKNAME_KEY] = nickname;
			}
			
			var type = this.getTypeView().val();
			if(type){
				item[COMPANY.TYPE_KEY] = {id: type};
			}
			
			var template = this.getTemplateView().val();
			if(template){
				item[COMPANY.TEMPLATE_KEY] = template;
			}
			
			var address = this.getAddressView().val();
			if(address){
				item[COMPANY.ADDRESS_KEY] = address;
			}
			
			var fund = this.getFundView().val();
			if(fund){
				item[COMPANY.FUND_KEY] = {id: fund};
			}else{
				item[COMPANY.FUND_KEY] = null;
			}
			
			var parent = this.getParentInput().val();
			if(parent){
				item[COMPANY.PARENT_KEY] = {id: parent};
			}else{
				item[COMPANY.PARENT_KEY] = null;
			}
			
			var frdb = this.getFRDBView().val();
			item[COMPANY.FRDB_KEY] = frdb;
			
			var sheng = this.getSHENGView().val();
			if(sheng){
				item[COMPANY.SHENG_KEY] = sheng;
			}
			
			var city = this.getCityView().val();
			if(city){
				item[COMPANY.CITY_KEY] = city;
			}
			
			var xian = this.getXIANView().val();
			if(xian){
				item[COMPANY.XIAN_KEY] = xian;
			}
			
			var status = this.getStatusView().val();
			if(status){
				item[COMPANY.STATUS_KEY] = status;
			}
			
			var found = this.getFoundView().val();
			if(found){
				item[COMPANY.FOUND_KEY] = DATEFORMAT.toRest(found);
			}
			
			var assigner = this.getAssignerView().val();
			if(assigner){
				item[COMPANY.ASSIGNER_KEY] = assigner;
			}
			
			var phone = this.getPhoneView().val();
			if(phone){
				item[COMPANY.PHONE_KEY] = phone;
			}
			
			var fax = this.getFaxView().val();
			if(fax){
				item[COMPANY.FAX_KEY] = fax;
			}
			
			var description = this.getDescriptionView().val();
			if(description){
				item[COMPANY.DESCRIPTION_KEY] = description;
			}
			
			item[COMPANY.YHZH_KEY] = YHZH_LIST.getItems();
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({id: COMPANY.toId(item)});
			var entity = JSON.stringify(item);
			var data = {url: '/api/fundCompanyInformation', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/put", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.COMPANY_LIST;
				},
				error: function(response){
					me.response = response;
					if(LOGIN.error(response)){
						alert('提交失败，请补全带*号的必填信息.');
					}
				}
			});
		}
};

var PARTNER_LIST = {
		VIEW_ID: '#partner-view',
		TABLE_ID: '#view-table',
		ADD_ID: '#add-button',
		REMOVE_ID: '#remove-button',
		SAVE_ID: '#save-button',
		SHOW_ID: '#show-button',
		CLOSE_ID: '.ui-dialog-titlebar-close',
		COMPANY_ID: '#company',
		parent_id: 0,
		items: [],
		getView: function(){
			return $(this.VIEW_ID);
		},
		getTable: function(){
			var v = this.getView();
			if(v){
				return v.find(this.TABLE_ID);
			}
		},
		ini: function(){
			this.iniAddButton();
			this.iniRemoveButton();
			this.iniSaveButton();
		},
		show: function(){
			$(this.SHOW_ID).click();
		},
		close: function(){
			$(this.CLOSE_ID).click();
		},
		getAddButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.ADD_ID);
			}
		},
		iniAddButton: function(){
			var me = this;
			var button = this.getAddButton();
			if(button){
				button.click(function(){
					me.add();
				});
			}
		},
		getRemoveButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.REMOVE_ID);
			}
		},
		iniRemoveButton: function(){
			var me = this;
			var button = this.getRemoveButton();
			if(button){
				button.click(function(){
					me.remove();
				});
			}
		},
		getSaveButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.SAVE_ID);
			}
		},
		iniSaveButton: function(){
			var me = this;
			var button = this.getSaveButton();
			if(button){
				button.click(function(){
					me.save();
				});
			}
		},
		set: function(items){
			this.items = items;
			this.setTable(items);
			this.show();
		},
		setTable: function(items){
			var table = this.getTable();
			var trs = table.find('tr');
			if(trs && trs.length){
				for(var i=1; i<trs.length; i++){
					$(trs[i]).remove();
				}
			}
			
			if(items){
				for(var i in this.items){
					this.add(this.items[i]);
				}
			}
			
			for(var i=0; i<3; i++){
				this.add();
			}
		},
		add: function (item){
			var table = this.getTable();
			var tr = $('<tr></tr>');
			table.append(tr);
			
			var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var company_td = $('<td></td>');
			tr.append(company_td);
			var company_select = $('<select class="" id="company"></select>');
			company_td.append(company_select);
			var items = COMPANY.getItems();
			company_select.append('<option value=""></option>');
			var cid = PAGE.getParam(COMPANY.ID_KEY);
			for(var i in items){
				var o = items[i];
				var id = COMPANY.toId(o);
				var type = COMPANY.toType(o);
				type = COMPANY_TYPE.toItem(type);
				var value = COMPANY_TYPE.toValue(type);
				if(cid != id && value == COMPANY_TYPE.VALUE_GENNERAL){
					var name = COMPANY.toName(o);
					var option = $('<option value="' + id + '">' + name + '</option>');
					company_select.append(option);
				}
			}
			company_select.val(COMPANY.toId(item));
		},
		remove: function (){//删除选中行
			var table = this.getTable();
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
		save: function (){//确认
			var table = this.getTable();
			var trs = table.find('tr');
			
			var items = [];
			for(var i=1; i<trs.length; i++){
				var item = {};
				var tr = $(trs.get(i));
				var company = tr.find(this.COMPANY_ID).val();
				if(company){
					item[COMPANY.ID_KEY] = company;
				}
				
				if(company){
					items.push(item);
				}else{
					continue;
				}
			}
			COMPANY_FORM.item[COMPANY.PARTNER_KEY] = items;
			COMPANY_FORM.setPartner(COMPANY_FORM.item);
			
			var frdbs = [];
			for(var i in items){
				var company = COMPANY.toItem(items[i]);
				frdbs.push(COMPANY.toFRDB(company));
			}
			COMPANY_FORM.item[COMPANY.ASSIGNER_KEY] = frdbs;
			COMPANY_FORM.setAssigner(COMPANY_FORM.item);
			this.close();
		}
};

var YHZH_LIST = {//银行账户
		VIEW_ID: '#yhzh-view',
		TABLE_ID: '#view-table',
		ADD_ID: '#add-button',
		REMOVE_ID: '#remove-button',
		parent_id: 0,
		items: [],
		getView: function(){
			return $(this.VIEW_ID);
		},
		getTable: function(){
			var v = this.getView();
			if(v){
				return v.find(this.TABLE_ID);
			}
		},
		ini: function(){
			this.iniAddButton();
			this.iniRemoveButton();
		},
		getAddButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.ADD_ID);
			}
		},
		iniAddButton: function(){
			var me = this;
			var button = this.getAddButton();
			if(button){
				button.click(function(){
					me.add();
				});
			}
		},
		getRemoveButton: function(){
			var view = this.getView();
			if(view){
				return view.find(this.REMOVE_ID);
			}
		},
		iniRemoveButton: function(){
			var me = this;
			var button = this.getRemoveButton();
			if(button){
				button.click(function(){
					me.remove();
				});
			}
		},
		set: function(items){
			this.items = items;
			this.setTable(items);
		},
		setTable: function(items){
			var table = this.getTable();
			var trs = table.find('tr');
			if(trs && trs.length){
				for(var i=1; i<trs.length; i++){
					$(trs[i]).remove();
				}
			}
			
			if(items){
				for(var i in this.items){
					this.add(this.items[i]);
				}
			}
			
			for(var i=0; i<3; i++){
				this.add();
			}
		},
		add: function (item){
			var table = this.getTable();
			var tr = $('<tr></tr>');
			table.append(tr);
			
			var checkbox = $('<td><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox);
			
			var account_td = $('<td></td>');
			tr.append(account_td);
			var account_div = $('<div class="form-input col-md-12"></div>');
			account_td.append(account_div);
			var account_input = $('<input class=""></input>');
			account_div.append(account_input);
			account_input.attr('id', YHZH.ACCOUNT_KEY);
			account_input.val(YHZH.toAccount(item));
			
			var hm_td = $('<td></td>');
			tr.append(hm_td);
			var hm_div = $('<div class="form-input col-md-12"></div>');
			hm_td.append(hm_div);
			var hm_input = $('<input class=""></input>');
			hm_div.append(hm_input);
			hm_input.attr('id', YHZH.HM_KEY);
			hm_input.val(YHZH.toHM(item));
			
			var yhmc_td = $('<td></td>');
			tr.append(yhmc_td);
			var yhmc_div = $('<div class="form-input col-md-12"></div>');
			yhmc_td.append(yhmc_div);
			var yhmc_input = $('<input class=""></input>');
			yhmc_div.append(yhmc_input);
			yhmc_input.attr('id', YHZH.YHMC_KEY);
			yhmc_input.val(YHZH.toYHMC(item));
			
			var khh_td = $('<td></td>');
			tr.append(khh_td);
			var khh_div = $('<div class="form-input col-md-12"></div>');
			khh_td.append(khh_div);
			var khh_input = $('<input class=""></input>');
			khh_div.append(khh_input);
			khh_input.attr('id', YHZH.KHH_KEY);
			khh_input.val(YHZH.toKHH(item));
			
			var isdefault_td = $('<td></td>');
			tr.append(isdefault_td);
			var isdefault_input = $('<input type="checkbox"></input>');
			isdefault_td.append(isdefault_input);
			isdefault_input.attr('id', YHZH.ISDEFAULT_KEY);
			isdefault_input[0]['checked']=YHZH.toIsDefault(item);
			
			var purpose_td = $('<td></td>');
			tr.append(purpose_td);
			var purpose_select = $('<select class=""></select>');
			purpose_select.attr('id', YHZH.PURPOSE_KEY);
			purpose_td.append(purpose_select);
			var items = YHZH_PURPOSE.getItems();
			purpose_select.append('<option value=""></option>');
			for(var i in items){
				var o = items[i];
				var id = YHZH_PURPOSE.toId(o);
				var name = YHZH_PURPOSE.toName(o);
				var option = $('<option value="' + id + '">' + name + '</option>');
				purpose_select.append(option);
			}
			var purpose = YHZH.toPurpose(item);
			purpose_select.val(YHZH_PURPOSE.toId(purpose));
		},
		remove: function (){//删除选中行
			var table = this.getTable();
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
		getItems: function(){
			var me = this;
			var table = me.getTable();
			var trs = table.find('tr');
			
			var items = [];
			for(var i=1; i<trs.length; i++){
				var item = {};
				var tr = $(trs.get(i));
				var account = tr.find('#' + YHZH.ACCOUNT_KEY).val();
				if(account){
					item[YHZH.ACCOUNT_KEY] = account;
				}
				
				var hm = tr.find('#' + YHZH.HM_KEY).val();
				if(hm){
					item[YHZH.HM_KEY] = hm;
				}
				
				var yhmc = tr.find('#' + YHZH.YHMC_KEY).val();
				if(yhmc){
					item[YHZH.YHMC_KEY] = yhmc;
				}
				
				var khh = tr.find('#' + YHZH.KHH_KEY).val();
				if(khh){
					item[YHZH.KHH_KEY] = khh;
				}
				
				var purpose = tr.find('#' + YHZH.PURPOSE_KEY).val();
				if(purpose){
					item[YHZH.PURPOSE_KEY] = {id: purpose};
				}
				
				if(JSON.stringify(item) != '{}'){
					var isdefault = tr.find('#' + YHZH.ISDEFAULT_KEY);
					item[YHZH.ISDEFAULT_KEY] = isdefault[0]['checked'];
					items.push(item);
				}
			}
			return items;
		}
};

