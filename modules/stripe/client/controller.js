/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#newAccount', function () {

	if (modelContext.terms === true) {

// Create Connect Account - min!
		var connectAccount = {
			"country": modelContext.company.location,
			"type": "custom",
			"email": modelContext.email,
			"country": modelContext.location,
			"capabilities": ["card_payments", "transfers", "legacy_payments"]
		};
		response = postRequest("AccountCreate", connectAccount);

		if (response !== undefined) {
			modelContext.company.accountId = response.id;
// This is your platfrom customer, who you will DD.
			var platformCustomer = {
				"accountId": "",
				"country": modelContext.company.location,
				"firstName": modelContext.person.fname,
				"lastName": modelContext.person.lname,
				"phone": "0877461070",
				"email": "tonyennis@yahoo.com",
				"gender": "male",
				"dob": {
					"year": 1972,
					"month": 12,
					"day": 1

				},
				"address": modelAddress
			};
			url = location.origin + contextPath + "/" + "CustomerAdd";
			response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(platformCustomer).post().getResponse();
// Create Again on connect side
//					platformCustomer.accountId = modelContext.company.accountId
//					response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(platformCustomer).post().getResponse();





// Biz Profile
			if (response !== undefined) {
				var addAccountCompanyProfile = {
					"company": modelContext.company,
					"person": modelContext.person,
					"account": modelContext.account
				};
				url = location.origin + contextPath + "/" + "AccountAddCompanyProfile";
				response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
					.setPayload(addAccountCompanyProfile).post().getResponse();
// Mark DB as taken
				dbResponseObj.clientId = modelContext.pk.id
				var modifiedResponse = iotDbObj.setDbAsTaken(dbResponseObj, id)


				//  1. Create demo patron for this client !!!
				modelPatron.status = "validated"
				modelPatron.clientId = modelContext.pk.id
				modelPatron.fname = modelContext.person.fname
				modelPatron.lname = modelContext.person.lname
				modelPatron.phone = modelContext.company.phone
				modelPatron.mobile = modelContext.company.phone
				modelPatron.email = modelContext.company.email
				modelPatron.timings.dob.$date = new Date().toISOString();
//				modelPatron.ux.name = "[" + modelPatron.pk.type + "] " + modelPatron.lname + ", " + modelPatron.fname
				modelPatron.ux.name = modelPatron.lname + ", " + modelPatron.fname
				srvPatron.setPayload(modelPatron).create()



// Add Mod to create!!!
//	if (srvContext.isValid("props")) {
//		modelContextRsp = srvContext.create();
//		srvContext.modPkDbId();
//		alert("INF: New Record Created")
//		document.location.reload();
//	} else
//		alert("ERR: Props are not good");

				// 2. Create end user account - admin
				modelPatronAccount.account = []
				modelPatronAccount.pk.type = "admin";
				modelPatronAccountItem.expiry.$date = todayPlusOneMonth;
				modelPatronAccountItem.username = modelPatron.email
				modelPatronAccountItem.password = modelContext.password
//			modelPatronAccount.account.push(modelPatronAccountItem);
				modelPatronAccount.account = modelPatronAccountItem;
				srvPatronAccount.setPayload(modelPatronAccount).create();
// Payload sent to Registar!!!
				modelContext.ts = new Date().toLocaleString();
				var addClientRegistration = {
					"id": modelContext.pk.id,
					"ts": new Date().toLocaleString(),
					"company": modelContext.company,
					"person": modelContext.person,
					"account": modelContext.account
				};
				url = location.origin + contextPath + "/" + "ClientRegistration";
				var appServer = new httpHandler("Generic", responseStrucObj);
				appServer.setUrl(url).setPayload(addClientRegistration).post();
// Read IOT Defaults in this space, then upload to client Instance.
// Add Default Rating!!!
				var srvClientRatesIoT = new SiteManagerRates(iotClientRatesCtrl, "INIT: IoT Client Rates");
				modelClientRatesRsp = srvClientRatesIoT.queryByType("Q. List By Type(basic)?")[0]
				var srvClientRatesClient = new SiteManagerRates(bs.billingRatesCtrl, "INIT: Client Rates");
				modelClientRatesRsp.fk.id = 0; // IOT Rate Approved
				modelClientRatesRsp.fk.type = "basic"; // IOTApproved
				modelClientRatesRsp.pk.id = getRand();
				modelClientRatesRsp.pk.type = "";
				delete modelClientRatesRsp._id;
				srvClientRatesClient.setPayload(modelClientRatesRsp).create();
// Add Default Entitlements!!!
// 1. read from IOT, then post to new client
				var srvClientEnablementIoT = new SiteManagerEntitlements(iotClientEnablementsCtrl, "INIT: IoT Client Entitlements");
				modelClientEntitlementsRsp = srvClientEnablementIoT.queryByType("Q. List By Type(trail)?")[0]
				var srvClientEnablementClient = new SiteManagerEntitlements(bs.clientEntitlementsCtrl, "INIT: Client Entitlements");
				modelClientEntitlementsRsp.fk.id = 0; // IOT Approved
				modelClientEntitlementsRsp.fk.type = "trail"; // IOT Approved
				modelClientEntitlementsRsp.pk.id = getRand();
				modelClientEntitlementsRsp.pk.type = "";
				delete modelClientRatesRsp._id;
				srvClientEnablementClient.setPayload(modelClientEntitlementsRsp).create();
// Add Default Usage!!!
				var srvClientUsageIoT = new SiteManagerUsage(iotClientUsageCtrl, "INIT: IoT  Usage");
				modelClientUsageRsp = srvClientUsageIoT.queryByType("Q. List By Type(trail)?")[0]
				var srvClientUsageClient = new SiteManagerUsage(bs.billingUsageCtrl, "INIT: Client Usage");
				modelClientUsageRsp.fk.id = 0; // IOT Approved
				modelClientUsageRsp.fk.type = "trail"; // IOT Approved
				modelClientUsageRsp.pk.id = getRand();
				modelClientUsageRsp.pk.type = "";
				delete modelClientUsageRsp._id;
				srvClientUsageClient.setPayload(modelClientUsageRsp).create();
//				$(this).props("disabled", true)

// Default Branding!!! - IoT Branding
//			return
//			branding.setPayload(brandingDefault).create();
//			alert("INF: Default Branding Applied")
				alert("INF: An email has been sent to above email, with your account, and login details")
//			window.location = urlApp + "/" + channel + "/index.jsp"
				redirectMe(location.origin + contextPath + "/index.jsp", 10000);
			}
		} else {
			alert("INF: Your account cannot be created at the moment, contact support asap")
		}
		try {


		} catch (e) {
			alert("INF: Registration Error, contact support asap")
			console.log("INF: Registration Error, contact support asap")
		}

	}// Is Compliant


});
$(document).on('click', '#addPayoutBank', function () {

	bs = new bootStrapDbItem(proto, host, port, key, db, httphdlr).init()

	var srvLogger = new Logger(bs.loggingCtrl, "INIT: Log Client Registration");
	var srvClient = new Client(bs.clientCtrl, "INIT: Client Registration");
	var srvPatron = new Patron(bs.patronCtrl, "INIT: Admin Patron");
	var srvPatronAccount = new PatronAccount(bs.patronAccountCtrl, "INIT: Patron Accounts");
	/*
	 * Payload sent to Staging Data Store - New Client type trail!!!!!!
	 */
	try {


// Admin - With  Allocated DB
		srvClient.setPayload(modelContext).create()
//			updateAnalytics(bs, "New Client", 0, getTodaysDate(), modelContext.pk.id, 0, 0)


// Create Connect Account - min!
		var connectAccount = {
			"country": modelContext.company.location
		};
		url = location.origin + contextPath + "/" + "AccountCreate";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
			.setPayload(connectAccount).post().getResponse();
// Bank Account - payouts to
// https://stripe.com/docs/connect/testing#account-numbers

		var addAccountCompanyBankAccount = {
			"id": response.id,
			"country": "IE",
			"currency": "EUR",
			"account_holder_name": modelContext.fname + modelContext.lname,
			"product_description": modelContext.sector,
			"account_number": modelContext.iban,
			"account_holder_type": "company"
		};
		url = location.origin + contextPath + "/" + "AccountAddCompanyAccount";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
			.setPayload(addAccountCompanyBankAccount).post().getResponse();
		var addAccountToC = {
			"id": response.id
		};
		url = location.origin + contextPath + "/" + "AccountAddCompanyToC";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
			.setPayload(addAccountToC).post().getResponse();
		alert("INF: An email has been sent to above email, with your account, and login details")
//			window.location = urlApp + "/" + channel + "/index.jsp"
		redirectMe(location.origin + contextPath + "/index.jsp", 10000);
	} catch (e) {
		alert("INF: Registration Error, contact support asap")
	}




});
//# sourceURL=client_account_ctrl.js
