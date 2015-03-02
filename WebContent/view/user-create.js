//数据加载、按钮点击事件等
$(document).ready(function(){
	USER_FORM.ini(true);
});

//用户信息表单
var USER_FORM={
		VIEW_ID: '#user-view',
		FORM_ID: '#user-form',
		SUBMIT_ID: '#submit-button',
		ACCOUNT_ID: '#account',
		PASSWORD_ID: '#password',
		ENABLED_ID: '#enabled',
		NAME_ID: '#name',
		DEPARTMENT_ID: '#department',
		SKR_ID: '#skr',
		KHH_ID: '#khh',
		YHZH_ID: '#yhzh',
		item: {},
		getView: function(){
			return $(this.VIEW_ID);
		},
		getForm: function(){
			var view = this.getView();
			if(view){
				return view.find(this.FORM_ID);
			}
		},
		getAccountView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ACCOUNT_ID);
			}
		},
		setAccount: function(item){
			this.getAccountView().val(USER.toAccount(item));
		},
		getPasswordView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.PASSWORD_ID);
			}
		},
		getEnabledView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.ENABLED_ID);
			}
		},
		setEnabled: function(item){
			this.getEnabledView().val(USER.toEnabled(item));
		},
		getNameView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.NAME_ID);
			}
		},
		setName: function(item){
			this.getNameView().val(USER.toName(item));
		},
		getDepartmentView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.DEPARTMENT_ID);
			}
		},
		iniDepartmentView: function(item){
			var view = this.getDepartmentView();
			if(view){
				var items = DEPARTMENT.getItems();
				var option = $('<option value=""></option>');
				view.append(option);
				
				var companies = {};
				for(var i in items){
					var item = items[i];
					var company = DEPARTMENT.toCompany(item);
					var cid = COMPANY.toId(company);
					if(!companies[cid]){
						companies[cid] = [];
					}
					
					companies[cid].push(item);
				}
				
				for(var i in companies){
					var group = $('<optgroup></optgroup>');
					var company = COMPANY.get(i);
					var name = COMPANY.toName(company);
					group.attr('label', name);
					view.append(group);
					
					var children = companies[i];
					for(var j in children){
						var item = children[j];
						var id = DEPARTMENT.toId(item);
						var name = DEPARTMENT.toName(item);
						var option = $('<option value="' + id + '"></option>');
						view.append(option);
						var span = $('<span class="indent-2">&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</span>');
						option.append(span);
					}
				}
			}
		},
		setDepartment: function(item){
			this.getDepartmentView().val(DEPARTMENT.toId(USER.toDepartment(item)));
		},
		getSKRView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.SKR_ID);
			}
		},
		setSKR: function(item){
			this.getSKRView().val(USER.toSKR(item));
		},
		getKHHView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.KHH_ID);
			}
		},
		setKHH: function(item){
			this.getKHHView().val(USER.toKHH(item));
		},
		getYHZHView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.YHZH_ID);
			}
		},
		setYHZH: function(item){
			this.getYHZHView().val(USER.toSKR(item));
		},
		getRoleButton: function(){
			var view = this.getForm();
			if(view){
				return view.find('#role-button');
			}
		},
		iniRoleButton: function(){
			var view = this.getRoleButton();
			if(view){
				view.click(function(){
					ROLE_DIALOG.show();
				});
			}
		},
		getRoleInput: function(){
			var view = this.getForm();
			if(view){
				return view.find('#role-input');
			}
		},
		setRole: function(item){
			var v = [];
			var items = USER.toRole(item);
			if(items){
				for(var i=0; i<items.length; i++){
					var o = ROLE.toItem(items[i]);
					v.push(ROLE.toName(o))
				}
			}
			var view = this.getRoleInput();
			view.val(v);
			
			ROLE_DIALOG.set(items);
		},
		getMenu: function(){
			var view = this.getView();
			if(view){
				return view.find('#menu');
			}
		},
		getMenuRole: function(){
			var view = this.getMenu();
			if(view){
				return view.find('#role-dialog-button');
			}
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
			
			this.iniSubmitButton();
			this.iniDepartmentView();
			this.iniRoleButton();
			ROLE_DIALOG.ini();
			
			var id = PAGE.getParam(COMPANY.ID_KEY);
			var item = USER.get(id);
			if(item){
				this.set(item);
			}else{
				this.set({});
			}
		},
		set: function(item){
			this.item = item;
			
			this.setAccount(item);
			this.setName(item);
			this.setDepartment(item);
			this.setSKR(item);
			this.setYHZH(item);
			this.setRole(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			var account = this.getAccountView().val();
			if(account){
				item[USER.ACCOUNT_KEY] = account;
			}
			
			var password = this.getPasswordView().val();
			if(password){
				item[USER.PASSWORD_KEY] = password;
			}
			
			var enabled = this.getEnabledView().val();
			if(enabled){
				item[USER.ENABLED_KEY] = enabled;
			}
			
			var name = this.getNameView().val();
			if(name){
				item[USER.NAME_KEY] = name;
			}
			
			var department = this.getDepartmentView().val();
			if(department){
				item[USER.DEPARTMENT_KEY] = {id: department};
			}
			
			var skr = this.getSKRView().val();
			if(skr){
				item[USER.SKR_KEY] = skr;
			}
			
			var khh = this.getKHHView().val();
			if(khh){
				item[USER.KHH_KEY] = khh;
			}
			
			var yhzh = this.getYHZHView().val();
			if(yhzh){
				item[USER.YHZH_KEY] = yhzh;
			}
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({});
			var entity = JSON.stringify(item);
			var data = {url: '/api/user', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.USER_LIST;
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

//角色列表对话框
var ROLE_DIALOG = {
		VIEW_ID: '#role-view',
		TABLE_ID: '#view-table',
		ADD_ID: '#add-button',
		REMOVE_ID: '#remove-button',
		SAVE_ID: '#save-button',
		CLOSE_ID: '.ui-dialog-titlebar-close',
		ROLE_ID: '#role',
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
			$(USER_FORM.getMenuRole()).click();
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
			
			var td = $('<td></td>');
			tr.append(td);
			var select = $('<select class="" id="role"></select>');
			td.append(select);
			var items = ROLE.getItems();
			select.append('<option value=""></option>');
			for(var i in items){
				var o = items[i];
				var id = ROLE.toId(o);
				var name = ROLE.toName(o);
				var option = $('<option value="' + id + '">' + name + '</option>');
				select.append(option);
			}
			select.val(ROLE.toId(item));
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
				var role = tr.find(this.ROLE_ID).val();
				if(role){
					item[ROLE.ID_KEY] = role;
				}
				
				if(role){
					items.push(item);
				}else{
					continue;
				}
			}
			USER_FORM.item[USER.ROLE_KEY] = items;
			USER_FORM.setRole(USER_FORM.item);
			this.close();
		}
};