/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



var payload = {};
var payloadRsp = {};
var accountRsp = {};
var customerId = "";
var sourceId = "";
var accountId = "";
describe("Customer Plaform Testing", function () {
	this.bail(true);


	modelCustomerCreatePlatform.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			payload = {};
			payloadRsp = {};
			// Start Up Test - Create Account

			tc.startup.forEach(function (tcStartup) {

				payload = {
					...tcStartup.extTc.model
				}

				if (tcStartup.tag === "connectAccount") {
					accountId = "";
//					assert.isEmpty(accountId);
					tc.model.accountId = accountId;
				}

			});



			// SUT - Create Customer
			payload = {
				...tc.model
			}

			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Valid Customer Created');
			customerId = payloadRsp.id


		});
		modelCustomerUpdatePlatform.forEach(function (tcUpdate) {

			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				// Update Account As Charable..
				payload = {};
				payloadRsp = {};

				// Start Up Test#1 Account or Source
				tcUpdate.startup.forEach(function (tcStartup) {
					payload = {
						"accountId": accountId,
						...tcStartup.extTc.model
					}
					payloadRsp = postRequest(tcStartup.extTc.endPoint, payload)

					if (tcStartup.tag === "sourceCard") {
						assert.match(payloadRsp.id, /src_[a-zA-Z0-9]+/, 'Tearup Source Card Created');
						tcUpdate.model.sourceId = payloadRsp.id;
					}

					if (tcStartup.tag === "sourceSepa") {
						assert.match(payloadRsp.id, /src_[a-zA-Z0-9]+/, 'Tearup Source Sepa Created');
						tcUpdate.model.sourceId = payloadRsp.id;
					}


				})




				// SUT - Update Customer
				tcUpdate.model.accountId = "";
				payload = {
					"customerId": customerId,
					...tcUpdate.model
				}

				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /cus_[a-zA-Z0-9]+/, 'Customer Updated');
				// Ready Again For Next Loop?
				customerId = payloadRsp.id
			});
		});
	});






//
//		it("Update Customer Balance", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.customerId = account.customerId;
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.balance = 1000;
//			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
//			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Balance updated');
//		});
//
//		it("Update Customer Contact Details", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.customerId = account.customerId;
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.phone = "087746000";
//			modelCustomer.email = "tonygennis@gmail.com";
//			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
//			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Contact updated');
//		});
//
//		it("Update Customer Coupon", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.customerId = account.customerId;
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.coupon = "";
//			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
//			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Coupon updated');
//		});
//
//		it("Update Retrieve ", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.customerId = account.customerId;
//			account.customerId = postRequest("CustomerGet", modelCustomer).id;
//			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Details Retrieved');
//		});
//
//
//		it("List All", function () {
//			this.test._timeout = testDuration;
//
//			modelCustomer.accountId = account.accountId;
//			modelCustomer.customerId = account.customerId;
//			var customerList = postRequest("CustomerGetAll", modelCustomer);
//			assert.isArray(customerList.data, 'Valid Customer Detail List Retrieved');
//		});



})



function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}


//# sourceURL=stripe_customer_platform_unit_tests.js


