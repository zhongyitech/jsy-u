var App = window.App || {};
App.Research = {
    lowFiles_attachments: [],
    projectFiles_attachments: [],
    finanFiles_attachments: [],
    research_other_attachments: [],

    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "research";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
        var me = this;
        //初始化事件
        $("#lowFiles").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.lowFiles_attachments = response.rest_result;
                }
            });
        });
        $("#projectFiles").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.projectFiles_attachments = response.rest_result;
                }
            });
        });
        $("#finanFiles").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.finanFiles_attachments = response.rest_result;
                }
            });
        });
        $("#research_attachment_1").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.research_other_attachments.push({index:1,files:response.rest_result});
                }
            });
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

                var fileId = "#"+$(this).attr("id");
                $.utils.upload({
                    files:fileId,
                    success:function(response){
                        me.research_other_attachments.push({index:i,files:response.rest_result});
                    }
                });
            });
        });


        $("#complete_research").click(function(){
            var lowDesc= $("#lowDesc").val();
            var lowDesc2= $("#lowDesc2").val();
            var projectDesc= $("#projectDesc").val();
            var projectDesc2= $("#projectDesc2").val();
            var finanDesc= $("#finanDesc").val();
            var finanDesc2= $("#finanDesc2").val();


            $.each(me.research_other_attachments, function( index, attachment ) {
                attachment.desc=$("#research_attachment_txt_"+attachment.index).val();
                attachment.desc2=$("#research_attachment2_txt_"+attachment.index).val();
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

            var data = {url: '/api/project/complete_research', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });

        });
    },
    initView: function (infoBean) {
        /***加载数据***/
        //法律进调报告
        if(infoBean.lawTransfer && infoBean.lawTransfer.length > 0){
            $.each(infoBean.lawTransfer,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_lowFiles").append(fileli);
            });
        }
        if(infoBean.lawTransfer_pdesc) {
            $("#lowDesc").val(infoBean.lawTransfer_pdesc);
        }
        if(infoBean.lawTransfer_pdesc2) {
            $("#lowDesc2").val(infoBean.lawTransfer_pdesc2);
        }

        //项目进调报告
        if(infoBean.projectTransfer && infoBean.projectTransfer.length > 0){
            $.each(infoBean.projectTransfer,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_projectFiles").append(fileli);
            });
        }
        if(infoBean.lawTransfer_pdesc) {
            $("#projectDesc").val(infoBean.projectTransfer_pdesc);
        }
        if(infoBean.lawTransfer_pdesc2) {
            $("#projectDesc2").val(infoBean.projectTransfer_pdesc2);
        }

        //财务报告
        if(infoBean.financialReport && infoBean.financialReport.length > 0){
            $.each(infoBean.projectTransfer,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);
                $("#exist_finanFiles").append(fileli);
            });
        }
        if(infoBean.financialReport_pdesc) {
            $("#finanDesc").val(infoBean.financialReport_pdesc);
        }
        if(infoBean.financialReport_pdesc2) {
            $("#finanDesc2").val(infoBean.financialReport_pdesc2);
        }


        //other
        //other
        if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(infoBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#research_others_files").length+1;
                var others_files = $("#exist_research_others");

                App.Tools.construct_other_fileDiv2(i ,others_files , obj);
            });
        }

        //if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
        //    //empty
        //
        //    //add
        //    $.each(infoBean.other_attachments,function(index,obj){
        //
        //        var i =$("div .input-file","#others_files").length+1;
        //        var others_files = $("#exist_others");
        //
        //        var appenddiv = $("<div>");
        //        var filediv = $('<div class="form-input col-md-4">');
        //        var div = $('<div>');
        //        var ul = $('<ul>');
        //        div.append(ul);
        //        filediv.append(div);
        //        appenddiv.append(filediv);
        //
        //        var descdiv = $('<div class="form-input col-md-4">');
        //        var descarea = $('<textarea id="attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
        //        descarea.val(obj.desc);
        //        descdiv.append(descarea);
        //
        //        var descdiv2 = $('<div class="form-input col-md-4">');
        //        var descarea2 = $('<textarea id="attachment2_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
        //        descarea2.val(obj.desc2);
        //        descdiv.append(descarea2);
        //
        //
        //        var deldiv = $('<div class="form-input col-md-2">');
        //        var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        //        delspan.click(function () {
        //            console.log("del",obj);
        //        });
        //        deldiv.append(delspan);
        //
        //        appenddiv.append(descdiv);
        //        appenddiv.append(deldiv);
        //
        //        others_files.append(appenddiv);
        //
        //        $.each(obj.files,function(index2,obj2){
        //            var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj2.fileName+"&path="+obj2.filePath+"'>"+obj2.fileName+"</li>");
        //            ul.append(fileli);
        //        });
        //
        //    });
        //}
    },
    showView: function (infoBean) {
        var me = this;
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify research");
        }else{//不可以编辑
            $("input[name='attachment']","#form_research").hide();

            $("textarea[name='input_text']","#form_research").attr('readonly','readonly');
            $('textarea','#research_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#research_add_file").hide();
            $("button[type='button']","#form_research").hide();
            console.log("can not modify research");
        }

        if(me.isCurrent){
            $("#panel_research").removeClass("content-box-closed");
        }
        $("#panel_research").show();
    }
}