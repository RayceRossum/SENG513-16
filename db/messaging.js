exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Messaging\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Messaging\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameHandeler text NOT NULL, usernameBuyer text NOT NULL, listingItem text NOT NULL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    query("INSERT INTO public.\"Messaging\" (usernameHandeler, usernameBuyer, listingItem) VALUES ('username', 'buyer', 'Random Item')", function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Success: Messaging");
                        }
                    });
                }
            });
        }
    });
};

exports.getUserList = function(username, query, cb) {
    query("SELECT * FROM public.\"Messaging\" WHERE usernameBuyer = $1::varchar OR usernameHandeler = $1::varchar;", [username], function(err, result) {
        if (err) {
            console.error(err);
            cb(err, null);
        } else {
            var userMessages = result.map(function(result) {
                if (result.usernamehandeler === username) {
                    return result.usernamebuyer;
                } else {
                    return result.usernamehandeler;
                }
            });
            cb(null, userMessages);;
        }
    });
};

exports.acceptListing = function(usernameHandeler, usernameBuyer, listingItem, query, cb) {
    query("INSERT INTO public.\"Messaging\" (usernameHandeler, usernameBuyer, listingItem) VALUES ($1::varchar, $2::varchar, $3::varchar)", [usernameHandeler, usernameBuyer, listingItem], function(err, result) {
        if (err) {
            console.error(err);
            cb(err, 'false');
        } else {
            cb(null, 'true');
        }
    });
}
