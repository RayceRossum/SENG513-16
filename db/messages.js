exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Messages\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Messages\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameSender text NOT NULL, usernameReceiver text NOT NULL, message text NOT NULL, conversationID int NOT NULL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    // query("INSERT INTO public.\"Messages\" (usernameSender, usernameReceiver, message, conversationID) VALUES ('username', 'buyer', 'Hello! I am username. I would like to help you find your Random Item.', 1)", function(err, result) {
                    //     if (err) {
                    //         console.error(err);
                    //     } else {
                    //         query("INSERT INTO public.\"Messages\" (usernameSender, usernameReceiver, message, conversationID) VALUES ('buyer', 'username', 'Hello! I am buyer. I would like you to help you find a Random Item.', 1)", function(err, result) {
                    //             if (err) {
                    //                 console.error(err);
                    //             } else {
                                    console.log("Success: Messages");
                //                 }
                //             });
                //         }
                //     });
                }
            });
        }
    });
};

exports.getMessages = function(conversationID, query, cb) {
    query("SELECT * FROM public.\"Messages\" WHERE conversationID = $1::int;", [conversationID], function(err, result) {
        if (err) {
            console.error(err);
            cb(err, null, null);
        } else {
            console.log(result);
            var userMessages = result.map(function(result) {
                var data = {
                    "usernameSender": result.usernamesender,
                    "usernameReceiver": result.usernamereceiver,
                    "message": result.message,
                    "timestamp": result.time
                };
                return data;
            });

            cb(null, userMessages);
        }
    });
}

exports.sendMessage = function(usernameSender, usernameReceiver, message, conversationID, query, cb) {
    query("INSERT INTO public.\"Messages\" (usernameSender, usernameReceiver, message, conversationID) VALUES ($1::varchar, $2::varchar, $3::varchar, $4::int)", [usernameSender, usernameReceiver, message, conversationID], function(err, result) {
        if (err) {
            cb(err, false);
        } else {
            cb(null, true)
        }
    });
}

exports.deleteMessages = function(conversationID, query, cb){
    query("DELETE FROM public.\"Messages\" WHERE conversationID = $1::int;", [conversationID], function(err, result){
        if (err) {
            cb(err, false);
        } else{
           cb(null, false);
        }
    });
}
