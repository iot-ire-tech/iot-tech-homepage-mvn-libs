/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function addPaymentSource(modelContext, customerId, accountId) {

    try {
// User Data / Create Token
        if (accountId !== "")
            var card = {
                "accountId": accountId,
                ...modelContext
            };
        else
            var card = {
                ...modelContext
            };

        var tokenRsp = postRequest("AddTokenCard", card);
        var tokenId = tokenRsp.id;
        checkBadResponse(tokenRsp, "<br>Card Error, Customer with ID: " + customerId + " could not attach token Id:" + tokenId + ", contact support asap")


// From Token Create.....Payment Source
        if (accountId !== "")
            var source = {
                "accountId": accountId,
                "customerId": customerId,
                "tokenId": tokenId
            };
        else
            var source = {
                "customerId": customerId,
                "tokenId": tokenId
            };
        customerRsp = postRequest("CustomerSourceAdd", source);
        customerId = customerRsp.id;
        checkBadResponse(customerRsp, "<br>Card Source Error, Customer with ID: " + customerId + " could not attach token Id:" + tokenId + " , contact support asap")

        $("#msgConfirmation").after("<br>New Customer with ID: " + customerId)

    } catch (errMsg) {
        alert(errMsg)
        $("#msgConfirmation").html(errMsg)
        console.log(errMsg)
        return;
    }

    return tokenId
}

function addPaymentSourceBank(modelContext, customerId, accountId) {


    //
    // ERR: Error Message: This Custom account cannot currently make live charges. The `requirements.disabled_reason` property on the account will provide information about why this account is currently disabled. If you are a customer trying to make a purchase, please contact the owner of this site. Your transaction has not been processed.; code: testmode_charges_only; request-id: req_JSnYm73SmkZtV6
    //
    try {
// User Data / Create Token
        bankToken: {
            var token = {
                "accountId": item.accountId,
                ...new Bank({
                    "accountNumber": "IE71IPBS99062612653802",
                    "country": "IE",
                    "accountHolderType": "individual",
                    "accountHolderName": "Anto Who"
                }),
                "transaction": {"currency": "eur"}
            }
            var tokenRsp = postRequest("AddTokenBankSepa", card);
            var tokenId = tokenRsp.id;
            checkBadResponse(tokenRsp, "<br>Banking Error, Customer with ID: " + customerId + " could not attach token Id:" + tokenId + ", contact support asap")
        }

// From Token Create.....Payment Source
        if (accountId !== null)
            var source = {
                "accountId": accountId,
                "customerId": customerId,
                "tokenId": tokenId
            };
        else
            var source = {
                "customerId": customerId,
                "tokenId": tokenId
            };
        customerRsp = postRequest("CustomerSourceAdd", source);
        customerId = customerRsp.id;
        checkBadResponse(customerRsp, "<br>Banking Source Error, Customer with ID: " + customerId + " could not attach token Id:" + tokenId + " , contact support asap")

        $("#msgConfirmation").after("<br>Banking Source ,Customer with ID: " + customerId + ", has new card attached with ID:" + tokenId)

    } catch (errMsg) {
        alert(errMsg)
        $("#msgConfirmation").html(errMsg)
        console.log(errMsg)
        return;
    }

    return tokenId
}

//# sourceURL=customer_card_service.js
