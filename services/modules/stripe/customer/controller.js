/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// https://stripe.com/docs/api/tokens/create_person
//
var cardGiven = true
var bankGiven = false
$(document).on('click', '#saveCustomer', function () {

// Get All accounts
// Seed new customer across existing account.
// With Payment source ;
    try {
        var customerIdC;
        var customerIdP;
        var dynamicTokenId = "";
        if (originId === "dashboard")
            nsCustomerService.modelCreate.role = "cfo"
        else
            nsCustomerService.modelCreate.role = "member"

        platformCustomerCreation:{
            ms1:{
                nsCustomerService.accountId = platformId;
                nsCustomerService.modelItem.accountId = platformId
                nsCustomerService.modelItem.description = "primary-" + accountId
                nsCustomerService.modelItem.type = "platform"
                var customerRsp = postRequest("CustomerAdd", nsCustomerService.modelItem);
                checkBadResponse(customerRsp, "INF: Cannot add platform customer (" + JSON.stringify(nsCustomerService.modelItem) + ")")
                // Pass New Customer Id To Card Source
                nsCustomerService.customerId = customerRsp.id
                nsCustomerService.modelItem.customerId = customerRsp.id
                var customerWithActivePaymentSource = customerRsp.id
            }
            addActivePaymentSource:{
                var tokenId = addPaymentSource(nsCustomerService.modelItem.card, customerRsp.id, "")
                nsCustomerService.modelItem.tokenId = tokenId
            }
            nsCustomerService.items.push(nsCustomerService.modelItem)
            nsCustomerService.create();


            housekeeping : {
                // nsCustomerService.items = []
                nsCustomerService.modelItem.tokenId = ""
                nsCustomerService.modelItem.customerId = ""
            }

        }

        PrimaryCustomerCreation:{
            ms1:{
                if (originId === "dashboard")
                    nsCustomerService.modelItem.role = "cfo"
                else
                    nsCustomerService.modelItem.role = "member"

                nsCustomerService.accountId = accountId;
                nsCustomerService.modelItem.accountId = accountId
                nsCustomerService.modelItem.description = "primary"
                nsCustomerService.modelItem.type = "primary"
                customerRsp = postRequest("CustomerAdd", nsCustomerService.modelItem);
                checkBadResponse(customerRsp, "INF: Cannot add platform customer (" + JSON.stringify(nsCustomerService.modelItem) + ")")
                // Pass New Customer Id To Card Source
                nsCustomerService.modelItem.customerId = customerRsp.id
            }
            ms1:{
                if (cardGiven) {
                    var dynamicTokenId = getCustomerConnectCardToken(customerWithActivePaymentSource, accountId)
                    nsCustomerService.modelItem.tokenId = dynamicTokenId
                    attachTokenConnectCustomer(customerRsp.id, accountId, dynamicTokenId)
                }
            }
            ms1:{
                // var customerAccountListingsRsp = getDbRequestId("relationship-customer-accounts", dbId);
                // customerAccountListingsRsp.accountIds.push(accountId)
                // putDbRequest("relationship-customer-accounts", customerAccountListingsRsp, dbId)
            }
            nsCustomerService.modelQuery = {
                "accountId": platformId,
                "customerId": customerWithActivePaymentSource
            }
            nsCustomerService.getByQuery()
            nsCustomerService.obj.forEach(function (nsCustomerServiceRec) {

                nsCustomerServiceRec.items.push({
                    "type": nsCustomerService.modelItem.type,
                    "description": nsCustomerService.modelItem.description,
                    "ts": getTs(),
                    "accountId": nsCustomerService.modelItem.accountId,
                    "customerId": nsCustomerService.modelItem.customerId,
                    "tokenId": nsCustomerService.modelItem.tokenId,
                    "person": {
                        "email": nsCustomerService.modelItem.person.email,
                        "phone": nsCustomerService.modelItem.person.phone
                    },
                })

                nsCustomerService.dbId = nsCustomerServiceRec._id
                nsCustomerService.obj = nsCustomerServiceRec
                nsCustomerService.update();
            }.bind(this))

            var mailer = {
                "accountId": accountId,
                "customerId": customerRsp.id,
                ...nsCustomerService.modelItem
            };
            postRequest("AddUserRegistrationMail", mailer);
            console.log("INF: Customer Connect Creation Complete")

            housekeeping : {
                // nsCustomerService.items = []
                nsCustomerService.modelItem.tokenId = ""
                nsCustomerService.modelItem.customerId = ""
            }

        }

//////////////////////
//  Forward Fill
//////////////////////
        ms1: {
            connectAccountsIfExist: {
                // primaryAccountFamilyList = getAccountListing(accountId)
                // primaryAccountFamilyList.push(accountId)
                nsPrimaryAccountMembersService.modelQuery = {
                    "platformId": platformId,
                    "accountId": accountId
                };
                try {
                    nsPrimaryAccountMembersService.getCompliantAccounts()
                } catch (e) {
                    // affilate member is trying something?
                }
            }
        }
        // propagaing and payment cloning
        ms1:{
            nsPrimaryAccountMembersService.accountIds.forEach(function (itemAccountId) {
                ms1:{
                    if (originId === "dashboard")
                        nsCustomerService.role = "cfo"
                    else
                        nsCustomerService.role = "member"

                    // might consider adding fingerprint into the mix
                    nsCustomerService.modelItem.accountId = itemAccountId
                    nsCustomerService.modelItem.type = "partner"
                    nsCustomerService.modelItem.description = "partner-Primary:" + accountId + "/Partner:" + itemAccountId
                    customerRsp = postRequest("CustomerAdd", nsCustomerService.modelItem)
                    checkBadResponse(customerRsp, "INF: Cannot add connect customer (" + JSON.stringify(nsCustomerService.modelItem) + ")")
                    nsCustomerService.modelItem.customerId = customerRsp.id
                }
                attachPaymentSource:{
                    dynamicTokenId = getCustomerConnectCardToken(customerWithActivePaymentSource, itemAccountId)
                    nsCustomerService.modelItem.tokenId = dynamicTokenId
                    attachTokenConnectCustomer(customerRsp.id, nsCustomerService.modelItem.accountId, dynamicTokenId)
                }
                nsCustomerService.obj.items.push(
                    {
                        "type": nsCustomerService.modelItem.type,
                        "description": nsCustomerService.modelItem.description,
                        "ts": getTs(),
                        "accountId": nsCustomerService.modelItem.accountId,
                        "customerId": nsCustomerService.modelItem.customerId,
                        "tokenId": nsCustomerService.modelItem.tokenId,
                        "person": {
                            "email": nsCustomerService.modelItem.person.email,
                            "phone": nsCustomerService.modelItem.person.phone
                        },
                    }
                )
                nsCustomerService.update();
            }.bind(this));
        }


    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
        return;
    }

    $(this).attr("disabled", true)


});


//# sourceURL=customer_ctrl.js
