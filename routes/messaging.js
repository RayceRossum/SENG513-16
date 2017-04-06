module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/getUserList', function(request, response) {
        if (request.user) {
            var userMessages = db.messaging.getUserList(request.user.username, query, function(err, userMessages) {
                if (err) {
                    console.error(err);
                } else {
                    response.status(200).send(userMessages);
                }
            });
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
