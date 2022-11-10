/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Authentication!!!
$(document).on('blur change', '#username', function () {
	username = $(this).val();
});
$(document).on('blur change', '#password', function () {
	password = $(this).val();
//	modelPatron.password = password;
});


// Form : Signup / Registration
$(document).on("change", "#email, #email_Mod ", function () {
	modelPatron.email = $(this).val();
});
$(document).on("change", "#fname, #fname_Mod", function () {
	modelPatron.fname = $(this).val();
});
$(document).on("change", "#lname, #lname_Mod", function () {
	modelPatron.lname = $(this).val();
});
$(document).on("change", "#gender, #gender_Mod", function () {
	modelPatron.classification.gender = $(this).val();
});
$(document).on("change", "#occupation, #occupation_Mod", function () {
	modelPatron.classification.occupation = $(this).val();
});
$(document).on("change", "#mobile, #mobile_Mod", function () {
	modelPatron.mobile = $(this).val();
});
$(document).on("change", "#notes, #notes_Mod", function () {
	modelPatron.notes = $(this).val();
});

// Refresh UX-http://localhost:8084/iot-base/services/userManagement/ux/singleUserModal.html
// Lets Keep it all in this code block
PasswordReset: {
	var newPassword;
	var resetEmail;
// WorkFlow : 1. Present Reset Modal
	$(document).on("click", "#newUserPasswordReset", function () {
		var url;

		url = location.origin + contextPath + "/services/authentication/ux/singleUserModelForgotPassword.html";
		$.get(url, function (response) {
			loadMessageBoxUserPassordForget(response, clientId).open();
		});
	});
	$(document).on("change", "#resetEmail", function () {
		resetEmail = $(this).val();
	});

// WorkFlow : Send Email To Server
	$(document).on("click", "#actionResetPassword", function () {
		alert("Mail Sent")
		$("#newUserPasswordReset").prop('disabled', true)
		$("#newUserPasswordReset").prop('style', "color:gray");

		// Patron Is Created Trigger email to new patron!
		// Patron ID needs to be found by email.
		modelPatron.email = resetEmail
		modelPatronRsp = srvPatron.setPayload(modelPatron).queryByType("Q. By Email?")[0];
		var passwordReset = {
			"email": modelPatron.email,
			"clientId": clientId,
			"patronId": modelPatronRsp.pk.id
		};
		url = location.origin + contextPath + "/" + "PatronPasswordReset";
		response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(passwordReset).post().getResponse();

	});

// WorkFlow : Server send reset form to end user to be filled in
	$(document).on("change", "#newPassword", function () {
		newPassword = $(this).val();
	});
	$(document).on("change", "#repeatPassword", function () {
		newPassword = $(this).val();
	});
// WorkFlow : Client updates patronaccount with new password

	$(document).on("click", "#saveResetPasswordAccount", function () {
		// For the Patron Id, we need to get the Account.
		modelPatronAccountRsp = srvPatronAccount.setPayload({"fk": {"id": patronId}}).queryByType("Q. By FkId?")[0];

		// Equilize account model with response, and new password.
		modelPatronAccount = modelPatronAccountRsp;
		modelPatronAccount.account[0].password = newPassword;

		// put it to bed.
		if (srvPatronAccount.answer()) {
			srvPatronAccount.setPayload(modelPatronAccountRsp)
			srvPatronAccount.uxUpdateNameTag(modelPatronAccountRsp)

			srvPatronAccount.mod(modelPatronAccountRsp.pk.dbId);
			$("#resetStarted").hide(3000);
			$("#resetForm").hide(3000);
			$("#resetComplete").show(3000);

		} else {
			$("#resetStarted").hide(3000);
			$("#resetErrorNwError").show(3000);
		}

		redirectMe(location.origin + contextPath + "/services/authentication/release/login.jsp?clientId=" + clientId, 5000);
	});


}


$(document).on("click", "#newUser", function () {
	var url;

	url = location.origin + contextPath + "/services/userManagement/ux/singleUserModalSignup.html";
	$.get(url, function (response) {
		loadMessageBoxNewUser(response, clientId).open();
	});
// Form is loaded, lets setup calancer.
	var intervalId = setTimeout(function () {

		$(".dob").calendar({
//			type: date,
			ampm: false,
			firstDayOfWeek: 1,
			inline: false,
			onChange: function (date, text) {
				day = date.getDate();
				dow = date.getDay();
				month = date.getMonth();
				year = date.getFullYear();
				age = calculate_age(date);
				modelPatron.classification.age = age;
				modelPatron.classification.generation = calculate_age_decade(age);
				modelPatron.timings.dob.$date = new Date(date).toISOString();
				//console.log("INF:  Age : %s", age);
				//console.log("INF:  Decade : %s", calculate_age_decade(age));
			}
		});

		clearTimeout(intervalId);
	}, 1000);
});





