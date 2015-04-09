var App = window.App || {};
App.Tools = {
    construct_fileli: function(obj){
        var fileli= $("<li><a href='/jsy/rest/file/download?name="+obj.fileName+"&path="+obj.filePath+"'>"+obj.fileName+"</li>");
        var delspan = $('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        fileli.append(delspan);
        delspan.click(function () {
            console.log("del",obj.fileName,obj.filePath);
        });
        return fileli;
    }
}