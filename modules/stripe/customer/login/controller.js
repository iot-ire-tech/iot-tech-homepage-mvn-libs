/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var uxSpinner = "<div class=\"ui segment\">"
uxSpinner = ""
uxSpinner += "<div class=\"ui active inverted dimmer\">"
uxSpinner += "<div class=\"ui indeterminate massive text loader\">"
uxSpinner += "<br>"
uxSpinner += "<br>"
uxSpinner += "Authenticating..."
uxSpinner += "<br>"
uxSpinner += "<br>"
uxSpinner += "</div>"
uxSpinner += "</div>"
//uxSpinner += "</div>"

var customerId = ""
var customerRsp = {}
var authenticated = false;
var addCustomerAccountSpawning = false;
$(document).on('click', '#btnAuthenticate', function () {


    try {
        var isChecked = false
        $("input[name=offering]").each(function () {
//			isChecked = $(this).val()
            if ($(this).is(':checked'))
                isChecked = true
        })
        if (!isChecked) {
            taganalert("#msgWelcome", "yellow", "You must select an offering before proceeding")
            throw Error("offering must be selected")
        }

        resetLoginUx()


        letsAuthenticate:{

            // platfrom is were its at
            nsCustomerService.accountId = platformId
            nsCustomerService.getAccount()

            // is this account a primary
            nsCustomerService.username = modelContext.userAccount.user
            nsCustomerService.password = modelContext.userAccount.pass
            nsCustomerService.authenticate()

            if (nsCustomerService.isAuthenticated && nsCustomerService.isPlatformCustomer && nsCustomerService.isPrimaryCustomer) {
                customerId = nsCustomerService.customerId // primary
                // accountIdP = nsCustomerService.accountIdP // primary
                customerIdP = nsCustomerService.customerIdP // Platform
                customerRsp = customerGet({"accountId": accountIdP, "customerId": customerId})
                customerRspP = customerGet({"accountId": platformId, "customerId": customerIdP})

                Logaccess:{
                    nsAuthenticationService.accountId = accountId
                    nsAuthenticationService.customerId = customerId
                    nsAuthenticationService.modelItem = {
                        "ts": new Date().toISOString(),
                        "type": "login",
                        "offering": modelContext.offering,
                        "username": nsAuthenticationService.modelItem.username,
                        "password": nsAuthenticationService.modelItem.password,
                        "role": "user"
                    }
                    nsAuthenticationService.service()
                }

                $(this).attr("disabled", true)
                $("#msgAlerts").html("")
                var welecomeMsg = "<div class=w3-center>"
                welecomeMsg += "<br><br><span>Welcome, " + customerRsp.name + ", your account was found! <br>CustomerId: " + customerRsp.id + "<br>redirecting you shortly!</span><br><br>"
                welecomeMsg += "</div>"
                $("#msgWelcome").html(welecomeMsg)
            } else {
                setTimeout(function () {
                    $("#uxLoading").html("")
                }, 3000)
                $("#msgWelcome").html("")
                $("#msgAlerts")
                    .html("<hr>Sorry we couldnt find a customer with account details <br>user: " +
                        modelContext.userAccount.user +
                        "<br>password: " +
                        modelContext.userAccount.pass +
                        "<br>please try again, if this persists, contact support."
                    )
                return
            }
        }

        stopSpinner(1000)

        if (!window.location.href.includes("onboarding.jsp"))
            CustomerTn_minus_1: {
                // var accountIds = getAccountListing(accountId);
                nsPrimaryAccountMembersService.modelQuery = {
                    "platformId": platformId,
                    "accountId": accountIdP
                };
                try {
                    nsPrimaryAccountMembersService.getCompliantAccounts()
                } catch (e) {
                    // affilate member is trying something?
                }
                nsPrimaryAccountMembersService.accountIds.forEach(function name(itemAccountId) {
                    // Method#1 query if my username existings on this account?
                    var customerFindRsp = customerFind({
                        "accountId": itemAccountId,
                        "email": nsCustomerService.username
                    })
                    // new custoemr!
                    if (jQuery.isEmptyObject(customerFindRsp)) {
                        // ms: create customer on new account
                        nsCustomerService.accountId = itemAccountId;
                        nsCustomerService.modelItem.accountId = itemAccountId
                        nsCustomerService.modelItem.description = "partner-tn_1"
                        nsCustomerService.modelItem.type = "partner"

                        // Customer Platform
                        nsCustomerService.modelItem.person.fullName = customerRspP.name
                        nsCustomerService.modelItem.person.email = customerRspP.email
                        nsCustomerService.modelItem.person.phone = customerRspP.phone
                        var newCustomerRsp = postRequest("CustomerAdd", nsCustomerService.modelItem);
                        checkBadResponse(newCustomerRsp, "INF: Cannot add platform customer (" + JSON.stringify(nsCustomerService.modelItem) + ")")

                        // ms: clone payment!
                        var dynamicTokenId = getCustomerConnectCardToken(nsCustomerService.customerIdP, itemAccountId)
                        attachTokenConnectCustomer(newCustomerRsp.id, itemAccountId, dynamicTokenId)

                        // ms: update customer db
                        nsCustomerService.modelQuery = {
                            "accountId": "acct_1CBNZCFOjjfpNUIx",
                            "customerId": customerIdP
                        }
                        nsCustomerService.getByQuery()
                        nsCustomerService.obj.items.push({
                            "type": "partner",
                            "description": "tn_1 update",
                            "ts": getTs(),
                            "accountId": itemAccountId,
                            "customerId": newCustomerRsp.id,
                            "tokenId": dynamicTokenId
                        })
                        nsCustomerService.update();

                    } else {
                        // existing customer....
                        // no payment sources...
                        if (customerFindRsp.sources.data.length === 0) {
                            // ??? must have an active source to generate token??
                            // var dynamicTokenId = getCustomerConnectCardToken(nsCustomerService.customerIdP, itemAccountId)
                            // attachTokenConnectCustomer(newCustomerRsp.id, itemAccountId, dynamicTokenId)
                        } else if (customerFindRsp.sources.data.length > 0) {
                            // cc // bank
                        }
                    }
                }.bind(this))

            }


// If Home Page Goto
        loginNavi()
        //


    } catch
        (errMsg) {
        // alert(errMsg)
        resetLoginUx();
        console.log(errMsg)
    }
})
;


