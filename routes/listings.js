"use strict";

module.exports = function(express, query, db) {
    var router = express.Router();

    var countries = require("country-data");
    var lookup = require("country-data").lookup;

    var fs = require('fs');

    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.post('/acceptListing', function(request, response) {
        //TODO: Better input sanitization to make sure it's not possible to create chats with any buyer
        console.log("USERNAME" + request.user.username);
        if (request.user) {
            db.messaging.acceptListing(request.user.username, request.body.usernameBuyer, request.body.listingItem, query, function(err, result) {
                console.log(result);
                response.send(result);
            });
        } else {
            response.redirect('/');
        }
    });

    router.get('/listings', function(request, response) {
        if (request.user) {
            response.render('pages/listings', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });

    router.get('/userListings', function(request, response) {
        if (request.user) {
            response.render('pages/userListings', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });

    router.get('/getRecentAds', function(request, response) {
        let upper = 0 * 2;
        let lower = 0 * 2 + 1;

        db.listings.getCount(query, function(err, count) {
            if (err) response.end("error");
            else {
                let limit = 2;
                let offset = 0;

                db.listings.getAllAds(query, limit, offset, function(err, result) {
                    var resObj = []
                    if (limit >= count) {
                        resObj.push("true");
                    } else {
                        resObj.push("false");
                    }

                    var listings = [];

                    for (var i = 0; i < result.length; i++) {
                        listings.push({
                            id: result[i].id,
                            item: result[i].item,
                            buyerLoc: result[i].buyerloc
                        });
                    }

                    resObj.push(listings);

                    response.end(JSON.stringify(resObj));
                });

            }


        });
    });

    router.post('/getUserListingPage', function(request, response) {

        db.listings.getAllUserAdsCount(query, request.user.username, function(err, count) {
            if (err) console.log(err);
            else {
                let limit = 2;
                let offset = 2 * parseInt(request.body.pagenum);

                db.listings.getAllUserAds(query, request.user.username, limit, offset, function(err, result){
                    if (err) console.log(err);
                    else{
                        var listings = [];
                        var resObj = [];

                        if (count <= (offset + limit) || offset == 0) {
                            resObj.push("true");
                        } else {
                            resObj.push("false");
                        }

                        for(var i = 0; i < result.length; i++){
                            listings.push({
                                id: result[i].id,
                                item: result[i].item
                            });
                        }

                        resObj.push(listings);
                        response.end(JSON.stringify(resObj));
                    }
                });
            }


        });
    });

    router.post('/getPage', function(request, response) {

        if (request.body.isfiltered === "false") {

            db.listings.getCount(query, function(err, count) {
                if (err) response.end("error");
                else {
                    let limit = 2;
                    let offset = 2 * parseInt(request.body.pagenum);

                    db.listings.getAllAds(query, limit, offset, function(err, result) {
                        var resObj = []
                        if (count <= (offset + limit) || offset == 0) {
                            resObj.push("true");
                        } else {
                            resObj.push("false");
                        }

                        var listings = [];

                        for (var i = 0; i < result.length; i++) {
                            listings.push({
                                id: result[i].id,
                                item: result[i].item,
                                buyerLoc: result[i].buyerloc
                            });
                        }

                        resObj.push(listings);

                        response.end(JSON.stringify(resObj));
                    });

                }


            });
        } else {
            let limit = 2;
            let offset = parseInt(request.body.pagenum) * 2;
            let buyerLoc = request.body.buyerLocation;
            let itemLoc = request.body.itemLocation;

            db.listings.getFilteredCount(query, itemLoc, buyerLoc, function(err, count) {

                db.listings.getFilteredAdsByPage(query, limit, offset, buyerLoc, itemLoc, function(err, result) {
                    var resObj = []
                    var listings = [];

                    for (var i = 0; i < result.length; i++) {
                        listings.push({
                            id: result[i].id,
                            item: result[i].item,
                            buyerLoc: result[i].buyerloc
                        });
                    }

                    if (((offset + limit) >= count) || (offset == 0)) resObj.push("true");
                    else resObj.push("false");
                    resObj.push(listings);

                    response.end(JSON.stringify(resObj));
                });
            });
        }

    });

    router.post('/filterListings', function(request, response) {
        let limit = 2;
        let offset = 0;
        let buyerLoc = request.body.buyerLoc;
        let itemLoc = request.body.itemLoc;
        //fetch rows from ads table that match itemLoc and buyerLoc
        if (!request.body.itemLoc && !request.body.buyerLoc) {
            console.log("No locations specified");
        } else {
            db.listings.getFilteredCount(query, itemLoc, buyerLoc, function(err, count) {
                db.listings.getAdsByCountry(query, limit, itemLoc, buyerLoc, function(err, result) {
                    if (err) {
                        response.end("Bad Query");
                    } else {
                        var resObj = [];
                        var listings = [];


                        for (var i = 0; i < result.length; i++) {
                            listings.push({
                                id: result[i].id,
                                item: result[i].item,
                                buyerLoc: result[i].buyerloc
                            });
                        }
                        if (count <= limit) resObj.push("true");
                        else resObj.push("false");
                        resObj.push(listings);
                        response.end(JSON.stringify(resObj));
                    }
                });


            });
        }

    });


    router.get('/getUserListings', function(request, response){
        let limit = 2;
        let offset = 0;
        db.listings.getAllUserAdsCount(query, request.user.username, function(err, count){
            db.listings.getAllUserAds(query, request.user.username, limit, offset, function(err,result){
                if (err){
                    console.log(err);
                }
                else{
                    var listings = [];
                    var resObj = [];
                    for(var i = 0; i < result.length; i++){
                        listings.push({
                            id: result[i].id,
                            item: result[i].item
                        });
                    }
                    if (count <= limit) resObj.push("true");
                    else resObj.push("false");
                    resObj.push(listings);
                    response.end(JSON.stringify(resObj));
                }

            });
        });
    });

    router.post('/fetchHandelers', function(request, response){
        var resObj = [];

        if(!request.body.listingId){
            resObj.push("error");
            esponse.end(JSON.stringify(resObj));
        }
        else{
            let listingItem = parseInt(request.body.listingId);
            db.messaging.getIds(listingItem, query, function(err, result){
                if (err) {
                    resObj.push("error");
                    response.end(JSON.stringify(resObj));
                }
                else{
                    var handelers = [];
                    for(var i = 0; i < result.length; i++){
                        handelers.push(result[i].usernamehandeler);
                    }
                    resObj.push(handelers);
                    response.end(JSON.stringify(resObj));
                }
            });
        }

    });

    router.post('/deleteListing', function(request, response){
        var resObj = [];

        if(!request.body.listingId){
            resObj.push("error");
            response.end(JSON.stringify(resObj));
        }
        else{
            let listingItem = parseInt(request.body.listingId);
            db.listings.deleteListing(query, listingItem, function(err){
                if (err){
                    resObj.push("error");
                    response.end(JSON.stringify(resObj));
                }
                else{
                    resObj.push("success");
                    response.end(JSON.stringify(resObj));
                }
            });
        }
    });


    router.post('/rateHandeler', function(request, response){
        var resObj = [];
        if(!request.body.selectHandeler){
            resObj.push("error");
            response.end(JSON.stringify(resObj));
        }
        else if(!request.body.rateHandeler || parseInt(request.body.rateHandeler) < 1 || parseInt(request.body.rateHandeler) > 5){
            resObj.push("error");
            response.end(JSON.stringify(resObj));
        }
        else if(!request.body.listingId || parseInt(request.body.listingId) < 0){
            resObj.push("error");
            response.end(JSON.stringify(resObj));
        }

        db.profiles.fetchRatingData(query, request.body.selectHandeler, function(err, result){
            if(err){
            resObj.push("error");
            response.end(JSON.stringify(resObj));
            }
            else{
                let oldRating = parseFloat(result[0].handelerrating);
                let oldTotalRatings = parseFloat(result[0].totalratings);

                let newRating = (oldRating * oldTotalRatings + parseFloat(request.body.rateHandeler)) / (oldTotalRatings + 1);
                let newTotalRatings = oldTotalRatings + 1;


                db.profiles.updateRatingData(query, request.body.selectHandeler, newRating, newTotalRatings, function(err){
                    if(err){
                        resObj.push("error");
                        response.end(JSON.stringify(resObj));
                    }
                    else{
                        resObj.push("success");
                        response.end(JSON.stringify(resObj));
                    }
                });
            }
        });

    });

    router.post('/closeListing', function(request, response) {
        var resObj = [];

        if(!request.body.listingId) {
            resObj.push("error");
            response.end(JSON.stringify(resObj));
        }
        else {
            let listingItem = parseInt(request.body.listingId);

            db.listings.deleteListing(query, listingItem, function(err){

                if(err){
                    resObj.push("error");
                    response.end(JSON.stringify(resObj));
                }

                db.messaging.getIds(listingItem, query, function(err, result){
                    if (err) {
                        resObj.push("error");
                        response.end(JSON.stringify(resObj));
                    }
                    else{
                        db.messaging.deleteConv(listingItem, query, function(err, result2){
                            if (err) {
                                resObj.push("error");
                                response.end(JSON.stringify(resObj));
                            }
                            else{
                                for(var i = 0; i < result.length; i++){
                                    db.messages.deleteMessages(result[i].conversationid, query, function(err, result3){
                                        if (err) {
                                            resObj.push("error");
                                            response.end(JSON.stringify(resObj));
                                        }
                                    });
                                }
                                resObj.push("success");
                                response.end(JSON.stringify(resObj));
                            }
                        });
                    }
                });
            });
            }
    });

    router.post('/saveListing', function(request, response){
        console.log(request);
        if(!request.body.editItem){
            response.end("false");
        }
        else{
            db.listings.updateListing(query, request.body.idnum, request.body.editItem, request.body.country, request.body.editDetails);

            if(request.files.editImage){
                console.log("editImage exists");
                db.listings.getImageName(query, request.body.idnum, function(err, result){
                    let file = request.files.editImage;
                    var fileName;
                    //if image already exists, replace
                    if((result[0].imagename) && (result[0].imagename !== "undefined")){
                        fileName = result[0].imagename.substring(0,result[0].imagename.indexOf('.'));
                        fileName = fileName + "." + request.files.editImage.name.split('.').pop();

                        file.mv('./images/ads/' + fileName, function(err) {
                            if (err){
                                console.log("error updating new image");
                                console.log(err);
                            }
                            else{
                                db.listings.updateImage(query, request.body.idnum, fileName);
                                console.log("Successful upload");
                                response.end("true");
                            }
                        });
                    }
                    //if not current image, add new one
                    else{
                        console.log("No image exists")
                        fileName = "img" + request.body.idnum + "." + request.files.editImage.name.split('.').pop();
                        file.mv('./images/ads/' + fileName, function(err) {
                            if (err){
                                console.log("error uploading new image");
                                console.log(err);
                            }
                            else{
                                console.log("Successful upload");
                                db.listings.updateImage(query, request.body.idnum, fileName);
                                response.end("true");
                            }
                        });
                    }
                });
            }
            else{
                response.end("true");
            }
        }
    });



    router.post('/editListing', function(request, response){

        if (!request.body.listingId) console.log(err);

        else {
            db.listings.getListing(query, request.body.listingId, function(err, result) {

                if (!result)
                    response.end("invalid");

                else {
                    var country;
                    if (result[0].itemloc === null || result[0].itemloc === "undefined") {
                        country = "undefined";
                    } else {
                        country = lookup.countries({
                            alpha3: result[0].itemloc
                        })[0].name;
                    }

                    if (result[0].imagename === null || result[0].imagename === "undefined") {
                        var listing = {
                            itemLocCode: result[0].itemloc,
                            user: result[0].username,
                            item: result[0].item,
                            buyerLoc: lookup.countries({
                                alpha3: result[0].buyerloc
                            })[0].name,
                            itemLoc: country,
                            details: result[0].details
                        };
                        response.end(JSON.stringify(listing));
                    } else {
                        fs.readFile("./images/ads/" + result[0].imagename, function(err, file) {
                            if (err) {
                                console.log(err);
                            } else {
                                var imagedata = new Buffer(file).toString('base64');

                                var listing = {
                                    itemLocCode: result[0].itemloc,
                                    user: result[0].username,
                                    item: result[0].item,
                                    buyerLoc: lookup.countries({
                                        alpha3: result[0].buyerloc
                                    })[0].name,
                                    itemLoc: country,
                                    imagedata: '<img id="storedImg" style="max-width:50%" src="data:image/gif;base64,' + imagedata + '">',
                                    details: result[0].details
                                };
                                response.end(JSON.stringify(listing));
                            }
                        });
                    }
                }
            });
        }

    });

    router.post('/getAdDetails', function(request, response) {

        if (!request.body.listingId) console.log(err);

        else {
            db.listings.getListing(query, request.body.listingId, function(err, result) {

                if (!result)
                    response.end("invalid");

                else {
                    var country;
                    if (result[0].itemloc === null || result[0].itemloc === "undefined") {
                        country = "undefined";
                    } else {
                        country = lookup.countries({
                            alpha3: result[0].itemloc
                        })[0].name;
                    }

                    if (result[0].imagename === null || result[0].imagename === "undefined") {
                        var listing = {
                            user: result[0].username,
                            item: result[0].item,
                            buyerLoc: lookup.countries({
                                alpha3: result[0].buyerloc
                            })[0].name,
                            itemLoc: country,
                            details: result[0].details
                        };
                        response.end(JSON.stringify(listing));
                    } else {
                        fs.readFile("./images/ads/" + result[0].imagename, function(err, file) {
                            if (err) {
                                console.log(err);
                            } else {
                                var imagedata = new Buffer(file).toString('base64');

                                var listing = {
                                    user: result[0].username,
                                    item: result[0].item,
                                    buyerLoc: lookup.countries({
                                        alpha3: result[0].buyerloc
                                    })[0].name,
                                    itemLoc: country,
                                    imagedata: '<img style="max-width:100%" src="data:image/gif;base64,' + imagedata + '">',
                                    details: result[0].details
                                };
                                response.end(JSON.stringify(listing));
                            }
                        });
                    }
                }
            });
        }

    });

    return router;
}
