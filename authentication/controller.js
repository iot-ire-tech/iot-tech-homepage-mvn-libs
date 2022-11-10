/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('click', '#btnAuthenticate', function () {

	var patronNotFound = false
	var dbsArr = []
	var globalBs = ""
	var dbName = ""
	var account;
	var authentication = false

	account = new Account(username, password);
	if (account.validate()) {
// A Patron wants to login - which DB is he in!!!
		iotDbObj = new clientDbUtil(iotDbCtrt, "Retrieving Client DB From Master")

// Multi - DB - Authentication Routine
// 1. Get Patron

		// for each db get client
		try {
			dbsArr = iotDbObj.getAllDbs()
			var auth;

			dbsArr.dbs.forEach(function (db) {
				// I have a db
				// but is patron resident there!!!
				// lets use its unique IDS - email
				//console.log("INF: DB Key : %s", db.users[0].key);
				bs = new bootStrapDbItem(db.proto, db.host, db.port, db.users[0].key, db.name, httphdlr).init()
				patronObj = new crudIt(bs.patronCtrl, "Patron Validation").setPayload("{\"email\":\"" + username + "\"}").query()[0]

				if (patronObj !== undefined) {
					if (patronObj.status === "validated") {
						//  !!
						// DB Found !!!
						//console.log("INF: Patron Found : %s", patronObj.email);
						//console.log("INF: DB Found : %s", db.name);
//					alert("INF: DB Found : " + (dbName = db.name));
//				account = new Account(username, password);
//				account.validate();
						patronAccountCtrl = new bootStrapDbItem(db.proto, db.host, db.port, db.users[0].key, db.name, httphdlr).init().patronAccountCtrl
						auth = new Authenticate(document.URL, patronObj, account);
//			auth.setDomain();
//			auth.super.validate();
						// We have a validate account - email , password not empty - email is unique
						patronAccounts = new crudIt(patronAccountCtrl, "Patron Accounts")
							.setPayload("{\"fk.id\":" + patronObj.pk.id + "}").query()[0]
						if (auth.authenticate(patronAccounts)) {
							authentication = true;
							sleep(2000)

							throw new Exception("INF: Authenticated")
						}
					} else {
						alert("WRN: Patron Id (" + patronObj.pk.id + ") Not Valdidated, contact support ASAP ")
					}
				}


			});
		} catch (exception) {
			//console.log("INF/ERR: Message (" + exception.message + ")")
			// We are authenticated at this stage

// Member / Staff / Guest-Trail
// This is global needed for payments splits.
//			localStorage.patronType = auth.authenticatedAccount.accessLevel;
//			localStorage.patronType = patronObj.type;

			if (document.URL.includes("login.jsp") === true) {
//				updateAnalytics(bs, "User logged into system", 0, getTodaysDate());

				$("#btnAuthenticate").attr("disabled", "true")
				$("#processingMessageAuthenticate").html("<br><b>Welcome, " + patronObj.fname + ", your authentication was successful<br>redirecting you shorting</b><br>");

				brandingSrv = new BrandingWelcome(bs.brandWelcomeCtrl, "Branding Welcome Msg")
				modelBrandingWelcomeMsgRsp = brandingSrv.queryByType("Q. List all?")
				if (brandingSrv.answer()) {
					loadMessageBoxWelcomeVid(modelBrandingWelcomeMsgRsp[0], patronObj).open();
//				brandWelcomeVid(brandingSrv, patronObj);
//				brandFavIconWelcome(brandingSrv);
				} else {
					redirectMe(location.origin +
						contextPath +
						"/ux/client/portal/userPortal.jsp?clientId=" +
						patronObj.clientId + "&patronId=" +
						patronObj.pk.id);
				}


			} else {
//				$("#processingMessageAuthenticate").html("<br><b>Sorry, " + patronObj.fname + ", your account doesnt have admin privledges<br>contact support asap</b><br>");
//				document.getElementById('id01').style.display = 'none'
//			redirectMe("account/account.jsp?clientId=" + patronObj.clientId);
			}

			if (document.URL.includes("index.jsp")) {
//				updateAnalytics(bs, "Admin logged into system", 0, getTodaysDate());
				html = buildAdminMenu(location.origin + contextPath, patronObj)
				$("#loggedinLinks").html(html)


				$("#loggedinMsg").html("Welcome, " + patronObj.fname + ".&nbsp&nbsp");


				document.getElementById('id01').style.display = 'none'
			} else {
//				$("#processingMessageAuthenticate").html("<br><b>Sorry, " + patronObj.fname + ", your account doesnt have member privledges</b><br>");
//				document.getElementById('id01').style.display = 'none'
//			redirectMe("account/account.jsp?clientId=" + patronObj.clientId);
			}

			return
		}






		if (authentication === false) {
			$("#processingMessageAuthenticate").html(
				"<br><b>Sorry we cannot authenticate with provided account info<br>username : " + username + "<br>password: " + password + "</b><br>"
				);
		}
	}

});

function buildAdminMenu(appBase, patronObj) {
//	appBase += "/ux"
	var html = "";

	html += "<a href='" +
		appBase +
		"/services/business/entity/release/entityManagement.jsp?clientId=" +
		patronObj.clientId +
		"&patronId=" + patronObj.pk.id + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Profolio Management</a>"


	html += "<a href='" + appBase + "/services/userManagement/release/userManagement.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>User Management</a>"

	html += "<a href='" + appBase + "/services/mediahub/release/mediaHub.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Media Hub</a>"

	html += "<hr>"
	html += "<a href='" + appBase + "/services/finance/billing/release/billing.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Billing Rules</a>"
	html += "<a href='" + appBase + "/services/finance/payments/cards/release/payments.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Payments</a>"
//	html += "<a href='" + appBase + "/services/booking/mgt/release/bookingReports.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-padding w3-mobile'>Bookings</a>"
	html += "<a href='" + appBase + "/services/analytics/release/analytics.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Analytics</a>"
	html += "<a href='" + appBase + "/services/messaging/release/message.jsp?clientId=" + patronObj.clientId + "'  target='_blank'  class='w3-large w3-padding w3-mobile'>Messaging</a>"
	html += "<a href='" + appBase + "/services/branding/release/branding.jsp?clientId=" + patronObj.clientId + "' target='_blank'  class='w3-large w3-padding w3-mobile'>Branding</a>"
	html += "<a href='" + appBase +
		"/services/modules/release/modules.jsp?clientId=" +
		patronObj.clientId +
		"&patronId=" +
		patronObj.pk.id +
		"' target='_blank'  class='w3-padding w3-large w3-mobile'>Modules  " +
		"<span class=\"w3-tag w3-round-large w3-red w3-center\" style=\"transform:rotate(-5deg)\">New</span></a>";
	return html;
}
//# sourceURL=auth_controller.js