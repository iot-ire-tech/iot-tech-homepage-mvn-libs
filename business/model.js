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

var modelContext = {};
var srvContext = {};
var fkType = "";
var fk = {
	"id": -1,
	"dbId": "",
	"type": ""
};
var srvEntity = {};
var entity = {};
var entities = [];
var modelEntityRsp = {};
var modelEntity = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"has": {"event": false, "subEvent": false},
	"fk": {
		"id": 0,
		"dbId": "",
		"type": "",
		"group": 0
	},
	"timings": {
		"startDate": {"$date": new Date().toISOString()},
		"expiryDate": {"$date": new Date().toISOString()},
		"duration": {
			"unit": "minutes",
			"value": -1
		}
	},
// Props should be actionalble, and form the basis of filters, and associated childs
	"properties": {
		"revenue": ["sale", "hire/rent", "lease"],
		"montor": true,
		"expiry_data": {"$date": new Date().toISOString()},
		"gsm": true,
		"street": true,
		"media": true,
		"event": true
	},
	"utilization": {
		"quanity": -1,
		"load": 0
	},
	"socialize": {
		"name": "",
		"legal": {"disclaimer": ""},

		"owner": "",
		"intro": "",
		"scope": "",
		"share": false,
		"accessibility": "",
		"tag": [],
		"notes": ""
	},
	"quanity": {
		"notes": "",
		"tag": "",
		"max": -1,
		"rt": -1
	},
	"digitigal": {
		"barCode": {
			"notes": "", "tag": "", "code": -1
		},
		"qrCode": {
			"notes": "", "tag": "", "code": -1
		}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		// UX
		"name": "",
		"visible": false,
		// Search
		"tag": ""
	}
};
var modelEntityTest = {
	"type": "",
	"alias": "",
	"quanity": getRandInt(1, 100),
	"pk": {
		"id": getRand(),
		"dbId": ""
	},
	"fk": {
		"id": getRand(),
		"type": "resource/event/activity",
		"group": getRand()
	},
	"timings": {
		"startTime": {"$date": new Date().toISOString()},
		"expiryTime": {"$date": new Date().toISOString()},
		"duration": {
			"unit": "minutes",
			"value": getRandInt(1, 30)
		}
	},
	"socialize": {
		"share": false,
		"accessibility": "Public",
		"tag": [],
		"intro": "",
		"notes": ""
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		// UX
		"name": "",
		"visible": false,
		// Search
		"tag": ""
	}
};
var modelEntityGeoRsp = {};
var modelEntityGeo = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": 0,
		"dbId": "",
		"type": "",
		"group": 0
	},
	"timings": {
		"startDate": {"$date": new Date().toISOString()}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		// UX
		"name": "",
		"visible": false,
		// Search
		"tag": ""
	},
	"name": "",
	"geo": {
		"external": {
			"street": "",
			"number": "",
			"town": "",
			"city": "",
			"country": ""
		},
		"campus": {
			"building": "",
			"department": "",
			"zone": "",
			"floor": "",
			"number": ""
		},
		"gps": {
			"long": "",
			"lat": "",
			"hgt": ""
		}
	}

}

var modelEntityMembersRsp = {};
var modelEntityMembers = {
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
	"timings": {
		"startDate": {"$date": new Date().toISOString()}
	},
	"ux": {
		"items": [],
		"visible": false,
		"tag": ""
	},
	"name": "",
	"members": []

}


var modelEntityAvailabilityDowRsp = {}
var modelEntityAvailabilityDow = {
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
	"timings": {
		"startDate": {"$date": new Date().toISOString()}
	},
	"ux": {
		"items": [],
		"visible": false,
		"tag": ""
	},
	// Associate patron type with Business, as public might not have same access as private.
	"patronType": "public",
	"name": "",
	"dow": "",
	"openingTime": {"hr": "", "min": ""},
	"closingTime": {"hr": "", "min": ""},
	"reason": ""
}

var modelEntityAvailabilityDate = {
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
		"items": [],
		"visible": false,
		"tag": ""
	},
	"name": "",
	"$date": new Date().toISOString(),
	"openingTime": {"hr": "", "min": ""},
	"closingTime": {"hr": "", "min": ""},
	"reason": ""
}

var modelEntityCosts = {
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
		"items": [],
		"visible": false,
		"tag": ""
	},
	"name": "",
	"$date": new Date().toISOString(),
	"openingTime": "",
	"closingTime": "",
	"reason": ""
}

var cost, currency, duration, tag;
var modelEntityCostRsp;
var modelEntityCosts = [];
var modelEntityCost = {
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
		"items": [],
		"visible": false,
		"tag": ""
	},
	"timings": {
		"startTime": {"$date": new Date().toISOString()},
		"duration": {
			"unit": "mins",
			"value": -1
		}
	},
	"name": "",
	"monitized": false,
	"cost": {
//		pounds, shiling, pence..... 100, tens,
		"amount": -1,
		"cent": -1,
		"currency": "EUR"
	}
};
//# sourceURL=entity_model.js