/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// This is about searching for the right branding
// Can extend this to apply ux behaviours..

function brandingPatronWorkFlow(srv) {
	// no such branding defined for ladies / 40 ?
	if ((srv.getBranding("patron")) === undefined) {
		//console.log("WRN: No Patron Branding Exists - UnHappy Path -L1, Lets try Generic");

		brandingGenericWorkFlow(srv)
	} else {
		// Patron Branding Exists - Happy Days
		//console.log("INF: Patron Branding Exists - Happy Path!!");
		return srv.getRtBranding();
	}

}

function brandingGenericWorkFlow(srv) {
	// no such branding defined for ladies / 40 ?

	if ((srv.getBranding("generic")) === undefined) {
		//console.log("ERR: No Generic/Non Specific Branding Exists - UnHappy Path -L2. Lets use System Default Branding");
		srv.setRtBranding(modelBrandingDefault);
		return srv.getRtBranding();
	} else {
		// Use Generic Branding Then
		return srv.getRtBranding();
	}

}

class Branding extends Common {
	constructor(ctrl, msg) {
		super(ctrl, msg);
		this.brandings = [];

	}
	// Associations
	setPatron(patron) {
		this.patron = patron;
		return this;
	}
	getPatron() {
		return this.patron;
	}
	setGenericBranding(branding) {
		this.branding = branding;
		return  this;
	}
	getGenericBranding() {
		return  this.branding;
	}
	setRtBranding(branding) {
		this.brandingRt = branding;
		return  this;
	}
	getRtBranding() {
		return  this.brandingRt;
	}
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.branding.title.length === 0)
					return false;
				break;

			default:
				return false;
				break;
		}
		return true;
	}

	// Logic Statements
	isTargetedBranding() {
		this.queryByType("Q. List all(generic, gender, age)?")
		if (this.answer()) {
			return true;
		} else {
			return false;
		}
	}
	isPatronBrandingMatch(brandingItem) {
		if (brandingItem.target === this.patron.classification.generation
			&&
			brandingItem.target === this.patron.classification.gender
			) {
			return true;
		} else {
			return false;
		}

	}
	isGenericBrandingMatch(brandingItem) {
		if (brandingItem.target === "generic") {
			return true;
		} else {
			return false;
		}

	}

	display(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";

		this.html = "<br>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Type</th>";
		this.html += "<th>Target</th>";
		this.html += "<th>Name</th>";
		this.html += "<th>Publish Date</th>";
		this.html += "<th>Page Title</th>";
		this.html += "<th>Fav Icon</th>";
		this.html += "<th>Banner</th>";
		this.html += "<th>Footer</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + item.target + "</td>";
			that.html += "<td>" + item.name + "</td>";
			that.html += "<td>" + new Date(item.timings.publishDate.$date) + "</td>";
			that.html += "<td>" + item.branding.title + "</td>";
			that.html += "<td><img " + style + " src=" + contextPath + "/resources/media/clients/" + item.branding.favIcon.name + "></td>";
			that.html += "<td><img " + style + " src=" + contextPath + "/resources/media/clients/" + item.branding.hdr.name + "></td>";
			that.html += "<td><img " + style + "src=" + contextPath + "/resources/media/clients/" + item.branding.tdr.name + "></td>";

			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}

	uxFormUpdate(responseload) {
		// Radio Button - Select ONLY the button to be updated, using name will update all
//		$("#" + responseload.fk.type).val([responseload.fk.type]).trigger("change");
//		// Semantic Drop or HTML Select
//		var newVal = responseload.fk.dbId + "_" + responseload.fk.id;
//		$('.ui.fluid.dropdown').dropdown('set selected', [newVal]); // Works

		try {
//			$("input[name=groupGender]").val(responseload.target).trigger("click");
			$("input:radio[name=groupGender][value=" + responseload.target + "]").prop('checked', true);
//			$('input:radio[name=groupGender]:nth(1)').attr('checked', true);
//			$("input:radio[name=groupAge][value=" + responseload.target + "]").attr('checked', true);
			$("input:radio[name=groupAge][value=" + responseload.target + "]").prop('checked', true);
		} catch (e) {

		}

		$(".tagLine").val(responseload.name).trigger("change");
		$(".publishDate").val(responseload.timings.publishDate.$date).trigger("change")
		$(".title").val(responseload.branding.title).trigger("change");
		$("#brandingFavIcon").prop("src", location.origin + contextPath + "/resources/media/clients/" + responseload.branding.favIcon.name).trigger("change");
		$("#brandingHdrImg").prop("src", location.origin + contextPath + "/resources/media/clients/" + responseload.branding.hdr.name).trigger("change");
		$("#brandingTdrImg").prop("src", location.origin + contextPath + "/resources/media/clients/" + responseload.branding.tdr.name).trigger("change");

	}
	uxFormClear() {
//		$("#tagLine").val();
//		$("#picName").val();
//		$("#iconName").val();
//		$("#vidName").val();
	}
	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = this.payload.branding.title
		return this;
	}

	queryBuilder(key) {
		this.queryMap = new Map();

		switch (key) {
			case "Q. List all(generic, gender, age)?":
				this.query = {"pk.type": {$in: ["generic", "gender", "age"]}};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(gender)?":
				this.query = {"pk.type": "gender"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(generic)?":
				this.query = {"pk.type": "generic"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List by type(age)?":
				this.query = {"pk.type": "age"};
				this.queryMap.set(key, this.query);
				break;

			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;
			default:

				break;
		}
		return this.queryMap.get(key);
	}

	// Aim here is to return a branding, beit Generic, or Client
	// Alogorithm - Loop involved too....
	getBranding(mode) {
		// If no client then generic please
		if (this.isTargetedBranding()) {
			// We have client Branding , great, now lets match up with patron!!!
			try {
				var that = this;
				this.response.forEach(function (brandingItem) {
					switch (mode) {
						case "patron":
							if (that.isPatronBrandingMatch(brandingItem)) {
								that.setRtBranding(brandingItem);
								throw  "INF: Gender/Age Target Found"
							}
							break;
						case "generic":
							if (that.isGenericBrandingMatch(brandingItem)) {
								that.setRtBranding(brandingItem);
								throw  "INF: Generic Branding Found"
							}
							break;
						default:
							break;
					}
				});

			} catch (e) {
				switch (e) {
					case "INF: Gender/Age Target Found":
						this.targetedBranding = true;
						break;
					case "INF: Generic Branding Found":
						this.genericBranding = true;
						break;
				}
			}
		} else {
			// Generic is setting on iot db
			this.setRtBranding(this.getGenericBranding());
//			this.brandingRt = this.getGenericBranding();

		}

		if (this.genericBranding === false) {
			alert("ERR: Client has no generic branding configured");
		}
		if (this.targetedBranding === false) {
			alert("ERR: Client has no targeted branding configured");
		}
		return this.brandingRt;
	}

}

class BrandingWelcome extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
		return this;
	}

	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.modal.headline.length === 0)
					return false;
				break;

			default:
				return false;
				break;
		}
		return true;
	}

	modal(patron) {
		var html;
		var branding = this.queryByType("Q. List all?")[0]

		$(".welcomeIcon").attr("src", location.origin + "/" + contextPath + "/resources/media/clients/" + branding.modal.icon.name);
		$("#welcomeMessage").text("Welcome " + patron.fname + " , " + branding.modal.headline);

		html = ""
		html += "<p class=\"w3-center\">To enjoy video in full screen, double click it</p>"
//	html += "<video autoplay controls id=myVideo >"
		html += "<video autoplay controls id=myVideo width=300px height=300px >"

// Depending on the patron, will determine the vide!!
//		if (branding.media.vid1.slideshow === true && localStorage.welcomeVidDisable !== "false") {
//		}
		html += "<source src=" + location.origin + "/" + contextPath + "/resources/media/clients/" + branding.modal.vid.name + " type=\"video/mp4\">"

		html += "</video>"
		html += "<br><label>Check if you dont want to see again </label>"
		html += "<input id=welcomeVidDisable type=checkbox >"

		document.getElementById('id01').style.display = 'block'

		$("#welcomeVid").html(html)
		$('#myVideo').bind('ended', function () {
//		$(this).parent().fadeOut()
			document.getElementById('id01').style.display = 'none'
			redirectMe(location.origin + contextPath + "/ux/client/portal/userPortal.jsp?clientId=" + patron.clientId + "&patronId=" + patron.id);
		})
		$('#myVideo').on('click', function () {
			fullScreenIt($(this).attr("id"))
		});
		$('#welcomeVidDisable').on('click', function () {
			// Update Patron Object
			localStorage.setItem("welcomeVidDisable", false)
		});

		$(document).on("click", "#endWelcome", patron, function () {
			redirectMe(location.origin + contextPath + "/ux/client/portal/userPortal.jsp?clientId=" + patron.clientId + "&patronId=" + patron.id);
//		redirectMe("../../client/portal/userPortal.jsp?clientId=" + patronObj.clientId + "&patronId=" + patronObj.id);
		});
	}

	display(msg) {

		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";
		this.html += "<table class='w3-table-all'>";

		this.html = "<br>";
		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Type</th>";
		this.html += "<th>Publish Date</th>";
		this.html += "<th>Headline</th>";
		this.html += "<th>Icon</th>";
		this.html += "<th>Content</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.pk.type + "</td>";
			that.html += "<td>" + new Date(item.timings.publishDate.$date) + "</td>";
			that.html += "<td>" + item.modal.headline + "</td>";
			that.html += "<td><img " + style + " src=" + location.origin + contextPath + "/resources/media/clients/" + item.modal.icon.name + "></td>";
			that.html += "<td><video controls " + style + " src=" + location.origin + contextPath + "/resources/media/clients/" + item.modal.vid.name + "></td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}

	queryBuilder(key) {
		this.queryMap = new Map();

		switch (key) {
			case "Q. List by type(welcome)?":
				this.query = {"pk.type": "welcome"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;
		}
		return this.queryMap.get(key);
	}

	uxFormUpdate(responseload) {

		$(".headline").val(responseload.modal.headline).trigger("change");
		$(".publishDate").val(responseload.timings.publishDate.$date).trigger("change");
		$("#welcomeIcon").prop("src", location.origin + contextPath + "/resources/media/clients/" + responseload.modal.icon.name).trigger("change");
		$("#welecomeVid").prop("src", location.origin + contextPath + "/resources/media/clients/" + responseload.modal.vid.name).trigger("change");

	}
	uxFormClear() {
		$(".headline").val("").trigger("change");
		$(".publishDate").val("").trigger("change");
		$("#welcomeIcon").val("").trigger("change");
		$("#welecomeVid").val("").trigger("change");
	}
	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = this.payload.name
		return this;
	}
}
;

