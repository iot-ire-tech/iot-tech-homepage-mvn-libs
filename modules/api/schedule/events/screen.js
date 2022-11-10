/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", ".addScheduleWeb, .addScheduleVideo, .addScheduleActivity, .addScheduleEvent, .addScheduleStore", function () {

    nsScheduleService.items.push(nsScheduleService.modelItem)
    // reset Item
    // nsMetaService.modelItem
    $(this).attr("disabled", true)
});

$(document).on("change  ", ".startTime", function () {
    nsScheduleService.modelItem.startDateTime = new Date($(this).val()).toISOString()
});
var hours = 0
$(document).on("change  ", ".hour", function () {
    hours = parseInt($(this).val()) * 60
    if (minutes > 0)
        hours += minutes
    nsScheduleService.modelItem.duration.hours = hours
});
var minutes = 0
$(document).on("change  ", ".minutes", function () {
    minutes = parseInt($(this).val())
    if (hours > 0) {
        hours += minutes
        nsScheduleService.modelItem.duration.hours = hours
    } else
        nsScheduleService.modelItem.duration.hours = minutes
});
$(document).on("change  ", ".timezone", function () {
    nsScheduleService.modelItem.timezone = $(this).val();
});


// Fixed webinar only - no recurring else you lose out on recurring charge?
recurrence: {

    $(document).on("change  ", ".recurrencetype", function () {
        nsScheduleService.modelItem.recurrence.type = $(this).val();
    });
    $(document).on("change  ", ".recurrencetype2", function () {
        // type 2
        nsScheduleService.modelItem.recurrence.type = $(this).val();
    });
    $(document).on("change  ", "recurrenceRepeatInterval", function () {
        nsScheduleService.modelItem.recurrence.repeatInterval = parseInt($(this).val())
    });
    $(document).on("change  ", "#recurrance", function () {
        nsScheduleService.modelItem.recurrence.weeklyDays = $(this).val();
        nsScheduleService.modelItem.recurrence.monthlyDay = $(this).val();
        nsScheduleService.modelItem.recurrence.monthlyWeek = $(this).val();
        nsScheduleService.modelItem.recurrence.monthlyWeekDay = $(this).val();
    });
    $(document).on("change  ", "#recurranceEndTime", function () {
        nsScheduleService.modelItem.recurrence.endDateTime = $(this).val();
    });
    $(document).on("change  ", "#recurranceEndDateTime", function () {
        nsScheduleService.modelItem.recurrence.endDateTime = $(this).val();
    });
}

//# sourceURL=api_schedule_events.js
