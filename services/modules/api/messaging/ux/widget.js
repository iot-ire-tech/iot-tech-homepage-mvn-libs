var uxWidgetMessage = function () {
    this.counter = 0;
    this.data = new Map();

    this.init = function () {
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
            this.html += "<label><b>Finish Time</b></label>";
            this.html += "<input id=endTimeFixture_" + this.counter + " class=\"finishTimeFixture w3-input w3-hover-grey\" type=\"datetime-local\" required />"


            this.html += "<br>";
            this.html += "<label><b>Annotation</b></label>";
            this.html += "<input id=annotateFixture_" + this.counter + " class=\"annotateFixture w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" required />"


            this.html += "<br>";
            this.html += "<button id=btnAdd_" + this.counter + " class=\"addFixture w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
            this.html += "<br>";
            this.html += "</fieldset>";
        }

        opsButtons:{
            this.html += "<br>"
            this.html += "<div class='w3-row w3-center'>";
            this.html += "<button id=btnCloseMsg class=\"w3-btn w3-round-xxlarge w3-padding-large w3-blue w3-right\" >Close</button>";
            this.html += "</div>";
            this.html += "<br>"
        }

        return this.html;
    };



};
//# sourceURL=api_message_ux.js
