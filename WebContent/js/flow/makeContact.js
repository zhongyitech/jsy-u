var App = window.App || {};
App.MakeContact = {
    makeContact_other_attachments: [],

    gatherOA:"#panel_gatherOA",
    research:"#panel_research",
    researchOA:"#panel_researchOA",
    meeting:"#panel_meeting",
    otherEA:"#panel_otherEA",
    addCompany:"#panel_addCompany",
    makeContact:"#panel_makeContact",
    makeContactOA:"#panel_makeContactOA",

    projectid:null,
    isCurrent:null,
    init: function (project, infoBean) {
        this.projectid=project.id;
        this.isCurrent = project.currentStageEn == "makeContact";
        this.initEvent(infoBean);
        this.initView(infoBean);
        this.showView(infoBean);
    },
    initEvent: function (infoBean) {
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


        $("#makeContact_attachment_1").change(function() {
            me.makeContact_other_attachments.push({index:1,files:FILE.upload($(this)[0].files)});
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
                me.makeContact_other_attachments.push({index:i,files:FILE.upload($(this)[0].files)});
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
            var company = $("#company").html();
            if(company && company!=""){
                //model.company = company;
            }else{
                alert("请为给项目创建基金，并进行关联");
                return false;
            }
            //基金
            var fund = $("#relate_fund").html();
            if(fund && fund!=""){
                //model.fund = fund;
            }else{
                alert("请为给项目创建基金，并进行关联");
                return false;
            }
            //管理费率
            var manage_per = $("#manage_per").val();
            if(manage_per && manage_per!=""){
                manage_per = manage_per.replace("%","")/100;
                model.manage_per = manage_per;
            }else{
                alert("请选择管理费率");
                return false;
            }
            //渠道费率
            var community_per = $("#community_per").val();
            if(community_per && community_per!=""){
                community_per = community_per.replace("%","")/100;
                model.community_per = community_per;
            }else{
                alert("请选择渠道费率");
                return false;
            }
            //违约金率
            var notNormal_per = $("#notNormal_per").val();
            if(notNormal_per && notNormal_per!=""){
                notNormal_per = notNormal_per.replace("%","")/100;
                model.notNormal_per = notNormal_per;
            }else{
                alert("请选择违约金率");
                return false;
            }
            //借款率
            var borrow_per = $("#borrow_per").val();
            if(borrow_per && borrow_per!=""){
                borrow_per = borrow_per.replace("%","")/100;
                model.borrow_per = borrow_per;
            }else{
                alert("请选择违借款率");
                return false;
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
                    return false;
                }
            }else{
                alert("请输入期限");
                return false;
            }

            //利息计算方式
            var interestType = $('input[name="interestType"]:radio:checked').val();
            if(interestType && interestType!=""){
                model.interestType = interestType;
            }else{
                alert("请选择利息计算方式");
                return false;
            }

            //日复利日利率
            var daycount_per = $("#daycount_per").val();
            if(daycount_per && daycount_per!=""){
                daycount_per = daycount_per.replace("%","")/100;
                model.daycount_per = daycount_per;
            }else{
                model.daycount_per = 0;
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

            var data = {url: '/api/project/complete_makeContact', entity: JSON.stringify(model)};
            $.io.post(data).success(function(){
                window.location.href = "projectinfo.jsp?id="+me.projectid;
            });

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
    },
    initView: function (infoBean) {
        /***加载数据***/

            //me.getCompany(); //加载有限合作下拉数据
        $("#company").html(infoBean.company);
        $("#relate_fund").html(infoBean.fund);
        $("#manage_per").val(infoBean.manage_per);
        $("#community_per").val(infoBean.community_per);
        $("#notNormal_per").val(infoBean.penalty_per);
        $("#borrow_per").val(infoBean.borrow_per);
        $("#year1").val(infoBean.year1);
        $("#year2").val(infoBean.year2);
        $('input[name="interestType"][value="'+infoBean.interestType+'"]:radio').attr("checked","checked");

        if(infoBean.signers && infoBean.signers.length > 0){
            //clear old data
            $("#div_default_signer1").remove();
            $("#div_default_signer2").remove();

            //reload
            var size =  Math.ceil(infoBean.signers.length /2 );
            for(var i= 0; i< size ; i++){
                var index1 = i*2;
                var index2 = i*2+1;
                var lastone = false;

                if(index2 == infoBean.signers.length)
                    lastone = true;

                if(lastone){
                    var new_div = $("<div class='form-row'><div class='form-label col-md-2'><label >"+infoBean.signers[index1].name+"：</label><input id='signname"+index1+"' type='hidden' name='exist_signer' type='text' value='"+infoBean.signers[index1].name+"' placeholder='输入'"+infoBean.signers[index1].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index1+"' name='exist_signer' type='text' value='"+infoBean.signers[index1].value+"' placeholder='输入'"+infoBean.signers[index1].name+"'名称'/></div></div>");
                    $("#add_new_sign_div").before(new_div);
                }else{
                    var new_div = $("<div class='form-row'><div class='form-label col-md-2'><label >"+infoBean.signers[index1].name+"：</label><input id='signname"+index1+"' type='hidden' name='exist_signer' type='text' value='"+infoBean.signers[index1].name+"' placeholder='输入'"+infoBean.signers[index1].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index1+"' name='exist_signer' type='text' value='"+infoBean.signers[index1].value+"' placeholder='输入'"+infoBean.signers[index1].name+"'名称'/></div><div class='form-label col-md-2'><label >"+infoBean.signers[index2].name+"：</label><input id='signname"+index2+"' type='hidden' name='exist_signer' type='text' value='"+infoBean.signers[index2].name+"' placeholder='输入'"+infoBean.signers[index2].name+"'名称'/></div><div class='form-input col-md-4'><input id='signvalue"+index2+"' name='exist_signer' type='text' value='"+infoBean.signers[index2].value+"' placeholder='输入'"+infoBean.signers[index2].name+"'名称'/></div></div>");
                    $("#add_new_sign_div").before(new_div);
                }

            }

        }

        if(infoBean.attentions && infoBean.attentions.length > 0){
            //clear old data
            var pacts = $("#attentions tr");
            if (pacts && pacts.length) {
                for (var i = 1; i < pacts.length; i++) {
                    $(pacts[i]).remove();
                }
            }

            //reload
            $.each(infoBean.attentions,function(index,obj){
                var size = $('#attentions > tbody>tr').size()+1;
                $('#attentions > tbody:last').append('<tr><td>'+obj.name+'<input id="attname'+size+'" type="hidden" value="'+obj.name+'"/></td><td>'+obj.value+'<input id="attvalue'+size+'" type="hidden" value="'+obj.value+'"/></td></tr>');

            });
        }

        //other
        if(infoBean.other_attachments && infoBean.other_attachments.length > 0){
            //empty

            //add
            $.each(infoBean.other_attachments,function(index,obj){

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
    },
    showView: function (infoBean) {
        var me = this;
        /****处理显示效果****/
        if(infoBean.accessable){//可以编辑
            console.log("can modify makeContact");
        }else{//不可以编辑
            $("input","#form_signer").attr("readonly","readonly");
            $("#add_new_sign_div").remove();
            $("#attention_head").remove();
            $("#div_add_more_makeContactFiles").remove();
            $("button[type='button']","#div_submit_makecontact").hide();
            console.log("can not modify makeContact");
        }

        if(me.isCurrent){
            $("#panel_makeContact").removeClass("content-box-closed");
        }
        $("#panel_makeContact").show();
    }

}