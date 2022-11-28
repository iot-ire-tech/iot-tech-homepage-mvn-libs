/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


provisioningSide:{

    // html += "dbId=" + this.dbId + " "
    // html += "accountId=" + item.accountId + " "
    // html += "productId=" + item.productId + " "
    // html += "couponId=" + item.couponId + " "
    $(document).on("click ", ".subListing", function () {

        nsSubsService.dbId = $("option:selected", this).attr("dbId");
        nsSubsService.accountId = $("option:selected", this).attr("accountId");
        nsSubsService.productId = $("option:selected", this).attr("productId");

        if (nsSubsService.dbId !== undefined) {
            nsSubsService.numberOfMembers = nsSubsService.getByDbId().obj.subscribers.length
            $("#existingSubsMsg").html("<br><span class='w3-tag w3-yellow fadeMsg'>INF: you have " + nsSubsService.numberOfMembers + " members associated with subscription </span>")
        } else
            $("#existingSubsMsg").html("<br><span class='w3-tag w3-yellow fadeMsg'>INF: No subscriptions listed, why not create some below</span>")
    });

    // TODO subscriptions, move to delete sub, which is really entity, to the Entity API
    $(document).on("click ", ".deleteSub", function () {

        if (nsSubsService.dbId.length > 0) {
            $("#msgSubDeleted").html("<span class='w3-tag w3-yellow w3-right'>INF: Subscription model with ID: " + nsSubsService.dbId + " has being removed from customer portal</span>")
            nsSubsService.delete().refreshListing()
        } else {
            $("#msgSubDeleted").html("<span class='w3-tag w3-red w3-right'>INF: You must select a subscription to delete it!</span>")
        }

    })
    ;


    $(document).on('click', '#addSub', function () {
        nsSubsService.items.push(
            {
                "members": [],
                "accountId": "",
                "customerId": "",

                "couponId": nsSubsService.modelItem.couponId,
                "planIds": nsSubsService.modelItem.planIds,
                // name / description of entity
                "title": nsSubsService.modelItem.title,
                "description": nsSubsService.modelItem.description,
// Revenue
                // Trials
                "trialFromPlan": nsSubsService.modelItem.trialFromPlan,
                // Recurring
                "cancelAtPeriodEnd": nsSubsService.modelItem.cancelAtPeriodEnd,
                // Are there others...
                // "collectionMethod": "send_invoice", ....send email
                "collectionMethod": nsSubsService.modelItem.collectionMethod, //... deducted from CC
                "dueDateDays": nsSubsService.modelItem.dueDateDays,

                "applicationFeePercent": nsSubsService.modelItem.applicationFeePercent
            })

        uxReset:{
            $(".subFormElement").each(function () {
                $(this).val("")
            })
            $("#recurring").attr("checked", false)
            $("#recurring").change()
            $(".planListingSubs").val(0)
            $(".couponListing").val(0)

        }
        $("#addSubMsg").after("<br><span class='w3-tag w3-green'>" + nsSubsService.items.length + "# new subscription added....only upon save will it be committed!")
         $(this).attr("disabled", true)
    });

    $(document).on('click', '#saveSub', function () {
        nsSubsService.accountId = accountId
        nsSubsService.couponId = nsCouponsService.couponId
        nsSubsService.isShadowOnly = true
        nsSubsService.create()

        if (nsSubsService.dbId.length > 0) {
            $("#saveSubMsg").html("<br><span class='w3-tag w3-green'>Great a new subscription (" + nsSubsService.dbId + ") has been add to customer membership space")
        } else {
            $("#saveSubMsg").html("Sorry, subscription service is not available at the moment, contact support please")
        }

        $(this).attr("disabled", true)
    });


// Subscription
    $(document).on("change", "#recurring", function () {
        if (this.checked)
            nsSubsService.modelItem.cancelAtPeriodEnd = false
        else
            nsSubsService.modelItem.cancelAtPeriodEnd = true
    });

    $(document).on("change", "#subscriptionName", function () {
        nsSubsService.modelItem.title = $(this).val();
        nsMetaService.modelItem.name = $(this).val();
    });
    $(document).on("change", "#subscriptionDesc", function () {
        nsSubsService.modelItem.description = $(this).val();
        nsMetaService.modelItem.description = $(this).val();
    });

    $(document).on("change", "#collectionMethod", function () {
        nsSubsService.modelItem.collectionMethod = $(this).val();
    });


    $(document).on("change", "#subscriptionVideoLink", function () {
    });


}

