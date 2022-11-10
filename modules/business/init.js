/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// http://localhost:8084/services/modules/business/activity/release/portal.jsp?accountId=acct_1Fhwv2B2iGwtq5ly&accountId=acct_1FioH0KdHruxI3OT&customerId=cus_GFIsJ3kJhombcM
var parsedUrl = new URL(window.location.href);
//var accountId = parsedUrl.searchParams.get("accountId");
// Affliate...
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var productShareId = parsedUrl.searchParams.get("productShareId");
var myTable = {};
//debugger

var platformName = "";
var payload = {}
var mode = "debug"

iotUsageFlags: {
    var videoHubUsage = false;
    var bookingUsage = false;
    var availabilityUsage = false;
    var smsUsage = false;
    var emailUsage = false;
    var pnpUsage = false;
    var inventoryUsage = false;
    var messagingUsage = false;
    var brandingUsage = false;
    var supportUsage = false;
    var analyticsUsage = true;
}


var dialogueProps = {
    modal: true,
    autoOpen: true,
    draggable: true,
    resizable: true,
    width: "auto",
    height: "auto",
    position: {my: "top", at: "top", of: window},
    closeOnEscape: true
}

var shoppingItems = new Map()
var mycart = {}
var myMeta = {}


$(window).ready(function () {
    var items = []


    var uxWidgetOrdered = new widgetOrdered();
    var uxFlags = new widgetFlags();
    var uxCurrency = new widgetCurrency();
    if (window.location.pathname.includes("activity")) {
        nsEntitiesService.modelQuery.mode = "activity";

        myTable = new uxActivitiesBrowser();

        $("#orderHook").html(uxWidgetOrdered.init(
            "Book", "multi-book as many items as needed",
            "Cart", "add items to the cart",
            "Buy", "click on shopping cart to review items"))
        // var bookingWidget = new uxBookingWindow().init({"type": "activity"});
        mycart = new cartFunc("activity");
        var htmlBanner = initActivity()

    } else if (window.location.pathname.includes("event")) {
        nsEntitiesService.modelQuery.mode = "event";
        myTable = new uxEventsBrowser();

        $("#orderHook").html(uxWidgetOrdered.init(
            "Book", "multi-book as many items as needed",
            "Cart", "add items to the cart",
            "Buy", "click on shopping cart to review items"))

        // var bookingWidget = new uxBookingWindow().init({"type": "event"});
        mycart = new cartFunc("event");

        var htmlBanner = initEvents()
    } else if (window.location.pathname.includes("store")) {
        nsEntitiesService.modelQuery.mode = "store";
        myTable = new uxStoreBrowser();
        $("#orderHook").html(uxWidgetOrdered.init(
            "Browse", "multi-select as many items as needed ",
            "Shopping Cart", "add items to the cart",
            "Buy", "click on shopping cart to review items"))
        mycart = new cartFunc("store");
        var htmlBanner = initStore()
    } else if (window.location.pathname.includes("video")) {
        nsEntitiesService.modelQuery.mode = "video";
        $("#orderHook").html(uxWidgetOrdered.init(
            "Browse", "multi-select as many items as needed ",
            "Shopping Cart", "add items to the cart",
            "Buy", "click on shopping cart to review items"))

        var modelVideHubRsp = getDbRequest("video-hub");
        myTable = new uxVideoBrowser(modelVideHubRsp);
        var htmlBanner = initVideo()

        mycart = new cartFunc("videoHub");
    } else if (window.location.pathname.includes("webinar")) {
        nsEntitiesService.modelQuery.mode = "webinar";
        $("#orderHook").html(uxWidgetOrdered.init(
            "Browse", "multi-select as many webinars as needed, fill cart",
            "Shopping Cart", "click on checkbox, to add them to the cart",
            "Buy", "click on 'Shopping Cart' menu to review order"))
        // TODO need clean up service on back end start_time > today!!!
        myTable = new uxWebinarBrowser();

        var htmlBanner = initWebinar()
        mycart = new cartFunc("webinar");
    }

    myMeta = new metaFunc();
    affiliateRelations : {
        if (accountId === null) {
            alert("WRN: URL doesnt contain parent")
            return
        }

    }

    nsBrandingService.accountId = accountId
    nsBrandingService.brandMe();

    var uxBuinessMenuWidget = new UxBusinessMenuWidget();
    var menuTmp = uxBuinessMenuWidget.init()
    // alert(menuTmp)
    $("#menuBarBizHook").html(menuTmp)

    shoppingCart : {
        $("#cartHook").after(mycart.init("cart").addHeader().addHeaderItems().addItemHook().addFooterItems().addFooter().getCart())
    }
    sessionMeta : {
        $("#metaHook").after(myMeta.init("meta").addHeader().addBody().addFooter().getWidget())
    }

    shoppingCartCss : {
        var stickiness = "position: -webkit-sticky;"
        stickiness += "position: fixed;"
        stickiness += "top: 20%;"
//	stickiness += "top: 0;"
        stickiness += "left: 84%;"
        stickiness += "width:15%;"
        var visual = "background-color: white; "
//		visual += "padding: 5px; "
//		$(".staycenter_right ").attr("style", stickiness + " " + visual)

        stickiness += "left: 0%;"
        stickiness += "width:15%;"
        var visual = "background-color: white; "
        visual += "padding: 5px; "
//		$(".staycenter_left ").attr("style", stickiness + " " + visual)

    }


// Get Shopping For Primary Account Holder

    platformData: {
        nsEntitiesService.modelQuery.accountId = accountId;
        items = nsEntitiesService.serviceGetType();
        if (items.length <= 0) {
            var primingmsg = "<br>"
            primingmsg += "<br>"
            primingmsg += "<br>"
            primingmsg += "<div class='w3-container w3-center w3-border w3-border-gray' style='margin-left:25%; margin-right: 25%; max-width: 50%'>"
            primingmsg += "<h1>Your platform is not primed.</h1>"
            primingmsg += "<h3>Request your administrator to provision the system</h3>"
            primingmsg += "</div>"
            $("#messageContainerHook").html(primingmsg)
            return
        }
        platformName = accountDetails(accountId).business_profile.name
        myTable.productItems = items
        myTable.init()
        var htmlTable = myTable.addHeader(accountId).addBody().addFooter().getTable()
        $("#browsingTable").html(htmlTable)
//		brandMeBannerSmall(accountId, items.length)
    }

    affiliateData: {
        nsPrimaryAccountMembersService.modelQuery = {
            "platformId": platformId,
            "accountId": accountId
        };
        try {
            nsPrimaryAccountMembersService.getCompliantAccounts()
        } catch (e) {
            // affiliate member is trying something?
        }
        nsPrimaryAccountMembersService.accountIds.forEach(function (accountkey) {
            nsEntitiesService.modelQuery.accountId = accountkey;
            items = nsEntitiesService.serviceGetType();
            if (items !== undefined && items.length > 0) {
                myTable.productItems = items
                myTable.init()
                $("#browsingTable").after(myTable.addHeader(accountkey).addBody().addFooter().getTable())
                bannerTime:{
//					html = "<span>Service Provider: (" + accountRsp[accountkey] + ") " + accountName(accountRsp[accountkey]) + " </span>"
                    brandMeBannerSmall(accountkey, items.length)
                    $("#browsingTable").after("<br><br>")
                    $("#browsingTable").after("<br><br>")
                    $("#browsingTable").after("<br><br>")
                    $("#browsingTable").after("<br><br>")
                    $("#browsingTable").after("<br><br>")
                    $("#browsingTable").after("<br>")
                    $("#browsingTable").after("<br>")
                    $("#browsingTable").after("<br>")
                    $("#browsingTable").after("<br>")
                }
            } else {
// Mail Shop owner that they have no events for sale!
//				alert("INF:  Hi, (" + accountRsp[accountkey] + "), why not join your business partners and add events to your business portfolio!!!")
            }
        })

    }

    uxInitUx: {


        uxLoad("#banner", htmlBanner)
        uxLoad("#flagsHook", uxFlags.init(new Array("method")))
        uxLoad("#currencyHook", uxCurrency.init(new Array("method")))
        if ($("#uxLoading")) {
            $("#uxLoading").html(uxSpinner)
            var toUxLoading = setTimeout(function () {
                clearTimeout(toUxLoading)
                $("#platformName").text(platformName)
                $("#uxLoading").html("")
            }, 5000)
        } else {
            var repeatSpinner = setInterval(function () {
                if ($('#uxLoading').tabs) {
                    clearInterval(repeatSpinner)
                    $("#uxLoading").html(uxSpinner)
                    var toSpinner = setTimeout(function () {
                        clearTimeout(toSpinner)
                        $("#platformName").text(platformName)
                        $("#uxLoading").html("")
                    }, 5000)
                }
            }, 10)
        }

        try {
            if ($('body').tabs) {
                $(".tabs").tabs({active: 0, disabled: [1, 2, 3, 4, 5]});
                $(".tabsMedia").tabs({active: 0});
                $(".mmTabs").tabs({active: 0});
            } else {
                var repeatTabs = setInterval(function () {
                    if ($('body').tabs) {
                        clearInterval(repeatTabs)
                        $(".tabs").tabs({active: 0, disabled: [1, 2, 3, 4, 5]});
                        $(".tabsMedia").tabs({active: 0});
                        $(".mmTabs").tabs({active: 0});
                    }
                }, 10)
            }

        } catch (e) {
            alert("INF: Booking Tabs not loading, refresh page, notify support asap")
        }

        try {

            if ($('.tabsVideo') && $('body').tabs) {
                $(".tabsVideo").tabs({active: 0});
            } else {
                var repeatTabsVideo = setInterval(function () {
                    if ($('.tabsVideo') && $('body').tabs) {
                        clearInterval(repeatTabsVideo)
                        $(".tabsVideo").tabs({active: 0});
                    }
                }, 10)
            }

        } catch (e) {
            alert("INF: Tabs video not loading, refresh page, notify support asap")
        }


        try {
            if ($('body').DataTable) {
                $('.display').DataTable();
                $('input.global_filter').on('keyup click', function () {
                    filterGlobal();
                });
                $("#searchTable").html(uxSearchDataTable())
            } else {
                var repeatDt = setInterval(function () {
                    if ($('body').DataTable) {
                        clearInterval(repeatDt)
                        $('.display').DataTable();
                        $('input.global_filter').on('keyup click', function () {
                            filterGlobal();
                        });
                        $("#searchTable").html(uxSearchDataTable())
                    }
                }, 10)
            }
        } catch (errMsg) {
            alert("INF: Browsing table not loading, refresh page, and contact support asap (" + len + ")")
        }


        try {

            if ($('body').slick) {
//				$('.mySlides').slick({slidesToShow: 1, variableWidth: true, centerMode: true, infinite: true, dots: true});
                $('.mySlidesStore').slick(
                    {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        speed: 300,
                        arrows: false,
                        dots: true
                    }
                );
                $('.mySlidesStore, .slick-track').css({"width": "250px", "heigth": "250px"})
//                 $('.mySlidesStore').css({"width": "250px"})
//                 $('.mySlidesStore').addClass("w3-center")

            } else {
                var repeatSlides = setInterval(function () {
                    if ($('body').slick) {
                        clearInterval(repeatSlides)
//						$('.mySlides').slick({slidesToShow: 1, variableWidth: true, centerMode: true, infinite: true, dots: true});
                        $('.mySlidesStore').slick(
                            {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                arrows: false,
                                speed: 300,
                                dots: true
                            }
                        );
                        $('.mySlidesStore, .slick-track').css({"width": "250px", "heigth": "250px"})
                        // $('.mySlidesStore').css({"width": "250px"})
                        // $('.mySlidesStore').addClass("w3-center")

                    }
                }, 10)
            }
        } catch (e) {

        }

        $("#brandingFooter").removeClass("w3-hide").addClass("w3-show")
        $("button").removeClass("w3-hide").addClass("w3-show")

// Updat Cart Meta
        shoppingCartMeta: {
            tmp = accountDetails(accountId).business_profile.name
            $("#clientName").text(tmp)
            tmp = customerGet({"accountId": accountId, "customerId": customerId})
            $("#customerName").text(tmp.name)
            tmp = getTodaysDate();
            $("#loginDate").text(tmp)
        }

        footer:{
//			var footerBlueChips = new widgetFooterBlueChips();
//			uxLoad("#footerBlueChips", footerBlueChips.init())
        }

        $(".display").attr("border-color", "gray")
        $(".display").attr("border-style", "none")

        $(".display").attr("border-color", "gray")
        $(".display").attr("border-style", "none")
//		$(".cart").attr("border-style", "gray")


    }

    if (productShareId !== null)
        scrollToAnchor(productShareId)
});

function scrollToAnchor(aid) {
    var aTag = $("a[id='" + aid + "']");
    aTag = $("a[id='" + aid + "']")
//	aTag.getpostion
//	$('html,body').animate({scrollBottom: aTag.offset().bottom}, 'slow');


    var html = "<br>"
    html += "<i class='fa fa-chevron-right' style='font-size:10px'></i><i class='fa fa-chevron-right'  style='font-size:10px'></i><i class='fa fa-chevron-right' style='font-size:10px'></i>"
    html += "<br>"
    html += "This item has been shared with you "
    html += "&#128516;"
    html += "<br>"
    html += "<i class='fa fa-chevron-right' style='font-size:10px'></i><i class='fa fa-chevron-right'  style='font-size:10px'></i><i class='fa fa-chevron-right' style='font-size:10px'></i>"
    aTag.replaceWith(html)
}

//# sourceURL=stripe_business_init.js


