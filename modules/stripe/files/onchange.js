/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("blur change", "#name", function () {
	modelContext.name = $(this).val();
});
$(document).on("blur change", "#number", function () {
	modelContext.number = $(this).val();
});


//# sourceURL=file_change.js