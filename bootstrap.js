/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//
//var contextPath = "/iot-base"
//contextPath = ""

// Version of UX content to release!!!
//var root = location.origin + contextPath;
// Context Path is a variable in the env.js - bootstrap is INIT Process


//var startupSubscription = []

// CORE INIT, then applicatientitieson init - env.

var uxSpinner = "<div class=\"ui segment\">"
uxSpinner = ""
uxSpinner += "<div class=\"ui active inverted dimmer\">"
uxSpinner += "<div class=\"ui indeterminate massive text loader\">"
uxSpinner += "<br>"
uxSpinner += "<br>"
uxSpinner += "Loading new experiences..."
uxSpinner += "<br>"
uxSpinner += "<br>"
uxSpinner += "</div>"
uxSpinner += "</div>"


function addTestData() {
//	$("head").append('<script src="../../../../../testdata.js"><\/script>');

    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
    $("head").append('<script src="/services/testFunctions.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testMaps.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataAccountsHead.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataAccountsBiz.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataAccountsIndividual.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataAccountsBank.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataAccountsToc.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataBillingCoupon.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataTokenCard.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataTokenBank.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataSourcesBank.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataSourcesCards.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataCustomer.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataCustomerCards.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataCustomerBanks.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataChargesDirect.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataChargesDestination.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataChargesRefunds.js"><\/script>');
//	$("head").append('<script src="/services/modules/stripe/testdataChargesApplicationFee.js"><\/script>');


    $("head").append('<script src="/services/modules/stripe/testdataBillingProducts.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataBillingPlans.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataBillingSubscriptions.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataBillingCreditNotes.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataCardsAccount.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataBankAccountExt.js"><\/script>');
    $("head").append('<script src="/services/modules/stripe/testdataWorkflow.js"><\/script>');
    // Load Model
//	$("head").append('<script src="/services/testcaseHeader.js"><\/script>');
}

function addData() {
/// $("head").append("<script src=" + root +  '/services/authentication/init.js></script>');

    $("head").append("<script src=" + root +  '/services/testFunctions.js><\/script>');
    $("head").append("<script src=" + root +  '/services/modules/stripe/testMaps.js><\/script>');
    $("head").append("<script src=" + root +  '/services/modules/stripe/funcs.js><\/script>');
}

function addTestLib() {

    if (location.origin.toString().includes("local")) {
        $("head").append('<script src=https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js><\/script>');
        $("head").append('<script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js><\/script>');
        $("head").append('<script src=https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js><\/script>');
//		$("head").append("<script> mocha.setup('bdd'); mocha.globals(['jQuery']); let assert = chai.assert;</script>")
    }
}

function bizHoursModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/events/screen.js?v=' + ts + '><\/script>');

// Instaniate widgets
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/init.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/main.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/validation.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/businessHours/logic.js?v=' + ts + '><\/script>');

}

function tbbModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/ux/uxAssetTbbWidgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/ux/uxTbbDialog.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/init.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/timebasedbilling/utils.js?v=' + ts + '><\/script>');
}


function pocModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/ux/proxy.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pocmgt/service.js?v=' + ts + '><\/script>');
}


function capacityModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/ux/uxCapacityWidgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/ux/uxCapacityWidget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacitymgt/model.js?v=' + ts + '><\/script>');
    capacityAlertingModule(ts)
}

function capacityAlertingModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/ux/uxCapacityAlertingWidgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/ux/uxCapacityAlertingWidget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/capacityalertingmgt/model.js?v=' + ts + '><\/script>');
}

//function checkoutModule(ts) {
function usageModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/usage/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/usage/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/usage/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/usage/service.js?v=' + ts + '><\/script>');


}

function checkoutModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/checkout/model.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/checkout/ux/uxShoppingCartWidget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/ux/uxShoppingCartWidgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/ux/uxChargeConfirmationWidget.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/checkout/utils.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/checkout/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/checkout/checkoutStockAlerter.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/checkoutAnalytics.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/checkoutBarCodeGen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/checkout/checkoutSms.js?v=' + ts + '><\/script>');


    smsModule(ts)
}

function bookingReservationModule(ts) {

//	$("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js><\/script>');
    $("head").append('<script src=' + root +  '/lib/jquery/datetimepicker-master/build/jquery.datetimepicker.full.min.js')

    $("head").append('<script src=' + root +  '/services/modules/api/booking/ux/uxBookingReservationWidgetListing.js?v=' + ts + '> < \/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/booking/ux/uxBookingReservationWidget.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/booking/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/booking/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/booking/service.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/api/booking/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/booking/init.js?v=' + ts + '><\/script>');

}


function mmModule(ts) {
// Widgets
    $("head").append('<script src=/lib/jquery/preload/jquery.preload.min.js ><\/script>')

// Init
// controller
    $("head").append('<script src=' + root +  '/services/modules/api/mm/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/mm/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/mm/ux/widgetListing.js?v=' + ts + '><\/script>');
// service
    $("head").append('<script src=' + root +  '/services/modules/api/mm/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/mm/utils.js?v=' + ts + '><\/script>');


}

function followMeModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/ux/uxFollowMeWidgetListing.js?v=' + ts + '> < \/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/ux/uxFollowMeWidget.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/init.js?v=' + ts + '> < \/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/followme/service.js?v=' + ts + '><\/script>');

// Last
}

function likeMeModule(ts) {
// Widgets

// Init
    $("head").append('<script src=' + root +  '/services/modules/api/social/likeme/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/likeme/init.js?v=' + ts + '> < \/script>');

// controller
    $("head").append('<script src=' + root +  '/services/modules/api/social/likeme/events/screen.js?v=' + ts + '><\/script>');
// service
    $("head").append('<script src=' + root +  '/services/modules/api/social/likeme/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/likeme/utils.js?v=' + ts + '><\/script>');

}

function shareModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/social/share/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/init.js?v=' + ts + '> < \/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/social/share/ux/uxButtonShare.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/onchangeShareFacebook.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/onchangeShareLinkedIn.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/onchangeShareTwitter.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/onchangeShareEmail.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/api/social/share/events/onchangeShareFacebookLive.js?v=' + ts + '><\/script>');


    $("head").append('<script src=' + root +  '/services/modules/api/social/share/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/share/service.js?v=' + ts + '><\/script>');

}

function contactMeModule(ts) {
// Widgets
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/ux/widgets.js?v=' + ts + '><\/script>');

// Init
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/init.js?v=' + ts + '> < \/script>');

// controller
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/events/screen.js?v=' + ts + '><\/script>');
// service
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/social/contactme/utils.js?v=' + ts + '><\/script>');

}


function socialModule(ts) {

    followMeModule(ts)
    likeMeModule(ts)
    shareModule(ts)
    contactMeModule(ts)
    mmModule(ts)

}

