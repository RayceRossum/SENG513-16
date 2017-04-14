module.exports = function(express, query, db) {
    var router = express.Router();

    router.post('/getProfile', function(request, response) {
        if (request.user) {
          if (request.body.profileUsername) {
            var profileData = db.profiles.getProfile(query, request.body.profileUsername, function(err, userData) {
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

    router.post('/getMessages', function(request, response) {
      if (request.user) {
        if (request.body.conversationID) {
          var messages = db.messages.getMessages(request.body.conversationID, query, function(err, result) {
            console.log(result);
            response.status(200).send(result);
          });
        }
      } else {
        response.redirect('/');
      }
    });

    return router;
}
