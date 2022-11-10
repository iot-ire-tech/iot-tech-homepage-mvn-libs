

// https://www.socialmediatoday.com/news/5-types-of-social-media-content-that-convert/539584/

// UX
var tabCat;
var contentCat;
var existingList = {}; // Existing List to be modifed

var workflowProgression = {
	"wfChkFk": false, //  Create Chk1
	"wfChkC1": false, //  Create Chk1
	"wfChkC2": false, // Actual Item
	"wfChkC3": false, // Social or Media
	"wfCreateReady": true,

	"wfChkPk": false, //
	"wfChkM1": false, //
	"wfModReady": true
};


var fkType = "";
var fk = {
	"id": -1,
	"dbId": "",
	"type": ""
};


// Model / Data
var srvMediaHub = {};
var srvSocialMedia = {};

var modelSocialRsp = {};
var modelContentRsp = {};
var modelContent = {};

var modelContentContxtRsp = {}
var modelContentContxt = {}

var modelContentSocialContxtRsp = {}
var modelContentSocialContxt = {}
var modelContentSocialRsp = {};
var modelContentSocial = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": "resource" // Because this is default TAB
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
	"social": {
		"youtube": {"name": "", "slideshow": false, "tag": ""},
		"facebook": {"name": "", "slideshow": false, "tag": ""}
	}
};

var modelContentVisualContxt = {}
var modelContentVisualContxtRsp = {}
var modelContentVisualRsp = {};
var modelContentVisual = {
	"pk": {
		"id": -1,
		"dbId": "",
		"type": ""
	},
	"fk": {
		"id": -1,
		"dbId": "",
		"type": "resource" // Because this is default TAB
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
	"visual": {
		"pic": {"name": "", "slideshow": false, "tag": ""},
		"icon": {"name": "", "slideshow": false, "tag": ""},
		"vid": {"name": "", "slideshow": false, "tag": ""}
	}
};
//# sourceURL=mediahub_model.js