/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var modelClientEntitlementsRsp = {}
var modelClientEntitlements = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},

	"type": "default",
	"clientId": 673859,
	"paymentsModel": {
		"enabled": true,
		"key": "sk_test_PWxKayhQchfhGUlEaMT6DE8x",
		"ccPaymentsEnabled": true,
		"coreAccountingPaymentsEnabled": true,
		"internalCreditPayment": true
	},
	"billingModel": {
		"enabled": true,
		"patron": true,
		"patronGroups": true,
		"entities": true,
		"splitPayment": true
	},
	"bookingModel": {
		"enabled": true,
		"maxBookingWindow": {
			"size": 1,
			"units": "months"
		}
	},
	"brandingModel": {
		"enabled": true,
		"targetAudience": false,
		"social": false,
		"vidWelecome": false,
		"publishDate": false
	}
};


var modelClientRatesRsp = {}
var modelClientRates = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
	"clientId": 0,
	"minSpend": 1.00,
	"tax": {
		"vat": "21%"
	},
	"booking": {
		"transaction": 0.03,
		"defer": 0.1,
		"alert": 0.1,
		"reminder": 0.1,
		"comms": {
			"sms": 0.1,
			"email": 0.1
		},
		"repeatBooking": 0.1
	},
	"analytics": {
		"transaction": 0.03,
		"alert": 0.1,
		"reminder": 0.1,
		"comms": {
			"sms": 0.1,
			"email": 0.1
		}
	}

}




var modelClientUsageRsp = {}
var modelClientUsage = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		"name": "",
		"visible": false,
		"tag": ""
	},
	"type": "basic",
	"clientId": -1,
	"bookings": {
		"rt": 0,
		"min": 0,
		"max": -1
	},
	"patrons": {
		"rt": 0,
		"min": 0,
		"max": -1
	},
	"messages": {
		"rt": 0,
		"min": 0,
		"max": -1
	},
	"branding": {
		"rt": 0,
		"min": 0,
		"max": -1
	}
}



var modelSiteSettingsRsp = {}
var modelSiteSettings = {
	"lists": {
		"money": {
			"currency": [
				"EUR",
				"DOLLAR"
			]
		},
		"time": {
			"months": [
				"Jan"
			],
			"dow": {
				"ampm": [
					1,
					2,
					3,
					12
				],
				"24hr": [
					1,
					2,
					3,
					12
				]
			},
			"duration": [
				"15",
				"30",
				"45",
				"60"
			]
		}
	},
	"ux": {
		"timings": {
			"pageLoad": {
				"backEnd": 10000,
				"frontEnd": 10000
			},
			"fadeIn": 1000,
			"fadeOut": 1000
		},
		"color": {
			"button": "w3-blue"
		}
	},
	"api": {
		"branding": {
			"retirement_age": 65
		},

		"types": {
			"patrons": "[members, guests, staff]",
			"resources": "[sports, medial, beauty, legal, education]",
			"bills": "[paided, pending, unpaid]",
			"occupation": "[]",
			"martial_status": "[]",
			"sexuality": "[]",
			"employment_status": "[]"
		}
	}
}