$(document).ready(function(){
	INVESTMENT_LIST.investment=INVESTMENT;
	INVESTMENT_LIST.fund=FUND;
	INVESTMENT_LIST.customer=CUSTOMER;
	INVESTMENT_LIST.dateformat=DATEFORMAT;
	INVESTMENT_LIST.numberformat=NUMBERFORMAT;
	INVESTMENT_LIST.stringformat=STRINGFORMAT;
	
	INVESTMENT_LIST.ini(true);
});

var INVESTMENT_LIST={
		TABLE_ID: '#investment-table',
		KEYWORD_ID: '#keyword-input',
		KEYWORD_BUTTON_ID: '#keyword-button',
		PAGES_ID: '#page-numbers',
		page_start: 0,
		page_size: 10,
		pages_select: 1,
		pages_total: 0,
		pages_size: 21,
		filter_keyword: '',
		tr_key: '',
		response: {},
		items: {},
		investment: {},
		fund: {},
		customer: {},
		dateformat: {},
		numberformat: {},
		stringformat: {},		
		ini: function(async){
			this.iniFilter();
			this.iniPage();
			this.setData(async);
		},
		iniFilter: function(){
			var me = this;
			$(this.KEYWORD_BUTTON_ID).click(function(){
				//过滤时翻至第一页
				me.selectFirst();
			});
		},
		setData: function(async){
			//异步加载数据
			if(!async){
				async = false;
			}			
			this.page_start = (this.pages_select - 1) * this.page_size;		
			this.setFilter();				
			var me = this;
			var params = {};
			var entity = JSON.stringify({startposition: me.page_start, pagesize: me.page_size, keyword: me.filter_keyword});
			var data = {url: '/api/investmentArchives/IAOutput', params: params ,  entity:entity};
			$.ajax({ 
				type: 'post', 
				url: '../rest/item/post', 
				data: data,
				dataType: 'json',
				async: async,
				success: function(response){
					me.response=response;
					me.setView(response);
				},
				error: function(response){
					me.response=response;
					LOGIN.error(response);
				}
			});
		},
		
		setView: function(response){
			this.items = JSON.parse(response[REST.RESULT_KEY]);
			this.setTable(this.items);
			this.setPage(response);
			
		},
		setFilter: function(){//获取过滤条件
			var keyword_input = $(this.KEYWORD_ID);
			this.filter_keyword = keyword_input.val();
		},
		setTable: function (items){
			//初始化
			var items_tr = $(this.TABLE_ID + ' tr');
			if(items_tr && items_tr.length){
				for(var i=1; i<items_tr.length; i++){
					$(items_tr.get(i)).remove();
				}
			}			
			if(items){
				this.tr_key = 0;
				for(var i in items){
					this.addTr(items[i]);
				}
			}			
			var me=this;
			//绑定事件
			$('.btn_row_action').click(function(){
				var rowkey=$(this).data('rowindex');
				var item=me.items[rowkey];
				console.log(item);
				var actionname=$(this).data('actionname');
				//this.menus[actionname[]];		
				var menu=me.menus[actionname];
				if(menu!=null && menu.actionfunc!=null){
					console.log(actionname);
					menu.actionfunc(item);
				}
			});
		},
		addTr: function (item){//增加一行
			var key = this.tr_key++;
			var table = $(this.TABLE_ID);
			
			var tr = $('<tr key="' + key + '"></tr>');
			table.append(tr);			
				
			var customer = item['customer'];
			
			var customer_td = $('<td><span   title="' + customer + '">' + customer + '</span></td>');
			tr.append(customer_td);
			
			var fund = item['fundname'];
			
			var fund_td = $('<td><span   title="' + fund + '">' + fund + '</span></td>');
			tr.append(fund_td);
			
			
			var markNum = item['markNum'];
			
			var markNum_td = $('<td><span   title="' + markNum + '">' + markNum + '</span></td>');
			tr.append(markNum_td);
			
			var contractNum = item['contractNum'];
			
			var contractNum_td ="<td><div class='dropdown'>"+
		    "<a href=javascript:;' title='' class='btn medium '	data-toggle='dropdown'> <span class='button-content'>"+contractNum+
		    "<i class='glyph-icon font-size-11 icon-chevron-down'></i>	</span></a>"+
		    "<ul class='dropdown-menu float-right'>"+
//		    "<li><a href='javascript:;' title='' btn_row_action data-rowindex='"+key+"' data-actionname='completedInvestment'><i class='glyph-icon icon-calendar mrg5R ' ></i>完成客户信息</a></li>"+
			"<li><a href='javascript:;' class=' btn_row_action' title='' data-rowindex='"+key+"' data-actionname='viewInvestment'><i class='glyph-icon icon-edit mrg5R'></i>查看投资档案明细</a></li><li class='divider'></li>";
			"<li class='divider'></li>";										
			if(item['dazt']==0){
				var menus=this.getMenus();
				for(var mkey in menus){
				 var m=menus[mkey];
				 contractNum_td =contractNum_td+	"<li><a href='javascript:;' class=' btn_row_action' title='' data-rowindex='"+key+"' data-actionname='"+ m.name+"'><i class='glyph-icon icon-edit mrg5R'></i>"+ m.title+"</a></li>";
				}
			}
			contractNum_td  = contractNum_td + "</ul></div></td>";
		    tr.append(contractNum_td);

			var rqrq=item['rgrq'];
			rqrq=this.dateformat.toDate(rqrq);

			var rqrq_td = $('<td><span   title="' + rqrq + '">' + rqrq + '</span></td>');
			tr.append(rqrq_td);

			var rqje=item['sjtzje'];

			var rqje_td = $('<td><span   title="' + rqje + '">' + rqje + '</span></td>');
			tr.append(rqje_td);
            
            var value='';
            var row='';
            value =item['tzqx'];
            row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			value=item['ywjl'];	
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			value=item['country'];	
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			value=item['nhsyl'];	
			value=this.numberformat.toRate(value);
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			value=item['fxfs'];	
			value=this.stringformat.toPayType(value);
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			value=item['dqrq'];	
			value=this.dateformat.toDate(value);
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

			var statusid=item['dazt'];	
			value=FUNDWTSTATUS.get(statusid);
			var vurl=FUNDWTSTATUS.getUrl(statusid)+"?investmentid="+statusid;
 			row=$("<td><a class='' target='_blank' href='"+vurl+"' title='"+value+"'>"+value+"</a></td>");
			tr.append(row);

			value=item['lx'];	
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);


			value=item['bj'];	
 			row=$('<td><span   title="' + value + '">' + value + '</span></td>');
			tr.append(row);

//			row="<td><div class='dropdown'>"+
//			    "<a href=javascript:;' title='' class='btn medium '	data-toggle='dropdown'> <span class='button-content'>"+
//			    "<i class='glyph-icon font-size-11 icon-cog'></i> <i class='glyph-icon font-size-11 icon-chevron-down'></i>	</span></a>"+
//			    "<ul class='dropdown-menu float-right'>"+
//			    "<li><a href='javascript:;' title='' btn_row_action data-rowindex='"+key+"' data-actionname='completedInvestment'><i class='glyph-icon icon-calendar mrg5R ' ></i>完成客户信息</a></li>"+
//				"<li class='divider'></li>"+									
//				"<li><a href='javascript:;' class=' btn_row_action' title='' data-rowindex='"+key+"' data-actionname='viewInvestment'><i class='glyph-icon icon-edit mrg5R'></i>查看投资档案明细</a></li><li class='divider'></li>";
//			if(item['dazt']==0){
//				var menus=this.getMenus();
//				for(var mkey in menus){
//					 var m=menus[mkey];
//					 row =row+	"<li><a href='javascript:;' class=' btn_row_action' title='' data-rowindex='"+key+"' data-actionname='"+ m.name+"'><i class='glyph-icon icon-edit mrg5R'></i>"+ m.title+"</a></li>";
//				}
//			}
//			row  = row + "</ul></div></td>";
//            tr.append(row);
			tr.append("<td></td>");
		},
		menus:null,
		getMenus:function(item){
			if(this.menus==null){
				this.initActionMenu();
			}
			//根据值做菜单是否显示的过渡
			return this.menus;
		},
		initActionMenu:function(){
			//getdata 做权限管理			
			var me=this;
			this.menus={
			completedInvestment:{
				title:'修改投资档案',name:'completedInvestment',actionfunc:function(item){
					var location="./investment.jsp?id=" + item.oid;
					window.location=location;
				}
			},			
			dqzt:{
				title:'到期转投处理申请',name:'dqzt',actionfunc:function(item){
					var location="./special_treat.jsp?investmentid="+item.oid;
					window.location=location;
				}
			},
			wdqzt:
			{
				title:'未到期转投处理申请',name:'wdqzt',actionfunc:function(item){
					var location="./special_untreat.jsp?investmentid="+item.oid;
					window.location=location;
				}
			},
			thcq:
			{
				title:'退伙处理申请',name:'thcq',actionfunc:function(item){
					var location="./refund_add.jsp?investmentid="+item.oid;
					window.location=location;
				}
			},
			jjxt:
			{
				title:'基金续投申请',name:'jjxt',actionfunc:function(item){
					var location="./continuedinvestment-add.jsp?investmentid="+item.oid;
					window.location=location;
				}
			}
		    };
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
			this.pages_select = e.toElement.textContent;
			this.setData(true);
		},
		selectFirst: function(){
			this.pages_select = 1;
			this.setData(true);
		},
		selectLast: function(){
			this.pages_select = this.pages_total;
			this.setData(true);
		}
};

var FUNDWTSTATUS={
	items:null,
	urls:[
	      "./special_treat.jsp",
	      "./special_untreat.jsp",
	      "./continuedinvestment-add.jsp",
	      "./refund_add.jsp"
	      ],
	ini:function(){
		this.items=[
		"无","到期","未到期","续投","退伙","","委付款","委收款",
		];
	},
	get:function(status_id){
		if(this.items==null){
			this.ini();
		}
		return this.items[status_id];
	},
	getUrl:function(status_id){
	   if(status_id-1>=this.urls.length){
		   return "";
	   }
	   if(status_id==0){
		   return "";
	   }
	   return this.urls[status_id-1];
	}
};
var Context={
	id:1,
	name:'administrator',
	loginuser:'administrator'
};
