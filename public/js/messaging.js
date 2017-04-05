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
        data.forEach(function(elem, index) {
            userList += "<tr user=" + elem.username + " item=" + elem.item + " class='userList clickable-row'><td>" + elem.username + "</td><td>" + elem.item + "</td></tr>";
        });

        var popover = $('#openMessaging').data('bs.popover');
        popover.options.content = function() {
            return "<table class='table table-hover table-condensed'><tr class='userList'><tr><th>User</th><th>Item</th>" + userList + "</table>";
        }
    });

    $(".clickable-row").click(function() {
        alert("Start conversation with " + $(this).attr('user') + " about item " + $(this).attr('item'));
    });
}
