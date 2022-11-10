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


var uxVideoBrowser = function (data) {
	this.data = data;
	this.counter = 0;
	this.productItems = [];
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
	this.addHeader = function () {
		banner:{
			this.html = "<div class=\"w3-panel w3-padding w3-round-large w3-center\">"
			this.html += "<span id=hdr_" + this.accountId + "></span>"
			this.html += "</div>"
		}
		this.html += "</br>"

		this.html += "<table id=shop_" + this.accountId + " class='display ' style=width:100% >"
		this.html += "<thead> "
		this.html += "<tr>"
		this.html += "<th >Browsable Content</th> "
//		this.html += "<th width=50px>Description</th> "

		this.html += "<th>Owner Details</th> "

//		var htmlIcons = "<i class=\"heart icon\"></i>&nbsp;"
		this.html += "<th >Like</th> "

		var htmlIcons = "<i class=\"fa fa-facebook-square\"></i>&nbsp;"
		htmlIcons += "<i class=\"fa fa-twitter\"></i>&nbsp;"
		htmlIcons += "<i class=\"fa fa-linkedin-square\"></i>&nbsp;"
		htmlIcons += "<i class=\"fa fa-envelope\"></i>"
		this.html += "<th >Share&nbsp;With&nbsp;Friends<br>" + htmlIcons + "</th> "

		this.html += "<th >Follow Me</th>"
		this.html += "<th >Price</th>"
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
		return  tmp;
	}

	this.addBody = function () {
		this.html += "<tbody>"

		this.data.forEach(function (product) {
			var images = ""
			this.counter++;

			this.counter++;

			nsSeatingService.accountId = product.accountId
			nsSeatingService.productId = product.productId
			nsMultimediaService.accountId = product.accountId
			nsMultimediaService.productId = product.productId

			nsBookingService.ux.dialogueProps.width="33%"
			nsBookingService.accountId = product.accountId
			nsBookingService.productId = product.productId
			nsBookingService.assetId = product.links.assetId

			nsCapacityMgtService.accountId = product.accountId
			nsCapacityMgtService.productId = product.productId
			nsCapacityMgtService.assetId = product.links.assetId // Biz
			nsFixturesService.accountId = product.accountId
			nsFixturesService.productId = product.productId
			nsFixturesService.assetId = product.links.assetId // Biz

			nsBookingService.interOps.nsCapacityMgtService = nsCapacityMgtService
			nsBookingService.interOps.nsFixturesService = nsFixturesService

			discount = parseFloat(product.revenue.costs.discountedAmount)



			// If units = 0 Disable ROW, and alert....column....
			this.html += "<tr "
			this.html += "class=\"" + this.accountId + "\" >"

			video:{


				this.html += "<td align=center>"
				var html = '<div class="tabsVideo contentVideoTab" >'
				html += '<ul>'
				product.content.forEach(function (content, index) {
					if (index === 0)
						html += "<li><a href=#tabs-" + index + "> <span class=w3-padding-large>Organizers Profile</span></a></li>"
					else if (index === 1)
						html += "<li><a href=#tabs-" + index + "> <span class=w3-padding-large>Series Preview</span></a></li>"
					else
						html += "<li><a href=#tabs-" + index + "> <span class=w3-padding-large>Episode#" + (index - 1) + "</span></a></li>"
				})
				html += '</ul>'

				var mediaLinkIntro = ""
				var mediaLink = ""
				var mediaLinkCustomer = "START,"
				product.content.forEach(function (content, index) {
					html += "<div id=tabs-" + index + "  >"

					if (content.tag === "vid" || content.tag === "preview") {
						html += '<video width=400 controls >'
						mediaLink = location.origin + contextPath + "/resources/media/clients/" + content.media
//					var basePath = location.origin + contextPath + "/resources/media/vids/vid1.mp4"
						html += "<source src=\"" + mediaLink + "\" type=video/mp4> Your browser does not support HTML video."
						html += '</video>'
						mediaLinkCustomer += encodeURI(mediaLink)
						mediaLinkCustomer += ","
					} else {
						mediaLinkIntro = location.origin + contextPath + "/resources/media/clients/" + content.media
						html += "<br>"
						html += "<span >" + product.item.name + "</span>"
						html += "<br>"
						html += "<br>"
						html += "<img src=\"" + mediaLinkIntro + "\" />"
						html += "<br>"
						html += "<br>"
						html += "<span >" + product.item.desc + "</span>"
					}


					html += '</div>'
				})
				mediaLinkCustomer += "END"
				html += '</div>'

				this.html += html
				this.html += "</td>"
			}

			if (false)
				desc: {
					this.html += "<td class=details-control  id=name_" + this.counter + ">"
					this.html += "<span>" + product.item.name + "</span>"
					this.html += "<hr>"
//			this.html += "<a id=" + product.productId + ">" + product.productId + "</a>"
					this.html += "<span>" + product.item.desc + "</span>"
					this.html += "</td>"
//			this.html += "<td id=desc_" + this.counter + "><span>" + product.item.desc + "</span></td>"
				}



			contactCell: {

				this.html += "<td id=contact_" + this.counter + ">"



				this.html += '<button class="w3-button w3-round w3-gray btnContactMe"  style=\"width:55px\" '
				this.html += "productId=" + product.productId + " customerId=" + customerId + " phone=" + product.organizer.mobile + " organizer=" + product.organizer.name + " email=" + product.organizer.email
				this.html += '">Contact&nbsp;Me<br><i class=\"user icon\"></i></button><br>'


				this.html += "</td>"
			}

			like:{
				this.html += "<td align=center>"

				this.html += '<button class="w3-button w3-round w3-gray btnLikeMe" style=\"width:50px\" id="' + getRand() + '" accountId="' + this.accountId + '"  productId="' + product.productId + '" customerId="' + customerId + '">'
				this.html += 'Like'
				this.html += '<br>'
				this.html += "<span class=likeMeHook id=" + product.productId + "></span>"
				this.html += '<i class=\"heart icon\"></i>'
				this.html += '</button>'
				this.html += '<br>'


				this.html += "</td>"
			}

			share:{
				this.html += "<td align=center>"
				// Use this during share process
				this.html += "<a class=' ' href=#" + product.id + "></a>"

				this.html += "<button class=\"w3-button w3-round w3-gray btnShare\"  style=\"width:50px\" accountId=" + this.accountId + "  productId=" + product.productId + " description = " + product.item.desc + " atitle=" + product.item.name + " tag=" + product.item.type + "," + product.item.category + "," + product.item.tag + ">Share<br><i class=\"share icon\"></i></button><br>"
				this.html += "</td>"
			}

			follow:{
				this.html += "<td align=center>"
				this.html += '<button class="w3-button w3-round w3-gray btnFollowMe"  style=\"width:50px\"  productId="' + product.productId + '" customerId="' + customerId + '">Follow&nbsp;Me<br><i class=\"user plus icon\"></i></button><br>'
				this.html += "</td>"
			}
			cost:{
				cost = parseFloat(product.revenue.cost)
				var costTag = "<div class=\"ui tag labels\"> <a class=\"ui label\">" + cost.toFixed(2) + " EUR</a></div>"
				discount = parseFloat(product.revenue.discount)
				if (product.revenue.discount > 0)
					this.html += "<td align=center><span>" + costTag + "<br></span><span class=\"w3-tag w3-round w3-red\">Plus " + discount + "% discount on purchase!</span></td>"
				else {
					this.html += "<td align=center><span>" + costTag + "</span></td>"
					discount = 0.00 // fixes NaN
				}
			}
			purchaseCheckBox  :{
				this.html += '<td align=center>'
				this.html += "<input "
				this.html += checkboxStyle + " "

				this.html += "type=checkbox "
				this.html += "class=shop "

				this.html += "trId=" + this.counter + " "
				this.html += "productId=" + product.productId + " "

				this.html += "offering=videoHub "
				this.html += "title=\"" + product.item.name + "\" "
				this.html += "desc=\"" + product.item.desc + "\" "
//// Used to charge the product
				this.html += "accountId=" + this.accountId + " "
				this.html += "cost=" + cost + " "
				this.html += "discount=" + discount + " "
				this.html += "videoHubUsage=true "
				this.html += "mediaLink=\"" + mediaLinkCustomer + "\" "
//
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
//# sourceURL=stripe_table_videohub.js