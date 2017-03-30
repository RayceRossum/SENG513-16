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
