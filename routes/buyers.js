"use strict";

module.exports = function(express, query, db) {
    var router = express.Router();

    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    const fileUpload = require('express-fileupload');
    router.use(fileUpload());

    router.get('/buyer', function(request, response) {
        if (request.user) {
            response.render('pages/buyer', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });

    router.post('/submitAd', function(request, response) {
        var fileName;

        var count;

        if (!request.body.item) {
            response.end("false");
        } else {
            db.ads.getCount(query, function(err, rows) {
                console.log(request);
                if (request.files.image) {
                    fileName = "img_" + rows + "." + request.files.image.name.split('.').pop();
                    let file = request.files.image;

                    file.mv('./images/ads/' + fileName, function(err) {
                        if (err)
                            console.log(err);
                        else
                            console.log("Successful upload");
                    });
                } else {
                    fileName = "undefined";
                }

                var adData = {
                    username: request.user.username,
                    item: request.body.item,
                    imageName: fileName,
                    itemLoc: request.body.country,
                    buyerLoc: "CAN",
                    details: request.body.details,
                };

                db.ads.insertAd(query, adData);

                response.end("true");

            });
        }
    });

    return router;
}