function addSubscription() {

    nsSubsService.dbId = $("#addSubscription").attr("dbId")

    remoteCheck:{
        try {
            nsSubsService.getByDbId()

            nsSubsService.obj.subscribers.forEach(function (subscriber) {
                if (subscriber.dbId === nsSubsService.dbId) {
                    // sub found
                    if (subscriber.customerId === customerId) {
                        // customer found
                        throw "Already signed up"
                    }
                }
            });

        } catch (e) {
            $("#msgConfirmation").fadeIn("now")
            $("#msgConfirmation").html("<span class='w3-tag w3-red'>You are already subscribed to this subscription!</span>")
            $("#msgConfirmation").delay(5000).fadeOut("slow");

            return;
        }
    }

//
// Sub for this customer!!!
//
    // TODO subscriptions : Need save customer with its associated account , not just primary!!!! do we not do a customer account switch
    // var customerPrimaryRsp = customerGet({"accountId": accountId, "customerId": customerId})
    // var customerRootToken = customerPrimaryRsp.email // primary customer Id from above  !!!
    // customerRsp = customerFind({"accountId": accountId, "email": customerRootToken}) // Scan accounts for this customer ID!!!
    // subscriptionContextMap.set(nsSubsService.dbId, subscriptionContextItem)

    var publicIndex = $.inArray(nsSubsService.dbId, subEntityIdsShadow)
    if (publicIndex === -1) {
        subEntityIdsShadow.push(nsSubsService.dbId)
        desiredCustomerSubEntityIds.push({
                "accountId": accountId,
                "subId": nsSubsService.dbId,
                "customerId": customerId
            }
        )
        $("#msgConfirmation").fadeIn("now").html("<br><span class='w3-tag w3-yellow'>Adding new subscription to your cart</span>").delay(5000).fadeOut("slow");

    } else {
        $("#msgConfirmation").fadeIn("now").html("<br><span class='w3-tag w3-red'>You have already added this subscription to your cart</span>").delay(5000).fadeOut("slow");

    }

}

function deleteSubscription() {

    nsSubsService.dbId = $("option:selected", this).attr("dbId")
    nsSubsService.delete()

}

