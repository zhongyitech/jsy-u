/**
 * 全部流程都在一个页面内展现，这里统一处理
 * @type {{stepPanels: string[], gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string, currentStep: string, show: Function, gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string}}
 */
var FLOW={
    projectid:null,

    file: FILE,

    stepPanels:["panel_gatherInfo","panel_gatheerOA","panel_research","panel_researchOA","panel_meeting","panel_otherEA","panel_addCompany","panel_makeContact","panel_makeContactOA"],

    //panel_gatherInfo
    certificateFiles_attachments: [],
    debtFiles_attachments: [],
    financialFiles_attachments: [],
    toPublicFiles_attachments: [],
    businessPlanFiles_attachments: [],
    other_attachments: [],

    gatherOA:"#panel_gatherOA",
    research:"#panel_research",
    researchOA:"#panel_researchOA",
    meeting:"#panel_meeting",
    otherEA:"#panel_otherEA",
    addCompany:"#panel_addCompany",
    makeContact:"#panel_makeContact",
    makeContactOA:"#panel_makeContactOA",

    currentStep:"",

    /**
     * 尝试联系后台获取数据，后台会根据请求的项目id，返回模块的信息，显示的内容有
     * 节点是否可见
     * 节点是否可编辑
     * 节点的具体内容
     *
     */
    show: function(projectid){
        this.projectid=projectid;

        this.getStepInfo();
    },
    getStepInfo: function(){
        var me = this;
        this.request_step_data(function(result){
            if(!result || !result.rest_result){
                return;
            }
            var rest_result = JSON.parse(result.rest_result);
            if(rest_result.gatherInfoBean){
                me.init_gatherInfo(rest_result.gatherInfoBean);
            }
            if(rest_result.gatherOABean){
                me.init_gatherOA();
            }
            if(rest_result.researchBean){
                me.init_research();
            }
            if(rest_result.researchOABean){
                me.init_researchOA();
            }
            if(rest_result.meetingBeans){
                me.init_meeting();
            }
            if(rest_result.otherEABean){
                me.init_otherEA();
            }
            if(rest_result.addCompanyBean){
                me.init_addCompany();
            }
            if(rest_result.makeContactBean){
                me.init_makeContact();
            }
            if(rest_result.makeContactOABean){
                me.init_makeContactOA();
            }

        },function(result){
            console.log("err",result);
        });

    },
    request_step_data: function(suc,err){
        var model = {
            projectid:this.projectid
        };

        var me = this;
        var data = {url: '/api/project/stepInfo', params: JSON.stringify(model)};
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: suc,
            error: err
        });
    },
    init_gatherInfo: function(gatherInfoBean){
        var me = this;
        //初始化事件
        $("#certificateFiles").change(function() {
            me.certificateFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#debtFiles").change(function() {
            me.debtFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#financialFiles").change(function() {
            me.financialFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#toPublicFiles").change(function() {
            me.toPublicFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#businessPlanFiles").change(function() {
            me.businessPlanFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#attachment_1").change(function() {
            me.other_attachments.push({index:1,files:me.file.upload($(this)[0].files)});
        });


        $("#gatherInfo_add_file").click(function () {
            var i =$("div .input-file","#others_files").length+1;
            var others_files = $("#others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-6">');
            var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv.append(descarea);
            appenddiv.append(descdiv);

            others_files.append(appenddiv);

            fileinput.change(function () {
                me.other_attachments.push({index:i,files:me.file.upload($(this)[0].files)});
            });
        });


        $("#complete_gather").click(function(){
            var certificateFilesDesc= $("#certificateFilesDesc").val();
            var debtFilesDesc= $("#debtFilesDesc").val();
            var financialFilesDesc= $("#financialFilesDesc").val();
            var toPublicFilesDesc= $("#toPublicFilesDesc").val();
            var businessPlanFilesDesc= $("#businessPlanFilesDesc").val();


            $.each(me.other_attachments, function( index, attachment ) {
                attachment.desc=$("#attachment_txt_"+attachment.index).val();
            });

            var model = {
                projectid:me.projectid,
                certificateFilesDesc:certificateFilesDesc,
                debtFilesDesc:debtFilesDesc,
                financialFilesDesc:financialFilesDesc,
                toPublicFilesDesc:toPublicFilesDesc,
                businessPlanFilesDesc:businessPlanFilesDesc,
                certificateFiles_attachments: me.certificateFiles_attachments,
                debtFiles_attachments: me.debtFiles_attachments,
                financialFiles_attachments: me.financialFiles_attachments,
                toPublicFiles_attachments: me.toPublicFiles_attachments,
                businessPlanFiles_attachments: me.businessPlanFiles_attachments,
                other_attachments: me.other_attachments
            };

            me.post_complete_gather(model);

        });

        //加载数据
        //项目证照
        if(gatherInfoBean.certificateFiles_attachments && gatherInfoBean.certificateFiles_attachments.length > 0){
            $.each(gatherInfoBean.certificateFiles_attachments,function(index,obj){
                var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                fileli.append(delspan);
                delspan.click(function () {
                    console.log("del",obj.fileName,obj.filePath);
                });
                
                $("#exist_certificateFiles").append(fileli);
            });
        }
        if(gatherInfoBean.certificateFilesDesc){
            $("#certificateFilesDesc").val(gatherInfoBean.certificateFilesDesc);
        }
        //债务报告
        if(gatherInfoBean.debtFiles_attachments && gatherInfoBean.debtFiles_attachments.length > 0){
            $.each(gatherInfoBean.debtFiles_attachments,function(index,obj){

                var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                fileli.append(delspan);
                delspan.click(function () {
                    console.log("del",obj.fileName,obj.filePath);
                });

                $("#exist_debtFiles").append(fileli);
            });
        }
        if(gatherInfoBean.debtFilesDesc){
            $("#debtFilesDesc").val(gatherInfoBean.debtFilesDesc);
        }
        //财务报表
        if(gatherInfoBean.financialFiles_attachments && gatherInfoBean.financialFiles_attachments.length > 0){
            $.each(gatherInfoBean.financialFiles_attachments,function(index,obj){
                var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                fileli.append(delspan);
                delspan.click(function () {
                    console.log("del",obj.fileName,obj.filePath);
                });

                $("#exist_financialFiles").append(fileli);
            });
        }
        if(gatherInfoBean.financialFilesDesc){
            $("#financialFilesDesc").val(gatherInfoBean.financialFilesDesc);
        }
        //对公批文
        if(gatherInfoBean.toPublicFiles_attachments && gatherInfoBean.toPublicFiles_attachments.length > 0){
            $.each(gatherInfoBean.toPublicFiles_attachments,function(index,obj){
                var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                fileli.append(delspan);
                delspan.click(function () {
                    console.log("del",obj.fileName,obj.filePath);
                });
                $("#exist_toPublicFiles").append(fileli);
            });
        }
        if(gatherInfoBean.toPublicFilesDesc){
            var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
            var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
            fileli.append(delspan);
            delspan.click(function () {
                console.log("del",obj.fileName,obj.filePath);
            });
            $("#toPublicFilesDesc").val(fileli);
        }
        //商务计划
        if(gatherInfoBean.businessPlanFiles_attachments && gatherInfoBean.businessPlanFiles_attachments.length > 0){
            $.each(gatherInfoBean.businessPlanFiles_attachments,function(index,obj){
                var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                fileli.append(delspan);
                delspan.click(function () {
                    console.log("del",obj.fileName,obj.filePath);
                });
                $("#exist_businessPlanFiles").append(fileli);
            });
        }
        if(gatherInfoBean.businessPlanFilesDesc){
            $("#businessPlanFilesDesc").val(gatherInfoBean.businessPlanFilesDesc);
        }
        //other
        if(gatherInfoBean.other_attachments && gatherInfoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(gatherInfoBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#others_files").length+1;
                var others_files = $("#exist_others");

                var appenddiv = $("<div>");
                var filediv = $('<div class="form-input col-md-4">');
                var div = $('<div>');
                var ul = $('<ul>');
                div.append(ul);
                filediv.append(div);
                appenddiv.append(filediv);
                var descdiv = $('<div class="form-input col-md-6">');
                var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
                descdiv.append(descarea);


                var deldiv = $('<div class="form-input col-md-2">');
                var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
                delspan.click(function () {
                    console.log("del",obj);
                });
                deldiv.append(delspan);

                appenddiv.append(descdiv);
                appenddiv.append(deldiv);

                others_files.append(appenddiv);

                $.each(obj.files,function(index2,obj2){
                    var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj2.fileName+"&path="+obj2.filePath+"'>"+obj2.fileName+"</li>");
                    ul.append(fileli);
                });

                descarea.val(obj.pdesc);
            });
        }




        //处理显示效果
        console.log("showing gatherInfo");
        //开始加载该模块的数据
        if(gatherInfoBean.accessable){//可以编辑

        }else{//不可以编辑

        }
        $("#panel_gatherInfo").show();
    },

    del_file: function(fileName, filePath){
        var me = this;
        var data = {url: '/api/project/complete_gather', entity: JSON.stringify(model)};
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "200"){
                    me.result = result;
                    window.location.href = "projectinfo.jsp?id="+me.projectid;
                }

            },
            error: function(result){
                isAllSuc = false;
                if(LOGIN.error(result)){
                    return;
                }
                alert('提交时错误.');
            }
        });
    },

    post_complete_gather: function(model){
        console.log("model:",JSON.stringify(model));

        var me = this;
        var data = {url: '/api/project/complete_gather', entity: JSON.stringify(model)};
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/post',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "200"){
                    me.result = result;
                    window.location.href = "projectinfo.jsp?id="+me.projectid;
                }

            },
            error: function(result){
                isAllSuc = false;
                if(LOGIN.error(result)){
                    return;
                }
                alert('提交时错误.');
            }
        });
    }

}


