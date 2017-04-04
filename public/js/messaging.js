$(document).ready(function() {
    $('#openMessaging').popover({
        html: true,
        content: getMessagingList()
    });

    function getMessagingList() {
        return ("<ul><li>User</li><li>User</li</ul>");
    }
});
