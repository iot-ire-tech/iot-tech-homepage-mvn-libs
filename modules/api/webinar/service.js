/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsWebinarService = {
    mydb: "webinarhub",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "webinarId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
        "topic": "Test Webinar",
        "start_time": "2020-09-20T06:59:00Z",
        "duration": "60",
        "timezone": "America/Los_Angeles",
        "password": "avfhfgh",
        "agenda": "Test Webinar",
        "type": 5,
        "recurrence": {
            "type": 1,
            "repeat_interval": 1,
            "end_date_time": "2020-09-22T06:59:00Z"
        },
        "settings": {
            "host_video": "true",
            "hd_video": "true",
            "panelists_video": "true",
            "practice_session": "true",
            "approval_type": 0,
            "registration_type": 2,
            "registrants_email_notification": "",
            // "alternative_hosts": "",

            "audio": "both",
            "auto_recording": "none",

            "enforce_login": "false",
            // "enforce_login_domains": "false",
            "close_registration": "true",
            "show_share_button": "true",
            "allow_multiple_devices": "false",
            // Additional
//			"global_dial_in_countries": "true",
            "contact_name": "Anthony Ennis",
            "contact_email": "tonyennis@yahoo.com"
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    zoomRsp: {},
    mailerRsp: {},
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;
            // Test only...
            if (this.items.length > 0) {
                this.modelCreate.items = this.items;
                // Create Zoom webinar
                this.zoomRsp = postRequest("ZoomWebinarCreate", nsWebinarService.modelCreate);

                // Update DB
                this.modelCreate.webinarId = JSON.parse(this.zoomRsp).id
                if (this.modelCreate.webinarId !== undefined) {
                    this.obj = postDbRequest(this.mydb, this.modelCreate)
                    this.dbId = this.obj._id
                    // Mail Organiser
                    this.mailerRsp = postRequest("MailZoomWebinar", this.zoomRsp)

                    // Update Usage Model!!!
                } else{
                    throw Error("Webinar not created, contact support asap")
                }

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


var modelWebinarModel = {
    "zoom": {
        "topic": "Test Webinar",
        "start_time": "2020-09-20T06:59:00Z",
        "duration": "60",
        "timezone": "America/Los_Angeles",
        "password": "avfhfgh",
        "agenda": "Test Webinar",
        "type": 5,
        "recurrence": {
            "type": 1,
            "repeat_interval": 1,
            "end_date_time": "2020-09-22T06:59:00Z"
        },
        "settings": {
            "host_video": "true",
            "hd_video": "true",
            "panelists_video": "true",
            "practice_session": "true",
            "approval_type": 0,
            "registration_type": 2,
            "audio": "both",
            "auto_recording": "none",
            "enforce_login": "false",
            "close_registration": "true",
            "show_share_button": "true",
            "allow_multiple_devices": "false",
            // Additional
//			"global_dial_in_countries": "true",
            "contact_name": "Anthony Ennis",
            "contact_email": "tonyennis@yahoo.com"
        }
    },
    "zoomresponse": {},
    "revenue":
        {
            "cost": 0.00,
            "currency": "eur",
            "discount": 0.00
        },
    "content": []
}

//# sourceURL=api_webinar_service.js