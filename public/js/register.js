$(function() {
    $("#registerForm").validate({
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });
});
