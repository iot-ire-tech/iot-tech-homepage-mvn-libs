/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('click', '#saveOnboardingSub', function () {

    // switch to platform as sub is on platfrom
    var accountId = accountIdPlt
    var customerId = customerIdPlt

    var planIds = []
    try {

// Product on CA
        var payload = {
            "accountId": accountId,
            ...modelContext.product
        };
        var productId = postRequest("ProductAdd", payload).id;
// Plan on CA
        payload = {
            "accountId": accountId,
            "productId": productId,
            ...modelContext.plan
        };
        // nsPlansService
        var planId = postRequest("PlanAdd", payload).id;
        planIds.push(planId)
// Subscription on CA
        trial_from_plan = true;
        payload = {
            "accountId": accountId,
            "planIds": planIds,
            "customerId": customerId,
            // Token Payload
            ...modelContext.subscription
        };
        // nsSubsService
        var subscriptionId = postRequest("SubscriptionAdd", payload).id;
        // TEST - New invoice from ‪IOT Tech‬ #CE999410-0006

        if (subscriptionId !== undefined && subscriptionId.length > 0)
            $("#msg").html(
                "<span>Congratulations, your subscription planId:" + subscriptionId + ", has been enabled</span>"
            )
        else
            $("#msg").html("Apologies, your payment plan cannot be activated at the moment<br>Please contact support asap")

        $(this).attr("disabled", true)


//      Log Targeted Account
        if (originId !== null)
            accountId = accountIdC
        else
            accountId = accountIdP // aka originId

        updateOptionsModel:{
            // 1. delete from all

            // 2. Add to new level
            if (modelContext.plan.name === "signup-entry")
                nsOptionsMemberModelService.modelCreate.level = "basic"
            else if (modelContext.plan.name === "signup-pro")
                nsOptionsMemberModelService.modelCreate.level = "professional"
            else if (modelContext.plan.name === "signup-pre")
                nsOptionsMemberModelService.modelCreate.level = "premium"

            nsOptionsMemberModelService.modelCreate.accountId = "acct_1CBNZCFOjjfpNUIx"
            nsOptionsMemberModelService.modelCreate.version = "0.1"
            nsOptionsMemberModelService.modelItem = {
                "ts": new Date().toISOString(),
                "accountId": accountId // new acount
            };
            nsOptionsMemberModelService.modelCreate.items.push(nsOptionsMemberModelService.modelItem)

            // need for get account
            nsOptionsMemberModelService.modelQuery = {
                "accountId": platformId,
                "level": nsOptionsMemberModelService.modelCreate.level,
                "version": "0.1"
            }
            nsOptionsMemberModelService.service()

        }


        return;

// Mail Out
        var mailer = {
            ...payload,
            "ts": new Date().toLocaleString()
        };
        postRequest("MailerRegistrationLegalIndi", mailer);
        console.log("INF: Legal Onboard Complete")

    } catch (e) {
        $("#msg").html("Apologies, but your payment plan:" + subscriptionId + ", has not been enabled<br>Please contact support asap")
//		alert("INF: " + err)
        console.log("INF: Subscription Err: " + e)
    }


});
//# sourceURL=signup_subscription_ctrl.js