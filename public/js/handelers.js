var pgnumber = 0;

$(document).on("pageload")

$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "/getRecentAds",
        success: function(data){
            alert(data);
            var jsonObj = JSON.parse(data);
            
            $('#listings').empty();
            
            $('#prevbtn').prop('disabled',true);
            
            if(jsonObj[1].length == 0 || jsonObj[1].length < 2){
                $('#nextbtn').prop('disabled',true);
            }
            
            for (var i = 0; i < jsonObj[1].length; i++){
                $('#listings').append('<li class="list-group-item row">' +
                                      '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                                      '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                                      '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
            }
        }
        
    });
    
    $('#nextbtn').on('click', function(e){
        pgnumber++;
       $.ajax({
           type: "POST",
           url: "/getPage",
           data: {pagenum: pgnumber},
           success: function(data){
               var jsonObj = JSON.parse(data);
               
               $('#listings').empty();
               
               if(jsonObj[0] == "true"){
                   $('#nextbtn').prop('disabled',true);
               }
               
               for (var i = 0; i < jsonObj[1].length; i++){
                   $('#listings').append('<li class="list-group-item row">' +
                                         '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                                         '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                                         '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
               }
               $('#prevbtn').prop('disabled',false);
           }
       });
        
    });
    
        $('#prevbtn').on('click', function(e){
        pgnumber--;
            
       $.ajax({
           type: "POST",
           url: "/getPage",
           data: {pagenum: pgnumber},
           success: function(data){
               var jsonObj = JSON.parse(data);
               
               $('#listings').empty();
               
               if(jsonObj[0] == "true"){
                   $('#prevbtn').prop('disabled',true);
               }
               
               for (var i = 0; i < jsonObj[1].length; i++){
                   $('#listings').append('<li class="list-group-item row">' +
                                         '<div class="col-md-4">' + jsonObj[1][i].item + '</div>' +
                                         '<div class="col-md-4">' + jsonObj[1][i].buyerLoc + '</div>' +
                                         '<div class="col-md-4"><a class="openListing" href="#" data-id="' + jsonObj[1][i].id + '" data-toggle="modal" data-target="#bannerformmodal">More</a></div>');
               }
               $('#nextbtn').prop('disabled',false);
               
           }
       });
        
    });
    
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

        $.ajax({
            type: "POST",
            url: "/getAdDetails",
            data: {'listingId': listId},
            success: function(data){

                var jsonObj = JSON.parse(data);

                $('#listUser').empty();
                $('#listItem').empty();
                $('#listBuyerLoc').empty();
                $('#listItemLoc').empty();
                $('#listImage').empty();
                $('#listDetails').empty();

                $('#listUser').append(jsonObj.user);
                $('#listItem').append(jsonObj.item);
                $('#listBuyerLoc').append(jsonObj.buyerLoc);

                if(jsonObj.itemLoc)
                    $('#listItemLoc').append(jsonObj.itemLoc);
                if(jsonObj.imagedata)
                    $('#listImage').append(jsonObj.imagedata);
                if(jsonObj.details)
                    $('#listDetails').append(jsonObj.details);
        }
        });

    });
});
