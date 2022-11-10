/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {

//	$(this).attr("disabled", true)

    if (!nsRevenueService.modelItem.viable && nsEntitiesService.modelCreate.offering !== "" && nsEntitiesService.modelCreate.offering !== "membership") {
        var htmlEntity = ""
        htmlEntity += "<br>"
        htmlEntity += "<hr>"
        htmlEntity += "The revenue amount you committed for this entity is not viable!"
        htmlEntity += "<br>"
        htmlEntity += "<br>"
        htmlEntity += "Account Id: " + accountId
        htmlEntity += "<br>"
        htmlEntity += "Cost: " + nsRevenueService.modelItem.transaction + " EUR"
        htmlEntity += "<br>"
        htmlEntity += "Min Cost Allowed: " + nsRevenueService.modelItem.min + " EUR"
        htmlEntity += "<br>"
        htmlEntity += "Max Cost: Allowed: " + nsRevenueService.modelItem.max + " EUR"
        htmlEntity += "<br>"
        htmlEntity += "<hr>"
        htmlEntity += "<br>"
        htmlEntity += "For support reach out to MyBusinessPal.Com"
        htmlEntity += "<br>"
        htmlEntity += "<br>"
        $("#dialogEntityHook").html(htmlEntity)
        $("#dialogEntity").dialog(nsBizHoursService.ux.dialogueProps);
        return
    }


    // nsEntitiesService.items.push(nsEntitiesService.modelItem)
    // reset Item
    checks:{
        if (nsEntitiesService.assetId.length === 0) {
            // alert("You need to associate an upstream asset with your provisioning cycle")
            // return
        }
        // if video hub
        if (nsRevenueService.itemsMap.size === 0 && nsEntitiesService.modelCreate.offering === "video") {
            alert("You need to add revenue details to your video hub provisioning cycle")
            return
        }
        if (nsRevenueService.itemsMap.size === 0 && nsEntitiesService.modelCreate.offering === "activity") {
            alert("You need to add revenue details to your activity provisioning cycle")
            return
        }
        if (nsRevenueService.itemsMap.size === 0 && nsEntitiesService.modelCreate.offering === "store") {
            alert("You need to add revenue details to your store provisioning cycle")
            return
        }
        if (nsRevenueService.itemsMap.size === 0 && nsEntitiesService.modelCreate.offering === "event") {
            alert("You need to add revenue details to your event provisioning cycle")
            return
        }

    }

    provision: {
        nsEntitiesService.type = "service"
        nsEntitiesService.accountId = accountId
        nsEntitiesService.create()
        var productId = nsEntitiesService.productId;
        if (productId === undefined) {
            alert("INF: New entity couldnt be provision as this moment, please contact support, with following datails\n accountId (" + accountId + ") \ntime (" + new Date().toGMTString() + ")")
            return;
        }

        meta:{
            nsMetaService.accountId = accountId
            nsMetaService.productId = productId
            nsMetaService.create()
            nsMetaService.resetAccumulators()
            nsEntitiesService.obj.links.metaId = nsMetaService.dbIds[0]
            nsEntitiesService.obj.links.metaIds = nsMetaService.dbIds
            nsMetaService.resetResults()

        }


        schedule:{
            nsScheduleService.accountId = accountId
            nsScheduleService.productId = productId
            nsScheduleService.create()
            nsScheduleService.resetAccumulators()
            nsEntitiesService.obj.links.mmIds = nsScheduleService.dbId
            nsScheduleService.resetResults()

        }


        coupons:{
            // only one coupon can be a
            nsCouponsService.accountId = accountId;
            nsCouponsService.productId = productId
            nsCouponsService.create()
            nsCouponsService.resetAccumulators()
            nsEntitiesService.obj.links.couponIds = nsCouponsService.couponIds
            nsCouponsService.resetResults()
        }

        plans:{
            nsPlansService.accountId = accountId
            nsPlansService.productId = productId
            nsPlansService.create()
            nsPlansService.resetAccumulators()
            nsEntitiesService.obj.links.planIds = nsPlansService.planIds
            nsPlansService.planIds = ""
            nsPlansService.resetResults()

        }

        subs:{
            nsSubsService.isShadowOnly = true // as stripe subs is created on client side.
            nsSubsService.accountId = accountId
            nsSubsService.productId = productId
            nsSubsService.create()
            nsSubsService.resetAccumulators()
            nsEntitiesService.obj.links.subscriptionIds = nsSubsService.subscriptionIds
            nsSubsService.subscriptionIds = ""
            nsSubsService.resetResults()
        }


        mm:{
            nsMultimediaService.accountId = accountId
            nsMultimediaService.productId = productId
            nsMultimediaService.create()
            nsMultimediaService.resetAccumulators()
            nsEntitiesService.obj.links.mmIds = nsMultimediaService.dbId
            nsMultimediaService.resetResults()
        }

        // tbb: {
        //     if (false) {
        //         var rspTbb = ttbService(productId)
        //         nsEntitiesService.obj.links.tbbId = rspTbb._id
        //         rspTbb._id = ""
        //     }
        // }

        revenue: {
            nsRevenueService.accountId = accountId;
            nsRevenueService.productId = productId;
            nsRevenueService.create();
            nsRevenueService.resetAccumulators()
            nsEntitiesService.obj.links.revenueId = nsRevenueService.dbIds[0]
            nsEntitiesService.obj.links.revenueIds = nsRevenueService.dbIds
            nsRevenueService.resetResults()
        }
        // iff
        business: {
            nsBusinessService.accountId = accountId;
            nsBusinessService.productId = productId;
            nsBusinessService.create();
            nsBusinessService.resetAccumulators()
            nsEntitiesService.obj.links.businessId = nsBusinessService.dbId
            nsBusinessService.resetResults()
        }

        legal: {
            nsLegalService.accountId = accountId;
            nsLegalService.productId = productId;
            nsLegalService.create();
            nsEntitiesService.obj.links.legalId = nsLegalService.dbId
            nsLegalService.resetAccumulators()
            nsLegalService.resetResults()
        }
        bizHours:{
            nsBizHoursService.accountId = accountId;
            nsBizHoursService.productId = productId;
            nsBizHoursService.uxBusinessHoursWidget = uxBusinessHoursWidget;
            nsBizHoursService.create()
            nsEntitiesService.obj.links.bizHoursId = nsBizHoursService.dbId
            nsBizHoursService.resetAccumulators()
            nsBizHoursService.resetResults()
        }

        pnpShop:{
            nsPnpService.accountId = accountId;
            nsPnpService.productId = productId;
            nsPnpService.uxPostNPackageWidget = uxPostNPackageWidget;
            nsPnpService.create()
            nsEntitiesService.obj.links.pnpId = nsPnpService.dbId
            nsPnpService.resetAccumulators()
            nsPnpService.resetResults()

        }


        capPlanning:{
            if (addCapacityPlanning) {
                var rspCap = capacityPlanningService(productId)
                nsEntitiesService.obj.links.capacityMgtId = rspCap._id
                rspCap._id = ""
                // nsMetaService.dbIds = []
            }
        }

        capPlanningAlerting:{
            if (addCapacityPlanningAlerting) {
                var rspCapAlerting = capacityAlertPlanningService(productId)
                nsEntitiesService.obj.links.capacityAlertingId = rspCapAlerting._id
                rspCapAlerting._id = ""
                // nsMetaService.dbIds = []
                // nsMetaService.resetAccumulators()
            }
        }

        fixtures: {

            nsFixturesService.accountId = accountId;
            nsFixturesService.productId = productId;
            nsFixturesService.create()
            nsEntitiesService.obj.links.fixturesId = nsFixturesService.dbId
            nsFixturesService.resetAccumulators()
            nsFixturesService.resetResults()
        }

        Seating: {
            nsSeatingService.accountId = accountId;
            nsSeatingService.productId = productId;
            nsSeatingService.create()
            if (nsSeatingService.dbId === null)
                throw Error("Seating capacity resulted in an issue, contact support asap")
            nsEntitiesService.obj.links.seatingId = nsSeatingService.dbId
            nsSeatingService.resetAccumulators()
            nsSeatingService.resetResults()
        }


        poc:{
            if (addPoc) {
                modelPoc.accountId = accountId
                modelPoc.productId = productId
                var rspPoc = nsPoCService.service(modelPoc)
                nsEntitiesService.obj.links.pocId = rspPoc._id
                rspPoc._id = ""
                // nsPoCService.resetAccumulators()
            }

        }


        // Webinar needs Poc
        zoom: {
            nsWebinarService.accountId = accountId;
            nsWebinarService.productId = productId;
            // read in Poc
            nsWebinarService.modelItem.settings.contact_name = modelPoc.fullName
            nsWebinarService.modelItem.settings.contact_email = modelPoc.email
            // meta
            nsWebinarService.modelItem.topic = nsMetaService.modelItem.name
            nsWebinarService.modelItem.agenda = nsMetaService.modelItem.description
            // read user account
            nsWebinarService.modelItem.password = nsUserAccountService.modelItem.password
            // read schedule
            nsWebinarService.modelItem.start_time = nsScheduleService.modelItem.startDateTime
            nsWebinarService.modelItem.duration = nsScheduleService.modelItem.duration.hours + nsScheduleService.modelItem.duration.minutes
            nsWebinarService.modelItem.timezone = nsScheduleService.modelItem.timezone

            nsWebinarService.create();
            nsEntitiesService.obj.links.webinarId = nsWebinarService.dbId
            nsWebinarService.resetAccumulators()
            nsWebinarService.resetResults()

        }
        vvb:{
            if (uxRevenueVolumeBaseOfferingDialog.getIds().length > 0) {
                vbbMaxQuanity = []
                modelContext.vbb = []
                uxRevenueVolumeBaseOfferingDialog.getIds().forEach(function (item) {
                    var currency = ""
                    var isBestPrice = $("#" + item.bestpriceId).val()

                    if (isBestPrice === "yes")
                        $("#" + item.bestpriceId).attr('value', true);
                    else
                        $("#" + item.bestpriceId).attr('value', false);
                    meta = {
                        "cost": parseFloat($("#" + item.costId).val()),
                        "quanity": parseInt($("#" + item.quanityId).val()),
                        "bestprice": $("#" + item.bestpriceId).val(),
                        "currency": $("#" + item.currencyId).val(),
                        "annotate": $("#" + item.annotateId).val()
                    }
                    modelContext.vbb.push(meta);
                    vbbMaxQuanity.push(meta.quanity);
                });
                var volume2Sale = vbbMaxQuanity.sort(function (a, b) {
                    return a - b
                })[vbbMaxQuanity.length - 1];
                if (modelContext.vbb.toString().length >= 500) {
                    alert("INF: You have max out the volume based entries, delete one, and try again (" + modelContext.vbb.toString().length)
                    return
                }
                if (volume2Sale > modelContext.unitsTotal) {
                    alert("INF: You cannot set a sale volume (" + volume2Sale + "), greater than the stock capacity (" + modelContext.unitsTotal + "), reduce or match it")
                    return;
                }
                if (modelContext.unitsLower > modelContext.unitsUpper) {
                    alert("INF: You cannot have a lower capacity (" + modelContext.unitsLower + ") greater than the upper capacity(" + modelContext.unitsUpper + ") reduce accordingly, 25%/75% is good ratio")
                    return;
                }

            }
        }

        try {
            // Stripe Update
            nsEntitiesService.update()
            nsEntitiesService.resetAccumulators()
        } catch (errMsg) {
            alert("ERR: Entity update operation, contact support asap (" + errMsg + ")")

            $("#dialogEntityHook").html(html)
            $("#dialogEntity").dialog(nsBizHoursService.ux.dialogueProps);


        }

    }

    var htmlEntity = ""
    if (nsEntitiesService.modelCreate.offering === "") {
        nsEntitiesService.modelCreate.offering = "asset"
    }
    htmlEntity += "<br>"
    htmlEntity += "<hr>"
    htmlEntity += "Congratulations, a new " + nsEntitiesService.modelCreate.offering + " has been added to your business portfolio!"
    htmlEntity += "<br>"
    htmlEntity += "<br>"
    htmlEntity += "Account Id: " + accountId
    htmlEntity += "<br>"
    htmlEntity += "Entity Id: " + productId
    htmlEntity += "<hr>"
    htmlEntity += "<br>"
    htmlEntity += "For support reach out to MyBusinessPal.Com"
    htmlEntity += "<br>"
    htmlEntity += "<br>"
    $("#dialogEntityHook").html(htmlEntity)
    $("#dialogEntity").dialog(nsBizHoursService.ux.dialogueProps);

// Mail Out
//		var mailer = {
//			...token,
//			...source,
//			"sourceId": sourceId,
//			"ts": new Date().toLocaleString()
//		};
//		postRequest("MailerRegistrationPaymentsCard", mailer);
//		console.log("INF: Payments SEPA Complete")


    try {
        if (modelContext.blackListedAccountHolders !== undefined || modelContext.blackListedAccountHolders.length === 0) {
            var publicIndex = $.inArray("public", modelContext.blackListedAccountHolders)
            if (publicIndex === -1)
                modelContext.blackListedAccountHolders.forEach(function (accountId) {

// For each Blacklisted account
                    var isBlackListed = getDbRequestXByY("blacklisted", "accountId", accountId);
                    if (isBlackListed.length >= 1) {
                        isBlackListed = isBlackListed[0]

                        var index = $.inArray(productId, isBlackListed.productIds)
                        if (index === -1) {
                            isBlackListed.productIds.push(productId)
                            putDbRequest("blacklisted", isBlackListed, isBlackListed._id);
                        }
                    } else {
                        var payload = {
                            "accountId": "",
                            "productIds": []
                        }
                        payload.accountId = accountId
                        payload.productIds.push(productId)
                        var brandingRsp = postDbRequest("blacklisted", payload);
                    }
                })
        }

    } catch (e) {
//	alert("INF: Could not black list account (" + accountId + ") contact support asap")
    }

    var url = "/services/modules/stripe/billing/product/release/portal.jsp?"
    url += "accountId=" + accountId + "&"
    url += "accountIdP=" + accountIdP + "&"
    url += "accountIdC=" + accountIdC + "&"
    url += "customerId=" + customerId + "&"
    url += "originId=" + originId

    redirectMe(location.origin + contextPath + url, 5000, "_self");


});
//
//# sourceURL=stripe_product_ctrl.js