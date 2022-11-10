/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
//var assert = require('chai').assert;
//var expect = chai.expect;
//var assert = chai.assert;

var module = "Entities"
var htmlMembersList = "";
var contextPath = "";
describe('Entities Module', function () {
    this.timeout(100000);
    this.slow(300000)


    before("Delete All", function () {
        nsEntitiesService.accountId = accountId
        var allItemsRsp = nsEntitiesService.serviceList()
        // allItemsRsp.forEach(function (item) {
        // 	nsEntitiesService.serviceDelete(item)
        // })
    })

// Tests

    describe('Entities Module: Feature - Delete Links', function () {

        context('Type Events', function () {
            it("Retrieve entity object", function (done) {
                nsEntitiesService.accountId = accountId
                nsEntitiesService.productId = productId
                nsEntitiesService.productId = "prod_Hpi0igtfYsy29q"
                var rsp = nsEntitiesService.deleteLinks()
                chai.expect(rsp.id).to.match(/[a-zA-Z0-9]+/);
                // Update Shadow DB?
                this._runnable.title = this._runnable.title + "New product created (" + rsp.id + ")";

                done()
            });
        });

    });


});
//# sourceURL=api_entities_test.js