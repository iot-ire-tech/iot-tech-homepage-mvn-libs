/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#saveRegistration', function () {


// Validations

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

//	}


//	if (addressLine1 === true && addressLine2 === true && town === true && city === true && postalCode === true && country === true && state === true)
//	{
//
//	} else {
//		alert("Form is not complete, please check section A")
//		return;
//
//	}
    if (agree === true) {
        console.log("HDR good")
    } else {
        alert("Form is not complete, please check on 'Terms of Service' box")
        return;

    }
    var updateRsp = {}
    try {


        createConnectAccount:{
            var accountPayload = {
                "accountId": accountId,
                // Token Payload
                ...modelContext
            };
            updateRsp = postRequest("AccountAddIndividual", accountPayload);
            checkBadResponse(updateRsp, "Account ID (" + accountId + ") cannot be updated at this moment, contact support for assistance.")
            accountId = updateRsp.id;
        }

    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
        return
    }

// Mail Out
//	var mailer = {
//		...accountPayload,
//		"ts": new Date().toLocaleString()
//	};
//	postRequest("MailerRegistrationLegalIndi", mailer);
    $(".msg").html("Congratulations, your account (" + accountId + ") has been updated, please check your account status, for updates. If you have questions please dont hesitate to contact support")

    $(this).attr("disabled", true)

});
//# sourceURL=onboarding_legal_indi_ctrl.js
