/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function printTrigger(elementId) {
	var getMyFrame = document.getElementById(elementId);
	getMyFrame.focus();
	getMyFrame.contentWindow.print();
}

function print(url)
{
	var _this = this, iframeId = 'iframeprint', $iframe = $('iframe#iframeprint');
	$iframe.attr('src', url);

	$iframe.load(function () {
		_this.callPrint(iframeId);
	});
}


function updateDeviceList() {
	navigator.mediaDevices.enumerateDevices()
		.then(function (devices) {
			audioList.innerHTML = "";
			videoList.innerHTML = "";

			devices.forEach(function (device) {
				let elem = document.createElement("li");
				let [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

				elem.innerHTML = "<strong>" + device.label + "</strong> (" + direction + ")";
				if (type === "audio") {
					audioList.appendChild(elem);
				} else if (type === "video") {
					videoList.appendChild(elem);
				}
			});
		});
}

function loadKey() {

	html += "<div class=\"ui card\">";
	html += "<div class=\"content\">";
	html += "<div class=\"right floated meta\">14h</div>";
	html += "<img class=\"ui avatar image\" src=\"/images/avatar/large/elliot.jpg\"> Elliot";
	html += "</div>";
	html += "<div class=\"image\">";
	html += "<img>";
	html += "</div>";
	html += "<div class=\"content\">";
	html += "<span class=\"right floated\">";
	html += "<i class=\"heart outline like icon\"></i>";
	html += "17 likes";
	html += "</span>";
	html += "<i class=\"comment icon\"></i>";
	html += "3 comments";
	html += "</div>";
	html += "<div class=\"extra content\">"
	html += "<div class=\"ui large transparent left icon input\">";
	html += "<i class=\"heart outline icon\"></i>";
	html += "<input type=\"text\" placeholder=\"Add Comment...\">";
	html += "</div>";
	html += "</div>";
	html += "</div>";

}
function buildRegister(payload) {
	var cellWidth = 0;
	var html = "";

	var rowCounter = 1;
	cellWidth = 5
	newRow = 0

	var styleCard = "max-width: 9px; height: 200px"
	styleCard = "height: 280px"
	var styleTab = "margin-left: 10%; width:80%; margin-right: 10%;"
	var attrbs = ""

	html += "<div >";
	html += "<table style=\"" + styleTab + "\">";
	html += "<tr>";
	payload.forEach(function (item) {
		// Q. Cost
		var srvEntitiesCosts = new EntityCosts(bs.costCenterCtrl, "Entity Costs");
		modelEntityCostRsp = srvEntitiesCosts.setPayload({"fk": {"id": item.pk.id}}).queryByType("Q. By FkId?")[0];

		if (rowCounter >= (cellWidth + 1)) {
			newRow = 1
			rowCounter = 1
		} else {
			newRow = 0
		}



		if (newRow === 1) {
			html += "</tr>";
			html += "<tr>";
		}

		if (srvEntitiesCosts.answer()) {
			attrbs = "itemId=" + modelEntityCostRsp.fk.id + " itemDbId=" + modelEntityCostRsp.fk.dbId + " itemCost=" + modelEntityCostRsp.cost.amount + " itemName=" + modelEntityCostRsp.name
			if (item.quanity != undefined && item.quanity.max > 0) {
				modelPoS.tillReceipt.item = item.socialize.name
				html += "<td class=\"w3-mobile\">";
				html += "<div class=\"w3-card w3-padding-large\" style=\"" + styleCard + "\">";
				html += "<p>Accessibility: " + item.socialize.accessibility + "</p>";
				html += "<p>" + item.socialize.name + "</p>";
				html += "<hr>";
				html += "<p>" + modelEntityCostRsp.cost.amount + "</p>";
				html += "<button class=\"small ui button add\" " + attrbs + "><i class=\"plus icon\"></i></button>";
				html += "<button class=\"small ui button substract\" " + attrbs + "><i class=\"minus icon\"></i></button>";

				html += "<br>";
				html += "<p> Sale  </p>";
				html += "</div>";
				html += "</td>";
				// When % is meet alert
			} else if (item.quanity != undefined && item.quanity.max < 10) {
				modelPoS.tillReceipt.item = item.socialize.name
				html += "<td class=\"w3-mobile\">";
				html += "<div class=\"w3-card w3-padding-large w3-yellow\" style=\"" + styleCard + "\">";
				html += "<p>Accessibility: " + item.socialize.accessibility + "</p>";
				html += "<p>" + item.socialize.name + "</p>";
				html += "<hr>";
				html += "<p>" + modelEntityCostRsp.cost.amount + "</p>";
				html += "<button class=\"small ui button add\" " + attrbs + "><i class=\"plus icon\"></i></button>";
				html += "<button class=\"small ui button substract\" " + attrbs + "><i class=\"minus icon\"></i></button>";

				html += "<br>";
				html += "<p style=\"color:red\">Stock: Medium Level</p>";
				html += "</div>";
				html += "</td>";
			} else {
				html += "<td class=\"w3-mobile\">";
				html += "<div class=\"w3-card w3-padding-large w3-red\" style=\"" + styleCard + "\">";
				html += "<p>Accessibility: " + item.socialize.accessibility + "</p>";
				html += "<p>" + item.socialize.name + "</p>";
				html += "<hr>";
				html += "<p>" + modelEntityCostRsp.cost.amount + "</p>";
				html += "<button class=\"small ui button\"><i class=\"plus icon\"></i></button>";
				html += "<button class=\"small ui button\"><i class=\"minus icon\"></i></button>";

				html += "<br>";
				html += "<p style=\"color:red\">Cost: Not Costed</p>";
				html += "</div>";
				html += "</td>";
			}
		} else {
			html += "<td class=\"w3-mobile\">";
			html += "<div class=\"w3-card w3-padding-large \" style=\"" + styleCard + "\">";
			html += "<p>Accessibility: " + item.socialize.accessibility + "</p>";
			html += "<p>" + item.socialize.name + "</p>";
			html += "<hr>";
			html += "<p> 0.00 </p>";
			html += "<button class=\"small ui button\"><i class=\"plus icon\" disabled></i></button>";
			html += "<button class=\"small ui button\"><i class=\"minus icon\" disabled></i></button>";

			html += "<br>";
			html += "<p style=\"color:red\">Cost: Not Costed</p>";
			html += "</div>";
			html += "</td>";
		}
		rowCounter++;

	});
	html += "</tr>";
	html += "</table>";
	html += "<div>";
	return html;
}
function loadPatrons() {
// Check Squah Members
	$("#cashier").append(dropDownUpBuilder(uxAllPatronsCashier));
	$("#payee").append(dropDownUpBuilder(uxAllPatronsPayee));
	$("#btnCheckout").html("<button id=checkout class=\"ui toggle button active massive\" disabled>Checkout</button>")
	$('.ui.dropdown').dropdown();
}

function eRecieptEmail() {

}

function eRecieptSMS(tillReceipt) {
	var smsMsg = "From: IoT Smart Sales Admin."
	smsMsg += "%0aClient: " + tillReceipt.bene
	// Items!!not item
	smsMsg += "%0aItem: " + tillReceipt.item
	smsMsg += "%0aDate: " + new Date(tillReceipt.$date).toGMTString()
	smsMsg += "%0aTotal: " + tillReceipt.cost + " EUR"
	smsMsg += "%0a"
	smsMsg += "Regards, IoT Tech"
	new Sms().setFrom("E-Receipt").setTo(modelPatron.mobile).setMsg(smsMsg).send();
}
function chargeCustomer(modelPatron) {

	var payload = {
		paymentMade: false,
		receipt: {}
	}

	modelPoS.tillReceipt.cost = total
	var seedCostCent = parseFloat(total).toFixed(2) * 100

	if (seedCostCent > 0 && modelPatron.customerId !== "-1") {
		modelCardPayment.description = modelPoS.tillReceipt.item
		modelCardPayment.description = itemName
		modelCardPayment.amount = parseInt(seedCostCent)
		modelCardPayment.customerId = modelPatron.customerId
		modelCardPayment.email = modelPatron.email
		modelCardPayment.patronId = modelPatron.pk.id

// Reset Payment Now - Early
		modelPatron.customerId = "-1"
		seedCostCent = 0;

		srvCardDevice.setPayload(modelCardPayment)
		if (srvCardDevice.makePayment()) {
			payload.paymentMade = true;
			modelPoS.tillReceipt.chargeId = srvCardDevice.response.getResponse().chargeId
			payload.receipt = modelPoS.tillReceipt;

			$("#cardRegistration").fadeIn(100).html("<br>Payment Accepted<br>").fadeOut(15000)

			if (modelPoS.tillReceipt.hardcopy)
				if (modelPoS.tillReceipt.sms)
					eRecieptSMS(modelPoS.tillReceipt)
			if (modelPoS.tillReceipt.email)
				eRecieptEmail(modelPoS.tillReceipt)

// Resetting Form Data


// Resetting Form UX



		} else {
			modelPatron.customerId = "-1"
			seedCostCent = 0;
			total = 0;
			$("#total").html("<br><h1>Total: " + new Number(total).toFixed(2) + "</h1>")
			$("#cardRegistration").fadeIn(100).html("<br>Payment Rejected<br>").fadeOut(5000);
			$("#checkout").attr("disabled", true)
		}
	} else {
		modelPatron.customerId = "-1"
		seedCostCent = 0;
		total = 0;
		$("#total").html("<br><h1>Total: " + new Number(total).toFixed(2) + "</h1>")
		$("#cardRegistration").fadeIn(100).html("<br>Select Payee, and/or Sale Item<br>").fadeOut(5000);
		$("#checkout").attr("disabled", true)
	}

	return payload;
}

function resetTransaction() {
	modelPatron.customerId = "-1"
	seedCostCent = 0;
	total = 0;
	modelCardPayment.amount = 0
	modelPoS.tillReceipt.chargeId = ""
	modelPoS.tillReceipt.cost = 0
	modelPoS.tillReceipt.email = ""
	modelPoS.tillReceipt.sms = false
	modelPoS.tillReceipt.email = false
}

function resetUx() {
	$("#total").html("<br><h1>Total: " + new Number(total).toFixed(2) + "</h1>")
	$(".payee").dropdown("set selected", "Please Select")
	$(".payee").trigger("click")
	$("#checkout").attr("disabled", true)
	$(".mgtMethodEmail").prop('checked', false)
	$(".mgtMethodSms").prop('checked', true)
	$("#payee").html(dropDownUpBuilder(uxAllPatronsPayee));
	$('.ui.dropdown').dropdown();
}


//# sourceURL=module_shop_methods.js