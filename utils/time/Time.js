/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var today = new Date();
var todayPlusOneMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes()).toISOString()
var todayPlusTwoMonth = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate(), today.getHours(), today.getMinutes()).toISOString()
var todayPlusThreeMonth = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate(), today.getHours(), today.getMinutes()).toISOString()
var ts = new getTodaysDate();
var td = new getTomorrowsDate();
var duration = 0;
var startDateTime = "";
var age;
var date = "";
var year = "";
var month = "";
var day = "";
var dow = "";
var hr = "";
var min = "";
var days = ["N/A", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var daysSunday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var hourOfDayArr = ["N/A", "17 to 09", "18 to 09", "17 to 08", "18 to 08", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"];
// Date/Time
aEvent = new Date();
aEpoch = Date.now();
aDate = aEvent.getFullYear() + "-" + aEvent.getMonth() + "-" + aEvent.getDate();
aTime = tmp = aEvent.getHours() + ":" + aEvent.getMinutes() + ":" + aEvent.getSeconds();

function calculate_age(dob) {
	var diff_ms = Date.now() - dob.getTime();
	var age_dt = new Date(diff_ms);
	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function calculate_age_decade(age) {
	if (age >= 0 && age < 12)
		return "kid";
	// Display warning message!!!
	if (age >= 13 && age < 19)
		return "teen";
	if (age >= 13 && age < 19)
		return "teen";
	if (age >= 20 && age < 29)
		return "20s";
	if (age >= 30 && age < 39)
		return "30s";
	if (age >= 40 && age < 49)
		return "40s";
	if (age >= 50 && age < 59)
		return "50s";
	if (age >= 60 && age < 64)
		return "60s";
	if (age >= 65)
		return "vip";
}


function getTodaysDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	this.getYYYMMDD = function () {
		return yyyy + '-' + mm + '-' + dd;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function getTomorrowsDate() {
	var today = new Date();
	var dd = today.getDate() + 1;
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	this.getYYYMMDD = function () {
		return yyyy + '-' + mm + '-' + dd;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function getDurationMins(inc, unitTime) {
	unitTime = parseInt(unitTime)

	if (inc === "mints")
		return  unitTime;
	if (inc === "hr")
		return 60 * unitTime;
	if (inc === "day")
		return 24 * 60 * unitTime;
	if (inc === "week")
		return 24 * 7 * 60 * unitTime;




	return ts;
}

function getTs() {
// https://www.toptal.com/software/definitive-guide-to-datetime-manipulation
	var ts = new Date().toLocaleString('en-GB', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
	return ts;
}

var dateUtil = function (adate, today) {
	this.someday = adate;
	this.today = today;
	this.init = function () {

//		this.someday.setTime(this.today.getTime());
// d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
		//console.log("Year (" + this.someday.getFullYear() + ")");
		//console.log("Month (" + this.someday.getMonth() + ")");
		//console.log("Day (" + this.someday.getDay + ")");
		return this;
	};
	this.isToday = function () {
		//console.log("Today (" + this.today + ")");
		//console.log("Someday (" + this.someday + ")");
		//console.log("Number someday (" + Number(this.someday) + ")");
		//console.log("Number today (" + Number(this.today) + ")");
		//console.log("Value Of someday (" + this.someday.valueOf() + ")");
		//console.log("Value Of today (" + this.today.valueOf() + ")");
		//console.log("Unary someday (" + +this.someday + ")");
		if (this.someday.getTime() === this.today.getTime()) {
			//console.log("MATCH : Someday (" + this.someday + ") is today");
			return true;
		}
		return false;
	};
	this.isPast = function () {
		if (this.someday < this.today) {
			//console.log("Someday (" + this.someday + ") is in past");
			return true;
		}
		return false;
	};
	this.isFuture = function () {
		if (this.someday > this.today) {
			//console.log("Someday (" + this.someday + ") is in future");
			return true;
		}
		return false;
	};

	this.isValidPeriod = function (lhsDate, rhsDate) {
		if (lhsDate >= this.today && rhsDate <= this.today) {
			return true;
		}
		return false;
	};
	this.isValidPeriodDate = function (lhsDate, rhsDate) {
		if (this.today >= lhsDate && this.today <= rhsDate) {
			return true;
		}
		return false;
	};
	this.diffDay = function () {
		return this.someday.valueOf() - this.today;
	};
};
// On click of a checkbox - collect the ID, and add entry to an array
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}


var dateGrid, timeGrid;
function getGridDateTime(coor) {

// 	e1daily5e
	// coor="e1daily5e";
	tmp = coor.replace("twicedaily", "-");
//	//console.log("INT : tmp " + tmp);
	tmp = tmp.replace("daily", "-");
//	//console.log("INT : tmp " + tmp);
	tmp = tmp.replace("forthnightly", "-");
//	//console.log("INT : tmp " + tmp);
	tmp = tmp.replace("monthly", "-");
	//console.log("INT : tmp " + tmp);
	timeGrid = parseInt(tmp.split("-")[1]) - 1;
	dateGrid = parseInt(tmp.split("-")[0]);
	var trCounter = 0;
	var offset = 20;
	//console.log("INF : Outside Grid Date:(" + dateGrid + ")");
	$('#bookingslots tr').each(function () {
		var adate;
		//	//console.log("INF : Inside Grid Date:(" + $(this).find("td:first").html() +")");
		if (trCounter === (dateGrid + offset)) {
			adate = $(this).find("td:first").html();
			dateGrid = adate;
			//console.log("INF : Matched On Date:(" + dateGrid + ")");
		}


		trCounter++;
	});
	//console.log("INF : Set Grid Date:(" + dateGrid + ")");
}


class DateParser {

	constructor(date) {
		this.date = new Date(date);
		this.dow = this.date.getDay();
		this.month = this.date.getMonth() + 1;
		this.year = this.date.getFullYear();
		this.hour = this.date.getHours();

		return this;
	}
	getDow() {
		return 	this.dow;
	}
	getMonth() {
		return 	this.month;
	}
	getYear() {
		return 	this.year;
	}
	getHour() {
		return 	this.hour;
	}

}
class ElaspedTimeConverter {
	constructor(date) {
		this.dateMs = date.getTime();
		return this;
	}

	toSeconds() {
		this.seconds = Math.round(this.dateMs / 1000);
		return this;
	}
	toMins() {
		this.mins = Math.round(this.seconds / 60);
		return this.mins;
	}
	toMs() {
		return this.dateMs;
	}

}


class TimeConverter {
	constructor(date) {
		this.date = new Date(date)
		this.epoch = this.date.getTime();
		this.hr = this.date.getHours();
		this.min = this.date.getMinutes();
		return this;
	}
//milliseconds
	getEpoch() {
		return this.epoch;
	}
	getLocalDateTime() {
		return this.date.toLocaleString();
	}
	getMins() {
		return (this.epoch / 1000) / 60;
	}
	getSecs() {
		return (this.epoch / 1000);
	}
	hrs2Mins() {
		this.hrs2mins = this.hr * 60;
		return  this.hrs2mins;
	}

	min2Secs() {
		this.mins2sec = this.hrs2mins * 60;
		return  this.mins2sec;
	}

	secs2Ms() {
		this.secs2ms = this.mins2sec * 60;
		return  this.secs2ms;
	}

	getMins() {
		return this.min;
	}
	getHrs() {
		return this.hr;
	}

}

// Date Arithmetic
// https://stackoverflow.com/questions/4944750/how-to-subtract-date-time-in-javascript
//
// one month ahead


// Switch Context - empty calander
function calendarDate(startRef) {

	$(".date").calendar({
		type: "date",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,

		onChange: function (date, text) {
			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			startRef = new Date(date).toISOString();
		}
	});
}
var startDate = new Date();
var t0 = new Date();
// Constants
var startCal = {
	"minDate": new Date(), // Now
	"maxDate": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, startDate.getMinutes()),
	"plusOneHour": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, startDate.getMinutes())
};
var endCal = {
	"minDate": startCal.startDate,
//	"maxDate": new Date(),
	"maxDate": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, startDate.getMinutes())
};
var endCalPlusMonth = {
	"minDate": startCal.startDate,
	"maxDate": new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes())
};

var startCal = {
	"minDate": new Date(), // Now
	"maxDate": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, startDate.getMinutes()),
	"plusOneHour": new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours() + 1, startDate.getMinutes())
};
function calendarDateRange(startRef, endRef) {

	$(".dateTime").calendar({
		type: "date",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,
		minDate: startCal.minDate,
		maxDate: endCalPlusMonth.maxDate,

		onChange: function (date, text) {
			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			startRef = new Date(date).toISOString();
		}
	});
	$(".rangestart").calendar({
		type: "date",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,
		minDate: startCal.minDate,

		onChange: function (date, text) {
			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			startRef = new Date(date).toISOString();
		}
	});

	$(".rangeend").calendar({
		type: "date",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,
		maxDate: endCalPlusMonth.maxDate,

		onChange: function (date, text) {
			day = date.getDate();
			dow = date.getDay();
			month = date.getMonth();
			year = date.getFullYear();
			endRef = new Date(date).toISOString();
		}
	});
}

