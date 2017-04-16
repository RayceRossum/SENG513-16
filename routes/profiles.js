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

    return router;
}
