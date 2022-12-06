/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// customer must have an active payment source assocated with it..
function getCustomerConnectCardToken(customerId, accountId) {
    var card = {
        // connect account
        "accountId": accountId,
        // platform customer
        "customerId": customerId,
    };

    var tokenRsp = postRequest("AddTokenCard", card);
    var tokenId = tokenRsp.id;
    checkBadResponse(tokenRsp, "<br>Customer with ID: " + customerId + " couldnt created token Id:" + tokenId + ", contact support asap")
    // platform token!
    return tokenId
}

function attachTokenConnectCustomer(customerId, accountId, tokenId) {

    var payload = {
        // connect acount
        "accountId": accountId,
        // connect customer
        "customerId": customerId,
        // platform token
        "tokenId": tokenId
    };
    var rsp = postRequest("CustomerSourceAdd", payload);
    var customerId = rsp.id;
    checkBadResponse(rsp, "<br>Customer with ID: " + customerId + " couldnt have platform token Id:" + tokenId + " attached, contact support asap")
    return customerId
}


function roundNumber(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

function taganalert(where, status = "yellow", msg) {

    var repeatFlags = setInterval(function () {
        if ($(where)) {
            clearInterval(repeatFlags)

            $(where).fadeIn("now");
            $(where).html("<span class=\"w3-tag w3-" + status + "\">" + msg + "</span>")
            $(where).delay(5000).fadeOut("slow");
        }
    }, 20)


}

function tabsInit() {
    var ready = false;
    if ($('body').tabs) {
        try {
            $(".tabs").tabs({active: 0});
            $(".tabsMedia").tabs({active: 0});
            $(".mmTabs").tabs({active: 0});
            $("#tabsIndiviudal").tabs({active: 0});

            $("#tabsCompany,#tabs, #tabsMedia, #tabsMediaStore, #tabsMediaActivities, #tabsMediaEvents, #tabsMediaVideo, #tabsMediaWebinar, #tabsSubs").tabs({
                active: 0,
                show: function (event, ui) {

                },
                select: function (event, ui) {
                }
            });
            throw Error("Tabs Ready Direct")
        } catch (e) {
            console.log("ready")
            return true
        }

    } else {
        var repeatTabs = setInterval(function () {
            try {
                if ($('body').tabs) {
                    clearInterval(repeatTabs)
                    $(".tabs").tabs({active: 0});
                    $(".tabsMedia").tabs({active: 0});
                    $(".mmTabs").tabs({active: 0});
                    $("#tabsIndiviudal").tabs({active: 0});

                    $("#tabsCompany, #tabs, #tabsMedia, #tabsMediaStore, #tabsMediaActivities, #tabsMediaEvents, #tabsMediaVideo, #tabsMediaWebinar, #tabsSubs").tabs({
                        active: 0,
                        show: function (event, ui) {

                        },
                        select: function (event, ui) {
                        }
                    });
                    throw Error("Tabs Ready Via Interval")
                }
            } catch (e) {
                console.log("ready")
                return true

            }
        }, 20)

    }
    return false
}

// Object Constructor!!!
function UxW3Select() {
    this.data = "";
    this.id = "";
    this.size = 0;
    this.productId = "";
    this.accountId = "";
    this.multiple = "multiple";
    this.html = "";
    this.descMe = {
        "id": "",
        "data": ""
    };
    this.build = function () {

        if (this.size === 0)
            this.size = this.data.length + 1;
        if (this.multiple === "")
            this.html += "<select class=\"w3-select " + this.className + "\"  size=" + this.size + ">";
        else
            this.html += "<select class=\"w3-select " + this.className + "\"  " + this.multiple + "   size=" + this.size + ">";
        this.data.forEach(function (item) {
            if (this.accountId === "")
                this.accountId = "na"
            if (this.productId === "")
                this.productId = "na"

            this.html += "<option value=\"" + item.id + "\" accountId=\"" + this.accountId + "\"  productId=\"" + this.productId + "\">" + item.name + "</option>";
        }.bind(this));
        this.html += "</select>";
        return this;
    };
    this.getHtml = function () {
        return this.html;
    };
    this.setAccountId = function (accountId) {
        this.accountId = accountId
        return this;
    };
    this.setProductId = function (productId) {
        this.productId = productId
        return this;
    };
    this.setClassName = function (className) {
        this.className = className.toString()
        return this;
    };
    this.setSize = function (size) {
        this.size = size
        return this;
    };
    this.setMultiple = function () {
        this.multiple = "multiple"
        return this;
    };
    this.setData = function (data) {
        this.data = data
        return this;
    };
    return this;
}

function validateField(that) {
    if ($(that).val().length > 0) {
        $(that).attr("style", "border-color: green");
    } else {
        $(that).attr("style", "border-color: red");
    }
    return $(that).val();
}

function validateFieldRule(that, controllerId) {
    var isValid = that[0].checkValidity();
    if (isValid) {
        $(controllerId).attr("disabled", false);
        that.css("background-color", "white");
        that.css("border-width", "1px");
        that.css("border-bottom-color", "gray");
        that.css("border-bottom-style", "solid");
    } else {
        $(controllerId).attr("disabled", true);
        that.css("border-width", "5px");
        that.css("border-bottom-color", "red");
        that.css("border-bottom-style", "dotted");
    }
    return isValid
}

function uxLoad(el, html) {

    var repeatFlags = setInterval(function () {
        if ($(el)) {
            clearInterval(repeatFlags)
            $(el).html(html)
        }
    }, 200)
}

function uxLoadAttrib(el, attribs) {

    // var attribs = new Map()
    var repeatFlags = setInterval(function () {
        if ($(el)) {
            clearInterval(repeatFlags)
            attribs.forEach(attribMe)
        }
    }, 200)

    function attribMe(value, key, map) {
        $(el).attr(key, value)
    }
}

function uxLoadExec(el, cmds) {

    if ($(el)) {
        eval(cmds)
    } else {
        var ready = setInterval(function () {
            if ($(el)) {
                clearInterval(ready)
//				eval(cmds)
                cmds
            }
        }, 10)
    }
}

function uxLoadTab(myId) {

    if ($('body').tabs) {
        $(myId).tabs({active: 0});
    } else {
        var ready = setInterval(function () {
            if ($('body').tabs) {
                clearInterval(ready)
                $(myId).tabs({active: 0});
            }
        }, 10)
    }

}

function uxLoadDatePicker(myId, props) {

    if ($('body').datetimepicker) {
        $(myId).datetimepicker(props);
    } else {
        var ready = setInterval(function () {
            if ($('body').datetimepicker) {
                clearInterval(ready)
                $(myId).datetimepicker(props);
            }

            if ($('body').datepicker) {
                clearInterval(ready)
                $(myId).datepicker(props);
            }

        }, 10)
    }

}


function chargeAccount({accountId, payload} = {}) {
    var model = {
        "sourceId": accountId,
        ...payload
    }
    try {
        var rsp = postRequest("AddDestinationCharge", model);
        checkBadResponse(rsp)
        return rsp;
    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }
}


function chargeCard({accountId, payload} = {}) {
    var model = {
        "accountId": accountId,
        ...payload
    }

    try {
        var rsp = postRequest("AddDirectCharge", model);
        checkBadResponse(rsp)
        return rsp;
    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }
}

function paymentMethodAdd({accountId, payload} = {}) {
    var model = {
        "accountId": accountId,
        ...payload
    }
    try {
        var customerRsp = postRequest("PayoutMethodBySepa", model);
        checkBadResponse(customerRsp)
        return customerRsp;
    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }
}


function couponAdd({accountId, payload} = {}) {
    var payload = {
        "accountId": accountId,
        ...payload
    }
    try {
        var rsp = postRequest("CouponsAdd", payload);
        checkBadResponse(rsp)
        return rsp;
    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }
}

function couponGet(accountId, couponId) {
    var payload = {
        "accountId": accountId,
        "couponId": couponId,
    }
    try {
        var rsp = postRequest("CouponsGet", payload);
        checkBadResponse(rsp)
        return rsp;
    } catch (errMsg) {
        alert(errMsg)
        console.log(errMsg)
    }
}

function getPlan(accountId, planId) {
    payload = {
        "accountId": accountId,
//		"active": true,
        "planId": planId
    };
    var planRsp = postRequest("PlanGet", payload);
    return planRsp;
}

function PlanAdd(payload) {

    try {
        var planRsp = postRequest("PlanAdd", payload);
        checkBadResponse(planRsp, "INF: INF: Your plan request was not allowed, all fields are mandatory, except trial period")
        return planRsp;
    } catch (errMsg) {
        alert(errMsg)
        return;
    }

}


function getAccountListing(accountId) {
    var accountList = [];
    // Add Primary To List
//	primaryAccountFamilyList.push(accountId)
    var payload = {
        "accountId": accountId
    };
    var accountRsp = postRequest("AccountGet", payload).metadata;
    checkBadResponse(accountRsp, "INF: Cannot retrieve platform account listing for account Id (" + accountId + ")")
    // For each prop get key
    for (accountkey in accountRsp) {
        var accountId = accountRsp[accountkey];
        if (accountkey !== "total") {
            accountList.push(accountId)
        }
    }

// Complete List
    return accountList;
}

function getAccount(accountId) {
    var payload = {
        "accountId": accountId
    };
    var accountRsp = postRequest("AccountGet", payload);
    checkBadResponse(accountRsp, "INF: Cannot retrieve platform account listing for account Id (" + accountId + ")")
    return accountRsp;
}

function checkBadResponse(response, errMsg) {
    if (response.status !== undefined && response.status === 400)
        throw Error(errMsg)

}

function accountRequirements(accountId) {
    var accountPayload = {
        "accountId": accountId
    };
    var accountRsp = postRequest("AccountQueryRequirements", accountPayload);
    return accountRsp
}

function accountDetails(accountId) {

    payload = {
        "accountId": accountId
    };
    accountRsp = postRequest("AccountGet", payload);
    return accountRsp
}


function accountName(accountId) {

    payload = {
        "accountId": accountId
    };
    // TODO, if account is removed, remove from plaform account holder meta!!!
    var accountRsp = postRequest("AccountGet", payload)
    if (accountRsp.status !== undefined) {
        // error!
        // if (accountRsp.status === 400)
        return "Account Not Found"
    } else
        return accountRsp.business_profile.name
}


function addAccountToPrimary(accountId, newAccountId) {

// 1. Retrieve Existing Account Meta
    account = {
        "accountId": accountId
    };
    metadata: {

        var item = {}
        var newMetadata = []
        var existingMetadata = []
        existingMetadata = postRequest("AccountGet", account).metadata;
// update new total
        newtotal = parseInt(existingMetadata.total)
        newtotal += 1
        item = {
            "key": "total",
            "value": newtotal
        };
        newMetadata.push(item);
// add with new account key
        item = {
            "key": "accountId_" + newtotal,
            "value": newAccountId
        };
        newMetadata.push(item);
// Transform Object To Key/Value Array Objects
        for (var key in existingMetadata) {
            var value = existingMetadata[key];
            if (key !== "total")
                newMetadata.push({
                    "key": key,
                    "value": value
                });
        }
        account = {
            "accountId": accountId,
            "metadata": newMetadata
        }
// Update Platform Account With New Meta
        accountRsp = postRequest("AccountAddMeta", account).id;
    }


}

function getProductDetails(accountId, productId) {

    payload = {
        "accountId": accountId,
        "productId": productId
    };
    var productRsp = postRequest("ProductGet", payload)
    return productRsp;
}

function getAsset(accountId) {
    payload = {
        "accountId": accountId,
        // event
        "mode": "resource",
        "limit": 0,
        "active": true
//		"sellable": false
    };
    payloadRsp = postRequest("ProductsGetMode", payload)
    return payloadRsp;
}


function ratings(max) {
//	.checked {
//		color: orange;
//	}
    html = ""
    for (i = 1; i <= max; i++) {
        html += "<span class='fa fa-star checked'></span>"
    }
    for (i = max; i <= 5; i++) {
        html += "<span class='fa fa-star '></span>"
    }
    return html;
}


function getProductsByMode(accountId, mode = "sync") {
    if (window.location.pathname.includes("portal")) {
        nsEntitiesService.modelQuery.mode = "resource";
    }

    if (window.location.pathname.includes("activity")) {
        nsEntitiesService.modelQuery.mode = "activity";
    }
    if (window.location.pathname.includes("video")) {
        nsEntitiesService.modelQuery.mode = "video";
    }
    if (window.location.pathname.includes("event")) {
        nsEntitiesService.modelQuery.mode = "event";
    }
    if (window.location.pathname.includes("shop")) {
        nsEntitiesService.modelQuery.mode = "store";
    }
    if (window.location.pathname.includes("meeting")) {
        nsEntitiesService.modelQuery.mode = "meeting";
    }
    if (window.location.pathname.includes("covid")) {
        nsEntitiesService.modelQuery.mode = "covid";
    }
    if (window.location.pathname.includes("membership")) {
        nsEntitiesService.modelQuery.mode = "membership";
    }

    nsEntitiesService.modelQuery.accountId = accountId;
    var items = nsEntitiesService.serviceGetType();

    return items;
}

function productDecrementUnitCount(accountId, productId, amount) {
    product = {
        "accountId": accountId,
        "productId": productId
    };
    var productMeta = postRequest("ProductGet", product).metadata;
    // Update Units
    newUnits = parseInt(productMeta.units)
    newUnits -= amount
    product = {
        "accountId": accountId,
        "productId": productId,
        "units": newUnits
    };
    var productId = postRequest("ProductUpdateMeta", product).id;
    // Alert Owner if selling out
    return productId;
}


customerOps: {


    function customerFind({accountId, email} = {}) {

        var customerRsp = {}
        try {
            if (accountId === "")
                payload = {
                    "person": new Person({"email": email})
                };
            else
                payload = {
                    "accountId": accountId,
                    "person": new Person({"email": email})
                };
            customerRsp = postRequest("CustomerFind", payload)
            checkBadResponse(customerRsp, "Account ID (" + accountId + ") cannot find customer ID for email (" + email + ") , contact support for assistance.")

        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
            // Bubble Up
            throw  Error(errMsg)
        }
        return customerRsp;
    }

    function customerGet({accountId, customerId} = {}) {

        var customerRsp = {}
        try {
            if (accountId === "")
                payload = {
                    "customerId": customerId
                };
            else
                payload = {
                    "accountId": accountId,
                    "customerId": customerId
                };
            checkBadResponse(customerRsp = postRequest("CustomerGet", payload), "Account ID (" + accountId + ") cannot find customer ID (" + customerId + ") , contact support for assistance.")

        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
        return customerRsp;
    }

    function customerUpdate({accountId, customerId, payload} = {}) {
        var customerModel = {
            "accountId": accountId,
            "customerId": customerId,
            ...payload
        }
        try {
            var customerRsp = postRequest("CustomerUpdate", customerModel);
            checkBadResponse(customerRsp)
        } catch (errMsg) {
            alert(errMsg)
            console.log(errMsg)
        }
        return customerRsp;
    }


    function customerCopy(existingCustomerRsp, accountId) {

        modelUxCustomer.accountId = accountId;
// Not Returned By Query
        modelUxCustomer.person.firstName = "spawned"
        modelUxCustomer.person.lastName = "customer"

// Returned By Custoemr Query
        modelUxCustomer.person.email = existingCustomerRsp.email
        modelUxCustomer.person.phone = existingCustomerRsp.phone
        // metadata:
        modelUxCustomer.userAccount.user = existingCustomerRsp.metadata.username
        modelUxCustomer.userAccount.pass = existingCustomerRsp.metadata.password
        modelUxCustomer.userAccount.role = existingCustomerRsp.metadata.role
        var customerRsp = postRequest("CustomerAdd", modelUxCustomer);
        return customerRsp;
    }

    function customerAdd() {
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
            , "userAccount": new UserAccount({"user": modelContext.email, "pass": modelContext.phone, "role": "admin"})
        };
        var customerRsp = postRequest("CustomerAdd", customer);
        return customerRsp;
    }

    function customerGetAll({accountId} = {}) {
        var payload = {
            "accountId": accountId,
            "limit": 100
        }

        var payloadRsp = postRequest("CustomerListing", payload);
        return payloadRsp;
    }

    function customerGetAllWidget({accountId} = {}) {

        payload = {
            "accountId": accountId,
            "limit": 100
        }

        payloadRsp = postRequest("CustomerListing", payload);
        html = "<br>"
        html += "<select size=5 multiple=multiple class=\"w3-select w3-hover-grey selectPatron\" required> "
        html += "<option disabled selected>Please Select </option>"
        payloadRsp.forEach(function (item) {
            html += "<option value=" + item.email + "|" + item.phone + "|" + item.id + ">" + item.name + "</option>"
        });
        html += "</select>"
        html += "<br>"
        html += "<button class='w3-button w3-right w3-light-gray' id=addRecipients>Add Select Recipients</button>"
        html += "<br>"

        $("#customerListingAll").html(html);
        return payloadRsp;
    }

    function uxWidgetCustomerList({accountId, productId, className, size, multiple} = {}) {
//	function uxWidgetCustomerList(accountId, className, size, multiple) {

        var uxCustomerList = []
        // bootstrap routine...prime widget
        var getAllCustomersRsp = customerGetAll({"accountId": accountId})

        getAllCustomersRsp.forEach(function (obj) {
            var uxCustomerObj = {
                "id": "",
                "name": ""
            }
            uxCustomerObj.id = obj.id
            uxCustomerObj.name = obj.name
            uxCustomerList.push(uxCustomerObj)

        })

        // Call Select Widget Builder!!!
        var uxW3SelectObj = new UxW3Select()
        uxW3SelectObj.setAccountId(accountId)
        uxW3SelectObj.setProductId(productId)
        uxW3SelectObj.setData(uxCustomerList)
        uxW3SelectObj.setSize(size).setMultiple(multiple).setClassName(className).build()

        return uxW3SelectObj;
    }

}


function BusinessInvite({website, bizName, fname, lname, emailInviter, shopping, events, activities, emailInvitee, greetings} = {}) {
    this.fname = fname;
    this.lname = lname;
    this.emailInviter = emailInviter;
    this.shopping = shopping;
    this.events = events;
    this.activities = activities;
    this.emailInvitee = emailInvitee;
    this.greetings = greetings;
    this.bizName = bizName;
    this.website = website;
}


function ConnectAccount({type, email, phone, country, capabilities} = {}) {
    this.type = type;
    this.email = email;
    this.phone = phone;
    this.country = country;
    this.capabilities = capabilities;
}

function BizProfile({mcc = "", name = "", description = "", supportUrl = "", supportPhone = "", url = ""} = {}) {
    this.mcc = mcc
    this.name = name
    this.productDescription = description
    this.supportPhone = supportPhone
    this.supportUrl = supportUrl
    this.url = url
}

function Verfification({mcc, name, description, supportUrl, url} = {}) {
    this.document = {
        "front": {
            "purpose": "identity_document",
            "file": "/media/photoId-front.png"
        },
        "back": {
            "purpose": "identity_document",
            "file": "/media/photoId-back.png"
        }
    },
        this.additionaDocument = {
            "front": {
                "purpose": "identity_document",
                "file": "/media/passport-front.png"
            },
            "back": {
                "purpose": "identity_document",
                "file": "/media/passport-back.png"
            }
        }
}

function ConnectAccountIndividual({bizProfile, person, address, verfification} = {}) {
    this.businessProfile = bizProfile,
        this.individual = {
            ...person,
            "address": address,
            "verification": verfification
        }
}


function Subscription({applicationFeePercent, collectionMethod, dueDateDays} = {}) {
    this.appFee = applicationFeePercent;
    this.collectionMethod = collectionMethod;
    this.dueDateDays = dueDateDays;
}

function Invoice() {
    this.invoicesettings = {
        "customfields": [
            {"name": "", "value": ""}
        ],
        "defaultpaymentmethod": "",
        "footer": ""
    }
}

// #Capabilities
// Coupons can be used to discount invoices, subscriptions, or entire customer accounts.

// #Data
//
// # Errors
// You cannot set 'id' to an empty string. We interpret empty strings as null in requests. You may set 'id' to null to delete the property.",
// This value must be greater than or equal to 0.01 (it currently is '0.0').; request-id: req_oQeU8hj0tWYbKN",
// Received both percent_off and amount_off parameters. Please pass in only one.; request-id: req_bBjZ6TeYBiew4P",
// You must pass currency when passing amount_off; request-id: req_iymxNVYTHkDDpu",
//function Coupon( { "mandatory":{ amountOff, percentageOff = 0.00, duration = "", durationInMonths = 0, currency = "eur", redeemBy = 0, timesRedeemed = 0} } = {}) {
function Coupon({name = "", amountOff, percentageOff = 0.00, duration = "", durationInMonths = 0, currency = "eur", redeemBy = 0, timesRedeemed = 0} = {}) {
//	this.couponId = id;
//Name of the coupon displayed to customers on, for instance invoices, or receipts. By default the id is shown if name is not set.
    this.name = name;
// Money
    // A positive integer representing the amount to subtract from an invoice total (required if percent_off is not passed).
    this.amountOff = amountOff;
    this.percentageOff = percentageOff;
    this.currency = currency;
// Time
    // Specifies how long the discount will be in effect. Can be forever, once, or repeating.
    this.duration = duration;
    this.durationInMonths = durationInMonths;
    this.redeemBy = redeemBy;
    this.timesRedeemed = timesRedeemed;
}


function UserAccount({user = "", pass = "", role = ""} = {}) {
    this.user = user;
    this.pass = pass;
    this.role = role;
}

//...new Customer({"person": new Person(),       "balance": 0, "address": new Address(), "meta": ""})
function Customer({person = new Person(), balance = 0, shipping = new Address(), billing = new Address(), meta = ""} = {}) {
    this.person = person;
    this.description = "";
    this.meta = meta;
    this.balance = balance;
    this.shipping = shipping;
    this.billing = billing;
}

function Tax() {
    this.tax = {
        "taxexempt": "",
        "taxiddata": {
            "type": "",
            "value": ""
        },
        "taxinfo": ""
    };
}

//Customer.prototype = new Person();
//Object.defineProperty(Customer, this, new Person());

function Bank({accountNumber = "", country = "", accountHolderType = "", accountHolderName = ""} = {}) {
    this.accountNumber = accountNumber;
    this.country = country;
    this.accountHolderType = accountHolderType;
    this.accountHolderName = accountHolderName;
}

function PaymentSource({accountNumber = "IE89370400440532013000", country = "IE", accountHolderType = "", accountHolderName = "Anto Who"} = {}) {
    this.accountNumber = accountNumber;
    this.country = country;
    this.accountHolderType = accountHolderType;
    this.accountHolderName = accountHolderName;
}

function Transaction({amount = 0, currency = "IE", description = ""} = {}) {
    this.amount = amount;
//	this.amountDec = amountDec;
    this.currency = currency;
    this.description = description;
}

function Mandate({accountNumber = "IE89370400440532013000", country = "IE", accountHolderType = "", accountHolderName = "Anto Who"} = {}) {
    this.accountNumber = accountNumber;
    this.country = country;
    this.accountHolderType = accountHolderType;
    this.accountHolderName = accountHolderName;
}

//function CardNumber( {brand = "4242424242424242", currency = "eur", country = "IE", type = 2020} = {}) {
//}
//...new Card({"number": "4000056655665556", "currency": "eur", "year": 2021, "month": 12, "day": 22})
// Works - https://stripe.com/docs/testing#cards
// Probs - https://stripe.com/docs/testing#international-cards

function Card({number = "4242424242424242", currency = "eur", year = 2020, month = 12, day = 12} = {}) {
    this.number = number;
    this.currency = currency;
    this.year = year;
    this.month = month;
    this.day = day;
}

function RefundCharge({amount, reason = "error", returnAppFee = true} = {}) {
    this.transaction = new Transaction({"amount": amount});
    this.reason = reason;
    this.returnAppFee = returnAppFee;
}


function CreditNote({memo = "Credit Note", reason = "product_unsatisfactory", amount = 0, creditAmount = 0, refundAmount = 0} = {}) {
    this.number = getRand();
    this.memo = memo;
    this.reason = reason;
    this.creditAmount = creditAmount;
    this.refundAmount = refundAmount;
    this.transaction = new Transaction({"amount": amount});
}


// new Person( {firstName : "", lastName : "", sex : "female", email : "tonyennis@yahoo.com", phone : "0877461070", year : 1972, month : 2, day : 1} )
function Person({firstName = "", lastName = "", gender = "", email = "", phone = "", year = 0, month = 0, day = 0, idNumber = "", ssnNumber = ""} = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.idNumber = idNumber;
    this.ssnNumber = ssnNumber;
    this.email = email;
    this.phone = phone;
    this.dob = {
        "year": year,
        "month": month,
        "day": day
    }
}

function Relationship({title = "CEOO", executive = "dublin", representative = "40000", owner = "IE", director = "D"} = {}) {
    this.title = title;
    this.executive = executive;
    this.representative = representative;
    this.owner = owner;
    this.director = director;
}

function Company({name = "", phone = "", taxId = "", vatId = "", directorsProvided = true, ownersProvided = true, executivesProvided = true, address = ""}) {
    this.name = name;
    this.phone = phone;
    this.taxId = taxId;
    this.vatId = vatId;
    this.executivesProvided = executivesProvided;
    this.directorsProvided = directorsProvided;
    this.ownersProvided = ownersProvided;
//	this.structure = ownersProvided;
    this.address = address;
}

function File({path = "", purpose = ""} = {}) {
    this.path = path;
    this.purpose = purpose;
}

// new Address( {line1 : getRand(1, 100) + " kerlogue Road", line2 : "xxx", town : "ringsend", city : "dublin", zip : "40000", country : "IE", state : "D"})
function Address({line1 = "", line2 = "", town = "", city = "", zip = "", country = "", state = ""} = {}) {
    this.addressLine1 = line1;
    this.addressLine2 = line2;
    this.town = town;
    this.city = city;
    this.postalCode = zip;
    this.country = country;
    this.state = state;
}

var modelPersonA = new Person();
var modelPersonB = new Person();
var modelPersonC = new Person();
var modelAddress = {
    "addressLine1": getRand(1, 100) + " kerlogue Road",
    "addressLine2": "",
    "town": "ringsend",
    "city": "dublin",
    "postalCode": "40000",
    "country": "IE",
    "state": "D"
}

var modelDob = {
    "year": 1972,
    "month": getRandInt(1, 11),
    "day": 1
}


//////////////////////////////
// Billing
//////////////////////////////
//units, unitsTotal = 0, unitsLower = 0, unitsUpper = 0, stockLevel1 = false, stockLevel2 = false, stockLevel3 = false,
//	alertReminderCap = "", alertSchedule = "", bufferoverflow = "",
//	date_time_start = "", date_time_end = "",
//	emailInventory = "", smsInventory = "", alertInventory = "",
function Product({
                     businessMode = "", seatingGrades = [], active, name, type, mode, description, attribs, metadata, images = [], url, urlShop, cost = 0.00, discount = 0.00, tbbFee = 0.00, tnc = "", location = "", image1 = "", image2 = "", image3 = "", image4 = "", image5 = "", promoVideo = "", urlSocialFb = "", urlSocialYt = "", fullName = "", emailPoc = "", phonePoc = "",
                     scope = [""], whitelistAccountHolder = [""], upstreamProductId = "", upstreamAccountId = "", couponId = "",
                     date_time_start = "", date_time_end = "",
                     resaleId = ""
                 } = {}) {
    this.businessMode = businessMode;
    this.seatingGrades = seatingGrades;
    this.url = url;
    this.urlShop = urlShop;
    this.discount = discount;
    this.cost = cost;
    this.tbbFee = tbbFee;
    this.active = active;
    this.name = name;
    this.type = type;
    this.mode = mode;
    this.description = description;
    this.attribs = attribs;
    this.metadata = metadata;
    this.tnc = tnc;
    this.couponId = couponId;
    this.dateTimeStart = date_time_start;
    this.dateTimeEnd = date_time_end;
    this.location = location;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
    this.image5 = image5;
    this.promoVideo = promoVideo;
    this.urlSocialFb = urlSocialFb;
    this.urlSocialYt = urlSocialYt;
    this.fullName = fullName;
    this.emailPoc = emailPoc;
    this.phonePoc = phonePoc;
//	this.stockLevel1 = stockLevel1;
//	this.stockLevel2 = stockLevel2;
//	this.stockLevel3 = stockLevel3;
//	this.unitsTotal = unitsTotal;
//	this.units = unitsTotal;
//	this.unitsLower = unitsLower;
//	this.unitsUpper = unitsUpper;
//	this.emailInventory = emailInventory;
//	this.smsInventory = smsInventory;
//	this.alertReminderCap = alertReminderCap;
//	this.alertSchedule = alertSchedule;
//	this.bufferoverflow = bufferoverflow;

    this.scope = scope;
    this.whitelistAccountHolder = whitelistAccountHolder;
    this.upstreamProductId = upstreamProductId;
    this.upstreamAccountId = upstreamAccountId;
    this.resaleId = resaleId;
}

function ProductAll({active, type, limit} = {}) {
    this.limit = limit;
    this.active = active;
    this.type = type;
}

function ProductPlan({active, usageType, name, scheme, transaction, schedule} = {}) {
    this.active = active;
    this.usageType = usageType;
    this.name = name;
    this.nickname = "tricky nicky " + name;
    this.scheme = scheme;
    this.transaction = transaction;
    this.schedule = schedule;
}


function convertHrMin2Mins(hrmin) {
    var hrmin = hrmin;
    var mins = "";
    var dataObj = "";
    var atime = "";
    atime = "01 Jan 1970 " + hrmin + ":00";
    dataObj = new Date(atime).toLocaleString();
    mins = (new TimeConverter(new Date(dataObj)).hrs2Mins());
//	mins += (new TimeConverter(new Date(dataObj)).getMins());
    return parseInt(mins);
}

function postRequestExt(headers, url, data) {
    return new httpHandlerExt().setHeaders(headers).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function getRequest(ep) {
    url = location.origin + contextPath + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).get().getResponse();
}

function doMsGet(port, resource, query) {
//	var q = JSON.stringify(query)
    if (location.origin.toString().includes("local"))
        url = "http://localhost" + ":" + port + "/" + resource + "?" + query
    else
        url = "https://www.mybusinesspal.com" + "/" + resource + "?" + query;

    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).get().getResponse();
}

