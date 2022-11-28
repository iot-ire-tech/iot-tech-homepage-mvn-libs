/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", ".addLegalWeb, .addLegalVideo, .addLegalActivity, .addLegalEvent, .addLegalStore", function () {

    nsLegalService.items.push(nsLegalService.modelItem)
    $(this).attr("disabled", true)
    // reset Item
    // nsMetaService.modelItem

    $(this).attr("disabled", true)
})
$(document).on("change ", ".tnc", function () {
    nsLegalService.modelItem.tnc = $(this).val()
});
$(document).on("change ", ".policy", function () {
    nsLegalService.modelItem.policy = $(this).val()
});


//# sourceURL=api_legal_events.js


