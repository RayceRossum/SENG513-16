var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var _ = require('underscore');
var db = require('./db');

var pg = require('pg');
var connectionString = (process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/handel');


pg.connect(connectionString, onConnect);

function onConnect(err, client, done) {
    //Err - This means something went wrong connecting to the database.
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Connection to pg database successful. " + connectionString);

    // TODO: Function() Bootstrap database
    client.query("DROP TABLE IF EXISTS public.\"Users\"", function(err, result) {
        if (err) throw err;
        console.log(result.command);
    });

    client.query("CREATE TABLE public.\"Users\"(username text NOT NULL, email text NOT NULL, password_hash text NOT NULL, salt text NOT NULL) WITH (OIDS = FALSE);", function(err, result) {
        if (err) throw err;
        console.log(result.command);
    });

    client.query("INSERT INTO public.\"Users\" VALUES ('username', 'username@handel.com', 'password', 'salt')", function(err, result) {
        if (err) throw err;
        console.log(result.command);
    });
}

passport.use(new Strategy(
    function(username, password, cb) {
        db.users.findByUsername(username, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function(err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// Configure Express application.
var app = express();
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));

app.use(require('express-session')({
    secret: 'this is a secret key, it is pretty secure.',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 5000));

// 'use strict';
//
// require('greenlock-express').create({
//     server: 'staging',
//     email: 'john.doe@example.com',
//     agreeTos: true,
//     approveDomains: ['localhost', 'fathomless-scrubland-31742.com']
// }).listen(80, 443, function() {
//     console.log('Node app is running on port', 80, 443);
// });

app.get('/', function(request, response) {
    response.render('pages/index', {
        user: request.user
    });
});

app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/?Error'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/register', function(request, response) {
    response.render('pages/register', {
        user: request.user
    });
});

app.get('/db', function(request, response) {
    response.render('pages/db');
});

app.listen(app.get('port'), function() {
    console.log("Node app running on port: " + app.get('port'));
});
