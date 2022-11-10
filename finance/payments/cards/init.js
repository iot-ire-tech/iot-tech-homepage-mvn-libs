/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Init Test
// http://localhost:8084/iot-base/services/userManagement/tests/testLifeCycleSingleUser.html?clientId=673859&patronId=787833
// http://localhost:8084/iot-base/services/userManagement/ux/singleUser.html
// http://localhost:8084/iot-base/services/userManagement/ux/singleUserMod.html
// http://localhost:8084/iot-base/services/userManagement/ux/singleUserViewAll.html
// http://localhost:8084/iot-base/services/userManagement/ux/locationNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/locationViewAll.html
// http://localhost:8084/iot-base/services/userManagement/ux/richContentNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/socialMediaNew.html
// http://localhost:8084/iot-base/services/userManagement/ux/socialMediaMod.html
// SRV

/*
 * UX Priming
 */


var srvPatronCredit = new PatronCredit(bs.patronCreditCtrl, "INIT: Patron Credit");
var srvCardReg = new CardRegistration(bs.cardRegistrationCtrl, "INIT: Card Registration");
var srvCardTopUp = new CardPayment(bs.cardTopUpCtrl, "INIT: Card TopUp/Payments");
var srvCardRefund = new CardRefund(bs.cardRefundCtrl, "INIT: Card Refund");

var srvPatron = new Patron(bs.patronCtrl, "Life Cycle Patron Tests");
var qAllPatrons = srvPatron.queryByType("Q. List all?");
var uxAllPatrons = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllPatronsFk = {
	"data": qAllPatrons, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};

var qAllPatronsCfo = srvPatron.queryByType("Q. List by type(cfo)?");
var uxAllPatronsCfo = {
	"data": qAllPatronsCfo, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};

var qAllCardReg = srvCardReg.queryByType("Q. List all?");
var uxAllCardReg = {
	"data": qAllCardReg, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Pk", "provider": "semantic"
};
var uxAllCardRegFk = {
	"data": qAllCardReg, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "Fk", "provider": "semantic"
};



function updateHdr() {
	patrons = new crudIt(bs.patronCtrl, "Patrons List").setPayload("{}").query();
	resources = new crudIt(bs.entityCtrl, "Resources List").setPayload({"pk.type": "resource"}).query();
	events = new crudIt(bs.entityCtrl, "Event List").setPayload({"pk.type": "event"}).query();
	subEvents = new crudIt(bs.entityCtrl, "SubEvent List").setPayload({"pk.type": "subEvent"}).query();
	$("#statsHook").html(uxStats(resources.length, events.length, subEvents.length, patrons.length));
	location.href = "#top";

}
$(document).ready(function () {

// Default Context : Registration
	srvContext = srvCardReg;
	modelContext = modelCardRegistrationQuick;
	modelContext.pk.type = "cardRegistration";
	url = location.origin + contextPath + "/services/finance/payments/cards/ux/cardRegistration.html";
	$.get(url, function (response) {
		$("#registrationTarget").html(response);
	});
	var intervalId = setTimeout(function () {
		clearTimeout(intervalId);
		$(".patronTarget").html(dropDownUpBuilder(uxAllPatronsFk));
		$('.ui.dropdown').dropdown();
	}, 1000);

});

$(document).on("click", ".tablink", function () {
	opt = $(this).text()

	switch (opt) {
		case "Registration":
			srvContext = srvCardReg;
			modelContext = modelCardRegistrationQuick;
			modelContext.pk.type = "cardRegistration";
			url = location.origin + contextPath + "/services/finance/payments/cards/ux/cardRegistration.html";
			$.get(url, function (response) {
				$("#registrationTarget").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".patronTarget").html(dropDownUpBuilder(uxAllPatronsFk));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;

		case "Top-Up":
			srvContext = srvCardTopUp;
			modelContext = modelCardPayment;
			modelContext.pk.type = "cardProxyPayment";
			url = location.origin + contextPath + "/services/finance/payments/cards/ux/cardPayment.html";
			$.get(url, function (response) {
				$("#topUpTarget").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				// Refresh List
				qAllCardReg = srvCardReg.queryByType("Q. List all?");
				uxAllCardReg = {
					"data": qAllCardReg, "title": "Please Select", "id": getRand(), "class": "ui fluid search dropdown " + "PkRegisteredCardOwnerLookup", "provider": "semantic"
				};
				$(".cardsTarget").html(dropDownUpBuilder(uxAllCardReg));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;


		case "Refund":
			srvContext = srvCardRefund;
			modelContext = modelCardRefund;
			modelContext.pk.type = "cardProxyRefund";
			url = location.origin + contextPath + "/services/finance/payments/cards/ux/cardRefund.html";
			$.get(url, function (response) {
				$("#refundTarget").html(response);
			});

			var intervalId = setTimeout(function () {
				clearTimeout(intervalId);
				$(".patronTarget").html(dropDownUpBuilder(uxAllPatrons));
				$(".patronCfoTarget").html(dropDownUpBuilder(uxAllPatronsCfo));
				$('.ui.dropdown').dropdown();
			}, 1000);
			break;

	}
});





$(document).on("click", ".mgtBrowser", function () {

	opt = $(this).val()
	switch (opt) {
		case "registrations":
			srvCardReg.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvCardReg.display("Registered Card Holders"));
			break;
		case "cardPayments":
			srvCardTopUp.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvCardTopUp.display("Card Payments Listing"));
			break;

		case "cardRefunds":
			srvCardRefund.queryByType("Q. List all?");
			$("#targetManagementBrowser").html(srvCardRefund.display("Card Refunds Listing"));
			break;
	}
});

//# sourceURL=finance_payments_card_init.js