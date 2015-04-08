//数据加载、按钮点击事件等
$(document).ready(function(){
	ROLE_FORM.ini(true);
});

//角色信息表单
var ROLE_FORM={
		item: {},
		getView: function(){
			return $('#role-view');
		},
		getMenu: function(){
			var view = this.getView();
			if(view){
				return view.find('#menu');
			}
		},
		getForm: function(){
			var view = this.getView();
			if(view){
				return view.find('#view-form');
			}
		},
		getNameInput: function(){
			var form = this.getForm();
			if(form){
				return form.find('#name-input');
			}
		},
		setName: function(item){
			this.getNameInput().val(ROLE.toName(item));
		},
		getAuthorityInput: function(){
			var form = this.getForm();
			if(form){
				return form.find('#authority-input');
			}
		},
		setAuthority: function(item){
			this.getAuthorityInput().val(ROLE.toAuthority(item));
		},
		getSubmitButton: function(){
			var view = this.getView();
			if(view){
				return view.find('#submit-button');
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
			
			var id = PAGE.getParam(ROLE.ID_KEY);
			var item = ROLE.get(id);
			if(item){
				this.set(item);
			}else{
				this.set({});
			}
		},
		set: function(item){
			this.item = item;
			
			this.setName(item);
			this.setAuthority(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			
			var name = this.getNameInput().val();
			if(name){
				item[ROLE.NAME_KEY] = name;
			}
			
			var authority = this.getAuthorityInput().val();
			if(authority){
				item[ROLE.AUTHORITY_KEY] = authority;
			}
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({id: ROLE.toId(item)});
			var entity = JSON.stringify(item);
			var data = {url: '/api/role', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.ROLE_LIST;
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

//基金权限表单
var FUND_FORM={
		item: {},
		getView: function(){
			return $('#fund-view');
		},
		getMenu: function(){
			var view = this.getView();
			if(view){
				return view.find('#menu');
			}
		},
		getForm: function(){
			var view = this.getView();
			if(view){
				return view.find('#view-form');
			}
		},
		getCreateInput: function(){
			var form = this.getForm();
			if(form){
				return form.find('#create-input');
			}
		},
		setCreate: function(item){
			this.getCreateInput().val(ROLE.toName(item));
		},
		getAuthorityInput: function(){
			var form = this.getForm();
			if(form){
				return form.find('#authority-input');
			}
		},
		setAuthority: function(item){
			this.getAuthorityInput().val(ROLE.toAuthority(item));
		},
		getSubmitButton: function(){
			var view = this.getView();
			if(view){
				return view.find('#submit-button');
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
			
			var id = PAGE.getParam(ROLE.ID_KEY);
			var item = ROLE.get(id);
			if(item){
				this.set(item);
			}else{
				this.set({});
			}
		},
		set: function(item){
			this.item = item;
			
			this.setName(item);
			this.setAuthority(item);
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			
			var name = this.getNameInput().val();
			if(name){
				item[ROLE.NAME_KEY] = name;
			}
			
			var authority = this.getAuthorityInput().val();
			if(authority){
				item[ROLE.AUTHORITY_KEY] = authority;
			}
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({id: ROLE.toId(item)});
			var entity = JSON.stringify(item);
			var data = {url: '/api/role', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.ROLE_LIST;
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


(function($){
	$("#menu-role-inner").renderData("#menu-role-template", $.io.get(true,{url:"/api/menusRole/getMenuList",params:{id: $.utils.getParam("id")}}).data());
	$.dom.checkbox(".form-label input",".form-row",true)
})(jQuery);