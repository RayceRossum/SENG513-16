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
                
                for (var i = 0; i < jsonObj.length; i++){
                    $('#listings').append('<li class="list-group-item row">' +
                                        '<div class="col-md-4">' + jsonObj[i].item + '</div>' +
                                        '<div class="col-md-4">' + jsonObj[i].buyerLoc + '</div>' +
                                        '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
                }
            }
        });
     });
    
    $(document).on("click", ".openListing", function () {
        
        var listId = $(this).data('id');
        alert(listId);
        
        $.ajax({
            type: "POST",
            url: "/getAdDetails",
            data: {'listingId': listId},
            success: function(data){
                
                var jsonObj = JSON.parse(data);
                
                alert(jsonObj);
                
                $('#listUser').empty();
                $('#listItem').empty();
                $('#listBuyerLoc').empty();
                $('#listItemLoc').empty();
                $('#listImage').empty();
                $('#listDetails').empty();
                
                $('#listUser').append(jsonObj.user);
                $('#listItem').append(jsonObj.item);
                $('#listBuyerLoc').append(jsonObj.buyerLoc);
                $('#listItemLoc').append(jsonObj.itemLoc);
                $('#listImage').append("void");
                $('#listDetails').append(jsonObj.details);
        }
        });
        
    });
});