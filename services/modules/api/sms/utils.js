/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var endPoint = "https://api.smsglobal.com/http-api.php"
//	var action = "?action=sendsms"
//	action += "&user=0qd60bzx&password=9yzoUCWp"
//	action += "&from=Test&to=+353877461070"
//	action += "&text= world"
//	action += "&scheduledatetime=" + encodeURIComponent("2019-02-20 17:27:30")
//	endPoint += action;
//	//console.log(endPoint)

//$(document).on("click", "#send", function () {
//	var endPoint = "https://api.smsglobal.com/http-api.php"
//	var action = "?action=sendsms"
//	action += "&user=0qd60bzx&password=9yzoUCWp"
//	action += "&from="
//	action += "TestMessage"
//	action += "&to=+353877461070,+353868491190"
//	action += "&text=Test \n\
//Booking";
////	action += "&text= Booking Confirmation \n Time: \n Date: "
////	action += "&scheduledatetime=" + encodeURIComponent("2019-02-20 17:27:30")
//	endPoint += action;
//	//console.log(endPoint)

//	new Sms().setFrom("TestMessage").setTo("+353877461070").setMsg("Test Test").send();

//});

//mms: {
//			var smsMsg = "From: Booking Administrator."
//			var smsCost = 20
//			var smsDuration = 2
//			smsMsg += "%0aItem: " + id
//			smsMsg += "%0aDate: " + getTs()
//			smsMsg += "%0aCost: " + smsCost + " EUR"
//			smsMsg += "%0aDuration: " + smsDuration + " [mins]"
//			smsMsg += "%0a"
//			smsMsg += "Regards, IoT Tech"
//			new Sms().setFrom("E-Receipt").setTo("353877461070").setAttachment(fullQuality).setType("image/jpeg").setName("image1.jpg").sendMms();
//		}

class Sms {

	constructor() {
		this.url = "https://api.smsglobal.com/http-api.php";
	}
	setFrom(val) {
		this.from = val;
		return this;
	}
	setTo(val) {
		this.to = val;
		return this;
	}
	setMsg(val) {
		this.msg = val;
		return this;
	}
	setCron(val) {
		this.cron = val;
		return this;
	}

	isValid(type) {
// card
		switch (type) {
			case "props":
				if (this.payload.body.to.includes("+"))
					return false;
				if (this.payload.name.length === 0)
					return false;
				break;
			default:
				return false;
				break;
		}
		return true;
	}

	getResponse() {
		return this.response;
	}
	answer() {
		if (this.response.length > 0)
			return true;
		else
			return false;
	}

	send() {
// As Query String!!! Not form data!!!
		this.action = "?action=sendsms";
		this.action += "&user=0qd60bzx";
		this.action += "&password=9yzoUCWp";
		this.action += "&from=";
		this.action += this.from;
		this.action += "&to=";
		this.action += this.to;
		this.action += "&text=";
		this.action += this.msg;
		this.url += this.action;

		$.ajax({method: 'POST', url: this.url})
			.done(function (data) {
				//console.log('Text Sent');
			})
			.fail(function (err) {
				//console.log('ERR: Text Not Sent (' + err + ")");
			});
	}

	setAttachment(val) {
		this.attachment = val;
		return this;
	}
	setType(val) {
		this.type = val;
		return this;
	}
	setName(val) {
		this.name = val;
		return this;
	}
	sendMms() {
// As Query String!!! Not form data!!!
		this.url = "https://api.smsglobal.com/mms/sendmms.php";
		this.action = "?user=0qd60bzx";
		this.action += "&password=9yzoUCWp";
		this.action += "&from=";
		this.action += this.from;
		this.action += "&number=";
		this.action += this.to;
		this.action += "&attachment1=";
		this.action += this.attachment;
		this.action += "&type1=";
		this.action += this.type;
		this.action += "&name1=";
		this.action += this.name;
		this.url += this.action;

		$.ajax({method: 'POST', url: this.url})
			.done(function (data) {
				console.log('Text Sent');
			})
			.fail(function (err) {
				console.log('ERR: Text Not Sent (' + err + ")");
			});
	}

}


//# sourceURL=api_sms_utils.js