class BrandingPage extends Branding {
	constructor(ctrl, msg) {
		super(ctrl, msg);
	}
	setTitle() {
		$(document).attr("title", super.getRtBranding().branding.title);
	}
	setFavIcon() {
		$("#favicon").attr("href", location.origin + "/" + contextPath + "/resources/media/clients/" + super.getRtBranding().branding.favIcon.name);
		$("#favicon").attr("type", "image/gif");
		$("#favicon").attr("sizes", "16x16");

	}
	setHeader(mode) {
		var html;
		switch (mode) {
			case "image":
				tmp = location.origin + "/" + contextPath + "/resources/media/clients/" + super.getRtBranding().branding.hdr.name;
//				html = "<img src=" + tmp + " class=\"w3-border w3-padding\" style=\"width:2000px; height: 200px; border: 1;\" alt=\"No Banner Pic\">";
				html = "<img src=" + tmp + " class=\"w3-container w3-center\" style=\"width:100%; height: 200px;\" alt=\"No Banner Pic\">";
				$("#header").html(html);
				break;

			case "html":
				$("div#brandingHeader").load(location.origin + "/" + contextPath + "/services/branding/ux/brands.html  #" + super.getRtBranding().clientId + "_Header", function () {
					$("#header").html($(this));
				});
				break;
			default:

				break;
		}
	}
	setHeaderFooter(mode) {
		var html;
		switch (mode) {
			case "image":
				tmp = location.origin + "/" + contextPath + "/resources/media/clients/" + super.getRtBranding().branding.hdr.name;
//				html = "<img src=" + tmp + " class=\"w3-border w3-padding\" style=\"width:2000px; height: 200px; border: 1;\" alt=\"No Banner Pic\">";
				html = "<img src=" + tmp + " class=\"w3-container w3-center\" style=\"width:100%; height: 200px;\" alt=\"No Banner Pic\">";
				$("#header").html(html);
				tmp = location.origin + "/" + contextPath + "/resources/media/clients/" + super.getRtBranding().branding.tdr.name;
//				html = "<img src=" + tmp + " class=\"w3-border w3-padding\" style=\"width: 2000px; height: 200px; border: 1;\" alt=\"No Banner Pic\">";
				html = "<img src=" + tmp + " class=\"w3-container w3-center\" style=\"width: 100%; height: 200px; \" alt=\"No Footer Pic\">";
				$("#footer").html(html);
				break;

			case "html":
				$("div#brandingHeader").load(location.origin + "/" + contextPath + "/services/branding/ux/brands.html  #" + super.getRtBranding().clientId + "_Header", function () {
					$("#header").html($(this));
				});
				$("div#brandingFooter").load(location.origin + "/" + contextPath + "/services/branding/ux/brands.html  #" + super.getRtBranding().clientId + "_Footer", function () {
					$("#footer").html($(this));
				});

				break;
			default:

				break;
		}
	}
}

//class BrandingMessageBox extends Branding {
//}
//
//// Argumetn about association and extentsion.
//class BrandingPatron extends Branding {
//}






function brandFavIconWelcome(branding) {

	$("#welcomeIcon").attr("href", location.origin + "/" + contextPath + "/resources/media/clients/" + branding.media.iconWelecome.name);
	$("#welcomeIcon").attr("type", "image/gif");
	$("#welcomeIcon").attr("sizes", "16x16");

}

function transitionVid(clientId, branding) {

	if (branding.targetAudience === patron.classification.generation) {

//	$("#favicon").attr("sizes", "16x16");
	}
}

//# sourceURL=services_module_branding_service.js