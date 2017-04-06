exports.users = require("./users");
exports.profiles = require("./profiles");
exports.listings = require("./listings");
exports.messages = require("./messages");
exports.messaging = require("./messaging");

exports.bootstrap = function(query) {
    exports.profiles.bootstrap(query);
    exports.users.bootstrap(query);
    exports.listings.bootstrap(query);
    exports.messages.bootstrap(query);
    exports.messaging.bootstrap(query);
};
