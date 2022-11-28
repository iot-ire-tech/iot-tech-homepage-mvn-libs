/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



accountTypes.forEach(function (account) {

	describe("Account Type (" + account.type + ") Account Id (" + account.accountId + ")", function () {

		it("New Customer ", function () {
			this.test._timeout = testDuration;

			modelCustomer.accountId = account.accountId;
			account.customerId = postRequest("CustomerAdd", modelCustomer).id;
			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Created');
		});

		account.sourceId.card.forEach(function (token) {

			it("Update Customer With Source(Card=" + token + ")", function () {
				this.test._timeout = testDuration;

				modelCustomer.customerId = account.customerId;
				modelCustomer.accountId = account.accountId;
				modelCustomer.source = token;
				account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
				assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Source updated');
			});


		})


		it("Update Customer Balance", function () {
			this.test._timeout = testDuration;

			modelCustomer.customerId = account.customerId;
			modelCustomer.accountId = account.accountId;
			modelCustomer.balance = 1000;
			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Balance updated');
		});

		it("Update Customer Contact Details", function () {
			this.test._timeout = testDuration;

			modelCustomer.customerId = account.customerId;
			modelCustomer.accountId = account.accountId;
			modelCustomer.phone = "087746000";
			modelCustomer.email = "tonygennis@gmail.com";
			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Contact updated');
		});

		it("Update Customer Coupon", function () {
			this.test._timeout = testDuration;

			modelCustomer.customerId = account.customerId;
			modelCustomer.accountId = account.accountId;
			modelCustomer.coupon = "";
			account.customerId = postRequest("CustomerUpdate", modelCustomer).id;
			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Coupon updated');
		});

		it("Update Retrieve ", function () {
			this.test._timeout = testDuration;

			modelCustomer.accountId = account.accountId;
			modelCustomer.customerId = account.customerId;
			account.customerId = postRequest("CustomerGet", modelCustomer).id;
			assert.match(account.customerId, /cus_[a-zA-Z0-9]+/, 'Valid Customer Details Retrieved');
		});


		it("List All", function () {
			this.test._timeout = testDuration;

			modelCustomer.accountId = account.accountId;
			modelCustomer.customerId = account.customerId;
			var customerList = postRequest("CustomerGetAll", modelCustomer);
			assert.isArray(customerList.data, 'Valid Customer Detail List Retrieved');
		});



	})

});

function postRequest(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}
function PostMe(ep, data) {
	url = location.origin + "/" + ep;
	return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post()
}

//# sourceURL=stripe_customer_unit_tests.js