function bookingModule(ts) {


    $("head").append("<link rel=stylesheet href=" + root +  '/lib/jquery/datetimepicker-master/jquery.datetimepicker.css>');
    $("head").append('<script src=' + root +  '/lib/jquery/datetimepicker-master/build/jquery.datetimepicker.full.min.js><\/script>')

    // $("head").append('<script src=' + root +  '/services/modules/business/booking/services/makeBooking.js?v=' + ts + '><\/script>');


    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingRepeat.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingAlerts.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingEvent.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingComms.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingReminder.js?v=' + ts + '><\/script>');
    // //events
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/onchangeBookingSeating.js?v=' + ts + '><\/script>');
    //
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/ux/uxBookingWidget.js?v=' + ts + '><\/script>');
    //
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/billingNrating.js?v=' + ts + '><\/script>');
    // $("head").append('<script src=' + root +  '/services/modules/business/booking/data/model.js?v=' + ts + '><\/script>');

    bookingReservationModule(ts)
}


function coreModules(ts) {

    $("head").append('<script src=' + root +  '/services/nw/httpHandler.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/utils/time/Time.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/utils/time/Numbers.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/stripe/functions.js?v=' + ts + '><\/script>');
}

function frameworksModule(ts) {
    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
    $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
    $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
    $("head").append("<link rel=stylesheet href=" + root +  '/services/modules/business/slicky.css>');
    $("head").append("<link rel=stylesheet href=" + root +  '/css/sticky-elements.css>');

    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
    $("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.js><\/script>');
    $("head").append("<script src=//cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js><\/script>");
    $("head").append('<script src=https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js><\/script>')
    $("head").append('<script src=/lib/jquery/preload/jquery.preload.min.js ><\/script>')

    //front end only
    $("head").append("<script src=//connect.facebook.net/en_US/sdk.js><\/script>");
}


function entitiesModule(ts) {
    // coreModules(ts)

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/service-core.js?v=' + ts + '><\/script>');

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/entities/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/entities/ux/widgetListing.js?v=' + ts + '><\/script>');

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/entities/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/entities/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/entities/service.js?v=' + ts + '><\/script>');
    revenueModule(ts)
}


function pnpModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/pnp/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pnp/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pnp/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pnp/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/pnp/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pnp/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/pnp/service.js?v=' + ts + '><\/script>');
}

function smsModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/sms/model.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/sms/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/sms/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/sms/init.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/sms/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/sms/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/sms/service.js?v=' + ts + '><\/script>');
}

function seatingModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/seating/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/seating/ux/widgetListing.js?v=' + ts + '><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/seating/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/seating/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/seating/service.js?v=' + ts + '><\/script>');
}

function fixturesModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/validation.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/fixtures/events/screen.js?v=' + ts + '><\/script>');
}

function commsModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/comms/validation.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/comms/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/comms/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/comms/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/comms/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/comms/events/screen.js?v=' + ts + '><\/script>');
}

function messageingModule(ts) {


    $("head").append('<script src=' + root +  '/services/modules/api/messaging/validation.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/messaging/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/messaging/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/messaging/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/messaging/service.js?v=' + ts + '><\/script>');

}

function revenueModule(ts) {
    billingMembersModelModule(ts)


    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/business/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/business/service.js?v=' + ts + '><\/script>');

    businessModule(ts)
}

function businessModule(ts) {

    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/revenue/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/revenue/service.js?v=' + ts + '><\/script>');

    legalModule(ts)
}

function legalModule(ts) {

    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/legal/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/legal/service.js?v=' + ts + '><\/script>');

}

function brandingModule(ts) {
    menuBarModule(ts)
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/branding/init.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/branding/service.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/branding/events/screen.js?v=' + ts + '><\/script>');

}

function menuBarModule(ts) {
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/clientSubscriptionSignupMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/dashboardMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\"  src=" + root +  '/ux/menu/provisioningMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/businessMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/covidMenuWidget.js?v=' + ts + '></script>');
    $("head").append("<script type=\"application/javascript\" src=" + root +  '/ux/menu/screen.js?v=' + ts + '></script>');

}

function webinarModule(ts) {

    // $("head").append('<script src=' + root +  '/services/nw/httpHandler.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/webinar/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/webinar/events/screen.js?v=' + ts + '><\/script>');

}

function scheduleModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/schedule/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/schedule/events/screen.js?v=' + ts + '><\/script>');

}

function metaModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/meta/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/meta/events/screen.js?v=' + ts + '><\/script>');

}


function userAccountModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/useraccount/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/useraccount/events/screen.js?v=' + ts + '><\/script>');

}

function couponsModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/coupons/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/coupons/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/coupons/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/coupons/events/screen.js?v=' + ts + '><\/script>');

}

function plansModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/plans/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/utils.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/validation.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/plans/init.js?v=' + ts + '><\/script>');

}

function subsModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/subs/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/subs/ux/widgetListing.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/subs/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/subs/events/screen.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/subs/utils.js?v=' + ts + '><\/script>');

}

function geoModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/geo/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/geo/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/geo/events/screen.js?v=' + ts + '><\/script>');

}

function chartingModule(ts) {

    $("head").append('<link rel=stylesheet href=' + root +  '/services/modules/api/charting/ux/rotate.css>;');
    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
    $("head").append('<script  type = "text/javascript" src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
    $("head").append('<script src=//www.google.com/jsapi><\/script>');
    $("head").append('<script  type = "text/javascript" src=//www.gstatic.com/charts/loader.js><\/script>');

    $("head").append('<script src=' + root +  '/services/modules/api/charting/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/charting/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/charting/events/screen.js?v=' + ts + '><\/script>');

}

function customerModule(ts) {

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/00-customer/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/00-customer/service.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/00-customer/events/screen.js?v=' + ts + '><\/script>');

}

function authenticationModule(ts) {

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/01-authentication/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/01-authentication/service.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/01-authentication/events/screen.js?v=' + ts + '><\/script>');

}

function covidModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/02-covid/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/02-covid/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/02-covid/events/screen.js?v=' + ts + '><\/script>');

}

function contactUsModule(ts) {


    $("head").append("<script src=" + root +  '/services/modules/api/03-contactus/init.js?v=' + ts + '></script>');
    $("head").append('<script src=' + root +  '/services/modules/api/03-contactus/ux/widget.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/03-contactus/service.js?v=' + ts + '><\/script>');
    $("head").append('<script src=' + root +  '/services/modules/api/03-contactus/events/screen.js?v=' + ts + '><\/script>');

}

function billingMembersModelModule(ts) {

    // $("head").append("<script src=" + root +  '/services/modules/api/04-billingmodel/init.js?v=' + ts + '></script>');
    $("head").append('<script  type=\"application/javascript\"  src=' + root +  '/services/modules/api/04-billing-members-model/service.js?v=' + ts + '><\/script>');
    billingModelModule(ts)
}

function billingModelModule(ts) {

    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/api/05-billing-model/service.js?v=' + ts + '><\/script>');

}

function optionsMembersModelModule(ts) {

    $("head").append('<script src=' + root +  '/services/modules/api/06-options-members-model/service.js?v=' + ts + '><\/script>');

}

function primaryAccountMembersModule(ts) {

    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/08-primary-account-members/init.js?v=' + ts + '><\/script>');
    $("head").append('<script type=\"application/javascript\" src=' + root +  '/services/modules/api/08-primary-account-members/service.js?v=' + ts + '><\/script>');

}


