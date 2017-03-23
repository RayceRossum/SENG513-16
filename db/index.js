exports.users = require("./users");
exports.ads = require("./ads");

exports.bootstrap = function(query) {
    exports.users.bootstrap(query);
    exports.ads.bootstrap(query);
};