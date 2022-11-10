/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Form : Signup / Registration
$(document).on("change", "#email", function () {
    nsCustomerService.modelItem.person.email = $(this).val();
});
$(document).on("change", "#passwordold", function () {
    nsCustomerService.modelItem.person.phone = $(this).val();
});
var newPassword
$(document).on("change", "#passwordnew", function () {
    newPassword = $(this).val();
});

$(document).on("change", "#passwordnew", function () {

    if (!validateFieldRule($(this), "#saveReset"))
        $("#phoneMsg").fadeIn("now").html("<b>This number is not a valid international phone format!</b><br>").delay(5000).fadeOut("slow")
});
//# sourceURL=customer_reset_change.js