function utilsModule(ts) {

    $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/utils/browser/Browser.js?v=' + ts + '><\/script>');

}


var root = "https://cdn.jsdelivr.net/gh/mybusinesspal/iot-tech-homepage-mvn-libs@latest";
var contextPath = ""
var ts = new Date().getMilliseconds();
var pageloadDelay = 1000;

function bootStrap(jspFile, cdn) {

    if (cdn.toString().length > 0) {
        root = cdn;
    }
// deploying to GREEN zone or PROD, must change accordingly


// Local Test
    if (location.origin.toString().includes("local")) {
         contextPath = ""
    } else {
         contextPath = "/green"
        contextPath = ""
    }

    // var root = location.origin + contextPath;
    root += contextPath;
    var urlHead = root + "/head.html?v=" + ts;
    switch (jspFile) {


        case "endUserAccountStatusReleased":

            urlBody = root + "/services/modules/stripe/connectaccount/accountstatus/ux/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append('<script src=' + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');


                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;

        case "analyticsReleased":
            urlBody = root + "/services/analytics/ux/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/init.js?v=' + ts + '></script>');

                    $("head").append("<script src=" + root +  '/services/analytics/chartIt.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/processCustomers.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/processGeo.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/processCustomers.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/processGrowthnDev.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/analytics/processTrending.js?v=' + ts + '></script>');


                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;
        case "analyticsSecurityReleased":
            urlBody = root + "/services/modules/business/analytics/security/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                entitiesModule(ts)
                chartingModule(ts)
                authenticationModule(ts)
                customerModule(ts)
                menuBarModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/business/analytics/security/init.js?v=' + ts + '></script>');
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;
        case "teamReleased":
            urlBody = root + "/services/modules/business/team/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                entitiesModule(ts)
                chartingModule(ts)
                authenticationModule(ts)
                customerModule(ts)
                menuBarModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/business/analytics/security/init.js?v=' + ts + '></script>');
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break


        case "analyticsRevenueReleased":
            urlBody = root + "/services/modules/business/analytics/revenue/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                entitiesModule(ts)
                checkoutModule(ts)
                chartingModule(ts)
                bizHoursModule(ts)
                menuBarModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/business/analytics/revenue/init.js?v=' + ts + '></script>');
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;
        case "analyticsCustomerReleased":
            urlBody = root + "/services/modules/business/analytics/customer/ux/body.html?v=" + ts;
            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                entitiesModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                chartingModule(ts)
                menuBarModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/business/analytics/customer/init.js?v=' + ts + '></script>');
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;


        case "messageReleased":
            urlBody = root + "/services/modules/api/messaging/ux/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    entitiesModule(ts)
                    messageingModule(ts)
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;


        case "brandingReleased":
            urlBody = root + "/services/modules/api/branding/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/mediahub/media.js?v=' + ts + '></script>');
                $("head").append("<script  type=\"application/javascript\" src=" + root +  '/ux/menu/provisioningMenuWidget.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/ux/menu/screen.js?v=' + ts + '></script>');

                entitiesModule(ts)
                mmModule(ts)
                brandingModule(ts)
                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
            });
            break;
        // Internal


        case "adminSubscriptionReleased":
            urlBody = root + "/services/modules/stripe/billing/subscription/ux/body.html?v=" + ts;

            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already

                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/init.js?v=' + ts + '></script>');


                    entitiesModule(ts)
                    optionsMembersModelModule(ts)
                    menuBarModule(ts)

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;


        case "adminSubscriptionMembershipBuilderReleased":

            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already

                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/ux/widgets.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/services.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/init.js?v=' + ts + '></script>');

                    urlBody = root + "/services/modules/stripe/billing/subscription/membershipbuilder/ux/body.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("body").html(response);
                    });
                });
            });
            break;

        case "endUserLoginReleased":
            urlBody = root + "/services/modules/stripe/customer/login/ux/body_customers.html?v=" + ts;

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);


                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');
//				$("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js><\/script>');

                entitiesModule(ts)
                brandingModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

// CDN
                $("head").append("<script  type=\"application/javascript\" src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append("<script  type=\"application/javascript\" src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script  type=\"application/javascript\" src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');

// Local To App
                $("head").append("<script  type=application/javascript src=services/modules/stripe/customer/login/model.js?v=" + ts + "></script>");
                $("head").append("<script  type=application/javascript src=services/modules/stripe/customer/login/controller.js?v=" + ts + '></script>');
                $("head").append("<script  type=application/javascript src=services/modules/stripe/customer/login/onchange.js?v=" + ts + '></script>');
                $("head").append("<script  type=application/javascript src=services/modules/stripe/customer/login/init.js?v=" + ts + '></script>');


            });
            $.get(urlBody, function (response) {
                $("body").html(response);

                var intervalId = setTimeout(function () {
                    clearTimeout(intervalId);
                    $("#content").attr("style", "display:show");
                    $("#spinner").attr("style", "display:none");
                }, pageloadDelay);
            });

            break;


        case "endUserLoginAdminReleased":

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');
//				$("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                entitiesModule(ts)
                brandingModule(ts)
                socialModule(ts)
                usageModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/model.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/init.js?v=' + ts + '></script>');


                urlBody = root + "/services/modules/stripe/customer/login/ux/body_provisioning.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });

            break;

        case "dashboardBusinessGrowthReleased":

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');
//				$("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                entitiesModule(ts)
                brandingModule(ts)
                socialModule(ts)
                usageModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/model.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/init.js?v=' + ts + '></script>');


                urlBody = root + "/services/modules/stripe/customer/login/ux/body_provisioning_businessgrowth.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });

            break

        case "dashboardBusinessAnalyticsReleased":

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');
//				$("head").append('<script src=//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                entitiesModule(ts)
                brandingModule(ts)
                socialModule(ts)
                usageModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/model.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/login/init.js?v=' + ts + '></script>');


                urlBody = root + "/services/modules/stripe/customer/login/ux/body_provisioning_analytics.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });

            break

        case "onboardingReleased":

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');

                entitiesModule(ts)
                brandingModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');

                $("head").append("<script src=" + root +  '/services/modules/business/onboarding/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/onboarding/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/onboarding/init.js?v=' + ts + '></script>');

            });

            urlBody = root + "/services/modules/business/onboarding/ux/body.html?v=" + ts;
            $.get(urlBody, function (response) {
                var intervalId = setTimeout(function () {
                    clearTimeout(intervalId);
                    $("body").html(response);
                    $("#content").attr("style", "display:show");
                    $("#spinner").attr("style", "display:none");
                }, pageloadDelay);
            });

            break;

        case "dashboardReleased":

            $("#content").attr("style", "display:none");

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css>");
                $("head").append("<link rel=stylesheet href=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css>");
                $("head").append('<script src=//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js><\/script>');

                entitiesModule(ts)
                brandingModule(ts)
                customerModule(ts)
                authenticationModule(ts)
                menuBarModule(ts)
                utilsModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');

                $("head").append("<script src=" + root +  '/services/modules/business/dashboard/init.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/dashboard/onchange.js?v=' + ts + '></script>');


                urlBody = root + "/services/modules/business/dashboard/ux/body.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });
            break;

        case "passwordResetFirstFactorReleased":

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                // Model and Servicers are in Service head already
//					addData()
                entitiesModule(ts)
                customerModule(ts)
                brandingModule(ts)
                authenticationModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/init.js?v=' + ts + '></script>');

                urlBody = root + "/services/modules/stripe/customer/reset/ux/firstfactor.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;

        case "passwordResetCommitReleased":


            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                // Model and Servicers are in Service head already