function doMsPost(port, resource, data) {
//	var q = JSON.stringify(query)
    if (location.origin.toString().includes("local"))
        url = "http://localhost" + ":" + port + "/" + resource
    else
        url = "https://www.mybusinesspal.com" + "/" + resource;

    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function doMsPut(port, resource, data, id) {
//	var q = JSON.stringify(query)
    if (location.origin.toString().includes("local"))
        url = "http://localhost" + ":" + port + "/" + resource + "/" + id;
    else
        url = "https://www.mybusinesspal.com" + "/" + resource + "/" + id;

    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).put().getResponse();
}

function getMsDelete(port, resource, query) {
//	var q = JSON.stringify(query)
    if (location.origin.toString().includes("local"))
        url = "http://localhost" + ":" + port + "/" + resource + "?" + query
    else
        url = "https://www.mybusinesspal.com" + "/" + resource + "?" + query;

    return new httpHandlerExt().setHeaders(headers).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function postRequest(ep, data) {
    url = location.origin + contextPath + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function postRequestToUrl(ep, data) {

    url = ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function postRequestAsync(ep, payload) {
    url = location.origin + contextPath + "/" + ep;
    var timeout = 30000

    return $.ajax({
        url: url,
        type: "POST",
        async: true,
        // Cors Key for DB
        headers: {"x-apikey": "5dfe3837bf46220df655ddbf"},
        timeout: timeout,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8"

    });
}

function getDbRequest(ep) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).get().getResponse();
}

function getDbRequestAsync(ep) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(true).setTimeout(30000).setUrl(url).get().getResponse();
}

