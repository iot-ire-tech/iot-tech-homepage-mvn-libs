/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsInteroperabilityServiceMatrix = {
    "booking": {
//		"dependsOn": [nsBizHoursService, nsCapacityService]
    }
}
var nsBookingService = {
    mydb: "bookings",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    revenueService: {},
    capacityMgtService: {},
    bizHoursService: {},
    fixturesService: {},
    workflow: {
        addDuration: false,
        addStartDate: false,
        addDuration: false
    },
    isReadyToBook: function () {

        var addDuration = false
        var addStartDate = false
        var addProductId = false
        var addAssetId = false
        var addAccountID = false
        var addRevenue = false
        var addBizHours = false
        var addFixutures = false
        var addCap = false
        var addCapAsset = false
        var readyToBook = false

        if (this.revenueService.getCheck()) {
            addRevenue = true
        }
        this.capacityMgtService.productId = this.productId
        if (this.capacityMgtService.getCheck()) {
            addCap = true
        }
        this.capacityMgtService.productId = this.assetId
        if (this.capacityMgtService.getCheck()) {
            addCapAsset = true
        }
        if (this.bizHoursService.getCheck()) {
            addBizHours = true
        }
        if (this.offering === "event")
            if (this.fixturesService.getCheck()) {
                addFixutures = true
            }

        if (this.checkDuration()) {
            addDuration = true
        }
        if (this.checkStartDate()) {
            addStartDate = true
        }
        if (this.checkAccountId()) {
            addAccountID = true
        }
        if (this.checkAssetId()) {
            addAssetId = true
        }
        if (this.checkProductId()) {
            addProductId = true
        }

        if (this.offering === "event")
            readyToBook = addFixutures && addCapAsset && addRevenue && addCap && addBizHours && addDuration && addStartDate && addAccountID && addAssetId && addProductId
        else
            readyToBook = addCapAsset && addRevenue && addCap && addBizHours && addDuration && addStartDate && addAccountID && addAssetId && addProductId

        if (readyToBook) {
            return true
        } else {
            this.msg = "WRN: Not ready to book" + "\n"
            this.msg += "addAccountID: " + addAccountID + "\n"
            this.msg += "addProductId: " + addProductId + "\n"
            this.msg += "addAssetId: " + addAssetId + "\n"
            this.msg += "addDuration: " + addDuration + "\n"
            this.msg += "addStartDate: " + addStartDate + "\n"
            this.msg += "\n"
            this.msg += "addRevenue: " + addRevenue + "\n"
            this.msg += "addCap: " + addCap + "\n"
            this.msg += "addCapAsset: " + addCapAsset + "\n"
            this.msg += "addBizHours: " + addBizHours + "\n"
            this.msg += "addFixutures: " + addFixutures + "\n"
            this.msg += "\n"
            alert(this.msg)
            return false
        }

    },
    services: [],
    serviceItem: {
        "active": false,
        "type": "",
        "id": ""
    },
    // Override
    modelCreate: {
        "accountId": "",
        "assetId": "",
        "offering": "",
        "startDateTime": 0,
        "endDateTime": 0,
        "service": [],
        // Will have as many bookings as there is capacity
        "items": []
    },
    modelItem: {
        "active": true,
        "entityId": ""
    },
    startDateTime: "",
    endDateTime: "",
    duration: 0,
    numDurationTries: 3,
    numDayTries: 3,
    numSlotsTaken: 0,
    numSlotsAttempts: 0,
    maxNumSlotsAvailable: 0,
    currentNumSlotsRemaining: 0,
    isFirstBooking: false,
    modelQuery: {
        "accountId": "",
        "assetId": "",
        "productId": "",
        "startDateTime": 0,
        "endDateTime": 0
    },
    // are on an asset on activity/even
    //	nsAnalytics,
    features: {
        "nextavailable": true,
        "bizHourListing": true,
        "multibook": true
    },
    serviceLayer: [
        {
            "name": "console",
            "time": "preCreate",
            "action": "log",
            "args": "'x,y,z'",
            "status": false, // not requested
            "id": ""
        },
        {
            "name": "bizhours",
            "time": "preCreate",
            "action": "isAvailable",
            "args": "x,y,z",
            "status": true, // not requested
            "id": ""
        },
        {
            "name": "capacityMgt",
            "time": "preCreate",
            "action": "hasCapacity",
            "status": true, // not requested
            "id": ""
        },
        {
            "name": "capacityMgt",
            "time": "postCreate",
            "action": "hasCapacity",
            "status": true, // not requested
            "id": ""
        }],

    // Create or Update
    sqlQueryStringGen: function (queryType) {

        if (queryType === "existingBookings") {
//			var startDateTimeObj = new Date(this.startDateTime)
//			var startDateTime = moment(startDateTimeObj).add(0, 'm').toISOString();
//			var endDateTime = moment(startDateTimeObj).add(30, 'm').toISOString();

            queryType = {
                "accountId": this.accountId,
                "assetId": this.assetId,
                "$and": [{"startDateTime": {"$gte": {"$date": this.startDateTime}}}, {"endDateTime": {"$lte": {"$date": this.endDateTime}}}]
                // Will return records where active is true
                // "items" : {"$elemMatch": {"active": true}}
            }
            return queryType

        } else if (queryType === "nextBookings") {
            queryType = {
                "accountId": this.modelQuery.accountId,
                "assetId": this.modelQuery.assetId,
                "$and": [{"startTimeMins": {"$gte": this.startTimeMins}}, {"startDateTime": {"$lte": (this.endDateTime + this.duration)}}]
            }
            return queryType

        } else if (queryType == "getAll") {
            queryType = {
                "accountId": this.accountId
            }
            return queryType
        } else if (queryType == "deleteAll") {
            queryType = {
                "identity": {"$elemMatch": {"accountId": this.accountId}}
            }
            return queryType
        }

    },

    isBooked: function () {
        return true;
    },

    preProcess: function () {
        this.serviceLayer.forEach(function (service) {
// if status false
            if (service.status === false && service.time === "preCreate") {
// Executing service requests.
                var rst = eval(service.name + "." + service.action + "(" + service.args + ")")
                // update its id
                service.id = getRand();
                service.status = true
                console.log("INF: Executing service (" + service.name + ")")
                // Update service layer with Ids!!!
                //this.update();
            }
        })
    },
    setDuration: function (duration) {
        this.duration = duration
        return this;
    },
    checkDuration: function () {
        if (this.duration > 0) {
            this.updateEndDateTime()
            return true
        } else
            throw Error("Duration cannot be zero minutes")
    },
    updateEndDateTime: function () {
        // "2020/07/29 10:00"
        this.endDateTime = moment(new Date(this.startDateTime)).add(this.duration, 'm').format("YYYY/MM/DD HH:mm")
        this.endDateTime = moment(new Date(this.startDateTime)).add(this.duration, 'm').toISOString()
    },
    setStartDate: function (startDateTime) {
        this.startDateTime = startDateTime
        return this;
    },
    checkStartDate: function () {
        var msg = "This booking is set in the past."
        msg += "\n\nTodays date/time is (" + new Date() + ")\n\nYour trying to book for (" + new Date(this.startDateTime) + ")"
        msg += "\n\nChange booking date, to continue!"

        if (new Date(this.startDateTime) < new Date()) {
            // confirm(msg)
            var html;
            html = "<br>"
            html += "<span>Today's date is: " + new Date().toLocaleString() + "</span>"
            html += "<br>"
            html += "<span>But your booking is in the past: " + new Date(this.startDateTime).toLocaleString() + "</span>"
            html += "<br>"
            html += "<span class=\"w3-tag w3-yellow\">Please, update your booking date to a future date, to continue!</span>"
            html += "<br>"
            $(".msgNotification").fadeIn("fast").html(html).delay(20000).fadeOut("slow")
            throw Error("Start Date, is in the past, please adjust then continue")
        } else {
            this.workflow.addStartDate = true
            this.updateEndDateTime()
            return true
        }
    },
    setMaxNumSlotsAvailable: function () {
        this.capacityMgtService.accountId = this.accountId


        // account Id and product Id preset
        this.capacityMgtService.productId = this.productId
        this.capacityMgtService.obj = []
        this.capacityMgtService.get()
        if (this.capacityMgtService.obj.length === 0) {
            this.msg = "nsCapacityMgtService is not returning information on this item."
            this.msg += "\n"
            this.msg += "* productId:" + this.capacityMgtService.productId
            this.msg += "\n"
            throw Error(msg)
        } else
            this.maxNumSlotsAvailable = this.capacityMgtService.obj.levels.units_total

        // Next Asset Cap
        // overriding here.
        this.capacityMgtService.obj = []
        this.capacityMgtService.productId = this.assetId
        this.capacityMgtService.get()
        if (this.capacityMgtService.obj.length === 0) {
            this.msg = "nsCapacityMgtService is not returning information on this item."
            this.msg += "\n"
            this.msg += "* productId:" + this.capacityMgtService.productId
            this.msg += "\n"
            throw Error(msg)
        } else
            this.maxNumSlotsAvailable += this.capacityMgtService.obj.levels.units_total
    },
    hasSlot: function () {

        var q = this.sqlQueryStringGen("existingBookings")
        this.getExistingBookings(q)

        whatsBookedAnalysis: {
            this.numSlotsTaken = 0;
            this.numSlotsAttempts = 0;
            if (this.obj !== undefined)
                this.obj.items.forEach(function (item) {
                    if (item.active) {
                        this.numSlotsTaken++
                        this.numSlotsAttempts++
                    }
                    if (item.active === false) {
                        this.numSlotsAttempts++
                    }
                }.bind(this))
            this.currentNumSlotsRemaining = (this.maxNumSlotsAvailable - this.numSlotsTaken)

            // Case 1
            if (this.obj === undefined) {
                this.isFirstBooking = true;
                return true;
                // Case 1
            } else if (this.currentNumSlotsRemaining > 0) {
                this.numSlotsTaken = 0;
                this.isFirstBooking = false;
                return true;
                // Case Out of Capacity
            } else if (this.currentNumSlotsRemaining === 0) {
                // analytics...
                return false;
            }
        }
    },

    service: function () {
        if (this.hasSlot()) {

            console.log("Slots Available.(" + this.currentNumSlotsRemaining + ")");
            if (this.isFirstBooking) {
                this.items.push(this.item)
                this.create()
                console.log("New First booking created (" + this.dbId + ")");
            } else {
                this.obj.items.push(this.item)
                this.update()
                console.log("New booking added (" + this.dbId + ")");
            }

            // Job done
            $(".btnExitReservation").click()
            $(".bookingMgt[productId=" + this.productId + "]").attr("disabled", true)


        } else {
            console.log("No booking space available (" + this.currentNumSlotsRemaining + ")");
            // $(".bookingMgt[productId=" + this.productId + "]").attr("disabled", true)
            if (this.features.nextavailable && this.offering === "event") {
                // if (this.features.nextavailable) {
                $(".msgNotification").html("Sorry but this event is full to capacity. Try a different booking time, if available")
            } else if (this.features.nextavailable && this.offering === "activity") {
                // if (this.features.nextavailable) {
                this.getNextAvailableBooking()
                this.getNextAvailableBookingListing()
            }
            return null;
// 1. Update : Analytics lost rev no slots available
        }
    },

    modelGet: {
        "accountId": "",
        "assetId": ""
    },
    getUtilization: function () {
        var existingBookingsCounter = 0
        // Get Asset Cap
        this.capacityMgtService.productId = this.assetId
        this.capacityMgtService.get();

        // Must Include number of fixtures too, 5 fixtures, 5 times the capacity.
        // need to fixtures to get start/end data, then
        this.fixturesService.productId = this.productId
        this.fixturesService.get()
        this.fixturesService.obj.items.forEach(function (item) {
            this.startDateTime = item.startDateTime
            this.endDateTime = item.endDateTime


            // Now...get Bookings on asset
            var q = this.sqlQueryStringGen("existingBookings")
            console.table(q)
            this.getExistingBookings(q)
            this.numSlotsTaken = 0
            if (this.obj !== undefined)
                this.obj.items.forEach(function (item) {
                    if (item.active) {
                        this.numSlotsTaken++
                    }
                }.bind(this))

            existingBookingsCounter += this.numSlotsTaken

        }.bind(this))

        // reset
        var units_total = this.capacityMgtService.obj.levels.units_total;
        var units_upper = this.capacityMgtService.obj.levels.units_upper;
        var units_lower = this.capacityMgtService.obj.levels.units_lower;
        var bufferoverflow = this.capacityMgtService.obj.levels.bufferoverflow;


        var totcalCap = units_total * this.fixturesService.obj.items.length
        var unitRatio = (units_total - existingBookingsCounter) / totcalCap;

        var msg = "Ticket Availability"
        var stockLevelsRsp = {
            "percentage": 0.00,
            "msg": "",
            "available": false
        }
        if (unitRatio > units_upper) {
            stockLevelsRsp.msg = "High " + msg + "<div style=\"color: transparent; text-shadow: 0 0 0 #21BA45;\">&#9989;</div>"
        } else if (unitRatio >= units_lower && unitRatio <= units_upper) {
            stockLevelsRsp.msg = "Moderate " + msg + "<div style=\"color: transparent; text-shadow: 0 0 0 #21BA45;\">&#10071;</div>"
        } else if (unitRatio > 0 && unitRatio < units_lower) {
            stockLevelsRsp.msg = "Limited " + msg + "<div style=\"color: transparent; text-shadow: 0 0 0 #21BA45;\">&#10060;</div>"
        } else if (unitRatio >= (-1 * bufferoverflow) && unitRatio <= 0) {
            stockLevelsRsp.msg = "Very Limited " + msg + "<div style=\"color: transparent; text-shadow: 0 0 0 #21BA45;\">&#10060;</div>"
        } else if (unitRatio <= (-1 * bufferoverflow)) {
            stockLevelsRsp.msg = "Sorry, this item is present not available.<br>Contact the owner to request an increase in supply..<div style=\"color: transparent; text-shadow: 0 0 0 #21BA45;\">&#10062;</div>"
            stockLevelsRsp.available = false;
        }
        stockLevelsRsp.percentage = unitRatio * 100
        return stockLevelsRsp;
    }
    ,
    getExistingBookings: function (query) {
        this.obj = getDbRequestQuery(this.mydb, query)[0]
        if (this.obj !== undefined)
            this.dataSizeItems = this.obj.items.length
    }
    ,

    // are on an asset on activity/even
    getNextAvailableBooking: function () {
        // save
        var startDateTime = this.startDateTime
        var endDateTime = this.endDateTime

// Do while Biz hours is not exceeded.
        for (var i = 0; i < this.numDurationTries; i++) {

            this.startDateTime = this.endDateTime;
            var nextBookingStartObj = new Date(this.startDateTime)
            this.endDateTime = moment(nextBookingStartObj).add(this.duration, 'm').toISOString();

            console.log("Starting Attempt (" + i + ")")
            console.log("INF: Next Start Time.. " + this.startDateTime)
            console.log("INF: Next End Time.. " + this.endDateTime)

            if (this.hasSlot()) {
                console.log("INF: Next available booking window is .. " + this.startDateTime)
            }

        }
// reset
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    },
    getNextAvailableBookingListing: function () {
        // save
        var startDateTime = this.startDateTime
        var endDateTime = this.endDateTime

// Do while Biz hours is not exceeded.
        var html = ""
        html = ""
        var formatStr = "MMMM Do YYYY, h:mm:ss a"
        uxBookingReservationWidgetNextBookingListing = new UxBookingReservationWidgetNextBookingListing()
        uxBookingReservationWidgetNextBookingListing.frame = false
        uxBookingReservationWidgetNextBookingListing.small = true
        uxBookingReservationWidgetNextBookingListing.caption = "Next Available Times"
        var openBookings = []
        for (var i = 0; i < this.numDurationTries; i++) {
            this.startDateTime = this.endDateTime;
            var nextBookingStartObj = new Date(this.startDateTime)
            this.endDateTime = moment(nextBookingStartObj).add(this.duration, 'm').toISOString();

            if (this.hasSlot()) {
                console.log("INF: Next available booking window is .. " + this.startDateTime)
                openBookings.push({
                    "startDateTime": moment(this.startDateTime).format(formatStr),
                    "endDateTime": moment(nextBookingStartObj).add(this.duration, 'm').format(formatStr)
                })
            }

        }
        if (openBookings.length > 0) {
            $(".msgNotification").html("Sorry but this slot is full to capacity.")
            $(".nextAvailableBookings").html(uxBookingReservationWidgetNextBookingListing.init(openBookings))
        } else {
            $(".msgNotification").html("Looks like there are no more slots available for today, try tomorrow!")
        }
// reset
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    },
    modelDeleteBooking: {
        "identity": "",
        "entityId": ""
    },
    modelDeleteItem: {
        "accountId": "",
        "entityId": ""
    }
    ,
    modelDeleteAll: {
        "identity": ""
    },
    modelQueryList: {
        "accountId": ""
    },
    setByDbId: function (id) {
        var rsp = getDbRequestId(this.mydb, id)
        return rsp;
    },
    create: function () {
        this.modelCreate.accountId = this.accountId
        this.modelCreate.offering = this.offering
        this.modelCreate.assetId = this.assetId
        this.modelCreate.startDateTime = this.startDateTime
        this.modelCreate.endDateTime = this.endDateTime
        this.modelCreate.items = this.items
        this.obj = postDbRequest(this.mydb, this.modelCreate)
        this.dbId = this.obj._id
        return this.obj;
    }
}


