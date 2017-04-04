$(document).ready(function() {
    $('#openMessaging').popover({html:true});

    $('#openMessaging').click(function() {
        $.get('/getUserList', function(data) {
            userList = "";
            data.forEach(function(elem) {
                userList += "<li>" + elem + "</li>";
            });
            var popover = $('#openMessaging').data('bs.popover');
            popover.options.content = function() {
                return userList;
            }
        });
    });
});

// $.get('/getUserList', function(data) {
//     var userList = "";
//     data.forEach(function(elem) {
//         userList += "<li>" + elem + "</li>";
//     });
//     //alert(userList);
//     return ("<ul>" + userList + "</ul>");
// });
