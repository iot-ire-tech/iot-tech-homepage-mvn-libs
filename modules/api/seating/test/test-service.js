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


var module = "Seating"
var htmlMembersList = "";
var contextPath = "";

describe(module + 'Module', function () {
    this.timeout(100000);
    this.slow(300000)
    var seatingItems = {
        args: [
            {
                "grade": "level_1",
                "cost": 1.01,
                "currency": "EUR",
                "annotate": "premier"
            },
            {
                "grade": "level_2",
                "cost": 0.11,
                "currency": "EUR",
                "annotate": "middle"
            }
        ],
        expected: /[a-zA-Z0-9]+/
    }

    before("Delete All", function () {
        nsSeatingService.core.accountId = accountId
        nsSeatingService.core.getAll()
        nsSeatingService.core.objs.forEach(function (item) {
            nsSeatingService.core.dbId = item._id
            nsSeatingService.core.delete()
        })
    })

    it("Service: Best Price", function () {
        nsSeatingService.core.accountId = accountId
        nsSeatingService.core.productId = productId
        nsSeatingService.core.objs = seatingItems.args
        nsSeatingService.getBestPrice()
        console.table(nsSeatingService.bestPrice.cost)


    });

    it("Create test", function () {

        // nsSeatingService.modelCreate.item.push(nsSeatingService.modelItem);
        // if (nsSeatingService.modelCreate.item.length > 0) {
        //     nsSeatingService.modelCreate.accountId = accountId;
        //     nsSeatingService.modelCreate.productId = productId;
        //     var rsp = nsSeatingService.create()
        //     // update
        //     nsEntitiesService.modelEntity.links.seatingId = rsp._id
        //     chai.expect(rsp._id).to.match(/[a-zA-Z0-9]+/);
        //     // Update Shadow DB?
        //     this._runnable.title = this._runnable.title + "New Seating created (" + rsp._id + ")";
        // }
    });


});
//# sourceURL=api_seating_component_test.js