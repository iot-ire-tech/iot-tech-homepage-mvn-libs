function format(d) {
// `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' + d.name + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' + d.extn + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>';
}

var columnFooter = function (obj) {
    this.obj = obj;
    this.addFooter = function () {
        this.html += "</table>"
        return this;
    };
}
var columnBook = function () {

    this.addBook = function () {
        this.html += "</table>"
        return this;
    };
}


var uxStoreBrowser = function () {
    this.counter = 0;
    this.itemItems = [];
    this.unitsRatio = -1;
    this.html = "";
    this.htmlModal = "";
    this.htmlTimetable = ""
    this.upstreamAccountId = "";
    this.accountId = "";
    var checkboxStyle = "style='width:20px; height:20px; background:white; border-radius:5px; border:2px solid #555;'"

    this.init = function () {
        return this;
    };
    this.addHeader = function (accountId) {
//		this.html = "<div class=\"w3-panel  w3-center \" style=\"background-color: #FF5722!important;\">"


        banner:{
            this.html = "<div class=\"w3-panel w3-padding w3-round-large w3-center\">"
//			this.html = "<div class=\"w3-center w3-light-gray\">"
            this.html += "<span id=hdr_" + accountId + "></span>"
            this.html += "</div>"
        }
        this.html += "</br>"

        this.html += "<table id=shop_" + accountId + " class='display compact' style='width:100% ;table-border-color-light: aqua' >"

        this.html += "<thead> <tr>"
        this.html += "<th width=200px>Gallery</th> "
        this.html += "<th width=50px>Item Description</th> "
        this.html += "<th width=50px>Contact</th> "
        this.html += "<th width=20px>Unit Price</th>"
        this.html += "<th width=100px>Post N Packaging</th>"
        this.html += "<th width=20px>Availability</th>"
        this.html += "<th width=20px>Add To Cart</th> "

        this.html += "</tr>"
        this.html += "</thead>"
        return this;
    };
    this.addFooter = function () {
        this.html += "</table>"
        return this;
    };

    this.getSlideShow = function (id, images, title) {
        var aslideShow = new slideShowFunc();
        tmp = aslideShow.init(id, images, title).addHeader("mySlidesStore").addSlides().addFooter().getSlideShow();
//		tmp = "<br>"
        return tmp;
    }

    this.addBody = function () {
        this.html += "<tbody>"

        this.productItems.forEach(function (item) {
            this.counter++;

            nsMultimediaService.accountId = item.accountId
            nsMultimediaService.productId = item.productId

            nsRevenueService.accountId = item.accountId
            nsRevenueService.productId = item.productId

            nsMetaService.accountId = item.accountId
            nsMetaService.productId = item.productId


            // If units = 0 Disable ROW, and alert....column....
            this.html += "<tr "
            this.html += "class=\"" + item.accountId + "\" >"


            content: {
                mm: {
                    nsMultimediaService.get()
                    var htmlGallery = this.getSlideShow(item.accountId, nsMultimediaService.obj.items, "Test")
                    // htmlGallery = ""
                }
                like:{
                    var htmlLike = '<button class="w3-button w3-round w3-gray btnLikeMe" style=\"width:50px\" offering=store id="' + getRand() + '" accountId="' + item.accountId + '"  productId="' + item.productId + '" customerId="' + customerId + '">'
                    htmlLike += "<span class=likeMeHook id=" + item.productId + ">Like</span>"
                    htmlLike += '<br>'
                    htmlLike += '<i class=\"heart icon\"></i>'
                    htmlLike += '</button>'
                }
                share:{
                    // Use this during share process
                    var htmlShare = "<a class=' ' href=#" + item.productId + "></a>"
                    htmlShare += "<button class=\"w3-button w3-round w3-gray btnShare\"  style=\"width:50px\"  offering=store accountId=" + item.accountId + "  productId=" + item.productId + " description = " + item.description + " atitle=" + item.name + ">Share<br><i class=\"share icon\"></i></button>"
                }
                follow:{
                    var htmlFollowMe = '<button class="w3-button w3-round w3-gray btnFollowMe"  style=\"width:50px\"  offering=store accountId="' + item.accountId + '"  productId="' + item.productId + '" customerId="' + customerId + '">Follow&nbsp;Me<br><i class=\"user plus icon\"></i></button>'
                }

                var preview = "<div>"
                preview += "<br>"
                preview += "<br>"
                preview += htmlGallery
                preview += "<br>"
                preview += "<br>"
                preview += "</div>"

                preview += "<div class=w3-row>"
                preview += "<div class=w3-third>"
                preview += htmlShare
                preview += "</div>"
                preview += "<div class=w3-third>"
                preview += htmlLike
                preview += "</div>"
                preview += "<div class=w3-third>"
                preview += htmlFollowMe
                preview += "</div>"
                preview += "</div>"


                this.html += "<td align=center><br>" + preview + "</td>"
//				this.html += "<td align=center><br>" + preview + "</td>"
//				this.html += "<td align=center>" + htmlGallery + "</td>"
//				this.html += "<td id=image_" + this.counter + "><img width=\"100%\" height=\"100%\" src=\"http://lorempixel.com/200/200/cats/\" alt=\"Sourcing images...\"></td>"
            }


            description:{
                // TODO take from META service...
                this.html += "<td class=details-control  id=name_" + this.counter + ">"
                this.html += "<span>" + item.name + "<hr>" + item.description + "</span>"
                this.html += "</td>"
            }


            var pocRsp = nsPoCService.serviceGet({"accountId": item.accountId, "productId": item.productId,})[0]
            contactCell2: {
// TODO add close button to dialog ... Organizers like to be contacted, they thank you!
                this.html += "<td align=center id=contact_" + this.counter + ">"


                this.html += '<button class="w3-button w3-round w3-gray btnContactMe"  style=\"width:55px\" '
                this.html += "productId=" + item.productId + " accountId=" + item.accountId + " customerId=" + customerId + " "
                this.html += "phone=" + pocRsp.phone + " organizer=" + pocRsp.fullName + " email=" + pocRsp.email + " "
                this.html += '>'
                this.html += 'Contact&nbsp;Me'
                this.html += '<br><i class=\"user icon\"></i>'
                this.html += '</button><br>'


                this.html += "</td>"
            }


            cost:{
                nsRevenueService.get()
                var cost = 0
                var discount = 0
                nsRevenueService.obj.items.forEach(function (item) {
                    cost = item.transaction
                    discount = item.discount
                }.bind(this))
                var costTag = "<div class=\"ui tag labels\"> <a class=\"ui label\">" + roundNumber(cost) + " EUR</a></div>"
                if (discount > 0)
                    this.html += "<td align=center><span>" + costTag + "<br></span><span class=\"w3-tag w3-round w3-red\">Plus " + discount + "% discount on purchase!</span></td>"
                else {
                    this.html += "<td align=center><span>" + costTag + "</span></td>"
                    discount = 0.00 // fixes NaN
                }
            }

            pnpMgt: {
                nsPnpService.accountId=item.accountId
                nsPnpService.productId=item.productId
                nsPnpService.get()
                var uxAssetPostNPackageListing = new uxAssetPostNPackageListingShop();
                // pnpMgtRsp = getAssetPostNPackageCost(item.accountId, item.productId)
                // var widget = uxAssetPostNPackageListing.init(pnpMgtRsp, item.productId)
                var widget = uxAssetPostNPackageListing.init(nsPnpService.obj, item.productId)
                this.html += "<td align=center><span>" + widget + "</span></td>"
            }

            inventoryMgt: {
                var inventoryRsp = getCapacityLevels(item.accountId, item.productId)[0]
                var stockLevelsRsp = analysisCapacityLevels(inventoryRsp);
                this.html += "<td align=center>" + stockLevelsRsp.msg + "</td>"
            }

// Purchase Checkbox
            // If run ratio is more negative than overflow, then disable
//			if (this.unitsRatio <= (-1 * inventoryRsp.bufferoverflow)) {
            if (stockLevelsRsp.available == false) {
                // Overflow check
                this.html += '<td align=center style="pointer-events:none; background-color:#d4d4d5">'
                this.html += "<input disabled "
                this.html += checkboxStyle + " "
                // nothing to do
            } else {
                this.html += '<td align=center>'
                this.html += "<input "
                this.html += checkboxStyle + " "
            }

            // This is used to bill / charge the custoemr during checkout time
            this.html += "type=checkbox "
            this.html += "class=shop "
            this.html += "trId=" + this.counter + " "
            this.html += "offering=store "

            this.html += "title=\"" + item.name + "\" "
            this.html += "productId=" + item.productId + " "
            this.html += "accountId=" + item.accountId + " "
            this.html += "assetId=" + item.links.assetId + " "

            this.html += "cost=" + cost + " "
            this.html += "discount=" + discount + " "
            this.html += "pnpId=" + nsPnpService.dbId + " "
            this.html += "pocId=" + pocRsp._id + " "

// Used by checkout function, to alert client, inventor issue ahoy!
//
            this.html += "id=action_" + this.counter + " "
            this.html += "/>"


            this.html += "</td>"
            this.html += "</tr>"
        }.bind(this))
        this.html += "</tbody>"
        return this;
    };
    this.getTable = function () {
        return this.html;
    };
    this.add = function () {
        this.html += "<label><b>Key</b></label>";
        this.html += "<input id=key_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"
        this.html += "<label><b>Value</b></label>";
        this.html += "<input id=val_" + this.counter + " class=\"data w3-input w3-hover-grey\" type=\"text\" value=\"\" required />"

        this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<button id=btnDel_" + this.counter + " class=\"del w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
        return this.html;
    };
};
//# sourceURL=stripe_storebrowser_ux_widget.js