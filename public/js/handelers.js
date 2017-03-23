$(document).ready(function() {
    
     $('#filterListings').submit(function(event) {
         alert("hello");
         event.preventDefault();
         
         var form = $('#filterListings')[0];
         var formData = new FormData(form);

         $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/filterListings", //path of url where u want to submit form
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            success: function(data) {
                alert(data);
            }
        });
     });
});