var modelBookingReservationItemSocial =
    {
        "sentStatus": false,
        "socialNews": false,
        "socialAlerts": false,
        "smsAlert": false,
        "emailAlert": true,
        "customer": ""
    }
var modelBookingReservationItemReminder =
    {
        "sentStatus": false, "smsAlert": false, "emailAlert": true, "customer": "", "date": ""
    }

var orgBooking = {
    "_id": "5f14937e4ddf8b6c000025e5",
    "accountId": "acct_1GRdJxF6KR5nnzB2",
    "productId": "prod_Hfw1VCLtbKa4di",
    "bookingsRemaining": 26,
    "unitsRemaining": 2,
    "endTimeMins": 26588685,
    "startTimeMins": 26587665,
    "assetId": "prod_HbXijzpvPJ9jsn",
    "items": [
        {
            "customerId": "cus_HNzxxbSO3jBkMZ",
            "active": false,
            "date": "2020-07-19T18:39:25.067Z",
            "durationMins": 15,
            "reservationDate": "2020-07-20T15:45:00.000Z",
            "ts": "19/07/2020, 19:38",
            "cost": "0.60",
            "alerts": {},
            "comms": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customers": [
                    "cus_HNyvHREBEq9Zus"
                ]
            },
            "social": {
                "sentStatus": false,
                "socialNews": false,
                "socialAlerts": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ"
            },
            "reminder": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ",
                "date": ""
            }
        },
        {
            "customerId": "cus_HNzxxbSO3jBkMZ",
            "active": false,
            "date": "2020-07-19T18:43:30.569Z",
            "durationMins": 15,
            "reservationDate": "2020-07-20T15:45:00.000Z",
            "ts": "19/07/2020, 19:43",
            "cost": "0.60",
            "alerts": {},
            "comms": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customers": [
                    "cus_HNyuWfQ8VI9EdT"
                ]
            },
            "social": {
                "sentStatus": false,
                "socialNews": false,
                "socialAlerts": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ"
            },
            "reminder": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ",
                "date": ""
            }
        },
        {
            "customerId": "cus_HNzxxbSO3jBkMZ",
            "active": false,
            "date": "2020-07-19T18:46:22.417Z",
            "durationMins": 15,
            "reservationDate": "2020-07-20T15:45:00.000Z",
            "ts": "19/07/2020, 19:45",
            "cost": "0.60",
            "alerts": {},
            "comms": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customers": [
                    "cus_HNyoBSjTRU9cx7"
                ]
            },
            "social": {
                "sentStatus": false,
                "socialNews": false,
                "socialAlerts": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ"
            },
            "reminder": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ",
                "date": ""
            }
        },
        {
            "customerId": "cus_HNzxxbSO3jBkMZ",
            "active": false,
            "date": "2020-07-19T18:48:09.352Z",
            "durationMins": 15,
            "reservationDate": "2020-07-20T15:45:00.000Z",
            "ts": "19/07/2020, 19:47",
            "cost": "0.60",
            "alerts": {},
            "comms": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customers": [
                    "cus_HNyuWfQ8VI9EdT"
                ]
            },
            "social": {
                "sentStatus": false,
                "socialNews": false,
                "socialAlerts": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ"
            },
            "reminder": {
                "sentStatus": false,
                "smsAlert": false,
                "emailAlert": true,
                "customer": "cus_HNzxxbSO3jBkMZ",
                "date": ""
            }
        }
    ]
}

