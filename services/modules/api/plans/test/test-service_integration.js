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
describe('Entities Module', function () {
	this.timeout(100000);
	this.slow(300000)

	before("Delete All", function () {
//		nsEntitiesService.modelEntityQuery.accountId = accountId
//		var allItemsRsp = nsEntitiesService.serviceList()
//		allItemsRsp.forEach(function (item) {
//			nsEntitiesService.serviceDelete(item)
//		})

		it("Load Seating Widget Ux", function (done) {
//			this.timeout(60000)
//			$(".#mgtSeatingGrades").click()
			done()
		});
	})

// Tests
	describe('Seating Module: Feature - Create new entity', function () {

		context('Context - Smoke Test', function () {
			it("Create test", function (done) {

				uxEventSeating.getIds().forEach(function (item) {
					nsSeatingService.modelItem.grade = $("#" + item.seatingId).val();
					nsSeatingService.modelItem.cost = $("#" + item.costId).val();
					nsSeatingService.modelItem.bestprice = $("#" + item.bestpriceId).val();
					nsSeatingService.modelItem.currency = $("#" + item.currencyId).val();
					nsSeatingService.modelItem.annotate = $("#" + item.annotateId).val();
					nsSeatingService.modelCreate.item.push(nsSeatingService.modelItem);
				});
				if (nsSeatingService.modelCreate.item.length > 0) {
					nsSeatingService.modelCreate.accountId = accountId;
					nsSeatingService.modelCreate.productId = productId;
					var rsp = nsSeatingService.create()
					// update
					nsEntitiesService.modelCreate.links.seatingId = rsp._id
				}
				chai.expect(rsp.id).to.match(/[a-zA-Z0-9]+/);
				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "New Seating created (" + rsp.id + ")";

				done()
			});
		});

		context('Context - Component Integration Test', function () {
			it("Create test", function (done) {

				// Integration Point!!
				nsEntitiesService.modelCreate.links.seatingId = rsp._id

				chai.expect(rsp.id).to.match(/[a-zA-Z0-9]+/);
				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "Integrated With Entities (" + rsp.id + ")";

				done()
			});
		});

	});


});
//# sourceURL=api_seating_component_test.js