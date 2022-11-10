/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// bizHours_mon  01:00_60__13:00_780__(sfsdf)
//


// Create / Update service
//function isAvailable(accountId, productId, reservationDateraw) {


var nsBizHoursService = {
    mydb: "bizhoursmgt",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    startTimeMins: "",
    endTimeMins: "",
    startTimeMinsEpoch: "",
    endTimeMinsEpoch: "",
    isOpenResults: {
        "dow": false,
        "openTime": false,
        "closingTime": false,
        "status": false,
        "msg": ""
    },
    isOpen: function () {
        parsedata:{
            // this.startDateTime = new Date(this.startDateTime).toLocaleString()
            this.startDateTime = new Date(this.startDateTime)
            var dowInt = parseInt(new Date(this.startDateTime).getDay());
            this.dow = this.days [dowInt];
            var hod = parseInt(new Date(this.startDateTime).getHours());
            var mod = parseInt(new Date(this.startDateTime).getMinutes());
            this.startTimeMins = mod + (hod * 60)
            this.endTimeMins = this.startTimeMins + this.duration
            var endDateTime = new Date(this.startDateTime.getTime() + this.duration * 60000)

            // getTime /** Gets the time value in milliseconds. */
            this.startTimeMinsEpoch = (new Date(this.startDateTime).getTime() / 1000) / 60;
            this.endTimeMinsEpoch = this.startTimeMinsEpoch + this.endTimeMins;
        }

        reset:{
            this.isOpenResults.dow = false
            this.isOpenResults.openTime = false
            this.isOpenResults.closingTime = false
            // make it true...
            this.isOpenResults.status = false
        }

        this.get()
        this.obj.items.forEach(function (item) {
            // is same day
            if (item.dow === this.dow) {
                this.isOpenResults.dow = true
                if (this.startTimeMins >= item.startTimeMins)
                    this.isOpenResults.openTime = true
                if (this.endTimeMins > item.startTimeMins && this.endTimeMins <= item.endTimeMins)
                    this.isOpenResults.closingTime = true
            }

        }.bind(this));

        // Service Integration Point
        // Bookings meets BizHours.....

        results :{

            if (this.isOpenResults.dow === false) {
                try {
                    $(".addBooking[assetId=" + this.assetId + "]").attr("disabled", true)
                } catch (e) {
                }
                this.isOpenResults.msg = "Sorry bookings are only available on the following day selected (" + this.startDateTime + ")<br><br>"
                return false
            } else {
// DOW is good
                if (this.isOpenResults.openTime === false && this.isOpenResults.closingTime === false) {
                    try {
                        $(".addBooking[assetId=" + this.assetId + "]").attr("disabled", true)
                    } catch (e) {
                    }
                    this.isOpenResults.msg = "Sorry this booking slot is not available, as its outside both the opening (" + this.startDateTime + ") and closing hours selected (" + endDateTime + ")<br><br>"
                    return false
                } else if (this.isOpenResults.openTime === true && this.isOpenResults.closingTime === false) {
                    try {
                        $(".addBooking[assetId=" + this.assetId + "]").attr("disabled", true)
                    } catch (e) {

                    }

                    this.isOpenResults.msg = "Sorry this booking slot (" + this.startDateTime + ")  is not available, as its outside our closing hours selected (" + endDateTime + ")<br><br>"
                    return false
                } else if (this.isOpenResults.openTime === false && this.isOpenResults.closingTime === true) {
                    try {
                        $(".addBooking[assetId=" + this.assetId + "]").attr("disabled", true)
                    } catch (e) {
                    }
                    this.isOpenResults.msg = "Sorry this booking slot (" + this.startDateTime + ") is not available, as its outside our opening hours selected <br><br>"
                    return false
                } else if (this.isOpenResults.openTime === true && this.isOpenResults.closingTime === true) {
                    // TODO this ux elements dont belong here, as you are prevent this queury running on provisioning back end
                    try {
                        $(".addBooking[assetId=" + this.assetId + "]").attr("disabled", false)
                    } catch (e) {
                    }
                    // this.isOpenResults.msg = "Great, this service is available at this time<br>"
                    this.isOpenResults.msg = "Great, your booking slot is available.<br>"
                    this.isOpenResults.msg += "Why not consider adding some booking options below, or simply click on the \"Add Booking\" button to precede.<br><br>"
                    this.isOpenResults.status = true
                    return true
                }
            }
        }

    },
    addAnalytics() {
        if (this.isOpenResults.dow === false) {
            analytics_availability(btnBizHourDateraw)
        } else {
            if (this.isOpenResults.openTime === false && this.isOpenResults.closingTime === false) {
                analytics_availability(btnBizHourDateraw)
            } else if (this.isOpenResults.openTime === true && this.isOpenResults.closingTime === false) {
                analytics_availability(btnBizHourDateraw)
            } else if (this.isOpenResults.openTime === true && this.isOpenResults.closingTime === true) {
                analytics_availability(btnBizHourDateraw)
            }
        }

    },
    modelGetBizHours: {
        "accountId": "",
        "productId": ""
    },
    uxBusinessHoursListing: new UxBizHourListing(),
    getBizHoursListingUx: function () {
        // returns html table
        this.uxBusinessHoursListing.caption = "Regular Business Hours"
        this.uxBusinessHoursListing.small = true
        this.uxBusinessHoursListing.frame = false
        this.get()
        var html = this.uxBusinessHoursListing.init(this.obj.items);
        return html;
    },
    daysopen: 0,
    modelItem: {
        "dow": "",
        "startTime": "",
        "startTimeMins": "",
        "endTime": "",
        "endTimeMins": "",
        "annotate": "",
        "status": false
    },
    create: function () {
        this.dataSize = this.uxBusinessHoursWidget.getIds().length
        // should be pushed to analytics this is a business growth area!!!!
        try {
            if (this.dataSize > 0) {
                this.uxBusinessHoursWidget.getIds().forEach(function (item) {
                    this.modelItem = {}
                    this.modelItem.dow = $("#" + item.dowId).val();
                    this.modelItem.startTime = $("#" + item.openingId).val();
                    this.modelItem.startTimeMins = convertHrMin2Mins($("#" + item.openingId).val());
                    this.modelItem.endTime = $("#" + item.closingId).val();
                    this.modelItem.endTimeMins = convertHrMin2Mins($("#" + item.closingId).val())
                    this.modelItem.annotate = $("#" + item.annotateId).val();

                    if (this.modelItem.startTimeMins > this.modelItem.endTimeMins) {
                        throw Error("Your opening time  (" + this.modelItem.startTimeMins + ") is after closing time (" + this.modelItem.endTimeMins + ")")
                    } else if (this.modelItem.startTimeMins > this.modelItem.endTimeMins) {
                        throw Error("Your closing time  (" + this.modelItem.endTimeMins + ") is before opening time (" + this.modelItem.startTimeMins + ")")
                    }
                    this.modelCreate.items.push(this.modelItem);

                }.bind(this));

                this.modelCreate.accountId = this.accountId;
                this.modelCreate.productId = this.productId;
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id

            }
        } catch (errMsg) {
            alert(errMsg)
        }
    }
    ,
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


//# sourceURL=api_bizHours_service.js