//					addData()
                entitiesModule(ts)
                customerModule(ts)
                brandingModule(ts)
                authenticationModule(ts)

                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/customer/reset/init.js?v=' + ts + '></script>');


                urlBody = root + "/services/modules/stripe/customer/reset/ux/passwordchange.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;

        case "moduleExternalAccountCardReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/extCardAccount/ux/bodyBiz.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/uxExternalAccountManagment.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/init.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/model.js?v=' + ts + '></script>');
            });

            $.get(urlBody, function (response) {
                $("body").html(response);
            });
            break;

        case "moduleExternalAccountCardAdminReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/extCardAccount/ux/bodyAdmin.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/uxExternalAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extCardAccount/model.js?v=' + ts + '></script>');
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
            });
            break;


        case "moduleClientPaymentsReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/extBankAccount/ux/bodyBiz.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/uxExternalAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                    $("head").append('<script src=' + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');


                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/model.js?v=' + ts + '></script>');
                });


                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
            });
            break;
        case "moduleExternalAccountBankAdmin":
            urlBody = root + "/services/modules/stripe/connectaccount/extBankAccount/ux/bodyAdmin.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/uxExternalAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');


                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/extBankAccount/model.js?v=' + ts + '></script>');
                });


                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
            });
            break;

        case "endUserAccountBankSepaReleased":
            urlBody = root + "/services/modules/stripe/sources/banksepa/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addData()
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;

        case "endUserConnectAccountHeadRelease":
            urlBody = root + "/services/modules/stripe/connectaccount/head/ux/body.html?v=" + ts;

            $(document).ready(function () {
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=" + root +  "/services/modules/stripe/connectaccount/head/ux/css.css>");
//					addData()
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/accountstatus/service.js?v=' + ts + '></script>');

                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/head/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/head/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/head/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/head/model.js?v=' + ts + '></script>');

                    entitiesModule(ts)
                    customerModule(ts)
                    billingMembersModelModule(ts)
                    optionsMembersModelModule(ts)
                    primaryAccountMembersModule(ts)

                    $.get(urlBody, function (response) {
                        $("body").html(response);
                        $("#content").attr("style", "display:none");
                        $("#spinner").attr("style", "display:show");
                    });
                });
            });
            break;
        case "homepageReleasedx":
            urlBody = root + "/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=" + root +  "/css/mobile/mobile.css>");
                    // To handle authentication
                    $("head").append("<script src=" + root +  '/services/authentication/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/authentication/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/authentication/onchange.js?v=' + ts + '></script>');
                    // To trigger account page
                    $("head").append("<script src=" + root +  '/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/onchange.js?v=' + ts + '></script>');


//					var intervalId = setTimeout(function () {
//						clearTimeout(intervalId);
//						$("#content").attr("style", "display:show");
//						$("#spinner").attr("style", "display:none");
//					}, pageloadDelay);

                    $.get(urlBody, function (response) {
                        $("body").html(response);
                    });
                });
            });
            break;
        case "adminProductPortalReleased":

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);

                frameworksModule(ts)

                $("head").append("<link rel=stylesheet href=" + root +  "/services/modules/stripe/billing/product/ux/css.css>");
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script  type="application/javascript"   src=' + root +  '/ux/menu/provisioningMenuWidget.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');
                // Ux
                //Function

                entitiesModule(ts)
                capacityModule(ts)
                bizHoursModule(ts)
                tbbModule(ts)
                mmModule(ts)
                pocModule(ts)
                pnpModule(ts)
                seatingModule(ts)
                fixturesModule(ts)
                messageingModule(ts)
                webinarModule(ts)
                scheduleModule(ts)
                metaModule(ts)
                userAccountModule(ts)
                // stripe addtions
                couponsModule(ts)
                plansModule(ts)
                subsModule(ts)


                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetVbbWidgetListing.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxPreviewWidget.js?v=' + ts + '><\/script>');

                // $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/metadataFunction.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/controller.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangefuncs.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangeTabs.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangeUpstream.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangePreview.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangeWidgets.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchange.js?v=' + ts + '><\/script>');
// Membership
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/ux/widgets.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/services.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/model.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/onchange.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/stripe/billing/subscription/membershipbuilder/init.js?v=' + ts + '></script>');


// Main Class

                urlBody = root + "/services/modules/stripe/billing/product/ux/portal.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);

                    urlBody = root + "/services/modules/stripe/billing/product/ux/assets.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#assets").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/assetresale.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#resale").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/activities.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#activities").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/events.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#events").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/store.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#store").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/membership.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#membership").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/bulkAssets.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#bulkAssets").html(response);
                    });

                    urlBody = root + "/services/modules/stripe/billing/product/ux/videoHub.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#videoHub").html(response);
                    });
                    urlBody = root + "/services/modules/stripe/billing/product/ux/webinars.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#webinars").html(response);
                    });

                    urlBody = root + "/services/modules/business/tracing/ux/backend.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#covid").html(response);
                    });

                    urlBody = root + "/services/modules/api/messaging/ux/body.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#messaging").html(response);
                    });

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/init.js?v=' + ts + '><\/script>');
                    init();


                });


            });
            break;
        case "adminProductPortalStoreReleased":
            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js?v=' + ts + '><\/script>');
                $("head").append("<script src=//cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '><\/script>");

                $("head").append("<link rel=stylesheet href=" + root +  "/services/modules/stripe/billing/product/ux/css.css>");
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                // Ux
                tbbModule(ts)
                bizHoursModule(ts)
                pnpModule(ts)

                //Function
                $("head").append('<script src=' + root +  '/services/modules/business/booking/capacityManagement.js?v=' + ts + '><\/script>');
                // $("head").append('<script src=' + root +  '/services/modules/business/booking/billingNrating.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetVbbWidgetListing.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxBusinessHours.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxPreviewWidget.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/metadataFunction.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/controller.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangefuncs.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchange.js?v=' + ts + '><\/script>');
// Membership

