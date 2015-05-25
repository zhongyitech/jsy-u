var App = window.App || {};
App.Tools = {
    construct_fileli: function(obj){
        var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
        var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        fileli.append(delspan);
        delspan.click(function () {
            console.log("del",obj.fileName,obj.filePath);
            $.io.del({
                url:"/api/project/delProjectFile2",
                params:{file_id:obj.filePath}
            }).success(function(){
                $.message.log("删除成功："+obj.filePath);
            });
        });
        return fileli;
    },
    construct_other_fileDiv: function(i,others_files,obj){
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


        $.each(obj.files, function(index,entry){
            var deldiv = $('<div class="form-input col-md-2">');
            var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
            delspan.click(function () {
                console.log("del",entry);
                $.io.del({
                    url:"/api/project/delProjectFile2",
                    params:{file_id:entry.filePath}
                }).success(function(){
                    $.message.log("删除成功："+entry.filePath);
                });
            });
            deldiv.append(delspan);
            appenddiv.append(descdiv);
            appenddiv.append(deldiv);
        });

        others_files.append(appenddiv);

        $.each(obj.files,function(index2,obj2){
            var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj2.fileName+"&path="+obj2.filePath+"'>"+obj2.fileName+"</li>");
            ul.append(fileli);
        });
    },
    construct_other_fileDiv2: function(i,others_files,obj){
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
        descdiv2.append(descarea2);


        //var deldiv = $('<div class="form-input col-md-2">');
        //var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        //delspan.click(function () {
        //    console.log("del",obj);
        //});
        //deldiv.append(delspan);

        appenddiv.append(descdiv);
        appenddiv.append(descdiv2);
        //appenddiv.append(deldiv);

        others_files.append(appenddiv);

        $.each(obj.files,function(index2,obj2){
            var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj2.fileName+"&path="+obj2.filePath+"'>"+obj2.fileName+"</li>");
            ul.append(fileli);
        });
    }
}