function getDbRequestId(ep, id) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "/" + id;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).get().getResponse();
}

function getDbRequestIdAsync(ep, id) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "/" + id;
    return new httpHandler("Generic", responseStrucObj).setAsync(true).setTimeout(30000).setUrl(url).get().getResponse();
}

function getDbRequestXByY(ep, x, y) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "?q={\"" + x + "\": \"" + y + "\"}"
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).get().getResponse();
}

function getDbRequestQuery(ep, query, asyncFlag = false) {
    var rsp = {}
    try {
        var q = JSON.stringify(query)
        var url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "?q=" + q
        rsp = new httpHandler("Generic", responseStrucObj).setAsync(asyncFlag).setTimeout(30000).setUrl(url).get().getResponse();
//		if (rsp.length <= 0 || rsp === undefined)
//			throw Error("Cannot retrieve data from (" + url + "), contact support asap")
//		else
//			return rsp;

//		if (rsp.length == 1)
//			return rsp[0];
//		else
        return rsp;
    } catch (errMgs) {
        throw Error(errMgs)
    }

}

function getDbRequestXByYAsync(ep, x, y) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "?q={\"" + x + "\": \"" + y + "\"}"
    return new httpHandler("Generic", responseStrucObj).setAsync(true).setTimeout(30000).setUrl(url).get().getResponse();
}