// Main Class

                urlBody = root + "/services/modules/stripe/billing/product/ux/portal_store.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);

                    urlBody = root + "/services/modules/stripe/billing/product/ux/store.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("#store").html(response);
                    });
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/init.js?v=' + ts + '><\/script>');
                    init();
                });


            });
            break;
        case "adminProductAssetReleased":
            urlBody = root + "/services/modules/stripe/billing/product/ux/assets.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js?v=' + ts + '><\/script>');
                    $("head").append("<script src=//cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '><\/script>");
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    // Ux
                    //Function


                    tbbModule(ts)
                    pnpModule(ts)

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetVbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxBusinessHours.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');
                    // $("head").append('<script src=' + root +  '/services/modules/business/booking/billingNrating.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/business/booking/capacityManagement.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/metadataFunction.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangefuncs.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchange.js?v=' + ts + '><\/script>');

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;
        case "adminProductEventsReleased":
            urlBody = root + "/services/modules/stripe/billing/product/ux/events.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js?v=' + ts + '><\/script>');
                    $("head").append("<script src=//cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '><\/script>");
                    // Model and Servicers are in Service head already


                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    // Ux
                    //Function
                    $("head").append('<script src=' + root +  '/services/modules/business/booking/capacityManagement.js?v=' + ts + '><\/script>');
                    // $("head").append('<script src=' + root +  '/services/modules/business/booking/billingNrating.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetVbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxBusinessHours.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');


                    tbbModule(ts)

                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/metadataFunction.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangefuncs.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchange.js?v=' + ts + '><\/script>');

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;
        case "adminProductActivitiesReleased":
            urlBody = root + "/services/modules/stripe/billing/product/ux/activities.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js?v=' + ts + '><\/script>');
                    $("head").append("<script src=//cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '><\/script>");


                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    // Ux
                    $("head").append('<script src=' + root +  '/services/modules/business/booking/capacityManagement.js?v=' + ts + '><\/script>');
                    // $("head").append('<script src=' + root +  '/services/modules/business/booking/billingNrating.js?v=' + ts + '><\/script>');


                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetSbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxAssetVbbWidgetListing.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxBusinessHours.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/ux/uxRevenueVolumeBaseOfferingDialog.js?v=' + ts + '><\/script>');

                    tbbModule(ts)
                    checkoutModule(ts)


                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/metadataFunction.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/utils.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchangefuncs.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/stripe/billing/product/onchange.js?v=' + ts + '><\/script>');

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;
        case "activitiesReleased":


            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                // Model and Servicers are in Service head already
//					addData()
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                entitiesModule(ts)
                commsModule(ts)
                metaModule(ts)
                frameworksModule(ts)
                capacityModule(ts)
                bookingModule(ts)
                socialModule(ts)
                tbbModule(ts)
                bizHoursModule(ts)
                usageModule(ts)
                checkoutModule(ts)
                pocModule(ts)
                usageModule(ts)
                messageingModule(ts)
                brandingModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)


                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

// Parent
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetMeta.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');
// Module
                $("head").append('<script src=' + root +  '/services/modules/business/activity/ux/uxActivityBrowser.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/activity/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/activity/controller.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/activity/init.js?v=' + ts + '><\/script>');

                urlBody = root + "/services/modules/business/activity/ux/body.html?v=" + ts;
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("head").append('<script src=' + root +  '/services/modules/business/uxFlags.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/business/uxFooterBlueChips.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/business/init.js?v=' + ts + '><\/script>');
                    initActivity(ts)
                });


            });

            break;
        case "eventsReleased":

            urlBody = root + "/services/modules/business/events/ux/body.html?v=" + ts;


            $.get(urlHead, function (response) {

                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                // Model and Servicers are in Service head already
//					addData()
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

// contains core, must be first..
                commsModule(ts)
                entitiesModule(ts)
                bookingModule(ts)
                bizHoursModule(ts)
                capacityModule(ts)
                checkoutModule(ts)
                frameworksModule(ts)
                pocModule(ts)
                socialModule(ts)
                tbbModule(ts)
                usageModule(ts)
                seatingModule(ts)
                fixturesModule(ts)
                commsModule(ts)
                messageingModule(ts)
                brandingModule(ts)
                pnpModule(ts)
                metaModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/business/events/ux/uxEventsBrowser.js?v=' + ts + '><\/script>');
//					$("head").append('<script src="../ux/functionsShop.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetMeta.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');
// Module
                $("head").append('<script src=' + root +  '/services/modules/business/events/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/events/init.js?v=' + ts + '><\/script>');


                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("head").append('<script src=' + root +  '/services/modules/business/uxFlags.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/business/uxFooterBlueChips.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/modules/business/init.js?v=' + ts + '><\/script>');
                    initEvents(ts)
                });

            });
            break;

        case "webinarReleased":
            urlBody = root + "/services/modules/business/webinars/ux/body.html?v=" + ts;

            $(".display").attr("border-color", "gray")
            $(".display").attr("border-style", "none")
            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);


                entitiesModule(ts)
                // bookingModule(ts)
                bizHoursModule(ts)
                capacityModule(ts)
                checkoutModule(ts)
                frameworksModule(ts)
                pocModule(ts)
                socialModule(ts)
                tbbModule(ts)
                usageModule(ts)
                seatingModule(ts)
                fixturesModule(ts)
                commsModule(ts)
                messageingModule(ts)
                brandingModule(ts)
                webinarModule(ts)
                scheduleModule(ts)
                metaModule(ts)
                userAccountModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)

                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
// External Module
// Parent UX Builder
//					$("head").append('<script src="../ux/functionsShop.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetMeta.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/business/uxFlags.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxFooterBlueChips.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/business/onchange.js?v=' + ts + '><\/script>');

// Module
                $("head").append("<link rel=stylesheet href=" + root +  '/services/modules/business/webinars/ux/videoHub.css>');
                $("head").append('<script src=' + root +  '/services/modules/business/webinars/ux/uxWebinarBrowser.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/webinars/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/webinars/init.js?v=' + ts + '><\/script>');
            });


            $.get(urlBody, function (response) {
                $("body").html(response);
                $("head").append('<script src=' + root +  '/services/modules/business/init.js?v=' + ts + '><\/script>');
            });

            break;
        case "videoReleased":
            var rootFolder = "videohub"
            urlBody = root + "/services/modules/business/" + rootFolder + "/ux/body.html?v=" + ts;

            $(".display").attr("border-color", "gray")
            $(".display").attr("border-style", "none")
            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);

                entitiesModule(ts)
                // bookingModule(ts)
                bizHoursModule(ts)
                capacityModule(ts)
                checkoutModule(ts)
                frameworksModule(ts)
                pocModule(ts)
                socialModule(ts)
                tbbModule(ts)
                usageModule(ts)
                seatingModule(ts)
                fixturesModule(ts)
                commsModule(ts)
                messageingModule(ts)
                brandingModule(ts)
                metaModule(ts)
                authenticationModule(ts)
                primaryAccountMembersModule(ts)


                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
// External Module
                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

// Parent UX Builder
                $("head").append('<script src=' + root +  '/services/modules/business/videohub/ux/uxVideoBrowser.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetMeta.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/business/uxFlags.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxFooterBlueChips.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/business/onchange.js?v=' + ts + '><\/script>');

// Module
                $("head").append("<link rel=stylesheet href=" + root +  '/services/modules/business/videohub/ux/videoHub.css>');
                $("head").append('<script src=' + root +  '/services/modules/business/videohub/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/videohub/init.js?v=' + ts + '><\/script>');
            });


            $.get(urlBody, function (response) {
                $("body").html(response);
                $("head").append('<script src=' + root +  '/services/modules/business/init.js?v=' + ts + '><\/script>');
            });

            break;

        case "shopReleased":
            urlBody = root + "/services/modules/business/store/ux/body.html?v=" + ts;


            $(".display").attr("border-color", "gray")
            $(".display").attr("border-style", "none")
            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                // Model and Servicers are in Service head already

                entitiesModule(ts)
                frameworksModule()
                usageModule(ts)
                checkoutModule(ts)
                capacityModule(ts)
