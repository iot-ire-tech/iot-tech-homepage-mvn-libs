/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", '.btnContactMe', function () {


	var productId = $(this).attr("productId")
	var accountId = $(this).attr("accountId")


	var rspPoc = nsPoCService.serviceGet({"accountId": accountId, "productId": productId})[0]
	var name = rspPoc.items[0].fullName
	var email = rspPoc.items[0].email
	var phone = rspPoc.items[0].phone

	var html = ""
	html += "<div class='w3-container w3-center'>"
	html += "<h3>Organizers like to be contacted, they thank you! </h3>"
	html += "<h5>This provides feedback, enriching the customer releationship, so thanks again!!</h5>"
	html += "<br>"


	html += "<table class=\"w3-table w3-center w3-border\" style=\"text-align:center\" >"
	html += "<tr>"
	html += "<td>"
	html += "<span>Name</span><i style=\"color:#0c090a\" class=\"user outline icon\"></i>"
	html += "</td>"
	html += "<td>"
	html += "<span>" + name + "</span>"
	html += "</td>"
	html += "</tr>"

	html += "<tr>"
	html += "<td>"
	html += "<span>Email</span><i class=\"fa fa-envelope-o\"></i> "
	html += "</td>"
	html += "<td>"
	// Mask out email but allow link
	var emailMe = "<a style=\"color:#0c090a\" href=\"mailto:" + email + "\" target=_blank class=\"usedMeEmail\"  accountId=" + accountId + "  productId=" + productId + " customerId=" + customerId + "> " + email + " </a>"
	html += "<span>" + emailMe + "</span>"
	html += "</td>"
	html += "</tr>"

	html += "<tr>"
	html += "<td>"
	html += "<span>Phone</span><i class=\"fa fa-mobile-phone\"></i>"
	html += "</td>"
	html += "<td>"
	// Mask out number but allow link - good as stops spanners...
	var phoneMe = "<a style=\"color:#0c090a\" href=\"tel:" + phone + "\" target=_blank class=\"usedMePhone\"  accountId=" + accountId + " productId=" + productId + " customerId=" + customerId + "> " + phone + " </a>"
	html += "<span>" + phoneMe + "</span>"
	html += "</td>"
	html += "</tr>"

	html += "</table>"

	html += "</div>"
	html += "<br>"

	$("#dialogContactMeHook").html(html);
	$("#dialogContactMe").dialog(dialogueProps);



});




//# sourceURL=api_contactme_events.js