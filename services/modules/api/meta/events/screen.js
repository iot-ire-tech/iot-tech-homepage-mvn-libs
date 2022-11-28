/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on("click ", ".addMetaWeb, .addMetaAsset, .addMetaVideo, .addMetaActivity, .addMetaEvent, .addMetaStore, .addMetaSubscription", function () {


    // you could flatten it each time too...
    nsMetaService.items.push(
        {
            "name": nsMetaService.modelItem.name,
            "description": nsMetaService.modelItem.description,
            "type": nsMetaService.modelItem.type,
            "category": nsMetaService.modelItem.category,
            "tag": nsMetaService.modelItem.tag
        }
    )
    // if ($(this).attr("class").toString().includes("addMetaSubscription")) {
    //     // $(this).attr("disabled", false)
    // } else
    $(this).attr("disabled", true)

    // reset Item
    $(".addMetaSubscriptionMsg").fadeIn("now").html("#" + nsMetaService.items.length + " new profile profile added").delay(5000).fadeOut("slow")
});

$(document).on("change  ", ".name", function () {
    nsMetaService.modelItem.name = $(this).val();
});
$(document).on("change  ", ".description", function () {
    nsMetaService.modelItem.description = $(this).val();
});
$(document).on("change  ", ".type", function () {
    nsMetaService.modelItem.type = $(this).val();
});

$(document).on("change  ", ".category", function () {
    nsMetaService.modelItem.category = $(this).val();
});
$(document).on("change  ", ".tag", function () {
    nsMetaService.modelItem.tag = $(this).val();
});

//# sourceURL=api_meta_events.js
