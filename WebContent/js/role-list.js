//数据加载、按钮点击事件等
$(document).ready(function(){
	ROLE_LIST.ini(true);
});

//角色列表
var ROLE_LIST ={
		page_start: 0,
		page_size: 10,
		page_total: 1,
		pages_select: 1,
		pages_size: 31,
		VIEW_ID: '#role-list',
		TABLE_ID: '#view-table',
		PAGES_LIST_ID: '#page-list',
		PAGES_FIRST_ID: '#page-first',
		PAGES_LAST_ID: '#page-last',
		KEYWORD_INPUT_ID : '#keyword-input',
		KEYWORD_BUTTON_ID : '#keyword-button',
		REMOVE_ID : '#remove-button',
		filter_keyword: '',
		tr_key: 'tr_key',
		tr_value: 0,
		items: [],
		getView: function(){
			return $(this.VIEW_ID);
		},
		getTable: function(){
			return this.getView().find(this.TABLE_ID);
		},
		ini: function(async){
			if(!async){
				async = false;
			}
			
			var me = this;
			this.getView().find(this.KEYWORD_BUTTON_ID).click(function(){
                me.page_start=0;
                me.set(true);
			});
			
			this.getView().find(this.KEYWORD_INPUT_ID).keyup(function(e){
				if(e.keyCode == 13){
                    me.page_start=0;
                    me.set(true);
				}
			});

			this.getView().find(this.REMOVE_ID).click(function(){
				me.remove();
			});


            $("#role_add").click(function(){

                var item ={
                    name:$("#newRole_name").val()
                };

                if(item.name==""){
                    $("#newRole_name").addClass("valid_error");
                    return;
                }else{
                    $("#newRole_name").removeClass("valid_error");
                }
                var entity = item;
                var data = {url: '/api/role',entity: entity};

                $.io.post(data)
                    .success(function(result){
                        $("#newRole_name").removeClass("valid_error");
//                        window.location = PAGE.ROLE_LIST;
                        me.set();
                    })
                    .error(function(error){
                        alert("添加角色出错了!"+error.msg);
                        $("#newRole_name").addClass("valid_error");
                    });
            });
			
			this.set(async);
		},
		set: function(async){
			var me = this;
			
			if(!async){
				async = false;
			}
			
			var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
			this.filter_keyword = keyword_input.val();
			
			var entity = JSON.stringify({
				startposition: me.page_start,
				pagesize: me.page_size,
				keyword: this.filter_keyword
			});
			var params = JSON.stringify({});
			var data = {url: '/api/role/readAllForPage', params: params, entity: entity};


            $.io.post(data).success(function(result,page){
                me.response=result;
                me.setView(result,page);

            });
		},
		setView: function(result,page){
			this.setPage(page);
			this.setTable(result);
		},
		setPage: function(response){//设置页数选择列表
            var _this=this;
            _this.page_start==0&& $.dom.pager("#table-pager",response).onChange(function (param) {
                _this.page_size=param.pagesize;
                _this.page_start=param.startposition;
                _this.set(true);
            });
		},
		setTable: function (result){
			this.items = result
			var table = this.getView().find(this.TABLE_ID);
            table.find("tbody").empty();
			var items = this.items;
            this.tr_value=0;
			if(items){
				for(var i=0; i<items.length; i++){
					this.add(items[i]);
				}
			}
		},
		add: function (item){//table增加一行
            if(!item) return;
			var key = this.tr_value++;
			var table = this.getTable();
			
			var tr = $('<tr></tr>');
			tr.attr(this.tr_key, key);
			table.append(tr);
			
			var checkbox_td = $('<td class="text-center"><input type="checkbox" name="checkbox"></td>');
			tr.append(checkbox_td);
			
			var name = ROLE.toName(item);
			var name_td = $('<td class="text-center"></td>');
			tr.append(name_td);
			if(name){
				var url = PAGE.ROLE_EDIT + '?' + ROLE.ID_KEY + '=' + ROLE.toId(item);
				var name_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + name + '">' + name + '</a>');
				name_td.append(name_a);
			}else{
				name_td.append($('<span class="span-12"></span>')); 
			}

            tr.append('<td></td>');
		},
		remove: function(){//删除选中行
			var table = this.getTable();
			var trs = table.find('tr');
			for(var i=1; i<trs.length; i++){
				var tr = $(trs.get(i));
				var checkbox = tr.find('input[name=checkbox]');
				if(checkbox.length > 0){
					if(checkbox.get(0)['checked']){
						var key = tr.attr(this.tr_key);
						this.submit(this.items[key]);
					}
				}
			}
		},
		submit: function(item){
			var me = this;
			var params = JSON.stringify({id: DEPARTMENT.toId(item)});
			var data = {url: '/api/role', params: params};


            $.io.del(data).success(function(result){
               me.set();
            }).error(function(e){
                alert(e.msg);
            });

//			$.ajax({
//				type: "post",
//				url: "../rest/item/delete",
//				async: true,
//				data: data,
//				dataType: "json",
//				success: function(response){
//					me.response = response;
//					me.set(true);
//				},
//				error: function(response){
//					me.response = response;
//					LOGIN.error(response);
//				}
//			});
		}
};

