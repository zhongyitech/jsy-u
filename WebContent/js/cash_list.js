
$(document).ready(function(){

	$('#pay_submit').click(function(){
		window.location.href="./app.jsp";
	});
	VIEWDATA.dateformat=DATEFORMAT;
	VIEWDATA.init(true);
	
});

var VIEWDATA = {
	table_id: "#cash-interest",
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


	table_id2: "#cash-benjin",
	KEYWORD_BUTTON_ID2: '#filter-button2',
	KEYWORD_ID2: '#filter-keyword2',
	PAGES_ID2: '#page-numbers2',
	PAGES_TOTAL2: '#pacts-page-total2',
	STATUS_ID2: '#filter-status2',
	FROM_ID2: '#filter_from2',
	TO_ID2: '#filter_to2',
	STATUS_KEY2: 'status2',
	filter_keyword2: '',
	filter_status2: '',
	filter_from2: '',
	filter_to2: '',
	page_size2: 10,
	page_start2: 0,
	page_total2: 1,
	pages_select2: 1,
	pages_size2: 21,
	status2: {},
	dateformat2: {},


	item : '',
	user : {},
	fund : {},
	customer : {},
	init : function() {
		this.getView();
	},
	getView : function() {
		this.getItems();
		this.getItems2();
		this.iniPage();
		this.setEvent();
	},
	setEvent : function() {
		var me = this;
		$("#cash-add").click(function(){
			var selected = [];
			$('.item-checkbox:checked',"#cash-interest").each(function() {
				selected.push($(this).val());
			});

			$('.item-checkbox:checked',"#cash-benjin").each(function() {
				selected.push($(this).val());
			});

			console.log(selected);
			me.post_request(selected);
		});

		$(this.KEYWORD_BUTTON_ID).click(function(){
			//过滤时翻至第一页
			me.selectFirst();
		});

		$(this.KEYWORD_ID).keyup(function(e){
			if(e && e.keyCode==13){
				me.selectFirst();
			}
		});

		$(this.KEYWORD_BUTTON_ID2).click(function(){
			//过滤时翻至第一页
			me.selectFirst2();
		});

		$(this.KEYWORD_ID2).keyup(function(e){
			if(e && e.keyCode==13){
				me.selectFirst2();
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
		var data = {url: '/api/payment/toPay?ids='+params};
		console.log(data);
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

		var params = JSON.stringify({type: "lx"});
		var entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword, startsaledate1: me.filter_from, startsaledate2: me.filter_to});
		if(me.filter_from==""||me.filter_to==""){
			entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword});
		}
		console.log("params",params);
		console.log("entity",entity);

		var data = {url: '/api/payment/getPayments', params: params, entity: entity};

		$.ajax({
			type: 'post',
			url: '../rest/item/post',
			data: data,
			dataType: 'json',
			async: false,
			success: function(result){
				console.log(result);
				if(result && result.rest_status && result.rest_status == "suc"){
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


	//业务提成申请单
	setTable: function(items){
		var pacts = $("#cash-interest tr");
		if(pacts && pacts.length){
			for(var i=1; i<pacts.length; i++){
				$(pacts[i]).remove();
			}
		}


		var table = $("#cash-interest");


		if(table && items){
			for(var i in items){
				var row = $("<tr></tr>");
				table.append(row);

				//row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				if(items[i]["status"]==0){
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				}else{
					$(row).attr("style","background-color: #FD0101;");
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
				}

				row.append('<td>' + items[i]["fundName"] + '</td>');
				row.append('<td>' + items[i]["contractNum"] + '</td>');
				row.append('<td><span class="funds-item-name" title="' + items[i]["customerName"] + '">' + items[i]["customerName"] + '</span></td>');

				row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
				row.append('<td>' + items[i]["khh"] + '</td>');
				row.append('<td>' + items[i]["zh"] + '</td>');
				row.append('<td>' + items[i]["bmjl"] + '</td>');

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

		$('#page-first2').click(function(){
			//过滤时翻至第一页
			me.selectFirst2();
		});

		$('#page-last2').click(function(){
			//过滤时翻至第一页
			me.selectLast2();
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
	},

	//set page for table2
	getFilter2: function(){//获取过滤条件
		var from_input = $(this.FROM_ID2);
		this.filter_from2 = from_input.val();
		if(this.filter_from2){
			this.filter_from2 = this.dateformat.toRest(this.filter_from2);
		}

		var to_input = $(this.TO_ID2);
		this.filter_to2 = to_input.val();
		if(this.filter_to2){
			this.filter_to2 = this.dateformat.toRest(this.filter_to2);
		}

		var status_select = $(this.STATUS_ID2);
		this.filter_status2 = status_select.val();

		var keyword_input = $(this.KEYWORD_ID2);
		this.filter_keyword2 = keyword_input.val();

		this.page_start2 = (this.pages_select2 - 1) * this.page_size2;
	},
	getItems2: function(){
		var me = this;
		me.getFilter2();

		var params = JSON.stringify({type: "bj"});
		var entity = JSON.stringify({startposition: me.page_start2, pagesize: me.page_size2, keyword: me.filter_keyword2, startsaledate1: me.filter_from2, startsaledate2: me.filter_to2});
		if(me.filter_from2==""||me.filter_to2==""){
			entity = JSON.stringify({startposition: me.page_start2, pagesize: me.page_size2, keyword: me.filter_keyword2});
		}
		console.log("params",params);
		console.log("entity",entity);

		var data = {url: '/api/payment/getPayments', params: params, entity: entity};

		$.ajax({
			type: 'post',
			url: '../rest/item/post',
			data: data,
			dataType: 'json',
			async: false,
			success: function(result){
				console.log(result);
				if(result && result.rest_status && result.rest_status == "suc"){
					me.result = result;
					me.success2(result);
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
	success2: function(result){
		this.items = JSON.parse(result['rest_result']);
		this.setTable2(this.items);
		this.page_total2 = result['rest_total'];
		this.setPage2(this.page_total2);
	},
	setTable2: function(items){
		var pacts = $("#cash-benjin tr");
		if(pacts && pacts.length){
			for(var i=1; i<pacts.length; i++){
				$(pacts[i]).remove();
			}
		}
		var table = $("#cash-benjin");

		if(table && items){
			for(var i in items){
				var row = $("<tr></tr>");
				table.append(row);

				//row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				if(items[i]["status"]==0){
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" value="'+ items[i]["id"] +'"></span></td>');
				}else{
					$(row).attr("style","background-color: #FD0101;");
					row.append('<td><span class="fund-field" title="' + items[i]["id"] + '"><input type="checkbox" class="item-checkbox" name="checkbox" disabled="disabled" value="'+ items[i]["id"] +'"></span></td>');
				}

				row.append('<td>' + items[i]["fundName"] + '</td>');
				row.append('<td>' + items[i]["contractNum"] + '</td>');
				row.append('<td><span class="funds-item-name" title="' + items[i]["customerName"] + '">' + items[i]["customerName"] + '</span></td>');

				row.append('<td>' + STRINGFORMAT.toYuan(items[i]["yfk"]) + '</td>');
				row.append('<td>' + items[i]["khh"] + '</td>');
				row.append('<td>' + items[i]["zh"] + '</td>');
				row.append('<td>' + items[i]["bmjl"] + '</td>');

			}
		}

	},

	setPage2: function(total){
		this.page_total = total;

		var pages_div = $(this.PAGES_ID2);
		var pages = pages_div.find("a");
		if(pages.length){
			for(var i=0; i<pages.length; i++){
				$(pages[i]).remove();
			}
		}

		var pages_from = this.pages_select2 - 16;
		if(pages_from<1){
			pages_from = 1;
		}
		var pages_to = pages_from + this.pages_size2;
		var pages_total =  Math.ceil(total/this.page_size2);

		var me = this;
		for(var i=pages_from; i<pages_to && i<=pages_total; i++){
			var page_number = $('<a href="javascript:;" class="btn large bg-green page-number"></a>');
			if(i == this.pages_select2){
				page_number = $('<a href="javascript:;" class="btn large bg-green page-number disabled"></a>');
			}
			pages_div.append(page_number);
			page_number.append(i);
			page_number.click(function(e){me.selectPage(e);});
		}


	},
	selectPage2: function(e){
		this.pages_select2 = e.toElement.textContent;
		this.getItems2(true);
	},
	selectFirst2: function(){
		this.pages_select2 = 1;
		this.getItems2(true);
	},
	selectLast2: function(){
		this.pages_select2 = this.pages_total2;
		this.getItems2(true);
	}
};

var DigitalBox={
    show:function(){


        $(this.box_id).show();
    },
    _hide:function(){
        $(this.box_id).hide();
    },
    ini:function(){

    },
    _getData:function(){

    },
    _setInfo:function(){

    },
    _getBankAccounts:function(fundName){

    },
    //
    box_id:'',
    btn_ok:'',
    btn_cancel:'',
    okEvent:null,
    cancelEvent:null
}