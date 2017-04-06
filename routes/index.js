module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/', function(request, response) {
        if (request.user) {
            db.profiles.isHandeler(query, request.user.username, function(err, result) {
                response.render('pages/index', {
                    user: request.user,
                    userType: result
                });
            });
        } else {
            response.render('pages/index', {
                user: request.user
            });
        }
    });


    return router;
}
