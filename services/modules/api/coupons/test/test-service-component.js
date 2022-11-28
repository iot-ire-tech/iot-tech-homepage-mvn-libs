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

var module = "xxx"
var contextPath = "";
describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

    before("Delete All", function () {
//		nsEntitiesService.modelEntityQuery.accountId = accountId
//		var allItemsRsp = nsEntitiesService.serviceList()
//		allItemsRsp.forEach(function (item) {
//			nsEntitiesService.serviceDelete(item)
//		})

//$ = require('jquery');

    })

// Tests
    describe(module + ' : Feature - Create new .....', function () {

        context('Context - Smoke Test', function () {
            it("Create test", function (done) {
                nsCouponsService.accountId = accountId;
                nsCouponsService.modelItem.name = "test-coupon";
                nsCouponsService.modelItem.amountOff = 1;
                nsCouponsService.modelItem.currency = "eur";
                nsCouponsService.modelItem.duration = 7;
                nsCouponsService.modelItem.durationInMonths = 0;
                nsCouponsService.modelItem.timesRedeemed = 1;
                var rsp = nsCouponsService.create()
                chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New Coupon Item Created')
                done()
            });


        });
    });


});
//# sourceURL=api_template_component_test.js