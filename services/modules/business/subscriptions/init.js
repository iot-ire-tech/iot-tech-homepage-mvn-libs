/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var parsedUrl = new URL(window.location.href);
var clientId = parsedUrl.searchParams.get("clientId");
var accountId = parsedUrl.searchParams.get("accountId");
var customerId = parsedUrl.searchParams.get("customerId");
var ts = new getTodaysDate();
var businessHours = ""
var addSubscriptionReady = false

//
// DEV TESTS - Mock Endpoints use Tokens!!!
//


// API : https://stripe.com/docs/api/charges/create
//
// Test Card Tokens to be applied to source
// tok_visa	Visa
// tok_visa_debit	Visa (debit)


// Test : Platfrom
// /modules/stripe/charge/release/chargeIt.jsp?clientId=117543
// Check Dashboard

// Test : Connect Account
// /modules/stripe/charge/release/chargeIt.jsp?clientId=117543&accountId=acct_1FG0S6L4EJM4TcRu
// Check Dashboard


// Source Types
// card (i.e., credit or debit card)
// a bank account
// a source
// a token
// a connected account.
// Rule If cards, bank accounts, and attached sources—you must also pass the ID of the associated customer.

var numSubscriptions = 0
var numPlans = 0
var numavgCost = 0

var customerRsp = {}

$(window).ready(initSubscriptionService)

// TODO subscription signin - include opt out if recurring is set!

var selectFontsize = "15px"

function initSubscriptionService() {


    checkOnMessages()

    nsEntitiesService.accountId = accountId
    // get subs entities
    nsEntitiesService.modelQuery.mode = "membership";
    nsEntitiesService.modelQuery.accountId = accountId;
    nsEntitiesService.serviceGetType();

    nsSubsService.accountId = accountId
    nsMultimediaService.accountId = accountId
    nsPlansService.accountId = accountId
    nsBizHoursService.uxWidgetListing = new UxBizHourListing()
    nsBizHoursService.accountId = accountId

    tabsInit()
    // Existing Sub Entities
    var to = setInterval(function () {
        clearTimeout(to)

        nsBrandingService.accountId = accountId
        nsBrandingService.brandMe();
        $("#selectAccountsHook").html(widgetAccountList(accountId))

        var html = updateSubscriptions(nsEntitiesService.obj)
        $("#selectSubscriptionHook").html(html)
        // Plans
        $("#selectPlansHook").html(widgetPlans(""))

        $("#planMediaHook").html(widgetPlansDetailVideo())
    }, 1000)

    customerRsp = customerGet({"accountId": accountId, "customerId": customerId})

    // Client Feature
    // cancel subscription service.....
    if (false)
        $("#btnMgtSubscriptions").attr("disable", true)
    else
        $("#btnMgtSubscriptions").attr("disable", false)

//	widgetPlansDetail("")
//	$("#selectPlanDetailHook").html(widgetPlansDetail(planInit))
//	$("#selectSubscription").css({"min-height": "300px"})
//	$("#selectPlans").css({"min-height": "300px"})
//	$("#fldPlanDetail").css({"min-height": "300px"})


}


//# sourceURL=customers_subscription_init.js


