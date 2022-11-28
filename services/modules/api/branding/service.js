/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var nsBrandingService = {
    mydb: "branding",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "uploads": [],
        "ts": getTs(),
        "items": [] // array from keys
    },
    modelItem: {
        "title": "",
        "tagLine": "",
        "media": {
            "favIcon": {
                "name": ""
            },
            "picHeader": {
                "name": "",
                "slideshow": false,
                "ext": ""
            },
            "picFooter": {
                "name": "",
                "slideshow": false,
                "ext": ""
            }
        },
        "font": {
            "color": "w3-text-deep-purple",
            "size": "",
            "family": "Georgia"
        },
        "timings": {
            "startDateTime": "",
            "endDateTime": ""
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {
        try {

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            if (this.items.length > 0) {
                this.modelCreate.items = this.items
                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbId = this.obj._id
            }

        } catch (errMsg) {
            alert(errMsg)
        }
    },

    brandImg: function (img) {
        $("#hdr").attr("src", this.mediapath + img)
        $("#hdr").attr("width", "100%")
        $("#hdr").attr("height", "130px")
        $("#hdr").attr("style", "object-fit:cover")
    },
    banner: function (img) {
        $("#hdr").attr("src", img)
        $("#hdr").attr("height", "130px")
        // $("#hdr").attr("style", "object-fit:cover")
    },
    hasBanner: false,
    mediapath: location.origin + contextPath + "/resources/media/clients/acct/image/default/",
    brandMe: function () {
        var banner = location.origin + contextPath + "/banner.png"
        banner = location.origin + contextPath + "/logos/LogoFiles/ForWeb/medium.png"
        this.getAccount();

        if (this.obj.length > 0) {
            this.obj.forEach(function (brandingRec) {
                brandingRec.items.forEach(function (branding) {
// midnit
                    if (new Date() >= new Date(branding.timings.startDateTime)) {
                        // Due to start

                        if (new Date(branding.timings.endDateTime) <= new Date()) {
                            // has not expired
                            // $("#hdr").attr("src", "/resources/media/clients/673859/image/hdr1/483400_football-2016_header.jpg")
                            $("#favicon").attr("href", this.mediapath + branding.media.favIcon.name);
                            $(document).attr("title", branding.title);

                            if ($("#hdr")) {
                                this.brandImg(branding.media.picHeader.name)
                            } else {
                                var ready = setInterval(function () {
                                    if ($("#hdr")) {
                                        clearInterval(ready)
                                        this.brandImg(branding.media.picHeader.name)
                                    }
                                }, 10)
                            }


                            $("#tagLine").text(branding.tagLine)
                            this.hasBanner = true
                        }
                    }
                }.bind(this))
            }.bind(this))
            if (!this.hasBanner) {

                if ($("#hdr")) {
                    this.banner(banner)
                } else {
                    var ready = setInterval(function () {
                        if ($("#hdr")) {
                            clearInterval(ready)
                            this.banner(banner)
                        }
                    }, 10)
                }
            }
        } else {
            if ($("#hdr")) {
                this.banner(banner)
            } else {
                var ready = setInterval(function () {
                    if ($("#hdr")) {
                        clearInterval(ready)
                        this.banner(banner)
                    }
                }, 10)
            }
        }
    }
}

//# sourceURL=api_branding_service.js