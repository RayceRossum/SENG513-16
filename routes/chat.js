module.exports = function(express, query, db) {
    var router = express.Router();

    router.get('/chat', function(request, response) {
        if (request.user) {
            response.render('pages/chat', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });

    return router;
}
