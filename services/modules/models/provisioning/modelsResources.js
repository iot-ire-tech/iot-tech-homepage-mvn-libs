/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 	Default Resource Share with IOT
 */
var resource = {
	"id": 0,
	"clientId": 0,
	"socialize": false,
	"intro": "",
	"media": {
		"icon": {"name": "", "tabbar": false, "tag": ""},
		"pic1": {"name": "", "slideshow": false, "tag": ""},
		"pic2": {"name": "", "slideshow": false, "tag": ""},
		"pic3": {"name": "", "slideshow": false, "tag": ""},
		"vid1": {"name": "", "slideshow": false, "tag": ""},
		"vid2": {"name": "", "slideshow": false, "tag": ""},
		"vid3": {"name": "", "slideshow": false, "tag": ""},
		"youtube1": {"name": "", "slideshow": false, "tag": ""},
		"youtube2": {"name": "", "slideshow": false, "tag": ""},
		"youtube3": {"name": "", "slideshow": false, "tag": ""},
		"facebook1": {"name": "", "slideshow": false, "tag": ""},
		"facebook2": {"name": "", "slideshow": false, "tag": ""},
		"facebook3": {"name": "", "slideshow": false, "tag": ""}
	},
	"cost": {
		"amount": 0.00,
		"currency": "EUR"
	},
	"cname": "T4",
	"alias": "T4",
	"name": "T4",
	"location": [],
	"availabilitiy": [],
	"****": "***** Capacity ****",
	"quanity": 0,
	"ownerId": 0,
	"category": 0,
	"accessibility": "Public",
	"visible": false,
	"****": "***** Cosmetics ****",
	"resourcegroup": 0,
	"notes": "",
};
var resourceShare = {
	"clientId": 0,
	"resourcePoolId": 0,
	"ts": "",
	"status": "[expired, open, active]",
	"businessRequestId": 0,
	"comment": "Test",
	"cost": "0%",
	"reshare": true,
	"releasedate": "",
	"duration": {
		"start": "",
		"end": ""
	}
};

var targetAvailability = {
	"id": 35732,
	"type": "resource",
	"clientId": 392436,
	"targetId": 0,
	"tag": "Bank Holiday",
	"dow": 1,
	"openingTime": 7,
	"closingTime": 23,
	"name": "Monday : 7 - 23"
}
var resourceAnalyticsBookingsMissed = [{
		"comment": "Calendar View - everywhere an instance report it - detailed report",
		"insight": "At what times are bookings missed [Day Versus Hour Day - Scatter Chart]",
		"id": 0,
		"resourcePoolId": 0,
		"insightDailyMisses": [
			{
				"dayOfWeek": 0,
				"hourOfDay": 0,
				"counter": 0
			}],
		"insightInstances": [
			{
				"id": 0,
				"date": 0,
				"hour": 0
			}
		]
	}];
