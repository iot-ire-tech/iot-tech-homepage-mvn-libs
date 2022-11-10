/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("change", "#fname", function () {
	modelContext.fname = $(this).val();
});
$(document).on("change", "#lname", function () {
	modelContext.lname = $(this).val();
});
$(document).on("change", "#website", function () {
	modelContext.website = $(this).val();
});

$(document).on("change", "#emailInvitee", function () {
	modelContext.emailInvitee = $(this).val();
});
$(document).on("change", "#emailInviter", function () {
	modelContext.emailInviter = $(this).val();
});

$(document).on("change", "#shopping", function () {
	modelContext.shopping = $(this).val();
});
$(document).on("change", "#events", function () {
	modelContext.events = $(this).val();
});
$(document).on("change", "#activities", function () {
	modelContext.activities = $(this).val();
});
$(document).on("change", "#greetingmsg", function () {
	modelContext.greetingmsg = $(this).val();
});

//# sourceURL=stripe_invite_change.js