/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var resourceOut = {
	"comment": "How much......",
	"comment": "How much......",
	"todaysDate": "2018-05-21T20:17:44.590Z",
	"dayOfWeek": 1,
	"hourOfDay": 22,
	"resource": "not-available",
	"resourcePoolId": 68538,
	"id": 1
}

// Create the data table.
function mostPurchasedResources() {
	pc2 = new Chart()
	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['T-Shirts', 18.94, 'green'], // RGB value
		['Swiming Caps', 30.49, 'green'], // English color name
		['Squash Court', 9.30, 'green'],
		['Spinning', 61.45, 'green'],
		['Coaching', 61.45, 'green']
	]
	pc2.title = 'Most Purchased Resources'
	pc2.titleX = 'Quanity'
	pc2.maxX = 50
	pc2.titleY = 'Resources'
	pc2.maxY = 50

	pc2.width = 600
	pc2.height = 400
	pc2.init()
	pc2.addChart(this.drawBarChart)
	setTimeout(function () {
		pc2.addRows(data1).drawBarChart("trending#1")
		//	clearInterval(timeout);
	}, 1000)
}

function mostPurchasedEvent(moreData) {
	pc1 = new Chart()
	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['Squash Ireland Finals', 8, "green"], // RGB value
		['Swimming-Champions', 10.49, 'green'], // English color name
		['Bridge Night 2018', 19.30, 'green'],
		['Vets Support Concert', 21.45, 'green']
	]
	data1 = moreData
	pc1.title = 'Most Purchased Events'
	pc1.titleX = 'Quanity'
	pc1.maxX = 50
	pc1.titleY = 'Events'
	pc1.maxY = 50

	pc1.width = 600
	pc1.height = 400
	pc1.init()
//	pc1.addChart(this.drawBarChart)
	pc1.addChart(this.drawColumnChart)
	setTimeout(function () {
		pc1.addRows(data1).drawColumnChart("trending#2")
		//	clearInterval(timeout);
	}, 1000)
}


function mostPurchasedService() {
	ppc = new Chart()
	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['Facials', 18.94, 'green'], // RGB value
		['Crazy Golf', 18.94, 'green'], // RGB value
		['Squash Court#1', 30.49, 'green'], // English color name
		['5-Aside Footie', 9.30, 'green'],
		['T-Shirts', 81.45, 'green'],
		['Spinning', 61.45, 'green']
	]
	ppc.title = 'Most Purchased Services'
	ppc.titleX = 'Quanity'
	ppc.maxX = 50
	ppc.titleY = 'Services'
	ppc.maxY = 50

	ppc.width = 600
	ppc.height = 400
	ppc.init()
	ppc.addChart(this.drawBarChart)




	setTimeout(function () {
		ppc.addRows(data1).drawBarChart("trending#3")
		//	clearInterval(timeout);
	}, 1000)
}

var pc;

//# sourceURL=analytics_func_trending.js