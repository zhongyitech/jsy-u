var App = window.App || {};
App.OtherEA = {
    thirdpartyLowFiles_attachments: [],
    thirdpartyLow_other_attachments: [],

    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "otherEA";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
        var me = this;
        /***初始化事件***/
        $("#thirdpartyLowFiles").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.thirdpartyLowFiles_attachments = response.rest_result;
                }
            });
        });

        $("#thirdpartyLow_attachment_1").change(function() {

            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.thirdpartyLow_other_attachments.push({index:1,files:response.rest_result});
                }
            });
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

                var fileId = "#"+$(this).attr("id");
                $.utils.upload({
                    files:fileId,
                    success:function(response){
                        me.thirdpartyLow_other_attachments.push({index:i,files:response.rest_result});
                    }
                });
            });
        });

        $("#complete_thirdpartyLow").click(function(){
            var thirdpartyLowDesc= $("#thirdpartyLowDesc").val();

            $.each(me.thirdpartyLow_other_attachments, function( index, attachment ) {
                attachment.desc=$("#thirdpartyLow_attachment_txt_"+attachment.index).val();
            });

            var model = {
                projectid:me.projectid,
                thirdpartyLowDesc:thirdpartyLowDesc,
                thirdpartyLowFiles_attachments: me.thirdpartyLowFiles_attachments,
                thirdpartyLow_other_attachments: me.thirdpartyLow_other_attachments
            };

            var data = {url: '/api/project/complete_thirdpartyLow', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });
        });
    },
    initView: function (infoBean) {
        /***加载数据***/
        if(infoBean.thirdPartyFile && infoBean.thirdPartyFile.length > 0){
            $.each(infoBean.thirdPartyFile,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_thirdpartyLowFiles").append(fileli);
            });
        }
        if(infoBean.thirdPartyDesc) {
            $("#thirdpartyLowDesc").val(meetingDesc.thirdPartyDesc);
        }
    },
    showView: function (infoBean) {
        var me = this;
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify otherEA");
        }else{//不可以编辑
            $("input[name='attachment']","#form_thirdpartyLow").hide();

            $("textarea[name='input_text']","#form_thirdpartyLow").attr('readonly','readonly');
            $('textarea','#thirdpartyLow_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#thirdpartyLow_add_file").hide();
            $("button[type='button']","#form_thirdpartyLow").hide();

            console.log("can not modify otherEA");
        }

        if(me.isCurrent){
            $("#panel_otherEA").removeClass("content-box-closed");
        }
        $("#panel_otherEA").show();
    }

}