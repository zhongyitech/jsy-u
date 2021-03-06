var App = window.App || {};
App.GatherInfo = {
    projectid:null,
    isCurrent:null,
    certificateFiles_attachments: [],
    debtFiles_attachments: [],
    financialFiles_attachments: [],
    toPublicFiles_attachments: [],
    businessPlanFiles_attachments: [],
    analyseReportFiles_attachments: [],
    loanFiles_attachments: [],
    other_attachments: [],

    init: function(project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "gatherInfo";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function(infoBean) {
        var me = this;
        //初始化事件
        $("#certificateFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.certificateFiles_attachments = response.rest_result;
                }
            });
        });
        $("#debtFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.debtFiles_attachments = response.rest_result;
                }
            });
        });
        $("#financialFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.financialFiles_attachments = response.rest_result;
                }
            });
        });
        $("#toPublicFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.toPublicFiles_attachments = response.rest_result;
                }
            });
        });
        $("#businessPlanFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.businessPlanFiles_attachments = response.rest_result;
                }
            });
        });
        $("#analyseReportFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.analyseReportFiles_attachments = response.rest_result;
                }
            });
        });
        $("#loanFiles").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.loanFiles_attachments = response.rest_result;
                }
            });
        });
        $("#attachment_1").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.other_attachments.push({index:1,files:response.rest_result});
                }
            });
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


                var fileId = "#"+$(this).attr("id");
                $.utils.upload({
                    files:fileId,
                    success:function(response){
                        me.other_attachments.push({index:i,files:response.rest_result});
                    }
                });

            });
        });


        $("#complete_gather").click(function(){
            var certificateFilesDesc= $("#certificateFilesDesc").val();
            var debtFilesDesc= $("#debtFilesDesc").val();
            var financialFilesDesc= $("#financialFilesDesc").val();
            var toPublicFilesDesc= $("#toPublicFilesDesc").val();
            var businessPlanFilesDesc= $("#businessPlanFilesDesc").val();
            var analyseReportFilesDesc= $("#analyseReportFilesDesc").val();
            var loanFilesDesc= $("#loanFilesDesc").val();


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
                analyseReportFilesDesc:analyseReportFilesDesc,
                loanFilesDesc: loanFilesDesc,
                certificateFiles_attachments: me.certificateFiles_attachments,
                debtFiles_attachments: me.debtFiles_attachments,
                financialFiles_attachments: me.financialFiles_attachments,
                toPublicFiles_attachments: me.toPublicFiles_attachments,
                businessPlanFiles_attachments: me.businessPlanFiles_attachments,
                loanFiles_attachments: me.loanFiles_attachments,
                analyseReportFiles_attachments: me.analyseReportFiles_attachments,
                other_attachments: me.other_attachments

            };

            var data = {url: '/api/project/complete_gather', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });

        });
    },
    initView: function(infoBean) {
        /***加载数据***/
        //项目证照
        if(infoBean.certificateFiles_attachments && infoBean.certificateFiles_attachments.length > 0){
            $.each(infoBean.certificateFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_certificateFiles").append(fileli);
            });
        }
        if(infoBean.certificateFilesDesc){
            $("#certificateFilesDesc").val(infoBean.certificateFilesDesc);
        }
        //债务报告
        if(infoBean.debtFiles_attachments && infoBean.debtFiles_attachments.length > 0){
            $.each(infoBean.debtFiles_attachments,function(index,obj){

                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_debtFiles").append(fileli);
            });
        }
        if(infoBean.debtFilesDesc){
            $("#debtFilesDesc").val(infoBean.debtFilesDesc);
        }
        //财务报表
        if(infoBean.financialFiles_attachments && infoBean.financialFiles_attachments.length > 0){
            $.each(infoBean.financialFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_financialFiles").append(fileli);
            });
        }
        if(infoBean.financialFilesDesc){
            $("#financialFilesDesc").val(infoBean.financialFilesDesc);
        }
        //对公批文
        if(infoBean.toPublicFiles_attachments && infoBean.toPublicFiles_attachments.length > 0){
            $.each(infoBean.toPublicFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_toPublicFiles").append(fileli);
            });
        }
        if(infoBean.toPublicFilesDesc){
            $("#toPublicFilesDesc").val(infoBean.toPublicFilesDesc);
        }
        //商务计划
        if(infoBean.businessPlanFiles_attachments && infoBean.businessPlanFiles_attachments.length > 0){
            $.each(infoBean.businessPlanFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_businessPlanFiles").append(fileli);
            });
        }
        if(infoBean.businessPlanFilesDesc){
            $("#businessPlanFilesDesc").val(infoBean.businessPlanFilesDesc);
        }
        //
        if(infoBean.loanFiles_attachments && infoBean.loanFiles_attachments.length > 0){
            $.each(infoBean.loanFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_loanFiles").append(fileli);
            });
        }
        if(infoBean.loanFilesDesc){
            $("#loanFilesDesc").val(infoBean.loanFilesDesc);
        }
        //
        if(infoBean.analyseReportFiles_attachments && infoBean.analyseReportFiles_attachments.length > 0){
            $.each(infoBean.analyseReportFiles_attachments,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_analyseReportFiles").append(fileli);
            });
        }
        if(infoBean.analyseReportFilesDesc){
            $("#analyseReportFilesDesc").val(infoBean.analyseReportFilesDesc);
        }
        //other
        if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(infoBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#others_files").length+1;
                var others_files = $("#exist_others");

                App.Tools.construct_other_fileDiv(i ,others_files , obj);
            });
        }

    },
    showView: function(infoBean) {
        var me = this;
        //处理显示效果
        if(infoBean.accessable){//可以编辑
            console.log("can modify gatherInfo");
        }else{//不可以编辑
            $("input[name='attachment']","#form_gatherInfo").hide();

            $("textarea[name='input_text']","#form_gatherInfo").attr('readonly','readonly');
            $('textarea','#others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#gatherInfo_add_file").hide();
            $("button[type='button']","#form_gatherInfo").hide();
            console.log("can not modify gatherInfo");
        }

        if(me.isCurrent){
            $("#panel_gatherInfo").removeClass("content-box-closed");
        }
        $("#panel_gatherInfo").show();
    }
};