function calendarDateTime(startRef) {

	var intervalId = setTimeout(function () {
		$(".dateTime").calendar({
			type: "datetime",
			ampm: false,
			firstDayOfWeek: 1,
			inline: false,
			minDate: startCal.minDate,
			maxDate: endCalPlusMonth.maxDate,

			onChange: function (date, text) {
				startRef.day = date.getDate();
				startRef.dow = date.getDay();
				startRef.month = date.getMonth();
				startRef.year = date.getFullYear();
				startRef.hr = date.getHours();
				startRef.min = date.getMinutes();
				startRef.date.$date = new Date(date).toISOString();
			}
		});
		clearTimeout(intervalId);
	}, 1000);
}
function calendarDateTimeRange(startRef, endRef) {

	var intervalId = setTimeout(function () {
		$(".rangestart").calendar({
			type: "datetime",
			ampm: false,
			firstDayOfWeek: 1,
			inline: false,
			minDate: startCal.minDate,
			endCalendar: $(".rangeend"),

			onChange: function (date, text) {
				day = date.getDate();
				dow = date.getDay();
				month = date.getMonth();
				year = date.getFullYear();
				startRef.$date = new Date(date).toISOString();
			}
		});

		$(".rangeend").calendar({
			type: "datetime",
			ampm: false,
			firstDayOfWeek: 1,
			inline: false,
//			maxDate: endCalPlusMonth.maxDate,

			onChange: function (date, text) {
				day = date.getDate();
				dow = date.getDay();
				month = date.getMonth();
				year = date.getFullYear();
				endRef.$date = new Date(date).toISOString();
			}
		});
		clearTimeout(intervalId);
	}, 1000);
}


