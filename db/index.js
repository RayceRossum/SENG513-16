var pg = require('pg');


exports.users = require('./users');

exports.bootstrap = function(connectionString) {
  pg.connect(connectionString, function(err, client, done) {
    exports.users.bootstrap(err, client);
  });
}
