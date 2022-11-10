var workflowProgression = {
	"wfChkFk": false, //  Create Chk1
	"wfChkC1": false, //  Create Chk1
	"wfChkC2": false, // Actual Item
	"wfChkC3": false, // Social or Media
	"fkCreateReady": true,

	"wfChkPk": false, //
	"wfChkM1": false //
};
var fkType = "";
var fk = {
	"id": -1,
	"dbId": "",
	"type": ""
};
var modelBrandingContext = {}
var modelBrandingContextRsp = {}
var brandings = [];
var branding;
var brandingResponse;
var brandingObj;

// Type Gender/Age/Generic
var modelBrandingTargeted = {
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
		"tag": ""
	},
	"timings": {
		"publishDate": {"$date": ""},
		"expiryDate": {"$date": ""}
	},
	"name": "",
	"target": "",
	"branding": {
		"title": "",
		"hdr": {"name": "", "tag": ""},
		"tdr": {"name": "", "tag": ""},
		"favIcon": {"name": "", "tag": ""}
	}
};
var modelBrandingWelcomeMsgRsp = {}
var modelBrandingWelcomeMsg = {
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
		"tag": ""
	},
	"name": "",
	"modal": {
		"headline": "",
		"icon": {"name": "", "tag": ""},
		"vid": {"name": "", "tag": ""}
	},
	"social": {
		"facebook": {"name": "", "tag": ""},
		"youtube": {"name": "", "tag": ""}
	},
	"timings": {
		"publishDate": {"$date": ""},
		"expiryDate": {"$date": ""}
	}
};
var modelBrandingDefault = {
	"id": 0,
	"clientId": 0,
	"comment": "*** Message Body ***",
	"type": "[bevent]",
	"targetAudience": {
		"ageGroup": "0",
		"gender": "0"
	},
	"ts": "22/01/2019, 12:02",
	"title": "IoT Technologies",
	"media": {
		"iconSite": {
			"name": "673859/image/icon/239094_favicon_icon.ico",
			"tabbar": false
		},
		"picHeader": {
			"name": "673859/image/hdr1/239094_banner2_header.jpg",
			"slideshow": false
		},
		"picFooter": {
			"name": "673859/image/tdr1/239094_space_footer.jpg",
			"slideshow": false
		},
		"vid1": {
			"name": "",
			"slideshow": false,
			"transitionalIn": "login",
			"transitionalOut": "login"
		},
		"vidwelcomeMsg": {
			"name": "673859/video/welcome/239094_vid1.mp4",
			"slideshow": false
		},
		"iconWelecome": {
			"name": "673859/image/icon/239094_favicon_icon.ico",
			"tabbar": false
		},
		"youtubeWelcomeMsg": {
			"name": "https://www.youtube.com/embed/tgbNymZ7vqY",
			"slideshow": false
		},
		"facebookWelcomeMsg": {
			"name": "C:\\fakepath\\favicon.ico",
			"slideshow": false
		}
	},
	"font": {
		"color": "w3-text-deep-purple",
		"size": "",
		"family": "Georgia"
	},
	"timings": {
		"publishDate": "",
		"expiryDate": ""
	},
	"welcomeMessage": "Gym Rock",
	"headline": "have a great experience!"
};
/*
 * Runtime Behaviour
 * Starting Behaviour
 */
// Value Added Service
var brandingVAS = {
	"id": 0,
	"patronId": 0,
	"account": [{
			"accessLevel": "[admin, member]",
			"subscription": "[trial, lab, paid]",
			"username": "",
			"password": "",
			"expiry": "[temp]"
		}
	]
}
var brandingShare = {
}
var brandingAnalytics = {
}