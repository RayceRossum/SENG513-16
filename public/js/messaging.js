var socket = {};
$(document).ready(function() {
    $('#openMessaging').popover({
        html: true
    });
    updateUserList();

    $('#openMessaging').click(function() {
        updateUserList();
    });

    socket.io = io.connect(window.location.host);
    socket.io.emit('register', {
        username: $('#currentUser').text(),
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
                    //alert("Start conversation between " + data[0].usernameSender + " and " + data[0].usernameReceiver + " " + conversationID + "\n" + JSON.stringify(data));
                } else {
                    //alert("No messages");
                }
                if (!$("#openMessage" + conversationID).length) {
                    $("#messageBar").append("<div class='col-md-2 col-sm-2 col-xs-4'> <button id='openMessage" + conversationID + "' data-toggle='popover' data-trigger = 'click' data-placement = 'top' type='button' class='btn btn-default btn-block'>" + user + "</button> </div>");
                    $("#openMessage" + conversationID).popover({
                        html: true,
                        content: getMessageData(data, conversationID, user)
                    });
                }
                $("#openMessaging").click();
                if (!$("#openMessage" + conversationID).next('div.popover:visible').length) {
                    $("#openMessage" + conversationID).click();
                }

                $('#m' + conversationID).on('keypress', function(e) {
                    if (e.which === 13) {
                        sendMessage(this);
                    }
                });
            }
        });
    });
}

function sendMessage(context) {
    if ($(context).val() != '') {
        $(context).attr("disabled");
        var conversationID = $(context).attr('id').substr(1);

        socket.io.emit('chat', {
            usernameSender: $('#currentUser').text(),
            usernameReceiver: $('#l' + conversationID).attr('usernameReceiver'),
            message: $(context).val(),
            conversationID: conversationID
        });

        $(context).val('');
        $(context).removeAttr("disabled");
    }
}

function getMessageData(data, conversationID, usernameReceiver) {
    var messageData = "";
    data.forEach(function(elem, index) {
        var timestampD = new Date(elem.timestamp);
        var timestamp = timestampD.toLocaleDateString();
        messageData += "<li class='list-group-item'><b>" + elem.usernameSender + "</b>" + " (" + timestamp + "): " + elem.message + "</li>";
    });

    return "<ul id='l" + conversationID + "' usernameReceiver='" + usernameReceiver + "' class='list-group'>" + messageData + "</ul>" + "<div class='inner-addon right-addon'><input type='text' id='m" + conversationID + "' class='form-control' autocomplete='off'/><i class='glyphicon glyphicon-send'></i></div>";
}
