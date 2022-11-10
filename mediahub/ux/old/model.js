/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Properties
var file, dir, icon, tag, profile;
// Query
var modelMediaHubResp;
// Guts
var modelMediaHubs = [];
var modelMediaHub = {
	"pk": {
		"id": -1,
		"dbId": ""
	},
	"fk": {
		"id": -1,
		"dbId": "single!",
		"type": ""
	},
	"timings": {
		"startTime": {"$date": new Date().toISOString()}
	},
	"name": "",
	"media": {
		"icon": {"name": "", "visible": false, "tag": ""},
		"pic": {"name": "", "visible": false, "tag": ""},
		"vid": {"name": "", "visible": false, "tag": ""},
		"youtube": {"name": "", "visible": false, "tag": ""},
		"facebook": {"name": "", "visible": false, "tag": ""}
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		// UX
		"name": "",
		// Search
		"tag": ""
	}
};
var modelMediaHubTest = {
	"pk": {
		"id": getRand(),
		"dbId": ""
	},
	"fk": {
		"id": getRand(),
		"dbId": "single!",
		"type": ""
	},
	"timings": {
		"startTime": {"$date": new Date().toISOString()}
	},
	"media": {
		"icon": [{"name": "", "visible": false, "tag": ""}],
		"pics": [{"name": "", "visible": false, "tag": ""}],
		"vids": [{"name": "", "visible": false, "tag": ""}],
		"youtubes": [{"name": "", "visible": false, "tag": ""}],
		"facebooks": [{"name": "", "visible": false, "tag": ""}]
	},
	"ux": {
		"pk": {
			"id": -1,
			"dbId": ""
		},
		// UX
		"name": "",
		"headlines": [{"xx": "ssdf"}],
		// Search
		"tag": ""
	}
};