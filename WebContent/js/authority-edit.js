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
	var MenuRole={
		id:$.utils.getParam("id"),
		request:function(){
			return $.io.get({url:"/api/menusRole/getMenuList",params:{id: this.id}})
		},
		submit:function(data){
			if($.md5(data)!= $.md5(this.clean.data)){
				var entity=[],roleId=this.id;
				$.each(data,function(idx,item){
					item.checked&&entity.push({
						menus:{id:item.id},
						role:{id:roleId}
					});
					$.each(item.children,function(i,v){
						v.checked&&entity.push({
							menus:{id:v.id},
							role:{id:roleId}
						});
					});
				});
				$.io.post({url:"/api/menusRole/updateMenuRole",params:{id:roleId},entity:entity}).success(function(){
					$.message.log("保存成功！");
				}).error(function(){
					$.message.log("保存出错！");
				});
			}else{
				$.message.log("没有变更，无需提交");
			}
		},
		cacheMap:function(data){
			var _this=this;
			_this.mapping={};
			_this.clean= $.extend(true,{},{data:data});
			$.each(data,function(i){
				_this.mapping[this.id]=i;
			});
		},
		processData:function(data){
			var _this=this;
			var model=avalon.define({
				$id: "menuRole",
				menu_items: data,
				submit:function(){
					_this.submit(data);
				},
				change:function(id,childId){
					var item=model.menu_items[_this.mapping[id]],checked=false;
					if(childId){
						$.each(item.children,function(idx,val){
							if(val.id==childId) val.checked=!val.checked;
							if(val.checked) checked=true;
						});
					}else{
						checked=!item.checked;
						$.each(item.children,function(idx,val){
							val.checked=checked;
						});
					}
					item.checked=checked;
				}
			});
		},
		render:function(){
			var _this=this;
			_this.request().success(function(data){
				_this.cacheMap(data);
				_this.processData(data);
			});
		}
	};
	MenuRole.render();
})(jQuery);