var loaderObj = {
    templates : [
        'register.hbs',
        'index.hbs'
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
            dataType: 'text',
            type: 'GET',
            url: templateUri + this,
            success: function(resp) {
                tempObj.html(resp);
                $('body').append(tempObj);
            }
        });
    });
}
