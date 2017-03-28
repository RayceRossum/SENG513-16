$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "/getStats",
        success: function(data){
            var jsonObj = JSON.parse(data);
            if (jsonObj[0][0]){
                $('#nUsers').empty();
                $('#nUsers').append(jsonObj[0][0]);
            }
            if (jsonObj[0][1]){
                $('#nHandelers').empty();
                $('#nHandelers').append(jsonObj[0][1]);                
            }
            if (jsonObj[0][2]){
                $('#nAds').empty();
                $('#nAds').append(jsonObj[0][2]);                
            }
            if (jsonObj[1][0]){
                $('#item1').empty();
                $('#item1').append(jsonObj[1][0]);
            }
            if (jsonObj[1][1]){
                $('#item2').empty();
                $('#item2').append(jsonObj[1][1]);
            }
            if (jsonObj[1][2]){
                $('#item3').empty();
                $('#item3').append(jsonObj[1][2]);
            }
            if (jsonObj[1][3]){
                $('#item4').empty();
                $('#item4').append(jsonObj[1][3]);
            }
            if (jsonObj[1][4]){
                $('#item5').empty();
                $('#item5').append(jsonObj[1][4]);
            }
            
        }
        
    });

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

    $('#uploadAd').submit(function(event) {
        event.preventDefault();

        var form = $('#uploadAd')[0];
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
                    $('#uploadAd').before('<div class="alert alert-success alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Success!</strong> Your new post has successfully been added. Please wait for a registered Handeler to accept' + '</div>');
                    $('#item').val('');
                    $('#image').val('');
                    $('#details').val('');
                    $('#imagePreview').hide();
                } else {
                    $('#uploadAd').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Please ensure the fields are populated correctly' + '</div>');
                }
            }
        });
    });
});
