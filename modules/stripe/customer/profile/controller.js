/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// https://stripe.com/docs/api/tokens/create_person
//
$(document).on('click', '#save', function () {

	try {


// Create Customer Connect
		customer = {
			"accountId": accountId,
			"customerId": customerId,
			...modelContext
		};
		customerIdC = postRequest("CustomerUpdate", customer).id;

// Platform Update
		customer = {
			"customerId": customerId,
			...modelContext
		};
//		customerIdP = postRequest("CustomerUpdate", customer).id;
// Confrim
//
// Mail Out
//
		var mailer = {
			"accountId": accountId,
			"customerId": customerId,
			...modelContext
		};
		postRequest("CustomerUserAccountUpdate", mailer);

		$("#comfirmationMsg").html("Congratulations, your user account has been updated as follows<br>username: " + modelContext.userAccount.user + "<br>password: " + modelContext.userAccount.pass)

		redirectMe2({"alocation": location.origin + contextPath + "/services/modules/stripe/customer/login/release/login.jsp?accountId=" + accountId + "&customerId=" + customerId, "where": "_self"});
		$(this).attr("disabled", true)
	} catch (e) {
		var err = "Customer Registration Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}


});
//# sourceURL=customer_reset_ctrl.js
