/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsEntitiesService = {
    mydb: "entities",
    port: 8094,
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "dbId": "",
        // Make default
        "mode": "resource",
        "offering": "",

        // tracking
        "ts": getTs(),
        // meta
        "name": "",
        "description": "",
        "type": "service",
        "category": "",
        "tag": "",
        // Legal
        "schedule": {
            "startDateTime": getTs(),
            "endDateTime": getTs()
        },
        // Legal
        "geo": {
            "lng": "",
            "lat": "",
            "hgt": "",
            "url": ""
        },
        "links": {
            "bankId": "",
            "bookingId": "",
            "cardId": "",
            "chargeId": "",
            "clientId": "",
            "couponId": "",
            "couponIds": [],
            "customerId": "",
            "dbInventoryId": "",
            "invoiceId": "",
            "paymentMethodId": "",
            "planId": "",
            "planIds": [],
            "primaryId": "",
            "sourceId": "",
            // ProvisioningIds
            "assetId": "",
            "metaId": "",
            "metaIds": [],
            "revenueId": "",
            "revenueIds": [],
            "businessId": "",
            "legalId": "",
            "covidId": "",
            "scheduleId": "",
            "pocId": "",
            "pnpId": "",
            "bizHoursId": "",
            "fixturesId": "",
            "seatingId": "",
            "capacityMgtId": "",
            "capacityAlertingId": "",
            "ttbId": "",
            "mmIds": "",
            "locationId": "",
            "subscriptionId": "",
            "subscriptionIds": [],
            "tokenId": "",
            "usageId": "",
            "videoHubId": "",
            "webinarId": ""
        }

    },
    modelQuery: {
        "accountId": "",
        "productId": "",
        "mode": ""
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.type = this.type; // default is service
            this.obj = doMsPost(this.port, "create", this.modelCreate)
            this.dbId = this.obj.dbId
            this.productId = this.obj.productId

        } catch (errMsg) {
            alert(errMsg)
        }

    },
    update: function () {
        this.obj = doMsPut(this.port, "update", this.obj, this.dbId)
    },
    serviceGet: function () {
        var query = "accountId=" + this.modelQuery.accountId + "&productId=" + this.modelQuery.productId
//		var rsp = this.get("https://www.mybusinesspal.com/entities/get?accountId=acct_1GRdJxF6KR5nnzB2&productId=prod_HIqrrSdRkT5srg")
//		var rsp = this.get("http://localhost:8094/get?accountId=acct_1GRdJxF6KR5nnzB2&productId=prod_HIqrrSdRkT5srg")

        this.obj = doMsGet(this.port, "get", query)
    },
    serviceGetType: function () {
        var query = {
            "accountId": this.modelQuery.accountId,
            "mode": this.modelQuery.mode
        }
        var rsp = getDbRequestQuery("entities", query)
        this.obj = rsp;
        return rsp;
    },
    serviceList: function () {
        var query = "accountId=" + this.modelQuery.accountId
//		var rsp = this.get("http://localhost:8094/list?accountId=acct_1GRdJxF6KR5nnzB2")
        var rsp = doMsGet(this.port, "list", query)
        return rsp;
    },

    serviceDelete: function (id) {
        var rsp = postDbRequestDelete(this.port, "delete", id)
    },
    // serviceGetType: function () {
    //     var query = {
    //         "accountId": this.modelQuery.accountId,
    //         "mode": this.modelQuery.mode
    //     }
    //     var rsp = getDbRequestQuery("entities", query)
    //     return rsp;
    // },
    getX: function (url) {

        return $.ajax({
            url: url,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            async: false,
            headers: {},
            dataType: 'json',
            success: function (data, text) {
                return data;
            },
            error: function (request, status, error) {
                return error;
            }
        }).responseJSON;
    },
    postX: function (url) {
        return $.ajax({
            url: url,
            type: "POST",
            async: false,
            headers: {"x-apikey": "5dfe3837bf46220df655ddbf"},
            data: JSON.stringify(payload),
            contentType: "application/json; charset=utf-8",
            success: function (data, text) {
                that.data = data;
                that.text = text;
            },
            error: function (request, status, error) {
                that.request = request;
                that.status = status;
                that.error = error;
            }
        });
    },
    deleteLinks: function () {

        this.get() // acount /Product
        var dbId = this.dbId

        // TODO subscription / entity service deleting entity links ..
        for (const prop in this.obj.links) {
            var linkId = nsEntitiesService.obj.links[prop]
            console.log("INF: prop: " + prop + " has value(s)  (" + linkId + ")")

            // DB Deletes
            if (prop === "subscriptionId" && linkId.length > 0) {
                nsSubsServices.dbId = linkId
                nsSubsServices.getByDbId().delete()
            }
            if (prop === "subscriptionIds" && linkId.length > 0) {
                nsSubsServices.dbId = linkId
                nsSubsServices.getByDbId().delete()
            }
            if (prop === "planId" && linkId.length > 0) {
                nsPlansService.dbId = linkId
                nsPlansService.getByDbId().delete()
            }
            if (prop === "planIds" && linkId.length > 0) {
                nsPlansService.dbId = linkId
                nsPlansService.getByDbId().delete()
            }

            if (prop === "couponId" && linkId.length > 0) {
                nsCouponsService.dbId = linkId
                nsCouponsService.getByDbId().delete()
            }

            if (prop === "metaId" && linkId.length > 0) {
                nsMetaService.dbId = linkId
                nsMetaService.getByDbId().delete()
            }

            if (prop === "revenueId" && linkId.length > 0) {
                nsRevenueService.dbId = linkId
                nsRevenueService.getByDbId().delete()
            }

            if (prop === "businessId" && linkId.length > 0) {
                nsBusinessService.dbId = linkId
                nsBusinessService.getByDbId().delete()
            }

            if (prop === "bizHoursId" && linkId.length > 0) {
                nsBizHoursService.dbId = linkId
                nsBizHoursService.getByDbId().delete()
            }
            if (prop === "pocId" && linkId.length > 0) {
                nsPoCService.dbId = linkId
                nsPoCService.getByDbId().delete()
            }


        }


        // Finally Stripe Product Delete
        try {
            // Stripe record!
            this.crudOps.payload = {"accountId": this.accountId, "productId": this.productId}
            this.crudOps.ep = "ProductDelete"
            this.crudOps.delete()
            // then DB record!
            this.getByDbId().delete();
        } catch (errMsg) {
            alert("ERR:" + errMsg)
        }
    },
    refreshListing: function () {
        // refresh list
        this.uxWidgetListing = new UxEntitiesListing()
        if (this.obj.length > 0) {
            this.uxWidgetListing.data = this.obj
        } else {
            this.uxWidgetListing.data = []
        }
        var list = this.uxWidgetListing.init()
        uxLoad(".existingEntities", list)
    },
    resetAccumulators: function () {
        // Tests are common...not good
        this.items = []
        this.itemsMap = new Map()
        // this.modelCreate.items = []
    },
    resetResults: function () {
        // results data
        this.dbId = ""
        this.dbIds = []
    }
}


//# sourceURL=api_entities_service.js