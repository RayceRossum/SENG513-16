var records = [{
    id: 1,
    username: 'username',
    password: 'password',
    displayName: 'admin',
    emails: [{
        value: 'admin@handel.com'
    }]
}];

exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = function(username, client, cb) {
    process.nextTick(function() {
        client.query("SELECT FROM public.\"Users\" where username = $1::varchar", "[" + username + "]", function(err, result) {
            done();

            console.log(result);
            if (err) {
                return console.error(err);
            }

            if (result === username) {
                return cb(null, record);
            }
            return cb(null, null);
        });

        //     for (var i = 0, len = records.length; i < len; i++) {
        //         var record = records[i];
        //         if (record.username === username) {
        //             return cb(null, record);
        //         }
        //     }
        //     return cb(null, null);
        // });
    })
};

exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Users\"", function(err, result) {
        if (err) console.error(err);
        query("CREATE TABLE public.\"Users\"(username text NOT NULL, email text NOT NULL, password_hash text NOT NULL, salt text NOT NULL) WITH (OIDS = FALSE);", function(err, result) {
            if (err) console.error(err);
            query("INSERT INTO public.\"Users\" VALUES ('username', 'username@handel.com', 'password', 'salt')", function(err, result) {
                if (err) console.error(err);
            });
            console.log("Success: Users");
        });
    });




};
