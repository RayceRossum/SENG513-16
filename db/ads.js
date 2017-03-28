exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"BuyerAds\"", function(err, result) {

        if (err) console.error(err);

        query("CREATE TABLE public.\"BuyerAds\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, username text NOT NULL, item text NOT NULL, imageName text NULL, buyerloc text NULL, itemloc text NULL, details text NULL);", function(err, result) {

            if (err) console.error(err);

            console.log("Success: BuyerAds");
        });
    });
};

exports.getAllAds = function(query, limit, offset, cb){

        query("SELECT * FROM public.\"BuyerAds\"" + " ORDER BY id DESC" + " LIMIT " + limit + " OFFSET " + offset + ";", function(err, result){
            if (err) console.log("hi");
            else{
                cb(err,result);
            }
        });
};

exports.insertAd = function(query, adData) {
    query("INSERT INTO public.\"BuyerAds\" (username, item, imagename, buyerloc, itemloc, details) VALUES('" + adData.username + "', '" + adData.item + "', '" + adData.imageName + "', '" + adData.buyerLoc + "', '" + adData.itemLoc + "', '" + adData.details + "')", function(err, result) {

        if (err) console.log(err);
    });
};

exports.getCount = function(query, cb) {
    query("SELECT COUNT(*) FROM public.\"BuyerAds\"", function(err, result) {

        cb(err, result[0].count);
});
};

exports.getFilteredCount = function(query, itemLoc, buyerLoc, cb){
    console.log("getFilteredCount");
    if (itemLoc !== "" && buyerLoc !== ""){
        query("SELECT COUNT(*) FROM public.\"BuyerAds\" where buyerloc='" + buyerLoc +"' AND itemloc='" + itemLoc + "';",function(err,result){

            if (err) console.log(err);
            else{
                cb(err, result[0].count);
            }
        });
    }
    else if (itemLoc !== "" && buyerLoc === ""){
        query("SELECT COUNT(*) FROM public.\"BuyerAds\" where itemLoc='" + itemLoc + "';", function(err, result){

            if (err) console.log(err);
            else{
                cb(err, result[0].count);
            }
        });
    }
    else if (itemLoc === "" && buyerLoc !== ""){
        query("SELECT COUNT(*) FROM public.\"BuyerAds\" where buyerLoc='" + buyerLoc + "';", function(err, result){

            if (err) console.log(err);
            else cb(err, result[0].count);
        });
    }
    else    cb(false, false);

}

exports.getAdsByCountry = function(query, limit , itemLoc, buyerLoc, cb){
    console.log("getAdsByCountry");
    if (itemLoc && buyerLoc){
        query("SELECT * FROM public.\"BuyerAds\" where buyerloc='" + buyerLoc + "' AND itemloc='" + itemLoc + "' ORDER BY id DESC" + " LIMIT " + limit + " OFFSET 0" + ";",function(err,result){

            if (err) console.log(err);
            else{
                cb(err, result);
            }
        });
    }
    else if (itemLoc && !buyerLoc){
        query("SELECT * FROM public.\"BuyerAds\" where itemLoc='" + itemLoc + "' ORDER BY id DESC" + " LIMIT " + limit + " OFFSET 0" + ";", function(err, result){

            if (err) console.log(err);
            else{
                cb(err, result);
            }
        });
    }
    else if (!itemLoc && buyerLoc){
        query("SELECT * FROM public.\"BuyerAds\" where buyerLoc='" + buyerLoc + "' ORDER BY id DESC" + " LIMIT " + limit + " OFFSET 0" + ";", function(err, result){

            if (err) console.log(err);
            else cb(err, result);
        });
    }
    else    cb(false, false);

};

exports.getFilteredAdsByPage = function(query, limit, offset, buyerLoc, itemLoc, cb){
    console.log("getFilteredAdsByPage");
    if(buyerLoc && itemLoc){
        query("SELECT * FROM public.\"BuyerAds\" where buyerloc='" + buyerLoc + "' AND itemLoc='" + itemLoc + "' ORDER BY id DESC" + " LIMIT " + limit + " OFFSET " + offset + ";", function(err, results){
            if (err) console.log(err);
            else{
                cb(err, results)
            }
        });
        
    } 
    else if(itemLoc && !buyerLoc){
        query("SELECT * FROM public.\"BuyerAds\" where itemloc='" + itemLoc + "' ORDER BY id DESC" +  " LIMIT " + limit + " OFFSET " + offset + ";", function(err, results){
            if (err) console.log(err);
            else{
                cb(err, results)
            }
        });
    }
    else if(!itemLoc && buyerLoc){
                query("SELECT * FROM public.\"BuyerAds\" where buyerloc='" + buyerLoc + "' ORDER BY id DESC" + " LIMIT " + limit + " OFFSET " + offset + ";", function(err, results){
            if (err) console.log(err);
            else{
                cb(err, results)
            }
        });
    }
    else    cb(false,false);
}

exports.getListing = function(query, listingId, cb){
    query("SELECT * FROM public.\"BuyerAds\" where id='" + listingId + "'", function(err, result){

        if (err) console.log(err);
        else{
            cb(err, result);
        }

    });
};
