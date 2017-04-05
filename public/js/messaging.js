$(document).ready(function() {
    $('#openMessaging').popover({
        html: true
    });
    updateUserList();

    $('#openMessaging').click(function() {
        updateUserList();
    });
});

function updateUserList() {
    $.get('/getUserList', function(data) {
        userList = "";
        data.forEach(function(elem) {
            userList += "<li><button type='button' class='btn btn-default btn-block'>" + elem + "</button></li>";
        });
        var popover = $('#openMessaging').data('bs.popover');
        popover.options.content = function() {
            return "<ul class='userList'>" + userList + "</ul>";
        }
    });
}
