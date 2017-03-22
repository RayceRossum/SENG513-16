var express = require('express');
var app = express();

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

var pg = require('pg');
var query = require('pg-query');
var db = require('./db');

query.connectionParameters = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/handel";
db.bootstrap(query);

passport.use(new Strategy(
    function(username, password, cb) {
        console.log(username);
        db.users.findByUsername(query, username, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            // Check password is equal to entry for password
            // TODO: Actually implement hashing
            console.log(bcrypt.compareSync(password, user.password_hash));
            if (bcrypt.compareSync(password, user.password_hash)) {
                return cb(null, user);

            }
            return cb(null, false);
        });
    }));

passport.serializeUser(function(user, cb) {
    console.log(user.username);
    cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
    db.users.findByUsername(query, username, function(err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// Configure Express application.
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

var authRoutes = require('./routes/authentication')(express, query, passport, db);
app.use('/', authRoutes);

app.get('/buyer', function(request, response) {
    if (request.user) {
        response.render('pages/buyer', {
            user: request.user
        });
    } else {
        response.redirect('/');
    }
});

app.post('/submitAd', function(request, response) {
    response.redirect('/');
    console.log(request.body.item);
    console.log(request.body.image);
    console.log(request.body.country);
    console.log(request.body.details);

});

app.listen(app.get('port'), function() {
    console.log("Node app running on port: " + app.get('port'));
});
