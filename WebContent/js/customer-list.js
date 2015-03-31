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

