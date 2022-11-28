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


var uxWebinarBrowser = function (data) {
    this.data = data;
    this.counter = 0;
    this.productItems = [];
    this.html = "";
    this.htmlModal = "";
    this.htmlTimetable = ""
    var checkboxStyle = "style='width:20px; height:20px; background:white; border-radius:5px; border:2px solid #555;'"

    this.init = function () {
        return this;
    };
    this.addHeader = function (accountId) {
        banner:{
            this.html = "<div class=\"w3-panel w3-padding w3-round-large w3-center\">"
            this.html += "<span id=hdr_" + accountId + "></span>"
            this.html += "</div>"
        }
        this.html += "</br>"

        this.html += "<table id=shop_" + accountId + " class='display ' style=width:100% >"
        this.html += "<thead> "
        this.html += "<tr>"
        this.html += "<th >Browsable Content</th> "
        this.html += "<th width=150px>Description</th> "

        this.html += "<th>Contact</th> "

//		var htmlIcons = "<i class=\"heart icon\"></i>&nbsp;"
        this.html += "<th >Like</th> "

        var htmlIcons = "<i class=\"fa fa-facebook-square\"></i>&nbsp;"
        htmlIcons += "<i class=\"fa fa-twitter\"></i>&nbsp;"
        htmlIcons += "<i class=\"fa fa-linkedin-square\"></i>&nbsp;"
        htmlIcons += "<i class=\"fa fa-envelope\"></i>"
        this.html += "<th >Share&nbsp;With&nbsp;Friends<br>" + htmlIcons + "</th> "

        this.html += "<th >Follow Me</th>"
        this.html += "<th >Best Price</th>"
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
        tmp = aslideShow.init(id, images, title).addHeader().addSlides().addFooter().getSlideShow();
//		tmp = "<br>"
        return tmp;
    }

    this.addBody = function () {
        this.html += "<tbody>"

        this.productItems.forEach(function (entity) {
            this.counter++;

            nsMultimediaService.accountId = entity.accountId
            nsMultimediaService.productId = entity.productId

            nsRevenueService.accountId = entity.accountId
            nsRevenueService.productId = entity.productId

            nsScheduleService.accountId = entity.accountId
            nsScheduleService.productId = entity.productId

            nsMetaService.accountId = entity.accountId
            nsMetaService.productId = entity.productId





            this.html += "<tr "
            this.html += "class=\"" + entity.accountId + "\" >"

            content:{


                this.html += "<td align=center>"

                nsMultimediaService.get()
                var ux = uxMultiMediaWidgetInline(nsMultimediaService.obj.items, "mmTabs")
                this.html += ux.build().getHtml()

                this.html += "</td>"
            }

            description:{

                this.html += "<td align=center>"
                nsMetaService.get()
                nsMetaService.obj.items !== undefined ?
                    nsMetaService.obj.items.forEach(function (meta) {
                        this.html += "<h3>" + meta.name + "</h3>"
                        this.html += "<span>" + meta.description + "</span>"
                    }.bind(this)) : null

                this.html += "<hr>"
                nsScheduleService.get()
                if (nsScheduleService.obj.items !== undefined) {
                    this.html += "<table class='w3-table'>"
                    nsScheduleService.obj.items.forEach(function (schedule) {
                        this.html += "<tr><td>Timezone: " + schedule.timezone + "</td></tr>"
                        this.html += "<tr><td>Start Time: " + new Date(schedule.startDateTime).toLocaleString() + "</td></tr>"
                        this.html += "<tr><td>Duration: " + schedule.duration.hours + " [mins]</td></tr>"
                        // this.html += "<tr><td>Duration: " + schedule.duration.hours + ":" + schedule.duration.minutes + "</td></tr>"
                    }.bind(this))
                    this.html += "</table>"
                }
                this.html += ""
                this.html += "</td>"
            }

            contactCell: {

                this.html += "<td align=center id=contact_" + this.counter + ">"

                this.html += '<button class="w3-button w3-round w3-gray btnContactMe"  style=\"width:55px\" '
                this.html += "productId=" + entity.productId + " accountId=" + entity.accountId + " customerId=" + customerId + " "
                this.html += '>'
                this.html += 'Contact&nbsp;Me'
                this.html += '<br><i class=\"user icon\"></i>'
                this.html += '</button><br>'

                this.html += "</td>"

            }

            like:{
                this.html += "<td align=center>"

                this.html += '<button class="w3-button w3-round w3-gray btnLikeMe" style=\"width:50px\" offering="+product.offering+" id="' + getRand() + '" accountId="' + entity.accountId + '"  productId="' + entity.productId + '" customerId="' + customerId + '">'
                this.html += 'Like'
                this.html += '<br>'
                this.html += "<span class=likeMeHook id=" + entity.productId + "></span>"
                this.html += '<i class=\"heart icon\"></i>'
                this.html += '</button>'
                this.html += '<br>'

                this.html += "</td>"
            }

            share:{
                this.html += "<td align=center>"

                this.html += "<a class=' ' href=#" + entity.id + "></a>"
                this.html += "<button class=\"w3-button w3-round w3-gray btnShare\"  style=\"width:50px\" offering=" + entity.offering + " accountId=" + entity.accountId + "  productId=" + entity.productId + " description = " + entity.description + " atitle=" + entity.name + " tag=" + entity.type + "," + entity.category + "," + entity.tag + ">Share<br><i class=\"share icon\"></i></button><br>"

                this.html += "</td>"
            }

            follow:{
                this.html += "<td align=center>"
                this.html += '<button class="w3-button w3-round w3-gray btnFollowMe"  style=\"width:50px\"  offering="+product.offering+" productId="' + entity.productId + '" customerId="' + customerId + '">Follow&nbsp;Me<br><i class=\"user plus icon\"></i></button><br>'
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
            purchaseCheckBox  :{
                // Notice the " " between the += :)
                this.html += '<td align=center>'
                this.html += "<input "
                this.html += checkboxStyle + " "

                this.html += " type=checkbox "
                this.html += " class=shop "

                this.html += " offering=webinar "
                this.html += " webinarHubUsage=true "

                this.html += " trId=" + this.counter + " "
                this.html += " productId=" + entity.productId + " "
                nsWebinarService.dbId = entity.links.webinarId
                nsWebinarService.getByDbId()
                this.html += " webinarId=" + nsWebinarService.obj.webinarId + " "
//// Used to charge the product
                this.html += " accountId=" + entity.accountId + " "
                this.html += " title=\"" + entity.name + "\" "
                this.html += " cost=" + cost + " "
                this.html += " discount=" + discount + " "


                // defaults
                this.html += "pnpId=\"\" "
                this.html += "pocId=\"\" "
//
                this.html += " id=action_" + this.counter + " "
                this.html += " />"
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
//# sourceURL=stripe_table_webinar.js