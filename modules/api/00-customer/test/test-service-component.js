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
        nsCustomerService.modelQuery.accountId = accountId
        nsCustomerService.getByQuery()
        // allItemsRsp.forEach(function (item) {
        //     nsEntitiesService.serviceDelete(item)
        // })

//$ = require('jquery');

    })

// Tests
    describe(module + ' : Feature - Create new .....', function () {
        context('Context - Smoke Test', function () {
            it("Create test", function (done) {

                nsCustomerService.modelItem.accountId = accountId
                nsCustomerService.modelItem.type = "partner"
                nsCustomerService.modelItem.description = "desc1"
                nsCustomerService.items.push(nsCustomerService.modelItem)
                nsCustomerService.create();
                chai.expect(nsCustomerService.dbId, /[a-zA-Z0-9]+/, 'New MM Item Created')
                done()
            });

            it("Update test", function (done) {

                nsCustomerService.accountId = accountId
                nsCustomerService.getAccount()
                nsCustomerService.obj.modelItem.accountId = accountId + 2
                nsCustomerService.obj.modelItem.type = "partner2"
                nsCustomerService.obj.modelItem.description = "desc2"
                nsCustomerService.obj.items.push(nsCustomerService.modelItem)
                nsCustomerService.update();

                chai.expect(nsCustomerService.dbId, /[a-zA-Z0-9]+/, 'New MM Item Created')
                done()
            });


        });
    });


});


//# sourceURL=api_customer_component_test.js