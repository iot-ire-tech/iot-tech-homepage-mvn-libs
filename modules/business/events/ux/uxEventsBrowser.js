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


var uxEventsBrowser = function () {
    this.counter = 0;
    this.productItems = [];
    this.html = "";
    this.htmlModal = "";
    this.htmlTimetable = ""
    this.accountId = "";
    var checkboxStyle = "style='width:20px; height:20px; background:white; border-radius:5px; border:2px solid #555;'"

    this.init = function () {
        return this;
    };
    this.addHeader = function (accountId) {
//		this.html = "<div class=\"w3-panel w3-center \" style=\"background-color: #FF5722!important;\">"
        banner:{
            this.html = "<div class=\"w3-panel w3-center w3-light-gray\">"
            this.html += "<br>"
            this.html += "<span id=hdr_" + accountId + "></span>"
            this.html += "<br>"
            this.html += "<br>"
            this.html += "</div>"
        }

        this.html += "<table id=shop_" + accountId + " class='display ' style=width:100%>"
        this.html += "<thead>"
        this.html += "<tr>"
        this.html += "<th width=250px>Gallery</th> "
//		this.html += "<th width=50px>Social Media</th> "
        this.html += "<th width=50px>Event</th> "
        this.html += "<th width=20px>Contact</th>"
        this.html += "<th width=20px>Tickets Remaining</th> "
        this.html += "<th width=20px>Best Prices</th> "
        this.html += "<th width=20px title='check bookings for full list price list'>Book Now!</th>"
        this.html += "<th width=20px>Add To Cart</th>"
        this.html += "</tr> </thead>"
        return this;
    };
    this.addFooter = function () {
        this.html += "</table>"
        return this;
    };
    this.getSlideShow = function (id, images, title) {
        var aslideShow = new slideShowFunc();
        tmp = aslideShow.init(id, images, title).addHeader().addSlides().addFooter().getSlideShow();
//		tmp = "<br>"
        return tmp;
    }

    this.addBody = function (bookingsWidget) {
        this.html += "<tbody>"
        this.productItems.forEach(function (product) {
            this.counter++;

            nsRevenueService.accountId = product.accountId
            nsRevenueService.productId = product.productId
            nsRevenueService.assetId = product.links.assetId

            nsSeatingService.accountId = product.accountId
            nsSeatingService.productId = product.productId
            nsSeatingService.assetId = product.links.assetId

            nsBizHoursService.accountId = product.accountId
            nsBizHoursService.productId = product.productId
            nsBizHoursService.assetId = product.links.assetId

            nsCapacityMgtService.accountId = product.accountId
            nsCapacityMgtService.productId = product.productId
            nsCapacityMgtService.assetId = product.links.assetId // Biz

            nsFixturesService.accountId = product.accountId
            nsFixturesService.productId = product.productId
            nsFixturesService.assetId = product.links.assetId // Biz
            

            nsMultimediaService.accountId = product.accountId
            nsMultimediaService.productId = product.productId

            nsBookingService.ux.dialogueProps.width = "33%"
            nsBookingService.accountId = product.accountId
            nsBookingService.productId = product.productId
            nsBookingService.assetId = product.links.assetId


            nsBookingService.capacityMgtService = nsCapacityMgtService
            nsBookingService.fixturesService = nsFixturesService
            nsBookingService.revenueService = nsRevenueService
            nsBookingService.bizHoursService = nsBizHoursService

            // If units = 0 Disable ROW, and alert....column....
            this.html += "<tr "
            this.html += "class=\"" + product.accountId + "\" >"


            content: {

                mm: {
                    nsMultimediaService.get()
                    // var htmlGallery = this.getSlideShow(product.accountId, nsMultimediaService.obj.items, "Test")
                    var ux = uxMultiMediaWidgetInline(nsMultimediaService.obj.items, "mmTabs")
                    var htmlGallery = ux.build().getHtml()
                    // htmlGallery = ""
                }

                like:{
                    var htmlLike = '<button class="w3-button w3-round w3-gray btnLikeMe" style=\"width:50px\" offering=event id="' + getRand() + '" accountId="' + product.accountId + '"  productId="' + product.productId + '" customerId="' + customerId + '">'
                    htmlLike += 'Like'
                    htmlLike += '<br>'
                    htmlLike += "<span class=likeMeHook id=" + product.productId + "></span>"
                    htmlLike += '<i class=\"heart icon\"></i>'
                    htmlLike += '</button>'
                }
                share:{
                    // Use this during share process
                    var htmlShare = "<a class=' ' href=#" + product.id + "></a>"
                    htmlShare += "<button class=\"w3-button w3-round w3-gray btnShare\"  style=\"width:50px\"  offering=event accountId=" + product.accountId + "  productId=" + product.productId + " description = " + product.description + " atitle=" + product.name + ">Share<br><i class=\"share icon\"></i></button>"
                }
                follow:{
                    var htmlFollowMe = '<button class="w3-button w3-round w3-gray btnFollowMe"  style=\"width:50px\"  offering=event productId="' + product.productId + '" customerId="' + customerId + '">Follow&nbsp;Me<br><i class=\"user plus icon\"></i></button>'
                }

                var preview = "<div >"
                preview += htmlGallery
                preview += "</div>"
                preview += "<br>"

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
            }

            itemDesc :{
                this.html += "<td align=center class=details-control  id=name_" + this.counter + "><span style=\"font-size:18px \"><b>" + product.name + "</b></span><hr><span style=\"font-size:12px\"></b>" + product.description + "<b></span></td>"
            }

            // var pocRsp = nsPoCService.serviceGet({"accountId": product.accountId, "productId": product.productId, })[0]
            contactCell2: {

                this.html += "<td align=center id=contact_" + this.counter + ">"

                this.html += '<button class="w3-button w3-round w3-gray btnContactMe"  style=\"width:55px\" '
                this.html += "productId=" + product.productId + " accountId=" + product.accountId + " customerId=" + customerId + " "
                this.html += '>'
                this.html += 'Contact&nbsp;Me'
                this.html += '<br><i class=\"user icon\"></i>'
                this.html += '</button><br>'


                this.html += "</td>"
            }

            capacity:{
                // Utilization
                // Get seating
                // Bet bookings for the entity
                utilizationCalc:{
                    var utilizationRsp = nsBookingService.getUtilization()
                }
                this.html += "<td align=center>" + utilizationRsp.msg + "</td>"
            }

            cost : {
                nsRevenueService.get()
                var cost = 0
                var discount = 0
                // Price List!
                // discount = nsRevenueService.obj.items[0].discount

                nsSeatingService.getBestPrice()
                cost = nsSeatingService.bestPrice
                if (discount > 0)
                    this.html += "<td align=center><span>" + cost + "<br></span><span class=\"w3-tag w3-round w3-red\">Plus " + discount + "% discount on purchase!</span></td>"
                else {
                    this.html += "<td align=center><span>" + cost + "</span></td>"
                    discount = 0.00 // fixes NaN
                }
            }

            booking: {
                var addInlineBookingWidget = false
                // Query for assetId
                this.html += "<td align=\"center\">"
                if (addInlineBookingWidget) {
                    this.html += uxBookingReservationWidget.init(product)
                } else {
                    this.html += "<button  assetId=" + product.links.assetId + " productId=" + product.productId + " accountId=" + product.accountId + " offering=" + product.offering + "  class='w3-button w3-round w3-small w3-gray bookingMgt'>"
                    this.html += "Book Me"
                    this.html += "</button>"
                }
                this.html += "</td>"
            }

            checkout:  {
                this.html += '<td align=center >'
                this.html += "<input "
                this.html += checkboxStyle + " "
                this.html += "disabled "
                this.html += "type=checkbox "
                this.html += "class=shop "
                this.html += "trId=" + this.counter + " "
                // Asset Info
                this.html += "offering=event "
                this.html += "productId=" + product.productId + " "
                this.html += "assetId=" + product.links.assetId + " "
                this.html += "accountId=" + product.accountId + " "
                // Cart
                this.html += "title=\"" + product.name + "\" "
                this.html += "cost=" + cost + " " // lowest cost, but actuall cost will come from the booking update
                this.html += "discount=" + discount + " "

                // defaults
                this.html += "pnpId=\"\" "
                this.html += "pocId=\"\" "

                // Used to charge the product
                this.html += "id=action_" + this.counter + " "
                this.html += "/>"
                this.html += "</td>"
            }
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

//# sourceURL=stripe_eventsbrowser_ux_widget.js