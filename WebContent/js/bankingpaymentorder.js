//数据格式化控制
var status = {0: "未付", 1: "付款中", 2: "已付"};
function format(item, field) {
    switch (field) {
        case "fpe":
        case "yfk":
            return NUMBERFORMAT.toYuan(item);
            break;
        case "scsj":
        case "yfsj":
            return item || "" ;
            break;
        case "zfsj":
            return item ? DATEFORMAT.toDate(item) : "";
            break;
        case "status":
            switch (item) {
                case 0:
                    return "未付";
                    break;
                case 1:
                    return "付款中";
                    break;
                case 2:
                    return "已付";
                    break;
            }
            break;
        default :
            return item;
    }
}

(function ($) {

    var Util = {
        format: function (item) {
            return item + ",";
        },
        _entity: {
            startposition: 0,
            pagesize: 30,
            type: "or",
            fields: ["fundName", "contractNum", "customerName", "yfk", "khh", "zh", "fpe", "zfsj", "yfsj", "scsj", "status"],
            value: "",
            order: {status: "asc"}
        },
        /**
         * 发送请求，接收Options参数可包含entity、params
         * @param options
         * @returns {*}
         * @private
         */
        _request: function (options) {
            $.extend(true, this._entity, options.entity)
            return $.io.post({
                url: '/api/payment/readAllForPage',
                entity: this._entity
            });
        },
        /**
         * 渲染方法，当前页面只接收entity参数
         * @param entity
         * @private
         */
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
    Util.render();
})(jQuery);