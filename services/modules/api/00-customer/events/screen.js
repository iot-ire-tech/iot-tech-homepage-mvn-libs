/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

nevigation:{


}

$(document).on("change", "#email", function () {
    nsCustomerService.modelItem.person.email = $(this).val();
    nsCustomerService.modelItem.userAccount.user = $(this).val();

    if (!validateFieldRule($(this), "#saveCustomer"))
        $("#emailMsg").fadeIn("now").html("<b>This email is not a valid email address format!</b><br>").delay(5000).fadeOut("slow")

});

$(document).on("change", "#email", function () {
    var newemail = $(this).val()

    // check is unique
    try {
        nsCustomerService.accountId = "acct_1CBNZCFOjjfpNUIx"
        nsCustomerService.getAccount()
        nsCustomerService.obj.forEach(function (customerItem) {
            customerItem.items.forEach(function (customer) {
                if (customer.person.email === newemail) {
                    throw Error("email exists")
                }
            })
        })

    } catch (errMsg) {
        // alert(errMsg)
        $("#emailMsg").fadeIn("now").html("<b>This email is already taken! You will not be able to save this customer, till your resolve this.</b><br>").delay(5000).fadeOut("slow")
        $("#saveCustomer").attr("disabled", true)
        return
    }
    $("#emailMsg").fadeIn("now").html("")
    $("#saveCustomer").attr("disabled", false)
});

$(document).on("dblclick", "#email", function () {
    nsCustomerService.modelItem.person.email = "tonyennis@yahoo.com"
    nsCustomerService.modelItem.userAccount.email = "tonyennis@yahoo.com"
    $(this).val(nsCustomerService.modelItem.person.email)

});

$(document).on("change", "#phone", function () {
    nsCustomerService.modelItem.person.phone = $(this).val();
    nsCustomerService.modelItem.userAccount.pass = $(this).val();
});
$(document).on("dblclick", "#phone", function () {
    nsCustomerService.modelItem.person.phone = "0877461070"
    nsCustomerService.modelItem.userAccount.phone = "0877461070"
    $(this).val(nsCustomerService.modelItem.person.phone)
});

$(document).on("change", "#phone", function () {
    if (!validateFieldRule($(this), "#saveCustomer"))
        $("#phoneMsg").fadeIn("now").html("<b>This number is not a valid international phone format!</b><br>").delay(5000).fadeOut("slow")

});


$(document).on("change", "#firstname", function () {
    nsCustomerService.modelItem.person.firstName = $(this).val();
});
$(document).on("change", "#lastname", function () {
    nsCustomerService.modelItem.person.lastName = $(this).val();
});
$(document).on("change", "#gender", function () {
    nsCustomerService.modelItem.person.sex = $(this).val();
});


dob:{
    $(document).on("change", "#dob", function () {
        // 2020-02-13
        dob = $(this).val()
        nsCustomerService.modelItem.person.dob.year = parseInt(dob.split("-")[0]);
        nsCustomerService.modelItem.person.dob.month = parseInt(dob.split("-")[1]);
        nsCustomerService.modelItem.person.dob.day = parseInt(dob.split("-")[2]);
    });

    $(document).on("change", "#dobyear", function () {
        nsCustomerService.modelItem.person.dob.year = $(this).val();
    });
    $(document).on("change", "#dobmonth", function () {
        nsCustomerService.modelItem.person.dob.month = $(this).val();
    });
    $(document).on("change", "#dobday", function () {
        nsCustomerService.modelItem.person.dob.day = $(this).val();
    });

}

$(document).on("change", "#dob", function () {
    if (!validateFieldRule($(this), "#saveCustomer"))
        $("#dobMsg").fadeIn("now").html("<b>This date of birth is not a valid format [YYYY-MM-DD]!</b><br>").delay(5000).fadeOut("slow")

});


$(document).on("dblclick", "#dob", function () {
    nsCustomerService.modelItem.person.dob.year = 1972
    nsCustomerService.modelItem.person.dob.month = 02;
    nsCustomerService.modelItem.person.dob.day = 01;
    $(this).val(nsCustomerService.modelItem.person.dob.year + "-" + nsCustomerService.modelItem.person.dob.month + "-" + nsCustomerService.modelItem.person.dob.day)
});

$(document).on("change blur", "#address1", function () {
    nsCustomerService.modelItem.shipping.addressLine1 = $(this).val();
});
$(document).on("change blur", "#address2", function () {
    nsCustomerService.modelItem.shipping.addressLine2 = $(this).val();
});
$(document).on("change blur", "#town", function () {
    nsCustomerService.modelItem.shipping.town = $(this).val();
});
$(document).on("change blur", "#city", function () {
    nsCustomerService.modelItem.shipping.city = $(this).val();
});
$(document).on("change blur", "#country", function () {
    nsCustomerService.modelItem.shipping.country = $(this).val();
});
$(document).on("change blur", "#zip", function () {
    nsCustomerService.modelItem.shipping.postalCode = $(this).val();
});


$(document).on("change", "#billingAddress", function () {
    if (this.checked) {
        var id;
        var peerVal;
        var peerValElement;
        nsCustomerService.modelItem.billing = nsCustomerService.modelItem.shipping
        $(".sa").each(function (index, item) {
            id = $(item).attr("id")
            peerValElement = $("#" + id)
            peerValElement.trigger('change').trigger('blur')
            peerVal = peerValElement.val();
            $("#" + id + "Billing").val(peerVal).trigger('change').trigger('blur')
        })
        $(".ba").each(function (index, item) {
            $(item).attr("disabled", true)
        })
    } else {
        $(".ba").each(function (index, item) {
            $(item).attr("disabled", false)
        })
    }
});


$(document).on("change blur", "#address1Billing", function () {
    nsCustomerService.modelItem.billing.addressLine1 = $(this).val();
});
$(document).on("change blur", "#address2Billing", function () {
    nsCustomerService.modelItem.billing.addressLine2 = $(this).val();
});
$(document).on("change blur", "#townBilling", function () {
    nsCustomerService.modelItem.billing.town = $(this).val();
});
$(document).on("change blur", "#cityBilling", function () {
    nsCustomerService.modelItem.billing.city = $(this).val();
});
$(document).on("change blur", "#countryBilling", function () {
    nsCustomerService.modelItem.billing.country = $(this).val();
});
$(document).on("change blur", "#zipBilling", function () {
    nsCustomerService.modelItem.billing.postalCode = $(this).val();
});

$(document).on("change", "#lng", function () {
    nsCustomerService.modelItem.location.lng = $(this).val();
});
$(document).on("change", "#lat", function () {
    nsCustomerService.modelItem.location.lat = $(this).val();
});


//# sourceURL=api_customer_events.js


