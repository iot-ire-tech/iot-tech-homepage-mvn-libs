/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// TODO subscription, belongs in entities
// Products To associate plans with and thus subscriptions!!!!
$(document).on("change", ".selectProductPlanCandidate", function () {
    // Real Mode..
    // attach to head of service call, not item
    nsPlansService.modelItem.accountId = accountId
    nsPlansService.modelItem.productId = $("option:selected", this).attr("productId");
    nsPlansService.productId = $("option:selected", this).attr("productId");
    nsPlansService.accountId = accountId;
    // help id plan...
    nsPlansService.modelItem.suffix = $("option:selected", this).text();

    // add to accumalted producst
    // nsPlansService.productId = ;
    $("#selectedProductPlanName").html("<span class='w3-tag w3-green'>Product Item selected: " + $("option:selected", this).text() + "</span>")
    $(this).val(1)
});

$(document).on("dblclick", ".store, .activity, .event, .selectProductPlanCandidate", function () {
    alert("INF: ProductId:" + $("option:selected", this).attr("productId") + ", accountId:" + $("option:selected", this).attr("accountId"))
});

clientSide:{

    var showedVideo = false
    var addSelectPlans = false
    $(document).on("change", "#selectPlans", function () {
        addSelectPlans = true

        var planId = $(this).val()
        var couponId = $("option:selected", this).attr("couponId");
        var planDetail;
        var productRsp;

        ppCombo:{

            planDetail = getPlanDetail(accountId, planId)
            payload = {
                "accountId": accountId,
                "productId": planDetail.product
            };

            // This is the entity!!
            productRsp = postRequest("ProductGet", payload);

        }


        // Source Entity Associations...
        // This Product could be an activity or event or shop item....
        nsEntitiesService.productId = plan.product
        nsEntitiesService.get()

        productInfo:{
            nsMetaService.dbId = nsEntitiesService.obj.links.metaId
            nsBizHoursService.dbId = nsEntitiesService.obj.links.bizHoursId
            nsPoCService.dbId = nsEntitiesService.obj.links.pocId
            nsMultimediaService.dbId = nsEntitiesService.obj.links.mmIds
            nsGeoService.dbId = nsEntitiesService.obj.links.locationId
            nsLegalService.dbId = nsEntitiesService.obj.links.legalId
            nsPlansService.id = planId
        }

        // couponId: "DhjSEvKC"
        subscriptionInfo:{
            nsCouponsService.id = couponId
        }

        // revenue link..... or plan detail?


        // there is always a cost for a plan...
        if (nsPlansService.id.length > 0) {
            $("#planCostsHook").html(widgetPlansDetailCosts(planDetail))
        } else
            $("#planCostsHook").html(widgetPlansDetailCosts())

        if (nsCouponsService.id.length > 0) {
            nsCouponsService.crudOps.ep = "CouponsGet"
            nsCouponsService.crudOps.payload = {"accountId": accountId, "couponId": couponId}
            nsCouponsService.crudOps.get()
            $("#planCouponHook").html(widgetPlansDetailCoupon(nsCouponsService.crudOps.obj))
        } else
            $("#planCouponHook").html(widgetPlansDetailCouponNone())


        if (nsBizHoursService.dbId.length > 0) {
            nsBizHoursService.getByDbId()
            $("#planTimetableHook").html(widgetPlansDetailTimeTable(nsBizHoursService.uxWidgetListing.init(nsBizHoursService.obj.items)))
        } else
            $("#planTimetableHook").html(widgetPlansDetailTimeTableNot())


        if (nsPoCService.dbId.length > 0) {
            nsPoCService.serviceGet({"accountId": accountId, "productId": nsEntitiesService.productId})[0]
            $("#planContactHook").html(widgetPlansDetailPoC(nsPoCService.obj[0]))
        } else
            $("#planContactHook").html(widgetPlansDetailPoCNot())

        if (nsGeoService.dbId.length > 0) {
            nsGeoService.get()
            $("#planLocationHook").html(widgetPlansDetailLocation(nsCouponsService.obj))
        } else
            $("#planLocationHook").html(widgetPlansDetailLocationNot())


        // Each Plan is belong to a product!!
        showedVideo = false
        if (nsMultimediaService.dbId.length > 0 && showedVideo === false) {
            showedVideo = true
            nsMultimediaService.getByDbId()
            mediaLoad : {
                $("#planMediaHook").html(widgetPlansDetailVideo(nsMultimediaService.dbId))
                nsMultimediaService.mediaItemType = "video"
                var videolink = nsMultimediaService.getMediaItem();
                if (videolink !== undefined) {
                    var video = $("video")[0];
                    var source = $("source").attr('src', videolink.media.link);
                    video.append(source)
                    video.load()
                    video.play()
                }
                // Media
                // subscriptionsProvisioned is socialise subs...nsSub...
                nsMultimediaService.mediaItemType = "facebook"
                var fflink = nsMultimediaService.getMediaItem()
                if (fflink !== undefined) {
                    $("#planFacebookHook").html(widgetPlansDetailFacebook(fflink.media.link))
                }

                nsMultimediaService.mediaItemType = "youtube"
                var youtube = nsMultimediaService.getMediaItem()
                if (youtube !== undefined) {
                    $("#planYoutubeHook").html(widgetPlansDetailYouTube(youtube.media.link))
                }
            }
        }
        //	$("#planRecurringHook").html(widgetPlansDetailRecurring(planDetail, productRsp))
//	$("#selectSubscription").css({"min-height": "300px"})
//	$("#selectPlans").css({"min-height": "300px"})
//	$("#fldPlanDetail").css({"min-height": "300px"})
    });


}

