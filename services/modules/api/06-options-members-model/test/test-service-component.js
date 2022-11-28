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
var module = "Options-Members-Model";

describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)


// Tests
    describe(module + ' : Feature - Add account To Options model .....', function () {
        context('Context - Smoke Test', function () {
            it("Add Account#1", function (done) {

                nsOptionsMemberModelService.modelCreate.accountId = "acct_1CBNZCFOjjfpNUIx"
                nsOptionsMemberModelService.modelCreate.level = "abc"
                nsOptionsMemberModelService.modelCreate.version = "0.1"
                nsOptionsMemberModelService.modelItem = {
                    "ts": new Date().toISOString(),
                    "accountId": accountId // new acount
                };
                nsOptionsMemberModelService.modelCreate.items.push(nsOptionsMemberModelService.modelItem)

                // need for get account
                nsOptionsMemberModelService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "level": nsOptionsMemberModelService.modelCreate.level,
                    "version": "0.1"
                }
                nsOptionsMemberModelService.service()

                chai.expect(nsOptionsMemberModelService.obj._id, /[a-zA-Z0-9]+/, 'New Member Added To Options Basic Model')
                done()
            });


            it("Get Non Existing Options Model  ", function (done) {
                // 1. What options model am I associated with!
                nsOptionsMemberModelService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "items": {"$in": ["acct_1GRdJxF6KR5nnzBxxxx"]}
                };
                nsOptionsMemberModelService.getByQuery()

                chai.expect(nsOptionsMemberModelService.obj).to.have.length(0)
                done()
            });

            it("Get Options Model  ", function (done) {
                // 1. What options model am I associated with!
                nsOptionsMemberModelService.modelQuery = {
                    "accountId": "acct_1CBNZCFOjjfpNUIx",
                    "items": {"$elemMatch": {"accountId": accountId}}
                };
                nsOptionsMemberModelService.getByQuery()

                chai.expect(nsOptionsMemberModelService.obj.items).to.have.gte(0)
                done()
            });


        });
    });


});
//# sourceURL=api_options-members-model_component_test.js