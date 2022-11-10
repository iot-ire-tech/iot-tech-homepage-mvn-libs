var uxBusinessHoursWidget = function () {
    this.counter = 0;
    this.dataMap = new Map();
    this.addInit = false;

    this.init = function () {
        if (this.counter === 0) {
//			this.counter = getRandInt(2, 100000)

            this.html = "<div class=\"w3-center\">";
            this.html += "<span >Identify the business hours for which this item is available for use</span>";
            this.html += "</div>";

            this.html += "<button class=\"btnAddWeek w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Add Week</button>";
//			this.html += "<button class=\"btnAddDay w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >Add Day</button>";


            this.html += "<span id=availabilityMsgBox></span>";
            if (false)
                init :{
                    this.html += "<div id=container_" + this.counter + " class=\"w3-row \" style=\"width=600px\">"
                    this.html += "<div class=\"w3-quarter w3-container\">"
                    this.html += "<label><b>Day Of Week</b></label>";
                    this.html += "<select id=dow_" + this.counter + " class='dow w3-select w3-hover-grey'  required>"
                    this.html += "<option disabled selected>Please Select</option>"
                    this.html += "<option value=mon >Monday</option>"
                    this.html += "<option value=tue>Tuesday</option>"
                    this.html += "<option value=wed>Wednesday</option>"
                    this.html += "<option value=thu>Thursday</option>"
                    this.html += "<option value=fri>Friday</option>"
                    this.html += "<option value=sat>Saturday</option>"
                    this.html += "<option value=sun>Sunday</option>"
                    this.html += "</select>"
                    this.html += "</div>"


                    this.html += "<div class=\"w3-quarter w3-container\">"
                    this.html += "<label><b>Opening Time</b></label>";
                    this.html += "<input id=opening_" + this.counter + " class=\"startTime w3-input w3-hover-grey\" type=\"time\" min=\"07:00\" max=\"23:00\"  value=\"\" step=900 required />"
                    this.html += "</div>"


                    this.html += "<div class=\"w3-quarter w3-container\">"
                    this.html += "<label><b>Closing Time</b></label>";
                    this.html += "<input id=closing_" + this.counter + " class=\"closingTime w3-input w3-hover-grey\" type=\"time\"  min=\"07:00\" max=\"23:00\"  value=\"\"  step=900 required />"
                    this.html += "</div>"

                    this.html += "<div class=\"w3-quarter w3-container\">"
                    this.html += "<label><b>Annotation</b></label>";
                    this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. regular business hours\" required />"
                    this.html += "</div>"

                    this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >+</button>";
                    this.html += "</div>"
                    this.saveId(this.counter);
                }

            return this.html;
        }
    };


    this.addWeek = function (defaultOpening) {
        var dowMap = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

        this.getIds().forEach(function (value, key, map) {
            $("#container_" + key).empty().remove();
        })
        this.dataMap.clear()

        this.html = ""
        for (dow = 0; dow <= 6; dow++) {
            this.counter++;
            this.html += "<div id=container_" + this.counter + " class=\"w3-row \">"

            this.html += "<div  class=\"w3-quarter w3-container\">"
            this.html += "<label><b>Day Of Week</b></label>";
            this.html += "<select id=dow_" + this.counter + " class='w3-select w3-hover-grey'  required>"
            this.html += "<option value=" + dowMap[dow] + ">" + dowMap[dow] + "</option>"
            this.html += "</select>"
            this.html += "</div>"

            this.html += "<div class=\"w3-quarter w3-container\">"
            this.html += "<label><b>Opening Time</b></label>";
            this.html += "<input id=opening_" + this.counter + " class=\"startTime w3-input w3-hover-grey\" type=\"time\" start=\"00:00\" max=\"00:00\"  value=\"09:00\" required />"
            this.html += "</div>"


            this.html += "<div class=\"w3-quarter w3-container\">"
            this.html += "<label><b>Closing Time</b></label>";
            this.html += "<input id=closing_" + this.counter + " class=\"endTime w3-input w3-hover-grey\" type=\"time\"  start=\"00:00\" max=\"00:00\"  value=\"17:00\"  required />"
            this.html += "</div>"

            this.html += "<div class=\"w3-quarter w3-container\">"
            this.html += "<label><b>Annotation</b></label>";
            this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. regular business hours\" required />"
            this.html += "</div>"

            this.html += "<br>";
            this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
            this.html += "<button id=btnDel_" + this.counter + " class=\"del w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";

            this.html += "</div>"
            /// update time
            $("#dow_" + this.counter).change()
            $("#opening_" + this.counter).change()
            $("#closing_" + this.counter).change()
            $("#annotate_" + this.counter).change()


            this.saveId(this.counter);
        }

        this.html += "<br>";
        this.html += "<div class='w3-row w3-center'>";
        this.html += "<div class=w3-half>";
        this.html += "<button  class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnSaveBizHours\" >Save</button>";
        this.html += "</div>";
        this.html += "<div class=w3-half>";
        this.html += "<button id=btnExitBizHours class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green \" >Close</button>";
        this.html += "</div>";
        this.html += "<br>";
        this.html += "<br>";

        return this.html;
    };
    this.add = function () {
        this.counter++;

        this.html = "<div id=container_" + this.counter + " class=\"w3-row \">"


        this.html += "<div  class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Day Of Week</b></label>";
        this.html += "<select id=dow_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=mon>Monday</option>"
        this.html += "<option value=tue>Tuesday</option>"
        this.html += "<option value=wed>Wednesday</option>"
        this.html += "<option value=thu>Thursday</option>"
        this.html += "<option value=fri>Friday</option>"
        this.html += "<option value=sat>Saturday</option>"
        this.html += "<option value=sun>Sunday</option>"
        this.html += "</select>"
        this.html += "</div>"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Opening Time</b></label>";
        this.html += "<input id=opening_" + this.counter + " class=\"startTime w3-input w3-hover-grey\" type=\"time\" start=\"00:00\" max=\"00:00\" value=\"\" step=900 required />"
        this.html += "</div>"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Closing Time</b></label>";
        this.html += "<input id=closing_" + this.counter + " class=\"endTime w3-input w3-hover-grey\" type=\"time\"  start=\"00:00\" max=\"00:00\" value=\"\"  step=900 required />"
        this.html += "</div>"

        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Annotation</b></label>";
        this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. regular business hours\" required />"
        this.html += "</div>"


        this.html += "<br>";
        this.html += "<button id=btnAdd_" + this.counter + " class=\"add w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<button id=btnDel_" + this.counter + " class=\"del w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";

        this.html += "</div>"


        this.saveId(this.counter);
        return this.html;
    };
    this.del = function (that) {
        var thisId = $(that).attr("id");
        thisId = parseInt(thisId.split("_")[1]);
        $("#container_" + thisId).empty().remove();
        this.removeId(thisId);

    };


    this.getCounter = function () {
        return this.counter;
    }

    this.saveId = function (counter) {
        this.dataMap.set(counter,
            {
                "dowId": "dow_" + counter,
                "openingId": "opening_" + counter,
                "closingId": "closing_" + counter,
                "annotateId": "annotate_" + counter
            })
    }

    this.removeId = function (counter) {
        this.dataMap.delete(counter)
    }
    this.getIds = function () {
        return Array.from(this.dataMap.values())
    }

};

//# sourceURL=api_bizHours_widget.js