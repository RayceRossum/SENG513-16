$(document).ready(function(){
  $("#my-profile-button").on("click", function(){
    var username = $(this).data('username');

    $.ajax({
        type: "POST",
        url: "/getProfile",
        data: {
            username: username
        },
        success: function(profile) {
          console.log(profile);
          $('#myProfileModal .profile-username').text(profile.username);
          $('#myProfileModal .profile-type').text(profile.accounttype);
          $('#myProfileModal .profile-country').text(profile.country);
          $('#myProfileModal .profile-rating').text(profile.rating);
        }
    });
  });
});