/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click ", ".addBusinessWeb, .addBusinessVideo, .addBusinessActivity, .addBusinessEvent, .addBusinessStore, .addBusinessAsset", function () {

    $(this).attr("disabled", true)
});

$(document).on("change ", "#scope", function () {
    nsBusinessService.modelCreate.scope = []
    // if multiple
    var scope = $(this).val()
    var x = $(this).attr("multiple")

    if (scope.length > 0) {

        $(this).val().forEach(function (item) {
            nsBusinessService.modelCreate.scope.push(item)
            toggleFeatures(item)
        })

    } else {
        toggleFeatures(scope)
        nsBusinessService.modelCreate.scope.push(scope)
    }

});

function toggleFeatures(scope) {
    if (scope === "videohub_on" || scope === "webinar_on" || scope === "membership_on") {
        $(".mgtAvailabilityAsset").attr("disabled", true)
        $(".mgtCapacityAsset").attr("disabled", true)
    } else {
        $(".mgtAvailabilityAsset").attr("disabled", false)
        $(".mgtCapacityAsset").attr("disabled", false)
    }
}

$(document).on("change ", "#accessLevel", function () {

    nsBusinessService.modelCreate.whitelistedAccounts = []
    if ($(this).val() === "public") {
        nsBusinessService.modelCreate.whitelistedAccounts.push("public")
        $("#selectBlacklisted").attr("disabled", true)
    } else {
        $("#divBlackListWidet > *").attr("disabled", false)
    }

});
$(document).on("click", "#selectBlacklisted", function () {

// Get blacklistees into system...
    nsBusinessService.modelCreate.whitelistedAccounts = []

    $(this).val().forEach(function (item) {
        nsBusinessService.modelCreate.whitelistedAccounts.push(item)
    })

//	$("#divBlackListWidet > *").attr("disabled", true)

})

// sellable
$(document).on("change ", ".sellable", function () {
    if ($(this).val().toString().includes("true")) {
        nsBusinessService.modelCreate.active = true
    } else {
        // alert("Are you sure you want to archive this item. If so, contact support to unarchive it, else it want be visible by customers")
        nsBusinessService.modelCreate.active = false
    }
});

$(document).on("click", "#loadAssets", function () {
    window.console.debug("this is on");
    window.open(location.origin + "/services/modules/stripe/billing/product/release/assets.jsp?primaryId=" + primaryId + "&accountId=" + accountId).focus()
});


//# sourceURL=api_business_events.js


