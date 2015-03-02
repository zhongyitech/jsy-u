//数据加载、按钮点击事件等
$(document).ready(function(){
	DEPARTMENT_FORM.ini(true);
});

//部门信息表单
var DEPARTMENT_FORM={
		VIEW_ID: '#department-view',
		FORM_ID: '#department-form',
		SUBMIT_ID: '#submit-button',
		NAME_ID: '#name',
		COMPANY_ID: '#company',
		DESCRIPTION_ID: '#description',
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
		getNameView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.NAME_ID);
			}
		},
		getCompanyView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.COMPANY_ID);
			}
		},
		iniCompanyView: function(item){
			var view = this.getCompanyView();
			if(view){
				var items = COMPANY.getItems();
				var option = $('<option value=""></option>');
				view.append(option);
				for(var i in items){
					var item = items[i];
					var id = COMPANY.toId(item);
					var name = COMPANY.toName(item);
					var option = $('<option value="' + id + '">' + name + '</option>');
					view.append(option);
				}
			}
		},
		getDescriptionView: function(){
			var form = this.getForm();
			if(form){
				return form.find(this.DESCRIPTION_ID);
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
			
			this.iniCompanyView();
			
			this.iniSubmitButton();
		},
		getItem: function(){
			var me = this;
			var item = me.item;
			
			var name = this.getNameView().val();
			if(name){
				item[DEPARTMENT.NAME_KEY] = name;
			}
			
			var company = this.getCompanyView().val();
			if(company){
				item[DEPARTMENT.COMPANY_KEY] = {id: company};
			}
			
			var description = this.getDescriptionView().val();
			if(description){
				item[DEPARTMENT.DESCRIPTION_KEY] = description;
			}
			
			me.item = item;
			return item;
		},
		submit: function(){//提交
			var me = this;
			var item = me.getItem();
			var params = JSON.stringify({});
			var entity = JSON.stringify(item);
			var data = {url: '/api/department', params: params, entity: entity};
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					window.location = PAGE.DEPARTMENT_LIST;
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

