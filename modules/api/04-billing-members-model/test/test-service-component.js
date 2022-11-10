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
var module = "BillingMembers-Model";

describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

    before("Delete All", function () {
        nsBillingModelMemberService.modelQuery = {
            "accountId": "acct_1CBNZCFOjjfpNUIx",
        };
        var allItemsRsp = nsBillingModelMemberService.getByQuery()
        // allItemsRsp.obj.forEach(function (item) {
        // nsBillingModelMemberService.delete()
        // })

//$ = require('jquery');

    })

// Tests
    describe(module + ' : Feature - Add account To Billing model .....', function () {
        context('Context - Smoke Test', function () {
            it("Add Account#1", function (done) {

                nsBillingModelMemberService.modelCreate.accountId = "acct_1CBNZCFOjjfpNUIx"
                nsBillingModelMemberService.modelCreate.loyalty = "new"
                nsBillingModelMemberService.modelCreate.version = "0.1"

                nsBillingModelMemberService.modelItem = {
                    "ts": new Date().toISOString(),
                    "accountId": accountId
                };
                nsBillingModelMemberService.accountId = "acct_1CBNZCFOjjfpNUIx"
                nsBillingModelMemberService.service()

                chai.expect(nsBillingModelMemberService.obj._id, /[a-zA-Z0-9]+/, 'New Account Added To Billing Default Model')
                done()
            });


            it("Get Billing Model  ", function (done) {

                // 1. What billing model am I associated with!
                nsBillingModelMemberService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "items": {"$in": ["acct_1GRdJxF6KR5nnzBxxxx"]}
                };
                nsBillingModelMemberService.getByQuery()

                chai.expect(nsBillingModelMemberService.obj).to.have.length(0)
                done()
            });

            it("Get Billing Model  ", function (done) {
                // 1. Is account
                nsBillingModelMemberService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "items": {"$elemMatch": {"accountId": accountId}}
                };
                nsBillingModelMemberService.getByQuery()

                chai.expect(nsBillingModelMemberService.obj.items).to.have.gte(0)
                done()
            });


        });
    });


});
//# sourceURL=api_billingmodelmembers_component_test.js