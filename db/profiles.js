exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"Profiles\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"Profiles\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, username text NOT NULL, accountType text NOT NULL, country text, handelerRating int DEFAULT 0, totalRatings int DEFAULT 0);", function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    query("INSERT INTO public.\"Profiles\" (username, accountType, country, handelerRating, totalRatings) VALUES ('username', 'handeler', 'CAN', 4.5, 2)", function(err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            query("INSERT INTO public.\"Profiles\" (username, accountType, country) VALUES ('buyer', 'buyer', 'CAN')", function(err, result) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log("Success: Profiles");
                                }
                            });
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
                console.error(err);
            } else {
                if (result[0]) {
                    cb(null, result[0].accounttype);
                } else {
                    cb(username + " not found.", null);
                }
            }
        });
}


exports.getProfile = function(query, username, cb) {
    query("SELECT * FROM public.\"Profiles\" WHERE username = $1::varchar;", [username],
        function(err, result) {
            if (err) {
                console.error(err)
            } else {
                if (result[0]) {
                    query("SELECT COUNT(*) FROM public.\"Listings\" WHERE username = $1::varchar;", [username],
                        function(err, result2) {
                            if (err) {
                                console.error(err);
                            } else {
                                cb(null, result.concat(result2));
                            }
                        });
                } else {
                    cb(username + " not found.", null);
                }
            }
        });
}

exports.getUserCountry = function(query, username, cb){
    query("SELECT country FROM public.\"Profiles\" WHERE username = $1::varchar;", [username],
          function(err, result) {
              if (err) {
                  console.error(err);
              } else{
                  if(result[0]){
                      cb(null, result[0]);
                  }
                  else{
                      cb("No country found for username: " + username, null);
                  }
             
              }
            });
}

exports.fetchRatingData = function(query, username, cb) {
    query("SELECT handelerRating, totalRatings FROM public.\"Profiles\" WHERE username = $1::varchar;", [username],
        function(err, result) {
            if (err) {
                console.log(err);
                cb(err, null);
            } else {
                cb(null, result);
            }
        });
}

exports.updateRatingData = function(query, username, rating, totalRatings, cb) {
    query("UPDATE public.\"Profiles\" SET handelerRating = $1::int, totalRatings = $2::int WHERE username = $3::varchar;", [rating, totalRatings, username],
        function(err, result) {
            if (err) {
                console.log("username:" + username + " rating: " + rating + " nRatings: " + totalRatings);
                console.log(err);
                cb(err);
            } else {
                cb(null);
            }
        });

}

exports.upgrade = function(query, username, cb) {
    query("UPDATE public.\"Profiles\" SET accounttype = 'handeler' WHERE username = $1::varchar;", [username],
        function(err, result) {
            if (err) {
                console.log(err);
                cb(false, null);
            } else {
                cb(null, true);
            }
        });
}

exports.updateCountry = function(query, username, country, cb){
    query("UPDATE public.\"Profiles\" SET country = $1::varchar WHERE username = $2::varchar;", [country, username],
         function(err, result){
            if (err) {
                console.log(err);
                cb(false, null);
            } else {
                cb(null, true);
            }
    });
}
