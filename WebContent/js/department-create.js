//数据加载、按钮点击事件等
$(document).ready(function () {
    DEPARTMENT_FORM.ini(true);
});

//部门信息表单
var DEPARTMENT_FORM = {
    VIEW_ID: '#department-view',
    FORM_ID: '#department-form',
    SUBMIT_ID: '#submit-button',
    NAME_ID: '#name',
    COMPANY_ID: '#company',
    performance_ID: '#performance',
    DESCRIPTION_ID: '#description',
    item: {},
    getView: function () {
        return $(this.VIEW_ID);
    },
    getForm: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.FORM_ID);
        }
    },
    getNameView: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.NAME_ID);
        }
    },
    getCompanyView: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.COMPANY_ID);
        }
    },
    iniCompanyView: function (item) {
        var view = this.getCompanyView();
        if (view) {
            var items = COMPANY.getItems();
            var option = $('<option value=""></option>');
            view.append(option);
            for (var i in items) {
                var item = items[i];
                var id = COMPANY.toId(item);
                var name = COMPANY.toName(item);
                var option = $('<option value="' + id + '">' + name + '</option>');
                view.append(option);
            }
        }
    },
    //职能选择框
    iniPerformanceView: function () {
        var view = $(this.performance_ID);
        if (view) {
//            var items = this.getPerformanceItem();
//            for (var i in items) {
//                var item = items[i];
//                var id = item.id;
//                var name = item.mapName;
//                var option = $('<option value="' + id + '">' + name + '</option>');
//                view.append(option);
//            }
            $.dom.select(this.performance_ID, this.getPerformanceItem(),function(item){
                return {
                    text:item["mapName"]+(item['description'] ? ' | '+item['description'] :''),
                    value:item["id"]
                }
            });
        }
    },
    getPerformanceItem: function () {
        var params = JSON.stringify({type: 8});
        var data = {url: '/api/typeConfig/type', params: params};
        var items = null;
        $.project.type(8,true).success(function(result){
            items = result;
        });
        return items;
    },
    getDescriptionView: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.DESCRIPTION_ID);
        }
    },
    getSubmitButton: function () {
        var view = this.getView();
        if (view) {
            return view.find(this.SUBMIT_ID);
        }
    },
    iniSubmitButton: function () {
        var me = this;
        var button = this.getSubmitButton();
        if (button) {
            button.click(function () {
                me.submit();
            });
        }
    },
    ini: function (async) {
        if (!async) {
            async = false;
        }

        this.iniCompanyView();
        this.iniPerformanceView();

        this.iniSubmitButton();

        $('#transfer').autocomplete({
            serviceUrl: '../rest/auto/get',
            type: 'POST',
            params: {
                url: '/api/user/nameLike'
            },
            paramName: 'params',
            onSelect: function (suggestion) {
                //console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
                $("#transferid").val(suggestion.data);
            },
            transformResult: function (response) {
                //clear old value
                $("#transferid").val("");
                if (!response || response == '') {
                    return {
                        "query": "Unit",
                        "suggestions": []
                    };
                } else {
                    var result = JSON.parse(response);
                    var suggestions = JSON.parse(result.suggestions);
                    result.suggestions = suggestions;
                    return result;
                }
            }
        });
    },
    getItem: function () {
        var me = this;
        var item = me.item;

        var name = this.getNameView().val();
        if (name) {
            item[DEPARTMENT.NAME_KEY] = name;
        }

        var company = this.getCompanyView().val();
        if (company) {
            item[DEPARTMENT.COMPANY_KEY] = {id: company};
        }

        var description = this.getDescriptionView().val();
        if (description) {
            item[DEPARTMENT.DESCRIPTION_KEY] = description;
        }
        item['performance'] = $(this.performance_ID).val();

//        item['leader']=$('#transferid').val();
        me.item = item;
        return item;
    },
    submit: function () {//提交
        var me = this;
        var item = me.getItem();
        var params = JSON.stringify({});
        var entity = JSON.stringify(item);
        var data = {url: '/api/department', params: params, entity: entity};

        $.io.put(data)
            .success(function (result) {
                window.location = PAGE.DEPARTMENT_LIST;
            })
            .error(function (result) {
                alert("创建部门失败：" + result);
            });
//
//        DataOperation.async = true;
//        DataOperation.post(
//            data,
//            function (result) {
//                window.location = PAGE.DEPARTMENT_LIST;
//            },
//            function (msg) {
//                alert("创建部门失败：" + msg);
//            }
//        );
//        $.ajax({
//            type: "post",
//            url: "../rest/item/post",
//            async: true,
//            data: data,
//            dataType: "json",
//            success: function (response) {
//                me.response = response;
//                window.location = PAGE.DEPARTMENT_LIST;
//            },
//            error: function (response) {
//                me.response = response;
//                if (LOGIN.error(response)) {
//                    alert('提交失败，请补全带*号的必填信息.');
//                }
//            }
//        });
    }
};

