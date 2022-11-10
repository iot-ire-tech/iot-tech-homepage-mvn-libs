/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).on("click", "#save", function () {
	var existingBranding;

	var subscription = {};
	try {
		$("#msgConfirmation").html("")
		payload = {
			...modelContext
		};
		var isBranded = getDbRequestXByY("branding", "accountId", accountId);
		if (isBranded.length >= 1) {
			existingBranding = isBranded[0]
			existingBranding.uploads.push(getTs())
			// Update it
			existingBranding.title = payload.title
			existingBranding.tagLine = payload.tagLine
			existingBranding.timings = payload.timings
			existingBranding.media = payload.media

			putDbRequest("branding", existingBranding, existingBranding._id);
			$("#msgConfirmation").html("Congratulations, we have updated your branding account: (" + existingBranding._id + ")")
		} else {
			// First Time
			payload.uploads.push(getTs())
			var brandingRsp = postDbRequest("branding", payload);
			$("#msgConfirmation").html("Congratulations, your new branding had been added to your account: (" + brandingRsp._id + ")")
		}

// Clean up
		$("#title").text("")
		$("#tagLine").text("")
		$("input[name='brandingFavIcon']").text("")
		$("input[name='brandingHdrImg']").text("")
		$("input[name='brandingTdrImg']").text("")

// Mail Out

	} catch (errMsg) {
		$("#msgError").html("Apologies, branding plan:" + brandingRsp._id + ", has not been enabled<br>Please contact support asap")
//		alert("INF: " + err)
		console.log("INF: Subscription Err: " + errMsg)
	}




});



//# sourceURL=services_module_branding_ctrl.js