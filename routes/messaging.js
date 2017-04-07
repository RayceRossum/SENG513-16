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

    return router;
}
