exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Profiles\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Profiles\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, username text NOT NULL, accountType text NOT NULL);", function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    query("INSERT INTO public.\"Profiles\" (username, accountType) VALUES ('username', 'handeler')", function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Success: Profiles");
                        }
                    });
                }
            });
        }
    })
}

exports.isHandeler = function(query, username, cb) {
    query("SELECT * FROM public.\"Profiles\" WHERE username = $1::varchar;", [username],
        function(err, result) {
            if (err) {
                console.error(err)
            } else {
                if (result[0]) {
                    cb(null, result[0].accounttype);
                } else {
                    cb(username + " not found.", null);
                }
            }
        });
}
