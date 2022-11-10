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

var module = "Poc"
var htmlMembersList = "";
var contextPath = "";
describe('PoC Module', function () {
	this.timeout(100000);
	this.slow(300000)

//	this.fast(100)


	var testsSmoke = [{
			args: {
				"accountId": accountId,
				"productId": "prod_HIpYhJumMJaOLZ", // 1
				"items": [{
						"customerId": customerId,
						"fullName": "name",
						"email": "email",
						"phone": "phone",
						"ts": getTs()
					}]
			},
			expected: /[a-zA-Z0-9]+/

		}
	]

	before("Delete All", function () {
		var allItemsRsp = nsPoCService.serviceList()
		allItemsRsp.forEach(function (item) {
			nsPoCService.serviceDelete(item)
		})
	})


// Tests
	describe('Poc Module: Feature - Single Poc', function () {

		testsSmoke.forEach(function (test) {
			context('Asset PoC', function () {


				it("Ensure customer Id is saved", function (done) {
					var rsp = nsPoCService.service(test.args)
					chai.expect(rsp._id).to.match(test.expected);
					this._runnable.title = this._runnable.title + "Ensure customer Id is saved (" + rsp._id + ")";

					done()
				});
			});
		})




	});

	describe('Poc Module: Feature - Inline Widget', function () {


		it("Customer Data", function (done) {
			var uxWidgetCustomerListRsp = uxWidgetCustomerList({"accountId": accountId, "productId": productId, "className": "connectedAccountCustomerList", "size": 5, "multiple": ""})
			htmlMembersList = uxWidgetCustomerListRsp.getHtml();
			chai.expect(htmlMembersList).to.be.a("string")
			done()
		})
		it("Display Widget", function (done) {
			var html = UxPoCInline().build(htmlMembersList).getHtml();
			$("#widget").html(html)
			chai.expect(html).to.be.a("string")
			done()
		})




	});

});
//# sourceURL=api_poc_test.js