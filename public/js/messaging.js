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
            userList += "<tr class='clickable-row'><td>" + elem.user + "</td><td>" + elem.item + "</td></tr>";
        });
        var popover = $('#openMessaging').data('bs.popover');
        popover.options.content = function() {
            return "<table><tr class='' data-href='url://'><tr><th>User</th><th>Item</th>" + userList + "</table>";
        }
    });

    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
}
