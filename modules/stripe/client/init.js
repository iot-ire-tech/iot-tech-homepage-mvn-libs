/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {

//	url = location.origin + contextPath + "/services/business/client/registration/ux/registration.html";
//	new PageLoad(url, "accountWidgetTarget", "n/a").put()

//	 modelContext = modelClient;
	modelContext = modelConnectAccount;
	modelContext.pk.type = "trail"; // client enters in trail mode, we give demos!
	modelContext.pk.id = getRand(); // Client Key!!


});


//# sourceURL=client_account_init.js


