var bcrypt = require('bcrypt');

exports.findByUsername = function(query, username, cb) {
    process.nextTick(function() {
        query("SELECT * FROM public.\"Users\" where username = $1::varchar OR email = $1::varchar;", [username], function(err, result) {
            if (err) {
                return console.error(err);
            }
            if (result[0]) {
                if (result[0].username === username || result[0].email === username) {
                    return cb(null, result[0]);
                }
            }
            return cb(null, null);
        });
    })
};

exports.addUser = function(query, username, email, password, cb) {
    process.nextTick(function() {
        query("INSERT INTO public.\"Users\" (username, email, password_hash) VALUES ('$1::varchar,  $2::varchar,  $3::varchar');", [username, email, bcrypt.hashSync(password, 10)], function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
    });
};

exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Users\"", function(err, result) {
        if (err) {
            console.error(err);
        } else {
            query("CREATE TABLE public.\"Users\"(id SERIAL PRIMARY KEY, username text NOT NULL, email text NOT NULL, password_hash text NOT NULL);", function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    query("INSERT INTO public.\"Users\" (username, email, password_hash) VALUES('username', 'username@handel.com', '" + bcrypt.hashSync("password", 10) + "')", function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Success: Users");
                        }
                    });

                }
            });
        }
    });
};
