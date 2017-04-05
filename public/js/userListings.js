var userpgnumber = 0;

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
                                          '<div class="col-md-3"><a class="editListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                                          '<div class="col-md-3"><a class="deleteListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
            }
        }

    });
    

    $('#nextbtnL').on('click', function(e) {
        userpgnumber++;
        $.ajax({
            type: "POST",
            url: "/getUserListingPage",
            data: {
                pagenum: userpgnumber
            },
            success: function(data) {
                var jsonObj = JSON.parse(data);

                $('#userListings').empty();

                if (jsonObj[0] == "true") {
                    $('#nextbtnL').prop('disabled', true);
                }

                for (var i = 0; i < jsonObj[1].length; i++) {
                    $('#userListings').append('<li class="list-group-item row">' +
                                              '<div class="col-md-6">' + jsonObj[1][i].item + '</div>' +
                                              '<div class="col-md-3"><a class="editListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                                              '<div class="col-md-3"><a class="deleteListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
                }
                $('#prevbtnL').prop('disabled', false);
            }
        });

    });

    $('#prevbtnL').on('click', function(e) {
        userpgnumber--;

        $.ajax({
            type: "POST",
            url: "/getUserListingPage",
            data: {
                pagenum: userpgnumber
            },
            success: function(data) {
                var jsonObj = JSON.parse(data);


                $('#userListings').empty();

                if (jsonObj[0] == "true") {
                    $('#prevbtnL').prop('disabled', true);
                }

                for (var i = 0; i < jsonObj[1].length; i++) {
                    $('#userListings').append('<li class="list-group-item row">' +
                                              '<div class="col-md-6">' + jsonObj[1][i].item + '</div>' +
                                              '<div class="col-md-3"><a class="editListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                                              '<div class="col-md-3"><a class="deleteListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
                }
                $('#nextbtnL').prop('disabled', false);

            }
        });
    
    
});
    
    $(document).on("click", ".deleteListing", function() {
        
        var listId = $(this).data('id');

        $.ajax({
            type: "POST",
            url: "/deleteListing",
            data: {
                listingId: listId
            },
            success: function(data) {
                
                if(data === "success"){
                    $('.handelerSearch').load("/listings");
                    $('.users').load("/userListings");
                }
                
            }
        });
        
    });
    
});