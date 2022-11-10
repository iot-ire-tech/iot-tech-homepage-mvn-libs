/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Create the data table.
function customersJoined() {
	var pc1 = new Chart()

	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['Jan', 18.94, 'green'], // RGB value
		['Feb', 30.49, 'green'], // English color name
		['Mar', 9.30, 'green'],
		['Apr', 61.45, 'green'],
		['May', 61.45, 'green'],
		['Jun', 61.45, 'green'],
		['Jul', 61.45, 'green'],
		['Aug', 61.45, 'green'],
		['Sep', 61.45, 'green'],
		['Oct', 61.45, 'green'],
		['Nov', 61.45, 'green'],
		['Dev', 61.45, 'green']
	]
	pc1.title = 'Customers Membership Growth'
	pc1.titleX = 'Quanity'
	pc1.maxX = 80
	pc1.titleY = 'Customers'
	pc1.maxY = 80

	pc1.width = 900
	pc1.height = 400
	pc1.init()
	pc1.addChart(this.drawScatterChart)
	setTimeout(function () {
		pc1.addRows(data1).drawScatterChart("customers#1")
		//	clearInterval(timeout);
	}, 1000)
}

function customersLeft() {
	var pc2 = new Chart()
	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['Jan', 50.94, 'green'], // RGB value
		['Feb', 50.49, 'green'], // English color name
		['Mar', 50.30, 'green'],
		['Apr', 51.45, 'green'],
		['May', 51.45, 'green'],
		['Jun', 51.45, 'green'],
		['Jul', 61.45, 'green'],
		['Aug', 51.45, 'green'],
		['Sep', 51.45, 'green'],
		['Oct', 61.45, 'green'],
		['Nov', 51.45, 'green'],
		['Dev', 61.45, 'green']
	]
	pc2.title = 'Customers Membership Decline'
	pc2.titleX = 'Quanity'
	pc2.maxX = 80
	pc2.titleY = 'Customers'
	pc2.maxY = 80

	pc2.width = 900
	pc2.height = 400
	pc2.init()
	pc2.addChart(this.drawScatterChart)
	setTimeout(function () {
		pc2.addRows(data1).drawScatterChart("customers#2")
		//	clearInterval(timeout);
	}, 1000)
}


//# sourceURL=analytics_func_customer.js