$(document).ready(function() {
    
     $('#filterListings').submit(function(event) {
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
                
                var jsonObj = JSON.parse(data);
                
                $('#listings').empty();
                
                alert(jsonObj[0].id);
                
                for (var i = 0; i < jsonObj.length; i++){
                    $('#listings').append('<li class="list-group-item row">' +
                                        '<div class="col-md-4">' + jsonObj[i].item + '</div>' +
                                        '<div class="col-md-4">' + jsonObj[i].buyerLoc + '</div>' +
                                        '<div class="col-md-4"><a href="#" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
                }
            }
        });
     });
});