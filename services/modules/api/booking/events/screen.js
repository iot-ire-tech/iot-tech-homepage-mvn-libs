/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Revenue Selection
var cost = 0.00

$(document).on("click", '.bookingMgt', function () {
    var productId = $(this).attr("productId")
    var accountId = $(this).attr("accountId")
    var assetId = $(this).attr("assetId")
    var offering = $(this).attr("offering")

    modelUsage.accountId = accountId
    modelUsage.productId = productId
    modelUsage.customerId = customerId
    modelUsageBooking.features.customer.booking.service = true
    modelUsageBooking.features.customer.bizhours.service = true

    nsCommsService.accountId = accountId;
    nsCommsService.productId = productId;
    nsCommsService.assetId = assetId;
    nsCommsService.customerId = customerId;

    nsRevenueService.accountId = accountId
    nsRevenueService.assetId = assetId
    nsRevenueService.productId = productId

    nsBizHoursService.offering = offering
    nsBizHoursService.accountId = accountId
    nsBizHoursService.assetId = assetId
    nsBizHoursService.productId = assetId // always on physical?

    nsBizHoursService.uxBusinessHoursListing = new UxBizHourListing();

    nsCapacityMgtService.accountId = accountId
    nsCapacityMgtService.assetId = assetId // Biz
    nsCapacityMgtService.productId = productId // Biz

    if (offering === "event")
        eventModules:{
            nsFixturesService.accountId = accountId
            nsFixturesService.assetId = assetId // Biz
            nsFixturesService.productId = productId // Biz

            nsSeatingService.accountId = accountId
            nsSeatingService.assetId = assetId // Biz
            nsSeatingService.productId = productId // Biz

        }

    setupService:{
        nsBookingService.revenueService = nsRevenueService
        // has revenue
        nsBookingService.bizHoursService = nsBizHoursService
        // has opening hours
        nsBookingService.capacityMgtService = nsCapacityMgtService
        // has capacity
        if (offering === "event")
            nsBookingService.fixturesService = nsFixturesService
        // has capacity
    }

    // constructure
    nsBookingService.items = [] // start off afresh
    nsBookingService.offering = offering;
    nsBookingService.accountId = accountId
    nsBookingService.assetId = assetId
    nsBookingService.productId = productId


    uxBookingReservationWidget.accountId = accountId;
    uxBookingReservationWidget.productId = productId;
    uxBookingReservationWidget.assetId = assetId;
    uxBookingReservationWidget.offering = offering;

    try {


        nsBookingService.duration = 1 // dummy
        if (!nsBookingService.isReadyToBook()) {
            throw Error("Upstream modules not available for booking service (" + nsBookingService.msg + ")")
        }

        if (nsBookingService.setMaxNumSlotsAvailable() <= 0) {
            throw Error("No available slotes available for bookings, increase cap (" + nsBookingService.msg + ")")
        }


        displayUx: {
            var htmlTabs = uxBookingReservationTab.init()
            uxBookingReservationWidget.tabsHtml = htmlTabs;
            $("#tabOnly").html(htmlTabs)
            var html = uxBookingReservationWidget.init()
            $("#dialogBookingHook").html(html)
            nsBizHoursService.ux.dialogueProps.width = "60%"
            $("#dialogBooking").dialog(nsBookingService.ux.dialogueProps);

        }

        {
// Load Date/Time Picker
            uxLoadDatePicker(".btnBizHourDate", nsBookingService.ux.datepickerProps)
// Load customer List
            var uxWidgetCustomerListRsp = uxWidgetCustomerList({
                "accountId": accountId,
                "productId": productId,
                "className": "bookingCustomerList",
                "size": 5,
                "multiple": "multiple"
            })
            $(".notifyCustomerOfNewBookingListHook").html(uxWidgetCustomerListRsp.getHtml())
// Enable Tabs when they are disabled!!!
            uxLoadTab(".tabBookingOptions")
        }

    } catch (errMsg) {
        alert(errMsg)
        $(this).attr("disabled", true)
    }
});


$(document).on("click ", '.btnExitReservation', function () {
    $("#dialogBooking").dialog("close");
});

