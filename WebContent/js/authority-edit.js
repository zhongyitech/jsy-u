(function($){
	var roleId=$.utils.getParam("id");
	$.project.domain(true,roleId,"com.jsy.auth.Role").success(function(item){
		item=item.length&&item[0]||{};
		avalon.define("baseInfo",function(vm){
			vm.name=item.name;
			vm.authority=item.authority;
		});
	});
	var request=function(options){
		return $.io.get({url:options.url,params: $.extend(true,{},{id: roleId},options.params)});
	};
	/**
	 * 操作权限、字段权限
	 * @type {{submit: Function, processData: Function, render: Function}}
	 */
	var RoleList={
		submit:function(resourceId,data){
			var _this=this;
			if(_this.hasChange){
				var entity={props:[],ops:[]};
				$.each(data,function(){
					if(this.id==resourceId){
						$.each(this.props,function(){
							if(this.checked){
								entity.props.push({
									id:this.id
								})
							}
						});
						$.each(this.ops,function(){
							if(this.checked){
								entity.ops.push({
									id:this.id
								})
							}
						});
					}
				});
				$.io.post({url:"/api/resourceRole/updateRoleList",params:{id:roleId,resourceId:resourceId},entity:entity}).success(function(){
					$.message.log("保存成功！");
					_this.hasChange=false;
				}).error(function(){
					$.message.error("保存出错！");
				});
			}else{
				$.message.log("没有变更，无需提交");
				_this.hasChange=JSON.stringify(data)!=JSON.stringify(_this.clean.data);
			}
		},
		processData:function(data){
			var _this=this,mapping={};
			_this.clean= $.extend(true,{},{data:data});
			$.each(data,function(i,item){
				item.close=false;
				mapping[item.id]=i;
			});
			var model=avalon.define({
				$id: "Role",
				items: data,
				submit:function(resourceId){
					_this.submit(resourceId,data);
				},
				change:function(){
					setTimeout(function(){
						_this.hasChange=JSON.stringify(data)!=JSON.stringify(_this.clean.data);
					},300);
				},
				toggle:function(id){
					var items=model.items,index=mapping[id],item=items[index];
					item.close=!item.close;
				}
			});
		},
		render:function(){
			var _this=this;
			request({
				url:"/api/resourceRole/getRoleList"
			}).success(function(data){
				_this.processData(data);
			});
		}
	};
	/**
	 * 菜单权限
	 * @type {{submit: Function, cacheMap: Function, processData: Function, render: Function}}
	 */
	var MenuRole={
		submit:function(data){
			var _this=this;
			if(_this.hasChange){
				var entity=[];
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
					_this.hasChange=false;
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
				items: data,
				submit:function(){
					_this.submit(data);
				},
				change:function(id,childId){
					var item=model.items[_this.mapping[id]],checked=false;
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
					_this.hasChange=JSON.stringify(data)!= JSON.stringify(_this.clean.data);
				}
			});
		},
		render:function(){
			var _this=this;
			request({url:"/api/menusRole/getMenuList"}).success(function(data){
				_this.cacheMap(data);
				_this.processData(data);
			});
		}
	};
	RoleList.render();
	MenuRole.render();
})(jQuery);