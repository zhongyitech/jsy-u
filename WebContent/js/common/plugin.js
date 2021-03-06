/**
 * Created by William.Wei on 2015/3/12. weizhansheng@outlook.com
 */
/**
 * hook ie
 */
(function () {
    window.console = window.console || {
            log: function () {
                //do nothing
            },
            error: function () {
                //do nothing
            }
        }
})();
/**
 * project ajax
 */
(function ($) {
    var BaseURI = "/rest/item/";
    /**
     * 特殊key过滤、映射
     * @type {{class: string}}
     */
    var SpecKeys = {
        "class": "className"
    };
    var RestURI = {
        _get: BaseURI + "get",
        _post: BaseURI + "post",
        _put: BaseURI + "put",
        _delete: BaseURI + "delete"
    };
    var Util = {
        _status: {
            success: "suc",
            error: "err"
        },
        _key: {
            status: "rest_status",
            result: "rest_result",
            total: "rest_total"
        },
        _system: {
            success: function (data) {
                console.log("success", data);
            },
            error: function (data) {
                //$.message.error("出错啦 Oop~<br />详细信息请查看控制台！");
                $.message.error(data.msg);
                //alert("[Error]: \""+data.msg+"\"\n[Result]: \""+data.result+"\"");
                console.error("error", data);
                if (data && data.result && data.result.errors && data.result.errors.length) {
                    $.each(data.result.errors, function (idx, item) {
                        var obj = $('#' + item.field);
                        if (!obj.length) obj = $('.' + item.field);
                        obj.addClass('valid_error').unbind("focus").bind("focus", function () {
                            if (obj.hasClass("valid_error"))obj.val("");
                            obj.removeClass("valid_error");
                        });
                    });
                }
            },
            fail: function (data) {
                console.error("fail", data);
                alert("请求失败!（非200返回）");
            }
        },
        _success: function (data) {
            return data && data[this._key.status] == this._status.success;
        },
        _error: function (data) {
            return data && data[this._key.status] == this._status.error;
        },
        _return: function (fn, response) {
            if (fn && fn.call) {
                var model = response ? (response[this._key.total] || response[this._key.total] == 0 ? fn.call(fn, this.result(response), {rest_total: response[this._key.total]}) : fn.call(fn, this.result(response))) : fn.call(fn, response);
                if (avalon && model && model.$id) avalon.define.call(window, model);
                avalon.scan.call(window);
            }
        },
        result: function (data) {
            return data && data[this._key.result];
        },
        buildOptions: function (data, options) {
            var useData = data || {params: {}, entity: {}},
                params = useData.params,
                entity = useData.entity;
            if (typeof params == "object") {
                this._fetchKeys(params);
                params = JSON.stringify(params);
            }
            if (typeof entity == "object") {
                this._fetchKeys(entity);
                entity = JSON.stringify(entity);
            }
            return $.extend(true, options || {}, {data: data}, {data: {entity: entity, params: params}});
        },
        doSuccess: function (data, fn) {
            $("#loader-overlay").hide();
            this._success(data) && this._return(fn || this._system.success, data);
        },
        doError: function (data, fn) {
            $("#loader-overlay").hide();
            this._error(data) && this._return(fn || this._system.error, data);
        },
        doFail: function (data, fn) {
            $("#loader-overlay").hide();
            this._return(fn || this._system.fail, data);
        },
        registerCallback: function (callback) {
            $.extend(true, this._system, callback);
        },
        /**
         * 替换异常key，如class，未进行递归
         * @param data
         * @private
         */
        _fetchKeys: function (data) {
            $.each(data || {}, function (key, v) {
                if (SpecKeys[key]) {
                    data[SpecKeys[key]] = v;
                    if (typeof v == "string") delete data[key];
                }
            });
        }
    };
    /**
     * 二次封装，success、error后台成功或异常，fail为js异常
     * @param xhr
     * @constructor
     */
    var XHR = function (xhr) {
        if (!xhr)return this;
        var _this = this;
        _this.callback = {};
        /**
         * sync 方法可以直接取数据，不必要采用回调形式
         */
        if (!xhr.isAsync()) {
            _this.data = function () {
                return Util.result(xhr.data());
            }
        }
        /**
         * rest success
         * @param fn
         * @returns {XHR}
         */
        _this.success = function (fn) {
            _this.callback["success"] = fn;
            xhr.then(function (data) {
                Util.doSuccess(data, fn);
            });
            return this;
        };
        /**
         * rest error
         * @param fn
         * @returns {XHR}
         */
        _this.error = function (fn) {
            _this.callback["error"] = fn;
            xhr.then(function (data) {
                Util.doError(data, fn);
            });
            return this;
        };
        /**
         * js error
         * @param fn
         * @returns {XHR}
         */
        _this.fail = function (fn) {
            _this.callback["fail"] = fn;
            _this._notice = true;
            xhr.error(function (data) {
                if (_this._notice) _this._notice = Util.doFail(data, fn);
            }).fail(function (data) {
                if (_this._notice) _this._notice = Util.doFail(data, fn);
            });
            return this;
        };
        /**
         * call default
         */
        xhr.then(function () {
            //取消error局部覆盖全局
            _this.error();
            !_this.callback["success"] && xhr.isAsync() && _this.success();
            !_this.callback["fail"] && _this.fail();
        });
    };
    /**
     * 请求统一入口,暂时全部Post
     * @param url
     * @param argsObj
     * @returns {XHR}
     */
    var request = function (url, argsObj) {
        var args = Array.prototype.slice.apply(argsObj), _sync = false;
        if (args.length) {
            if (typeof args[0] == "boolean") _sync = args.shift();
            var useOptions = Util.buildOptions(args.shift(), $.extend(true, args.shift() || {}, {url: url}));
            if (!useOptions.url) throw Error("no ajax url");
            if (_sync)
                return new XHR($.Sync.post(useOptions));
            return new XHR($.Async.post(useOptions));
        }
        return null;
    };
    $.extend(true, {
        io: {
            /**
             * sync/data options
             * @returns {XHR}
             */
            get: function () {
                $("#loader-overlay").show();
                return request(RestURI._get, arguments);
            },
            post: function () {
                $("#loader-overlay").show();
                return request(RestURI._post, arguments);
            },
            put: function () {
                $("#loader-overlay").show();
                return request(RestURI._put, arguments);
            },
            del: function () {
                $("#loader-overlay").show();
                return request(RestURI._delete, arguments);
            },
            registerCallback: function (callback) {
                Util.registerCallback(callback);
            },
            isXHR: function (xhr) {
                return xhr && xhr.constructor == XHR;
            }
        }
    })
})(jQuery);
/**
 * common project method
 */