function calendarStartEndTime(startRef, endRef) {

	$("#rangestartTime").calendar({
		type: "time",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,
//		endCalendar: $("#rangeendTime"),

		onChange: function (date, text) {
			startRef.hr = date.getHours();
			startRef.min = date.getMinutes();
		}
	});

	$("#rangeendTime").calendar({
		type: "time",
		ampm: false,
		firstDayOfWeek: 1,
		inline: false,

		onChange: function (date, text) {
			endRef.hr = date.getHours();
			endRef.min = date.getMinutes();
		}
	});
}



function countDown(obj) {

	var fullTime = 20;

	var countDownDate;

	// Get todays date and time
// Update the count down every 1 second
	var intervalId = setTimeout(function () {
		var now;
		var distance;
		var days, tDays;
		var hours;
		var minutes;
		var seconds;


		countDownDate = new Date(obj.endDate).getTime();
		now = new Date().getTime();

		// Find the distance between now an the count down date
		distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Output the result in an element with id="demo"
		tmp = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds!!! ";
		var timeLeft = days / fullTime;
		timeLeft = days;
		if (timeLeft > 0 && timeLeft <= 7)
			$("#" + obj.id).addClass("w3-red").html(tmp)
		else if (timeLeft > 7 && timeLeft <= 14)
			$("#" + obj.id).addClass("w3-yellow").html(tmp)
		else if (timeLeft > 14)
			$("#" + obj.id).addClass("w3-green").html(tmp)


		// If the count down is over, write some text
		if (distance < 0) {
			clearInterval(intervalId);
			clearTimeout(intervalId);
			document.getElementById(obj.id).innerHTML = "EXPIRED";
		}
	}, 1000);
}



//# sourceURL=utils_time.js