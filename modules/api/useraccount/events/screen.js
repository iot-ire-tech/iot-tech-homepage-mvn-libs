/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click ", ".addUserAccountWeb, .addUserAccountVideo, .addUserAccountActivity, .addUserAccountEvent, .addUserAccountStore", function () {

    nsUserAccountService.items.push(nsUserAccountService.modelItem)
    $(this).attr("disabled", true)
    // reset Item
    // nsUserAccountService.modelItem
});

$(document).on("change  ", ".username", function () {
    nsUserAccountService.modelItem.username = $(this).val()
    nsUserAccountService.modelItem.type = $(this).attr("usertype")
});
$(document).on("change  ", ".password", function () {
    nsUserAccountService.modelItem.password = $(this).val()
});

//# sourceURL=api_useraccount_events.js
