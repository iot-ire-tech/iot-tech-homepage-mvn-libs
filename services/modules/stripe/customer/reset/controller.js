/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// https://stripe.com/docs/api/tokens/create_person
//
$(document).on('click', '#emailSend', function () {

    try {
        var mailer = {
            "accountId": accountId,
            "person": nsCustomerService.modelItem.person
        };
        postRequest("CustomerResetFirstFactor", mailer);

        var html = ""
        html = "<div class='w3-center w3-border w3-yellow'>"
        html += "<span>An reset email has been sent to following address <br>username: " + nsCustomerService.modelItem.person.email + "</span>"
        html += "</div>"

        $("#comfirmationMsg").html(html)

    } catch (e) {
        var err = "Customer Reset Error, contact support asap"
        $("#comfirmationMsg").html(err)
        console.error("INF: " + err)
    }

    $(this).attr("disabled", true)

});

$(document).on('click', '#passwordChange', function () {

    try {
        // Platform account search
        var customerRsp = customerFind({"accountId": platformId, "email": email})
        nsCustomerService.accountId = accountId
        nsCustomerService.modelQuery = {
            "accountId": platformId,
            "customerId": customerRsp.id
        }

        // make update
        nsCustomerService.username = email; // derived at init!
        nsCustomerService.password = nsCustomerService.modelItem.person.phone;
        nsCustomerService.newpassword = newPassword;
        if (nsCustomerService.getAccountByEmail()) {
            nsCustomerService.update()
        }

        nsCustomerService.modelItem.person.email = email
        var mailer = {
            "accountId": accountId,
            "person": nsCustomerService.modelItem.person
        };
        postRequest("CustomerPasswordReset", mailer);

        var html = ""
        html = "<div class='w3-center w3-border w3-yellow'>"
        html += "<span>Congratulations, your user account has been updated as follows <br>New Password: " + nsCustomerService.modelItem.person.phone + "</span>"
        html += "</div>"

        $("#comfirmationMsg").html(html)

    } catch (e) {
        var err = "Customer Reset Error, contact support asap"
        $("#comfirmationMsg").html(err)
        console.error("INF: " + err)
    }

    $(this).attr("disabled", true)

});
//# sourceURL=customer_reset_ctrl.js
