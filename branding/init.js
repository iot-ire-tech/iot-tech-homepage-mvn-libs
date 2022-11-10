/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var ts = new getTodaysDate();
var targetId = getRand();



// Ux : Init Function
$(document).ready(function () {


	modelContext = modelUx;
	modelContext.accountId = accountId;

});


//# sourceURL=services_module_branding_init.js