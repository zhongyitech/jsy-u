////数据加载、按钮点击事件等
//$(document).ready(function(){
//	CUSTOMER_LIST.ini(true);
//});
//
//


(function ($) {

    var UtilList = {
        _entity: {
            startposition: 0,
            pagesize: 10,
            type: "or",
            fields: ["name"],
            value: "",
            order: {id: "desc"}
        },
        _request: function (options) {
            $.extend(true, this._entity, options.entity)
            return $.io.post({
                url: '/api/customerArchives/readAllForPage',
                entity: this._entity
            });
        },
        _render: function (entity) {
            var _this = this;
            _this._request({entity: entity}).success(function (result, pager) {
                _this._renderData(result);
                _this._renderPage(pager);
            });
        },
        _renderData: function (result) {
            var _this = this;
            $("#table-data").renderData("#table-data-template", result, function () {
                return _this._entity.startposition;
            });
        },
        _renderPage: function (pager) {
            var _this = this;
            if (!_this._entity.startposition) {
                $.dom.pager("#table-pager", pager, {
                    pageSize: _this._entity.pagesize
                }).onChange(function (entity) {
                    _this._render(entity);
                });
            }
        },
        _bindEvent: function () {
            var _this = this, keyword = $("#keyword-input"), searchButton = $("#keyword-button");
            keyword.unbind("keyup").bind("keyup", function (e) {
                if (e.keyCode == 13) _this._render({startposition: 0, value: keyword.val()});
            });
            searchButton.unbind("click").bind("click", function () {
                _this._render({startposition: 0, value: keyword.val()});
            });
        },
        render: function () {
            this._render();
            this._bindEvent();
        }
    };
    UtilList.render();


})(jQuery);


////客户列表
//var CUSTOMER_LIST ={
//		page_start: 0,
//		page_size: 10,
//		page_total: 1,
//		pages_select: 1,
//		pages_size: 31,
//		VIEW_ID: '#customer-list',
//		TABLE_ID: '#view-table',
//		PAGES_LIST_ID: '#page-list',
//		PAGES_FIRST_ID: '#page-first',
//		PAGES_LAST_ID: '#page-last',
//		KEYWORD_BUTTON_ID : '#keyword-button',
//		KEYWORD_INPUT_ID : '#keyword-input',
//		filter_keyword: '',
//		tr_key: 'tr_key',
//		tr_value: 0,
//		items: [],
//		getView: function(){
//			return $(this.VIEW_ID);
//		},
//		getTable: function(){
//			return this.getView().find(this.TABLE_ID);
//		},
//		ini: function(async){
//			if(!async){
//				async = false;
//			}
//
//			var me = this;
//			this.getView().find(this.KEYWORD_BUTTON_ID).click(function(){
//				me.page_start=0;
//                me.set(true);
//			});
//
//			this.getView().find(this.KEYWORD_INPUT_ID).keyup(function(e){
//				if(e.keyCode == 13){
//                    me.page_start=0;
//                    me.set(true);
//				}
//			});
//
//			this.set(async);
//		},
//		set: function(async){
//			var me = this;
//
//			if(!async){
//				async = false;
//			}
//
//			var keyword_input = this.getView().find(this.KEYWORD_INPUT_ID);
//			this.filter_keyword = keyword_input.val();
//
//			var entity = JSON.stringify({
//				startposition: me.page_start,
//				pagesize: me.page_size,
//				keyword: this.filter_keyword
//			});
//			var data = {url: '/api/customerArchives/readAllForPage',  entity: entity};
//
//           $.io.post(data).success(function(result){
//                me.setView(result);
//            });
//		},
//		setView: function(response){
//			this.setPage(response);
//			this.setTable(response);
//		},
//		setPage: function(response){//设置页数选择列表
//			var _this=this;
//            _this.page_start==0&& $.dom.pager("#table-pager",response).onChange(function (param) {
//                _this.page_start=param.startposition;
//                _this.page_size=param.pagesize;
//                _this.set(true);
//            });
//		},
//		setTable: function (response){
//			this.items = response;
//			var table = this.getView().find(this.TABLE_ID);
//            table.find('tbody').empty();
//			var items = this.items;
//			if(items){
//				for(var i in items){
//					this.add(items[i]);
//				}
//			}
//		},
//		add: function (item){//table增加一行
//			var key = this.tr_value++;
//			var table = this.getTable();
//
//			var tr = $('<tr key="' + key + '"></tr>');
//			table.append(tr);
//
//			var zjhm = CUSTOMER.toZJHM(item);
//			var zjhm_td = $('<td class="text-center"></td>');
//			tr.append(zjhm_td);
//			if(zjhm){
//				var url = PAGE.CUSTOMER_EDIT + '?' + CUSTOMER.ID_KEY + '=' + CUSTOMER.toId(item);
//				var zjhm_a = $('<a class="text-overflow item-url" target="_blank" href="' + url + '" title="' + zjhm + '">' + zjhm + '</a>');
//				zjhm_td.append(zjhm_a);
//			 }
//
//			var name = CUSTOMER.toName(item);
//			var name_td = $('<td class="text-center"><span class="text-overflow" title="' + name + '">' + name + '</span></td>');
//			tr.append(name_td);
//
//			var sfzdz = CUSTOMER.toSFZDZ(item);
//			var sfzdz_td = $('<td class="text-center"><span class="text-overflow" title="' + sfzdz + '">' + sfzdz + '</span></td>');
//			tr.append(sfzdz_td);
//
//			var khh = CUSTOMER.toKHH(item);
//			var khh_td = $('<td class="text-center"><span class="text-overflow" title="' + khh + '">' + khh + '</span></td>');
//			tr.append(khh_td);
//
//			var yhzh = CUSTOMER.toYHZH(item);
//			var yhzh_td = $('<td class="text-center"><span class="text-overflow" title="' + yhzh + '">' + yhzh + '</span></td>');
//			tr.append(yhzh_td);
//
//			var phone = CUSTOMER.toPhone(item);
//			var phone_td = $('<td class="text-center"><span class="text-overflow" title="' + phone + '">' + phone + '</span></td>');
//			tr.append(phone_td);
//
//			var item = CUSTOMER.toEmail(item);
//			var item_td = $('<td class="text-center"><span class="text-overflow" title="' + item + '">' + item + '</span></td>');
//			tr.append(item_td);
//		}
//};