//				bookingModule(ts)
                socialModule(ts)
                bizHoursModule(ts)
                usageModule(ts)
                pocModule(ts)
                pnpModule(ts)
                entitiesModule(ts)
                messageingModule(ts)
                brandingModule(ts)
                primaryAccountMembersModule(ts)

                // tbbModule(ts)
                // commsModule(ts)
                metaModule(ts)
                authenticationModule(ts)

                $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
// External Module

// Parent UX Builder
                $("head").append('<script src=' + root +  '/services/modules/business/store/ux/uxShopBrowser.js?v=' + ts + '><\/script>');
//					$("head").append('<script src="../ux/functionsShop.js?v=' + ts + '><\/script>');

                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetMeta.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/order/functionsOrder.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/search/functionBrowserSearch.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxWidgetSlideShow.js?v=' + ts + '><\/script>');


                $("head").append('<script src=' + root +  '/services/modules/business/uxFlags.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/uxFooterBlueChips.js?v=' + ts + '><\/script>');


// Module
                $("head").append('<script src=' + root +  '/services/modules/business/store/model.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/services/modules/business/store/init.js?v=' + ts + '><\/script>');
            });

            $.get(urlBody, function (response) {
                $("body").html(response);
                $("head").append('<script src=' + root +  '/services/modules/business/init.js?v=' + ts + '><\/script>');
            });

            break;


        case "covidReleased":
            urlBody = root + "/services/modules/business/tracing/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script src=' + root +  '/ux/menu/covidMenuWidget.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');

                frameworksModule(ts)
                entitiesModule(ts)
                messageingModule(ts)
                pocModule(ts)
                brandingModule(ts)
                authenticationModule(ts)
                covidModule(ts)

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("head").append("<script src=" + root +  '/services/modules/business/tracing/init.js?v=' + ts + '></script>');
                });

            });
            break
        case "covidAdminReleased":
            urlBody = root + "/services/modules/business/tracing/ux/backend.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                entitiesModule(ts)
                brandingModule(ts)
                authenticationModule(ts)
                covidModule(ts)
                pocModule(ts)
                messageingModule(ts)

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("head").append("<script src=" + root +  '/services/modules/business/tracing/init.js?v=' + ts + '></script>');
                });

            });
            break

        case "contactUsReleased":
            urlBody = root + "/services/modules/api/03-contactus/ux/body.html?v=" + ts;

            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                $("head").append('<script  type="application/javascript"    src=' + root +  '/ux/menu/provisioningMenuWidget.js?v=' + ts + '><\/script>');
                $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');

                entitiesModule(ts)
                brandingModule(ts)
                contactUsModule(ts)
                pocModule(ts)

                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });
            break

        case "subscriptionsReleased":
            urlBody = root + "/services/modules/stripe/billing/subscription/membership/ux/body.html?v=" + ts;
            urlBody = root + "/services/modules/business/subscriptions/ux/body.html?v=" + ts;


            $.get(urlHead, function (response) {
                rt = response.toString().replace(/\/ContextPath/g, contextPath);
                $("head").html(rt);
                $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js?v=' + ts + '><\/script>');

                entitiesModule(ts)
                pocModule(ts)
                geoModule(ts)
                metaModule(ts)
                couponsModule(ts)
                brandingModule(ts)
                plansModule(ts)
                subsModule(ts)
                mmModule(ts)
                bizHoursModule(ts)
                legalModule(ts)
                primaryAccountMembersModule(ts)

                // Model and Servicers are in Service head already
                $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');

                $("head").append("<script src=" + root +  '/services/modules/business/subscriptions/ux/widgets.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/subscriptions/init.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/subscriptions/controller.js?v=' + ts + '></script>');
                $("head").append("<script src=" + root +  '/services/modules/business/subscriptions/onchange.js?v=' + ts + '></script>');

                $.get(urlBody, function (response) {
                    $("body").html(response);
                });

            });


            break;
        case "moduleBookings":
            urlBody = root + "/services/modules/business/booking/ux/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addData()
                    //					$("head").append('<script src=//code.jquery.com/jquery-1.12.4.js?v=' + ts + '><\/script>');
//					return
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../integrity.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;
        case "accountMetaReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/meta/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addData()
                    $("head").append('<script src="../functions.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "businessInviteReleased":
            urlBody = root + "/services/invitation/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addData()
                    $("head").append('<script src="../functions.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "mediaHubReleased":

            urlBody = root + "/services/mediahub/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addData()
                    $("head").append("<script src=" + root +  '/services/mediahub/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/mediahub/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/mediahub/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/mediahub/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/mediahub/controller.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
//					}, modelSiteSettingsRsp.ux.timings.pageLoad.backEnd);
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserFileReleased":

            urlBody = root + "/services/modules/stripe/files/ux/body.html?v=" + ts;
            $(window).on("load", function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addData()
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 10000);
                });
            });
            break;
        case "entityManagementReleased":

            urlBody = root + "/services/business/ux/body.html?v=" + ts;
            // 1. DOMContentLoaded
            // 2. Dom and CSS, and IMAGES!!!
            $(window).on("load", function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
//					$(".text").text("Loading...");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addData()
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../integrity.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 10000);
                });
            });
            break;

        case "endUserCustomerReleased":

            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("")
                    // Model and Servicers are in Service head already
//					addData()
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append("<link rel=stylesheet href=" +   "/services/modules/stripe/customer/geo.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                    $("head").append("<script type=\"application/javascript\" src=" + root +  "/services/modules/stripe/functions.js?v=" + ts + "></script>");

                    entitiesModule(ts)
                    brandingModule(ts)
                    customerModule(ts)
                    authenticationModule(ts)
                    // menuBarModule(ts)
                    primaryAccountMembersModule(ts)


                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/cards/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/cards/model.js?v=' + ts + '></script>');
                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/cards/services.js?v=' + ts + '></script>');

                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/geoAddress.js?v=' + ts + '></script>');
                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/controller.js?v=' + ts + '></script>');
                    $("head").append("<script type=\"application/javascript\" src=" + root +  '/services/modules/stripe/customer/init.js?v=' + ts + '></script>');


                    urlBody = root + "/services/modules/stripe/customer/ux/body.html?v=" + ts;
                    $.get(urlBody, function (response) {
                        $("body").html(response);
                        urlBodyCards = root + "/services/modules/stripe/customer/cards/ux/body.html?v=" + ts;
                        $.get(urlBodyCards, function (response) {
                            $("#addCardHook").html(response);
                        });
                    });
                });

            });
            break;
        case "endUserCustomerBankReleased":
            urlBody = root + "/services/modules/stripe/customer/banks/ux/body.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addData()
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });

            });
            break;
        case "endUserCustomerCardReleased":
            urlBody = root + "/services/modules/stripe/customer/cards/ux/bodyMain.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
