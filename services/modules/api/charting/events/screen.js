/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("change ", ".ChartIt", function () {
    nsChartingService.modelItem.currency = $(this).val()
});



//# sourceURL=api_charting_events.js


