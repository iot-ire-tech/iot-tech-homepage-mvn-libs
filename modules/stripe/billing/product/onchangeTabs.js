/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


tabnessMadness:{
    resourceDoOnce = true;
    resaleDoOnce = true;
    storeDoOnce = true;
    activityDoOnce = true;
    eventDoOnce = true;
    membershipDoOnce = true;
    $(document).on("click ", '.tabItem', function () {
//	$('.tabItem').click(function () {
        // default!!!
        // nsEntitiesService.modelCreate.mode = "resource"
        // nsEntitiesService.modelCreate.offering = "resource"

        var selectedTab = $("#tabs").tabs('option', 'active');
        var selectedTab = $(this).text()
        if (selectedTab === "Asset Management") {
            nsEntitiesService.modelCreate.mode = "resource"
            nsEntitiesService.modelCreate.offering = "resource"

            if (resourceDoOnce) {
//							resourceDoOnce = false;
                assetListHtml = refreshResourceAssetScopeList(masterList, "all", "selectProductIdAsset")
                $("#assetResourceHook").html(assetListHtml);
            }
        }
        if (selectedTab === "Asset Resale") {
            nsEntitiesService.modelCreate.mode = "resale"
            nsEntitiesService.modelCreate.offering = "resale"
            if (resaleDoOnce) {
//							resaleDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdResale")
                $("#resaleResourceHook").html(assetListHtml);
                $("#resaleItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));
            }
        }
        if (selectedTab.toString().includes("Store")) {
            nsEntitiesService.modelCreate.mode = "store"
            nsEntitiesService.modelCreate.offering = "store"

            if (storeDoOnce) {
//							storeDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdStore")
                $("#shopResourceHook").html(assetListHtml);
                $("#shopItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));
            }

        }
        if (selectedTab.toString().includes("Activities")) {
            nsEntitiesService.modelCreate.mode = "activity"
            nsEntitiesService.modelCreate.offering = "activity"
            if (activityDoOnce) {
//							activityDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdActivities")
                $("#activityResourceHook").html(assetListHtml);
                $("#activityItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));
            }
        }
        if (selectedTab.toString().includes("Events")) {
            nsEntitiesService.modelCreate.mode = "event"
            nsEntitiesService.modelCreate.offering = "event"
            if (eventDoOnce) {
//							eventDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdEvents")
                $("#eventResourceHook").html(assetListHtml);
                $("#eventItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));
            }
        }

        if (selectedTab.toString().includes("Builder")) {
            nsEntitiesService.modelCreate.mode = "membership"
            nsEntitiesService.modelCreate.offering = "membership"
            // when we save an entity of type sub, it will have a mode = membership...

            // Existing Entity Subs!!! which will be deleted...
            existingEntities_Subs:{
                // nsEntitiesService.modelQuery.mode = "membership"
                // nsEntitiesService.serviceGetType();
                // nsEntitiesService.refreshListing();
                // will pull up all subs on an account...
                nsSubsService.refreshListing()
            }

            // Next Upstream Assets
            subsResourceHook:{
                // Q. list entities of type resource?
                nsEntitiesService.modelQuery.mode = "resource"
                nsEntitiesService.serviceGetType();
                // This filter this list based on scope!.
                $("#subsResourceHook").html(refreshResourceAssetScopeList(nsEntitiesService.obj, "membership_on", "selectProductIdSubscriptions"))
                // $("#subsItemHook").html(uxSelectEntities(masterList, "selectSubscriptionEntities", ""));
            }


            // Next, List Subscriptions for viewing only, not deleted directly only via Entity deletion above!
            nsSubsService.accountId = accountId
            nsSubsService.refreshListing()

            nsPlansService.accountId = accountId
            nsPlansService.refreshListing("Subs")
        }

        if (selectedTab.toString().includes("Pricing Plans") || selectedTab.toString().includes("Subscriptions")) {
            nsEntitiesService.modelQuery.mode = "store"
            masterList = nsEntitiesService.serviceGetType();
            // selectProductIdMemberships
            $("#storeItemHookSub").html(uxSelectEntities(masterList, "selectProductPlanCandidate", "disabled"));

            nsEntitiesService.modelQuery.mode = "activity"
            masterList = nsEntitiesService.serviceGetType();
            $("#activityItemHookSub").html(uxSelectEntities(masterList, "selectProductPlanCandidate", ""));

            nsEntitiesService.modelQuery.mode = "event"
            masterList = nsEntitiesService.serviceGetType();
            $("#eventItemHookSub").html(uxSelectEntities(masterList, "selectProductPlanCandidate", ""));

            refreshPlans:{
                nsPlansService.accountId = accountId
                nsPlansService.refreshListing("Plans")
            }
        }
        if (selectedTab.toString().includes("Coupons")) {
            // nsCouponsService.accountId = accountId
            // nsCouponsService.uxWidgetListing = new UxCouponListing()
            // nsCouponsService.list()
            // nsCouponsService.uxWidgetListing.data = nsCouponsService.objs.data
            // var couponslist = nsCouponsService.uxWidgetListing.init()
            // $(".existingCouponsHook").html(couponslist);
        }


        if (selectedTab.toString().includes("Video")) {
            nsEntitiesService.modelCreate.mode = "video"
            nsEntitiesService.modelCreate.offering = "video"
            if (eventDoOnce) {
//							eventDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdVideoHub")
                $("#videoHubResourceHook").html(assetListHtml);
                $("#videoHubItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));

            }
        }

        if (selectedTab.toString().includes("Webinars")) {
            nsEntitiesService.modelCreate.mode = "webinar"
            nsEntitiesService.modelCreate.offering = "webinar"
            if (eventDoOnce) {
//							eventDoOnce = false;
                masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
                assetListHtml = refreshResourceAssetScopeList(masterList, nsEntitiesService.modelCreate.mode, "selectProductIdWebinars")
                $("#webinarResourceHook").html(assetListHtml);
                $("#webinarItemHook").html(getEntityTypeX(nsEntitiesService.modelCreate.mode));
            }
        }


        if (selectedTab.toString().includes("Stream")) {
            nsEntitiesService.modelCreate.mode = "bulk"
        }
        selectedTab = -1
        // $("#assetResourceHook").html(assetListHtml);
    })

}


//# sourceURL=stripe_product_change_tabs.js