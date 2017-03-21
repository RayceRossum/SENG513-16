exports.users = require("./users");

exports.bootstrap = function(query) {
    exports.users.bootstrap(query);
    // Add new table bootstraps here
};

// TODO: Remove outer function, users already exported.
exports.findUserByUsername = function(query, username, cb) {
    exports.users.findByUsername(query, username, cb);
}
