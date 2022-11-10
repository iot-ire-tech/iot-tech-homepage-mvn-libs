
var subEvent = {
	"id": 0,
	"eventId": 0,
	"clientId": 0,
	"*****": "Booking related information",
	"socialize": false,
	"media": {
		"icon": {"name": "", "tabbar": false},
		"pic1": {"name": "", "slideshow": false},
		"pic2": {"name": "", "slideshow": false},
		"pic3": {"name": "", "slideshow": false},
		"vid1": {"name": "", "slideshow": false},
		"vid2": {"name": "", "slideshow": false},
		"vid3": {"name": "", "slideshow": false},
		"youtube1": {"name": "", "slideshow": false},
		"youtube2": {"name": "", "slideshow": false},
		"youtube3": {"name": "", "slideshow": false},
		"facebook1": {"name": "", "slideshow": false},
		"facebook2": {"name": "", "slideshow": false},
		"facebook3": {"name": "", "slideshow": false}
	},
	"name": "",
	"****": "***** Refereence Costs List ****",
	"costs": [],
	"locations": [],
	"****": "***** Capacity : 5 Aside ****",
	"quanity": 0,
	"ownerId": 0,
	"category": 0,
	"accessibility": "Public",
	"visible": false,
	"****": "***** 9-5 ****",
	"duration": {
		"start": "",
		"end": ""
	},
	"*****": "Cosmetics UX Info",
	"notes": ""
}

/*
 *
 * Each Event has one or more costs/rates
 * Each SubEvent has one or more costs/rates
 *
 */
var costEntity = {
	"id": 0,
	"targetId": 0,
	"type": "subEvent",
	"name": "10 minutes = 30 EUR (basic rate)",
	"tag": "basic rate",
	"duration": {
		"unit": "minutes",
		"value": 0
	},
	"cost": {
		"amount": 0.00,
		"currency": "EUR"
	}
}

// Element of Cost List
var costsItem =
	{
		"clientId": 0,
		"name": "10 minutes = 30 EUR (basic rate)",
		"tag": "basic rate",
		"type": "subEvent",
		"duration": {
			"unit": "minutes",
			"value": 0
		},
		"cost": {
			"amount": 0.00,
			"currency": "EUR"
		}
	}


var subEventMember = {
	"id": 0,
	"subEventId": 0,
	"members": []
}

var subEventShare = {
	"clientId": 0,
	"eventId": 0,
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
