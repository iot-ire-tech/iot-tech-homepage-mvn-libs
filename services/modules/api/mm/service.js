/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsMultimediaService = {
    mydb: "multimedia",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelItem: {
        "tab": {
            "position": "",
            "title": "",
            "icon": "",
            "header": "",
            "desc": ""
        },
        "media": {
            "type": "",
            "tag": "",
            "link": "",
            "alt": "",
            "dimensions": {
                "height": "200px",
                "width": "300px"
            }
        }
    },
    modelCreate: {
        "accountId": "",
        "productId": "",
        "customerId": "",
        "ts": "",
        "items": []
    },
    modelQuery: {
        "accountId": "",
        "productId": "",
    },
    create: function () {
        this.modelCreate.accountId = this.accountId;
        this.modelCreate.productId = this.productId;
        this.modelCreate.ts = getTs();

        if (this.items.length > 0) {
            // this.modelCreate.items = Array.from(this.itemsMap.values())
            this.modelCreate.items = this.items
            this.obj = postDbRequest(this.mydb, this.modelCreate)
            this.dbId = this.obj._id
        }

    },
    mediaItemType: "",
    getMediaItem() {
        try {
            nsMultimediaService.obj.items.forEach(function (mediaItem) {
                if (mediaItem.media.type === this.mediaItemType) {
                    throw mediaItem
                }
            }.bind(this))
        } catch (mediaItem) {
            return mediaItem
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


//# sourceURL=api_mm_service.js