"use strict";

/**
 * @namespace Search
 */

var server = require("server");

var System = require("dw/system");

var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var page = module.superModule; //inherits functionality from next Product.js found to the right on the cartridge path
server.extend(page);

/**
 * Search-Show : This endpoint is called when a shopper type a query string in the search box
 * @name Base/Search-Show
 * @function
 * @memberof Search
 * @param {middleware} - cache.applyShortPromotionSensitiveCache
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - q - query string a shopper is searching for
 * @param {querystringparameter} - search-button
 * @param {querystringparameter} - lang - default is en_US
 * @param {querystringparameter} - cgid - Category ID
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.append(
    "Show",
    function (req, res, next) {
        var viewData = res.getViewData();
        var site = System.Site.getCurrent();
        var productHides = site.preferences.custom["product-hides"];
        var showProduct = [];

        viewData.productSearch.productIds.forEach(function (product) {
            if (productHides.indexOf(product.productID) === -1) {
                showProduct.push(product);
            }
        });
        viewData.productSearch.productIds = showProduct;
        viewData.productSearch.count = showProduct.length;
        res.setViewData(viewData);
        return next();
    },
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();
