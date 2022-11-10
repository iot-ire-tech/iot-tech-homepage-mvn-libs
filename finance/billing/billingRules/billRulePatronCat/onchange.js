/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).on("change", "#dobCat", function () {
	modelContext.filter.dob.$date = new Date($(this).val()).toISOString();
});
$(document).on("change", "#ageCat", function () {
	modelContext.filter.age = parseInt($(this).val());
});
$(document).on("change", "#genderCat", function () {
	modelContext.filter.gender = $(this).val();
});
$(document).on("change", "#occupationCat", function () {
	modelContext.filter.occupation = $(this).val()
});
$(document).on("change", "#familyStatusCat", function () {
	modelContext.filter.familystatus = $(this).val();
});
$(document).on("change", "#maritalStatus", function () {
	modelContext.filter.maritalStatus = $(this).val();
});






//# sourceURL=finance_billing_br_patronCat_onchange.js




