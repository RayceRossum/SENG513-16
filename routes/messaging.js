module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/getUserList', function(request, response) {
        if (request.user) {
            var userMessages = db.messaging.getUserList(request.user.username, query, function(err, user, item) {
                if (err) {
                    console.error(err);
                } else {
                    var data = [{user, item}];
                    response.status(200).send(data);
                }
            });
        } else {
            response.redirect('/');
        }
    });

    return router;
}