(function ($) {
    /**
     * some utils
     * @type {{key: Function, clear: Function}}
     */
    var Util = {
        key: function (key) {
            return ("_" + key).replace(/\.|,| /g, "_");
        },
        clear: function (obj, keys) {
            if (obj && keys && keys.length) {
                $.each(keys, function (i, key) {
                    delete obj[key];
                });
            }
        }
    };
    /**
     * type config tool
     * @type {{_cache: {}, _data: {}, _data_uri: string, request: Function, clearCache: Function, cacheItems: Function, checkCache: Function, search: Function}}
     */
    var TypeConfig = {
        _cache: {},
        _data: {},
        _data_uri: "/api/typeConfig/type",
        request: function (type, async) {
            var key = Util.key(type),
                typeObj = this._cache[key];
            if (typeObj) return typeObj;
            return this._cache[key] = $.io.get(!async, {
                url: this._data_uri,
                params: {
                    type: type
                }
            });
        },
        clearCache: function (type) {
            var _key = Util.key(type);
            Util.clear(this._cache, _key);
            Util.clear(this._data, _key);
        },
        cacheItems: function (type, data, propKey) {
            var _self = this;
            this._data[Util.key(type)] = {};
            $.each(data || [], function (i, v) {
                if (!v)return;
                _self._data[Util.key(type)][Util.key(v[propKey])] = v;
            });
        },
        checkCache: function (type) {
            return !!this._data[Util.key(type)];
        },
        search: function (type, key) {
            var _key = Util.key(type), obj = this._data[_key];
            return key && obj && obj[Util.key(key)] || null;
        }
    };
    var DomainReflect = {
        _cache: {},
        _data: {},
        _data_uri: "/api/reflect",
        _key: function (params) {
            return params.id + params.className + params.fields;
        },
        request: function (params, async) {
            var key = Util.key(this._key(params)),
                typeObj = this._cache[key];
            if (typeObj) return typeObj;
            return this._cache[key] = $.io.get(!async, {
                url: this._data_uri,
                params: params
            });
        },
        clearCache: function (params) {
            var _key = Util.key(this._key(params));
            Util.clear(this._cache, _key);
            Util.clear(this._data, _key);
        },
        cacheItems: function (params, data, propKey) {
            var _self = this, cacheKey = Util.key(this._key(params));
            this._data[cacheKey] = {};
            $.each(data || [], function (i, v) {
                if (!v)return;
                _self._data[cacheKey][Util.key(v[propKey])] = v;
            });
        },
        checkCache: function (params) {
            return !!this._data[Util.key(this._key(params))];
        },
        search: function (params, key) {
            var _key = Util.key(this._key(params)), obj = this._data[_key];
            return key && obj && obj[Util.key(key)] || null;
        }
    };
    $.extend(true, {
        project: {
            /**
             * @param async/type 是否异步/类型id
             * @param clear 是否先清空缓存
             * @returns {*}
             */
            type: function () {
                var args = Array.prototype.slice.apply(arguments), _async = false;
                if (args.length) {
                    if (args[0] && typeof args[0] == "boolean") _async = args.shift();
                    var type = args.shift();
                    if (args.shift()) TypeConfig.clearCache(type);
                    var xhr = TypeConfig.request(type, _async);
                    if (!_async) {
                        /**
                         * @param id typeId
                         * @param prop result->key/callback
                         * @returns {*}
                         */
                        xhr.getItem = function (id, prop) {
                            TypeConfig.checkCache(type) || xhr.success(function (data) {
                                TypeConfig.cacheItems(type, data, "id");
                            });
                            var result = TypeConfig.search(type, id);
                            if (prop && typeof prop == "function") {
                                return prop.call(this, result);
                            }
                            return result && (prop ? result[prop] : result) || null;
                        };
                    }
                    return xhr;
                }
                return null;
            },
            domain: function () {
                var args = Array.prototype.slice.apply(arguments), _async = false;
                if (args.length && args.length >= 2) {
                    if (args[0] && typeof args[0] == "boolean") _async = args.shift();
                    var ids = args.shift(), className = args.shift(), fields = args.shift(), params = {
                        id: typeof ids == "string" ? ids : ids && ids.toString() || "",
                        className: className,
                        fields: typeof fields == "string" ? fields : fields && fields.toString() || ""
                    };
                    if (args.shift()) TypeConfig.clearCache(params);
                    var xhr = DomainReflect.request(params, _async);
                    if (!_async) {
                        xhr.getItem = function (id, prop) {
                            DomainReflect.checkCache(params) || xhr.success(function (data) {
                                DomainReflect.cacheItems(params, data, "id");
                            });
                            var result = DomainReflect.search(params, id);
                            if (prop && typeof prop == "function") {
                                return prop.call(this, result);
                            }
                            return result && (prop ? result[prop] : result) || null;
                        };
                    }
                    return xhr;
                }
                return null;
            }
        }
    });
})(jQuery);
/**
 * plugins
 * some dom element render plugin
 */
