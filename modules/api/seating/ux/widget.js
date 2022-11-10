/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var uxEventSeating = function () {
    this.counter = 0;
    this.data = new Map();
    this.addInit = false

    this.init = function () {
        this.addInit = true;
        this.counter = getRandInt(2, 100000)
        this.html = "<fieldset id=container_" + this.counter + ">";
        this.html += "<legend>Seating Arrangement</legend><br>";


        this.html += "<label><b>Quality</b></label>";
        this.html += "<select id=seatingGrade_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=level_1>Premier</option>"
        this.html += "<option value=level_2>Middle</option>"
        this.html += "<option value=level_3>Back Row</option>"
        this.html += "<option value=level_4>Standing Only</option>"
        this.html += "<option disabled value=0>Request More Contact Support</option>"
        this.html += "</select>"

        this.html += "<label><b>Cost</b></label>";
        this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey cost\" type=\"number\" step='0.01' min='0.00' value='0.00' placeholder='0.00' required />"

        this.html += "<label><b>Currency</b></label>";
        this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=EUR>EUR</option>"
        this.html += "<option value=BPD>UK Pound</option>"
        this.html += "<option value=USD>US Dollar</option>"
        this.html += "<option value=>Request More Contact Support</option>"
        this.html += "</select>"


        this.html += "<br>";
        this.html += "<label><b>Annotation</b></label>";
        this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" required />"


        this.html += "<br>";
        this.html += "<button id=btnAdd_" + this.counter + " class=\"addSeatingGrade w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<br>";
        this.html += "</fieldset>";

        this.html += "<span id=seatingHook></span>"

        this.html += "<br>"
        this.html += "<div class='w3-row w3-center'>";
        this.html += "<div class=w3-half>";
        var btnClass = "w3-btn w3-round-xxlarge w3-padding-large w3-blue"
        this.html += "<button id=btnSaveSeating class=\"" + btnClass + "  \">Save</button>"
        this.html += "</div>";
        this.html += "<div class=w3-half>";
        this.html += "<button id=btnCloseSeating class=\"" + btnClass + "  \" >Close</button>";
        this.html += "</div>";
        this.html += "<br>"

        return this.html;
    };


    this.add = function () {
        this.counter++;
        this.html = "<fieldset id=container_" + this.counter + ">";
        this.html += "<legend>Seating Arrangement Id#" + this.counter + " </legend><br>";

        this.html += "<label><b>Quality</b></label>";
        this.html += "<select id=seatingGrade_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=Premier>Premier</option>"
        this.html += "<option value=Middle>Middle</option>"
        this.html += "<option value=Back>Back Row</option>"
        this.html += "<option value=Standing>Standing Only</option>"
        this.html += "<option value=0>Request More Contact Support</option>"
        this.html += "</select>"

        this.html += "<label><b>Cost</b></label>";
        this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey cost\" type=\"number\" step='0.15'  min='0.00' value='0.00' placeholder='0.00' required />"

        this.html += "<label><b>Currency</b></label>";
        this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=EUR>EUR</option>"
        this.html += "<option value=BPD>UK Pound</option>"
        this.html += "<option value=USD>US Dollar</option>"
        this.html += "<option value=0>Request Other, Contact Support</option>"
        this.html += "</select>"


        this.html += "<label><b>Annotation</b></label>";
        this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. members only rate\" />"


        this.html += "<br>";
        this.html += "<button id=btnAdd_" + this.counter + " class=\"addSeatingGrade w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<button id=btnDel_" + this.counter + " class=\"delSeatingGrade w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
        this.html += "<br>";
        this.html += "</fieldset>";


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
                "grade": "seatingGrade_" + counter,
                "cost": "cost_" + counter,
                "currency": "currency_" + counter,
                "annotate": "annotate_" + counter
            })
    }
    this.removeId = function (counter) {
        this.data.delete(counter)
    }
    this.getIds = function () {
        return Array.from(this.data.values())
    }


};


//# sourceURL=api_seating_ux.js