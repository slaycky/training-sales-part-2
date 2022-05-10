var server = require("server");

server.get("Start", function (req, res, next) {
    var template = "sitePreference";
    res.render(template);
    next();
});

module.exports = server.exports();
