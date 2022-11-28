/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var assetId = parsedUrl.searchParams.get("assetId");
var customerId = parsedUrl.searchParams.get("customerId");
//var assert = require('chai').assert;
//var expect = chai.expect;
//var assert = chai.assert;

var module = "Fixtures"
var htmlMembersList = "";
var contextPath = "";
describe(module + 'Module', function () {
    this.timeout(100000);
    this.slow(300000)

    before("Delete All", function () {
        nsFixturesService.accountId = accountId
        nsFixturesService.getAll()
        nsFixturesService.objs.forEach(function (item) {
            nsFixturesService.dbId = item._id
            nsFixturesService.modificationServices.delete()
        })
    })
    return

// Tests
    describe(module + 'Module: Feature - Create new entity', function () {

        context('Context - Smoke Test', function () {
            it("Create test", function () {
                $("#mgtFixtures").click()
                this.timeout(60000)

                uxEventFixtures.getIds().forEach(function (item) {
                    nsFixturesService.modelItem.from = $("#" + item.startTimeFixture_).val();
                    nsFixturesService.modelItem.to = $("#" + item.endTimeFixture_).val();
                    nsFixturesService.modelItem.annotate = $("#" + item.annotateFixture_).val();
                    nsFixturesService.modelCreate.item.push(nsFixturesService.modelItem);
                });
                if (nsFixturesService.modelCreate.item.length > 0) {
                    nsFixturesService.modelCreate.accountId = accountId;
                    nsFixturesService.modelCreate.productId = productId;
                    var rsp = nsFixturesService.create()
                    // update
                    nsEntitiesService.modelCreate.links.seatingId = rsp._id
                    chai.expect(rsp._id).to.match(/[a-zA-Z0-9]+/);
                    // Update Shadow DB?
                    this._runnable.title = this._runnable.title + "New Fixtures created (" + rsp._id + ")";

                }
            });
        });


    });


});
//# sourceURL=api_fixtures_component_test.js