function postDbRequest(ep, data) {
    var url = "https://iottech-0d28.restdb.io/rest" + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function postDbRequestDelete(ep, id) {
    var url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "/" + id;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).del().getResponse();
}

function postDbRequestAsync(ep, data) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep;
    return new httpHandler("Generic", responseStrucObj).setAsync(true).setTimeout(30000).setUrl(url).setPayload(data).post().getResponse();
}

function putDbRequest(ep, data, id) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "/" + id;
    return new httpHandler("Generic", responseStrucObj).setAsync(false).setTimeout(30000).setUrl(url).setPayload(data).put().getResponse();
}

function putDbRequestAsync(ep, data, id) {
    url = "https://iottech-0d28.restdb.io/rest" + "/" + ep + "/" + id;
    return new httpHandler("Generic", responseStrucObj).setAsync(true).setTimeout(30000).setUrl(url).setPayload(data).put().getResponse();
}


function randomImage(width, height) {

    var img = new Array(
        "http://lorempixel.com/200/200/nature/",
        "http://lorempixel.com/200/200/fashion/",
        "http://lorempixel.com/200/200/sports/",
        "http://lorempixel.com/200/200/cats/",
        "http://lorempixel.com/200/200/food/",
        "http://lorempixel.com/200/200/people/",
        "http://lorempixel.com/200/200/transport/",
        "http://lorempixel.com/200/200/business/",
        "http://lorempixel.com/200/200/city/"
    )

    return img[getRandInt(0, 8)]
}

