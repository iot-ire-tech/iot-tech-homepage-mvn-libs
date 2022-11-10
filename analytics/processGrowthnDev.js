/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Create the data table.
function resourceBookingsMissed() {
	var pc1 = new Chart()
	//https://www.irt.org/script/365.htm
//	3 D Array!!
	var x = []
	var j = 0, k = 0;
	for (var i = 0; i <= 20; i++) {

		x.push(new Array(i, j += 1, k += i))
	}

	var data1 = [

		['Time Of Day', 'Facials      ', 'Squash	', 'Pool	'],
		['7', 0, 1, 2],
		['8', 0, 1, 0],
		['9', 0, 0, 2],
		['10', 1, 0, 0],
		['11', 0, 0, 2],
		['12', 0, 0, 0],
		['13', 0, 0, 0],
		['14', 0, 0, 0],
		['15', 0, 0, 0],
		['16', 0, 0, 5],
		['17', 2, 6, 5],
		['18', 4, 6, 2],
		['19', 3, 6, 8],
		['20', 6, 6, 8],
		['21', 2, 6, 8],
		['22', 1, 0, 2]
	]
	var newElement = ['7', 9, 9, 9]
	data1.push(newElement);

	var data2 = [

		['Time Of Day', 'Facials', "Squash"],
		x
	]
	data1.some(function (item) {
		item.reduce(myFunction)
	});
	pc1.title = "Bookings Lost Due To Resource Constraint = (" + rt + ")"
	pc1.titleX = 'Time Of Day'
	pc1.maxX = 24
	pc1.titleY = 'Potential Bookings Lost'
	pc1.maxY = 10

	pc1.width = 1400
	pc1.height = 400
	pc1.init()
	pc1.addChart(this.drawLineChart)




	setTimeout(function () {
		pc1.addRows(data1).drawLineChart("missed#1")
		//	clearInterval(timeout);
	}, 1000)
}


var rt = 0
function myFunction(total, val) {
//	//console.log("INF: val (" + val + ")")
//	//console.log("INF: total (" + total + ")")
	if (val >= 0)
		rt = rt + val
//	//console.log("INF: rt (" + rt + ")")
	return total + val;
}

//# sourceURL=analytics_func_growth.js