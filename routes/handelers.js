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
        let upper = 0*20;
        let lower = 0*20+1;
        
        db.ads.getCount(query, function(err, count){
            if (err) response.end("error");
            else{
                let newLow = parseInt(count) - lower;
                let newHigh = parseInt(count) - upper;
                console.log("new low" + newLow + " new high" + newHigh);
                
                db.ads.getAllAds(query,newLow,newHigh, function(err, result){
                    var resObj = []
                    var firstOrLast;
                    if(newHigh >= count || newLow <= 1){
                        resObj.push("true");
                    }
                    else{
                        resObj.push("false");
                    }
            
                var listings = [];
                   
                for (var i =(result.length-1); i > (-1); i--){
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
        let upper = parseInt(request.body.pagenum)*20;
        let lower = parseInt(request.body.pagenum)*20+1;
        
        console.log(request.body.pagenum);
        
        db.ads.getCount(query, function(err, count){
            if (err) response.end("error");
            else{
                let newLow = parseInt(count) - lower;
                let newHigh = parseInt(count) - upper;
                console.log("new low" + newLow + " new high" + newHigh);
                
                db.ads.getAllAds(query,newLow,newHigh, function(err, result){
                    var resObj = []
                    var firstOrLast;
                    if(newHigh >= count || newLow <= 1){
                        resObj.push("true");
                    }
                    else{
                        resObj.push("false");
                    }
            
                var listings = [];
                   
                for (var i =(result.length-1); i > (-1); i--){
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

    router.post('/filterListings', function(request, response) {
        //fetch rows from ads table that match itemLoc and buyerLoc
        if (!request.body.itemLoc && !request.body.buyerLoc) {
            console.log("No locations specified");
        } else {
            db.ads.getAdsByCountry(query, request.body.itemLoc, request.body.buyerLoc, function(err, result) {
                if (err) {
                    response.end("Bad Query");
                } else {
                    var listings = [];

                    for (var i = 0; i < result.length; i++) {
                        listings.push({
                            id: result[i].id,
                            item: result[i].item,
                            buyerLoc: result[i].buyerloc
                        });
                    }
                    response.end(JSON.stringify(listings));
                }
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
