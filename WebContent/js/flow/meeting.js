var App = window.App || {};
App.Meeting = {
    meetingFiles_attachments: [],
    meeting_other_attachments: [],

    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "meeting";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
        var me = this;
        /***初始化事件***/
        $("#meetingFiles").change(function() {
            me.meetingFiles_attachments = FILE.upload($(this)[0].files);
        });

        $("#meeting_attachment_1").change(function() {
            me.meeting_other_attachments.push({index:1,files:FILE.upload($(this)[0].files)});
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
                me.meeting_other_attachments.push({index:i,files:FILE.upload($(this)[0].files)});
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

            var data = {url: '/api/project/complete_meeting', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });
        });
    },
    initView: function (infoBean) {
        /***加载数据***/
        //纪要
        if(infoBean.meetingRecord && infoBean.meetingRecord.length > 0){
            $.each(infoBean.meetingRecord,function(index,obj){
                var fileli= App.Tools.construct_fileli(obj);

                $("#exist_meetingFiles").append(fileli);
            });
        }
        if(infoBean.meetingDesc) {
            $("#meetingDesc").val(meetingDesc.meetingDesc);
        }
    },
    showView: function (infoBean) {
        var me = this;
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify meeting");
        }else{//不可以编辑
            $("input[name='attachment']","#form_meeting").hide();

            $("textarea[name='input_text']","#form_meeting").attr('readonly','readonly');
            $('textarea','#meeting_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#meeting_add_file").hide();
            $("button[type='button']","#form_meeting").hide();
            console.log("can not modify meeting");
        }

        if(me.isCurrent){
            $("#panel_meeting").removeClass("content-box-closed");
        }
        $("#panel_meeting").show();
    }
}