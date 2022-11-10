/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var productId = parsedUrl.searchParams.get("productId");
var accountId = parsedUrl.searchParams.get("accountId");

var mydb = "pnpmgt"

var payload = {
	"accountId": accountId,
	"productId": productId
}


describe('Provision Module', function () {

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
		var rsp = nsPnpService.serviceGet()

		var msg = "%0a";
		msg += "%0a";
		msg += "MyBusinessPal-PnP";
		msg += "%0a";
		msg += "--- Meta Details---";
		msg += "%0a";
		msg += "CustomerId: " + item.getCustomerId();
		msg += "%0a";
		msg += "ProductId: " + item.getProductId();
		msg += "%0a";
		msg += "--- Service Details ---";
		msg += "%0a";
		msg += "Item:" + item.getTitle();
		msg += "%0a";
		smsMsg.setText(msg);

		chai.expect(rsp._id, /[a-zA-Z0-9]+/, 'New MM Item Created')
	});

});
//# sourceURL=api_sms_test.js