/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on('click', '#newAccount', function () {

// validation

//	addbusinessPlan !== true
    if (accountType !== true) {
        alert("You must select an account type to complete onboarding process")
        return;
    }
    if (fname !== true || lname !== true || email !== true || phone !== true || alocation !== true || agree !== true) {
        alert("You must fill in all form fields to complete onboarding process")
        return;
    }


    // creat DNS entery

    var dns = {
        "kind": "",
        "name": modelContext.hostname + ".mybusinesspal.com.",
        "ip": "35.242.147.233", // ip addresss of mybusinesspal.com
        "ttl": "300",
        "type": "A"
    }
    var recordNameRsp = postRequest("DnsCreateRecord", dns);
    if (recordNameRsp.status.length > 0)
        console.log("INF: Record created")
    else {
        console.log("ERR: DNS Record not created (" + recordNameRsp.status + ")")
    }


    var addClientRegistration = {
        "businessType": "",
//		"businessPlan": "",
        "accountId": "",
        "customerIdPlatform": "",
        "customerIdConnect": "",
        "ts": new Date().toLocaleString(),
        "customer": "",
        "account": ""
    };
    $(this).attr("disabled", true)

// Create Connect Account - min!
    if (modelContext.terms !== true) {
        alert("INF: Your account cannot be created at the moment, contact support asap")
        return
    }

    var account = {
        ...new ConnectAccount(
            {
                "type": "custom",
                "email": modelContext.email,
                "phone": modelContext.phone,
                "country": modelContext.location,
                "capabilities": ["card_payments", "transfers"]
//					"capabilities": ["card_payments", "transfers", "legacy_payments"]
            })
    };
    var newConnectAccountId = postRequest("AccountCreate", account).id;
    if (newConnectAccountId !== undefined && newConnectAccountId.length > 0) {
        // alert("Congratulations, a new account: " + newConnectAccountId + ", has been enabled.")
        $("#msg").html("Congratulations, your new account Id:" + newConnectAccountId + " has been created")


    } else {
        alert("Apologies, but your account:" + newConnectAccountId + ", has not been enabled. Please contact support asap")
        return;
    }

    // needed for mailer
    var customer = {
        "accountId": newConnectAccountId,
        ...new Customer(
            {
                "person": new Person({
                    "firstName": modelContext.fname,
                    "lastName": modelContext.lname,
                    "email": modelContext.email,
                    "phone": modelContext.phone
                })

            }
        )
    };

    if (false)
        if (newConnectAccountId !== null) {
// Connect Customer
            try {
                customer = {
                    "accountId": newConnectAccountId,
                    ...new Customer(
                        {
                            "person": new Person({
                                "firstName": modelContext.fname,
                                "lastName": modelContext.lname,
                                "email": modelContext.email,
                                "phone": modelContext.phone,
                                "meta": "client"
                            })

                        }
                    )
                    ,
                    "userAccount": new UserAccount({
                        "user": modelContext.email,
                        "pass": modelContext.phone,
                        "role": "admin"
                    })
                    ,
                    "description": "accountholder-" + modelContext.hostname + "-primary"
                };
                customerIdConnect = postRequest("CustomerAdd", customer).id;
            } catch (e) {
                alert("We are sorry, there was an error creating your connect customer, please contact support asap to rectify")
            }

            nsCustomerService.accountId = newConnectAccountId;
            nsCustomerService.customerId = customerIdConnect;
            nsCustomerService.modelItem.type = "primary" // creating account
            nsCustomerService.modelItem.accountId = newConnectAccountId
            nsCustomerService.modelItem.customerId = customerIdConnect
            nsCustomerService.modelItem.person = customer.person;
            nsCustomerService.items.push(nsCustomerService.modelItem)
            nsCustomerService.create();


// Platform Customer
// Add connect customer Id in meta?
            try {
                customer = {
                    ...new Customer(
                        {
                            "person": new Person({
                                "firstName": modelContext.fname,
                                "lastName": modelContext.lname,
                                "email": modelContext.email,
                                "phone": modelContext.phone,
                                "meta": "client"
                            })
                        })
                    ,
                    "userAccount": new UserAccount({
                        "user": modelContext.email,
                        "pass": modelContext.phone,
                        "role": "admin"
                    })
                    ,
                    "entCustomerRef": {
                        "customerId": customerIdConnect,
                        "accountId": newConnectAccountId
                    }
                    ,
                    "description": "accountholder-" + modelContext.hostname + "-platform"
                };
                var customerIdPlatform = postRequest("CustomerAdd", customer).id;
            } catch (e) {
                alert("We are sorry, there was an error creating your platform customer, please contact support asap to rectify")
            }
            nsCustomerService.accountId = "acct_1CBNZCFOjjfpNUIx";
            nsCustomerService.customerId = customerIdPlatform;
            nsCustomerService.modelItem.type = "platform"
            nsCustomerService.modelItem.accountId = "acct_1CBNZCFOjjfpNUIx"
            nsCustomerService.modelItem.customerId = customerIdPlatform
            nsCustomerService.modelItem.person = customer.person;
            nsCustomerService.obj.items.push(nsCustomerService.modelItem)
            nsCustomerService.update();
            // return
        }


    /*
    *
    Billing Model
    *
    */
    nsBillingModelMemberService.modelCreate.accountId = "acct_1CBNZCFOjjfpNUIx"
    nsBillingModelMemberService.modelCreate.loyalty = "new"
    nsBillingModelMemberService.modelCreate.version = "0.1"
    nsBillingModelMemberService.modelItem = {
        "ts": new Date().toISOString(),
        "accountId": newConnectAccountId
    };
// nsBillingModelMemberService.modelItem = newConnectAccountId
    nsBillingModelMemberService.accountId = "acct_1CBNZCFOjjfpNUIx"
    nsBillingModelMemberService.service()

    /*
      *
      Options Model
      *
      */
    updateOptionsModel:{
        nsOptionsMemberModelService.modelCreate.level = "basic"
        nsOptionsMemberModelService.modelCreate.accountId = "acct_1CBNZCFOjjfpNUIx"
        nsOptionsMemberModelService.modelCreate.version = "0.1"
        nsOptionsMemberModelService.modelItem = {
            "ts": new Date().toISOString(),
            "accountId": newConnectAccountId // new acount
        };
        nsOptionsMemberModelService.modelCreate.items.push(nsOptionsMemberModelService.modelItem)

        // need for get account
        nsOptionsMemberModelService.modelQuery = {
            "accountId": "acct_1CBNZCFOjjfpNUIx",
            "level": nsOptionsMemberModelService.modelCreate.level,
            "version": "0.1"
        }
        nsOptionsMemberModelService.service()

    }

    featureToggleAccountMembers:{
        sut = nsPrimaryAccountMembersService;
        // Every new primary account gets a record entry
        // this record will be updated as community grows!

        try {
            if (hostId == "") {
                // dont want to create if not primary
                sut.modelCreate.accountId = newConnectAccountId
                sut.create()
            }
        } catch (e) {
            alert("INF: contact support asap, your account relationship db needs updating.")
            return
        }

        try {
            if (hostId.length > 0) {
                console.log("Adding invitee " + newConnectAccountId + " to host " + hostId + " list")
                // addAccountToPrimary(hostId, newConnectAccountId)
                // get host record entry
                sut.modelQuery = {
                    "platformId": platformId,
                    "accountId": hostId
                };
                sut.getByQuery()

                // will always add members with default status
                sut.obj.items.push({
                    "ts": new Date().toISOString(),
                    "payments": false,
                    "payouts": false,
                    "accountId": newConnectAccountId
                })
                sut.update()
            }
        } catch (e) {
            alert("INF: contact support asap, your account relationship invitee db needs updating.")
            return
        }

    }

// Mail Out
    addClientRegistration = {
        "businessType": modelContext.accountType,
//		"businessPlan": modelContext.businessPlan,
        "hostname": modelContext.hostname,
        "primaryId": hostId,
        "accountId": newConnectAccountId,
        // "customerId": customerIdConnect,
        // "customerIdPlatform": customerIdPlatform,
        // "customerIdConnect": customerIdConnect,
        "customer": customer,
        "ts": new Date().toLocaleString(),
        "account": account
    };
    postRequest("MailerAccountRegistration", addClientRegistration);
    $("#msg").append("<br>You will receive email shortly, follow steps in order.")
    console.log("INF: Registration Complete, check your email for details")

  //  redirectMe2({"alocation": location.origin + contextPath + "/index.jsp", "where": "_self", "delay": 20000});
})
;

// if (location.origin.toString().includes("localhost")) {
//     document.write("//# sourceURL=onboarding_head_ctrl.js");
// }
//# sourceURL=onboarding_head_ctrl.js

