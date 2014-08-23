var loaderObj = {
    templates : [
        'login.html'
    ]
};

loadTemplates(loaderObj.templates);

function loadTemplates(templates) {
    $(templates).each(function() {
        var tempObj = $('<script>');
        tempObj.attr('type', 'text/x-handlebars');
        var dataTemplateName = this.substring(0, this.indexOf('.'));
        tempObj.attr('data-template-name', dataTemplateName);
        $.ajax({
            async: false,
            type: 'GET',
            url: templateUri + this,
            success: function(resp) {
                tempObj.html(resp);
                console.log(tempObj);
                $('body').append(tempObj);
            }
        });
    });
}