//					addData()l
                    entitiesModule(ts)
                    customerModule(ts)
                    $("head").append('<script  type="application/javascript"  type="application/javascript"  src=' + root +  '/ux/menu/provisioningMenuWidget.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');

                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/uxCustomerAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/services.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/init.js?v=' + ts + '></script>');


                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;

        case "endUserCustomerCardBackFillReleased":
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
//					addData()l
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/uxCustomerAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/services.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/init.js?v=' + ts + '></script>');


                    urlBody = root + "/services/modules/stripe/customer/cards/ux/bodyMain.html?v=" + ts;

                    $.get(urlBody, function (response) {
                        $("body").html(response);
                        $("#content").attr("style", "display:none");
                        $("#spinner").attr("style", "display:show");
                    });

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });


            });
            break;
        case "endUserCustomerCardAdminReleased":
            urlBody = root + "/services/modules/stripe/customer/cards/ux/bodyAdmin.html?v=" + ts;
            $(document).ready(function () {


                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
//					addData()l
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/uxCustomerAccountManagment.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/customer/cards/init.js?v=' + ts + '></script>');


                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;

        case "endUserAccountProfileBusinessReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/business/ux/body.html?v=" + ts;

            $(document).ready(function () {

                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append("<link rel=stylesheet href=" + root +  "/services/modules/stripe/customer/geo.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');

                    $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');
                    entitiesModule(ts)
                    mmModule(ts)

                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/business/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/business/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/business/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/business/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });


            });
            break;

        case "endUserAccountProfileIndiReleased":
            urlBody = root + "/services/modules/stripe/connectaccount/individual/ux/body.html?v=" + ts;

            $(document).ready(function () {

                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    //					$("head").append("<link rel=stylesheet href=" + root +  "/services/modules/stripe/connectaccount/head/ux/css.css>");
                    $("head").append("<link rel=stylesheet href=//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css>");
                    $("head").append('<script src=//code.jquery.com/ui/1.12.1/jquery-ui.js><\/script>');

                    $("head").append('<script src=' + root +  '/ux/menu/onboardingMenuWidget.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/ux/menu/screen.js?v=' + ts + '><\/script>');
                    $("head").append('<script src=' + root +  '/services/mediahub/media.js?v=' + ts + '><\/script>');

                    entitiesModule(ts)
                    mmModule(ts)

                    // Model and Servicers are in Service head already
                    $("head").append("<script src=" + root +  '/services/modules/stripe/functions.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/individual/model.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/individual/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/individual/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/connectaccount/individual/init.js?v=' + ts + '></script>');

                    $.get(urlBody, function (response) {
                        $("body").html(response);
                        $("#content").attr("style", "display:none");
                        $("#spinner").attr("style", "display:show");
                    });
                });


            });
            break;
        case "endUserAccoundCardReleased":
            urlBody = root + "/services/modules/stripe/sources/card/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addData()
                    $("head").append('<script src="../model.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;


        case "endUserWorkflowTests":
            urlBody = root + "/services/modules/stripe/workflow/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    //	 			$("body").fadeIn(0, function () {
//						$(this).html(response);
//					});
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
//					}, modelSiteSettingsRsp.ux.timings.pageLoad.backEnd);
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCustomerTest":
            urlBody = root + "/services/modules/stripe/customer/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    //	 			$("body").fadeIn(0, function () {
//						$(this).html(response);
//					});
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
//					}, modelSiteSettingsRsp.ux.timings.pageLoad.backEnd);
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserBankCustomerTests":
            urlBody = root + "/services/modules/stripe/customer/banks/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCardCustomerTests":
            urlBody = root + "/services/modules/stripe/customer/cards/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCardAccountTests":
            urlBody = root + "/services/modules/stripe/connectaccount/cards/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserBankAccountTests":
            urlBody = root + "/services/modules/stripe/connectaccount/banks/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserBankSepaTest":
            urlBody = root + "/services/modules/stripe/sources/banksepa/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCardSourcesTests":
            urlBody = root + "/services/modules/stripe/sources/card/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserBankTokenTests":
            urlBody = root + "/services/modules/stripe/tokens/banksepa/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCardTokenTests":
            urlBody = root + "/services/modules/stripe/tokens/card/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCreditNote":
            urlBody = root + "/services/modules/stripe/billing/creditnote/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "adminSubscriptionTest":
            urlBody = root + "/services/modules/stripe/billing/subscription/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "adminPlanTests":
            urlBody = root + "/services/modules/stripe/billing/plan/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "adminProductTest":
            urlBody = root + "/services/modules/stripe/billing/product/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserApplicationFee":
            urlBody = root + "/services/modules/stripe/charges/applicationfee/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserChargeRefunds":
            urlBody = root + "/services/modules/stripe/charges/refunds/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                    $.get(urlBody, function (response) {
                        $("body").html(response);
                        $("#content").attr("style", "display:none");
                        $("#spinner").attr("style", "display:show");
                    });
                    $.get(urlHead, function (response) {
                        rt = response.toString().replace(/\/ContextPath/g, contextPath);
                        $("head").html(rt);
                        addTestData()
                        $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                        var intervalId = setTimeout(function () {
                            clearTimeout(intervalId);
                            $("#content").attr("style", "display:show");
                            $("#spinner").attr("style", "display:none");
                        }, pageloadDelay);
                    });
                }
            );
            break;
        case "endUserChargeDirectTest":
            urlBody = root + "/services/modules/stripe/charges/direct/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append("<script src=" + root + "/services/modules/stripe/charges/direct/unitTests/" + unitTests.js + " > <\/script>");


                });

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
            });
            break;
        case "endUserChargeDestinationTest":
            urlBody = root + "/services/modules/stripe/charges/destination/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    addTestData()
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCouponsTest":
            urlBody = root + "/services/modules/stripe/billing/coupons/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    //	 			$("body").fadeIn(0, function () {
//						$(this).html(response);
//					});
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    addTestData()
                    $("head").append('<script src="unitTestsPlatform.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
//					}, modelSiteSettingsRsp.ux.timings.pageLoad.backEnd);
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserConnectAccountAddCompany":
            urlBody = root + "/services/modules/stripe/connectaccount/company/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../../../../../testdata.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserConnectAccountAddIndividual":
            urlBody = root + "/services/modules/stripe/connectaccount/individual/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../../../../../testdata.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserConnectAccountAddToC":
            urlBody = root + "/services/modules/stripe/connectaccount/toc/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../../../../../testdata.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;

        case "endUserTokenBankACHReleased":
            urlBody = root + "/services/modules/stripe/tokens/bankach/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserTokenBankACHTest":
            urlBody = root + "/services/modules/stripe/tokens/bankach/unitTests/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../../../../../testdata.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="unitTests.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserChargeDirectReleased":
            urlBody = root + "/services/modules/stripe/charge/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;

        case "adminPlanReleased":
            urlBody = root + "/services/modules/stripe/billing/plan/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCustomerChargeCardReleased":
            urlBody = root + "/services/modules/stripe/chargecard/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
        case "endUserCardTokenReleased":
            urlBody = root + "/services/modules/stripe/tokens/card/ux/body.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    // Model and Servicers are in Service head already
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, pageloadDelay);
                });
            });
            break;
