/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var responseStrucObj = {}

//class httpHandler extends urlMongoBuilder {
class httpHandlerExt {

	constructor() {
//		this.responseCode = response.code
//		this.responseLoad = response.load;
//		this.responseLoadLen = response.loadlen;
//		this.responseMsg = response.message;
//		this.responseStatus = response.status;
	}

	init() {
		return this;
	}

//				'Origin': 'https://developer.zoom.us/'
//headers: {
//				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMUWFFS1ZreFNPMkV1RmN6ZjJYSThRIiwiZXhwIjoxNTkyNjczNjU5LCJqdGkiOiI2MmIyZmM3Yi1mMDFmLTQ0MGYtOGI5Yy01ZGU2ZDgxYzRkMjkiLCJpYXQiOjE1OTI2NzAwNTl9.9QsNjfdcFTQoQxgDar2ZymHivszufRo5NPbr24AjoNw",
//				"Content-Type": "application/json",
//				"Access-Control-Allow-Origin": "http://localhost/",
//				'Origin': 'http://localhost/'
//			}

//headers: {
//				"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMUWFFS1ZreFNPMkV1RmN6ZjJYSThRIiwiZXhwIjoxNTkyNjczNjU5LCJqdGkiOiI2MmIyZmM3Yi1mMDFmLTQ0MGYtOGI5Yy01ZGU2ZDgxYzRkMjkiLCJpYXQiOjE1OTI2NzAwNTl9.9QsNjfdcFTQoQxgDar2ZymHivszufRo5NPbr24AjoNw",
//			},
	post() {
		var that = this;
		$.ajax({
			url: this.url,
			"secure": true,
			"crossDomain": true,
			type: "POST",
			async: this.async,
			"headers": {
				"content-type": "application/json",
				"authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMUWFFS1ZreFNPMkV1RmN6ZjJYSThRIiwiZXhwIjoxNTkyNjczNjU5LCJqdGkiOiI2MmIyZmM3Yi1mMDFmLTQ0MGYtOGI5Yy01ZGU2ZDgxYzRkMjkiLCJpYXQiOjE1OTI2NzAwNTl9.9QsNjfdcFTQoQxgDar2ZymHivszufRo5NPbr24AjoNw"
			},
			"processData": false,
			timeout: this.timeout,
			data: this.payload

		}).done(function (data, text) {
			that.responseLoad = data;
			that.isSuccessful = true;
			var newPayload = JSON.parse(that.payload);
		}).fail(function (response, status, error) {
			that.isSuccessful = false;
			that.responseLoad = response;
			that.errorHandler(response, status, error)

		});
		this.isSuccessful = that.isSuccessful;
		this.responseLoad = that.responseLoad;
		return this;
	}
	getResponse() {
		return this.responseLoad;
	}
	getStatus() {
		return this.isSuccessful;
	}
	setPayload(payload) {
// if object then string
		if (payload instanceof Object)
			this.payload = JSON.stringify(payload);
		else
			this.payload = payload;
		return this;
	}
	getPayload() {
		return this.payload;
	}
	setAsync(async) {
		this.async = async;
		return this;
	}
	setTimeout(timeout) {
		this.timeout = timeout;
		return this;
	}
	setMessage(message) {
		this.message = message;
		return this;
	}
	setHeaders(headers) {
		this.headers = headers;
		return this;
	}
	setUrl(url) {
		this.url = url;
		return this;
	}
	errorHandler(request, status, error) {
//console.log("INF: Response Text (" + request.responseText + ")");
//console.log("ERR: Response State (" + request.readyState + ")");
//console.log("ERR: Response Status (" + request.status + ")");
//console.log("ERR: Response Code (" + request.statusCode + ")");
//console.log("ERR: Status (" + status + ")");
//console.log("ERR: Error Message (" + error.message + ")");
//console.log("ERR: Error Stack (" + error.stack + ")");
	}
}
class httpHandler {

	constructor(message, response) {
//		this.responseCode = response.code
//		this.responseLoad = response.load;
//		this.responseLoadLen = response.loadlen;
//		this.responseMsg = response.message;
//		this.responseStatus = response.status;
		this.message = message;
	}

	init() {
		return this;
	}

	del() {
		var that = this;
		$.ajax({
			url: this.url,
			type: 'delete',
			contentType: "application/json; charset=utf-8",
			async: this.async,
			headers: {"x-apikey": "5dfe3837bf46220df655ddbf"},
			timeout: this.timeout,
			success: function (data, text) {
				//console.log("INF: HTTP Delete Success");
				that.isSuccessful = true;
				that.responseLoad = data;
// no payload for delete!
//				modelAnalytics.pk.id = Math.floor(Math.random() * 1000000);
//				modelAnalytics.pk.type = "delete";
//				modelAnalytics.item = {
//					"reason": "delete",
//					"url": this.url
//				};
//				that.analytics("delete", bs.analyticsCtrl.postUrl, modelAnalytics)

			}
			,
			error: function (request, status, error) {
				//console.log("INF: Response Text (" + request.responseText + ")");
				//console.log("ERR: Response State (" + request.readyState + ")");
				//console.log("ERR: Response Status (" + request.status + ")");
				//console.log("ERR: Response Code (" + request.statusCode + ")");
				//console.log("ERR: Status (" + status + ")");
				//console.log("ERR: Error Message (" + error.message + ")");
				//console.log("ERR: Error Stack (" + error.stack + ")");
			}
		});
		this.isSuccessful = that.isSuccessful;
		this.responseLoad = that.responseLoad;
		return this;
	}

