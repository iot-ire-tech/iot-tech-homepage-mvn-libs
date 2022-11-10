var parsedUrl = new URL(window.location.href);

// Targeted Account
var accountId = parsedUrl.searchParams.get("accountId");
// need for redirect purpose
var accountIdP = parsedUrl.searchParams.get("accountIdP");
var accountIdC = parsedUrl.searchParams.get("accountIdC");


var aslideShow = new slideShowFunc();


$(window).ready(function () {

    featureToggleAccountMembers:{
        // check#1: is account compliant
        if (getAccountCompliance(accountId)) {
            // update account model
            sut = nsPrimaryAccountMembersService;
            sut.modelQuery = {
                "platformId": platformId,
                "accountId": accountIdP
            };
            sut.getByQuery()
            // Is this account/random account on the invite list!
            // if yes it will be found and updated
            // every where!
            sut.obj.forEach(function (accountMemberRecord) {
                accountMemberRecord.items.forEach(function (memberItem) {
                    if (memberItem.accountId === accountId) {
                        memberItem.payouts = true
                    }
                }.bind(this));
                accountMemberRecord.items.forEach(function (memberItem) {
                    if (memberItem.accountId === accountId) {
                        memberItem.payments = true
                    }
                }.bind(this));

                // update needed.
                sut.dbId = accountMemberRecord._id
                sut.obj = accountMemberRecord
                sut.update()

            }.bind(this))
            // nsPrimaryAccountMembersService.update()
        }
    }

    // reduemntation
    var accountRsp = getAccount(accountId);
    if (accountRsp.charges_enabled === true) {

        var bizName = accountDetails(accountId).business_profile.name;
        if (bizName === null) {
            $("#primaryAccountOwner")
                .attr("style", "width:40%")
                .addClass("w3-container w3-yellow")
                .html(
                    "<span><b>Account:" + accountId + " is not fully registered<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
                )
            // $("#btnAuthenticate").attr("disabled", true)
        } else
            $("#primaryAccountOwner").html("<b>" + bizName + "<b>")
    } else {
        $("#primaryAccountOwner")
            .attr("style", "width:40%")
            .addClass("w3-container w3-yellow")
            .html(
                // "<span><b>Account:" + accountId + " n set, complete registration below<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
                "<span><b>Account:" + accountId + " is not fully registered<br>Contact support if you are not sure what to do<br>Until then you cannot accept payments from customers<b></span>"
            )
    }


    //  Bank account is where customer payments will land, and subsription services, is the payment plan you wish to sign up to.


    var orderWidget = setInterval(function () {
        clearInterval(orderWidget)
        if (window.location.pathname.includes("onboarding")) {
            var uxWidgetOrdered = new widgetOrdered();
            $("#orderHook").html(uxWidgetOrdered.init(
                "Banking", "Designate a bank account where customers will pay into!",
                "Registration", "In order for payments to be processed you need to complete this. Only  then will you be live",
                "Status", "Check registration status regularly, until its green."
            ))

        }


    }, 1000)


    var accountReqs = setInterval(function () {
        clearInterval(accountReqs)
        var status = getAccountRequirementsStatus(accountId)
        if (status.eventually_due === false && status.currently_due === false && status.pending_verification === false) {
            // job done, can disable
            $(".onboarding").each(function (index) {
                $(this).attr("disabled", true)
            })

        }

        // can we create new account!!!
        var accountStatus = getAccount(accountId)
        if (accountStatus.charges_enabled)
            $("#newUser").attr("disabled", false)

    }, 2000)


    var uxBuinessMenuWidget = new UxClientSubscriptionMenuWidget();
    uxLoad("#menuBarHook", uxBuinessMenuWidget.init())

});

//# sourceURL=client_onboarding_init.js
