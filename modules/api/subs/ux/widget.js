var uxSubsWidget = function () {
    this.counter = 0;
    this.dataMap = new Map();
    this.addInit = false;

    this.init = function () {
        this.counter++;

        this.html = ''
        // collect entity name and sub name
        this.html += '<fieldset>'
        this.html += '<legend><b>Subscription Profile</b></legend>'
        this.html += '<label><b>Alias</b></label>'
        this.html += '<input id="subscriptionName" class="w3-input w3-hover-grey name subFormElement" type="text" required title="This is the title the customer will see, make it stand out!"/> <br>'
        this.html += '<label><b>Description</b></label>'
        this.html += '<br>'
        this.html += '<input id="subscriptionDesc" class="w3-input w3-hover-grey description subFormElement" type="text" required title="This is the title the customer will see, make it stand out!"/> <br>'
        this.html += '<br>'
        this.html += '<span class="w3-tag w3-yellow w3-right addMetaSubscriptionMsg" ></span>'
        this.html += '<br>'
        this.html += '<button class="w3-button w3-round w3-blue w3-right w3-padding addMetaSubscription">Add</button>'
        this.html += '</fieldset>'
        this.html += '<br>'

        this.html += '<fieldset>'
        this.html += '<legend><b>Revenue</b></legend>'
        this.html += '<label><b>Add Coupon [optional]</b></label>'
        this.html += '<span class="existingCouponsHook"></span>'
        this.html += '<br>'
        this.html += '<span id="couponSelectionMsg"></span>'

        this.html += '<br>'

        this.html += '<label><b>Add plans</b></label>'
        this.html += '<br>'
        this.html += '<span>Insight: Create subscriptions with sensible pricing plans that target customer groups!</span>'
        this.html += '<br>'
        this.html += '<span class="existingPlansHook"></span>'
        this.html += '<br>'
        this.html += '<span id="msgErrorPlanSelection"></span>'

        // Subs
        this.html += '<label><b>Recurring Subscription</label></b> <br>'
        this.html += '<input id=recurring class="w3-input w3-hover-grey subFormElement" checked type="checkbox" required title="Good business sense cyclic revenue stream!"/> '

        this.html += '<br>'
        this.html += '<label><b>Payment Method</label></b> <br>'
        this.html += '<select class="w3-select subFormElement" size=4 id="collectionMethod" >'
        this.html += '<option disabled >Please Select</option>'
        this.html += '<option value=send_invoice>Email Invoice</option>'
        this.html += '<option value=charge_automatically>Automatic Charge</option>'
        this.html += '</select>'

        this.html += '<br>'
        this.html += '<br>'
        if (false) {
            this.html += '            <div class="w3-row">'
            this.html += '            <div class="w3-half">'
            this.html += '      <div class="w3-center">'
            this.html += '      <span id="addSubMsg" ></span>'
            this.html += '            </div>'
            this.html += '      <button id="addSub" class="w3-button w3-round w3-blue  w3-padding w3-left ">Add New Subscription</button>'
            this.html += '            </div>'
            this.html += '            <div class="w3-half">'
            this.html += '      <div class="w3-center">'
            this.html += '      <span id="saveSubMsg" ></span>'
            this.html += '            </div>'
            this.html += '      <button id="saveSub" class="w3-button w3-round w3-blue  w3-padding w3-right ">Save</button>'
            this.html += '            </div>'
            this.html += '            </div>'

        }
        this.html += '      <div class="w3-center">'
        this.html += '      <span id="addSubMsg" ></span>'
        this.html += '      </div>'
        this.html += '      <button id="addSub" class="w3-button w3-round w3-blue  w3-padding w3-right ">Add</button>'
        this.html += '      </div>'
        this.html += '      </div>'

        this.html += '</fieldset>'

        return this.html;
    }
};


