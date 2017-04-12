$(document).ready(function(){
    $("#rateHandelerForm").submit(function(event){
        event.preventDefault();

        var form = $('#rateHandelerForm')[0];
        var formData = new FormData(form);
        formData.append("listingId" , currentListing);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/rateHandeler", //path of url where u want to submit form
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
                var jsonObj = JSON.parse(data);
                if(jsonObj[0] !== "error"){
                    $.ajax({
                        type: "POST",
                        url: "/closeListing",
                        async: true,
                        data:{
                            listingId: currentListing
                        },
                        success: function(data) {
                            currentListing = null;
                            $('#rateHandelerModal').modal('hide');
                            $('.handelerSearch').load("/listings");
                            $('.users').load("/userListings");
                        }
                    });
                }
                currentListing = null;
    }
    });

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
                        $('#editListingModal').modal('hide');
                        $('.handelerSearch').load("/listings");
                        $('.users').load("/userListings");
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
    
    $("#editListingModal").on("hidden.bs.modal", function () {
        $("#oldImg").empty();
        $("#editimagePreview").attr('src', '');
        $("#editImage").val('');
    });

    $(document).on("click", ".fetchHandelers", function(){
        var listId = $(this).data('id');

        $.ajax({
            type: "POST",
            url: "/fetchHandelers",
            async: true,
            data: {
                listingId: listId
            },
            success: function(data) {
                if (data === "error"){
                    alert("Error closing listing");
                }
                else{
                    var jsonObj = JSON.parse(data);
                }
                if (jsonObj[0].length == 0){
                    $.ajax({
                        type: "POST",
                        url: "/deleteListing",
                        async: true,
                        data:{
                            listingId: listId
                        },
                        success: function(data) {
                            $('#rateHandelerModal').modal('hide');
                            $('.handelerSearch').load("/listings");
                            $('.users').load("/userListings");
                        }
                    });
                }
                else{
                    currentListing = parseInt(listId);
                    $('#selectHandeler').empty();
                    for(var i = 0; i < jsonObj[0].length; i++){
                        $('#selectHandeler').append("<option>" + jsonObj[0][i] + "</option>");
                    }
                    $('#rateHandelerModal').modal('show');
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
                    $("#oldImg").append('<div class="col-md-12 col-sm-12 col-xs-12"><label class="control-label"> Current Image </label></div>' + '<div class="col-md-12 col-sm-12 col-xs-12">' + jsonObj.imagedata + '</div>');
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