function brandMeX(accountId, location) {
    var response = {}
    var isBranded = getDbRequestXByY("branding", "accountId", accountId);
    if (isBranded.length >= 1) {
// client has branding enabled
        response = isBranded[0]
// Publish today

        response.timings.publishDate
// Bannner
        if (location === "login") {
            $("#hdr").attr("src", "/resources/media/clients/" + response.media.picHeader.name)
//			$("#hdr").attr("display", "block")
//			$("#hdr").attr("max-width", "100%")
//			$("#hdr").attr("max-height", "10%")
//			$("#hdr").attr("width", "auto")
//			$("#hdr").attr("height", "auto")
//
            $("#hdr").attr("width", "100%")
            $("#hdr").attr("height", "130px")
            $("#hdr").attr("style", "object-fit:cover")

        } else {
            $("#hdr").attr("src", "/resources/media/clients/673859/image/hdr1/483400_football-2016_header.jpg")
        }

        $(document).attr("title", response.title);
        $("#tagLine").text(response.tagLine)

        $("#favicon").attr("href", "/resources/media/clients/" + response.media.favIcon.name);
// Page Title
// Fav Icon Title

    } else {
// First Time
// Use my business pal logos
        console.log("INF: Hdr (" + contextPath + "/resources/media/clients/iotbanner/hdr.jpg)")
        $("#hdr").attr("src", contextPath + "/resources/media/clients/iotbanner/hdr.jpg")
//		$("#tdr").attr("src", "/resources/media/clients/iotbanner/trailer.jpg")
    }

}

