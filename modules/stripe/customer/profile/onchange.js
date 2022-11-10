/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#username", function () {
	modelContext.userAccount.user = $(this).val();
});
$(document).on("change", "#password", function () {
	modelContext.userAccount.pass = $(this).val();

});


//# sourceURL=customer_reset_change.js