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
			this.getEnabledView().val('' + USER.toEnabled(item));
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
				for(var i=0;i<items.length;i++){
					var item = items[i];
					var id = DEPARTMENT.toId(item);
					var name = DEPARTMENT.toName(item);
					var option = $('<option value="' + id + '">' + name + '</option>');
					view.append(option);
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
			this.getYHZHView().val(USER.toYHZH(item));
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
			
			var user = LOGIN.getUser();
			if(user){
				this.set(user);
			}
		},
		set: function(item){
			this.item = item;
			
			this.setAccount(item);
			this.setName(item);
			this.setEnabled(item);
			this.setDepartment(item);
			this.setSKR(item);
			this.setKHH(item);
			this.setYHZH(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			
			var password = this.getPasswordView().val();
			if(password){
				item[USER.PASSWORD_KEY] = password;
			}
			
			return item;
		},
		submit: function(){//提交
			var me = this;
			var params = JSON.stringify({id: me.item[USER.ID_KEY]});
			var item = me.getItem();
			var entity = JSON.stringify(item);
			var data = {url: '/api/user/updatePassword', params: params, entity: entity};
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

