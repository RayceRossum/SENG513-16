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

    router.get('/handeler', function(request, response) {
        if (request.user) {
            response.render('pages/handeler', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });
    
    router.get('/getRecentAds', function(request, response){
        let upper = 0*2;
        let lower = 0*2+1;
        
                
        db.ads.getCount(query, function(err, count){
            if (err) response.end("error");
            else{
                let limit = 2;
                let offset = 0;
                
                db.ads.getAllAds(query, limit, offset, function(err, result){
                    var resObj = []
                    if(limit >= count){
                        resObj.push("true");
                    }
                    else{
                        resObj.push("false");
                    }
            
                var listings = [];
                   
                for (var i = 0; i < result.length; i++){
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
    
    router.post('/getPage', function(request,response){
        
        if(request.body.isfiltered === "false"){
        
        db.ads.getCount(query, function(err, count){
            if (err) response.end("error");
            else{
                let limit = 2;
                let offset = 2*parseInt(request.body.pagenum);
                
                db.ads.getAllAds(query, limit, offset, function(err, result){
                    var resObj = []
                    if(count <= (offset + limit) || offset == 0){
                        resObj.push("true");
                    }
                    else{
                        resObj.push("false");
                    }
            
                var listings = [];
                   
                for (var i = 0; i < result.length; i++){
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
        }
        
        else{
            let limit = 2;
            let offset = parseInt(request.body.pagenum)*2;
            let buyerLoc = request.body.buyerLocation;
            let itemLoc = request.body.itemLocation;
            
            db.ads.getFilteredCount(query, itemLoc, buyerLoc, function(err, count){
                
                db.ads.getFilteredAdsByPage(query, limit, offset, buyerLoc, itemLoc, function(err, result){
                    var resObj = []
                    var listings = [];
                          
                    for (var i = 0; i < result.length; i++){
                        listings.push({
                        id: result[i].id,
                        item: result[i].item,
                        buyerLoc: result[i].buyerloc
                    });
                }
                
                if(((offset + limit) >= count) || (offset == 0)) resObj.push("true");
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
            db.ads.getFilteredCount(query, itemLoc, buyerLoc, function(err, count){
                db.ads.getAdsByCountry(query, limit, itemLoc, buyerLoc, function(err, result) {
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
                        if(count <= limit) resObj.push("true");
                        else resObj.push("false");
                        resObj.push(listings);
                        response.end(JSON.stringify(resObj));
                    }
                });
                   
                   
            });
        }

    });

    router.get('getAllAds', function(request, response) {
        response.end("yes");
    });

    router.post('/getAdDetails', function(request, response) {
        
        if (!request.body.listingId) console.log(err);

        else {
            db.ads.getListing(query, request.body.listingId, function(err, result) {

                if (!result)
                    response.end("invalid");

                else {

                    if (result[0].imagename === "undefined") {
                        var listing = {
                            user: result[0].username,
                            item: result[0].item,
                            buyerLoc: lookup.countries({
                                alpha3: result[0].buyerloc
                            })[0].name,
                            itemLoc: lookup.countries({
                                alpha3: result[0].itemloc
                            })[0].name,
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
                                    itemLoc: lookup.countries({
                                        alpha3: result[0].itemloc
                                    })[0].name,
                                    imagedata: '<img style="max-width:50%" src="data:image/gif;base64,' + imagedata + '">',
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
