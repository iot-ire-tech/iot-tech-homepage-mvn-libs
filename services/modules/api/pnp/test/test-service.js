/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");

var mydb = "pnpmgt"
var contextPath = ""
var rsp = ""
var payload = {
	"accountId": accountId,
	"productId": productId
}

describe('Query PnP', function () {

	it('Retrive product', function () {
		nsPnpService.modelQuery.accountId = accountId
		nsPnpService.modelQuery.productId = productId
		nsPnpService.modelQuery.shippable = true
		var rsp = nsPnpService.serviceGet()
		chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New MM Item Created')
	});


	it('Retrive product', function () {
		nsPnpService.modelQuery.accountId = accountId
		nsPnpService.modelQuery.productId = productId
		nsPnpService.modelQuery.shippable = true
		var rspPnp = nsPnpService.serviceGet()[0]

		var rspPoc = nsPoCService.serviceGet({
			"accountId": accountId,
			"productId": productId
		})[0]
		alertPnPContacts(rspPnp._id, rspPoc._id, customerId, "ProductX")


		chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New MM Item Created')
	});

});
describeX('Provision Module', function () {

	it('Add PnP - Standard Item', function () {
		nsPnpService.modelCreate.accountId = accountId
		nsPnpService.modelCreate.productId = productId
		nsPnpService.modelCreate.shippable = true
		nsPnpService.modelItem.cost = 0.01
		nsPnpService.modelItem.grade = "inhouse"
		nsPnpService.modelItem.annotate = "cool"
		nsPnpService.modelCreate.item.push(nsPnpService.modelItem)
		var rsp = nsPnpService.serviceCreate(nsPnpService.modelCreate)
		chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New Item Created')
	});
	it('Add PnP - Standard Item plus alerting', function () {
		nsPnpService.modelCreate.accountId = accountId
		nsPnpService.modelCreate.productId = productId
		nsPnpService.modelCreate.shippable = true

		nsPnpService.modelCreate.alerting.active = true
		nsPnpService.modelCreate.alerting.sms = "0877461070"
		nsPnpService.modelCreate.alerting.email = "tonyennis@yahoo.com"

		nsPnpService.modelItem.cost = 0.02
		nsPnpService.modelItem.grade = "inhouse"
		nsPnpService.modelItem.annotate = "cool II"
		nsPnpService.modelCreate.item.push(nsPnpService.modelItem)
		var rsp = nsPnpService.serviceCreate(nsPnpService.modelCreate)
		chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New Item Created')
	});

});



//# sourceURL=api_pnp_test.js