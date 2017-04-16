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
                $('#profileRating').show();
                $('#myProfileModal .profile-username').text(profile.username);
                $('#myProfileModal .profile-type').text(profile.accounttype.charAt(0).toUpperCase() + profile.accounttype.slice(1));
                $('#myProfileModal .profile-country').text(profile.country);
                if (profile.accounttype === "handeler") {
                    $('#myProfileModal .profile-rating').text(parseInt(profile.handelerrating));
                    $('#myProfileModal .profile-total-ratings').text(parseInt(profile.totalratings));
                } else {
                    $('#profileRating').hide();
                }
            }
        });
    });
});