function saveSubscription() {
    var counter = 0;
    var errMsgSubServiceNotAvailable = "Subscription service, not available at the moment, contact support asap"
    var errMsgSubServiceCustomerCouponErr = "Subscription service, cannot update customer with coupon, it maybe expired, contact support asap"

    try {

        desiredCustomerSubEntityIds.forEach(function (subEntityMapItem) {
            // Entities Header
            nsSubsService.dbId = subEntityMapItem.subId
            nsSubsService.getByDbId()
            nsSubsService.obj.items.forEach(function (subItem) {
                var justPlanIds = []
                subItem.planIds.forEach(function (id) {
                    justPlanIds.push(id.split(",")[1])
                }.bind(this))

                try {
                    payload = {
                        ...subItem,
                        "accountId": subEntityMapItem.accountId,
                        "customerId": subEntityMapItem.customerId,
                        "planIds": justPlanIds
                    };

                    var subscriptionId = postRequest("SubscriptionAdd", payload).id;
                    if (subscriptionId === undefined) {
                        $("#buySubscriptionMsg").after("<br>Subscription service not available at the moment, contact support asap: (" + subscriptionId + ")")
                        throw Error()
                    }

                    $("#msgConfirmation").fadeIn("now");
                    $("#msgConfirmation").before("<br><span class='w3-tag w3-yellow msgConfirmation'> " + ++counter + "# A new subscription Id (" + subscriptionId + ") has been added to your account: (" + accountId + ")</span>")

                } catch (errMsg) {
                    console.log("ERR: ", errMsgSubServiceNotAvailable)
                    throw Error(errMsgSubServiceNotAvailable)
                }

                // Redeem Counpon
                try {
                    if (subItem.couponId.length > 0)
                        var customerCounpon = customerUpdate({
                            "accountId": accountId,
                            "customerId": customerId,
                            "payload": subItem.couponId
                        })
                } catch (errMsg) {
                    console.log(errMsgSubServiceCustomerCouponErr)
                    throw Error(errMsgSubServiceCustomerCouponErr)
                }

                // members of this subscription
                nsSubsService.obj.subscribers.push({
                    "customerId": customerId,
                    "dbId": nsSubsService.dbId
                })

            }.bind(this)) // Individual Sub Data
            // update entity with subId and its members....
            nsSubsService.update()
            nsSubsService.obj.subscribers = []
        }.bind(this)) // Accumulated Subs

        if (desiredCustomerSubEntityIds.length > 0) {
            // Mail Out
            var mailer = {
                "person": new Person({"email": customerRsp.email}),
                "subscriptionTable": subscriptionsMailHtml(accountId, customerId)
            };
            postRequest("MailCustomerMembership", mailer);
            desiredCustomerSubEntityIds = []
            $(this).attr("disabled", true)
        } else {
            taganalert("#msgConfirmation", "yellow", "You must add subscriptions to your cart first, to purchase them")
        }

    } catch (errMsg) {
        $("#msgError").html(errMsg)

        // Reset Time....

        return
    }
    // Remove once processed

    $(".msgConfirmation").delay(10000).fadeOut("slow");
//	redirectMe2({"alocation": location.origin + contextPath + "/services/modules/stripe/customer/login/release/login.jsp?accountId=" + accountId + "&customerId=" + customerId, "where": "_self"});

}


function cancelSubscription() {
//
// TODO subscription service, invoice_now ; Will generate a final invoice that invoices for any un-invoiced metered usage and new/pending proration invoice items.
// TODO subscription service, prorate, Will generate a proration invoice item that credits remaining unused time until the subscription period end.prototype
    var errMsgStripe = "<br>Payments platform service, subscription service, wasnt able to cancel subscription contact support asap, with this reference"

    nsSubsService.subscriptionId = $(this).attr("id")

    payload = {
        "accountId": accountId,
        "customerId": customerId,
        "subscriptionId": nsSubsService.subscriptionId,
        "invoiceNow": true
    };

    try {
        var subscriptionData = postRequest("SubscriptionCancel", payload);
        $("#msgConfirmation").fadeIn("now").html("<br><span class='w3-tag w3-yellow'>  INF: Your subscription ID : (" + subscriptionData.id + ") has been cancelled</span>").delay(5000).fadeOut("slow")


        // https://stripe.com/docs/api/subscriptions/object#subscription_object-status
        // delete member from suscription store...
        housekeepingSubscriberBase:{
            nsSubsService.getByDbId()
            var reducedMembersList = []
            nsSubsService.obj.subscribers.forEach(function (existingSubs) {
                if (existingSubs.dbId !== nsSubsService.subscriptionId) {
                    reducedMembersList.push({
                            "customerId": existingSubs.customerId,
                            "dbId": existingSubs.dbId
                        }
                    )
                }
            })
            nsSubsService.obj.subscribers = reducedMembersList
            nsSubsService.update()


            $("#dialogSubscriptionMgt").dialog("close");
        }

    } catch (errMsg) {
        $("#msgError").fadeIn("now") // need to to change display:none to display:show
        $("#msgError").html(eval(errMsgStripe))
        $("#msgError").delay(5000).fadeOut("slow")
    }
    // cancelSubscriptionEntity(nsSubsService.subscriptionId)
}

