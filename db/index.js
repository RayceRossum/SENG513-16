

exports.users = require("./users");

exports.bootstrap = function(query) {
    exports.users.bootstrap(query);
    // Add new table bootstraps here
};

exports.findUserByUsername = function(username, connectionString, cb) {
    if (err) return console.error(err);
    exports.users.findByUsername(username, client, done, cb);
}
