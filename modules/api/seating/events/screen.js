/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/////////////////////////////
// Revenue Management : Seats
/////////////////////////////
$(document).on("click ", '#mgtSeatingGrades', function () {
    nsSeatingService.uxWidget = new uxEventSeating();
    $("#dialogSeatingHook").html(nsSeatingService.uxWidget.init())
    $("#dialogSeating").dialog(nsSeatingService.ux.dialogueProps);
    nsSeatingService.ux.widgetCounter = nsSeatingService.uxWidget.counter
});
$(document).on("click ", '.addSeatingGrade', function () {
    $("#seatingHook").before(nsSeatingService.uxWidget.add());
});
$(document).on("click ", '.delSeatingGrade', function () {
    $("#seatingHook").before(nsSeatingService.uxWidget.del(this));
});

$(document).on("click", '#btnSaveSeating', saveSeating)

function saveSeating() {
    $("#dialogSeating").dialog("close");
    nsSeatingService.uxWidget.saveId(nsSeatingService.ux.widgetCounter);
    // Cannot post to DB at this stage as we dont have product ID
    nsSeatingService.uxWidget.getIds().forEach(function (item) {
        nsSeatingService.modelItem.grade = $("#" + item.grade).val();
        nsSeatingService.modelItem.cost = parseFloat($("#" + item.cost).val()).toFixed(2) * 1.00;
        nsSeatingService.modelItem.currency = $("#" + item.currency).val();
        nsSeatingService.modelItem.annotate = $("#" + item.annotate).val();

        console.log("Seating grade: ", $("#" + item.grade).val())
        console.log("Seating cost: ", $("#" + item.cost).val())
        console.log("Seating currency: ", $("#" + item.currency).val())
        console.log("Seating annotate: ", $("#" + item.annotate).val())
    });
    $("#mgtSeatingGrades").attr("disabled", true)
}

$(document).on("click ", '#btnCloseSeating', function () {
    $("#dialogSeating").dialog("close");
    nsSeatingService.uxWidget.getIds().forEach(function (item) {
        console.log("Seating Id: ", item.seatingId)

    })
    $("#mgtSeatingGrades").attr("disabled", true)
});

//# sourceURL=api_seating_events.js