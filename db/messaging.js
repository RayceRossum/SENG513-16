exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Messaging\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Messaging\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameHandeler text NOT NULL, usernameBuyer text NOT NULL, listingItem int NOT NULL, conversationID SERIAL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    query("INSERT INTO public.\"Messaging\" (usernameHandeler, usernameBuyer, listingItem) VALUES ('username', 'buyer', 1)", function(err, result) {
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
            cb(err, null, null);
        } else {
            console.log("RESULT: " + JSON.stringify(result));
            if (result.length) {
                var userMessages = [];

                result.forEach(function(elem, index) {
                    query("SELECT * FROM public.\"Listings\" WHERE id = $1::int AND NOT deleted;", [elem.listingitem], function(err2, result2) {

                        if (result[index].usernamehandeler === username) {
                            var data = {
                                "username": result[index].usernamebuyer,
                                "item": result2[0].item,
                                "conversationID": result[index].conversationid
                            };

                            userMessages.push(data);
                        } else {
                            var data = {
                                "username": result[index].usernamehandeler,
                                "item": result2[0].item,
                                "conversationID": result[index].conversationid
                            };

                            userMessages.push(data);
                        }
                        console.log(userMessages);
                        if (index === result.length - 1) {
                            cb(null, userMessages);
                        }
                    });
                });
            } else {
                cb(null, []);
            }
        }
    });
};

exports.acceptListing = function(usernameHandeler, usernameBuyer, listingItem, query, cb) {
    query("INSERT INTO public.\"Messaging\" (usernameHandeler, usernameBuyer, listingItem) VALUES ($1::varchar, $2::varchar, $3::int)", [usernameHandeler, usernameBuyer, listingItem], function(err, result) {
        if (err) {
            console.error(err);
            cb(err, 'false', null);
        } else {
            cb(null, 'true');
        }
    });
}

exports.getIds = function(listingItem, query, cb) {
    query("SELECT conversationid, usernamehandeler FROM public.\"Messaging\" WHERE listingItem = $1::int;", [listingItem], function(err, result) {
        if (err) {
            console.error(err);
            cb(err, null);
        } else {
            cb(null, result);
        }
    });
}

exports.deleteConv = function(listingItem, query, cb) {
    query("DELETE FROM public.\"Messaging\" WHERE listingItem = $1::int", [listingItem], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            cb(null, 'true');
        }
    });
}
