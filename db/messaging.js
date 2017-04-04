exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"listings\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"listings\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, username text NOT NULL, item text NOT NULL, imageName text NULL, buyerloc text NULL, itemloc text NULL, details text NULL);", function(err, result) {

                if (err) {
                    console.log(err);
                } else {
                    console.log("Success: Listings");
                }
            });
        }
    });
};
