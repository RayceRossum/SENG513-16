exports.bootstrap = function(query) {
    query("DROP TABLE IF EXISTS public.\"messaging\"", function(err, result) {
        if (err) {
            console.log(err);
        } else {
            query("CREATE TABLE public.\"messaging\"(id SERIAL PRIMARY KEY, time timestamp DEFAULT current_timestamp, usernameHandeler text NOT NULL, usernameBuyer text NOT NULL, listingId int NOT NULL);", function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    query("INSERT INTO public.\"messaging\" (usernameHandeler, usernameBuyer, listingId) VALUES ('username', 'buyer', 1)", function(err, result) {
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

exports.getUserList= function(username, query, cb) {
    query("SELECT * FROM public.\"messaging\" WHERE usernameBuyer = $1::varchar OR usernameHandeler = $1::varchar;", [username], function(err, result) {
      if (err) {
        console.error(err);
        cb(err, null);
      } else {
        var userMessages = result.map(function(result) {
          if (result.usernamehandeler === username) {
            return result.usernamebuyer;
          } else {
            return result.usernamehandeler;
          }
        });
        cb(null, userMessages);;
      }
    });
};
