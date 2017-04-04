$(document).ready(function() {
    $('#openMessaging').on('click', function(event) {
        $('#openMessaging').popover({
            trigger: 'manual',
            html: true,
            content: function() {
                $.get('/getUserList', function(data) {
                    var userList = "";
                    data.forEach(function(elem) {
                        userList += "<li>" + elem + "</li>";
                    });
                    return ("<ul>" + userList + "</ul>");
                });
            }
        });
        $('#openMessaging').popover('show');
    });
});
