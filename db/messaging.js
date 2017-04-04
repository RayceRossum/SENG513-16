exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"messaging\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"messaging\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameHandeler text NOT NULL, usernameBuyer text NOT NULL);", function(err, result) {

                if (err) {
                    console.log(err);
                } else {
                    console.log("Success: Listings");
                }
            });
        }
    });
};
