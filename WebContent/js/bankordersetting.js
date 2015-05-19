(function ($) {

    var UtilSummary = {
        _entity: {
            startposition: 0,
            pagesize: 5,
            type: "or",
            fields: ["name"],
            value: "",
            order: {indexlocation: "asc"}
        },
        _items: [],
        _request: function (options) {
            $.extend(true, this._entity, options.entity)
            return $.io.post({
                url: '/api/summary/readAllForPage',
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
            $("#banktosummary-data").renderData("#banktosummary-data-template", result, function () {
                return _this._entity.startposition;
            });
            _this._items = result;

            //$("#bank-table button[class=del-btn]").unbind().bind('click', function () {
            //    _this.delItem('', function () {
            //        $(this).closest('tr').remove();
            //        _this._render();
            //    });
            //});
            $("#banktosummary-new").unbind().bind('click', function () {
                $('#banktosummary-table').append(
                    '<tr data-key="0"><td class="form-input"><input type="hidden" name="id" value="-1"><input name="summary" value=""></td>' +
                    ' <td class="form-input"><input name="remark" value=""></td><td class="form-input"><input name="accountName" value=""></td>' +
                    '<td class="form-input"><label></label></td><td><button class="del-btn" data-itemid="-1">删除</button>' +
                    '<button class="up-btn" data-itemid="-1">上移</button><button class="down-btn" data-itemid="-1">下移</button></td></tr>'
                );
                _this.bindButtonClicK();
            });
            _this.bindButtonClicK();
            $("#banktosummary-save").unbind().bind('click', function () {
                _this._submit();
            })
        },
        bindButtonClicK: function () {
            var _this = this;
            $("#banktosummary-table button[class=del-btn]").unbind().bind('click', function () {
                var key = $(this).data("itemid");
                var _target = this;
                _this.delItem(key, function () {
                    //$(_target).closest('tr').remove();
                    _this.render();
                });
            });
        },
        delItem: function (key, callFunc) {
            var _this = this;
            if (key == undefined || key == null || _this._items[key] == undefined) {
                if (callFunc != null) {
                    callFunc();
                }
                return;
            }
            //todo:edit url
            var data = {url: '/api/summary', params: {id: _this._items[key].id}};
            $.io.del(data).success(function (result) {
                if (callFunc != null) {
                    callFunc();
                }
            }).error(function (error) {
                alert(error.msg);
            })
        },
        _submit: function () {
            var items = [];
            $('#banktosummary-table tr:gt(0)').each(function (i, tr) {
                var item = {};
                $(tr).find('input').each(function (i, obj) {
                    item[$(obj).prop('name')] = $(obj).val();
                });
                items.push(item);
            });
            console.log(items);
            //todo:submit
            $(items).each(function (i, item) {
                if (item.id < 0) {
                    //add
                    $.io.post(true, {url: '/api/summary', entity: item})
                        .success(function (result) {
                            $.message.log('数据保存成功:' + item.summary);
                        })
                        .error(function (error) {
                            $.message.log(error.msg);
                        });
                } else {
                    //update
                    $.io.put(true, {url: '/api/summary', entity: item, params: {id: item.id}})
                        .success(function (result) {
                            $.message.log('数据修改成功:' + item.summary);
                        })
                        .error(function (error) {
                            $.message.log(error.msg);
                        });
                }
            });
            this.render();
        },
        _saveUserInfo: function () {
            var obj = {};
            var _this = this;
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
                    $('#userinfo').fadeOut(100);
                    _this.render();
                    $.message.log("修改成功");
                    //alert("!");
                })
                    .error(function (error) {
                        alert(error.msg);
                    });
            } else {
                //create
                var data = {url: '/api/customerArchives', entity: obj};
                $.io.put(data).success(function (result) {
                    //alert("保存成功!");
                    //window.location.reload();
                    $('#userinfo').fadeOut(100);
                    _this.render();
                    $.message.log("新建客户成功!");
                })
                    .error(function (error) {
                        alert(error.msg);
                    });
            }
        }
        ,
        _renderPage: function (pager) {
            var _this = this;
            if (!_this._entity.startposition) {
                $.dom.pager("#banktosummary-pager", pager, {
                    pageSize: _this._entity.pagesize
                }).onChange(function (entity) {
                    _this._render(entity);
                });
            }
        }
        ,
        _bindEvent: function () {
            var _this = this, keyword = $("#keyword-input"), searchButton = $("#keyword-button");
            keyword.unbind("keyup").bind("keyup", function (e) {
                if (e.keyCode == 13) _this._render({startposition: 0, value: keyword.val()});
            });
            searchButton.unbind("click").bind("click", function () {
                _this._render({startposition: 0, value: keyword.val()});
            });
        }
        ,
        render: function () {
            this._render();
            this._bindEvent();
        }
    };
    UtilSummary.render();
})
(jQuery);

