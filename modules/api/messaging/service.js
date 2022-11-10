/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsMessagingService = {
    mydb: "messages",
    ...core,
    modelItem: {
        "entityIds": [], // customer or product Ids
        "timings": {
            "startDateTime": "",
            "endDateTime": ""
        },
        message: {
            "importance": "",
            "content": "",
            "scope": [],
            "headline": ""
        }
    },
    // Three category/records per accoutn public, user, and product messages.
    modelCreate: {
        "accountId": "",
        "target": "", // customer(s) , product
        "uploads": [],
        "items": []
    },
    modelQuery: {
        "accountId": "",
    },
    create: function () {
        this.modelCreate.accountId = this.accountId;
        this.modelCreate.target = this.target;
        this.modelCreate.uploads.push(getTs());
        this.modelCreate.ts = getTs();
        // add message
        this.modelCreate.items.push(this.modelItem)
        this.obj = postDbRequest(this.mydb, this.modelCreate)
        this.dbId = this.obj._id
    },
    deMessageMe: function () {

    },
    messageMe: function () {

        var html = "";
        // Now Fetch
        this.getByTarget()

        // Messagees
        if (this.obj !== undefined && this.obj.items.length >= 0) {
            // Is Public or Indivual

            this.obj.items.forEach(function (item, index) {

                // Preprocessing , is cusomter on the list
                try {

                    if (this.obj.target === "public") {
                        // is customer id in messaging list
                        throw Error("public found")
                    }

                    if (this.obj.target === "users") {
                        // is customer id in messaging list
                        item.entityIds.forEach(function (entityId) {
                            if (entityId === this.customerId) {
                                throw Error("customer found")
                            }
                        })
                    }
                    return

                } catch (e) {

                    html += "Heading: " + item.message.headline + "<br>"
                    html += "Publish Date: " + new Date(item.timings.startDateTime).toLocaleDateString() + "<br>"
                    html += "Expiry Date: " + new Date(item.timings.endDateTime).toLocaleDateString() + "<br>"

                    html += "<br>"
                    if (item.message.importance === "hp_ni" || item.message.importance === "hp_i")
                        html += "Importance: High<br>"
                    else if (item.message.importance === "lp_i")
                        html += "Importance: Moderate<br>"
                    else if (item.message.importance === "lp_ni")
                        html += "Importance: Low<br>"

                    html += "<hr>"
                    html += "<br>" + item.message.content + "<br>"
                    html += "<hr>"
                    html += "<div class='w3-row w3-center'>";
                    html += "<button id=btnCloseMsg class=\"w3-btn w3-round-xxlarge w3-padding-large w3-blue w3-right\" target=" + this.obj.target + " >Close</button>";
                    html += "</div>";
                    html += "<br>"
                    item.message.scope.forEach(function (scope) {
                        if (scope === "http" || scope === "both") {
                            // Messaging period...
                            if (new Date() > new Date(item.timings.startDateTime)) {
                                if (new Date() < new Date(item.timings.endDateTime)) {
                                    this.ux.dialogueProps.width = "33%"
                                    if (this.obj.target === "public")
                                        publicMsg:{
                                            if ($('body').dialog) {
                                                $("#dialogMsgHook").html(html)
                                                $("#dialogMsg").dialog(this.ux.dialogueProps);
                                                $("#dialogMsg").dialog("open");
                                            } else {
                                                var ready = setInterval(function () {
                                                    if ($('body').dialog) {
                                                        clearInterval(ready)
                                                        try {
                                                            $("#dialogMsgHook").html(html)
                                                            $("#dialogMsg").dialog(this.ux.dialogueProps);
                                                            $("#dialogMsg").dialog("open");
                                                        } catch (e) {

                                                        }
                                                    }
                                                }, 10)
                                            }


                                        }
                                    if (this.obj.target === "users")
                                        userMsg:{
                                            $("#dialogMsgUserHook").html(html)
                                            $("#dialogMsgUser").dialog(this.ux.dialogueProps);
                                            $("#dialogMsgUser").dialog("open");
                                        }
                                }
                            }
                        } else {
                            // Send text
                        }
                    }.bind(this))

                }
            }.bind(this))
        }

    },
    getByTarget: function () {
        this.obj = getDbRequestQuery(this.mydb, {"accountId": this.accountId, "target": this.target})[0]
        if (this.obj !== undefined && this.obj.items !== undefined) {
            this.dbId = this.obj._id
            this.dataSizeItems = this.obj.items.length
        }
        return this;
    },
    tmpDate: "",
    todaysDate: "",
    dateutil: "",
    messageIsToday: function (adate) {
        var pdate = adate.replace(new RegExp("-", 'g'), " ");
        var yyyy = parseInt(pdate.split(" ")[0]);
        var mm = parseInt(pdate.split(" ")[1] - 1);
        var dd = parseInt(pdate.split(" ")[2]);

        this.todaysDate = new Date();
        this.tmpDate = new Date(yyyy, mm, dd, this.todaysDate.getHours(), this.todaysDate.getMinutes(), this.todaysDate.getSeconds(), this.todaysDate.getMilliseconds());

        this.dateutil = new dateUtil(this.tmpDate, this.todaysDate);
        if (this.dateutil.isToday() === true) {
            return true;
        } else {
            return false;
        }
    },
    messageIsFuture: function (adate) {
        var pdate = adate.replace(new RegExp("-", 'g'), " ");
        var yyyy = parseInt(pdate.split(" ")[0]);
        var mm = parseInt(pdate.split(" ")[1] - 1);
        var dd = parseInt(pdate.split(" ")[2]);

        this.todaysDate = new Date();
        this.tmpDate = new Date(yyyy, mm, dd, this.todaysDate.getHours(), this.todaysDate.getMinutes(), this.todaysDate.getSeconds(), this.todaysDate.getMilliseconds());

        this.dateutil = new dateUtil(this.tmpDate, this.todaysDate);
        if (this.dateutil.isFuture() === true) {
            return true;
        } else {
            return false;
        }
    },
    messageIsValid: function (lhsDate, rhsDate) {

        var todaysDateFull = new Date();
        this.todaysDate = new Date(todaysDateFull.getFullYear(), todaysDateFull.getMonth(), todaysDateFull.getDate());

        var rhsDateFull = new Date(rhsDate);
        var rhsDateDate = new Date(rhsDateFull.getFullYear(), rhsDateFull.getMonth(), rhsDateFull.getDate());

        this.dateutil = new dateUtil(this.todaysDate, this.todaysDate);
        if (this.dateutil.isValidPeriod(new Date(lhsDate), rhsDateDate) === true) {
            return true;
        } else {
            return false;
        }
    },
    getCustomerMessage: function (customerId, accountId) {
        var isMessaged = getDbRequestXByY("message", "accountId", accountId);
        if (isMessaged === customerId)
            return msg
    },
    getPlatformOwnerMessage: function () {
        var isMessaged = getDbRequestXByY("message", "accountId", accountId);
    }

}

function checkOnMessages() {

    var messageInterval = setTimeout(function () {

        try {
            nsPrimaryAccountMembersService.getCompliantAccounts()
        } catch (e) {
            // affiliate member is trying something?
        }
        nsPrimaryAccountMembersService.accountIds.forEach(function (accountId) {
            // Customer Message __search__
            nsMessagingService.target = "users"
            nsMessagingService.accountId = accountId
            nsMessagingService.customerId = customerId
            nsMessagingService.messageMe()
            // Public Message search
            nsMessagingService.target = "public"
            nsMessagingService.accountId = accountId
            nsMessagingService.messageMe()
        })
        clearTimeout(messageInterval)
    }, 10000)


}

//# sourceURL=api_messaging_service.js