function loginNavi() {

    // Invitee mode
    if (accountIdC === "") {
        url = "/services/modules/stripe/billing/product/release/store/portal.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountId + "&" +
            "accountIdC=&" +
            "customerId=" + customerId + "&" +
            "originId=" + modelContext.offering
    } else {
        url = "/services/modules/stripe/billing/product/release/store/portal.jsp?" +
            "accountId=" + accountId + "&" +
            "accountIdP=" + accountIdP + "&" +
            "accountIdC=" + accountId + "&" +
            "customerId=" + customerId + "&" +
            "originId=" + modelContext.offering
    }


    if (modelContext.offering === "assetAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })


    } else if (modelContext.offering === "shopAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "messagingAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })

    } else if (modelContext.offering === "eventsAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });

    } else if (modelContext.offering === "activitiesAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });
    } else if (modelContext.offering === "membershipAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });
    } else if (modelContext.offering === "videohubAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });

    } else if (modelContext.offering === "webinarAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "covidAdmin") {

        if (accountIdC === "") {
            url = "/services/modules/business/tracing/release/backend.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/tracing/release/backend.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })

    }

    /*
    Analytics
     */


    if (modelContext.offering === "analyticsCustomerAdmin") {

        if (accountIdC === "") {
            url = "/services/modules/business/analytics/release/customer.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/analytics/release/customer.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })

    } else if (modelContext.offering === "analyticsRevAdmin") {

        if (accountIdC === "") {
            url = "/services/modules/business/analytics/release/revenue.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/analytics/release/revenue.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })

    } else if (modelContext.offering === "analyticsSecAdmin") {

        if (accountIdC === "") {
            url = "/services/modules/business/analytics/release/security.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/analytics/release/security.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        })
    }


    /*

  Business - Front End

   */


    if (modelContext.offering === "covid") {
        if (accountIdC === "") {
            url = "/services/modules/business/tracing/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/tracing/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }

        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });
    }


    if (modelContext.offering === "store") {
        if (accountIdC === "") {
            url = "/services/modules/business/store/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/store/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "events") {

        if (accountIdC === "") {
            url = "/services/modules/business/events/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/events/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });

    } else if (modelContext.offering === "activities") {

        if (accountIdC === "") {
            url = "/services/modules/business/activity/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/activity/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });

    } else if (modelContext.offering === "membership") {

        if (accountIdC === "") {
            url = "/services/modules/business/subscriptions/release/signup.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/subscriptions/release/signup.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "videoHub") {

        if (accountIdC === "") {
            url = "/services/modules/business/videohub/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/videohub/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "webinarHub") {

        if (accountIdC === "") {
            url = "/services/modules/business/webinars/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountId + "&" +
                "accountIdC=&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        } else {
            url = "/services/modules/business/webinars/release/portal.jsp?" +
                "accountId=" + accountId + "&" +
                "accountIdP=" + accountIdP + "&" +
                "accountIdC=" + accountId + "&" +
                "customerId=" + customerId + "&" +
                "originId=" + modelContext.offering
        }
        redirectMe2({
            "alocation": location.origin + contextPath + url, "where": "_self"
        });


    } else if (modelContext.offering === "businessInviteAdmin") {


        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/stripe/connectaccount/head/release/signup.jsp?hostId=" + accountId,
            "where": "_self"
        });

    }

    if (modelContext.offering === "brandingAdmin") {
        redirectMe2({
            "alocation": location.origin + contextPath + "/services/modules/api/branding/release/branding.jsp?accountId=" + accountId + "&customerId=" + customerId + "&originId=" + modelContext.offering,
            "where":
                "_self"

        })
    }


}

function stopSpinner(timeout) {
    var to = setTimeout(function () {
        clearTimeout(to)
        $("#uxLoading").html("")
    }, timeout)
}

function resetLoginUx() {

    stopSpinner(1000)
    $("#uxLoading").html(uxSpinner)
    $("#msgAlerts").html("")
    $("#msgWelcome").html("")

}

//# sourceURL=customer_login_ctrl.js