/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var seatingObj = {
//				"seating": "",
//				"cost": 0.00,
//				"currency": "",
//				"annotate": ""
//}

var uxAssetSummaryWidgetObj = {
	"businessHours": [],
	"timebasedUsage": [],
	"capacity": -1,
	"tnc": false
}

// DEFAILTS.......................
var available = {
	"key": "dow",
	"opening": "07:00",
	"closing": "17:00"
}
var subscriptionItem = {
	"frequency": 6,
	"period": "days/months",
	"cost": 0.00
}
var modelUxProduct = {
	...new Product({
			"businessMode": "internal",
			"active": true,
			"sellable": false,
			"name": "",
			"description": "",
			"metadata": [],
			"vbb": [],
			"timemanagement": [],
			"seatingGrades": [],
			"images": [],
			"url": "",
			"urlShop": "",

// Json
			"shippable": false,
			"pnpCosts": [], /// as offered by supplier
			"pnpOptIn": false, // as choosen by vendor
			"pnpVendorSelection": [], // as choosen by vendor



// At asset creation time, a charge and subscription plan should be created, it is these that are passed to activity and event organisers, equally when events and activities are created the charges should be created!
// ttb - in (charge!) // use by events and activity owners
			"discount": 0.00,
			"cost": 0.00,
			"minutes": 0,
			"annotation": "",
// subscription - in  // use by events and activity owners
			"subscription": [],
// volument based bililng



// Event Selection - billing_min_15
			"tbbFee": 0.00, // used by event, to indicate what ttbFee you settled on
			"chargeId": "", // use by events, to indicate
			"subscriptionId": "", // use by events, to indicate

			"couponId": "",
			"tnc": "",
			"date_time_start": "",
			"date_time_end": "",
			"mode": "",
			"type": "service",
			"location": "https://maps.google.com/maps?q=university%20of%20san%20francisco&t=k&z=19&ie=UTF8&iwloc=&output=embed",
			"image1": "",
			"image2": "",
			"image3": "",
			"image4": "",
			"image5": "",
			"urlSocialFb": "",
			"urlSocialYt": "",
			"promoVideo": "",

			"fullName": "",
			"emailPoc": "",
			"phonePoc": "",

// Social
			"scope": [],
			"blackListedAccountHolders": [],

			"upstreamProductId": "",
// update to get cap during event time
			"upstreamAccountId": "",
			"resaleId": ""

	})
}
//# sourceURL=stripe_product_model.js