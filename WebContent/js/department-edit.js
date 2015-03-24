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
    DESCRIPTION_ID: '#description',
    item: {},
    performance_ID: '#performance',
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
    setName: function (item) {
        this.getNameView().val(DEPARTMENT.toName(item));
    },
    getCompanyView: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.COMPANY_ID);
        }
    },
    //职能选择框
    iniPerformanceView: function () {
        var view = $(this.performance_ID);
        if (view) {
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
        items= $.project.type(8).data();
//        $.io.syncGet(data)
//            .success(function (result) {
//                items = result;
//            });
        return items;
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
    setCompany: function (item) {
        var id = COMPANY.toId(DEPARTMENT.toCompany(item));
        this.getCompanyView().val(id);
    },
    getDescriptionView: function () {
        var form = this.getForm();
        if (form) {
            return form.find(this.DESCRIPTION_ID);
        }
    },
    setDescription: function (item) {
        this.getDescriptionView().val(DEPARTMENT.toDescription(item));
    },
    setPerformance:function(item){
        if(item){
            $(this.performance_ID).val(item.performance.id);
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

        var id = PAGE.getParam(DEPARTMENT.ID_KEY);
        if (id) {
            var item = DEPARTMENT.get(id);
            this.set(item);
        }
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
    set: function (item) {
        if(!item)return;
        this.item = item;
        this.setName(item);
        this.setCompany(item);
        this.setDescription(item);
        this.setPerformance(item);''
        //部门负责人
        //todo:replace new method
        var uid=item.leader ? item.leader.id : undefined;
        var username= uid ? (USER.get(uid).chainName) :'';
        $('#transfer').val(username);
        $('#transferid').val(uid);
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
        item['leader'] = $('#transferid').val();
        item['performance'] = $(this.performance_ID).val();
        me.item = item;
        return item;
    },
    submit: function () {//提交
        var me = this;
        var item = me.getItem();
        var params = JSON.stringify({id: DEPARTMENT.toId(item)});
        var entity = JSON.stringify(item);
        var data = {url: '/api/department', params: params, entity: entity};
        $.io.post(data)
            .success(function(data){
                window.location = PAGE.DEPARTMENT_LIST;
            })
            .error(function(data){
            });
//        DataOperation.post(
//            data,
//            function(result){
//                window.location = PAGE.DEPARTMENT_LIST;
//            },
//            function(msg){
//                alert(msg);
//            }
//        )
//        $.ajax({
//            type: "post",
//            url: "../rest/item/put",
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

