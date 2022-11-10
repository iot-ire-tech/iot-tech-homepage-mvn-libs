/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



// Form : Signup / Registration
$(document).on("change", "#trial", function () {
//	$("#cost").text("First Month Free!!!")
//	$("#cost").val(0)
	$("#count").attr("disabled", false)

	modelContext.plan.schedule.trialPeriodDays = 30;
	modelContext.subscription.trialFromPlan = true;


});

$(document).on("change", "#count", function () {
	modelContext.plan.transaction.currency = "eur";
	modelContext.plan.schedule.interval = "month";
	modelContext.plan.schedule.count = parseInt($(this).val());
//	modelContext.plan.schedule.count = 1 // every month
// Total
	modelContext.plan.transaction.amount *= modelContext.plan.schedule.count;
});



$(document).on("change", "#entry", function () {
	$("#cost").text("150/Month")
	$("#cost").val(150)
	$("#count").attr("disabled", false)

	var dec = 150 * 100;
	modelContext.plan.transaction.amount = dec;
	modelContext.plan.name = "signup-entry";
	modelContext.product.name = "signup-entry";
	modelContext.product.description = "IOT Tech:Entry Level";
});
$(document).on("change", "#pro", function () {
	$("#cost").text("450/Month")
	$("#cost").val(450)
	$("#count").attr("disabled", false)

	var dec = 450 * 100;
	modelContext.plan.transaction.amount = dec;
	modelContext.plan.name = "signup-pro";
	modelContext.product.name = "signup-pro";
	modelContext.product.description = "signup-pro";
	modelContext.product.description = "IOT Tech: Pro. Level";

});
$(document).on("change", "#pre", function () {
	$("#cost").text("600/Month")
	$("#cost").val(600)
	$("#count").attr("disabled", false)

	var dec = 600 * 100;
	modelContext.plan.transaction.amount = dec;
	modelContext.plan.name = "signup-pre";
	modelContext.product.name = "signup-pre";
	modelContext.product.description = "signup-pre";
	modelContext.product.description = "IOT Tech: Prem. Level";

});



// Schedule
$(document).on("change", "#recurring", function () {
	if (this.checked)
		modelContext.subscription.cancelAtPeriodEnd = false
	else
		modelContext.subscription.cancelAtPeriodEnd = true
});



//# sourceURL=signup_subscription_change.js