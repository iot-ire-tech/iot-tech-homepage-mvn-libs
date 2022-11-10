/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on("click ", '#mgtFixtures', function () {
    nsFixturesService.uxWidget = new uxEventFixtures();
    $("#dialogFixturesHook").html(nsFixturesService.uxWidget.init())
    $("#dialogFixtures").dialog(nsFixturesService.ux.dialogueProps);
    // Save init counter for save time
    nsFixturesService.ux.widgetCounter = nsFixturesService.uxWidget.counter
});
$(document).on("click ", '.addFixture', function () {
    $("#additionalFixturesWidgetsHook").before(nsFixturesService.uxWidget.add());
});
$(document).on("click ", '.delFixture', function () {
    $("#additionalFixturesWidgetsHook").before(nsFixturesService.uxWidget.del(this));
});
$(document).on("click ", '#btnSaveFixture', function () {
    if (nsBizHoursService.isOpenResults.status)
        $("#dialogFixtures").dialog("close");
    else {
        alert("You need to address the start and/or end date times to save these fixture dates, if you are having difficulties contact support")
        return
    }
    nsFixturesService.uxWidget.saveId(nsFixturesService.ux.widgetCounter);
    // Cannot post to DB at this stage as we dont have product ID
    nsFixturesService.uxWidget.getIds().forEach(function (item) {
        console.log("Fixtures startDateTime: ", item.startDateTime)
        console.log("Fixtures endDateTime: ", item.endDateTime)
        console.log("Fixtures annotate: ", item.annotate)
    })
    $("#mgtFixtures").attr("disabled", true)
});
$(document).on("click ", '#btnCloseFixture', function () {
    $("#dialogFixtures").dialog("close");
    nsFixturesService.uxWidget.getIds().forEach(function (item) {
        console.log("Fixture Id: ", item.fixtureId)

    })
    $("#mgtFixtures").attr("disabled", true)
});

$(document).on("change ", '.startTimeFixture', function () {


    assetAvailability:{
        nsBizHoursService.accountId = accountId;
        nsBizHoursService.productId = nsEntitiesService.modelCreate.links.assetId;
    }
    productAvailability:{
    }

    if (nsBizHoursService.productId.length > 0) {
        nsBizHoursService.duration = 0
        nsBizHoursService.startDateTime = $(this).val();
        if (!nsBizHoursService.isOpen()) {
            alert("This start time is outside of business hours, try a time inside of business hours, or contact support")
            return
        }
    } else
        alert("You need to select an upstream asset, to base the event on, contact support if you need assistance")

    //  update end date

});
$(document).on("change ", '.finishTimeFixture', function () {

    assetAvailability:{
        nsBizHoursService.accountId = accountId;
        nsBizHoursService.productId = nsEntitiesService.modelCreate.links.assetId;
    }
    productAvailability:{
    }

    if (nsBizHoursService.startDateTime === undefined) {
        $(this).val(0)
        alert("You have not selected a start date yet...")

        return
    }


    nsBizHoursService.endDateTime = $(this).val();
    var now = moment(new Date()); //todays date
    var start = moment(nsBizHoursService.startDateTime); //todays date
    var end = moment(nsBizHoursService.endDateTime); // another date

    timingCheck: {
        // TODO add to Admin panel for events...

        // event must be same day
        var isSameDay = moment(nsBizHoursService.startDateTime).isSame(nsBizHoursService.endDateTime, 'day');
        if (!isSameDay) {
            alert("Events start/end dates must be on the same day")
            return
        }

        // Not Tomorrow
        var isTomorrow = moment.duration(start.diff(now)).asHours()
        if (isTomorrow <= 24) {
            alert("Start date time must be 24 hours from to now!")
            return
        }
        // Past
        if (moment.duration(end.diff(start)).asMinutes() < 0) {
            alert("End date time, cant be before start date time")
            return
        }
        // same
        if (moment.duration(end.diff(start)).asMinutes() === 0) {
            alert("End date time, cant be same as start date time")
            return

        }

    }
    duration:{
        var duration = moment.duration(end.diff(start)).asMinutes();
        nsBizHoursService.duration = duration;
    }

    if (nsBizHoursService.productId.length > 0) {
        if (!nsBizHoursService.isOpen()) {
            alert("This closing time is outside of business hours, try a time inside of business hours, or contact support")
            return
        }
    } else
        alert("You need to select an upstream asset, to base the event on, contact support if you need assistance")
});
//# sourceURL=api_fixture_events.js