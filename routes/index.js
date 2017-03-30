module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/', function(request, response) {
        response.render('pages/index', {
            user: request.user,
            userType: db.profiles.isHandeler(query, request.user)
        });
    });

    return router;
}