clientSide:{


    var subCost = 0

    function getSubscriptionPlans(accountId, subs) {
        // subCost = 0
        var html = ""
        // accountId: "acct_1GRdJxF6KR5nnzB2"
        // applicationFeePercent: 5
        // cancelAtPeriodEnd: false
        // collectionMethod: "send_invoice"
        // couponId: "DhjSEvKC"
        // customerId: ""
        // description: "kjlkjklj"
        // dueDateDays: 1
        // members: []
        // planIds: (2) ["plan_Hqm0uPpLKker60", "plan_HqX8tID1Zw1zKw"]
        // title: "subplus2plansyeah_recurring"
        // trialFromPlan: false

        subs.forEach(function (subItem) {

            subItem.planIds.forEach(function (id) {
                //var dbId = id.split(",")[0]
                var planId = id.split(",")[1]

                payload = {
                    "accountId": accountId,
                    "planId": planId
                };
                plan = postRequest("PlanGet", payload);
                subCost += plan.amount / 100
                html += "<option ";
                html += "value=" + plan.id + " ";
                if (subItem.couponId.length > 0)
                    html += "couponId=" + subItem.couponId + " "
                else
                    html += "couponId='' "
                html += "description=" + subItem.description + " "
                html += "collectionMethod=" + subItem.collectionMethod + " "
                html += "dueDateDays=" + subItem.dueDateDays + " "
                html += "cancelAtPeriodEnd=" + subItem.cancelAtPeriodEnd + " "
                html += "trialFromPlan=" + subItem.trialFromPlan + " "
                html += ">"
                html += plan.nickname
                html += "</option>";
            }.bind(this))
        }.bind(this))

        return html

    }

    function updateSubscriptions(entities) {
// Get plans owned by this account

        // for each  sub entity, get Id
        var html = "<select id=selectSubscription  size=10  class='w3-select ' style='overflow: auto; max-height: 600px;height: 600px ; font-size: 16px;' required>";
        html += "<option disabled selected>Please Select</option>";

        entities.forEach(function (entityItem) {
            entityItem.links.subscriptionIds.forEach(function (subId) {
                nsSubsService.dbId = subId;
                nsSubsService.getByDbId()
                if (nsSubsService.obj._id !== undefined)
                    html += "<option value=" + nsSubsService.obj._id + " >" + nsSubsService.obj.title + "</option>";

            }.bind(this))
        })
        html += "</select>";

        return html;

    }

    function cancelSubscriptionDialog(event) {

        $("#msgConfirmation").fadeIn("now").html("Checking subscription status...").delay(5000).fadeOut("slow")

        var mgtRsp = subscriptionsHtml(accountId, customerId, event.data.status)
        if (mgtRsp !== null) {

            $("#dialogSubscriptionMgtHook").html(mgtRsp);
            $("#dialogSubscriptionMgt").dialog(nsSubsService.ux.dialogueProps);

        } else {
            $("#msgConfirmation").html("<h3>You have no active subscriptions from this service provider</h3>")
            $("#msgConfirmation").delay(5000).fadeOut("slow");
        }
    }


    function widgetAccountList(accountId) {

        var an = accountName(accountId)
        // var accounListingstRsp = getAccountListing(accountId)
        nsPrimaryAccountMembersService.modelQuery = {
            "platformId": platformId,
            "accountId": accountId
        };
        try {
            nsPrimaryAccountMembersService.getCompliantAccounts()
        } catch (e) {
            // affilate member is trying something?
        }

        if ( nsPrimaryAccountMembersService.accountIds.length > 0) {
            var html = "<select id=selectPlatformAccounts class='w3-select' style='max-width:20%; font-size: " + selectFontsize + "' size=" + (nsPrimaryAccountMembersService.accountIds.length + 3) + "  required>";
            html += "<option disabled >Please Select</option>";
            html += "<option selected value=" + accountId + " >" + an + "</option>";

            nsPrimaryAccountMembersService.accountIds.forEach(function (accountItem) {
                var an = accountName(accountItem)
                if (an !== "Account Not Found")
                    html += "<option value=" + accountItem + " >" + an + "</option>";
            })

            html += "</select>";
        } else {
            var html = "<select id=selectPlatformAccounts class='w3-select' style='max-width:20%; font-size: " + selectFontsize + "' size=" + (nsPrimaryAccountMembersService.accountIds.length + 3) + "  required>";
            html += "<option disabled >Please Select</option>";
            if (an !== "Account Not Found")
                html += "<option selected value=" + accountId + " >" + an + "</option>";
            html += "</select>";
        }
        return html
    }

    function subscriptionsHtml(accountId, customerId, status) {
        var subscriptionsFound = false

        var plans = ""
        var html = ""
        var htmlInner = "";
        var subscriptionData = {}
        payload = {
            "accountId": accountId,
            "customerId": customerId,
            "limit": 100,
            // "status": status
            "status": "all"
        };
        subscriptionData = postRequest("SubscriptionList", payload);

        if (subscriptionData.data.length > 0) {

            htmlInner = "<table class='w3-table-all'>";
            htmlInner += "<th>Name</th>"
            htmlInner += "<th>Cost</th>"

            html = "<table class='w3-table w3-bordered'>";
            html += "<caption><h3>Your Subscription History</h3></caption>";
            html += "<th>Recurring Billing</th>"
            html += "<th>Days Until Due</th>"
            html += "<th>Status</th>"
            html += "<th>Attached Plans</th>"
//		html += "<th>Mark</th>"
            html += "<th>Action</th>"
            subscriptionData.data.forEach(function (subscription) {


                if (subscription.status === "active" || subscription.status === "trialing") {
                    subscriptionsFound = true
                    rowEntry: {
                        html += "<tr id=" + subscription.id + ">"
                        html += "<td>" + subscription.cancel_at_period_end + "</td>"
                        html += "<td>" + subscription.days_until_due + "</td>"
                        html += "<td>" + subscription.status + "</td>"


                        html += "<td>"
                        htmlInner = "<table class='w3-table-all w3-card-2 w3-tiny'>";
                        htmlInner += "<th>Name</th>"
                        htmlInner += "<th>Cost</th>"
                        htmlInner += "<th>Interval</th>"
                        htmlInner += "<th>Period</th>"
                        var total = 0
                        var rttotal = 0
                        subscription.items.data.forEach(function (plan) {
                            htmlInner += "<tr>";
                            htmlInner += "<td>" + plan.plan.nickname + "</td>"
                            htmlInner += "<td>" + parseFloat(plan.plan.amount / 100).toFixed(2) + "</td>"
                            htmlInner += "<td>" + plan.plan.interval + "</td>"
                            htmlInner += "<td>" + plan.plan.interval_count + "</td>"
                            htmlInner += "</tr>";
                            total += plan.plan.amount
                            rttotal += (total * plan.plan.interval_count)
                        })
                        htmlInner += "<tr span=4>";
                        // <span id=cost class="fa fa-euro" style="font-size:48px;color:green"> 0.00</span> <br>
                        htmlInner += "<td>Subscription Total Cost: <span class='fa fa-euro' style='font-size:12px;color:green'> " + parseFloat(rttotal / 100).toFixed(2) + "</td>"
                        htmlInner += "</tr>";
                        htmlInner += "</table>";
                        html += htmlInner
                        html += "</td>"

                        html += "<td>"
                        html += "<td><button id=" + subscription.id + " class='cancelSubscription w3-button w3-block w3-light-grey w3-section w3-padding' >Cancel Subscription</button></td>"
//			html += "<br>"
//			html += "Subscription Cancelled Id: " + subscription.id
                        html += "</td>"

                        html += "</tr>";
                    }
                }
            })
            if (subscriptionsFound === false) {
                subscriptionsFound = true

                html += "<tr>";
                html += "<td style=\"text-align:center\" colspan='5'>"
                html += "<br>"
                html += "<h2>"
                html += "<span class='w3-tag w3-yellow w3-padding'>You have not signed up for any subscriptions, why not browse the subscription catalogue, for offers!</span> "
                html += "</h2>"
                html += "<br>"
                html += "</td>"
                html += "</tr>";

            }
            html += "</table>";
            return html;
        } else {
            return null;
        }


    }

    function subscriptionsMailHtml(accountId, customerId) {
        var subscriptionsFound = false

        var html = ""
        var subscriptionData = {}
        payload = {
            "accountId": accountId,
            "customerId": customerId,
            "limit": 100,
            "status": "all"
            // "status": "active"
        };
        subscriptionData = postRequest("SubscriptionList", payload);
        var plans = ""
        var htmlInner = "<table >";
        htmlInner += "<th>Name</th>"
        htmlInner += "<th>Cost</th>"

        var html = "<table >";
        html += "<th>Recurring Billing</th>"
        html += "<th>Days Until Due</th>"
        html += "<th>Status</th>"
        html += "<th>Attached Plans</th>"
        subscriptionData.data.forEach(function (subscription) {
            if (subscription.status === "active" || subscription.status === "trialing") {
                subscriptionsFound = true
                html += "<tr id=" + subscription.id + ">"
                html += "<td>" + subscription.cancel_at_period_end + "</td>"
                html += "<td>" + subscription.days_until_due + "</td>"
                html += "<td>" + subscription.status + "</td>"


                html += "<td>"
                htmlInner = "<table class='w3-table-all w3-card-2 w3-tiny'>";
                htmlInner += "<th>Name</th>"
                htmlInner += "<th>Cost</th>"
                htmlInner += "<th>Interval</th>"
                htmlInner += "<th>Period</th>"

                var total = 0
                subscription.items.data.forEach(function (plan) {
                    htmlInner += "<tr>";
                    htmlInner += "<td>" + plan.plan.nickname + "</td>"
                    htmlInner += "<td>" + plan.plan.amount / 100 + "</td>"
                    htmlInner += "<td>" + plan.plan.interval + "</td>"
                    htmlInner += "<td>" + plan.plan.interval_count + "</td>"
                    htmlInner += "</tr>";
                    total += plan.plan.amount
                })
                htmlInner += "<tr span=4>";
                htmlInner += "<td>Subscription Total Cost: " + total / 100 + "</td>"
                htmlInner += "</tr>";
                htmlInner += "</table>";
                html += htmlInner
                html += "</td>"


                html += "</tr>";
            }
        })
        if (subscriptionsFound === false) {
            subscriptionsFound = true

            html += "<tr>";
            html += "<td style=\"text-align:center\" colspan='5'>"
            html += "<br>"
            html += "<h2>"
            html += "<span class='w3-tag w3-yellow w3-padding'>You have not signed up for any subscriptions, why not browse the subscription catalogue, for offers!</span> "
            html += "</h2>"
            html += "<br>"
            html += "</td>"
            html += "</tr>";

        }
        html += "</table>";

        return html;
    }

    function widgetSubscriptionDetail(subscriptionDetails) {

        var html = ""
        html += '<div id="w3--center ">'
        // html += '<div class="w3-center ">'
        // html += '<h6>Subscription Summary</h6>'
        // html += '</div>'
        html += '<label>Title: </label> <span id=subTitle>' + nsSubsService.obj.title + '</span> <br>'
        html += '<label>Description: </label> <span id=subDescription>' + nsSubsService.obj.description + '  </span> <br>'
        html += '<br>'
        html += '<br>'
        html += '<label>Active Since: </label> <span id=subTs>' + nsSubsService.obj.ts + '  </span> <br>'
        html += '<label>Id: </label> <span id=subId>' + nsSubsService.obj._id + '  </span> <br>'
        html += '<label>AccountId: </label> <span id=subAccount>' + nsSubsService.obj.accountId + '  </span> <br>'
        html += '</div>'

        return html;
    }


}

//# sourceURL=api_subs_widget.js