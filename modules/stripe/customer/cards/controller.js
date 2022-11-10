/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on('click', '#save', function () {

    var tokenId = {};
    var customerRsp = {}
    if (backFillCustomerNewAccountMode) {
        // get customer
        var existingCustomerRsp = customerGet({"accountId": primaryId, "customerId": customerId})
        // creeate shadow customer on new account

        var newCustomer = customerCopy(existingCustomerRsp, accountId)
        // Add Payment to customer
        tokenId = addPaymentSource(nsCustomerService.modelItem.card, newCustomer.id, accountId)
        // Update customerMembershipt with new spawn account

        var customerAccountListingsRsp = getDbRequestId("relationship-customer-accounts", dbId);
        customerAccountListingsRsp.accountIds.push(accountId)
        putDbRequest("relationship-customer-accounts", customerAccountListingsRsp, dbId)

        // Mailer
        customerRsp = customerGet({"accountId": accountId, "customerId": newCustomer.id})
    } else {
        // Add Payment to customer
        tokenId = addPaymentSource(nsCustomerService.modelItem.card, customerId, accountId)
        // Mailer
        customerRsp = customerGet({"accountId": accountId, "customerId": customerId})
    }


// Test Is Source
// Mail Out
    var mailer = {
        ...nsCustomerService.modelItem.card,
        "customerId": customerRsp.id,
        "tokenId": tokenId,
        "person": {
            "email": customerRsp.email
        }
    };
    postRequest("MailerCustomerPaymentsCard", mailer);
    console.log("INF: Payments Card Complete")

    $(this).attr("disabled", true)


});

if (contextPath.includes("local")) {
//# sourceURL=customer_card_ctrl.js
}