serviceSide:{

    // Separation of duty
    //  html += "value=" + this.dbId + "," + item.planId + " "
    $(document).on("change", ".planListingPlans", function () {
        nsPlansService.accountId = accountId
        nsPlansService.planId = $("option:selected", this).attr("planId");
        nsPlansService.dbId = $("option:selected", this).attr("dbId");
        nsPlansService.ids = $(this).val();
    });

    // Separation of duty
    $(document).on("change", ".planListingSubs", function () {
        nsPlansService.ids = $(this).val();

        if (isPlanComboSubscriptionReady($(this).val())) {
            nsSubsService.modelItem.planIds = $(this).val();
            $("#saveSub, #addSub").attr("disabled", false)
        } else {
            nsSubsService.modelItem.planIds = []
            $("#saveSub, #addSub").attr("disabled", true)
        }
    });


    $(document).on("click ", ".deleteProductPlan", function () {

        $("#planDeletedMsg").delay(1000).fadeIn("fast")
        if (nsPlansService.ids.length > 1) {

            nsPlansService.ids.forEach(function (id) {
                nsPlansService.dbId = id.split(",")[0]
                nsPlansService.planId = id.split(",")[1]

                nsPlansService.archive()
                nsPlansService.delete()

                if (nsPlansService.obj.id !== undefined) {
                    // $("#selectPlanListHook").html(updateSubsPlansWidgetListing())
                    nsPlansService.refreshListing("Plans")
                    $("#planDeletedMsg").before("<br><span class='w3-tag w3-yellow w3-right planDeletedMsg'>Great a plan (" + nsPlansService.planId + "/" + nsPlansService.dbId + ") has been deleted</span>")
                } else {
                    $("#planDeletedMsg").html("<span class='w3-tag w3-yellow w3-right planDeletedMsg'>Sorry, the plan (" + nsPlansService.planId + "/" + nsPlansService.dbId + ") couldnt be deleted at the moment, contact support please</span>")
                    return
                }

            })
            $(".planDeletedMsg").delay(5000).fadeOut("slow")
        } else {

            nsPlansService.archive()
            nsPlansService.delete()

            if (nsPlansService.obj.id !== undefined) {
                nsPlansService.refreshListing("Plans")
                $("#planDeletedMsg").html("<br><span class='w3-tag w3-yellow w3-right'>Great a plan (" + nsPlansService.planId + "/" + nsPlansService.dbId + ") has been deleted</span>")
            } else {
                $("#planDeletedMsg").html("<br><span class='w3-tag w3-yellow w3-right'>Sorry, the plan (" + nsPlansService.planId + "/" + nsPlansService.dbId + ") couldnt be deleted at the moment, contact support please</span>")
                return
            }

        }
        $("#planDeletedMsg").delay(5000).fadeOut("slow")


    });

// Plans
    $(document).on("click ", ".addPlanItem", function () {
        // Add items to
        nsPlansService.itemsMap.set(getRand(), {
            "accountId": nsPlansService.accountId,
            "productId": nsPlansService.productId,

            "active": true,
            "usageType": "licensed",
            "name": nsPlansService.modelItem.name,
            "scheme": "",

            "transaction": {
                "amount": nsPlansService.modelItem.transaction.amount,
                "amountDec": nsPlansService.modelItem.transaction.amountDec,
                "currency": nsPlansService.modelItem.transaction.currency
            },
            "schedule": {
                "trialPeriodDays": nsPlansService.modelItem.schedule.trialPeriodDays,
                "interval": nsPlansService.modelItem.schedule.interval,
                "count": nsPlansService.modelItem.schedule.count
            }
        })
        nsPlansService.items.push({
            "accountId": nsPlansService.accountId,
            "productId": nsPlansService.productId,

            "active": true,
            "usageType": "licensed",
            "name": nsPlansService.modelItem.name,
            "scheme": "",

            "transaction": {
                "amount": nsPlansService.modelItem.transaction.amount,
                "amountDec": nsPlansService.modelItem.transaction.amountDec,
                "currency": nsPlansService.modelItem.transaction.currency
            },
            "schedule": {
                "trialPeriodDays": nsPlansService.modelItem.schedule.trialPeriodDays,
                "interval": nsPlansService.modelItem.schedule.interval,
                "count": nsPlansService.modelItem.schedule.count
            }
        })


// Reset From
        $("input[name=plan]").each(function () {
            $(this).val("")
        })
        $("#planInterval").val(1)

// TODO : subscriptions, Multiple Product Plan Support!
        $("#addPlanItemMsg").delay(1000).fadeIn("now")
        $("#addPlanItemMsg").html("<span class='w3-tag w3-yellow w3-left'>Plan#" + nsPlansService.itemsMap.size + " submitted....only upon save will it be committed!</span>")
        $("#addPlanItemMsg").delay(5000).fadeOut("slow")

        $("#addPlanItemMsg2Hdr").html("<span class='w3-tag w3-yellow saveProductPlanMsg '>Plan Summary</span>")
        var msg = "Name: " + nsPlansService.modelItem.name + "..."
            + "CostDec: " + nsPlansService.modelItem.transaction.amountDec + "..."
            + "Cost: " + nsPlansService.modelItem.transaction.amount + "..."
            + "Interval: " + nsPlansService.modelItem.schedule.interval + "..."
            + "Count: " + nsPlansService.modelItem.schedule.count + "..."
            + "TrialPeriod: " + nsPlansService.modelItem.schedule.trialPeriodDays
        $("#addPlanItemMsg2").after("<br><span class='w3-tag w3-yellow addPlanItemMsg2 '>" + msg + "</span>")

        console.table(nsPlansService.itemsMap)
    });

// Read To Save (only in model form)
    $(document).on("click ", ".saveProductPlan", function () {

        if (nsPlansService.itemsMap.size > 0) {
            nsPlansService.accountId = accountId
            nsPlansService.create()

            $("#saveProductPlanMsg").delay(5000).fadeIn("now")
            if (nsPlansService.planId !== undefined) {
                nsPlansService.planIds.forEach(function (planId) {
                    $("#saveProductPlanMsg").after("<br><span class='w3-tag w3-yellow w3-right saveProductPlanMsg'>Great new plan Id: (" + planId + ") created</span>")
                })
                nsPlansService.refreshListing("Plans")
            } else {
                $("#saveProductPlanMsg").html("<br><span class='w3-tag w3-yellow w3-right'>Sorry, the plan cant be added to this product (" + nsPlansService.productId + ") at the moment, contact support please</span>")
                $(this).attr("disabled", true)
                return
            }
            $(".saveProductPlanMsg").delay(5000).fadeOut("slow")
            $(".addPlanItemMsg2").delay(5000).fadeOut("slow")

            $(this).attr("disabled", true)
        } else {

            $(".saveProductPlanMsg").fadeIn("now").html("<span class='w3-tag w3-yellow w3-right'>Whoops, you need to add a plan, before saving</span>").delay(5000).fadeOut("slow")
        }

        // $(this).attr("disabled", true)
    });


}
planForm:{

// new plans
    $(document).on("change", "#planName", function () {
        nsPlansService.modelItem.name = $(this).val();
//	modelContext.plan.name = "(" + modelContext.plan.suffix + ") " + modelContext.plan.name;
    });
    $(document).on("change", "#planDescription", function () {
        nsPlansService.modelItem.description = $(this).val();
    });

    $(document).on("change", "#planCost", function () {
        nsPlansService.modelItem.transaction.currency = "eur";
        nsPlansService.modelItem.transaction.amount = parseFloat(parseFloat($(this).val()).toFixed(2)) * 100;
        // needs to be int
        nsPlansService.modelItem.transaction.amount = parseInt($(this).val() * 100);
        if (nsPlansService.modelItem.transaction.amount > 10000)
            alert("WRN: This seems like an expensive service, it exceeds 100 Euro, is this your intent?")
    });
    $(document).on("change", "#planInterval", function () {
        nsPlansService.modelItem.schedule.interval = $(this).val();
        // Stripe only allow one year
        if ($(this).val() === "year") {
            $("#planFrequency").attr("max", 1)
        } else if ($(this).val() === "month") {
            $("#planFrequency").attr("max", 12)
        } else if ($(this).val() === "week") {
            $("#planFrequency").attr("max", 52)
        } else if ($(this).val() === "day") {
            $("#planFrequency").attr("max", 365)
        }
    });
    $(document).on("change", "#planFrequency", function () {
        var rt = parseInt($(this).val());
        var max = parseInt($(this).attr("max"));
        // $("#planFrequencyMsg").html("Value (" + rt + "), max (" + max + ")")

        if (rt > max) {
            $(this).val(max);
            $("#planFrequencyMsg").fadeIn("now").html(
                "Max. allowed value for chosen planning interval is (" + max + ")"
            ).delay(10000).fadeOut("slow")
        } else
            nsPlansService.modelItem.schedule.count = parseInt(rt);
    });

    $(document).on("change", "#planFrequency", function () {

    });
    $(document).on("change", "#planTrialInterval", function () {
        nsPlansService.modelItem.schedule.interval = $(this).val()
    });
    $(document).on("click", "#planTrialPeriod", function () {

        if (this.checked === true) {
            // TODO why is this set to 30!!!
            // nsPlansService.modelItem.schedule.trialPeriodDays = 30;
            // nsSubscription
            nsSubsService.modelItem.trialFromPlan = true;
            $("#trialPeriodDays").attr("disabled", false)
        } else {
            nsPlansService.modelItem.schedule.trialPeriodDays = 0;
            // nsSub
            nsSubsService.modelItem.trialFromPlan = false;
            $("#trialPeriodDays").attr("disabled", true)
        }

    });
    $(document).on("change ", '#trialPeriodDays', function () {
        nsPlansService.modelItem.schedule.trialPeriodDays = parseInt($(this).val());
    });

}
//# sourceURL=api_plans_events.js


