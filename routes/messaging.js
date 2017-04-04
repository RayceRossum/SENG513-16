module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/getUserList', function(request, response) {
        if (request.user) {
            var userMessages = db.messaging.getUserList(request.user.username, query, function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    response.json(result);
                }
            });
        } else {
            response.redirect('/');
        }
    });

    return router;
}
