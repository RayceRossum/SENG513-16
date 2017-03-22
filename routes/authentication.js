module.exports = function(express, query, passport, db) {
    var router = express.Router();

    router.get('/', function(request, response) {
        response.render('pages/index', {
            user: request.user
        });
    });

    router.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/?Error'
        }),
        function(req, res) {
            res.redirect('/buyer');
        });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // TODO: Actually register users
    router.get('/register', function(request, response) {
        if (request.user) {
            response.redirect('/'), {
                user: request.user
            }
        } else {
            response.render('pages/register', {
                user: request.user
            });
        }
    });

    router.post('/register', function(request, response) {
      var body = request.body;
      db.users.addUser(query, body.name, body.email, body.password, function(err, result) {
        if (err) {
          console.error(err);
          response.redirect('/?Error');
        } else {
          response.redirect('/');
        }
      });
    });

    return router;
}
