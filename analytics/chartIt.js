/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Chart() {

}
Chart.prototype.data = {};
Chart.prototype.chart = {};
Chart.prototype.options = {};
Chart.prototype.title = "";
Chart.prototype.titleX = "";
Chart.prototype.titleY = "";
Chart.prototype.minX = "";
Chart.prototype.maxX = "";
Chart.prototype.minY = "";
Chart.prototype.maxY = "";
Chart.prototype.width = "";
Chart.prototype.height = "";

Chart.prototype.setDataType = function (dataType) {
	this.data = dataType;
	return this;
}
Chart.prototype.setChartType = function (chartType) {
	this.chartType = chartType;
	return this;
}

Chart.prototype.addRows = function (data) {
//	this.rowData = this.data.addRows(data);
	this.data.addRows(data);
	return this;
}
Chart.prototype.addCols = function (colMap) {
	colMap.forEach(function (key, value) {
		this.data.addColumn(key, value);
	}.bind(this))
	return this;
}

Chart.prototype.addArrayData = function (data) {
	this.data = google.visualization.arrayToDataTable(data);
	return this;
}

Chart.prototype.drawTable = function (options) {
//	this.options.showRowNumber = true
//	this.options.allowHtml = true
//	this.data.setProperty(0, 1, 'style', 'width:' + this.width);
//	this.data.setProperty(0, 2, 'style', 'width:' + this.width);
//	this.options.pageSize = 5
//	this.chart = new google.visualization.Table(elementId);
	this.options = options;
	this.chartType.draw(this.data, this.options);
	return this;
}

