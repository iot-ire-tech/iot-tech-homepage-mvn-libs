/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var contextPath = "";
var module = "BillingModel";

describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

// Tests
    describe(module + ' : Feature - Retrieving Billing model .....', function () {
        context('Context - Smoke Tests', function () {
            it("Verifying Account Billing Model  ", function (done) {
                // 1. Is account
                nsBillingModelMemberService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "items": {"$elemMatch": {"accountId": accountId}}
                };
                nsBillingModelMemberService.getByQuery()

                chai.expect(nsBillingModelMemberService.obj.items).to.have.eq(1)
                done()
            });

            it("Getting Account Billing Model  ", function (done) {
                // 1. Is account
                nsBillingModelService.modelQuery = {
                    "accountId": nsBillingModelMemberService.obj.accountId,
                    "loyalty": nsBillingModelMemberService.obj.loyalty,
                    "version": nsBillingModelMemberService.obj.version
                };
                nsBillingModelService.getByQuery()

                chai.expect(nsBillingModelService.obj.items).to.have.eq(1)
                done()
            });


        });
    });


});
//# sourceURL=api_billingmodel_component_test.js