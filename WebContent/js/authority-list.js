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
			
			this.set(async);
		},
		set: function(async){
			var me = this;
			var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
			this.filter_keyword = keyword_input.val();
			var data = {url: '/api/role/readAllForPage', params: {}, entity: {
				startposition: me.page_start,
				pagesize: me.page_size,
				keyword: this.filter_keyword
			}};
			$.io.post(data).success(function(result,pager){
				me.setPage(pager);
				me.setTable(result);
			});
		},
		setPage: function(response){//设置页数选择列表
			var _this=this;
            _this.page_start==0&& $.dom.pager("#table-pager",response).onChange(function (param) {
                _this.page_size=param.pagesize;
                _this.page_start=param.startposition;
                _this.set(true);
            });
		},
		setTable: function (response){
			var table = this.getView().find(this.TABLE_ID);
			table.find('tbody').empty();
			if(response){
				for(var i=0; i<response.length; i++){
					this.add(response[i]);
				}
			}
		},
		add: function (item){//table增加一行
			var key = this.tr_value++;
			var table = this.getTable();
			
			var tr = $('<tr></tr>');
			tr.attr(this.tr_key, key);
			table.append(tr);
			
			var name = ROLE.toName(item);
			var name_td = $('<td class="text-center"></td>');
			tr.append(name_td);
			if(name){
				var url = PAGE.AUTHORITY_EDIT + '?' + ROLE.ID_KEY + '=' + ROLE.toId(item);
				var name_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + name + '">' + name + '</a>');
				name_td.append(name_a);
			}else{
				name_td.append($('<span class="span-12"></span>')); 
			}
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
			var data = {url: '/api/role/delete', params: {id: DEPARTMENT.toId(item)}, entity: {}};
			$.io.del(data).success(function(){
				me.set();
			});
		}
};

