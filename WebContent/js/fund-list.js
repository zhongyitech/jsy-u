$(document).ready(function(){
	FUND_LIST.fund=FUND;
	FUND_LIST.status=FUND_STATUS;
	FUND_LIST.numberformat=NUMBERFORMAT;
	FUND_LIST.dateformat=DATEFORMAT;
	
	FUND_STATUS.ini(true);
	FUND_LIST.ini(true);
	FUND_REPORT.ini(true);
});

var FUND_LIST={
		TABLE_ID: '#funds-table',
		PAGES_ID: '#funds-pages',
		PAGE_FIRST_ID: '#page-first',
		PAGE_LAST_ID: '#page-last',
		KEYWORD_BUTTON_ID: '#keyword-button',
		KEYWORD_ID: '#keyword-input',
		STATUS_ID: '#filter-status',
		FROM_ID: '#filter-from',
		TO_ID: '#filter-to',
		STATUS_KEY: 'status',
		filter_keyword: '',
		filter_status: '',
		filter_from: '',
		filter_to: '',
		page_start: 0,
		page_size: 10,
		page_total: 1,
		pages_select: 1,
		pages_size: 31,
		status: {},
		dateformat: {},
		result: {},
		items: [],
		page_total: 0,
		success: function(result){
			this.setTotal(result);
			this.items = JSON.parse(result['rest_result']);
			this.setTable(this.items);
			this.page_total = result['rest_total'];
			this.setPage(this.page_total);
		},
		error: function(result){
			
		},
		ini: function(async){
			this.iniFilter();
			this.iniPage();
			
			this.set(true);
		},
		iniFilter: function(){
			var me = this;
			$(this.KEYWORD_BUTTON_ID).click(function(){
				//每次点击搜索翻至搜索结果的第1页
				me.selectFirst();
			});
			
			$(this.KEYWORD_ID).keyup(function(e){
				if(e.which == 13){
					me.selectFirst();
				}
			});
			
			var status_select = $(this.STATUS_ID);
			if(status_select){
				var status_list = FUND_STATUS.getItems();
				var option = $('<option value=""></option>');
				status_select.append(option);
				for(var i in status_list){
					var status = status_list[i];
					var id = FUND_STATUS.toId(status);
					var name = FUND_STATUS.toName(status);
					var option = $('<option value="' + id + '">' + name + '</option>');
					status_select.append(option);
				}
			}
		},
		iniPage: function(){
			var me = this;
			$('#page-first').click(function(){
				//过滤时翻至第一页
				me.selectFirst();
			});
			
			$('#page-last').click(function(){
				//过滤时翻至第一页
				me.selectLast();
			});
		},
		set: function(async){
			//默认异步加载数据
			if(!async){
				async = false;
			}
			
			this.page_start = (this.pages_select - 1) * this.page_size;
			
			var from_input = $(this.FROM_ID);
			this.filter_from = from_input.val();
			if(this.filter_from){
				this.filter_from = DATEFORMAT.toRest(this.filter_from);
			}
			
			var to_input = $(this.TO_ID);
			this.filter_to = to_input.val();
			if(this.filter_to){
				this.filter_to = DATEFORMAT.toRest(this.filter_to);
			}
			
			var status_select = $(this.STATUS_ID);
			this.filter_status = status_select.val();
			
			var keyword_input = $(this.KEYWORD_ID);
			this.filter_keyword = keyword_input.val();
			
			this.page_start = (this.pages_select - 1) * this.page_size;
			var entity = JSON.stringify({
				startposition:	this.page_start,
				pagesize: 		this.page_size,
				keyword:		this.filter_keyword,
				status:			this.filter_status,
				startsaledate1:	this.filter_from,
				startsaledate2:	this.filter_to
			});
			var data = {url: '/api/fund/mainPage', params: {}, entity: entity};
			var me = this;
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
			this.setTotal(response);
			this.setPage(response);
			this.setTable(response);
		},
		setPage: function(response){
			var total = response[REST.TOTAL_KEY];
			this.page_total = total;
			
			var pages_div = $(this.PAGES_ID);
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
		setTable: function(response){
			this.items = JSON.parse(response[REST.RESULT_KEY]);
			
			var table = $(this.TABLE_ID);
			var trs = table.find('tr');
			if(trs && trs.length){
				for(var i=1; i<trs.length; i++){
					$(trs[i]).remove();
				}
			}
			
			var items = this.items;
			if(table && items){
				for(var i=0; i<items.length || i<this.page_size; i++){
					 this.addTr(items[i]);
				}
			}
		},
		addTr: function(item){
			var table = $(this.TABLE_ID);
			 var row = $("<tr></tr>");
			 table.append(row);
			 
			 var number = this.fund.toNumber(item);
			 var number_td = $('<td></td>');
			 row.append(number_td);
			 if(number){
				 var url = "./fund-edit.jsp?id=" + this.fund.toId(item);
				 var number_a = $('<a class="item-url" target="_blank" href="' + url + '" title="' + number + '">' + number + '</a>');
				 number_td.append(number_a);
			 }else{
				 var number_a = $('<span class="span-12"></span>');
				 number_td.append(number_a);
			 }
			 
			 row.append('<td>' + this.fund.toName(item) + '</td>');
			 row.append('<td><div class="text-right">' + this.fund.toYMGM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toSMJE(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toJFMJGM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toJFSM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toBNFMJGM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toBNFSM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toNFMJGM(item) + '</div></td>');
			 row.append('<td><div class="text-right">' + this.fund.toNFSM(item) + '</div></td>');
			 var status = this.fund.toStatus(item);
			 var id = this.status.toId(status);
			 status = this.status.get(id);
			 var statusName = this.status.toName(status);
			 row.append('<td>' + statusName + '</td>');
		},
		getFilter: function(){//获取过滤条件
			var from_input = $(this.FROM_ID);
			this.filter_from = from_input.val();
			if(this.filter_from){
				this.filter_from = this.dateformat.toRest(this.filter_from);
			}
			
			var to_input = $(this.TO_ID);
			this.filter_to = to_input.val();
			if(this.filter_to){
				this.filter_to = this.dateformat.toRest(this.filter_to);
			}
			
			var status_select = $(this.STATUS_ID);
			this.filter_status = status_select.val();
		},
		setTotal: function(result){
			var fund_count = $("#fund-fund-count");
			if(fund_count && (result.fund_count || result.fund_count == 0)){
				fund_count.text(this.numberformat.toCount(result.fund_count) + '个');
			}

			var raise_count = $("#fund-raise-count");
			if(raise_count && (result.raise_count || result.raise_count == 0)){
				raise_count.text(this.numberformat.toCount(result.raise_count) + '个');
			}

			var plan_total = $("#fund-plan-total");
			if(plan_total && (result.plan_total || result.plan_total == 0)){
				plan_total.text(this.numberformat.toYuan(result.plan_total));
			}

			var real_total = $("#fund-real-total");
			if(real_total && (result.real_total || result.real_total == 0)){
				real_total.text(this.numberformat.toYuan(result.real_total));
			}

			var season_plan_total = $("#season-plan-total");
			if(season_plan_total && (result.season_plan_total || result.season_plan_total == 0)){
				season_plan_total.text(this.numberformat.toYuan(result.season_plan_total));
			}

			var season_real_total = $("#season-real-total");
			if(season_real_total && (result.season_real_total || result.season_real_total == 0)){
				season_real_total.text(this.numberformat.toYuan(result.season_real_total));
			}

			var half_plan_total = $("#half-plan-total");
			if(half_plan_total && (result.half_plan_total || result.half_plan_total == 0)){
				half_plan_total.text(this.numberformat.toYuan(result.half_plan_total));
			}

			var half_real_total = $("#half-real-total");
			if(half_real_total && (result.half_real_total || result.half_real_total == 0)){
				half_real_total.text(this.numberformat.toYuan(result.half_real_total));
			}

			var year_plan_total = $("#year-plan-total");
			if(year_plan_total && (result.year_plan_total || result.year_plan_total == 0)){
				year_plan_total.text(this.numberformat.toYuan(result.year_plan_total));
			}

			var year_real_total = $("#year-real-total");
			if(year_real_total && (result.year_real_total || result.year_real_total == 0)){
				year_real_total.text(this.numberformat.toYuan(result.year_real_total));
			}
		}
};

var FUND_REPORT={
		REPORT_ID: 'fund-report',
		ini: function(async){
			//报表测试数据
			var report = echarts.init(document.getElementById('fund-report'));
			if(report){
				var option = {
						title : {
							text: '基金募集趋势及对比图',
							subtext: ''
						},
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							x: 'center',
							y: 'bottom',
							data:['金赛银A','金赛银B']
						},
						toolbox: {
							show : true,
							feature : {
								mark : {show: true},
								dataView : {show: true, readOnly: false},
								magicType : {show: true, type: ['line', 'bar']},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						calculable : true,
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : ['Jan','Feb','Mar','Apr','May','Jun','Jul']
							}
						],
						yAxis : [
							{
								type : 'value',
								axisLabel : {
									formatter: '{value}'
								}
							}
						],
						series : [
							{
								name:'金赛银A',
								type:'line',
								data:[11, 11, 15, 13, 12, 13, 10]
							},
							{
								name:'金赛银B',
								type:'line',
								data:[1, -2, 2, 5, 3, 2, 0]
							}
						]
					};
				report.setOption(option);
                $(window).resize(function(){
                    report.resize();
                })
			}
		}
}


