/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('click', '#save', function () {

	try {

		var inviteModel = {
			"accountId": accountId,
			...modelContext
		}
		var inviteId = postRequest("InvitationAdd", inviteModel);

//
//
// Mail Out
//
//
		var mailer = {
			"accountId": accountId,
			...modelContext
		};
		postRequest("MailBusinessInvite", mailer);

	} catch (e) {
		var err = "Social Invite Error, contact support asap"
		alert("INF: " + err)
		console.log("INF: " + err)
	}

});
//
//# sourceURL=stripe_invite_ctrl.js