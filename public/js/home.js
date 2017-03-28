$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/getStats",
        success: function(data) {
            var jsonObj = JSON.parse(data);

            if (jsonObj[0][0]) {
                $('#nUsers').empty();
                $('#nUsers').append(jsonObj[0][0]);
            }
            if (jsonObj[0][1]) {
                $('#nHandelers').empty();
                $('#nHandelers').append(jsonObj[0][1]);
            }
            if (jsonObj[0][2]) {
                $('#nAds').empty();
                $('#nAds').append(jsonObj[0][2]);
            }
            if (jsonObj[1][0]) {
                $('#item1').empty();
                $('#item1').append(jsonObj[1][0]);
            }
            if (jsonObj[1][1]) {
                $('#item2').empty();
                $('#item2').append(jsonObj[1][1]);
            }
            if (jsonObj[1][2]) {
                $('#item3').empty();
                $('#item3').append(jsonObj[1][2]);
            }
            if (jsonObj[1][3]) {
                $('#item4').empty();
                $('#item4').append(jsonObj[1][3]);
            }
            if (jsonObj[1][4]) {
                $('#item5').empty();
                $('#item5').append(jsonObj[1][4]);
            }

        }

    });
});