	get() {
		var that = this;
//	headers: {
//	"x-apikey": "5dfe3837bf46220df655ddbf",
//		"Access-Control-Allow-Origin": "*",
//		'Origin': '*'
//	}
		$.get({
			url: this.url,
			type: 'get',
			contentType: "application/json; charset=utf-8",
			async: this.async,
			timeout: this.timeout,
			headers: {
				"x-apikey": "5dfe3837bf46220df655ddbf"
			},
			dataType: 'json',
			success: function (data, text) {
				that.responseLoad = data;
				that.isSuccessful = true;
				//console.log("INF: HTTP Get Success");
				//console.log("Payload Size (" + that.responseLoad.length + ")");
				//console.log("Response Message Text (" + text + ")");



			},
			error: function (request, status, error) {
				that.responseLoad = []; // answer is based on array length
				that.isSuccessful = false;
				that.errorHandler(request, status, error)
			}
		});
		this.isSuccessful = that.isSuccessful;
		this.responseLoad = that.responseLoad;
		return this;
	}
// https://stackoverflow.com/questions/5507234/use-basic-authentication-with-jquery-and-ajax
	put() {
		var that = this;
		$.ajax({
			url: this.url,
			type: "put",
			async: this.async,
			headers: {"x-apikey": "5dfe3837bf46220df655ddbf"},
			data: this.payload,
			contentType: "application/json; charset=utf-8"
		}).done(function (data, text) {
			that.responseLoad = data;
			that.isSuccessful = true;
		}).fail(function (request, status, error) {
			that.isSuccessful = false;
			that.errorHandler(request, status, error)
		});
		this.isSuccessful = that.isSuccessful;
		this.responseLoad = that.responseLoad;
		return this;
	}
	post() {
		var that = this;
		$.ajax({
			url: this.url,
			type: "POST",
			async: this.async,
			headers: {"x-apikey": "5dfe3837bf46220df655ddbf"},
			timeout: this.timeout,
			data: this.payload,
			contentType: "application/json; charset=utf-8"
		}).done(function (data, text) {
			that.responseLoad = data;
			that.isSuccessful = true;
			//console.log("INF: HTTP Post Success");
			//console.log("Payload Size (" + that.responseLoad.length + ")");
			//console.log("Response Message Text (" + text + ")");
			var newPayload = JSON.parse(that.payload);
//			modelAnalytics.pk.id = Math.floor(Math.random() * 1000000);
//			modelAnalytics.pk.type = "post";
//			modelAnalytics.item = {
//				"pk": newPayload.pk,
//				"fk": newPayload.fk,
//				"reason": "post"
//			};
//
//			that.analytics("post", bs.analyticsCtrl.postUrl, modelAnalytics)

		}).fail(function (response, status, error) {
			that.isSuccessful = false;
			that.responseLoad = response;
			that.errorHandler(response, status, error)

		});
//			}).complete(function () {
//			alert("Complete")
		this.isSuccessful = that.isSuccessful;
		this.responseLoad = that.responseLoad;
		return this;
	}
	analytics(mode, url, payload) {

		$.ajax({
			url: url,
			type: "post",
			async: this.async,
			timeout: this.timeout,
			data: JSON.stringify(payload),
			contentType: "application/json; charset=utf-8"
		}).done(function (data, text) {

		}).fail(function (request, status, error) {
			this.ajaxErrorHandler(request, status, error);
		});
	}
	sendMeAuth() {
		var dataType = this.dataType;
		var sendMeMethod = this.method;
		var sendMeMessage = this.message;
		var sendMeUrl = this.url;
		var sendMePayload = this.payload;
		$.ajax({
			url: sendMeUrl,
			type: sendMeMethod,
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: 'json',
			data: sendMePayload,
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer ");
			},
			success: function (data, text) {
				rs = data;
				isSuccessful = true;
				//console.log("\n\nINF: HTTP " + sendMeMethod + " Success");
				//console.log("Message " + sendMeMessage);
			}
			,
			error: function (request, status, error) {
				isSuccessful = false;
				this.ajaxErrorHandler(request, status, error);
			}

		});
		return this;
	}
	getResponse() {
		return this.responseLoad;
	}
	getStatus() {
		return this.isSuccessful;
	}
	setPayload(payload) {
// if object then string
		if (payload instanceof Object)
			this.payload = JSON.stringify(payload);
		else
			this.payload = payload;
		return this;
	}
	getPayload() {
		return this.payload;
	}
	setAsync(async) {
		this.async = async;
		return this;
	}
	setTimeout(timeout) {
		this.timeout = timeout;
		return this;
	}
	setMessage(message) {
		this.message = message;
		return this;
	}
	setUrl(url) {
		this.url = url;
		return this;
	}
	errorHandler(request, status, error) {
//console.log("INF: Response Text (" + request.responseText + ")");
//console.log("ERR: Response State (" + request.readyState + ")");
//console.log("ERR: Response Status (" + request.status + ")");
//console.log("ERR: Response Code (" + request.statusCode + ")");
//console.log("ERR: Status (" + status + ")");
//console.log("ERR: Error Message (" + error.message + ")");
//console.log("ERR: Error Stack (" + error.stack + ")");
	}
}





//# sourceURL=nw_http.js