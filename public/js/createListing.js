$(document).ready(function() {

    $("#imagePreview").error(function() {
        $(this).hide();
    });

    $('#image').change(function() {
        if ($('#image').val)
            readURL(this);
    });

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#imagePreview').attr('src', e.target.result);
                $('#imagePreview').show();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#uploadListing").validate({
        submitHandler: function() {
            event.preventDefault();

            var form = $('#uploadListing')[0];
            var formData = new FormData(form);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/submitAd", //path of url where u want to submit form
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function(data) {
                    if (data === "true") {
                        $('#uploadListing').before('<div id="listingSuccessAlert" class="alert alert-success alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Success!</strong> Your new post has successfully been added. Please wait for a registered Handeler to accept' + '</div>');
                        $('#uploadListing').addClass('hidden', true);
                        $('#item').val('');
                        $('#image').val('');
                        $('#details').val('');
                        $('#imagePreview').hide();
                        $('#cs1').val('');
                        $('#submitListing').hide();
                        $('.handelerSearch').load("/listings");
                        $('.users').load("/userListings");
                    } else if (data === "noCountry"){
                        $('#uploadListing').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Please specify your location in Profile Settings' + '</div>');
                    } else {
                        $('#uploadListing').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Please ensure the fields are populated correctly' + '</div>');
                    }
                }
            });
        }
    });
});

function reloadCreateListingModal() {
    $('#uploadListing').removeClass('hidden', true);
    $('#submitListing').show();
    $('#listingSuccessAlert').remove();
}
