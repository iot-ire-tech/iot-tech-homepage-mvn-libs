/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



class SocialHub extends Common {

	constructor(ctrl, msg) {
		super(ctrl, msg);
	}
	isValid(type) {
		// card
		switch (type) {
			case "props":
				if (this.payload.name.length === 0)
					return false;
				break;

			default:
				return false;
				break;
		}
		return true;
	}

	display(msg) {
		this.html = "<br>";
		this.html += "<caption>";
		this.html += msg;
		this.html += "</caption>";

		this.html += "<table class='w3-table-all'>";
		this.html += "<tr>";
		this.html += "<th>Name</th>";
		this.html += "<th>YouTube</th>";
		this.html += "<th>Facebook</th>";
		this.html += "</tr>";
		var that = this;
		var style = "style=\"margin-left: 10%; width: 80%; margin-right: 10%\""
		this.response.forEach(function (item) {
			that.html += "<tr>";
			that.html += "<td>" + item.name + "</td>";
			that.html += "<td><iframe allow=\"autoplay; encrypted-media\" " + style + " allowfullscreen src=" + item.social.youtube.name + "></iframe></td>";
			that.html += "<td><iframe " + style + " allowfullscreen src=" + item.social.facebook.name + "></iframe></td>";
			that.html += "</tr>";
		});
		this.html += "</table>";
		this.html += "<br>";

		return this.html;
	}

	uxFormUpdate(responseload) {
		$("#" + responseload.fk.type).val([responseload.fk.type]).trigger("change");
		// Semantic Drop or HTML Select
		var newVal = responseload.fk.dbId + "_" + responseload.fk.id;
		$('.ui.fluid.dropdown').dropdown('set selected', [newVal]); // Works



		$("#tagLine").val(responseload.name).trigger("change");
		$("#utube").val(responseload.social.youtube.name).trigger("change");
		$("#utubeTarget").val(responseload.social.youtube.name).trigger("change");
		$("#facebook").val(responseload.social.facebook.name).trigger("change");
		$("#facebookTarget").val(responseload.social.facebook.name).trigger("change");
	}
	uxFormClear() {
//		$("#tagRichContent").val();
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = this.payload.name
		return this;
	}

	queryBuilder(key) {
		this.queryMap = new Map();

		switch (key) {
			case "Q. List all?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By DbId?":
				this.query = {"pk.dbId": this.payload.pk.dbId};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Id?":
				this.query = {"pk.id": this.payload.pk.Id};
				this.queryMap.set(key, this.query);
				break;


			case "Q. By PkType (social)?":
				this.query = {"pk.type": "social"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By PkType (visual)?":
				this.query = {"pk.type": "visual"};
				this.queryMap.set(key, this.query);
				break;


			case "Q. By FkType (resource)?":
				this.query = {"fk.type": "resource"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By FkType (event)?":
				this.query = {"fk.type": "event"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By FkType (subEvent)?":
				this.query = {"fk.type": "subEvent"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By FkType (patron)?":
				this.query = {"fk.type": "patron"};
				this.queryMap.set(key, this.query);
				break;
			case "Q. By FkId?":
				this.query = {"fk.id": this.payload.fk.id};
				this.queryMap.set(key, this.query);
				break;
			default:

				break;
		}
		return this.queryMap.get(key);
	}

}



//# sourceURL=mediahub_service_social.js