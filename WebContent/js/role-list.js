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
				me.selectFirst();
			});
			
			this.getView().find(this.KEYWORD_INPUT_ID).keyup(function(e){
				if(e.which == 13){
					me.selectFirst();
				}
			});
			
			this.getView().find(this.PAGES_FIRST_ID).click(function(){
				me.selectFirst();
			});
			
			this.getView().find(this.PAGES_LAST_ID).click(function(){
				me.selectLast();
			});
			
			this.getView().find(this.REMOVE_ID).click(function(){
				me.remove();
			});
			
			this.set(async);
		},
		set: function(async){
			var me = this;
			
			if(!async){
				async = false;
			}
			
			this.page_start = (this.pages_select - 1) * this.page_size;
			
			var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
			this.filter_keyword = keyword_input.val();
			
			var entity = JSON.stringify({
				startposition: me.page_start,
				pagesize: me.page_size,
				keyword: this.filter_keyword
			});
			var params = JSON.stringify({});
			var data = {url: '/api/role/readAllForPage', params: params, entity: entity};
			
			$.ajax({ 
				type: "post", 
				url: "../rest/item/post", 
				async: async,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					me.setView(response);
				},
				error: function(response){
					me.response = response;
					me.setView(response);
					LOGIN.error(response);
				}
			});
		},
		setView: function(response){
			this.setPage(response);
			this.setTable(response);
		},
		setPage: function(response){//设置页数选择列表
			var total = response[REST.TOTAL_KEY];
			this.page_total = total;
			
			var pages_div = this.getView().find(this.PAGES_LIST_ID);
			var pages = pages_div.find("a");
			if(pages.length){
				for(var i=0; i<pages.length; i++){
					$(pages[i]).remove();
				}
			}
			
			var pages_from = this.pages_select - 16;
			if(pages_from<1){
				pages_from = 1;
			}
			var pages_to = pages_from + this.pages_size;
			var pages_total =  Math.ceil(total/this.page_size);
			
			var me = this;
			for(var i=pages_from; i<pages_to && i<=pages_total; i++){
				var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
				if(i == this.pages_select){
					page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
				}
				pages_div.append(page_number);
				page_number.append(i);
				page_number.click(function(e){me.selectPage(e);});
			}
		},
		selectPage: function(e){
			this.pages_select = $(e.currentTarget).text();
			this.set(true);
		},
		selectFirst: function(){
			this.pages_select = 1;
			this.set(true);
		},
		selectLast: function(){
			this.pages_select = Math.ceil(this.page_total/this.page_size);
			this.set(true);
		},
		setTable: function (response){
			var s = response[REST.RESULT_KEY];
			if(s){
				this.items = JSON.parse(s);
			}else{
				s = [];
			}
			
			var table = this.getView().find(this.TABLE_ID);
			var trs = table.find('tr');
			if(trs && trs.length){
				for(var i=1; i<trs.length; i++){
					$(trs[i]).remove();
				}
			}
			
			var items = this.items;
			if(items){
				for(var i=0; i<items.length || i<this.page_size; i++){
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
			var entity = JSON.stringify({});
			var params = JSON.stringify({id: DEPARTMENT.toId(item)});
			var data = {url: '/api/role/delete', params: params, entity: entity};
			
			$.ajax({ 
				type: "post", 
				url: "../rest/item/delete", 
				async: true,
				data: data,
				dataType: "json",
				success: function(response){
					me.response = response;
					me.set(true);
				},
				error: function(response){
					me.response = response;
					LOGIN.error(response);
				}
			});
		}
};

