/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var uxMultiMediaWidgetInline = function (data, myclass) {
	this.data = data;
	this.myclass = myclass;
	this.html = ""

	var addHeader = function () {
		this.html = "<span id=" + id + " class='fa fa-facebook-square fa-2x dialogPreviewMedia' style='color:#3b5998' title='Double click on icon to see social media presentations'></span>"
		this.html += "<br>"
		this.html += "<span id=" + id + " class='fa fa-youtube fa-2x dialogPreviewMedia' style='color:#ff0000' title='Double click on icon to see social media presentations'></span>"
		this.html += "<br>"
		this.html += "<span id=" + id + " class='fa fa-video-camera fa-2x dialogPreviewMedia' style='color:#000000' title='Double click on icon to see social media presentations'></span>"
		this.html += "<br>"
	}

// Wrapping in own Model

	// Model
	build = function () {

		this.html = "<div class=" + this.myclass + ">"

		headers:{
			this.html += '<ul>'
			this.data.forEach(function (item, index) {

				if (item.media.type === "facebook") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-facebook-square fa-1x w3-padding-large'  style='color:#3b5998'></span>" + item.tab.title + " </a></li>"
				} else if (item.media.type === "youtube") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-youtube fa-1x w3-padding-large' style='color:#ff0000'></span>" + item.tab.title + " </a></li>"
				} else if (item.media.type === "video") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-video-camera fa-1x w3-padding-large' style='color:#000000'></span>" + item.tab.title + " </a></li>"
				} else if (item.media.type === "audio") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-facebook-square fa-1x w3-padding-large' style='color:#000000'></span>" + item.tab.title + " </a></li>"
				} else if (item.media.type === "html") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-html5 fa-1x w3-padding-large' style='color:#000000'></span>" + item.tab.title + " </a></li>"
				} else if (item.media.type === "image") {
					this.html += "<li><a href=#tabs-" + index + "> <span class='fa fa-file-image-o fa-1x w3-padding-large' style='color:#000000'></span>" + item.tab.title + " </a></li>"
				}

			})
			this.html += '</ul>'
		}

		defaults: {
			// http://clips.vorwaerts-gmbh.de/VfE_this.html5.mp4
			var mediaLinkVid = "http://clips.vorwaerts-gmbh.de/VfE_this.html5.mp4"
			var mediaLinkImage = "https://www.w3schools.com/html/pic_trulli.jpg"
			var mediaLinkSocialFb = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=true&appId"
			var mediaLinkSocialYoutube = "https://www.youtube.com/embed/tgbNymZ7vqY"
			var mediaLinkAudio = "https://www.w3schools.com/html/horse.mp3"
		}
		var mediaLinkCustomer = "START,"
		this.data.forEach(function (item, index) {
			this.html += "<div id=tabs-" + index + ">"


			var multiMediaLink = item.media.link
			var hgt = item.media.dimensions.height
			var wdt = item.media.dimensions.width


			if (item.media.type === "youtube" || item.media.type === "facebook" || item.media.type === "social") {

				this.html += "<br>"
				this.html += "<span >" + item.tab.header + "</span>"
				this.html += "<br>"

				this.html += "<iframe"
				this.html += " class='w3-center'"


				if (multiMediaLink === "") {
					this.html += " src=\"" + mediaLinkSocialYoutube + "\" "
				} else {

					this.html += " src=\"" + multiMediaLink + "\" "
				}

				this.html += " width=" + wdt + " "
				this.html += " height=" + hgt + " "
				this.html += ' style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true">'
				this.html += ' </iframe>'

				this.html += "<br>"
				this.html += "<span >" + item.tab.desc + "</span>"
				this.html += "<br>"
				mediaLinkCustomer += encodeURI(multiMediaLink)
				mediaLinkCustomer += ","

			} else if (item.media.type === "video") {

				this.html += "<span >" + item.tab.header + "</span>"
				this.html += "<br>"
				this.html += "<br>"

				this.html += '<video width=400 controls >'
				if (multiMediaLink === "") {
					this.html += "<source src=\"" + mediaLinkVid + "\" type=video/mp4  width=" + wdt + " height=" + hgt + " > Your browser does not support HTML video."
				} else {
					this.html += "<source src=\"" + multiMediaLink + "\" type=video/mp4  width=" + wdt + " height=" + hgt + " > Your browser does not support HTML video."


				}
				this.html += '</video>'

				this.html += "<br>"
				this.html += "<br>"
				this.html += "<span >" + item.tab.desc + "</span>"
				this.html += "<br>"

				mediaLinkCustomer += encodeURI(multiMediaLink)
				mediaLinkCustomer += ","

			} else if (item.media.type === "html") {

				this.html += "<br>"
				this.html += "<span >" + item.tab.header + "</span>"
				this.html += "<br>"

				this.html += multiMediaLink

				this.html += "<br>"
				this.html += "<span >" + item.tab.desc + "</span>"
				this.html += "<br>"

			} else if (item.media.type === "audio") {

				this.html += "<br>"
				this.html += "<span >" + item.tab.header + "</span>"
				this.html += "<br>"


				this.html += "<audio controls>"
				this.html += "<source src=\"" + multiMediaLink + "\" type=audio/mpeg  width=" + wdt + " height=" + hgt + " >"
				this.html += "Your browser does not support the audio element."
				this.html += "</audio>"

				this.html += "<br>"
				this.html += "<span >" + item.tab.desc + "</span>"
				this.html += "<br>"
				mediaLinkCustomer += encodeURI(multiMediaLink)
				mediaLinkCustomer += ","


			} else if (item.media.type === "image") {

				this.html += "<br>"
				this.html += "<span >" + item.tab.header + "</span>"
				this.html += "<br>"

				if (multiMediaLink === "") {
					this.html += "<img src=\"" + mediaLinkImage + "\" width=" + wdt + " height=" + hgt + " />"
				} else {
					this.html += "<img src=\"" + location.origin + contextPath + "/resources/media/clients/acct/image/default/" + multiMediaLink + "\" width=" + wdt + " height=" + hgt + " />"

				}

				this.html += "<br>"
				this.html += "<span >" + item.tab.desc + "</span>"
				this.html += "<br>"

				mediaLinkCustomer += encodeURI(multiMediaLink)
				mediaLinkCustomer += ","
			}


			this.html += '</div>'
		})
		mediaLinkCustomer += "END"


		// End Of Tabs
		this.html += "</ul>"
		this.html += ' </div>'
		return this;

	}
	getHtml = function () {
		return this.html;
	}
	return this;
}

//# sourceURL=api_mm_ux.js