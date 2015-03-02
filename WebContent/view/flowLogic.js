/**
 * 全部流程都在一个页面内展现，这里统一处理
 * @type {{stepPanels: string[], gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string, currentStep: string, show: Function, gatherInfo: string, gatherOA: string, research: string, researchOA: string, meeting: string, otherEA: string, addCompany: string, makeContact: string, makeContactOA: string}}
 */
var FLOW={
    projectid:null,

    file: FILE,

    stepPanels:["panel_gatherInfo","panel_gatherOA","panel_research","panel_researchOA","panel_meeting","panel_otherEA","panel_addCompany","panel_makeContact","panel_makeContactOA"],

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
            if(rest_result.addCompanyBean){
                me.init_addCompany(rest_result.addCompanyBean);
            }
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
            
        });


        /***加载数据***/
        getCompanies();

        /****处理显示效果****/
        if(addCompanyBean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        $("#panel_addCompany").show();
    },

    init_makeContact: function(makeContactBean){
        var me = this;
        /***初始化事件***/

        /***加载数据***/

        /****处理显示效果****/
        if(makeContactBean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        $("#panel_makeContact").show();
    },

    getCompanies: function () {
        var me = this;
        var data = {url: '/api/company/listAll'};
        console.log(data);
        $.ajax({
            type: 'post',
            url: '../rest/item/get',
            data: data,
            dataType: 'json',
            async: false,
            success: function(result){
                console.log(result);
                if(result && result.rest_status && result.rest_status == "200"){

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