function brandMeBannerSmall(accountId, size) {
    var html = ""
    var mediapath = location.origin + contextPath + "/resources/media/clients/acct/image/default/"
    var response = {}
    var isBranded = getDbRequestXByY("branding", "accountId", accountId);
    var bizName = accountName(accountId);
    if (true) {
        // if (isBranded.length >= 1) {
        response = isBranded[0]

//		html = "<h2 class=\"ui header\">"
        html = "<span>(" + accountId + ") " + bizName + " </span>"

        html = "<span>" + bizName + " </span>"
        html += "<br>Catalogue Size "
        html += "<div class=\"ui circular labels\">"
        html += "<a class=\"ui label\">"
        html += "" + size + ""
        html += "</a>"
        html += "</div>"
        html += "</br>"
        response.items.forEach(function (brandItem) {

            html += "<img " + "src=" + mediapath + brandItem.media.picFooter.name + "  style=\"width: 70%  ; height: 100px ; object-fit:cover\">" + "</img>"
//		html += "<img src=" + "/resources/media/clients/" + response.media.picFooter.name + "  style=\"display: block; max-width:1900px; max-height:130px; width: auto; height: auto;\"></img>"
//		html += "<img src=https://i.picsum.photos/id/1/1800/100.jpg  style=\"max-width: 70%;\" ></img>"
//		html += "</h2>"
        })
        $("#hdr_" + accountId).html(html)
    } else {
        html = "<span>Service Provider: (" + accountId + ") " + bizName + " </span>"
        $("#hdr_" + accountId).html(html)

    }
}


modelContext_customer_signup = {
    ...new Person(),
    ...new Address()
};

//# sourceURL=functions.js