/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsReminderService = {
    mydb: "reminders",
    ux: {
        dialogueProps: {
            modal: true,
            autoOpen: true,
            draggable: true,
            resizable: false,
            width: "auto",
            position: {my: "top", at: "top", of: window},
            closeOnEscape: false
        },
        datepickerProps: {
//				format: 'd.m.Y H:i',
//				minDate: 0,
            startDate: new Date(),
            step: 15,
            inline: true,
            lang: 'en',
            timepicker: true,
            datepicker: true,
            todayButton: true
        }
    },

    accountId: "",
    productId: "",
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {

        return newRsp;
    } ,
    widgetCounter: -1,
    uxWidget: {} ,
    getWidgetUx: function () {
        var html = "";
        this.uxWidget.data=""
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidget.init(rsp.items);
    }
    ,
    uxWidgetListing: {} ,
    getWidgetListingUx: function () {
        var html = "";
        this.uxWidget.data=""
        this.modelQuery.accountId = this.accountId;
        this.modelQuery.productId = this.productId;
        var rsp = getDbRequestQuery(this.mydb, this.modelQuery)[0]
        return this.uxWidgetListing.init(rsp.items);
    }
    ,
    getByDbId: function (id) {
        var rsp = getDbRequestId(this.mydb, id)
        return rsp;
    }
    ,
    modelGetAll: {
        "accountId": ""
    },
    allObjects: [],
    getAll: function () {
        this.modelGetAll.accountId = this.accountId;
        this.allObjects = getDbRequestQuery(this.mydb, this.modelGetAll)
        return this.allObjects;
    }
    ,
    modelItem: {
        "customerId": "",
        "status": false
    },
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": []
    },
    create: function () {
        try {

        } catch (errMsg) {
            alert(errMsg)
        }
        this.modelCreate.accountId = this.accountId;
        this.modelCreate.productId = this.productId;
        var rsp = postDbRequest(this.mydb, this.modelCreate)
        return rsp;
    }
    ,
    update: function (rsp) {
        rsp = postDbRequest(this.mydb, rsp, rsp._id)
        return rsp;
    }
    ,
    delete: function () {

    }

}


//# sourceURL=api_bizHours_service.js