(function ($) {
    var FUNDWTSTATUS = {
        items: null,
        urls: [
            "./special_treat.jsp",
            "./special_untreat.jsp",
            "./continuedinvestment-add.jsp",
            "./refund_add.jsp"
        ],
        ini: function () {
            this.items = ["正常", "委托付款", "到期转投", "未到期转投", "基金续投", "退伙申请", "合并申请"];
        },
        get: function (status_id) {
            if (this.items == null) {
                this.ini();
            }
            return this.items[status_id];
        },
        getUrl: function (status_id) {
            if (status_id - 1 >= this.urls.length) {
                return "";
            }
            if (status_id == 0) {
                return "";
            }
            return this.urls[status_id - 1];
        }
    };
    var Util = {
        _entity: {
            startposition: 0,
            pagesize: 10,
            type: "or",
            fields: ["czr", "url", "method", "params", "address"],
            value: "",
            order: {status: "asc"},
            sq_type: 1,
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
                url: '/api/dqztsq/getAll',
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
            //取消申请操作
            $("#view-table .btn_cancel").unbind().bind("click", function () {
                var action_data = $(this).data();
                if (confirm("您确定要取消些申请单？ 此操作将会删除此申请单，并将对应的投资档案的状态更新为“正常”")) {
                    $.io.post({
                        url: '/api/special/cancel',
                        params: {id: action_data.index, sType: action_data.stype}
                    }).success(function (result) {
                        Util._entity.sq_type = action_data.stype;
                        Util.render();
                        $.message.log("操作成功！");
                    }).error(function (msg) {
                        alert("取消特殊申请出错！");
                    })
                }
            });
            //审核申请
            $("#view-table .btn_accept").unbind().bind("click", function () {
                var action_data = $(this).data();
                if (confirm("您确定要通过此特殊申请？")) {
                    $.io.post({
                        url: '/api/special/accept',
                        params: {id: action_data.index, sType: action_data.stype}
                    }).success(function (result) {
                        Util._entity.sq_type = action_data.stype;
                        Util.render();
                        $.message.log("操作成功！");
                    }).error(function (msg) {
                        alert("同意特殊申请出错！");
                    })
                }
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

    $(function () {
        FUNDWTSTATUS.ini();
        var index = 0;
        $.dom.select("#sq_type", FUNDWTSTATUS.items, function (item) {
            return {text: item, value: index++};
        });
        $("#sq_type").unbind().bind('change', function () {
            Util._entity.sq_type = $(this).val();
            Util.render();
        });
    });
})(jQuery);

