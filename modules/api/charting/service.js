/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var nsChartingService = {
    mydb: "chart",
    ...core,
    itemsMap: new Map(),
    items: [],
    dbId: "",
    dbIds: [],
    modelCreate: {
        "accountId": "",
        "productId": "",
        "ts": getTs(),
        "items": [] // array from keys
    },

    modelItem: {
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
    },
    resetModelItem: function () {
        for (var m in core)
            core[m] = "";
    },
    resetItems: function () {
        for (let e in this.items) {
            delete this.items[e];
        }
    },
    addAnalytics() {
        // TODO : Add usage
    },
    service: function () {
        try {

        } catch (errMsg) {
            alert(errMsg)
        }
    },
    create: function () {
        try {
            this.modelCreate.accountId = this.accountId;
            this.modelCreate.productId = this.productId;

            this.items = Array.from(this.itemsMap.values())
            if (this.items.length > 0) {
                this.modelCreate.items = this.items

                this.obj = postDbRequest(this.mydb, this.modelCreate)
                this.dbIds.push(this.obj._id)
            }

            // reset
        } catch (errMsg) {
            alert(errMsg)
        }
    },
    data: {}
    ,
    chart: {}
    ,
    options: {}
    ,
    title: ""
    ,
    titleX: ""
    ,
    titleY: ""
    ,
    minX: ""
    ,
    maxX: ""
    ,
    minY: ""
    ,
    maxY: ""
    ,
    width: ""
    ,
    height: ""
    ,
    setDataType: function (dataType) {
        this.data = dataType;
        return this;
    }
    , setChartType: function (chartType) {
        this.chartType = chartType;
        return this;
    }

    , addRows: function (data) {
//	this.rowData = this.data.addRows(data);
        this.data.addRows(data);
        return this;
    }
    , addCols: function (colMap) {
        colMap.forEach(function (key, value) {
            this.data.addColumn(key, value);
        }.bind(this))
        return this;
    }

    , addArrayData: function (data) {
        this.data = google.visualization.arrayToDataTable(data);
        return this;
    }

    , drawTable: function () {
        this.chartType.draw(this.data, this.options);
        return this;
    }

    , drawPieChart: function (divId) {
        this.options = {'title': this.title, 'width': this.width, 'height': this.height};

        this.chart = new google.visualization.PieChart(document.getElementById(divId));
        this.chart.draw(this.data, this.options);
        return this;
    }
    , drawPieLineChart: function (divId) {
        this.options = {'title': this.title, 'width': this.width, 'height': this.height};
        this.chart = new google.visualization.LineChart(document.getElementById(divId));
        this.chart.draw(this.data, this.options);
        return this;
    }
    , drawMapChart: function (divId) {
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
                        {
                            featureType: 'poi.attraction',
                            stylers: [{color: '#fce8b2'}]
                        },
                        {
                            featureType: 'road.highway',
                            stylers: [{hue: '#0277bd'}, {saturation: -50}]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.icon',
                            stylers: [{hue: '#000'}, {saturation: 100}, {lightness: 50}]
                        },
                        {
                            featureType: 'landscape',
                            stylers: [{hue: '#259b24'}, {saturation: 10}, {lightness: -22}]
                        }
                    ]
                }
            }


        };
        this.chart = new google.visualization.Map(document.getElementById(divId));
        this.chart.draw(this.data, this.options);
        return this;
    }
    , drawCalendarChart: function (divId) {
        this.options = {'title': this.title, 'width': this.width, 'height': this.height};
        this.chart = new google.visualization.Calendar(document.getElementById(divId));
        this.chart.draw(this.data, this.options);
        return this;
    }
    , drawBarChart: function (divId) {
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
    , drawColumnChart: function (divId) {
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
    , drawScatterChart: function (divId) {
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
    ,
    drawLineChart: function (divId) {
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
    },
    resetAccumulators: function () {
        // Tests are common...not good
        this.items = []
        this.itemsMap = new Map()
        // this.modelCreate.items = []
    },
    resetResults: function () {
        // results data
        this.dbId = ""
        this.dbIds = []
    }
}

var optionsMostSoughtItems = {
    title: 'Most Sought After Items',
    width: '600',
    height: '600',
    hAxis: {
        title: 'Activities/Events/Shop'
    },
    vAxis: {
        title: 'Items Sold'
    }
}
var optionsProductCosts = {
    title: 'Distribution of Revenue',
    width: '600',
    height: '600',
//		maxValue: '20',
//		minValue: '10',
    histogram: {bucketSize: 10},
    bar: {gap: 100},
    hAxis: {
        format: 'decimal',
        title: 'Activities/Events/Shop'
//			ticks: [0, 5, 10, 15, 20, 25, 30, 40, 50]

    },
    vAxis: {
        format: 'decimal',
        title: 'Price'
    }
}
var zoomOut = 5
var zoomIn = 15
var zoomInMax = 19
var optionsMap = {
    zoomLevel: 15,
    showTooltip: true,
    showInfoWindow: true,
    icons: {
        default: {
            normal: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Azure-icon.png',
            selected: 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/Map-Marker-Ball-Right-Azure-icon.png'
        }
    }
}
var optionsAgeDistro = {
    title: 'Age Distribution',
    titlePosition: 'out',
    width: '600',
    height: '600',
    legend: {position: 'none'},
    hAxis: {
        title: 'Age Distribution'
    },
    vAxis: {
        title: 'Frequency'
    }
}
var optionsGenderDistro = {
    title: 'Gender Distribution',
    width: '600',
    height: '600',
    hAxis: {
        title: 'Gender'
    },
    vAxis: {
        title: 'Total'
    }
}
var optionsCustomerSigning = {
    title: 'Date Customer Signed Up / Month',
    width: '600',
    height: '600',
    legend: 'none',
    hAxis: {
        format: 'yyyy MMM, dd',
        title: 'Signed-up date'
    },
    vAxis: {
        title: 'Response',
        minValue: 0,
        maxValue: 1
    }
}

var optionsCustomerPurchases = {
    title: 'Customer Purchases',
    titleTextStyle: {
        color: '333333',
        fontName: 'Arial',
        fontSize: 10
    },
    legend: "none",
    allowHtml: true,
    height: '500',
//			cellColor: {
//				stroke: 'black', // Color the border of the squares.
//				strokeOpacity: 0.5, // Make the borders half transparent.
//				strokeWidth: 2 // ...and two pixels thick.
//			},
    dayOfWeekLabel: {
        fontName: 'Times-Roman',
        fontSize: 12,
        color: '#1a8763',
        bold: true,
        italic: true
    },
    dayOfWeekRightSpace: 15,
    cellSize: 15,
    noDataPattern: {
        backgroundColor: 'red',
        color: 'red'
    }
}

var optionsBookingsMissed = {
    title: 'Date Missed Bookings Due To Availabity Times',
    width: '1200',
    height: '800',
    legend: {position: ''},
    allowHtml: true,
    hAxis: {
        // Feb 29 2020
        format: 'date',
        title: 'Booking dates',
//			viewWindow: {
//				min: new Date(2020, 1, 1),
//				max: new Date(2021, 1, 1)
//			}
    },
    vAxis: {
        ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // display labels every 25
        viewWindow: {
            interval: 1,
            max: 23,
            min: 0
        },
        format: 'number',
        title: 'Time Of Day This Happened'
    }
}

//# sourceURL=api_charting_service.js