$(document).ready(function() {
    $("#my-profile-button").on("click", function() {
        var username = $(this).data('username');

        $.ajax({
            type: "POST",
            url: "/getProfile",
            data: {
                username: username
            },
            success: function(profile) {
                alert(JSON.stringify(profile));
                $('#myProfileModal .profile-username').text(profile.username);
                $('#myProfileModal .profile-type').text(profile.accounttype.charAt(0).toUpperCase() + profile.accounttype.slice(1));
                $('#myProfileModal .profile-country').text(profile.country);
                $('#myProfileModal .profile-rating').text(parseInt(profile.handelerrating)/parseInt(profile.totalratings));
            }
        });
    });
});
