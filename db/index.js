exports.users = require("./users");
exports.profiles = require("./profiles");
exports.listings = require("./listings");

exports.bootstrap = function(query) {
    exports.profiles.bootstrap(query);
    exports.users.bootstrap(query);
    exports.listings.bootstrap(query);
};
