module.exports = function(express, query, db) {
    var router = express.Router();

    var bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({
        extended: true
    }));
    
    router.get('/handeler', function(request, response) {
        if (request.user) {
            response.render('pages/handeler', {
                user: request.user
            });
        } else {
            response.redirect('/');
        }
    });
    
    router.post('/filterListings', function(request, response) {
        reponse.end("Yes");
        
    });
        
    return router;
}