Chart.prototype.drawPieChart = function (divId) {
	this.options = {'title': this.title, 'width': this.width, 'height': this.height};

	this.chart = new google.visualization.PieChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawPieLineChart = function (divId) {
	this.options = {'title': this.title, 'width': this.width, 'height': this.height};
	this.chart = new google.visualization.LineChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawMapChart = function (divId) {
	var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';
	this.options = {

		'width': this.width, 'height': this.height,
		zoomLevel: 12,
		showTooltip: true,
		showInfoWindow: true,
		useMapTypeControl: true,
		icons: {
			blue: {
				normal: url + 'Map-Marker-Ball-Azure-icon.png',
				selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
			},
			green: {
				normal: url + 'Map-Marker-Push-Pin-1-Chartreuse-icon.png',
				selected: url + 'Map-Marker-Push-Pin-1-Right-Chartreuse-icon.png'
			},
			pink: {
				normal: url + 'Map-Marker-Ball-Pink-icon.png',
				selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
			}
		},
		mapType: 'styledMap',
		maps: {
			// Your custom mapTypeId holding custom map styles.
			styledMap: {
				name: 'Location Distribution', // This name will be displayed in the map type control.
				styles: [
					{featureType: 'poi.attraction',
						stylers: [{color: '#fce8b2'}]
					},
					{featureType: 'road.highway',
						stylers: [{hue: '#0277bd'}, {saturation: -50}]
					},
					{featureType: 'road.highway',
						elementType: 'labels.icon',
						stylers: [{hue: '#000'}, {saturation: 100}, {lightness: 50}]
					},
					{featureType: 'landscape',
						stylers: [{hue: '#259b24'}, {saturation: 10}, {lightness: -22}]
					}
				]}}


	};
	this.chart = new google.visualization.Map(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawCalendarChart = function (divId) {
	this.options = {'title': this.title, 'width': this.width, 'height': this.height};
	this.chart = new google.visualization.Calendar(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawBarChart = function (divId) {
	this.options = {
		'title': this.title,
		'height': this.height,
		'width': this.width,
		hAxis: {title: this.titleX, minValue: 0, maxValue: this.maxX},
		vAxis: {title: this.titleY, minValue: 0, maxValue: this.maxY},
		legend: 'none'
	};
	this.chart = new google.visualization.BarChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawColumnChart = function (divId) {
	this.options = {
		'title': this.title,
		'height': this.height,
		'width': this.width,
		vAxis: {textPosition: 'none'},
		color: "#596770",
		gridlines: {
			color: 'transparent'
		},
		'tooltip': {
			trigger: 'none'
		},
		hAxis: {title: this.titleX, minValue: 0, maxValue: this.maxX},
//		vAxis: {title: this.titleY, minValue: 0, maxValue: this.maxY},
		legend: 'none'
	};
	this.chart = new google.visualization.ColumnChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
Chart.prototype.drawScatterChart = function (divId) {
	this.options = {
		'title': this.title,
		'width': this.width,
		'height': this.height,
		hAxis: {title: this.titleX, minValue: 0, maxValue: this.maxX},
		vAxis: {title: this.titleY, minValue: 0, maxValue: this.maxY},
		legend: {position: "none"},
		trendlines: {0: {type: 'polynomial', degree: 3, visibleInLegend: true}}
	};
	this.options = {
		'title': this.title,
		'width': this.width,
		'height': this.height,
		hAxis: {title: this.titleX, minValue: 0, maxValue: this.maxX},
		vAxis: {title: this.titleY, minValue: 0, maxValue: this.maxY},
		legend: {position: "none"},
		trendlines: {0: {}}    // Draw a trendline for data series 0.
	};
	this.chart = new google.visualization.ScatterChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
// https://developers.google.com/chart/interactive/docs/gallery/gauge
// https://developers.google.com/chart/interactive/docs/overlays
// https://developers.google.com/chart/interactive/docs/gallery/trendlines
//A trendline is a line superimposed on a chart revealing the overall direction of the data. Google Charts can automatically generate trendlines for Scatter Charts, Bar Charts, Column Charts, and Line Charts.

Chart.prototype.drawLineChart = function (divId) {
	this.options = {
		'title': this.title,
		'height': this.height,
		'width': this.width,
		hAxis: {title: this.titleX, minValue: 0, maxValue: this.maxX},
		vAxis: {title: this.titleY, minValue: 0, maxValue: this.maxY},
		curveType: 'function',
		legend: {position: 'bottom'}
	};
	this.chart = new google.visualization.LineChart(document.getElementById(divId));
	this.chart = new google.visualization.LineChart(document.getElementById(divId));
	this.chart.draw(this.data, this.options);
	return this;
}
function test_barchart() {

	var pc = new Chart()

	var data1 = [
		['Element', 'Density', {role: 'style'}],
		['Copper', 8.94, '#b87333'], // RGB value
		['Silver', 10.49, 'silver'], // English color name
		['Gold', 19.30, 'gold'],
		['Platinum', 21.45, 'color: #e5e4e2'], // CSS-style declaration
	]
	pc.width = 400
	pc.height = 400
	pc.init()
	pc.addChart(this.drawBarChart)
	setTimeout(function () {
		// Chart - Peak Activity
		pc.title = 'Peak Bookings#1'
		pc.addRows(data1).drawBarChart("chart_users_peakactivity#1")


		clearInterval(timeout);
	}, 1000)




}
function test_calchart() {

	var pc = new Chart()

	var data1 = [
		['Country', 'Population'],
		[new Date(2012, 3, 13), 37032],
		[new Date(2012, 3, 14), 38024],
		[new Date(2012, 3, 15), 38024],
		[new Date(2012, 3, 16), 38108],
		[new Date(2012, 3, 17), 38229],
		// Many rows omitted for brevity.
		[new Date(2013, 9, 4), 38177],
		[new Date(2013, 9, 5), 38705],
		[new Date(2013, 9, 12), 38210],
		[new Date(2013, 9, 13), 38029],
		[new Date(2013, 9, 19), 38823],
		[new Date(2013, 9, 23), 38345],
		[new Date(2013, 9, 24), 38436],
		[new Date(2013, 9, 30), 38447]
	]

	pc.width = 400
	pc.height = 400
	pc.init()
	pc.addChart(this.drawCalendarChart)
	setTimeout(function () {
		// Chart - Peak Activity
		pc.title = 'Peak Bookings#1'
		pc.addRows(data1).drawCalendarChart("chart_users_peakactivity#1")


		clearInterval(timeout);
	}, 1000)




}
function test_scatterchart() {

	var pc = new Chart()

	var data1 = [
		['Age', 'Weight'],
		[8, 12],
		[4, 5.5],
		[11, 14],
		[4, 5],
		[3, 3.5],
		[6.5, 7]

	]

	pc.title = 'Peak Bookings#1'
	pc.titleX = 'Weight'
	pc.maxX = 50
	pc.titleY = 'Height'
	pc.maxY = 50

	pc.width = 400
	pc.height = 400
	pc.init()
	pc.addChart(this.drawScatterChart)
	setTimeout(function () {
		// Chart - Peak Activity
		pc.addRows(data1).drawScatterChart("chart_users_peakactivity#1")


		clearInterval(timeout);
	}, 1000)




}
function tests() {

	var pc = new Chart()

	var dataUsers1 = [['Day', "X"], ['Moring', 2], ['Midday', 3], ['Evening', 5]]
	var dataUsers2 = [['Day', "X"], ['Children', 3], ['Teens', 2], ['Adult', 2], ['VIP', 2]]
	var dataUsers3 = [['Day', "X"], ['Males', 3], ['Femaile', 2]]

	var data = [
		['Year', 'Sales', 'Expenses'],
		['2004', 1000, 400],
		['2005', 1170, 460],
		['2006', 660, 1120],
		['2007', 1030, 540]
	]

	var userLocations = [
		['Country', 'Population'],
		['China', 'China: 1,363,800,000'],
		['India', 'India: 1,242,620,000'],
		['US', 'US: 317,842,000'],
		['Indonesia', 'Indonesia: 247,424,598'],
		['Brazil', 'Brazil: 201,032,714'],
		['Pakistan', 'Pakistan: 186,134,000'],
		['Nigeria', 'Nigeria: 173,615,000'],
		['Bangladesh', 'Bangladesh: 152,518,015'],
		['Russia', 'Russia: 146,019,512'],
		['Japan', 'Japan: 127,120,000']
	]


	pc.width = 400
	pc.height = 400
	pc.init()
	pc.addChart(this.drawPieChart)
	pc.addChart(this.drawPieLineChart)
	pc.addChart(this.drawMapChart)





	setTimeout(function () {
		// Chart - Peak Activity
		pc.title = 'Peak Bookings#1'
		pc.addRows(dataUsers2).drawPieChart("chart_users_peakactivity#2")

		pc.title = 'Age Distribution#2'
		pc.addRows(data).drawPieLineChart("chart_users_peakactivity#1")

		pc.title = 'Sex Distribution#3'
		pc.title = 'Location Distribution'
		pc.addRows(userLocations).drawMapChart("chart_users_peakactivity#3")
		clearInterval(timeout);
	}, 1000)




}
//# sourceURL=analytics_chart_funcs.js