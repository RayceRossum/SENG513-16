$(".profile-button").on("click", function() {
    getProfile($(this).data('username'), true);
});

function getProfile(username, showUpgrade) {
    $.ajax({
        type: "POST",
        url: "/getProfile",
        data: {
            username: username
        },
        success: function(profile) {
            $('#profileRating').show();
            $('#myProfileModal .profile-username').text(profile[0].username);
            $('#myProfileModal .profile-type').text(profile[0].accounttype.charAt(0).toUpperCase() + profile[0].accounttype.slice(1));
            $('#myProfileModal .profile-country').text(profile[0].country);
            if (profile[0].accounttype === "handeler") {
                $('#myProfileModal .profile-rating').text(parseInt(profile[0].handelerrating));
                $('#myProfileModal .profile-total-ratings').text(parseInt(profile[0].totalratings));
            } else {
                $('#profileRating').hide();
                if (showUpgrade) {
                    $('#myProfileModal .profile-type').append("<button id='upgradeToHandeler' username=" + username + " type='button' class='btn btn-xs btn-primary pull-right'>Upgrade</button>")
                }
                
                $('#upgradeToHandeler').on("click", function() {
                    $.ajax({
                        type: "POST",
                        url: "/upgrade",
                        data: {
                            username: username
                        },
                        success: function(profile) {
                            //TODO: Is there a better way to handle this?
                            location.reload();
                        }
                    });
                });
            }
            $('#myProfileModal .profile-total-postings').text(profile[1].count);
        }
    });
}
