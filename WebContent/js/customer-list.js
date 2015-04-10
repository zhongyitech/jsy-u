(function ($) {

    var UtilList = {
        _entity: {
            startposition: 0,
            pagesize: 5,
            type: "or",
            fields: ["name"],
            value: "",
            order: {id: "desc"}
        },
        _items: [],
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
            _this._items = result;
            $('#view-table button[class=detail-btn]').bind("click", function () {
                _this.detailClick(this);
            });
            $('#view-table button[class=del-btn]').bind("click", function () {
                _this.delItem(this);
            });
            $('#user-new').bind('click', function () {
                $('#save-button').unbind().bind("click", function () {
                    _this._saveUserInfo();
                });
                $('#action_name').text('添加新的客户');
                _this._showUserInfo();
            });
        },
        delItem:function(item){
            var _this=this;
            var key = $(item).data("itemid");
            if(key==undefined || key==null) return;
            var data={url:'/api/customerArchives',params:{id:this._items[key].id}};
            $.io.del(data).success(function(result){
                _this.render();
            }).error(function(error){
                alert(error.msg);
            })
        },
        detailClick: function (item) {
            var key = $(item).data("itemid");
            var _this = this;
            $('#save-button').unbind().bind("click", function () {
                _this._saveUserInfo();
            });
            $('#action_name').text('查看或编辑客户信息');

            _this._showUserInfo(_this._items[key]);
        },
        _showUserInfo: function (data) {
            $('#userinfo').fadeOut(100);
            $('#userinfo').fadeIn(100);
            $('#userinfo input,select,textarea').each(function (i, item) {
                if (item.tagName == 'INPUT' || item.tagName == 'TEXTAREA' ||  item.tagName == 'SELECT') {
                    if (data) {
                        $(item).val(data[$(item).prop('name')]);
                    }
                    else {
                        $(item).val('')
                    }
                }
                if (item.tagName == 'SELECT') {
                }
            });
            $('#customerId').val(data ? data.id : -1);
            $("#banks-data").renderData("#banks-data-template", data && data.bankAccount || []);

            $("#bank-new-row").unbind().bind('click', function () {
                $('#bank-table').append('<tr data-key="0"><td class="form-input"><span><input name="bankOfDeposit" value=""></span></td><td class="form-input"><span><input name="accountName" value=""></span></td><td class="form-input"><span><input name="account" value=""></span></td> <td><span><input type="radio" name="defaultAccount"></span></td><td><span class="text-overflow"><button class="bankdel-btn" data-itemid="0">删除</button></span></td></tr>');
                $("#bank-table button[class=bankdel-btn]").unbind().bind('click', function () {
                    $(this).closest('tr').remove();
                });
            });
            $("#bank-table button[class=bankdel-btn]").unbind().bind('click', function () {
                $(this).closest('tr').remove();
            });
        },
        _saveUserInfo: function () {
            var obj = {};
            $('#userinfo input,select,textarea').each(function (i, item) {
                var key = $(item).prop('name');
                if (key == "") {
                    return;
                }
                var value = null;
                if (item.tagName == 'INPUT' || item.tagName == 'SELECT' || item.tagName == 'TEXTAREA') {
                    value = $(item).val();
                }
                obj[key] = value;
            });
            var bankAccount = [];
            $('#bank-table tr:gt(0)').each(function (i, item) {
                var account = {};
                $(item).find('input').each(function (i, item) {
                    if ($(item).prop('name') == 'defaultAccount') {
                        account["defaultAccount"] = $(item).prop('checked');
                    } else {
                        account[$(item).prop('name')] = $(item).val();
                    }
                });
                bankAccount.push(account);
            });
            obj['bankAccount'] = bankAccount;
            var data = {};
            if ($('#customerId').val() > 0) {
                //updaate
                var data = {url: '/api/customerArchives/update', entity: obj, params: {id: $('#customerId').val()}};
                $.io.post(data).success(function (result) {
                    alert("修改成功!");
                    window.location.reload();
                })
                    .error(function (error) {
                        alert(error.msg);
                    });
            } else {
                //create
                var data = {url: '/api/customerArchives', entity: obj};
                $.io.put(data).success(function (result) {
                    alert("保存成功!");
                    window.location.reload();
                })
                    .error(function (error) {
                        alert(error.msg);
                    });
            }
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

