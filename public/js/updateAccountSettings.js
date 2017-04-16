$(".loadAccSettings").click(function(){
    $('#currentEmail').empty();
    
    $.ajax({
        type: "POST",
        url: "/getUserEmail",
        data: {
            username: $(this).data('username')
        },
        success: function(data){
            if(data !== "false"){
                $('#currentEmail').text(data);
            }
        }
    });
    
});

$("#updateAccountSettingsForm").submit(function(event) {
    event.preventDefault();
    
    var newPass = "false";
    
    if($("#currentPassword").val()){
        if(!$("#newPassword").val() || !$("#confirmPassword").val()){
            $('#updateAccountSettingsForm').before('<div id="accSettingsAlert" class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Please Confirm Your New Password' + '</div>');
            return;
        }
    }
    
    if($("#newPassword").val() || $("#confirmPassword").val()){
        if(!$(currentPassword).val()){
            $('#updateAccountSettingsForm').before('<div id="accSettingsAlert" class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Please Enter Your Current Password' + '</div>');
            return;
        }
    }
    
    if($("#newPassword").val() !== $("#confirmPassword").val()){
        $('#updateAccountSettingsForm').before('<div id="accSettingsAlert" class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> The two password do not match' + '</div>');
        return;
    }
    
    if($("#currentPassword").val()){
        newPass = "true";
    }
    
    if(newPass === "false" && !$("#newEmail").val()){
        $('#updateAccountSettingsForm').before('<div id="accSettingsAlert" class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> There is nothing to update' + '</div>');
        return;        
    }
    
    var form = $('#updateAccountSettingsForm')[0];
    var formData = new FormData(form);
    formData.append("newPass", newPass);
    
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/updateAccountSettings", //path of url where u want to submit form
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(data) {
            if(data === "true"){
                $('#updateAccountSettingsForm').before('<div id="AccountSettingsSuccessAlert" class="alert alert-success alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' +   '<strong>Success!</strong> Successfully Update Your Country' + '</div>');
            } else if (data === "badPass"){
                $('#updateAccountSettingsForm').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Your Password Does Not Match' + '</div>');
            } else{
                $('#updateAccountSettingsForm').before('<div class="alert alert-danger alert-dismissable">' + '<a href="#"' + 'class="close" data-dismiss="alert" aria-label="close">&times;</a>' + '<strong>Error!</strong> Error Updating Your Settings' + '</div>');
            }
        }
    });

});