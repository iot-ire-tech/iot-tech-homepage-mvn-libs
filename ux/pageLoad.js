/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class PageLoad {

	constructor(url, targetId, sourceId) {
		this.targetId = targetId;
		this.url = url;
		this.sourceId = sourceId;
		return this;
	}
	get() {
		// https://stackoverflow.com/questions/11583271/how-to-load-the-content-of-a-file-into-variable-using-jquery-load-method

		$("#" + this.targetId).load(this.url, function (response, status, xhr) {
			return response;
		});
	}

	put() {
		$("#" + this.targetId).load(this.url, function (response, status, xhr) {

			if (status == "error") {
				var msg = "ERR: Page couldnt load: ";
//			$("#error").html(msg + xhr.status + " " + xhr.statusText);
			}

		});
	}
	putII() {
		$.ajax({
			url: this.url,
			type: "get",
			contentType: "application/html; charset=utf-8"
		}).done(function (data, text) {
			//console.log("Response Message Text (" + text + ")");
		}).fail(function (request, status, error) {
			//console.log("Response status (" + status + ")");
		});
	}
	setPayload(payload) {
		this.payload = payload
		return  this;
	}
	post() {
		$("#" + this.targetId).load(this.url, this.payload, function (response, status, xhr) {

			if (status == "error") {
				var msg = "ERR: Page couldnt load: ";
//			$("#error").html(msg + xhr.status + " " + xhr.statusText);
			}
		});
	}
}