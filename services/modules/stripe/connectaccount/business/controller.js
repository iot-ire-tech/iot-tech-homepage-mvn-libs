/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {


    if (!confirm("Are you sure you have filled the entire form in. If not the application will not be processed")) {
        $("#msg").html("And dont forget to upload images of proof of identity that are legible")
        return
    }

// Validations
//
//	if (businessName === true && mcc === true && description === true && supportUrl === true && supportUrl === true)
//		console.log("HDR good")
//	else {
//		alert("Form is not complete, please check 'Business Profile'")
//		return;
//	}
//
//	if (front_1 === true && back_1 === true && front_2 === true && back_2 === true) {
//		console.log("HDR good")
//	} else {
//		alert("Form is not complete, please check section 'Legal Documentation'")
//		return;
//
//	}
//	if (fname === true && lname === true && email === true && phone === true && dobyear === true && dobmonth === true && dobday === true)
//	{
//		console.log("HDR good")
//	} else {
//		alert("Form is not complete, please check section 'Legal Entity'")
//		return;
//
//	}
//
//	if (fname === true && lname === true && email === true && phone === true && dobyear === true && dobmonth === true && dobday === true)
//	{
//		console.log("HDR good")
//	} else {
//		alert("Form is not complete, please check section 'Date Of Birth'")
//		return;
//
//	}
//
////	if (addressLine1 === true && addressLine2 === true && town === true && city === true && postalCode === true && country === true && state === true)
////	{
////
////	} else {
////		alert("Form is not complete, please check section A")
////		return;
////
////	}
//	if (agree === true)
//	{
//		console.log("HDR good")
//	} else {
//		alert("Form is not complete, please check on 'Terms of Service' box")
//		return;
//
//	}
    var updateRsp = {}
    try {

        var accountPayload = {
            "accountId": accountId,
            // Token Payload
            ...modelContext
        };
        updateRsp = postRequest("AccountAddCompanyLite", accountPayload);
        accountId = updateRsp.id;
        if (updateRsp.status === 400)
            throw Error("Bad request")


    } catch (e) {
        alert("ERR: Message (" + e + ")")
        console.log("ERR: (" + e + ")")
        return
    }

// Mail Out
//	var mailer = {
//		...accountPayload,
//		"ts": new Date().toLocaleString()
//	};
//	postRequest("MailerRegistrationLegalIndi", mailer);

    console.log("INF: Legal Onboard Complete")
    $("#msg").html("Congratulations, your account (" + accountId + ") has been updated.")
    $(this).attr("disabled", true)
//		redirectMe2({"alocation": location.origin + contextPath + "/index.jsp", "where": "_self", "delay": 5000});

});
//# sourceURL=onboarding_legal_biz_ctrl.js
