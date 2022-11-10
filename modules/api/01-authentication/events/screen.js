/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("change", "#email", function () {
    nsAuthenticationService.modelItem.username = $(this).val();
});
$(document).on("change", "#phone", function () {
    nsAuthenticationService.modelItem.password = $(this).val();
});


//# sourceURL=api_authentication_events.js


