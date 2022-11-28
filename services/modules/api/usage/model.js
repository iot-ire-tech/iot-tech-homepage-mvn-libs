/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modelUsageBooking = {
	"accountId": "",
	"productId": "",
	"customerId": "",
	"name": "bookingengine",
	"features": {
		"client": {

			"booking": {
				"multibook": false,
				"futurebook": false,
				"ttb": false,
				"bizhours": false,
				"booking": false
			},
			"notification": {
				"sms": false,
				"email": false
			},
			"alerts": {
				"sms": false,
				"email": false
			},
			"media": false,
			"sharingMgt": false,
			"capacityLevelsMgt": false,
			"capacityAlertingMgt": false, // levels 1, 2, 3
			"bookingMgt": false
		},
		"customer": {
			"booking": {
				"service": false
			},
			"ttb": {
				"service": false
			},
			"bizhours": {
				"service": false
			},
			"notification": {
				"service": false,
				"sms": false,
				"email": false
			},
			"reminders": {
				"service": false,
				"sms": false,
				"email": false
			},
			"social": {
				"service": false,
				"sms": false,
				"email": false
			}
		}
	}
}


var modelUsageMemberShip = {
	"client": {
		"volumebased_level1": false,
		"volumebased_unlimited": false
	},
	"customer": {
		"volumebased_level1": false,
		"volumebased_unlimited": false
	}
}

var modelUsageSocial =
	{
		"webinars": {
			"name": "webinars",
			"features": {
				"client": {
					"ttb": false,
					"webinar": false
				},
				"customer": {
					"ttb": false,
					"webinar": false
				}
			}
		},

		"media": {
			"features": {
				"client": {
					"youtube": false,
					"facebook": false
				},
				"customer": {
					"youtube": false,
					"facebook": false
				}
			}
		}

		,
		"multiMedia": {
			"features": {
				"client": {
					"video": false,
					"audio": false
				},
				"customer": {
					"video": false,
					"audio": false
				}
			}
		}

		,
		"shareMe": {
			"features": {
				"client": {
					"linkedIn": false,
					"faceBook": false,
					"instagram": false,
					"twitter": false,
					"email": false,
					"messenger": false
				},
				"customer": {
					"linkedIn": false,
					"faceBook": false,
					"instagram": false,
					"twitter": false,
					"email": false,
					"messenger": false
				}
			}
		}

		,
		"likeMe": {
			"features": {
				"client": {
					"likeMe": false
				},
				"customer": {
					"likeMe": false
				}
			}
		}

		,
		"followMe": {
			"name": "followMe",
			"features": {
				"client": {
					"service": false
				},
				"customer": {
					"service": false
				}
			}
		}

		,
		"contactMe": {
			"name": "contactMe",
			"features": {
				"client": {
					"service": false
				},
				"customer": {
					"notification": {
						"tel": false,
						"sms": false,
						"email": false
					}
				}
			}
		}

	}

var modelUsagePnP =
	{
		"pnp": {
			"name": "pnp",
			"features": {
				"client": {
					"service": false
				},
				"customer": {
					"levels": {
						"standard": false,
						"express": false,
						"sameday": false,
						"inhouse": false
					}
				}
			}
		}
	}

var modelUsageCheckout =
	{

		"checkout": {
			"name": "checkout",
			"features": {
				"client": {
					"service": false
				},
				"customer": {
					"service": false
				}
			}
		}
	}
var modelUsageOther = {
	"metauage": {
		"name": "store",
		"features": {
			"client": {
				"service": false
			},
			"customer": {
				"checkout": {
					"service": false
				},
				"logout": {
					"service": false
				},
				"meta": {
					"service": false
				}
			}
		}
	}
	,
	"webinar": {
		"provisioning": {
			"item": false
		},
		"customer": {
			"item": false
		}
	},
	"videoHub": false,
	"booking": false,
	"availability": false,
	"pnp": false,
	"inventory": false,
	"messaging": false,
	"branding": false,
	"analytics": false,
	"support": false
}

var modelUsage = {
	"accountId": "",
	"productId": "",
	"customerId": "",
	"paid": false,
	"ts": getTs(),
	"items": []
}

var modelUsageQuery = {
	"accountId": "",
	"productId": "",
	"customerId": "",
	// optional
	"ts": ""
}