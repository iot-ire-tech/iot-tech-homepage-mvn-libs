/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var uxEventFixtures = function () {
    this.counter = 0;
    this.data = new Map();

    this.init = function () {
        this.counter = getRandInt(2, 100000)

        body: {
            this.html = "<fieldset id=container_" + this.counter + ">";
            this.html += "<legend>Scheduling Windows</legend><br>";
            this.html += "The selected start/end dates and times need to comply with business hours, and not conflict with existing event fixture dates either."
            this.html += "<br>";
            this.html += "Change dates accordingly, else your Event request will not be submittable."
            this.html += "<br>";
            this.html += "Providing an meaningful annotation to this date, will enable the end user to better understand charge basis.";
            this.html += "<br>";

            this.html += "<span id=fixturesMsgBox></span>";
            this.html += "<br>";
            this.html += "<span id=fixturesMsgBox2></span>";
            this.html += "<br>";
            this.html += "<legend>Fixtures Constraint... </legend><br>";


            this.html += "<label><b>Start Time</b></label>";
            this.html += "<input id=startTimeFixture_" + this.counter + " class=\"startTimeFixture w3-input w3-hover-grey\" type=\"datetime-local\" required />"
            this.html += "<br>";
            this.html += "<label><b>Finish Time</b></label>";
            this.html += "<input id=endTimeFixture_" + this.counter + " class=\"finishTimeFixture w3-input w3-hover-grey\" type=\"datetime-local\"  required />"
            this.html += "<br>";


            this.html += "<br>";
            this.html += "<label><b>Annotation</b></label>";
            this.html += "<input id=annotateFixture_" + this.counter + " class=\"annotateFixture w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" required />"


            this.html += "<br>";
            this.html += "<button id=btnAdd_" + this.counter + " class=\"addFixture w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
            this.html += "<br>";
            this.html += "</fieldset>";
        }

        this.html += "<span id=additionalFixturesWidgetsHook></span>"


        opsButtons:{
            this.html += "<br>"
            this.html += "<div class='w3-row w3-center'>";
            this.html += "<div class=w3-half>";
            var btnClass = "w3-btn w3-round-xxlarge w3-padding-large w3-blue"
            this.html += "<button id=btnSaveFixture class=\"" + btnClass + "  \">Save</button>"
            this.html += "</div>";
            this.html += "<div class=w3-half>";
            this.html += "<button id=btnCloseFixture class=\"" + btnClass + "  \" >Close</button>";
            this.html += "</div>";
            this.html += "<br>"
        }

        return this.html;
    };


    this.add = function () {
        this.counter++;

        itemBody:{
            this.html = "<fieldset id=container_" + this.counter + ">";
            this.html += "<legend>Scheduling Windows Id#" + this.counter + " </legend><br>";

            this.html += "<label><b>Start Time</b></label>";
            this.html += "<input id=startTimeFixture_" + this.counter + " class=\"startTimeFixture w3-input w3-hover-grey\" type=\"datetime-local\" required />"
            this.html += "<label><b>Finish Time</b></label>";
            this.html += "<input id=endTimeFixture_" + this.counter + " class=\"finishTimeFixture w3-input w3-hover-grey\" type=\"datetime-local\" required />"


            this.html += "<label><b>Annotation</b></label>";
            this.html += "<input id=annotateFixture_" + this.counter + " class=\"annotateFixture w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" />"


            this.html += "<br>";
            this.html += "<button id=btnAdd_" + this.counter + " class=\"addFixture w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
            this.html += "<button id=btnDel_" + this.counter + " class=\"delFixture w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
            this.html += "<br>";
            this.html += "</fieldset>";
        }


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
        this.data.set(counter,
            {
                "startDateTime": "startTimeFixture_" + counter,
                "endDateTime": "endTimeFixture_" + counter,
                "annotate": "annotateFixture_" + counter
            })
    }
    this.removeId = function (counter) {
        this.data.delete(counter)
    }
    this.getIds = function () {
        return Array.from(this.data.values())
    }

};


//# sourceURL=api_fixtures_ux.js