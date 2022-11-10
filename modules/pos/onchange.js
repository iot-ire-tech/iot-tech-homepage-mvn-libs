/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Trigger photo take
$(document).on("click", "#snap", function () {
//	context.drawImage(video, 0, 0, 640, 480);
	$("#snapped").html("<br>Completed.<br>").fadeOut(5000)
	playSound()
});

function playSound() {
	var sound = document.getElementById("audio");
	sound.play();
}

$(document).on("click", "#printPage", function () {



// Or print screen
// javascript:window.print()


});


//initiates print once content has been loaded into iframe
function callPrint(iframeId) {
	var PDF = document.getElementById(iframeId);
	PDF.focus();
	PDF.contentWindow.print();
}

$(document).on("click", ".add", function () {
	itemCost = parseFloat($(this).attr("itemCost"))
	itemName = $(this).attr("itemName")
	itemId = $(this).attr("itemId")
	itemDbId = $(this).attr("itemDbId")
	total += itemCost
	$("#total").html("<br><h1>Total: " + new Number(total).toFixed(2) + "</h1>")

	modelContext.fk.push({
		"id": itemId,
		"dbId": itemDbId.toString()
	})

	if (total > minSpend)
		$("#checkout").attr("disabled", false)
	else
		$("#checkout").attr("disabled", true)

});
$(document).on("click", ".substract", function () {
	itemCost = parseFloat($(this).attr("itemCost"))
	itemId = $(this).attr("itemId")
	total -= itemCost

	for (var i = 0; i < modelContext.fk.length; i++) {
		if (modelContext.fk[i].id === itemId) {
			modelContext.fk.splice(i, 1);
		}
	}

	$("#total").html("<br><h1>Total: " + new Number(total).toFixed(2) + "</h1>")

	if (total > minSpend)
		$("#checkout").attr("disabled", false)
	else
		$("#checkout").attr("disabled", true)
});





$(document).on("change", ".mgtMethodSms", function () {

	if (this.checked) {
		modelPoS.tillReceipt.sms = true;
	} else {
		modelPoS.tillReceipt.sms = false;
	}

});

$(document).on("change", ".mgtMethodEmail", function () {

	if (this.checked) {
		modelPoS.tillReceipt.email = true;
	} else {
		modelPoS.tillReceipt.email = false;
	}


});

$(document).on("change", ".mgtMethodHardCopy", function () {

	if (this.checked) {
		modelPoS.tillReceipt.hardCopy = true;
	} else {
		modelPoS.tillReceipt.hardCopy = false;
	}


});

$(document).on("click", ".cashier", function () {
	$(".payee").dropdown("set selected", "Please Select")
	$(".mgtMethodEmail").prop('checked', false)
	$(".mgtMethodSms").prop('checked', false)

	val = $(this).dropdown("get value");
	if (val !== null) {
		dbId = val.split("_")[0];
		id = parseInt(val.split("_")[1]);
		modelPoS.tillReceipt.bene.id = id
		modelPoS.tillReceipt.bene.dbId = dbId
	}

});

$(document).on("click", ".payee", function () {
	val = $(this).dropdown("get value");
	if (val !== null) {
		dbId = val.split("_")[0];
		id = parseInt(val.split("_")[1]);

		modelPoS.tillReceipt.payee.id = id
		modelPoS.tillReceipt.payee.dbId = dbId

		modelPatron = srvPatron.setPayload({"pk": {"id": id}}).queryByType("Q. Who am I?")[0]
		modelPatronRsp = srvPatron.setPayload({"pk": {"id": id}}).queryByType("Q. Card DeRegistered?")

		// Update Details
		$("#payeeDetails").attr("style", "display:block");
		var html = "";
		html += "<br>"
		html += "<div class=\"w3-card w3-center\" style=\"margin: auto; width: 20%;  padding: 10px; \">"
		html += "Name: " + modelPatron.lname + ", " + modelPatron.fname + "<br>"
		html += "Email: " + modelPatron.email + "<br>"
//	html += "DoB: " + modelPatron.classification.dob + "<br>"
		html += "</div>"
		html += "<br>"
		$("#payeeDetails").fadeIn(100).html(html).fadeOut(10000, function () {
			$(this).attr("style", "display:none");
		})

// Answer Emppty
		if (srvPatron.answer()) {
			alert("INF: Patron Registion Needed")
		}
	}

});


$(document).on("click", ".paymentMethod", function () {
	opt = $(this).val()
	switch (opt) {
		case "cash":
			paymentMethod = "cash"
			break;
		case "ePayment":
			paymentMethod = "ePayment"
			break;
	}

});



var boxChoice = "";
$(document).on("click", ".tablink", function () {
	opt = $(this).text()
	tabCat = opt;
	switch (opt) {
		case "Match Updates":
			break;

		case "Box Tracker":
			break;
		case "League Results":
			break;
	}
});







//# sourceURL=module_shop_onchange.js