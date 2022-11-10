/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var graphList = new Map()
var graphEntry = {
	"productId": "productId#" + getRandInt(1, 1000),
	"source": "sold|event|activity",
	"purpose": "trend",
	"ts": []
}

var modelAnalytics = {
	"accountId": "acct_1GAINZGfqh4DeGy5",
	"usage": [],
	"entries": [
		{
			"productId": "prod_GjuO0PtGIsZ1E4",
			"source": "event",
			"purpose": "trend",
			"ts": [
				"2020-02-29T16:21:12.346Z",
				"2020-02-29T16:21:13.585Z"
			]
		}
	]
};

// Product
graphEntry.ts.push(new Date().toISOString())
sleep(2000)
graphEntry.ts.push(new Date().toISOString())

modelAnalytics.usage.push(getTs())
modelAnalytics.entries.push(graphEntry)
//var messageRsp = postDbRequest("analytics", modelAnalytics);

var existingAnalytics = {}

var entries = [
	[
		"productId#1",
		{
			"source": "sold|event|activity",
			"purpose": "trend",
			"item": "resource",
			"entry": [
				{
					"ts": "2020-02-29T13:15:41.420Z",
					"value": 1
				},
				{
					"ts": "2020-02-29T13:15:42.626Z",
					"value": 2
				}
			],
			"attrib": "green"
		}
	]
]
var map = new Map(entries)

//# sourceURL=analytics_model.js