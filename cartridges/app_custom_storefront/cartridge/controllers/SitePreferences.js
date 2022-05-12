var server = require("server");
var service = require("app_custom_storefront/cartridge/services/dadjokeservice");

server.get("Start", function (req, res, next) {
    var properties = {};
    var template = "sitePreference";
    var svcResult = service.dadJokeAPIService.call();
    if (svcResult.status === "OK") {
        properties.joke = svcResult.object.joke;
    }

    res.render(template, properties);
    next();
});

module.exports = server.exports();
