(function($){
	var roleId=$.utils.getParam("id");
	var request=function(readURL){
		return $.io.get({url:readURL,params:{id: roleId}});
	};
	var BaseInfo={
		render:function(){
			$.project.domain(true,roleId,"com.jsy.auth.Role").success(function(item){
				item=item.length&&item[0];
				avalon.define("baseInfo",function(vm){
					vm.name=item.name;
					vm.authority=item.authority;
				});
			});
		}
	};
	var FundRole={
		submit:function(data){
		},
		processData:function(data){
			var _this=this;
			avalon.define({
				$id: "fundRole",
				items: data,
				submit:function(){
					_this.submit(data);
				}
			});
		},
		render:function(){
			var _this=this;
			request("/api/menusRole/getMenuList").success(function(data){
				_this.processData([
					{id:1,title:"操作权限",children:[
						{id:11,title:"新增"},
						{id:12,title:"删除"},
						{id:13,title:"修改"},
						{id:14,title:"查看"}
					]},
					{id:2,title:"字段权限",children:[
						{id:21,title:"编号"},
						{id:22,title:"基金名称"},
						{id:23,title:"预募规模"},
						{id:24,title:"实募金额"},
						{id:25,title:"季付募集规模"},
						{id:26,title:"季付实募"},
						{id:27,title:"半年付募集规模"},
						{id:28,title:"半年付实募"},
						{id:29,title:"年付募集规模"},
						{id:30,title:"年付实募"},
						{id:31,title:"状态"}
					]}
				]);
			});
		}
	};
	var InvestmentRole={
		submit:function(data){
		},
		processData:function(data){
			var _this=this;
			avalon.define({
				$id: "investmentRole",
				items: data,
				submit:function(){
					_this.submit(data);
				}
			});
		},
		render:function(){
			var _this=this;
			request("/api/menusRole/getMenuList").success(function(data){
				_this.processData([
					{id:1,title:"操作权限",children:[
						{id:11,title:"新增"},
						{id:12,title:"删除"},
						{id:13,title:"修改"},
						{id:14,title:"查看"},
						{id:15,title:"打印"}
					]},
					{id:2,title:"字段权限",children:[
						{id:21,title:"档案编号"},
						{id:22,title:"合同编号"},
						{id:23,title:"基金名称"},
						{id:24,title:"认购人"},
						{id:25,title:"认购日期"},
						{id:26,title:"认购金额"},
						{id:27,title:"认购期限"},
						{id:28,title:"理财经理"},
						{id:29,title:"地区"},
						{id:30,title:"年化收益率"},
						{id:31,title:"付息方式"},
						{id:31,title:"到期日期"},
						{id:31,title:"已付利息"},
						{id:31,title:"已付本金"}
					]}
				]);
			});
		}
	};
	var CustomerRole={
		submit:function(data){
		},
		processData:function(data){
			var _this=this;
			avalon.define({
				$id: "customerRole",
				items: data,
				submit:function(){
					_this.submit(data);
				}
			});
		},
		render:function(){
			var _this=this;
			request("/api/menusRole/getMenuList").success(function(data){
				_this.processData([
					{id:1,title:"操作权限",children:[
						{id:11,title:"新增"},
						{id:12,title:"删除"},
						{id:13,title:"修改"},
						{id:14,title:"查看"},
						{id:15,title:"打印"}
					]},
					{id:2,title:"字段权限",children:[
						{id:21,title:"档案编号"},
						{id:22,title:"合同编号"},
						{id:23,title:"基金名称"},
						{id:24,title:"认购人"},
						{id:25,title:"认购日期"},
						{id:26,title:"认购金额"},
						{id:27,title:"认购期限"},
						{id:28,title:"理财经理"},
						{id:29,title:"地区"},
						{id:30,title:"年化收益率"},
						{id:31,title:"付息方式"},
						{id:31,title:"到期日期"},
						{id:31,title:"已付利息"},
						{id:31,title:"已付本金"}
					]}
				]);
			});
		}
	};
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
			request("/api/menusRole/getMenuList").success(function(data){
				_this.cacheMap(data);
				_this.processData(data);
			});
		}
	};
	BaseInfo.render();
	FundRole.render();
	CustomerRole.render();
	InvestmentRole.render();
	MenuRole.render();
})(jQuery);