$(document).on("change", '.timeNmoney', fnTimeNmoney)
$(document).on("change", '.btnBizHourDate', fnIsAvailable);
$(document).on("click", '.addBooking', addReservation);


notifications: {
    var alerts = ""
    $(document).on("click", '.bookingCustomerList', function () {
        [
            {name: "Joe", age: 22},
            {name: "Kevin", age: 24},
            {name: "Peter", age: 21}
        ].map(e => e.name).join(",");


        nsCommsService.customers = []
        $(this).val().map(function (item) {
            // for each customer listed, we will send sms/email
            nsCommsService.customers.push(item)
        })
    })

    // annete / sunil...
    // EST ....
    $(document).on("click", '.notificationSms', function () {
        if (this.checked) {
            nsCommsService.modelItem.type = "sms"
            nsCommsService.items.set("sms", {
                "sentStatus": false,
                "type": "sms"
            })
        } else {
            nsCommsService.items.delete("sms")
        }
    })
    $(document).on("click", '.notificationEmail', function () {

        if (this.checked) {
            nsCommsService.modelItem.type = "email"
            nsCommsService.items.set("email", {
                "sentStatus": false,
                "type": "email"
            })
        } else {
            nsCommsService.modelItem.type = ""
            nsCommsService.items.delete("email")
        }

    })

    $(document).on("click", '.btnAddNotification', function () {
        // default comms
        if (false) {
            nsCommsService.modelItem.type = "email"
            nsCommsService.items.set("email", nsCommsService.modelItem)
        }
        nsCommsService.create()

        // this will create an entry what can workin standalone, or be triggered when booking is paid
        nsBookingService.services.push({
            "type": "comms",
            "id": nsCommsService.dbId
        })

        updateUsageService:{
            modelUsageBooking.features.customer.notification.service = true
        }
        $(this).attr("disabled", true)

        $(".btnAddNotificationMsg").fadeIn("now").html("Notification added to booking").delay(5000).fadeOut("slow")

    });

    $(document).on("click", '.btnAddReminVder', function () {
        $(".btnAddReminderMsg").fadeIn("now").html("Reminder added to booking").delay(5000).fadeOut("slow")
    })

    $(document).on("click", '.btnAddSocial', function () {
        $(".btnAddSocialMsg").fadeIn("now").html("Social News updates added to booking").delay(5000).fadeOut("slow")
    })
}

reminder: {

    $(document).on("change", '.reminderDate', function () {
        modelBookingReservationItemReminder.date = $(this).val();
        modelUsageBooking.features.customer.reminders.service = true
    })
    $(document).on("click", '.reminderSms', function () {
        if (this.checked) {
            modelBookingReservationItemReminder.smsAlert = true
        } else {
            modelBookingReservationItemReminder.smsAlert = false
        }

    })
    $(document).on("click", '.reminderEmail', function () {

        if (this.checked) {
            modelBookingReservationItemReminder.emailAlert = true
        } else {
            modelBookingReservationItemReminder.emailAlert = false
        }
    })

}


social:{

    $(document).on("click", '.socialNews', function () {
        modelUsageBooking.features.customer.social.service = true
        if (this.checked) {
            modelBookingReservationItemSocial.socialNewsl = true
        } else {
            modelBookingReservationItemSocial.socialNewsl = false
        }

    })
    $(document).on("click", '.socialAlerts', function () {

        modelUsageBooking.features.customer.social.service = true
        if (this.checked) {
            modelBookingReservationItemSocial.socialAlerts = true
        } else {
            modelBookingReservationItemSocial.socialAlerts = false
        }

    })


}


function fnTimeNmoney() {
    validations: {
        addDuration = true;
        var startDateTime = $('option:selected', this).attr("startdatetime")
        var duration = parseInt($('option:selected', this).attr("duration")) // in minutes please
        var inc = $('option:selected', this).attr("inc") // billing / booking increments
        cost = parseFloat($('option:selected', this).attr("cost")).toFixed(2)
    }
    // Runtime
    if (inc === "hr")
        duration *= 60
    if (inc === "day")
        duration *= 1440
    if (inc === "week")
        duration *= 10080


    if (nsBookingService.setDuration(duration).checkDuration()) {
        nsBookingService.workflow.addDuration = true
        nsBizHoursService.duration = duration
    }


    updateCheckoutButton:    {
        $("input[productId=" + nsBookingService.productId + "]").attr("cost", cost)
        $("input[productId=" + nsBookingService.productId + "]").attr("duration", duration)
    }


    skipToReseration:   {
        if (nsBookingService.offering.includes("event")) {
            fnIsAvailable(startDateTime)
            nsBookingService.workflow.addStartDate = true;
        }

    }
}

