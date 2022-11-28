/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Personal


//return
var addbusinessPlan = false;
$(document).on('change blur', 'input[name=sp]', function () {
    addbusinessPlan = true;
    modelContext.businessPlan = $(this).val();
});

$(document).on('keypress keydown keyup', '#tradingName', function () {
    var host = $(this).val()
    if (host.length === 0)
        return

    if (host.includes(" ")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain spaces!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("_")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain underscores!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes(".")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain full stops!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("\\")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain backslash!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("/")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain slash!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes(":")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain colon!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("*")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain asterisk!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("?")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain question mark!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("\"")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain quotation mark!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("<")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain less than sign!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("<")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain less than sign!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes(">")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain greater than sign!").delay(3000).fadeOut("slow")
        return
    }
    if (host.includes("|")) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant contain vertical bar sign!").delay(3000).fadeOut("slow")
        return
    }
    if (host.length >= 15) {
        $("#tradingNameMsg").fadeIn("now").html("Trading name cant be greater then 15 characters long!").delay(3000).fadeOut("slow")
        return
    }
    if (host.length <= 3) {
        $("#tradingNameMsg").html("Trading name cant be less then 3 characters long!").delay(1000).fadeOut("slow")
        return
    }

    var url = "<br>"
    url = "<div class='w3-container w3-center w3-border w3-border-red w3-padding-large'>"
    url += "your customised links will look as follows on completion..."
    url += "<br>"
    url += "<b>Customer Portal</b> => https://<b>" + host + "</b>.mybusinesspal.com/services/modules/stripe/customer/login/release/users.jsp"
    url += "<br>"
    url += "<b>Provisioning Portal</b> => https://<b>" + host + "</b>.mybusinesspal.com/http://localhost:8084/services/modules/stripe/customer/login/release/business.jsp"
    url += "</div>"
    $("#tradingNameUrl").html(url);

    modelContext.hostname = host
});


var accountType = false;
$(document).on('change', '#accountType', function () {
    accountType = true;
    modelContext.accountType = $(this).val();
});

var fname = false;
$(document).on('change', '#fname', function () {
    fname = true;
    modelContext.fname = $(this).val();
});
var lname = false;
$(document).on('change', '#lname', function () {
    lname = true;
    modelContext.lname = $(this).val();
});
var email = false;
$(document).on('change', '.newaccountEmail', function () {
    email = true;
    modelContext.email = $(this).val();
});

// as this email is not account driven we dont need to worry about it!!!
$(document).on('change', '.newaccountEmail', function () {
    if (!validateFieldRule($(this), "#newAccount"))
        $("#emailMsg").fadeIn("now").html("<b>This email is not formatted correctly!</b><br>").delay(3000).fadeOut("slow")

    // var newemail = $(this).val()
    // try {
    //
    //     nsCustomerService.accountId = "acct_1CBNZCFOjjfpNUIx"
    //     nsCustomerService.getAccount()
    //     nsCustomerService.obj.forEach(function (customerItem) {
    //         customerItem.items.forEach(function (customer) {
    //             if (customer.person.email === newemail) {
    //                 throw Error("email exists")
    //             }
    //         })
    //     })
    //
    // } catch (errMsg) {
    //     $("#emailMsg").fadeIn("now").html("<b>This email is already registered! try with different email</b><br>").delay(3000).fadeOut("slow")
    //     $("#newAccount").attr("disabled", true)
    //     return
    // }
    // $("#newAccount").attr("disabled", false)
});

var phone = false;
$(document).on('change', '#phone', function () {
    phone = true;
    modelContext.phone = $(this).val();
//	validateMe($(this))
//  validateFieldRule($(this), "#newAccount")
});
var alocation = false;
$(document).on('change', '#location', function () {
    alocation = true;
    modelContext.location = $(this).val();
});

var agree = false;
$(document).on('checked change', '#agree', function () {
    agree = true;
    if (this.checked) {
        modelContext.terms = true;
    } else {
        modelContext.terms = false;
        modelContext.tries++;
    }
});
//# sourceURL=onboarding_head_onchange.js
