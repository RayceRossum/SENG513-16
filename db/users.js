exports.findByUsername = function(query, username, cb) {
    process.nextTick(function() {
        query("SELECT * FROM public.\"Users\" where username = $1::varchar;", [username], function(err, result) {
            console.log("RESULT:" + JSON.stringify(result));
            if (err) {
                return console.error(err);
            }
            if (result[0].username === username) {
                return cb(null, result[0]);
            }
            return cb(null, null);
        });
    })
};

exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Users\"", function(err, result) {
        if (err) console.error(err);
        //TODO: Set username to primary key for indexing
        query("CREATE TABLE public.\"Users\"(username text NOT NULL, email text NOT NULL, password_hash text NOT NULL, salt text NOT NULL) WITH (OIDS = FALSE);", function(err, result) {
            if (err) console.error(err);
            query("INSERT INTO public.\"Users\" VALUES ('username', 'username@handel.com', 'password', 'salt')", function(err, result) {
                if (err) console.error(err);
            });
            console.log("Success: Users");
        });
    });
};
