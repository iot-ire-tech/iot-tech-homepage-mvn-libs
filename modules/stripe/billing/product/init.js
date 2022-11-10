/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var modelContext = {}

var parsedUrl = new URL(window.location.href);

var originId = parsedUrl.searchParams.get("originId");

var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var primaryId = accountIdP
var accountIdC = parsedUrl.searchParams.get("accountIdC");
var customerId = parsedUrl.searchParams.get("customerId");


var matadatafunc = new metaDataFunc();

var uxAssetSbbWidget = new uxAssetSbbWidget();
var uxAssetTbbWidget = new uxAssetTbbWidget();
var uxAssetPostNPackageListing = new uxAssetPostNPackageListing();
var uxAssetVbbWidget = new uxAssetVbbWidget();
var uxPreviewWidget = new uxPreviewWidget();
var uxRevenueVolumeBaseOfferingDialog = new uxRevenueVolumeBaseOfferingDialog();
var uxPostNPackageWidget = new uxPostNPackageWidget();
nsFixturesService.uxWidget = new uxEventFixtures();
nsSeatingService.uxWidget = new uxEventSeating();

var businessMode = ""
var assetProviderAccountId = ""

var basePath = location.origin + contextPath + "/resources/media/clients/"
var uxW3SelectCustomerList = new UxW3Select();
var uxW3SelectAssetList = new UxW3Select();
var uxW3SelectStoretList = new UxW3Select();

var billingModelRsp = {}


$(document).ready(function () {
        var uxBuinessMenuWidget = new UxProvisioningMenuWidget();
        uxLoad("#menuBarHook", uxBuinessMenuWidget.init())


        var repeatTabs = setInterval(function () {
            try {
                if ($('body').tabs) {
                    clearInterval(repeatTabs)
                    $(".tabs").tabs({active: 0});
                    $(".tabsMedia").tabs({active: 0});
                    $(".mmTabs").tabs({active: 0});
                    $("#tabsIndiviudal").tabs({active: 0});

                    $("#tabsCompany, #tabs, #tabsMedia, #tabsMediaStore, #tabsMediaActivities, #tabsMediaEvents, #tabsMediaVideo, #tabsMediaWebinar, #tabsSubs").tabs({
                        active: 0,
                        show: function (event, ui) {

                        },
                        select: function (event, ui) {
                        }
                    });
                    throw Error("Tabs Ready Via Interval")
                }
            } catch (e) {

                if (originId === "assetAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    $("#tabs").tabs("refresh");

                } else if (originId === "shopAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    $("#tabs").tabs("refresh");
                } else if (originId === "activitiesAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    $("#tabs").tabs("refresh");

                } else if (originId === "eventsAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();

                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    $("#tabs").tabs("refresh");

                } else if (originId === "membershipAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();

                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    $("#tabs").tabs("refresh");
                } else if (originId === "videohubAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();

                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 3 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    $("#tabs").tabs("refresh");
                } else if (originId === "webinarAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();

                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();

                    $("#tabs").tabs("refresh");
                } else if (originId === "messagingAdmin") {
                    var remove = 0
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 1 + ")").remove();
                    var tab = $("#tabs").find(".ui-tabs-nav li:eq(" + remove + 2 + ")").remove();

                    $("#tabs").tabs("refresh");
                }
                $("#tabs").css({"border": "none"})
            }
            console.log("ready")

        }, 10)

        affiliateRelations : {
            assetProviderAccountId = accountId;
            $("#modusOperandi").html("Platform Owner: " + accountName(accountId)).delay(5000).fadeIn("slow")


            /*
             * Ux Building
             */
// Account Id is null unless in async....
            var masterList = assetProfolioForDirectProvisionAndAllocation(assetProviderAccountId)
            var assetListHtml = refreshResourceAssetScopeList(masterList, "resource", "selectProductIdAsset")
            $("#assetResourceHook").html(assetListHtml);
        }


        customerListing:{
            var uxWidgetCustomerListRsp = uxWidgetCustomerList({
                "accountId": accountId,
                "productId": "",
                "className": "pocCustomerList messagingUsers",
                "size": 5,
                "multiple": ""
            })
            var htmlMembersList = uxWidgetCustomerListRsp.getHtml();
        }
        messagingWidget:{
            $("#customerListMessagingHook").html(htmlMembersList)
        }


        pocWidget:{
            var htmlPocWidget = UxPoCInline().build(htmlMembersList).getHtml();
            $(".customerListHook").html(htmlPocWidget)
        }


        uxPlans : {
            nsPlansService.uxWidget = new uxPlanWidget()
            html = nsPlansService.uxWidget.init()
            $("#uxPlans").html(html)
        }

        uxSubs : {
            nsSubsService.uxWidget = new uxSubsWidget()
            html = nsSubsService.uxWidget.init()
            $("#uxSubs").html(html)
        }

        uxCoupons : {
            nsCouponsService.uxWidget = new uxCouponWidget()
            var html = nsCouponsService.uxWidget.init()
            uxLoad("#uxCoupons", html)

            nsCouponsService.accountId = accountId
            nsCouponsService.uxWidgetListing = new UxCouponListing()
            nsCouponsService.list()
            nsCouponsService.uxWidgetListing.data = nsCouponsService.objs.data
            var couponslist = nsCouponsService.uxWidgetListing.init()
            uxLoad(".existingCouponsHook", couponslist)
        }

        subsOrder:{
            var uxWidgetOrdered = new widgetOrdered();
            $("#orderHookSubs").html(uxWidgetOrdered.init(
                "Plans", "multi-select as many pricing plans as needed ",
                "Coupons", "optionally add a coupon",
                "Subscription", "then add subscriptions, and save"))
        }

    }
)
;


//# sourceURL=stripe_product_init.js