(function ($) {
    var Constant = {
        empty: "",
        rest_total: "rest_total",
        button_disabled: "ui-state-disabled",
        pager_style: "page-bar dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_full_numbers",
        checkbox: "input[type=checkbox]",
        checkboxChecked: "input[type=checkbox]:checked"
    };
    var Element = {
        options: '{#if $P.defaultValue}<option value="{$P.defaultValue.value}">{$P.defaultValue.text}</option>{#/if}' +
        '{#foreach $T as item}{#param name=item value=$P.callback($T.item)}' +
        '<option value="{$P.item.value}">{$P.item.text}</option>' +
        '{#/for}',
        pager: '<a title="第一页" class="first ui-corner-tl ui-corner-bl fg-button ui-button ui-state-default mrg0L"><i class="icon-caret-left"></i></a>' +
        '<a title="上一页" class="prev fg-button ui-button ui-state-default"><i class="icon-angle-left"></i></a>' +
        '<span class="page-step">' +
        '{#for index = 1 to $T.maxPage}' +
        '<a title="第{$T.index}页" data-index="{$T.index}" class="fg-button ui-button ui-state-default{$T.currentPage==$T.index?\" ui-state-disabled\":\"\"}">{$T.index}</a>' +
        '{#/for}' +
        '</span>' +
        '<a title="下一页" class="next fg-button ui-button ui-state-default"><i class="icon-angle-right"></i></a>' +
        '<a title="最后一页" class="last ui-corner-tr ui-corner-br fg-button ui-button ui-state-default"><i class="icon-caret-right"></i></a>'
    };
    var Utils = {
        fetchCallback: function (data) {
            if (!$.io.isXHR(data)) {
                return {
                    success: function (fn) {
                        fn.call(this, data);
                    }
                };
            }
            return data;
        },
        addClass: function () {
            var args = Array.prototype.slice.apply(arguments);
            if (args.length) {
                var cls = args.shift();
                while (args.length) args.shift().addClass(cls);
            }
        },
        removeClass: function () {
            var args = Array.prototype.slice.apply(arguments);
            if (args.length) {
                var cls = args.shift();
                while (args.length) args.shift().removeClass(cls);
            }
        }
    };
    /**
     * select options
     * @param selector
     * @param data
     * @param fn
     * @param defaultValue
     * @constructor
     */
    var Select = function (selector, data, fn, defaultValue) {
        var _self = this;
        _self._callback = fn || function (item) {
                return {
                    text: item["mapName"],
                    value: item["id"]
                }
            };
        _self._object = $(selector);
        data = Utils.fetchCallback(data);
        data.success(function (response) {
            _self._object.renderData(Element.options, response, {
                callback: _self._callback,
                defaultValue: defaultValue || {
                    text: "请选择",
                    value: ""
                }
            });
        });
        _self.select = function (value) {
            var option = _self._object.find(["option[value=", value, "]"].join(Constant.empty));
            option.attr("selected", true);
            _self._selected = {
                text: option.text(),
                value: option.val()
            };
        };
        _self.getSelected = function () {
            return _self._selected || {};
        };
    };
    var Pager = function (selector, data, options) {
        var _self = this;
        options = $.extend(true, {pageSize: 10, maxPage: 10, currentPage: 1}, options);
        _self._object = $(selector);
        _self._object.addClass(Constant.pager_style);
        //固定第一页
        _self._firstPage = 1;
        _self._maxPage = options.maxPage && (options.maxPage < 36 ? options.maxPage : 36) || 10;
        _self._pageSize = options.pageSize && (options.pageSize < 100 ? options.pageSize : 100) || 10;
        _self._currentPage = options.currentPage || 1;
        _self._lastPage = 1;
        _self._resetCls = function (first, prev, last, next) {
            if (_self._currentPage == _self._firstPage) Utils.addClass(Constant.button_disabled, first, prev);
            if (_self._currentPage == _self._lastPage) Utils.addClass(Constant.button_disabled, last, next);
            Utils.addClass(Constant.button_disabled, _self._object.find(".page-step a[data-index=" + _self._currentPage + "]"));
        };
        _self._resetPage = function (pageStep, currentPage) {
            if (!currentPage.next().length && _self._currentPage < _self._lastPage) pageStep.append(pageStep.find("[data-index]:eq(0)").text(_self._currentPage + 1).attr("data-index", _self._currentPage + 1));
            if (!currentPage.prev().length && _self._currentPage > _self._firstPage) pageStep.find("[data-index]:eq(-1)").text(_self._currentPage - 1).attr("data-index", _self._currentPage - 1).insertBefore(pageStep.find("[data-index]:eq(0)"));
        };
        data = Utils.fetchCallback(data);
        data.success(function (response) {
            var total = response[Constant.rest_total] || _self._pageSize;
            //计算最后页
            _self._lastPage = (total && total > _self._pageSize && parseInt(total / _self._pageSize) - (total % _self._pageSize ? 0 : 1) || 0) + 1;
            _self._tmpMaxPage = _self._lastPage < _self._maxPage ? _self._lastPage : _self._maxPage;
            //渲染分页
            _self._object.renderData(Element.pager, {
                currentPage: _self._currentPage,
                maxPage: _self._tmpMaxPage
            }, _self._callback);
            //获取对象，绑定事件
            var first = _self._object.find(".first"), last = _self._object.find(".last"), prev = _self._object.find(".prev"), next = _self._object.find(".next");
            _self._resetCls(first, prev, last, next);
            _self._object.find(".ui-button").on("click", function () {
                var _this = $(this), pageStep = $(".page-step");
                if (_this.hasClass(Constant.button_disabled)) return false;
                _self._object.find(".ui-button." + Constant.button_disabled).removeClass(Constant.button_disabled);
                if (_this.hasClass("first")) {
                    _self._currentPage = _self._firstPage;
                    Utils.addClass(Constant.button_disabled, _this, prev);
                    pageStep.find("a[data-index]").each(function (i) {
                        var index = _self._currentPage + i;
                        $(this).attr({"data-index": index, "title": "第" + index + "页"}).text(index);
                    });
                } else if (_this.hasClass("last")) {
                    _self._currentPage = _self._lastPage;
                    Utils.addClass(Constant.button_disabled, _this, next);
                    pageStep.find("a[data-index]").each(function (i) {
                        var index = _self._currentPage + i + 1 - _self._tmpMaxPage;
                        $(this).attr({"data-index": index, "title": "第" + index + "页"}).text(index);
                    });
                } else if (_this.hasClass("next")) {
                    _self._currentPage += 1;
                    if (_self._currentPage >= _self._lastPage) Utils.addClass(Constant.button_disabled, _this, last);
                } else if (_this.hasClass("prev")) {
                    _self._currentPage -= 1;
                    if (_self._currentPage <= _self._firstPage) Utils.addClass(Constant.button_disabled, _this, first);
                } else {
                    _self._currentPage = parseInt(_this.attr("data-index"));
                    Utils.addClass(Constant.button_disabled, _this);
                }
                _self._resetCls(first, prev, last, next);
                _self._resetPage(pageStep, pageStep.find("." + Constant.button_disabled));
                _self.__fn && _self.__fn.call && _self.__fn.call(_self.__triggerObject, {
                    pagesize: _self._pageSize,
                    startposition: (_self._currentPage - 1) * _self._pageSize
                });
            });
        });
        _self.onChange = function (fn, _this) {
            _self.__triggerObject = _this;
            _self.__fn = fn;
        };
    };
    $.extend(true, {
        dom: {
            select: function (selector, data, fn, defaultValue) {
                return new Select(selector, data, fn, defaultValue);
            },
            pager: function (selector, data, options) {
                return new Pager(selector, data, options);
            },
            checkbox: function (selector, rootSelector, linkAge) {
                var checkbox = $(selector);
                checkbox.on("click", function () {
                    $(this).closest(rootSelector).find(Constant.checkbox).prop("checked", $(this).prop("checked"));
                });
                if (linkAge) {
                    $(rootSelector).find(Constant.checkbox).not(selector).on("click", function () {
                        var root = $(this).closest(rootSelector);
                        root.find(selector).prop("checked", root.find(Constant.checkboxChecked).not(selector).length);
                    });
                }
            }
        }
    })
})(jQuery);

