var pgnumber = 0;
var filtered = "false";
var itemLocation;
var buyerLocation;

$(document).on("pageload")

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/getRecentAds",
        success: function(data) {
            var jsonObj = JSON.parse(data);

            $('#listings').empty();

            $('#prevbtn').prop('disabled', true);

            if (jsonObj[0] === "true") {
                $('#nextbtn').prop('disabled', true);
            }

            for (var i = 0; i < jsonObj[1].length; i++) {
                $('#listings').append('<li class="list-group-item row">' +
                    '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                    '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                    '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
            }
        }

    });

    $('#nextbtn').on('click', function(e) {
        pgnumber++;
        $.ajax({
            type: "POST",
            url: "/getPage",
            data: {
                pagenum: pgnumber,
                isfiltered: filtered,
                itemLocation: itemLocation,
                buyerLocation: buyerLocation
            },
            success: function(data) {
                var jsonObj = JSON.parse(data);

                $('#listings').empty();

                if (jsonObj[0] == "true") {
                    $('#nextbtn').prop('disabled', true);
                }

                for (var i = 0; i < jsonObj[1].length; i++) {
                    $('#listings').append('<li class="list-group-item row">' +
                        '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                        '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                        '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
                }
                $('#prevbtn').prop('disabled', false);
            }
        });

    });

    $('#prevbtn').on('click', function(e) {
        pgnumber--;

        $.ajax({
            type: "POST",
            url: "/getPage",
            data: {
                pagenum: pgnumber,
                isfiltered: filtered,
                itemLocation: itemLocation,
                buyerLocation: buyerLocation
            },
            success: function(data) {
                var jsonObj = JSON.parse(data);


                $('#listings').empty();

                if (jsonObj[0] == "true") {
                    $('#prevbtn').prop('disabled', true);
                }

                for (var i = 0; i < jsonObj[1].length; i++) {
                    $('#listings').append('<li class="list-group-item row">' +
                        '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                        '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                        '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
                }
                $('#nextbtn').prop('disabled', false);

            }
        });

    });

    $('#filterListings').submit(function(event) {
        event.preventDefault();

        var form = $('#filterListings')[0];
        var formData = new FormData(form);

        buyerLocation = $('#buyerLoc').val();
        itemLocation = $('#itemLoc').val();

        pgnumber = 0;

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/filterListings", //path of url where u want to submit form
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {

                var jsonObj = JSON.parse(data);

                $('#listings').empty();

                for (var i = 0; i < jsonObj[1].length; i++) {
                    $('#listings').append('<li class="list-group-item row">' +
                        '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                        '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                        '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
                }

                filtered = "true";
                $('#prevbtn').prop('disabled', true);

                if (jsonObj[0] === "true")
                    $('#nextbtn').prop('disabled', true);
                else
                    $('#nextbtn').prop('disabled', false);
            }
        });
    });

    $(document).on("click", ".openListing", function() {

        var listId = $(this).data('id');

        $.ajax({
            type: "POST",
            url: "/getAdDetails",
            data: {
                'listingId': listId
            },
            success: function(data) {

                var jsonObj = JSON.parse(data);

                $('#listUser').empty();
                $('#listItem').empty();
                $('#listBuyerLoc').empty();
                $('#listItemLoc').empty();
                $('#listImage').empty();
                $('#listDetails').empty();

                $('#listUser').append(jsonObj.user);
                $('#listItem').append(jsonObj.item);
                $('#listBuyerLoc').append(jsonObj.buyerLoc);

                if (jsonObj.itemLoc)
                    $('#listItemLoc').append(jsonObj.itemLoc);
                if (jsonObj.imagedata)
                    $('#listImage').append(jsonObj.imagedata);
                if (jsonObj.details)
                    $('#listDetails').append(jsonObj.details);
            }
        });

    });
});

function acceptListing() {
    var usernameBuyer = $('#listUser').text();
    var listingItem = $('#listItem').text()

    $.ajax({
        type: "POST",
        url: "/acceptListing",
        data: {
            'usernameBuyer': usernameBuyer,
            'listingItem': listingItem
        },
        success: function(data) {
          updateUserList();
        }
    });
}
