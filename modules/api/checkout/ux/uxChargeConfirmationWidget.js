/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function checkOutModal(aemail, cost, fees, taxes, discounts, shoppingTotal) {
    var productId = ""
    var accountId = ""
    var customerName = ""
    var email = "tonyennis@yahoo.com"
    var email = aemail
    var cost = cost
    var html = ""


    html += "<div class='w3-container w3-center'>"
    html += "<h3>Your account provider, thanks your for your purchase! </h3>"
    html += "<h6>Summary Details Below</h6>"
    html += "<br>"
    html += "<br>"
    html += "<span>Taxes: <span class='fa fa-euro' style='font-size:12px;color:green'></span>" + taxes + "</span>"
    html += "<br>"
    html += "<span>Fees: <span class='fa fa-euro' style='font-size:12px;color:green'></span>" + fees + " </span>"
    html += "<br>"
    html += "<span>Discounts: <span class='fa fa-euro' style='font-size:12px;color:green'></span>" + discounts + "</span>"
    html += "<br>"
    html += "<span>Transactions:  <span class='fa fa-euro' style='font-size:12px;color:green'></span>" + cost + " </span>"
    html += "<hr>"
    html += "<span>Amount Due:  <span class='fa fa-euro' style='font-size:12px;color:green'></span>" + shoppingTotal + "</span>"
    html += "<br>"
    html += "<br>"
    html += "<span>Email Receipt Sent To : " + email + "</span>"

    html += "</div>"
    html += "<br>"

    $("#dialogCheckoutHook").html(html);
    $("#dialogCheckout").dialog(dialogueProps);


}

$(document).on("click ", '.btnContactMeClose', function () {
    $("#dialogFollowMe").dialog("close");
});

