/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));

$(document).ready(function () {

// Retrieve Full List Existing Events and load in form .

	$("#containerCvs").children().attr("disabled", "disabled");
	$("#containerSingle").children().attr("disabled", "disabled");

	$("#btnAddManyUsers").attr("disabled", false);


});
$(document).on("change", '#username', function () {
	patron.name = $(this).val();
});
$(document).on("change", '#email', function () {
	patron.email = $(this).val();
});
$(document).on("change", '#gender', function () {
	patron.gender = $(this).val();
});
/*
 * Add Address
 */

$(document).on("change", '#type', function () {
	patron.type = $(this).val();
});
$(document).on("change", '#street', function () {
	patron.street = $(this).val();
});


$(document).on("click", '#btnAdd', function () {

// Validations

//	$(this).attr("disabled", "true");
	patron.id = getRand();
	patron.name = patron.fname + " " + patron.lname;
	patron.clientId = clientId;
	/*
	 * Create User
	 */
	var patronObj = new JsonDb(patronEndpoint, "New Patron For Client")
	patronObj.setPayload(patron)
	patronObj.post();


	/*
	 * Create Default Login Account
	 */
	var expiryDate = new Date();
	var month = expiryDate.getMonth();
	expiryDate.setMonth(month + 1)

});



