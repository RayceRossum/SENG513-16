exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Listings\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Listings\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, username text NOT NULL, item text NOT NULL, imageName text NULL, buyerloc text NOT NULL, itemloc text NULL, details text NULL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    query("INSERT INTO public.\"Listings\" (username, item, buyerLoc) VALUES($1::varchar, $2::varchar, $3::varchar);", ['buyer', 'Random Item', 'Canada'], function(err, result) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Success: Listings");
                        };
                    });

                }
            });
        }
    });
};

exports.getAllUserAds = function(query, user, limit, offset, cb){
    query("SELECT * FROM public.\"listings\" WHERE username = $1::varchar ORDER BY id DESC LIMIT $2::bigint OFFSET $3::bigint;", [user, limit, offset], function(err, result){
        if (err) {
            console.log(err);
        } else {
            cb(err, result);
        }
    });
}

exports.getAllUserAdsCount = function(query, user, cb){
    query("SELECT COUNT(*) FROM public.\"listings\" WHERE username = $1::varchar;", [user], function(err, result){
        if (err) {
            console.log(err);
        } else {
            cb(err, result);
        }
    });
}

exports.getAllAds = function(query, limit, offset, cb) {
    query("SELECT * FROM public.\"Listings\" ORDER BY id DESC LIMIT $1::bigint OFFSET $2::bigint;", [limit, offset], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            cb(err, result);
        }
    });
};

exports.insertAd = function(query, adData) {
    query("INSERT INTO public.\"Listings\" (username, item, imagename, buyerloc, itemloc, details) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::varchar);", [adData.username, adData.item, adData.imageName, adData.buyerLoc, adData.itemLoc, adData.details], function(err, result) {
        if (err) console.log(err);
    });
};

exports.getCount = function(query, cb) {
    query("SELECT COUNT(*) FROM public.\"Listings\"", function(err, result) {

        cb(err, result[0].count);
    });
};

exports.getFilteredCount = function(query, itemLoc, buyerLoc, cb) {
    console.log("getFilteredCount");
    if (itemLoc !== "" && buyerLoc !== "") {
        query("SELECT COUNT(*) FROM public.\"Listings\" where buyerloc=$1::varchar AND itemloc=$2::varchar;", [buyerLoc, itemLoc], function(err, result) {

            if (err) console.log(err);
            else {
                cb(err, result[0].count);
            }
        });
    } else if (itemLoc !== "" && buyerLoc === "") {
        query("SELECT COUNT(*) FROM public.\"Listings\" where itemLoc = $1::varchar;", [itemLoc], function(err, result) {

            if (err) console.log(err);
            else {
                cb(err, result[0].count);
            }
        });
    } else if (itemLoc === "" && buyerLoc !== "") {
        query("SELECT COUNT(*) FROM public.\"Listings\" where buyerLoc = $1::varchar;", [buyerLoc], function(err, result) {

            if (err) console.log(err);
            else cb(err, result[0].count);
        });
    } else cb(false, false);

}

exports.getAdsByCountry = function(query, limit, itemLoc, buyerLoc, cb) {
    console.log("getAdsByCountry");
    if (itemLoc && buyerLoc) {
        query("SELECT * FROM public.\"Listings\" where buyerloc=$1::varchar AND itemloc=$2::varchar ORDER BY id DESC LIMIT $3::bigint OFFSET 0;", [buyerLoc, itemLoc, limit], function(err, result) {

            if (err) console.log(err);
            else {
                cb(err, result);
            }
        });
    } else if (itemLoc && !buyerLoc) {
        query("SELECT * FROM public.\"Listings\" where itemLoc=$1::varchar ORDER BY id DESC LIMIT $2::bigint OFFSET 0" + ";", [itemLoc, limit], function(err, result) {

            if (err) console.log(err);
            else {
                cb(err, result);
            }
        });
    } else if (!itemLoc && buyerLoc) {
        query("SELECT * FROM public.\"Listings\" where buyerLoc=$1::varchar ORDER BY id DESC LIMIT $2::bigint OFFSET 0" + ";", [buyerLoc, limit], function(err, result) {

            if (err) console.log(err);
            else cb(err, result);
        });
    } else cb(false, false);

};

exports.getFilteredAdsByPage = function(query, limit, offset, buyerLoc, itemLoc, cb) {
    console.log("getFilteredAdsByPage");
    if (buyerLoc && itemLoc) {
        query("SELECT * FROM public.\"listings\" where buyerloc = $1::varchar AND itemLoc = $2::varchar ORDER BY id DESC LIMIT $3::bigint OFFSET $4::bigint;", [buyerLoc, itemLoc, limit, offset], function(err, results) {
            if (err) console.log(err);
            else {
                cb(err, results)
            }
        });

    } else if (itemLoc && !buyerLoc) {
        query("SELECT * FROM public.\"Listings\" where itemloc = $1::varchar ORDER BY id DESC LIMIT $2::bigint OFFSET $3::bigint;", [itemLoc, limit, offset], function(err, results) {
            if (err) console.log(err);
            else {
                cb(err, results)
            }
        });
    } else if (!itemLoc && buyerLoc) {
        query("SELECT * FROM public.\"Listings\" where buyerloc = $1::varchar ORDER BY id DESC LIMIT $2::bigint OFFSET $3::bigint;", [buyerLoc, limit, offset], function(err, results) {
            if (err) console.log(err);
            else {
                cb(err, results)
            }
        });
    } else cb(false, false);
}

exports.getListing = function(query, listingId, cb) {
    query("SELECT * FROM public.\"Listings\" where id = $1::bigint", [listingId], function(err, result) {
        if (err) console.log(err);
        else {
            cb(err, result);
        }

    });
};

exports.getUserCount = function(query, cb) {
    query("SELECT COUNT(*) FROM public.\"Users\"", function(err, result) {
        if (err) console.log(err);
        else {
            cb(err, result[0].count);
        }
    });
}
