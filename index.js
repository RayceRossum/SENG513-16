var express = require('express');
var app = express();
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Configure Express application.
app.use(require('morgan')('combined'));


app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/db', function(request, response) {
    response.render('pages/db');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