(function ($) {

    var UtilSubject = {
        _entity: {
            startposition: 0,
            pagesize: 10,
            type: "or",
            fields: ["name"],
            value: "",
            order: {id:"asc",sumName: "asc"}
        },
        _items: [],
        _request: function (options) {
            $.extend(true, this._entity, options.entity)
            return $.io.post({
                url: '/api/summaryToFund/readAllForPage',
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
            $("#subject-data").renderData("#subject-data-template", result, {
                callback: function () {
                    return _this._entity.startposition;
                }, selectlist: []
            });
            _this._items = result;

            $("#subject-new").unbind().bind('click', function () {
                $('#subject-table').append(
                    '<tr >                ' +
                    '<td class="form-input"><input type="hidden" name="id" value="-1"><input name="subject" value="">  </td>' +
                    '<td class="form-input"><input name="subjectLevel2" value=""></td>   ' +
                    '<td class="form-input"><input name="subjectLevel3" value=""></td>   ' +
                    '<td class="form-input"><select name="borrow"><option value="true">借</option><option value="false" >贷</option>  ' +
                    '</select></td><td class="form-input"><input name="sumName" value=""></td>' +
                    '<td class="form-input"><input name="company" value=""></td> ' +
                    '<td> <button class="del-btn" data-itemid="0">删除</button></td> ' +
                    '</tr>'
                );
                _this.bindButtonClicK();
            });
            _this.bindButtonClicK();
            $("#subject-save").unbind().bind('click', function () {
                _this._submit();
            })

        },
        bindButtonClicK: function () {
            var _this = this;
            $("#subject-table button[class=del-btn]").unbind().bind('click', function () {
                var key = $(this).data("itemid");
                var _target = this;
                _this.delItem(key, function () {
                    //$(_target).closest('tr').remove();
                    _this.render();
                });
            });
        },
        delItem: function (key, callFunc) {
            var _this = this;
            if (key == undefined || key == null || _this._items[key] == undefined) {
                if (callFunc != null) {
                    callFunc();
                }
                return;
            }
            //todo:edit url
            var data = {url: '/api/summaryToFund', params: {id: _this._items[key].id}};
            $.io.del(data).success(function (result) {
                if (callFunc != null) {
                    callFunc();
                }
            }).error(function (error) {
                alert(error.msg);
            })
        },
        _submit: function () {
            var items = [];
            $('#subject-table tr:gt(0)').each(function (i, tr) {
                var item = {};
                $(tr).find('input,select').each(function (i, obj) {
                    item[$(obj).prop('name')] = $(obj).val();
                });
                if (item.subject != "" && item.sumName != null) {
                    items.push(item);
                }
            });
            console.log(items);
            //todo:submit
            $(items).each(function (i, item) {
                if (item.id < 0) {
                    //add
                    $.io.post(true, {url: '/api/summaryToFund', entity: item})
                        .success(function (result) {
                            $.message.log('数据保存成功:');
                        })
                        .error(function (error) {
                            $.message.log(error.msg);
                        });
                } else {
                    //update
                    $.io.put(true, {url: '/api/summaryToFund', entity: item, params: {id: item.id}})
                        .success(function (result) {
                            $.message.log('数据修改成功:' + item.subject);
                        })
                        .error(function (error) {
                            $.message.log(error.msg);
                        });
                }
            });
            this.render();
        },

        _renderPage: function (pager) {
            var _this = this;
            if (!_this._entity.startposition) {
                $.dom.pager("#subject-pager", pager, {
                    pageSize: _this._entity.pagesize
                }).onChange(function (entity) {
                    _this._render(entity);
                });
            }
        }
        ,
        _bindEvent: function () {
            var _this = this, keyword = $("#keyword-input"), searchButton = $("#keyword-button");
            keyword.unbind("keyup").bind("keyup", function (e) {
                if (e.keyCode == 13) _this._render({startposition: 0, value: keyword.val()});
            });
            searchButton.unbind("click").bind("click", function () {
                _this._render({startposition: 0, value: keyword.val()});
            });
        }
        ,
        render: function () {
            this._render();
            this._bindEvent();
        }
    };
    UtilSubject.render();
})(jQuery);
