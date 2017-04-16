module.exports = function(express, query, db) {
    var router = express.Router();

    router.post('/getProfile', function(request, response) {
        if (request.user) {
          if (request.body.username) {
            var profileData = db.profiles.getProfile(query, request.body.username, function(err, userData) {
                if (err) {
                    console.error(err);
                } else {
                    response.status(200).send(userData);
                }
            });
          }
        } else {
            response.redirect('/');
        }
    });
    
    router.post('/updateProfileSettings', function(request, response) {
        
        if (request.user){
            db.profiles.updateCountry(query, request.user.username, request.body.country, function(err, result){
                if (err){
                    console.log(err);
                    response.end("false");
                } else{
                    response.end("true");
                }
                
            });
        }
        else{
            response.redirect('/');
        }
    });

    router.post('/upgrade', function(request, response) {
        if (request.user) {
          if (request.body.username) {
            var profileData = db.profiles.upgrade(query, request.body.username, function(err, userData) {
                if (err) {
                    console.error(err);
                } else {
                    response.status(200).send(userData);
                }
            });
          }
        } else {
            response.redirect('/');
        }
    });

    return router;
}
