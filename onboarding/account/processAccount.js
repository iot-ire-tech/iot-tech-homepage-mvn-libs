/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));


var gender = "";
$(document).on('change', '#gender', function () {
	gender = $(this).val();
});
var occupation = "";
$(document).on('change', '#occupation', function () {
	occupation = $(this).val();
});
var dob = "";
$(document).on('change', '#dob', function () {
	dob = $(this).val();
});
var mobile = "";
$(document).on('change', '#mobile', function () {
	mobile = $(this).val();
});
var fname = "";
$(document).on('change', '#fname', function () {
	fname = $(this).val();
});
var lname = "";
$(document).on('change', '#lname', function () {
	lname = $(this).val();
});
var email = "";
$(document).on('change', '#email', function () {
	email = $(this).val();
});
var pass = "";
$(document).on('change', '#pass', function () {
	pass = $(this).val();
});
var toc = false;
var tries = 0
$(document).on('checked change', '#agree', function () {
	toc = $(this).val();
	tries++;
});

$(document).on('click', '#btnAccount', function () {

	var clientData = {};
	var regData = {};

// Form Validation Checks
	if (toc === false) {
		//consoleIt("ERR: Form Validation - Failed to aggree with TOC")
		alert("You must check the terms of conditions before preceeding with account registration")
		return
	}

	/*
	 * Payload sent to Staging Data Store - New Client type trail!!!!!!
	 */

	/*
	 *  Account Creation!!!
	 */
	//  1. Create admin patron!!!
	var patron = new Patron()
	patron.clientId = clientId;
	patron.fname = fname;
	patron.lname = lname;
	patron.mobile = mobile;
	patron.email = email;
	patron.pass = pass;
	patron.occupation = occupation;
	patron.dob = dob;
	patron.gender = gender;
	patron.post(patron.getMember())

	// 2. Create enduser account
	var registarAccounts = new PatronAccount(patron.getId(), email, pass, "member", "open");
	registarAccounts.init();
	registarAccounts.post()

	updateAnalytics("New end user account added to system!", clientId, getTodaysDate());

	redirectMe("../login.jsp?clientId=" + clientId, 1000);

});

