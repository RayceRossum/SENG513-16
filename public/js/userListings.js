$(document).ready(function() {
     $.ajax({
        type: "GET",
        url: "/getUserListings",
        success: function(data) {
            var jsonObj = JSON.parse(data);

            $('#userListings').empty();

            $('#prevbtnL').prop('disabled', true);

            if (jsonObj[0] === "true") {
                $('#nextbtnL').prop('disabled', true);
            }

            for (var i = 0; i < jsonObj[1].length; i++) {
                $('#userListings').append('<li class="list-group-item row">' +
                    '<div class="col-md-6">' + jsonObj[1][i].item + '</div>' +
                    '<div class="col-md-3"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                    '<div class="col-md-3"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
            }
        }

    });
    
});