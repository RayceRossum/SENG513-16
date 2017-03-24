module.exports = function(express, query, db) {
    var router = express.Router();
    
    var countries = require("country-data").countries;

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
    
    router.post('/filterListings', function(request, response) {
        //fetch rows from ads table that match itemLoc and buyerLoc
        if (!request.body.itemLoc && !request.body.buyerLoc){
            console.log("No locations specified");
        }
        else{
            db.ads.getAdsByCountry(query,request.body.itemLoc, request.body.buyerLoc, function(result){
                
                var listings = [];
                
                console.log(result[0].itemloc);
                
                for (var i = 0; i < result.length; i++){
                    listings.push({ id: result[i].id, item: result[i].item, buyerLoc: result[i].buyerloc});
                }
                
                response.end(JSON.stringify(listings));
                
            });
        }
        
    });
    
    router.post('/getAdDetails', function(request, response){
        console.log(request);
        
        if(!request.body.listingId) console.log(err);
        
        else{
            console.log("entered");
            db.ads.getListing(query, request.body.listingId, function(result){
                
                if(!result)
                    response.end("invalid");
                else{
                    var listing = { user: result[0].username, item: result[0].item, buyerLoc: result[0].buyerloc, itemLoc: result[0].itemloc, details: result[0].details };
                    response.end(JSON.stringify(listing));
                }
            });
        }
        
    });
        
    return router;
}