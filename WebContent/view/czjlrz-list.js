//数据加载、按钮点击事件等
$(document).ready(function(){
	CZJLRZ_LIST.ini(true);
});

//操作记录日志
var CZJLRZ={
		ID_KEY: 'id',
		CZR_KEY: 'czr',//操作人
		CZSJ_KEY: 'czsj',//操作时间
		URL_KEY: 'url',//访问模块
		METHOD_KEY: 'method',//请求方式
		PARAMS_KEY: 'params',//请求参数
		ADDRESS_KEY: 'address', //请求ip和主机名
		toId: function(item){
			if(item){
				return item[this.ID_KEY];
			}
		},
		toCZR: function(item){
			if(item){
				var v = item[this.CZR_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toCZSJ: function(item){
			if(item){
				var v = item[this.CZSJ_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toURL: function(item){
			if(item){
				var v = item[this.URL_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toMETHOD: function(item){
			if(item){
				var v = item[this.METHOD_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toPARAMS: function(item){
			if(item){
				var v = item[this.PARAMS_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		},
		toADDRESS: function(item){
			if(item){
				var v = item[this.ADDRESS_KEY];
				if(v){
					return v;
				}else{
					return '';
				}
			}else{
				return '';
			}
		}
}

//操作记录日志列表
var CZJLRZ_LIST ={
		page_start: 0,
		page_size: 10,
		page_total: 1,
		pages_select: 1,
		pages_size: 31,
		VIEW_ID: '#czjlrz-list',
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
			
			var params = JSON.stringify();
			var entity = JSON.stringify({
				startposition: me.page_start,
				pagesize: me.page_size,
				keyword: this.filter_keyword
			});
			var data = {url: '/api/operationRecord/readAllForPage', params: params, entity: entity};
			
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
				for(var i in items){
					this.add(items[i]);
				}
			}
		},
		add: function (item){//table增加一行
			var key = this.tr_value++;
			var table = this.getTable();
			
			var tr = $('<tr key="' + key + '"></tr>');
			table.append(tr);
			
			var czr = CZJLRZ.toCZR(item);
			var czr_td = $('<td class="text-center"><span class="text-overflow" title="' + czr + '">' + czr + '</span></td>');
			tr.append(czr_td);
			
			var czsj = CZJLRZ.toCZSJ(item);
			czsj = DATEFORMAT.toDate(czsj);
			var czsj_td = $('<td class="text-center"><span class="text-overflow" title="' + czsj + '">' + czsj + '</span></td>');
			tr.append(czsj_td);
			
			var url = CZJLRZ.toURL(item);
			var url_td = $('<td class="text-center"><span class="text-overflow" title="' + url + '">' + url + '</span></td>');
			tr.append(url_td);
			
			var method = CZJLRZ.toMETHOD(item);
			var method_td = $('<td class="text-center"><span class="text-overflow" title="' + method + '">' + method + '</span></td>');
			tr.append(method_td);
			
			var params = CZJLRZ.toPARAMS(item);
			var params_td = $('<td class="text-center"><span class="text-overflow" title="' + params + '">' + params + '</span></td>');
			tr.append(params_td);
			
			var address = CZJLRZ.toADDRESS(item);
			var address_td = $('<td class="text-center"><span class="text-overflow" title="' + address + '">' + address + '</span></td>');
			tr.append(address_td);
		}
};

