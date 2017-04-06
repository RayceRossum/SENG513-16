module.exports = function(express, query, passport, db) {
    var router = express.Router();

    router.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/?Error'
        }),
        function(req, res) {
            res.redirect('/');
        });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

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
      if (body.name === "") {
        body.name = body.email;
      }
      db.users.addUser(query, body.name, body.email, body.password, function(err, result) {
        if (err) {
          console.error(err);
          response.redirect('/?Error');
        } else {
          console.log(body.name + " created.")
          response.redirect('/');
        }
      });
    });

    return router;
}
