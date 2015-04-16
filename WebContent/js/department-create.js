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
            $.io.get(true, {url: '/api/fundCompanyInformation/selectList'}).success(function (result) {
                $.dom.select(view, result);
            });
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
            view.val(21);
        }
    },
    getPerformanceItem: function () {
        return $.project.type(8);
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
        $("#submit-continue-button").click(function () {
            me.submit(true);
        });
    },
    ini: function (async) {
        if (!async) {
            async = false;
        }

        this.iniCompanyView();
        this.iniPerformanceView();

        this.iniSubmitButton();

        $.io.get({url: '/api/department/selectList'}).success(function (result) {
            $.dom.select("#parentDepartment", result)
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
        item['parent'] = $("#parentDepartment").val();

//        item['leader']=$('#transferid').val();
        me.item = item;
        return item;
    },
    submit: function (contiune) {//提交
        var me = this;
        var item = me.getItem();
        var params = JSON.stringify({});
        var entity = JSON.stringify(item);
        var data = {url: '/api/department', params: params, entity: entity};

        $.io.put(data)
            .success(function (result) {
                $.message.log("创建部门成功");
                if(contiune){
                    me.getNameView().val('');
                }else {
                    window.location = PAGE.DEPARTMENT_LIST;
                }
            })
            .error(function (result) {
                $.message.error("创建部门失败");
            });
    }
};