// HERE


        case "moduleTopUpMgt":
            urlBody = root + "/services/modules/stripe/topups/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/stripe/topups/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/topups/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/topups/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/topups/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/stripe/topups/onchange.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleRefundMgt":
            urlBody = root + "/services/modules/refunds/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/refunds/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/refunds/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/refunds/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/refunds/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/refunds/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleDigitizerQrCodeInt":
            urlBody = root + "/services/modules/digiQrCode/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=\"https://demo.dynamsoft.com/dbr_wasm/js?v=' + ts + '/dbr-6.5.1.min.js?v=' + ts + '\"></script>");
                    $("head").append("<script src=\"https://cdn.jsdelivr.net/npm/js?v=' + ts + 'barcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '\"></script>");
                    $("head").append("<script src=" + root +  '/services/utils/scanner/Scanner.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/lib/qrCode/qrCode.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiQrCode/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleDigitizerBarCodeInt":
            urlBody = root + "/services/modules/digiBarCode/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=\"https://demo.dynamsoft.com/dbr_wasm/js?v=' + ts + '/dbr-6.5.1.min.js?v=' + ts + '\"></script>");
                    $("head").append("<script src=\"https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js?v=' + ts + '\"></script>");
                    $("head").append("<script src=" + root +  '/services/utils/pdf/js?v=' + ts + 'PDF/dist/js?v=' + ts + 'pdf.min.js?v=' + ts + '></script>');
                    $("head").append("<script src=https://html2canvas.hertzen.com/dist/html2canvas.js?v=' + ts + '></script>");
                    $("head").append("<script src=" + root +  '/services/utils/scanner/Scanner.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiBarCode/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiBarCode/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiBarCode/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiBarCode/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/digiBarCode/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleSalesControl":
            urlBody = root + "/services/modules/monitoring/sales/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/sales/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/sales/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/sales/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/sales/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/sales/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleStockControl":
            urlBody = root + "/services/modules/monitoring/stock/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    //					Scanner, needed to add to page load

//					$("head").append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\"");
//					$("head").append("<link rel=stylesheet href=\"https://serratus.github.io/quaggaJS/stylesheets/pygment_trac.css\"</script>");
//					$("head").append("<link rel=stylesheet href=\"https://serratus.github.io/quaggaJS/stylesheets/styles.css\"</script>");

                    $("head").append("<script src=\"https://demo.dynamsoft.com/dbr_wasm/js?v=' + ts + '/dbr-6.5.1.min.js?v=' + ts + '\"></script>");
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/stock/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/stock/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/stock/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/stock/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/monitoring/stock/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "moduleShopReleased":
            urlBody = root + "/services/modules/pos/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/utils/pdf/js?v=' + ts + 'PDF/dist/js?v=' + ts + 'pdf.min.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/pos/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/pos/methods.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/pos/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/pos/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                        $(".centerHdr").attr("style", "margin: auto; height: 100%; width: 80%; ; padding: 10px;")
                        $("body").prop("class", "w3-center")
                        $("table").attr("style", "margin: auto; width: 5%;  padding: 10px;")
                        $("table").attr("class", "w3-mobile")
                        $("table").attr("class", "w3-center")
                        //						$("#content").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "modulePortalReleased":
            urlBody = root + "/services/modules/portal/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/portal/tabs/tabs-func.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/tabs/tabs-ux.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/portal-utils-funcs.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/ux-load-funcs.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/ux-slideshow.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/portal/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                    $("head").append("<link rel='stylesheet' href=" + root +  '/services/modules/boxleague/ux/progressbar.css></script>');
                    $("head").append("<link rel='stylesheet' href=" + root +  '/services/modules/boxleague/ux/vertical-tab.css></script>');
                });
            });
            break;
        case "modulesReleased":
            urlBody = root + "/services/modules/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/init.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/onchange.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 1000);
                });
            });
            break;
        case "modBoxLeagueReleased":
            urlBody = root + "/services/modules//boxleague/ux/body.html?v=" + ts;
            $(document).ready(function () {
                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append("<script src=" + root +  '/services/modules/boxleague/onchange.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/boxleague/controller.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/boxleague/integrity.js?v=' + ts + '></script>');
                    $("head").append("<script src=" + root +  '/services/modules/boxleague/init.js?v=' + ts + '></script>');
                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
                    }, 3000);
                    $("head").append("<link rel='stylesheet' href=" + root +  '/services/modules/boxleague/ux/progressbar.css></script>');
                    $("head").append("<link rel='stylesheet' href=" + root +  '/services/modules/boxleague/ux/vertical-tab.css></script>');
                });
            });
            break;


        case "userManagementReleased":

            urlBody = root + "/services/userManagement/ux/body.html?v=" + ts;
            $(window).on("load", function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                    $("#content").attr("style", "display:none");
                    $("#spinner").attr("style", "display:show");
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../controller.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../integrity.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');

                    var intervalId = setTimeout(function () {
                        clearTimeout(intervalId);
                        $("#content").attr("style", "display:show");
                        $("#spinner").attr("style", "display:none");
//					}, modelSiteSettingsRsp.ux.timings.pageLoad.backEnd);
                    }, pageloadDelay);
                });
            });
            break;
        case "userPasswordResetReleased":
            urlBody = root + "/services/authentication/ux/bodyPasswordReset.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../init.js?v=' + ts + '><\/script>');
                    $("head").append('<script src="../onchange.js?v=' + ts + '><\/script>');
                });
            });
            break;
        case "userValidationReleased":
            urlBody = root + "/services/userManagement/ux/bodyValidate.html?v=" + ts;
            $(document).ready(function () {

                $.get(urlBody, function (response) {
                    $("body").html(response);
                });
                $.get(urlHead, function (response) {
                    rt = response.toString().replace(/\/ContextPath/g, contextPath);
                    $("head").html(rt);
                    $("head").append('<script src="../validate.js?v=' + ts + '><\/script>');
                });
            });
            break;
        case "billingReleased":
            urlBody = root + "/services/finance/billing/ux/body.html?v=" + ts;
            $(document).ready(function () {
                    $.get(urlBody, function (response) {
                        $("body").html(response);
                    });
                    $.get(urlHead, function (response) {
                        rt = response.toString().replace(/\/ContextPath/g, contextPath);
                        $("head").html(rt);
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingProportional/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billRulePatronCat/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billRulePatronCat/ux.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billingEntities/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billingEntities/ux.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billingRulePatrons/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/billingRulePatrons/ux.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/billingRules/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/controller.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/billing/init.js?v=' + ts + '></script>');
                    });
                }
            );
            break;
        case "paymentsCardReleased":
            urlBody = root + "/services/finance/payments/cards/ux/body.html?v=" + ts;
            $(document).ready(function () {
                    $.get(urlBody, function (response) {
                        $("body").html(response);
                    });
                    $.get(urlHead, function (response) {
                        rt = response.toString().replace(/\/ContextPath/g, contextPath);
                        $("head").html(rt);
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/registration/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/registration/controller.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/topup/onchange.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/topup/controller.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/integrity.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/controller.js?v=' + ts + '></script>');
                        $("head").append("<script src=" + root +  '/services/finance/payments/cards/init.js?v=' + ts + '></script>');
                    });
                }
            );
            break;
        default:

            break;
    }

}

function postRequest(ep, data) {
    url = root +  "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

//# sourceURL=bootstrap.js