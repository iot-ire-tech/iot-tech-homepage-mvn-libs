/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//# sourceURL=stripe_person_controller.js

$(document).on('click', '#save', function () {


	url = location.origin + contextPath + "/" + "AccountAddPerson";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
		.setPayload(modelContext).post().getResponse();
	var x = JSON.stringify(response);
	console.log("Response:" + x);
	var y = x.includes("ERR");
	console.log("Response:" + y);

	if (!JSON.stringify(response).includes("ERR")) {
		url = location.origin + contextPath + "/" + "CustomerAdd";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
			.setPayload(modelContext).post().getResponse();

		if (response !== undefined) {
			url = location.origin + contextPath + "/" + "AddUserRegistrationMail";
			response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url)
				.setPayload(modelContext).post().getResponse();
		}
	}


});
//# sourceURL=stripe_person_ctrl.js