// Web Trigger Event...
function cancelSubscriptionEntity(subId) {
    nsSubsService.subscriptionId = subId
    var errMsgDb = "<br>Data store service, subscription service, wasnt able to cancel subscriber from database,  contact support asap, with this reference"
    // Update entities subscription pool
    try {
        var subscriptionUpdate = getDbRequestXByY("memberships", "subscriptionId", subId)[0];

// Lets remove customer Entry from membership
        var customerIndex = $.inArray(customerId, subscriptionUpdate.members)
        if (customerIndex !== -1) {
            subscriptionUpdate.members.splice(customerIndex, 1)
//			delete	subscriptionUpdate.members[customerId]
            var subscriptionUpdateRsp = putDbRequest("memberships", subscriptionUpdate, subscriptionUpdate._id);
        }
    } catch (errMsg) {
        $("#msgError").html("").fadeIn("now") // need to to change display:none to display:show
        $("#msgError").html(eval(errMsgDb))
        $("#msgError").delay(5000).html("")
    }

}

function primePlansWidgetForThatSub() {

    showedVideo = false
    // query plans associated with sub..
    nsSubsService.dbId = $(this).val()
    nsSubsService.getByDbId()
    numPlans = nsSubsService.obj.items[0].planIds.length


    $("#subMetaHook").html(widgetSubscriptionDetail(nsSubsService.obj))


    var optionsHtml = getSubscriptionPlans(accountId, nsSubsService.obj.items)
    $("#selectPlansHook").html(widgetPlans(optionsHtml))

    // update subscribe buttons
    $("#addSubscription").attr("dbId", nsSubsService.dbId)
    $("#addSubscription").attr("disabled", false)
    $("#buySubscription").attr("disabled", false)


}


function primeCouponsWidgetForThatSub() {
    var subscriptionsProvisioned = {}

    // query subscription for counpon
    nsSubsService.obj.items.forEach(function (subItem) {
        if (subItem.couponId.length > 0) {
            // Alert its presents
            var couponRsp = couponGet(subscriptionsProvisioned.accountId, subscriptionsProvisioned.couponId)
            if ((couponRsp.max_redemptions - couponRsp.times_redeemed) > 0) {
                $("#dialogCouponHook").html(widgetPlansDetailCoupon(couponRsp));
                $("#dialogCoupon").dialog(dialogueProps);
            }
        }
    })

}


clientSide:{

    $(document).on("change", "#selectPlatformAccounts", function () {
        accountId = $(this).val()
        // Switch
        var rsp = confirm("INF: Before switching to a different service provider, click on the \"Add New Subscription\" button below, to include it in your bundle.")
        if (rsp === true) {
            console.log("INF: Old Customer Id " + accountId + "/" + customerId)
            // customerId = switchCustomerAccount(accountId, customerId)
            customerId = customerFind({
                "accountId": accountId,
                "email": customerRsp.email
            }).id
            console.log("INF: New Customer Id " + accountId + "/" + customerId)
            $("#selectAccountsHookMsg").html("Switch customer accounts (" + accountId + "/" + customerId + ")")
        }

    });


    $(document).on("change", "#selectSubscription", primePlansWidgetForThatSub);

    var totalCost = 0
    var subscriptionContextMap = new Map()
    var subEntityIdsShadow = []
    var desiredCustomerSubEntityIds = []
    var addPlan = false;
    // addPlan?
    $(document).on("click", "#addSubscription", addSubscription)
    $(document).on("click", ".deleteSubscription", deleteSubscription)

    // Purchase sub/Signup....
    $(document).on('click', '#buySubscription', saveSubscription)

    $(document).on("click ", '#btnMgtSubscriptions', {"status": "active"}, cancelSubscriptionDialog)

    // one or more subscriptions to cancel
    // features
    $(document).on("click", ".cancelSubscription", cancelSubscription)


}
//# sourceURL=api_subs_events.js


