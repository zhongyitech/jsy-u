var App = window.App || {};
App.OtherEA = {
    thirdpartyLowFiles_attachments: [],
    thirdpartyLow_other_attachments: [],

    init: function (infoBean) {
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
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

        $("#panel_otherEA").show();
    }

}