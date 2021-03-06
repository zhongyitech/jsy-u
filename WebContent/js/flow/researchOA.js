var App = window.App || {};
App.ResearchOA = {
    projectid:null,
    isCurrent:null,
    other_attachments: [],

    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "researchOA";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
        var me = this;

        $("#oa_research_attachment_1").change(function() {
            var fileId = "#"+$(this).attr("id");
            $.utils.upload({
                files:fileId,
                success:function(response){
                    me.other_attachments.push({index:1,files:response.rest_result});
                }
            });
        });


        $("#oa_research_add_file").click(function () {
            var i =$("div .input-file","#oa_research_others_files").length+1;
            var others_files = $("#oa_research_others_files");

            var appenddiv = $("<div>");
            var filediv = $('<div class="form-input col-md-4">');
            var fileinput = $('<input id="oa_research_attachment_'+i+'" class="input-file" name="attachment" type="file" multiple>');
            filediv.append(fileinput);
            appenddiv.append(filediv);
            var descdiv = $('<div class="form-input col-md-6">');
            var descarea = $('<textarea id="oa_research_attachment_txt_'+i+'" name="input_text" class="small-textarea" placeholder="备注栏"></textarea>');
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

        $("#complete_oa_research").click(function(){
            $.each(me.other_attachments, function( index, attachment ) {
                attachment.desc=$("#oa_research_attachment_txt_"+attachment.index).val();
            });

            var model = {
                projectid:me.projectid,
                other_attachments: me.other_attachments
            };

            var data = {url: '/api/project/complete_oaresearch', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });

        });
    },
    initView: function (infoBean) {
        var me = this;
        //other
        if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(infoBean.other_attachments,function(index,obj){

                var i =$("div .input-file","#oa_research_others_files").length+1;
                var others_files = $("#exist_oa_research_others");

                App.Tools.construct_other_fileDiv(i ,others_files , obj);
            });
        }


        //处理显示效果
        if(infoBean.accessable){//可以编辑
            console.log("can modify oaresearch");
        }else{//不可以编辑
            $("input[name='attachment']","#oagrather_form").hide();

            $("textarea[name='input_text']","#oagrather_form").attr('readonly','readonly');
            $('textarea','#oa_research_others_files').filter(function() { return $(this).val() == ""; }).hide();
            $("#oa_research_add_file").hide();
            $("button[type='button']","#oagrather_form").hide();
            console.log("can not modify oaresearchInfo");
        }
    },
    showView: function (infoBean) {
        var me = this;
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify researchOA");
        }else{//不可以编辑
            console.log("can not modify researchOA");
        }

        if(me.isCurrent){
            $("#panel_researchOA").removeClass("content-box-closed");
        }
        $("#panel_researchOA").show();
    }
}