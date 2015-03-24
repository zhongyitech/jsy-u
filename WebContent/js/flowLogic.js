/**
 * 全部流程都在一个页面内展现，这里统一处理
 * @type {{stepPanels: string[], gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string, currentStep: string, show: Function, gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string}}
 */
var FLOW={
    projectid:null,

    file: FILE,

    stepPanels:["panel_gatherInfo","panel_gatherOA","panel_research","panel_researchOA","panel_meeting","panel_otherEA","panel_makeContact","panel_makeContactOA"],

    //panel_gatherInfo
    certificateFiles_attachments: [],
    debtFiles_attachments: [],
    financialFiles_attachments: [],
    toPublicFiles_attachments: [],
    businessPlanFiles_attachments: [],
    other_attachments: [],

    //research
    lowFiles_attachments: [],
    projectFiles_attachments: [],
    finanFiles_attachments: [],
    research_other_attachments: [],

    //meetings
    meetingFiles_attachments: [],
    meeting_other_attachments: [],

    //thirdpartyLow
    thirdpartyLowFiles_attachments: [],
    thirdpartyLow_other_attachments: [],

    //makeContact
    makeContact_other_attachments: [],

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
            me.init_project(rest_result.project);
            if(rest_result.gatherInfoBean){
                me.init_gatherInfo(rest_result.gatherInfoBean);
            }
            if(rest_result.gatherOABean){
                me.init_gatherOA(rest_result.gatherOABean);
            }
            if(rest_result.researchBean){
                me.init_research(rest_result.researchBean);
            }
            if(rest_result.researchOABean){
                me.init_researchOA(rest_result.researchOABean);
            }
            if(rest_result.meetingBeans){
                me.init_meeting(rest_result.meetingBeans);
            }
            if(rest_result.otherEABean){
                me.init_otherEA(rest_result.otherEABean);
            }
            //if(rest_result.addCompanyBean){
            //    me.init_addCompany(rest_result.addCompanyBean);
            //}
            if(rest_result.makeContactBean){
                me.init_makeContact(rest_result.makeContactBean);
            }
            if(rest_result.makeContactOABean){
                me.init_makeContactOA(rest_result.makeContactOABean);
            }

        },function(result){
            console.log("err",result);
        });

    },

    init_project: function(project){
        if(!project)return;
        $("#project_id").html(project.id);
        $("#project_name").html(project.name);
        $("#fund_name").html(project.fundNames);
        $("#currentStageName").html(project.currentStageName);
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

            me.post_complete('/api/project/complete_gather', model);

        });

        /***加载数据***/
        //项目证照
        if(gatherInfoBean.certificateFiles_attachments && gatherInfoBean.certificateFiles_attachments.length > 0){
            $.each(gatherInfoBean.certificateFiles_attachments,function(index,obj){
                var fileli= me._construct_fileli(obj);
                
                $("#exist_certificateFiles").append(fileli);
            });
        }
        if(gatherInfoBean.certificateFilesDesc){
            $("#certificateFilesDesc").val(gatherInfoBean.certificateFilesDesc);
        }
        //债务报告
        if(gatherInfoBean.debtFiles_attachments && gatherInfoBean.debtFiles_attachments.length > 0){
            $.each(gatherInfoBean.debtFiles_attachments,function(index,obj){

                var fileli= me._construct_fileli(obj);

                $("#exist_debtFiles").append(fileli);
            });
        }
        if(gatherInfoBean.debtFilesDesc){
            $("#debtFilesDesc").val(gatherInfoBean.debtFilesDesc);
        }
        //财务报表
        if(gatherInfoBean.financialFiles_attachments && gatherInfoBean.financialFiles_attachments.length > 0){
            $.each(gatherInfoBean.financialFiles_attachments,function(index,obj){
                var fileli= me._construct_fileli(obj);

                $("#exist_financialFiles").append(fileli);
            });
        }
        if(gatherInfoBean.financialFilesDesc){
            $("#financialFilesDesc").val(gatherInfoBean.financialFilesDesc);
        }
        //对公批文
        if(gatherInfoBean.toPublicFiles_attachments && gatherInfoBean.toPublicFiles_attachments.length > 0){
            $.each(gatherInfoBean.toPublicFiles_attachments,function(index,obj){
                var fileli= me._construct_fileli(obj);
                $("#exist_toPublicFiles").append(fileli);
            });
        }
        if(gatherInfoBean.toPublicFilesDesc){
            var fileli= me._construct_fileli(obj);
            $("#toPublicFilesDesc").val(fileli);
        }
        //商务计划
        if(gatherInfoBean.businessPlanFiles_attachments && gatherInfoBean.businessPlanFiles_attachments.length > 0){
            $.each(gatherInfoBean.businessPlanFiles_attachments,function(index,obj){
                var fileli= me._construct_fileli(obj);
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
                descarea.val(obj.desc);
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

            });
        }




        //处理显示效果
        if(gatherInfoBean.accessable){//可以编辑
            console.log("can modify gatherInfo");
        }else{//不可以编辑
            $("input[name='attachment']","#form_gatherInfo").hide();

            $("textarea[name='input_text']","#form_gatherInfo").attr('readonly','readonly');
            $('textarea','#others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#gatherInfo_add_file").hide();
            $("button[type='button']","#form_gatherInfo").hide();
            console.log("can not modify gatherInfo");
        }
        $("#panel_gatherInfo").show();

    },

    _construct_fileli: function(obj){
        var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
        var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        fileli.append(delspan);
        delspan.click(function () {
            console.log("del",obj.fileName,obj.filePath);
        });
        return fileli;
    },

    init_gatherOA: function(gatherOABean){
        var me = this;
        //初始化事件


        /***加载数据***/


        //处理显示效果
        if(gatherOABean.accessable){//可以编辑
            console.log("can modify gatherOA");
        }else{//不可以编辑
            console.log("can not modify gatherOA");
        }

        $("#panel_gatherOA").show();
    },

    init_research: function(researchBean){
        var me = this;
        //初始化事件
        $("#lowFiles").change(function() {
            me.lowFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#projectFiles").change(function() {
            me.projectFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#finanFiles").change(function() {
            me.finanFiles_attachments = me.file.upload($(this)[0].files);
        });
        $("#research_attachment_1").change(function() {
            me.research_other_attachments.push({index:1,files:me.file.upload($(this)[0].files)});
        });

        $("#research_add_file").click(function () {
            var i =$("div .input-file","#research_others_files").length+1;
            var others_files = $("#research_others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-4">');
            var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv.append(descarea);
            appenddiv.append(descdiv);

            var descdiv2 = $('<div class="form-input col-md-4">');
            var descarea2 = $('<textarea id="attachment2_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv2.append(descarea2);
            appenddiv.append(descdiv2);

            others_files.append(appenddiv);

            fileinput.change(function () {
                me.research_other_attachments.push({index:i,files:me.file.upload($(this)[0].files)});
            });
        });


        $("#complete_research").click(function(){
            var lowDesc= $("#lowDesc").val();
            var lowDesc2= $("#lowDesc2").val();
            var projectDesc= $("#projectDesc").val();
            var projectDesc2= $("#projectDesc2").val();
            var finanDesc= $("#finanDesc").val();
            var finanDesc2= $("#finanDesc2").val();


            $.each(me.other_attachments, function( index, attachment ) {
                attachment.desc=$("#attachment_txt_"+attachment.index).val();
                attachment.desc2=$("#attachment2_txt_"+attachment.index).val();
            });

            var model = {
                projectid:me.projectid,

                lowDesc:lowDesc,
                projectDesc:projectDesc,
                finanDesc:finanDesc,
                lowDesc2:lowDesc2,
                projectDesc2:projectDesc2,
                finanDesc2:finanDesc2,


                lowFiles_attachments: me.lowFiles_attachments,
                projectFiles_attachments: me.projectFiles_attachments,
                finanFiles_attachments: me.finanFiles_attachments,
                research_other_attachments: me.research_other_attachments
            };

            me.post_complete('/api/project/complete_research', model);

        });

        /***加载数据***/
        //法律进调报告
        if(researchBean.lawTransfer && researchBean.lawTransfer.length > 0){
            $.each(researchBean.lawTransfer,function(index,obj){
                var fileli= me._construct_fileli(obj);

                $("#exist_lowFiles").append(fileli);
            });
        }
        if(researchBean.lawTransfer_pdesc) {
            $("#lowDesc").val(researchBean.lawTransfer_pdesc);
        }
        if(researchBean.lawTransfer_pdesc2) {
            $("#lowDesc2").val(researchBean.lawTransfer_pdesc2);
        }

        //项目进调报告
        if(researchBean.projectTransfer && researchBean.projectTransfer.length > 0){
            $.each(researchBean.projectTransfer,function(index,obj){
                var fileli= me._construct_fileli(obj);
                $("#exist_projectFiles").append(fileli);
            });
        }
        if(researchBean.lawTransfer_pdesc) {
            $("#projectDesc").val(researchBean.projectTransfer_pdesc);
        }
        if(researchBean.lawTransfer_pdesc2) {
            $("#projectDesc2").val(researchBean.projectTransfer_pdesc2);
        }

        //财务报告
        if(researchBean.financialReport && researchBean.financialReport.length > 0){
            $.each(researchBean.projectTransfer,function(index,obj){
                var fileli= me._construct_fileli(obj);
                $("#exist_finanFiles").append(fileli);
            });
        }
        if(researchBean.financialReport_pdesc) {
            $("#finanDesc").val(researchBean.financialReport_pdesc);
        }
        if(researchBean.financialReport_pdesc2) {
            $("#finanDesc2").val(researchBean.financialReport_pdesc2);
        }


        //other
        if(researchBean.other_attachments && researchBean.other_attachments.length > 0){
            //empty

            //add
            $.each(researchBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#others_files").length+1;
                var others_files = $("#exist_others");

                var appenddiv = $("<div>");
                var filediv = $('<div class="form-input col-md-4">');
                var div = $('<div>');
                var ul = $('<ul>');
                div.append(ul);
                filediv.append(div);
                appenddiv.append(filediv);

                var descdiv = $('<div class="form-input col-md-4">');
                var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
                descarea.val(obj.desc);
                descdiv.append(descarea);

                var descdiv2 = $('<div class="form-input col-md-4">');
                var descarea2 = $('<textarea id="attachment2_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
                descarea2.val(obj.desc2);
                descdiv.append(descarea2);


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

            });
        }

        /****处理显示效果****/
        if(researchBean.accessable){//可以编辑
            console.log("can modify research");
        }else{//不可以编辑
            $("input[name='attachment']","#form_research").hide();

            $("textarea[name='input_text']","#form_research").attr('readonly','readonly');
            $('textarea','#research_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#research_add_file").hide();
            $("button[type='button']","#form_research").hide();
            console.log("can not modify research");
        }

        $("#panel_research").show();
    },


    init_researchOA: function(researchOABean){
        var me = this;
        /***初始化事件***/

        /***加载数据***/

        /****处理显示效果****/
        if(researchOABean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        $("#panel_researchOA").show();
    },

    init_meeting: function(meetingBeans){
        var me = this;
        /***初始化事件***/
        $("#meetingFiles").change(function() {
            me.meetingFiles_attachments = me.file.upload($(this)[0].files);
        });

        $("#meeting_attachment_1").change(function() {
            me.meeting_other_attachments.push({index:1,files:me.file.upload($(this)[0].files)});
        });

        $("#meeting_add_file").click(function () {
            var i =$("div .input-file","#meeting_others_files").length+1;
            var others_files = $("#meeting_others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="meeting_attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-6">');
            var descarea = $('<textarea id="meeting_attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv.append(descarea);
            appenddiv.append(descdiv);


            others_files.append(appenddiv);

            fileinput.change(function () {
                me.meeting_other_attachments.push({index:i,files:me.file.upload($(this)[0].files)});
            });
        });

        $("#complete_meeting").click(function(){
                var meetingDesc= $("#meetingDesc").val();

                $.each(me.meeting_other_attachments, function( index, attachment ) {
                    attachment.desc=$("#meeting_attachment_txt_"+attachment.index).val();
                });

                var model = {
                    projectid:me.projectid,
                    meetingDesc:meetingDesc,
                    meetingFiles_attachments: me.meetingFiles_attachments,
                    meeting_other_attachments: me.meeting_other_attachments
                };

                me.post_complete('/api/project/complete_meeting', model);

        });

        /***加载数据***/
        //纪要
        if(meetingBeans.meetingRecord && meetingBeans.meetingRecord.length > 0){
            $.each(meetingBeans.meetingRecord,function(index,obj){
                var fileli= me._construct_fileli(obj);

                $("#exist_meetingFiles").append(fileli);
            });
        }
        if(meetingBeans.meetingDesc) {
            $("#meetingDesc").val(meetingDesc.meetingDesc);
        }

        /****处理显示效果****/
        if(meetingBeans.accessable){//可以编辑
            console.log("can modify meeting");
        }else{//不可以编辑
            $("input[name='attachment']","#form_meeting").hide();

            $("textarea[name='input_text']","#form_meeting").attr('readonly','readonly');
            $('textarea','#meeting_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#meeting_add_file").hide();
            $("button[type='button']","#form_meeting").hide();
            console.log("can not modify meeting");
        }

        $("#panel_meeting").show();
    },

    init_otherEA: function(otherEABean){
        var me = this;
        /***初始化事件***/
        $("#thirdpartyLowFiles").change(function() {
            me.thirdpartyLowFiles_attachments = me.file.upload($(this)[0].files);
        });

        $("#thirdpartyLow_attachment_1").change(function() {
            me.thirdpartyLow_other_attachments.push({index:1,files:me.file.upload($(this)[0].files)});
        });

        $("#thirdpartyLow_add_file").click(function () {
            var i =$("div .input-file","#thirdpartyLow_others_files").length+1;
            var others_files = $("#thirdpartyLow_others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="thirdpartyLow_attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-6">');
            var descarea = $('<textarea id="thirdpartyLow_attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv.append(descarea);
            appenddiv.append(descdiv);


            others_files.append(appenddiv);

            fileinput.change(function () {
                me.thirdpartyLow_other_attachments.push({index:i,files:me.file.upload($(this)[0].files)});
            });
        });

        $("#complete_thirdpartyLow").click(function(){
            var thirdpartyLowDesc= $("#thirdpartyLowDesc").val();

            $.each(me.meeting_other_attachments, function( index, attachment ) {
                attachment.desc=$("#thirdpartyLow_attachment_txt_"+attachment.index).val();
            });

            var model = {
                projectid:me.projectid,
                thirdpartyLowDesc:thirdpartyLowDesc,
                thirdpartyLowFiles_attachments: me.thirdpartyLowFiles_attachments,
                thirdpartyLow_other_attachments: me.thirdpartyLow_other_attachments
            };

            me.post_complete('/api/project/complete_thirdpartyLow', model);

        });

        /***加载数据***/
        if(otherEABean.thirdPartyFile && otherEABean.thirdPartyFile.length > 0){
            $.each(otherEABean.thirdPartyFile,function(index,obj){
                var fileli= me._construct_fileli(obj);

                $("#exist_thirdpartyLowFiles").append(fileli);
            });
        }
        if(otherEABean.thirdPartyDesc) {
            $("#thirdpartyLowDesc").val(meetingDesc.thirdPartyDesc);
        }

        /****处理显示效果****/
        if(otherEABean.accessable){//可以编辑
            console.log("can modify otherEA");
        }else{//不可以编辑
            $("input[name='attachment']","#form_thirdpartyLow").hide();

            $("textarea[name='input_text']","#form_thirdpartyLow").attr('readonly','readonly');
            $('textarea','#thirdpartyLow_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#thirdpartyLow_add_file").hide();
            $("button[type='button']","#form_thirdpartyLow").hide();

            console.log("can not modify otherEA");
        }

        $("#panel_otherEA").show();
    },

    init_addCompany: function(addCompanyBean){
        var me = this;
        /***初始化事件***/
        $("#complete_addCompany").click(function(){

            var selectedCompany= $("#company").val();


            var model = {
                projectid:me.projectid,
                companyid:selectedCompany
            };

            me.post_complete('/api/project/complete_addCompany', model);
        });


        /***加载数据***/
        me.getCompany();

        /****处理显示效果****/
        if(addCompanyBean.accessable){//可以编辑
            console.log("can modify addCompany");
        }else{//不可以编辑
            $("#company").attr('readonly','readonly');
            $("button[type='button']","#form_addCompany").hide();

            console.log("can not modify addCompany");
        }

        $("#panel_addCompany").show();
    },

    init_makeContact: function(makeContactBean){
        var me = this;

        /***初始化事件***/
        $("#add_newAttention").click(function(){
            var attention_name = $("#attention_name").val();
            var attention_value =$("#attention_value").val();
            if(!attention_name || attention_name == ''){
                alert("请输入注意事项");
                return false;
            }
            if(!attention_value || attention_value == ''){
                alert("请输入风险提示栏");
                return false;
            }

            var size = $('#attentions > tbody>tr').size()+1;

            $('#attentions > tbody:last').append('<tr><td>'+attention_name+'<input id="attname'+size+'" type="hidden" value="'+attention_name+'"/></td><td>'+attention_value+'<input id="attvalue'+size+'" type="hidden" value="'+attention_value+'"/></td></tr>');
            return false;
        });

        $("#add_more_signer").click(function(){
            var name = $("#signX_name").val();
            var value = $("#signX_value").val();
            var size =  $("input[name='exist_signer']").size();

            $("#signX_name").val("");
            $("#signX_value").val("");

            if(!name || name==""){
                alert("请输入注意事项");
                return;
            }
            if(!value || value==""){
                alert("请输入风险提示");
                return;
            }

            var new_div = $("<div class='form-row'><div class='form-label col-md-2'><label >"+name+"：</label><input id='signname"+size+"' type='hidden' name='exist_signer' type='text' value='"+name+"' placeholder='输入'"+name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+size+"' name='exist_signer' type='text' value='"+value+"' placeholder='输入'"+name+"'名称'/></div></div>");

            $("#add_new_sign_div").before(new_div);

        });

        //$('#project_relate_fund').autocomplete(
        //    {
        //        serviceUrl: '../rest/auto/get',
        //        type: 'POST',
        //        params: {
        //            url: '/api/fund/nameLike'
        //        },
        //        paramName: 'params',
        //        onSelect: function (suggestion) {
        //            $("#project_relate_fund").val(suggestion.data);
        //        },
        //        transformResult: function (response) {
        //            //clear old value
        //            $("#project_relate_fund").val("");
        //            if (!response || response == '') {
        //                return {
        //                    "query": "Unit",
        //                    "suggestions": []
        //                };
        //            } else {
        //                var result = JSON.parse(response);
        //                var suggestions = JSON.parse(result.suggestions);
        //                result.suggestions = suggestions;
        //                return result;
        //            }
        //        }
        //    });


        $("#makeContact_attachment_1").change(function() {
            me.makeContact_other_attachments.push({index:1,files:me.file.upload($(this)[0].files)});
        });
        $("#makeContact_add_file").click(function () {
            var i =$("div .input-file","#makeContact_others_files").length+1;
            var others_files = $("#makeContact_others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="makeContact_attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-6">');
            var descarea = $('<textarea id="makeContact_attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
            descdiv.append(descarea);
            appenddiv.append(descdiv);

            others_files.append(appenddiv);

            fileinput.change(function () {
                me.makeContact_other_attachments.push({index:i,files:me.file.upload($(this)[0].files)});
            });
        });

        $("#complete_makeContact").click(function(){
            var model = {
                projectid:me.projectid,
                signers:[],
                attentions:[]
            };

            $("input[id^=signname]").each(function () {
                var index = $(this).attr("id").replace("signname", "");
                var name = $(this).val();
                var value = $("#signvalue"+index).val();
                var obj = {name:name,value:value};
                model.signers.push(obj)
            });

            //有限合伴
            var company = $("#company").val();
            if(company && company!=""){
                model.company = company;
            }else{
                alert("请选择有限合伴");
            }
            //基金
            var fund = $("#relate_funds").val();
            if(fund && fund!=""){
                model.fund = fund;
            }else{
                alert("请选择基金");
            }
            //管理费率
            var manage_per = $("#manage_per").val();
            if(manage_per && manage_per!=""){
                manage_per = manage_per.replace("%","")/100;
                model.manage_per = manage_per;
            }else{
                alert("请选择管理费率");
            }
            //渠道费率
            var community_per = $("#community_per").val();
            if(community_per && community_per!=""){
                community_per = community_per.replace("%","")/100;
                model.community_per = community_per;
            }else{
                alert("请选择渠道费率");
            }
            //违约金率
            var notNormal_per = $("#notNormal_per").val();
            if(notNormal_per && notNormal_per!=""){
                notNormal_per = notNormal_per.replace("%","")/100;
                model.notNormal_per = notNormal_per;
            }else{
                alert("请选择违约金率");
            }
            //借款率
            var borrow_per = $("#borrow_per").val();
            if(borrow_per && borrow_per!=""){
                borrow_per = borrow_per.replace("%","")/100;
                model.borrow_per = borrow_per;
            }else{
                alert("请选择违借款率");
            }
            //期限
            var year1 = $("#year1").val();
            if(year1 && year1!=""){
                model.year1 = year1;
                var year2 = $("#year2").val();
                if(year2 && year2!=""){
                    model.year2 = year2;
                }else{
                    alert("请输入期限");
                }
            }else{
                alert("请输入期限");
            }
            //利息计算方式
            var interestType = $('input[name="interestType"]:radio:checked').val();
            if(interestType && interestType!=""){
                model.interestType = interestType;
            }else{
                alert("请选择利息计算方式");
            }

            $("input[id^=attname]").each(function () {
                var index = $(this).attr("id").replace("attname", "");
                var name = $(this).val();
                var value = $("#attvalue"+index).val();
                var obj = {name:name,value:value};
                model.attentions.push(obj)
            });

            $.each(me.makeContact_other_attachments, function( index, attachment ) {
                attachment.desc=$("#makeContact_attachment_txt_"+attachment.index).val();
            });
            model.other_attachments=me.makeContact_other_attachments;

            me.post_complete('/api/project/complete_makeContact', model);
        });

        $("#company").change(function(){
            var companyid = $("#company").val();
            me.getFunds(companyid,this.projectid);
        });

        $("#manage_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#community_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#notNormal_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });
        $("#borrow_per").change(function(){
            $(this).val(NUMBERFORMAT.toRate($(this).val()));
        });

        /***加载数据***/
        me.getCompany();
        $("#company").val(makeContactBean.company);
        $("#relate_funds").val(makeContactBean.fund);
        $("#manage_per").val(makeContactBean.manage_per);
        $("#community_per").val(makeContactBean.community_per);
        $("#notNormal_per").val(makeContactBean.penalty_per);
        $("#borrow_per").val(makeContactBean.borrow_per);
        $("#year1").val(makeContactBean.year1);
        $("#year2").val(makeContactBean.year2);
        $('input[name="interestType"][value="'+makeContactBean.interestType+'"]:radio').attr("checked","checked");

        if(makeContactBean.signers && makeContactBean.signers.length > 0){
            //clear old data
            $("#div_default_signer1").remove();
            $("#div_default_signer2").remove();

            //reload
            var size =  Math.ceil(makeContactBean.signers.length /2 );
            for(var i= 0; i< size ; i++){
                var index1 = i*2;
                var index2 = i*2+1;
                var lastone = false;

                if(index2 == makeContactBean.signers.length)
                    lastone = true;

                if(lastone){
                    var new_div = $("<div class='form-row'><div class='form-label col-md-2'><label >"+makeContactBean.signers[index1].name+"：</label><input id='signname"+index1+"' type='hidden' name='exist_signer' type='text' value='"+makeContactBean.signers[index1].name+"' placeholder='输入'"+makeContactBean.signers[index1].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index1+"' name='exist_signer' type='text' value='"+makeContactBean.signers[index1].value+"' placeholder='输入'"+makeContactBean.signers[index1].name+"'名称'/></div></div>");
                    $("#add_new_sign_div").before(new_div);
                }else{
                    var new_div = $("<div class='form-row'><div class='form-label col-md-2'><label >"+makeContactBean.signers[index1].name+"：</label><input id='signname"+index1+"' type='hidden' name='exist_signer' type='text' value='"+makeContactBean.signers[index1].name+"' placeholder='输入'"+makeContactBean.signers[index1].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index1+"' name='exist_signer' type='text' value='"+makeContactBean.signers[index1].value+"' placeholder='输入'"+makeContactBean.signers[index1].name+"'名称'/></div><div class='form-label col-md-2'><label >"+makeContactBean.signers[index2].name+"：</label><input id='signname"+index2+"' type='hidden' name='exist_signer' type='text' value='"+makeContactBean.signers[index2].name+"' placeholder='输入'"+makeContactBean.signers[index2].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index2+"' name='exist_signer' type='text' value='"+makeContactBean.signers[index2].value+"' placeholder='输入'"+makeContactBean.signers[index2].name+"'名称'/></div></div>");
                    $("#add_new_sign_div").before(new_div);
                }

            }

        }

        if(makeContactBean.attentions && makeContactBean.attentions.length > 0){
            //clear old data
            var pacts = $("#attentions tr");
            if (pacts && pacts.length) {
                for (var i = 1; i < pacts.length; i++) {
                    $(pacts[i]).remove();
                }
            }

            //reload
            $.each(makeContactBean.attentions,function(index,obj){
                var size = $('#attentions > tbody>tr').size()+1;
                $('#attentions > tbody:last').append('<tr><td>'+obj.name+'<input id="attname'+size+'" type="hidden" value="'+obj.name+'"/></td><td>'+obj.value+'<input id="attvalue'+size+'" type="hidden" value="'+obj.value+'"/></td></tr>');

            });
        }

        //other
        if(makeContactBean.other_attachments && makeContactBean.other_attachments.length > 0){
            //empty

            //add
            $.each(makeContactBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#makeContact_others_files").length+1;
                var others_files = $("#exist_makeContact_others");

                var appenddiv = $("<div>");
                var filediv = $('<div class="form-input col-md-4">');
                var div = $('<div>');
                var ul = $('<ul>');
                div.append(ul);
                filediv.append(div);
                appenddiv.append(filediv);

                var descdiv = $('<div class="form-input col-md-4">');
                var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
                descarea.val(obj.desc);
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

            });
        }


        /****处理显示效果****/
        if(makeContactBean.accessable){//可以编辑
            console.log("can modify makeContact");
        }else{//不可以编辑
            $("input","#form_signer").attr("readonly","readonly");
            $("#add_new_sign_div").remove();
            $("#attention_head").remove();
            $("#div_add_more_makeContactFiles").remove();
            $("button[type='button']","#div_submit_makecontact").hide();
            console.log("can not modify makeContact");
        }

        $("#panel_makeContact").show();
    },

    getCompany: function () {
        var me = this;
        var data = {url: '/api/fundCompanyInformation/listAll'};
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                if(result && result.length>0){
                    $.each(result,function(index,obj){
                        $("#company").append(
                            '<option value="'+obj.id+'">'+obj.companyName+'</option>'
                        );
                    });
                    $('#company').trigger('change');
                }

            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    },

    getFunds: function (companyid, projectid) {
        var me = this;
        var data = {url: '/api/fundCompanyInformation/getRelateFund', params: JSON.stringify({companyid:companyid, projectid:projectid})};
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                if(result && result.rest_result){
                    $("#relate_funds").empty();
                    var rest_result = JSON.parse(result.rest_result);
                    $.each(rest_result.banks,function(index, obj){
                        $("#relate_funds").append('<option value="'+obj.id+'">'+obj.fundName+'</option>');
                    });
                }
            },
            error: function(result){
                alert('提交时错误:'+result);
            }
        });
    },

    init_makeContactOA: function(makeContactOABean){
        var me = this;
        /***初始化事件***/

        /***加载数据***/

        /****处理显示效果****/
        if(makeContactOABean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        $("#panel_makeContactOA").show();
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
                alert('提交时错误:'+result);
            }
        });
    },

    post_complete: function(url, model){
        var me = this;
        var data = {url: url, entity: JSON.stringify(model)};
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
                console.log(result);
                alert('提交时错误:'+result.responseText);
            }
        });
    }

}


