/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Create the data table.
function customersLocations() {
	var pc1 = new Chart()
	var data1 = [
		['Lat', 'Long', 'Name'],
		[37.4232, -122.0853, 'Work'],
		[37.4289, -122.1697, 'University'],
		[37.6153, -122.3900, 'Airport'],
		[37.4422, -122.1731, 'Shopping']

	]
	pc1.title = 'Customer Distribution'
	pc1.titleX = 'Quanity'
	pc1.maxX = 80
	pc1.titleY = 'Customers'
	pc1.maxY = 80

	pc1.width = 1600
	pc1.height = 600
	pc1.init()
	pc1.addChart(this.drawMapChart)




	setTimeout(function () {
		pc1.addRows(data1).drawMapChart("geo#1")
		//	clearInterval(timeout);
	}, 1000)
}

//# sourceURL=analytics_func_geo.js