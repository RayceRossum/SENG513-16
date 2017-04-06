exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Messages\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Messages\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameSender text NOT NULL, usernameReceiver text NOT NULL, message text NOT NULL, conversationID int NOT NULL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    query("INSERT INTO public.\"Messages\" (usernameSender, usernameReceiver, message, conversationID) VALUES ('username', 'buyer', 'Hello! I am username. I would like to help you find your Random Item.', 1)", function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Success: Messages");
                        }
                    });
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
