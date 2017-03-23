exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"BuyerAds\"", function(err, result) {
        if (err) console.error(err);
        //TODO: Set username to primary key for indexing
        query("CREATE TABLE public.\"BuyerAds\"(username text NOT NULL, item text NOT NULL, imageName text NULL, country text NULL, details text NULL) WITH (OIDS = FALSE);", function(err, result) {
            if (err) console.error(err);
            console.log("Success: BuyerAds");
        });
    });
};

exports.insertAd = function(query, adData){
    query("INSERT INTO public.\"BuyerAds\" VALUES('" + adData.username + "', '" + adData.item + "', '" + adData.imageName + "', '" + adData.country + "', '" + adData.details + "')", function(err,result) {
        if (err) console.log(err);
    });
};

exports.getCount = function(query, cb){
    query("SELECT COUNT(*) FROM public.\"BuyerAds\"", function(err,result){
        cb(result[0].count);
    });
}