function fnIsAvailable(eventStartTimeDate) {
    // Runtime
    if (nsBookingService.offering === "event") {
        nsBookingService.setStartDate(eventStartTimeDate).checkStartDate() // update end time
    } else
        nsBookingService.setStartDate(new Date($(this).val()).toISOString()).checkStartDate() // update end time

    //  validations:
    if (nsBookingService.workflow.addDuration === false) {
        // alert("Sorry, you need to select a duration first, before selecting a booking date")
        var htmlAlert = "<br>"
        htmlAlert += "<span class=\"w3-tag w3-yellow\">Sorry, you need to select a duration first, before selecting a booking date</span>"
        htmlAlert += "<br>"
        $(".msgNotification").fadeIn("fast").html(htmlAlert).delay(1000).fadeOut("slow")
        return
    }
    // nsBookingService.checkStartDate()
    if (nsBookingService.workflow.addStartDate !== true)
        return


    nsBizHoursService.startDateTime = nsBookingService.startDateTime
    //       isAssetAvailable
    // nsBizHoursService.productId = nsBookingService.assetId
    nsBizHoursService.isOpen()
    // isEntityAvailable:
    // TODO add entity availability precision
    // bizHourRsp:
    var openingtimestable = nsBizHoursService.getBizHoursListingUx()
    if (nsBizHoursService.isOpenResults.status) {
        nsBookingService.workflow.addStartDate = true;
        $(".msgNotification").fadeIn("fast").html(nsBizHoursService.isOpenResults.msg).delay(10000).fadeOut("slow")
        // $(".msgAvailability").fadeOut("fast")
    } else {
        // $(".msgNotification").html(nsBizHoursService.getBizHoursListingUx()).delay(20000).fadeOut("slow")
        $(".msgNotification").fadeIn("fast").html(nsBizHoursService.isOpenResults.msg).delay(10000).fadeOut("slow")
        $(".msgAvailability").fadeIn("fast").html(openingtimestable).delay(10000).fadeOut("slow")
        nsBookingService.workflow.addStartDate = false;
    }

    modelUsageBooking.features.customer.ttb.service = true
}

function addReservation() {
    // Is ready to book

    try {
        // Set Cap
        // nsBookingService.setMaxNumSlotsAvailable();
        // DB Record input
        nsBookingService.item = {
            "active": false,
            "entityId": nsBookingService.productId
        }
        nsBookingService.service();
        // Disable booking button
        updateCheckoutButton:    {
            $("input[productId=" + nsBookingService.productId + "]").attr("bookingId", nsBookingService.dbId)
            $("input[productId=" + nsBookingService.productId + "]").attr("duration", duration)
        }
        // usage
        modelUsage.items.push(modelUsageBooking)
        nsUsageService.usageService(modelUsage)
        // nsUsageService.usageService({
        //     "accountId": nsBookingService.accountId,
        //     "productId": nsBookingService.productId,
        //     "customerId": nsBookingService.customerId
        // }, modelUsageBooking)
        // Clean up
        // close of booking
        $(".shop[productId=" + nsBookingService.productId + "]").attr("disabled", false)

        // $(".addBookingMsg").html("")
    } catch (errMsg) {
        // alert("")
        var htmlAlert = "";
        htmlAlert = "<br>"
        htmlAlert += "<span class=\"w3-tag w3-yellow\">Sorry, this start date/time is booked out, try a later one</span>"
        htmlAlert += "<br>"
        $(".msgNotification").fadeIn("fast").html(htmlAlert).delay(1000).fadeOut("slow")
    }
    // reset booking
    nsBookingService.workflow.addDuration = false
    nsBookingService.workflow.addStartDate = false
}

//# sourceURL=api_booking_events.js