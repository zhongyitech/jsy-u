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
            $.dom.select(this.performance_ID, this.getPerformanceItem(), function (item) {
                return {
                    text: item["mapName"] + (item['description'] ? ' | ' + item['description'] : ''),
                    value: item["id"]
                }
            });
        }
    },
    getPerformanceItem: function () {
        var params = JSON.stringify({type: 8});
        var data = {url: '/api/typeConfig/type', params: params};
        var items = null;
        items = $.project.type(8).data();
//        $.io.syncGet(data)
//            .success(function (result) {
//                items = result;
//            });
        return items;
    },
    iniCompanyView: function (item) {
        var view = this.getCompanyView();
        if (view) {
            $.io.get(true, {url: '/api/fundCompanyInformation/selectList'}).success(function (result) {
                $.dom.select(view, result);
            });
        }
    },
    setCompany: function (item) {
        var id = COMPANY.toId(DEPARTMENT.toCompany(item));
        this.getCompanyView().val(id);
        if (item && item.parent) {
            $("#parentDepartment").val(item.parent.id);
        }
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
    setPerformance: function (item) {
        if (item) {
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

        var params={};
        if(id){
            params={depId:id};
        }
        $.io.get(true, {url: '/api/department/selectList',params:params}).success(function (result) {
            $.dom.select("#parentDepartment", result)
        });

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
                //$("#transferid").val({data:suggestion.data,departmentID:id});
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
                    var result = JSON.parse(response).rest_result;
                    var suggestions = result.suggestions;
                    result.suggestions = suggestions;
                    return result;
                }
            }
        });

        var me = this;
        $('#parentDepartment').change(function () {
            var id = $('#parentDepartment').val()
            if (id && id != "") {
                $.io.get({url: '/api/department/id', params: {id: id}}).success(function (result) {
                    if (result) {
                        me.getCompanyView().val(result.fundCompanyInformation.id)
                    }
                });
            } else {
                me.getCompanyView().val('')
            }
        });
        me.getCompanyView().change(function () {
            $.io.get({
                url: '/api/department/selectList',
                params: {pid: me.getCompanyView().val()}
            }).success(function (result) {
                $.dom.select("#parentDepartment", result)
            });
        });
    },
    set: function (item) {
        if (!item)return;
        this.item = item;
        this.setName(item);
        this.setCompany(item);
        this.setDescription(item);
        this.setPerformance(item);
        ''
        //部门负责人
        //todo:replace new method
        var uid = item.leader ? item.leader.id : undefined;
        var username = uid ? (USER.get(uid).chainName) : '';
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
        item['parent'] = $("#parentDepartment").val();

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
            .success(function (data) {
                $.message.log("保存成功!")
                window.location = PAGE.DEPARTMENT_LIST;
            })
            .error(function (data) {
                $.message.error(data.msg);
            });
    }
};

