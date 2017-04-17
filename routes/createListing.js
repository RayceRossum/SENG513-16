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

    router.get('/getStats', function(request, response) {
        db.listings.getAllAds(query, 5, 0, function(err, results){
            if (err) console.log(err);
            else{
                var resObj = [];
                var stats = [];
                var items = [];
                for (var i = 0; i < 5; i++){
                    if (results[i]) items.push(results[i].item);
                    else break;
                }

                db.listings.getUserCount(query, function(err, results){
                    if (err) console.log(err);
                    else{
                        stats.push(results);

                        //temp until we can query for actual handelers
                        //need to change!!
                        db.listings.getHandelerCount(query, function(err, results){
                            if (err) console.log(err);
                            else{
                                stats.push(results);
                                db.listings.getCount(query, function(err, results){
                                    if (err) console.log(err);
                                    else{
                                        stats.push(results);
                                        resObj.push(stats);
                                        resObj.push(items);
                                        response.end(JSON.stringify(resObj));
                                    }

                                });
                            }

                        });
                    }
                });
            }

        });
    });

    router.post('/submitAd', function(request, response) {
        var fileName;
        var itemCountry;
        var buyerCountry;

        var count;
        if (!request.body.item) {
            response.end("false");
        } else {
            db.listings.getCount(query, function(err, rows) {
                db.profiles.getUserCountry(query, request.user.username, function(err, result){
                    if(err){
                        console.log(err);
                        response.end("false");
                    }
                    else{
                        if(!result.country){
                            response.end("noCountry");
                            return;
                        }
                        buyerCountry = result.country;
                        if (request.files.image) {
                            let imgNumber = parseInt(rows) + 1;
                            fileName = "img" + imgNumber + "." + request.files.image.name.split('.').pop();
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
                        
                        if (!request.body.country){
                            itemCountry = "undefined";
                        }
                        else{
                            itemCountry = request.body.country;
                        }
                        
                        var adData = {
                            username: request.user.username,
                            item: request.body.item,
                            imageName: fileName,
                            itemLoc: itemCountry,
                            buyerLoc: buyerCountry,
                            details: request.body.details,
                        };
                     
                        db.listings.insertAd(query, adData);
                        
                        response.end("true");
                    }
                });
                
            });
        }
    });

    return router;
}
