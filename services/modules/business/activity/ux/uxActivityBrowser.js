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


var uxActivitiesBrowser = function () {
    this.counter = 0;
    this.html = "";
    var checkboxStyle = "style='width:20px; height:20px; background:white; border-radius:5px; border:2px solid #555;'"

    this.init = function () {
        return this;
    };
    this.addHeader = function (accountId) {
//		this.html = "<div class=\"w3-panel w3-center \" style=\"background-color: #FF5722!important;\">"
        this.html = "<div class=\"w3-panel w3-center w3-light-gray\">"
        this.html += "<br>"
        this.html += "<span id=hdr_" + accountId + "></span>"
        this.html += "<br>"
        this.html += "<br>"
        this.html += "</div>"
        this.html += "<table id=shop_" + accountId + " class='display ' style=width:100%>"

//		this.html += "<thead> <tr> <th width=50px>Title</th>  <th width=30px>Description</th> <th width=250px>Activity Preview</th> <th width=250px>Social Media</th> <th width=20px>Contact Details</th> <th width=20px>Time Table</th> <th width=20px>Cost</th> <th width=20px>Book</th> <th width=20px>Purchase</th> </tr> </thead>"
        this.html += "<thead> <tr>"
        this.html += "<th width=200px>Preview</th> "
        this.html += "<th width=50px>Activity</th> "
        this.html += "<th width=50px>Contact</th> "
        this.html += "<th width=20px>Time Table</th>"
        this.html += "<th width=20px>Best Price!</th>"
        this.html += "<th width=20px>Booking</th>"
        this.html += "<th width=20px>Add To Cart</th> "
        this.html += "</tr>"
        this.html += "</thead>"

        return this;
    };
    this.addFooter = function () {
        this.html += "</table>"
        return this;
    };
    this.addTimeTable = function (timetable) {
        this.htmlTimetable = timetable
        return this;
    };
    this.getSlideShow = function (id, images, title) {
        var aslideShow = new slideShowFunc();
        tmp = aslideShow.init(id, images, title).addHeader().addSlides().addFooter().getSlideShow();
//		tmp = "<br>"
        return tmp;
    }

    this.getSocialMedia = function (srcInFb, srcInYouTube, srcInPromoVid, id) {
        var addFb = false;
        var addYouTube = false;
        var addPromoVid = false;
        this.iframe = "<span id=" + id + " class='fa fa-facebook-square fa-2x dialogPreviewMedia' style='color:#3b5998' title='Double click on icon to see social media presentations'></span>"
        this.iframe += "<br>"
        this.iframe += "<span id=" + id + " class='fa fa-youtube fa-2x dialogPreviewMedia' style='color:#ff0000' title='Double click on icon to see social media presentations'></span>"
        this.iframe += "<br>"
        this.iframe += "<span id=" + id + " class='fa fa-video-camera fa-2x dialogPreviewMedia' style='color:#000000' title='Double click on icon to see social media presentations'></span>"
        this.iframe += "<br>"

// Wrapping in own Model

        // Model
        this.iframe += "<div id=\"dialogPreviewMedia" + id + "\" title=\"Information Point\"  class=\"dialogPreviewMedia  w3-hide w3-container w3-center \" >"
        // Head
        this.iframe += "<br>"
        this.iframe += "<h3>Social Media Content Browser</h3>"
        this.iframe += "<br>"

        // Tabs - Start
        this.iframe += "<div class=\"tabsMedia\">"
        this.iframe += "<ul>"
        this.iframe += "<li><a href=\"#tabsMedia-1\">Facebook <span class='fa fa-facebook-square fa-1x'></span> </a></li>"
        this.iframe += "<li><a href=\"#tabsMedia-2\">Youtube  <span class='fa fa-youtube fa-1x'></span></a></li>"
        this.iframe += "<li><a href=\"#tabsMedia-3\">Promotional Video  <span class='fa fa-video-camera fa-1x'></span></a></li>"
        this.iframe += "</ul>"

        this.iframe += "<div id=\"tabsMedia-1\">"
        this.iframe += "<iframe"
        this.iframe += " class=' w3-center'"
        if (srcInFb === undefined) {
            addFb = false;
            this.iframe += " src=https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&appId"
//			this.iframe += " src=https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&width=734&height=502&appId"
        } else {
            addFb = false;
            this.iframe += " src=" + srcInFb
        }
        this.iframe += " width=100% "
        this.iframe += " height=100% "
        this.iframe += ' style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true">'
        this.iframe += ' </iframe>'
        if (!addFb)
            this.iframe += '<p>Sorry, but there is presently, no facebook video associated with this product, but enjoy this one</p>'
        this.iframe += ' </div>'


        this.iframe += "<div id=\"tabsMedia-2\">"
        this.iframe += "<iframe"
        this.iframe += " class=' w3-center'"
        if (srcInYouTube === undefined) {
            addYouTube = false;
            this.iframe += " src=https://www.youtube.com/embed/tgbNymZ7vqY"
        } else {
            addYouTube = false;
            this.iframe += " src=" + srcInYouTube
        }
        this.iframe += " width=100% "
        this.iframe += " height=100% "
        this.iframe += ' style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true">'
        this.iframe += ' </iframe>'
        if (!addYouTube)
            this.iframe += '<p>Sorry, but there is presently, no youtube video associated with this product, but enjoy this one</p>'
        this.iframe += ' </div>'


// Tab-3
        this.iframe += "<div id=\"tabsMedia-3\">"
        this.iframe += "<video  controls>"
        if (srcInPromoVid === undefined) {
            addPromoVid = false;
            this.iframe += "<source src=http://clips.vorwaerts-gmbh.de/VfE_html5.mp4 >"
        } else {
            addPromoVid = true;
            this.iframe += "<source src=" + srcInPromoVid + " >"
        }
        this.iframe += ' </video>'
        if (!addPromoVid)
            this.iframe += '<p>Sorry, but there is presently, no promo video associated with this product, but enjoy this one</p>'
        this.iframe += ' </div>'


        // End Of Tabs
//		this.iframe += "</ul>"
        this.iframe += ' </div>'
        // End Of Model
        this.iframe += "<br>"
        this.iframe += "<br>"
        this.iframe += ' </div>'
//		$("#dialogPreviewMediaHook").html(html)
        return this.iframe;
    }

    this.addBody = function () {
        this.html += "<tbody>"
        this.productItems.forEach(function (item) {

            this.counter++;
            // If units = 0 Disable ROW, and alert....column....
            this.html += "<tr "
            this.html += "class=\"" + item.accountId + "\" >"

            body: {

                nsMultimediaService.accountId = item.accountId
                nsMultimediaService.productId = item.productId

                nsRevenueService.accountId = item.accountId
                nsRevenueService.productId = item.productId

                nsMetaService.accountId = item.accountId
                nsMetaService.productId = item.productId

                nsBizHoursService.accountId = item.accountId
                nsBizHoursService.productId = item.productId

                var assetId = item.links.assetId


                content: {
                    mm: {
                        var htmlGallery = ""
                        nsMultimediaService.get()
                        var ux = uxMultiMediaWidgetInline(nsMultimediaService.obj.items, "mmTabs")
                        htmlGallery += ux.build().getHtml()
                    }

                    like:{
                        var htmlLike = '<button class="w3-button w3-round w3-gray btnLikeMe" style=\"width:50px\" offering=activity id="' + getRand() + '" accountId="' + item.accountId + '"  productId="' + item.productId + '" customerId="' + customerId + '">'
                        htmlLike += "<span class=likeMeHook id=" + item.productId + ">Like</span>"
                        htmlLike += '<br>'
                        htmlLike += '<i class=\"heart icon\"></i>'
                        htmlLike += '</button>'
                    }
                    share:{
                        // Use this during share process
                        var htmlShare = "<a class=' ' href=#" + item.productId + "></a>"
                        htmlShare += "<button class=\"w3-button w3-round w3-gray btnShare\"  style=\"width:50px\"  offering=activity accountId=" + item.accountId + "  productId=" + item.productId + " description = " + item.description + " atitle=" + item.name + ">Share<br><i class=\"share icon\"></i></button>"
                    }
                    follow:{
                        var htmlFollowMe = '<button class="w3-button w3-round w3-gray btnFollowMe"  style=\"width:50px\"  offering=activity accountId="' + item.accountId + '" productId="' + item.productId + '" customerId="' + customerId + '">Follow&nbsp;Me<br><i class=\"user plus icon\"></i></button>'
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
                    this.html += "<td class=details-control  id=name_" + this.counter + "><span style=\"font-size:18px \"><b>" + item.name + "</b></span><hr><span style=\"font-size:12px\"></b>" + item.description + "<b></span></td>"
                }

                contactCell: {

                    this.html += "<td id=contact_" + this.counter + ">"

                    // query poc

                    var pocRsp = nsPoCService.serviceGet({"accountId": item.accountId, "productId": item.productId,})[0]
                    this.html += '<button class="w3-button w3-round w3-gray btnContactMe"  style=\"width:55px\" '
                    this.html += "productId=" + item.productId + " accountId=" + item.accountId + " customerId=" + customerId + " "
                    this.html += "phone=" + pocRsp.phone + " organizer=" + pocRsp.fullName + " email=" + pocRsp.email + " "
                    this.html += '>'
                    this.html += 'Contact&nbsp;Me'
                    this.html += '<br><i class=\"user icon\"></i>'
                    this.html += '</button><br>'


                    this.html += "</td>"
                }

                timeTable :{
                    // nsBizHoursService.uxBusinessHoursListing = UxBusinessHoursListing
                    this.html += "<td id=date_" + this.counter + ">" + nsBizHoursService.getBizHoursListingUx() + "</td>"
                }

                cost : {
                    nsRevenueService.get()
                    var cost = 0
                    var discount = 0
                    // Price List!
                    var revenueRsp = nsRevenueService.obj.items.sort(function (a, b) {
                        return a.transactionCent - b.transactionCent
                    });
                    // cost = roundNumber(revenueRsp[nsRevenueService.obj.items.length - 1].transaction)
                    cost = roundNumber(revenueRsp[0].transaction)
                    discount = revenueRsp[0].discount

                    var costTag = "<div class=\"ui tag labels\"> <a class=\"ui label\">" + cost + " EUR</a></div>"
                    if (discount > 0)
                        this.html += "<td align=center  title=\"Click on booking for more prices!\"><span>" + costTag + "<br></span><span class=\"w3-tag w3-round w3-red\">Plus " + discount + "% discount on purchase!</span></td>"
                    else {
                        this.html += "<td align=center  title=\"Click on booking for more prices!\"><span>" + costTag + "</span></td>"
                        discount = 0.00 // fixes NaN
                    }
                }


                booking: {
                    var addInlineBookingWidget = false
                    // Query for assetId
                    this.html += "<td align=\"center\">"
                    if (addInlineBookingWidget) {
                        this.html += uxBookingReservationWidget.init(item.accountId, item.productId, assetId)
                    } else {

                        this.html += "<button  assetId=" + item.links.assetId + " productId=" + item.productId + " accountId=" + item.accountId + " offering=" + item.offering + "  class='w3-button w3-round w3-small w3-gray bookingMgt'>"
                        this.html += "Book Me"
                        this.html += "</button>"
                    }
                    this.html += "</td>"
                }

                checkout:  {
                    this.html += '<td align=center >'
                    //this.html += '<td align=center style="pointer-events:none; background-color">'
                    // Input
                    this.html += "<input type=checkbox "
                    this.html += checkboxStyle + " "
                    this.html += "disabled "
                    this.html += "class=shop "
                    this.html += "trId=" + this.counter + " "
                    this.html += "offering=activity "

                    // Cart
                    this.html += "title=\"" + item.name + "\" "
                    this.html += "cost=" + cost + " "
                    this.html += "discount=" + discount + " "

                    // Asset Info
                    this.html += "productId=" + item.productId + " "
                    this.html += "assetId=" + assetId + " "
                    this.html += "accountId=" + item.accountId + " "
                    // need by checkout
                    this.html += "revenueId=" + item.links.revenueId + " "
                    this.html += "pnpId=\"" + item.links.pnpId + "\" "
                    this.html += "pocId=\"" + item.links.pocId + "\" "

                    this.html += "id=action_" + this.counter + " "
                    this.html += "/>"
                    this.html += "</td>"
                }
            }
            this.html += "</tr>"
        }.bind(this))
//		this.html = this.html;
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
//# sourceURL=stripe_table_activitybrowser.js