//数据加载、按钮点击事件等
$(document).ready(function(){
	TASK_LIST.ini(true);
});

//待办事项列表
var TASK_LIST ={
		page_start: 0,
		page_size: 10,
		page_total: 1,
		pages_select: 1,
		pages_size: 31,
		PARENT_ID: '#page-content',
		VIEW_ID: '#task-list',
		TABLE_ID: '#view-table',
		PAGES_LIST_ID: '#page-list',
		PAGES_FIRST_ID: '#page-first',
		PAGES_LAST_ID: '#page-last',
		KEYWORD_BUTTON_ID : '#keyword-button',
		KEYWORD_INPUT_ID : '#keyword-input',
		filter_keyword: '',
		tr_key: 'tr_key',
		tr_value: 0,
		items: [],
		getView: function(){
			return $(this.PARENT_ID).find(this.VIEW_ID);
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
			var data = {url: '/api/toDoTask/getTodo', params: params, entity: entity};
			
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
			this.items = JSON.parse(response[REST.RESULT_KEY]);
			
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
			var key = this.tr_value++;
			var table = this.getTable();
			
			var tr = $('<tr key="' + key + '"></tr>');
			table.append(tr);
			
			var ssmk = TASK.toSSMK(item);
			var ssmk_td = $('<td class="text-center"></td>');
			tr.append(ssmk_td);
			if(ssmk){
				var url = TASK.toURL(item);
				var ssmk_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + ssmk + '">' + ssmk + '</a>');
				ssmk_td.append(ssmk_a);
			}else{
				ssmk_td.append($('<span class="span-12"></span>'));
			}
			
			var cjsj = TASK.toCJSJ(item);
			var cjsj_td = $('<td class="text-center"><span class="text-overflow" title="' + cjsj + '">' + cjsj + '</span></td>');
			tr.append(cjsj_td);
			
			var clr = TASK.toCLR(item);
			var clr_td = $('<td class="text-center"><span class="text-overflow" title="' + clr + '">' + clr + '</span></td>');
			tr.append(clr_td);
			
			var url = TASK.toURL(item);
			var url_td = $('<td class="text-center"></td>');
			tr.append(url_td);
			if(url){
				var url_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + url + '">' + url + '</a>');
				url_td.append(url_a);
			}
			
			var status = TASK.toStatus(item);
			var status_td = $('<td class="text-center"><span class="text-overflow" title="' + status + '">' + status + '</span></td>');
			tr.append(status_td);
			
			var clsj = TASK.toCLSJ(item);
			var clsj_td = $('<td class="text-center"><span class="text-overflow" title="' + clsj + '">' + clsj + '</span></td>');
			tr.append(clsj_td);
		}
};

