var App = window.App || {};
App.GatherInfo = {
    certificateFiles_attachments: [],
    debtFiles_attachments: [],
    financialFiles_attachments: [],
    toPublicFiles_attachments: [],
    businessPlanFiles_attachments: [],
    other_attachments: [],

    init: function(infoBean) {
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function(infoBean) {
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
            var fileli= App.Tools.construct_fileli(obj);
            $("#toPublicFilesDesc").val(fileli);
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
        //other
        if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(infoBean.other_attachments,function(index,obj){

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

    },
    showView: function(infoBean) {
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
        $("#panel_gatherInfo").show();
    }
};