/**
 * message
 */
(function ($) {
    $.extend(true, {
        message: {
            log: function (msg) {
                $.jGrowl(msg, {
                    sticky: false,
                    position: "top-right",
                    theme: "bg-green btn text-left"
                })
            },
            error: function (msg) {
                $.jGrowl(msg, {
                    sticky: false,
                    position: "top-right",
                    theme: "bg-red btn text-left"
                })
            }
        }
    });
})(jQuery);

/**
 * 图片显示组件
 */
(function ($) {
    $.extend(true, {
        images: {
            show: function (selector, arrayFiles, clickFunc) {
                var html = '';
                $.each(arrayFiles, function (file) {
                    var attachment_src = '../rest/file/download?path=' + file;
                    html += '<img class="attachment-img" title="' + file + '" src="' + attachment_src + '">';
                });
                $(selector).append(html);
                //绑定点击事件
                $(' .attachment-img').bind('click', function () {
                        if (clickFunc != null) {
                        clickFunc(filename);
                    }
                });
            }
        }
    });
})(jQuery);

(function ($) {
    $.utils.upload = $.utils.upload || function (options) {
            $(options.files).ajaxfileupload({
                action: '/rest/file/upload',
                params: options.params,
                submit_button: options.submit,
                onComplete: function (response) {
                    if (typeof response != "string" && !response.status) {
                        delete response.status;
                        options.error && options.error.call(options, response);
                    } else {
                        options.success && options.success.call(options, JSON.parse($(response).text()));
                    }
                },
                onStart: function () {
                },
                onCancel: function () {
                }
            });
        };
})(jQuery);