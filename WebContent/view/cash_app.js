$(document).ready(function(){

	REPORT.dateformat=DATEFORMAT;
	REPORT.ini(true);
});

var REPORT={
	table_id: "#pacts-get-table",
	KEYWORD_BUTTON_ID: '#filter-button',
	KEYWORD_ID: '#filter-keyword',
	PAGES_ID: '#page-numbers',
	PAGES_TOTAL: '#pacts-page-total',
	STATUS_ID: '#filter-status',
	FROM_ID: '#filter_from',
	TO_ID: '#filter_to',
	STATUS_KEY: 'status',
	filter_keyword: '',
	filter_status: '',
	filter_from: '',
	filter_to: '',
	page_size: 10,
	page_start: 0,
	page_total: 1,
	pages_select: 1,
	pages_size: 21,
	status: {},
	dateformat: {},

	ini: function(async){

		//兑付信息与汇总表格数据加载
		this.getView();
		this.set_event();
		this.iniPage();

		//报表测试数据
		var report = echarts.init(document.getElementById('cash-report'));
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
		}

	},
	set_event: function(){
		var me = this;
		//check box event
		$("#submit_cash").click(function(){
			var selected = [];
			$('.item-checkbox:checked').each(function() {
				selected.push($(this).val());
			});
			console.log(selected.join(','));
			//window.location.href = "cash_list.jsp";

			me.post_request(selected);

		});

		//附件event
		//$("a[id^=attach_]").each(function() {
		//	console.log(this.attr("id"));
		//});

		$(this.KEYWORD_BUTTON_ID).click(function(){
			//过滤时翻至第一页
			me.selectFirst();
		});

		$(this.KEYWORD_ID).keyup(function(e){
			if(e && e.keyCode==13){
				me.selectFirst();
			}
		});

	},
	post_request: function(items){
		if(items&&items.length==0){
			alert("请选择数据");
			return;
		}

		var me = this;
		//var params = JSON.stringify({payIds: items});
		var params = items.join(",");
		var data = {url: '/api/paymentInfo/toPay?payIds='+params};
		var me = this;
		$.ajax({
			type: 'post',
			url: '../rest/item/get',
			data: data,
			dataType: 'json',
			async: false,
			success: function(result){
				console.log(result);
				if(result && result.rest_status && result.rest_status == "suc"){
					me.result = result;
					console.log("relaod page...");
				}
				window.location.href = "cash_list.jsp";

			},
			error: function(result){
				isAllSuc = false;
				if(LOGIN.error(result)){
					return;
				}
				alert('提交时错误.');
			}
		});


	},
	getView: function(){
		//兑付信息
		this.getItems();

		//汇总
		//this.getItems();
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

		var keyword_input = $(this.KEYWORD_ID);
		this.filter_keyword = keyword_input.val();

		this.page_start = (this.pages_select - 1) * this.page_size;
	},
	getItems: function(){
		var me = this;
		me.getFilter();


		var params = JSON.stringify({});
		var entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword, startsaledate1: me.filter_from, startsaledate2: me.filter_to});
		if(me.filter_from==""||me.filter_to==""){
			entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword});
		}
		console.log("params", params,entity);

		var data = {url: '/api/paymentInfo/readAllForPage', params: params, entity: entity};
		$.ajax({
			type: 'post',
			url: '../rest/item/post',
			data: data,
			dataType: 'json',
			async: false,
			success: function(result){
				console.log(result);
				if(result && result.rest_total>=0){
					me.result = result;
					me.success(result);
				}

			},
			error: function(result){
				if(LOGIN.error(result)){
					return;
				}
				me.error(result);
				alert('获取基金信息失败，请刷新页面.');
			}
		});
	},
	success: function(result){
		this.items = JSON.parse(result['rest_result']);
		this.setTable(this.items);
		this.page_total = result['rest_total'];
		this.setPage(this.page_total);
	},
	setTable: function(items){
		var pacts = $("#pacts-get-table tr");
		if(pacts && pacts.length){
			for(var i=1; i<pacts.length; i++){
				$(pacts[i]).remove();
			}
		}

		var table = $("#pacts-get-table");
		if(table && items){
			for(var i in items){
				var row = $("<tr></tr>");
				table.append(row);

				//row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				if(items[i]["type"]==0){
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				}else{
					$(row).attr("style","background-color: #FD0101;");
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
				}

				row.append('<td><span class="funds-item-name" title="' + items[i]["fundName"] + '">' + items[i]["fundName"] + '</span></td>');
				row.append('<td>' + items[i]["htbh"] + '</td>');
				row.append('<td>' + items[i]["customerName"] + '</td>');
				row.append('<td>' +  STRINGFORMAT.toYuan(items[i]["tzje"]) + '</td>');
				row.append('<td>' + items[i]["tzqx"] + '</td>');
				row.append('<td>' + items[i]["syl"] + '</td>');
				row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yflx"]) + '</td>');
				row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfbj"]) + '</td>');
				row.append('<td>' + STRINGFORMAT.toYuan(items[i]["zj"]) + '</td>');
				row.append('<td>' + items[i]["khh"] + '</td>');
				row.append('<td>' + items[i]["yhzh"] + '</td>');
				row.append('<td>' + items[i]["gj"] + '</td>');
				row.append('<td>' + items[i]["zjlx"] + '</td>');
				row.append('<td>' + items[i]["zjhm"] + '</td>');
				row.append('<td>  <a href="#" class="btn medium bg-green tooltip-button" data-placement="top" title="" data-original-title="Content" id="attach_'+items[i]["id"] +'"><i class="glyph-icon icon-hdd"></i></a> </td>');



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
	setPage: function(total){
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
		this.pages_select = e.toElement.textContent;
		this.getItems(true);
	},
	selectFirst: function(){
		this.pages_select = 1;
		this.getItems(true);
	},
	selectLast: function(){
		this.pages_select = this.pages_total;
		this.getItems(true);
	}
};