var expiryDate = new Date();
var month = expiryDate.getMonth();
expiryDate.setMonth(month + 1);
$(document).on("click", "#save", function () {








// Prime DateSet, then validate it
	modelPatron.pk.id = getRand();
	modelPatron.clientId = clientId;
	srvPatron.setPayload(modelPatron)
	// Validate
	if (!srvPatron.isValid("props")) {
		alert("ERR: Patron Props are not good");
		return;
	}

// Prime DateSet, then validate it
	modelPatronAccount.pk.id = getRand();
	modelPatronAccount.name = "patronAccount"
	modelPatronAccount.pk.type = "member";
	modelPatronAccount.account = []
	modelPatronAccountItem.username = modelPatron.email
	modelPatronAccountItem.password = modelPatron.password;
	modelPatronAccount.account.push(modelPatronAccountItem);
	if (modelPatronAccount.pk.type === "guest") {
		modelPatronAccountItem.expiry.$date = expiryDate.toISOString();
	}
	srvPatronAccount.setPayload(modelPatronAccount)
	// Validate
	if (!srvPatronAccount.isValid("props")) {
		alert("ERR: Account Props are not good");
		return;
	}

// Prime DateSet, then validate
	modelPatronCredit.pk.id = getRand();
	modelPatronCredit.amount = 0.00;
	srvPatronCredit.setPayload(modelPatronCredit)
	// Validate
	if (!srvPatronCredit.isValid("props")) {
		alert("ERR: Account Props are not good");
		return;
	}








	/*
	 *
	 * All Validations Completed, Let Provision
	 *
	 */
// Validated Patron: Ready To Create
// if page is LoginGUEST then type guest
// if page is Login then type member

	modelPatron.pk.type = "member"; // CFO, CIO, guest, member
	srvPatron.uxUpdateNameTag()
	modelPatronRsp = srvPatron.create();
	srvPatron.modPkDbId();

// Create Patron Credit - 0 Euros!!
	srvPatronCredit.uxUpdateNameTag()
	modelPatronCredit.pk.type = "float";
	modelPatronCredit.fk.id = modelPatronRsp.pk.id;
	modelPatronCredit.fk.dbId = modelPatronRsp.pk.dbId;
	modelPatronCreditRsp = srvPatronCredit.create();
	srvPatronCredit.modPkDbId();

// Create Patron Account !!
	srvPatronAccount.uxUpdateNameTag()
	modelPatronAccount.pk.type = modelPatronRsp.pk.type;
	modelPatronAccount.fk.id = modelPatronRsp.pk.id;
	modelPatronAccount.fk.dbId = modelPatronRsp.pk.dbId;
	modelPatronAccountRsp = srvPatronAccount.create();
	srvPatronAccount.modPkDbId();

// Create QR login !!
	var qr = {"clientId": "" + clientId + "", "patronId": "" + modelPatron.pk.id + ""}
	url = location.origin + contextPath + "/" + bs.patronQrCodeEndpoint;
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(qr).post().getResponse();
	//console.log("INF: rs.xx (" + response.authToken + ")")
// Patron Is Created Trigger email to new patron!
	var patronValidation = {
		"email": modelPatron.email,
		"name": modelPatron.fname + " " + modelPatron.lname,
		"clientId": clientId,
		"patronId": modelPatron.pk.id,
		"patronDbId": modelPatronRsp.pk.dbId // DBID is created by mongo, hence part of Rsp model
	};
	url = location.origin + contextPath + "/" + "PatronValidation";
	response = new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(patronValidation).post().getResponse();



	$("#newUser").prop('disabled', true)
	$("#newUser").prop('style', "color:gray");
});


// UX - Security Account
function addDefaultMedia() {

	modelPatronRichContent.name = "Patron Login"
	modelPatronRichContent.media.icon.name = uploadUx(
		"frmIcon",
		clientId, patronId,
		modelPatronRichContent.pk.type,
		"image",
		"#iconImg"
		, bs).filename
	modelPatronRichContent.media.icon.tag = modelPatronRichContent.pk.type
	modelPatronRichContent.media.pic.name = uploadUx(
		"frmPic",
		clientId, patronId,
		modelPatronRichContent.pk.type,
		"image",
		"#picImg"// UX Id to be updated by timer!
		, bs).filename
	modelPatronRichContent.media.pic.tag = modelPatronRichContent.pk.type
}

//# sourceURL=auth_onchange.js