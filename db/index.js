exports.users = require("./users");

exports.bootstrap = function(query) {
    exports.users.bootstrap(query);
    // Add new table bootstraps here
};

exports.findUserByUsername = function(query, username, cb) {
    exports.users.findByUsername(query, username, cb);
}
