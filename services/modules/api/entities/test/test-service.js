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
		nsEntitiesService.modelEntityQuery.accountId = accountId
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
				nsEntitiesService.productId = "prod_Hp0jVnCln1Sf2V"
				var rsp = nsEntitiesService.serviceGet()
				chai.expect(rsp.id).to.match(/[a-zA-Z0-9]+/);
				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "New product created (" + rsp.id + ")";

				done()
			});
		});

	});

	describe('Entities Module: Feature - Get Entity', function () {

		context('Type Asset', function () {
			it("Retrieve entity object", function (done) {
				nsEntitiesService.modelEntityQuery.accountId = accountId
				nsEntitiesService.modelEntityQuery.productId = productId
				var rsp = nsEntitiesService.serviceGet()
				chai.expect(rsp.id).to.match(/[a-zA-Z0-9]+/);
				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "New product created (" + rsp.id + ")";

				done()
			});
		});

	});
	var newProductObj = ""
	describe('Entities Module: Feature - Single Entity', function () {

		context('Entity Type Asset Provisioned', function () {

			it("Ensure product Id is saved on shadow db", function (done) {
				nsEntitiesService.modelCreate.accountId = accountId
				nsEntitiesService.modelCreate.description = "this is one"
				nsEntitiesService.modelCreate.mode = "asset"
				nsEntitiesService.modelCreate.name = "myasset"
				nsEntitiesService.modelCreate.type = "service"
				nsEntitiesService.modelCreate.business.active = true
				newProductObj = nsEntitiesService.serviceCreate()
				chai.expect(newProductObj.dbId).to.match(/[a-zA-Z0-9]+/);

				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "New product created (" + newProductObj.dbId + ")";

				done()
			});
		});

	});

	describe('Entities Module: Feature - Single Entity', function () {

		context('Entity Type Asset Provisioned', function () {

			it("Ensure product Id is saved on shadow db", function (done) {
				nsEntitiesService.modelCreate.accountId = accountId
				nsEntitiesService.modelCreate.description = "new this is one"
				nsEntitiesService.modelCreate.mode = "asset"
				nsEntitiesService.modelCreate.name = "new myasset"
				nsEntitiesService.modelCreate.type = "good"
				nsEntitiesService.modelCreate.business.active = false
				nsEntitiesService.serviceUpdate(newProductObj.dbId)
				chai.expect(newProductObj.dbId).to.match(/[a-zA-Z0-9]+/);

				// Update Shadow DB?
				this._runnable.title = this._runnable.title + "New product updated (" + newProductObj.dbId + ")";

				done()
			});
		});

	});


});
//# sourceURL=api_entities_test.js