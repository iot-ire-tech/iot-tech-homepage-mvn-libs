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

var module = "Communication"
var contextPath = "";
describe(module + ' Module', function () {
    this.timeout(100000);
    this.slow(300000)

    before("Delete All", function () {
        nsCommsService.accountId = accountId
        nsCommsService.getAll()
        nsCommsService.objs.forEach(function (item) {
            nsCommsService.dbId = item._id
            nsCommsService.delete()
        })

    })

// Tests
    describe(module + ' : Feature - Create new .....', function () {

        context('Context - Smoke Test', function () {
            it("Create SMS Alert", function (done) {
                nsCommsService.accountId = accountId;
                nsCommsService.customerId = customerId;

                nsCommsService.items=[]
                nsCommsService.modelItem.type = "sms";
                nsCommsService.modelItem.customers.push(customerId);
                nsCommsService.items.push(nsCommsService.modelItem);
                nsCommsService.create()

                chai.expect(nsCommsService.dbId, /[a-zA-Z0-9]+/, 'New SMS Alert Created')
                done()
            });
            it("Create Email Alert", function (done) {
                nsCommsService.accountId = accountId;
                nsCommsService.customerId = customerId;

                nsCommsService.items=[]
                nsCommsService.modelItem.customers = [];
                nsCommsService.modelItem.type = "email";
                nsCommsService.modelItem.customers.push(customerId);
                nsCommsService.items.push(nsCommsService.modelItem);
                nsCommsService.create()

                chai.expect(nsCommsService.dbId, /[a-zA-Z0-9]+/, 'New Email Alert Created')
                done()
            });


        });
    });


});
//# sourceURL=api_comms_component_test.js