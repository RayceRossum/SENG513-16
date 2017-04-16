  
$("#updateProfileSettingsForm").submit(function(event) {
    event.preventDefault();
    
    var form = $('#updateProfileSettingsForm')[0];
    var formData = new FormData(form);
    
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/updateProfileSettings", //path of url where u want to submit form
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            if(data === "true"){
                $('#updateProfileSettingsForm').before('<div id="listingSuccessAlert" class="alert alert-success alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' +   '<strong>Success!</strong> Successfully Update Your Country' + '</div>');
            } else{
                $('#updateProfileSettingsForm').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Error Updating Your Country' + '</div>');
            }
        }
    });

});