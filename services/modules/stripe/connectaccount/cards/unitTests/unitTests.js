/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");



describe("External Cards On Connect Account", function () {
	this.bail(false);

	modelCardsAccount.forEach(function (tc) {

		it(tc.expected.case, function () {
			this.test._timeout = tc.performance.timeout;
			tc.startup.forEach(function (tcStartup) {
				tc = getIds(tc, tcStartup);

			});
			payload = {
				...tc.model
			}
			payloadRsp = postRequest(tc.endPoint, payload);
			assert.match(payloadRsp.id, /[acct_|acct_]_[a-zA-Z0-9]+/, 'Account Card Added');

		});

		modelCardsAccountAdd.forEach(function (tcUpdate) {


			it(tcUpdate.expected.case, function () {
				this.test._timeout = tcUpdate.performance.timeout;
				tcUpdate.startup.forEach(function (tcStartup) {
					tcUpdate = getIds(tc, tcStartup);

				});
				tcUpdate.model.accountId = tc.model.accountId;
				payload = {
					...tcUpdate.model
				}
				payloadRsp = postRequest(tcUpdate.endPoint, payload);
				assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Added (Account) Card ');

			});


		});
	});


});

//describe("Adding External Cards Account(Biz) To Connect Account", function () {
//	this.bail(false);
//
//	modelCardsAccountBiz.forEach(function (tc) {
//
//		it(tc.expected.case, function () {
//			this.test._timeout = tc.performance.timeout;
//			tc.startup.forEach(function (tcStartup) {
//				tc = getIds(tc, tcStartup);
//
//			});
//
//			// SUT - Subscriptions
//			// With Account and Customer ID!!!
//			payload = {
//				...tc.model
//			}
//			payloadRsp = postRequest(tc.endPoint, payload);
//			assert.match(payloadRsp.id, /[acct_|acct_]_[a-zA-Z0-9]+/, 'Valid Card Account Added');
//
//		});
//
//		modelCardsAccountAdd.forEach(function (tcUpdate) {
//
//			it(tcUpdate.expected.case, function () {
//				this.test._timeout = tcUpdate.performance.timeout;
//				tcUpdate.model.accountId = tc.model.accountId;
//				payload = {
//					...tcUpdate.model
//				}
//				payloadRsp = postRequest(tc.endPoint, payload);
//				assert.match(payloadRsp.id, /acct_[a-zA-Z0-9]+/, 'Added New Card Account');
//
//			});
//
//
//		});
//	});
//
//
//});




//# sourceURL=stripe_paymentmethods_cards_account_unit_tests.js


