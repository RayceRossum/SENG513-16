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
            userpgnumber = 0;
        }

    });
    
    $("#editListing").validate({
        submitHandler: function() {
            event.preventDefault();

            var form = $('#editListing')[0];
            var formData = new FormData(form);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/saveListing", //path of url where u want to submit form
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function(data) {
                    if(data === "true"){
                        location.reload();
                }
                }
            });
        }
    });
    
    $("#editimagePreview").error(function() {
        $(this).hide();
    });

    $('#editImage').change(function() {
        if ($('#editImage').val)
            readEditURL(this);
    });

    function readEditURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#editimagePreview').attr('src', e.target.result);
                $('#editimagePreview').show();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    

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
                                              '<div class="col-md-3"><a class="editListing"  data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                                              '<div class="col-md-3"><a class="deleteListing" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
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
                                              '<div class="col-md-3"><a class="editListing" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#editListingModal">Edit</a></div>' +
                                              '<div class="col-md-3"><a class="deleteListing" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#deleteListingModal">Delete</a></div>');
                }
                $('#nextbtnL').prop('disabled', false);

            }
        });
    
    
    });
    
    $(document).on("click", ".deleteListing", function(){
        var listId = $(this).data('id');

        $.ajax({
            type: "POST",
            url: "/deleteListing",
            async: true,
            data: {
                listingId: listId
            },
            success: function(data) {
                if(data === "success"){
                    location.reload();
                }
                
            }
        });
    });
    
    $(document).on("click", ".editListing", function() {
        var listId = $(this).data('id');
        $('#idnum').val(listId);
        
        $.ajax({
            type: "POST",
            url: "/editListing",
            async: true,
            data: {
                listingId: listId
            },
            success: function(data){
                var jsonObj = JSON.parse(data);
                $('#listingIdNum').hide();    
                    
                $("#editItem").val(jsonObj.item);
                $("#editDetails").val(jsonObj.details);
                
                if(jsonObj.imagedata){
                    if($("#oldImg").length > 0){
                        $("#oldImg").remove();
                        $("#editItemGroup").after('<div class="form-group" id="oldImg"><label class="control-label"> Current Image </label><br>' + jsonObj.imagedata + '</div>');
                    }
                    else{
                        $("#editItemGroup").after('<div id="oldImg"><label class="control-label"> Current Image </label>' + jsonObj.imagedata + '</div>');
                    }
                }
                
                if(jsonObj.itemLoc !== "undefined"){
                    $('#countryPickerLabel').empty();
                    $('#countryPickerLabel').append('<label id ="countryPickerLabel" class="control-label" for="editcs1">Item Location</label>');
                    $('#countryPickerLabel').append('<input class="control-label" id="editcs1" name="country" type="text" value="' + jsonObj.itemLocCode + '"/>');
                    $("#editcs1").countrySelector();
                }
                else{
                    $('#countryPickerLabel').empty();
                    $('countryPickerLabel').append('<label id ="countryPickerLabel" class="control-label" for="editcs1">Item Location</label>');
                    $('#countryPickerLabel').append('<input class="control-label" id="editcs1" name="country" type="text"/>');
                    $("#editcs1").countrySelector();
                }
            }
        });
        
    });
});