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
            userList += "<tr user='" + elem.username + "' item='" + elem.item + "' conversationID='" + elem.conversationID + "' class='userList clickable-row'><td>" + elem.username + "</td><td>" + elem.item + "</td></tr>";
        });

        var popover = $('#openMessaging').data('bs.popover');
        popover.options.content = function() {
            return "<table id='messaging' class='table table-hover table-condensed'><tr class='userList'><tr><th>User</th><th>Item</th>" + userList + "</table>";
        }
    });

    $("#messaging").on('click', 'tr', function() {
        var user = $(this).attr('user');
        var item = $(this).attr('item');
        var conversationID = $(this).attr('conversationID');
        $.ajax({
            type: "POST",
            url: "/getMessages",
            data: {
                conversationID: conversationID
            },
            success: function(data) {
                if (data[0]) {
                    alert("Start conversation between " + data[0].usernameSender + " and " + data[0].usernameReceiver + " " + conversationID + "\n" + JSON.stringify(data));
                } else {
                    alert("No messages");
                }
            }
        });
    });
}
