/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var uxPostNPackageWidget = function () {
    this.counter = 0;
    this.data = new Map();
    this.addInit = false;

    this.init = function (counter) {
        this.counter = counter;
        this.counter++;
        form:{
            if (this.counter === 1) {
                this.addInit = true;
                this.counter = getRandInt(2, 100000)

                this.html = "<div class=\"w3-center\">";
                this.html += "<span >Determine postal charges that will be applied to vendors</span>";
                this.html += "</div>";

                this.html += "<div id=container_" + this.counter + " class=\"w3-row \" style=\"width=600px\">"
                this.html += "<span id=uxPostNPackageDialogMsgBox></span>";


                this.html += "<div class=\"w3-quarter w3-container\">"
                this.html += "<label><b>Grade</b></label>";
                this.html += "<select id=grade_" + this.counter + " class='w3-select w3-hover-grey'  required>"
                this.html += "<option disabled >Please Select</option>"
                this.html += "<option value=standard >Standard 5-10 Days</option>"
                this.html += "<option value=expresss>Express 1-3 Days</option>"
                this.html += "<option value=sameday>Same Day</option>"
                this.html += "<option value=inhouse>On prem</option>"
                this.html += "</select>"
                this.html += "</div>"


                this.html += "<div class=\"w3-quarter w3-container\">"
                this.html += "<label><b>Cost</b></label>";
                this.html += "<input id=cost_" + this.counter + " class=\"w3-input w3-hover-grey\" type=number min=0.00   step=0.01 required />"
                this.html += "</div>"

                this.html += "<div class=\"w3-quarter w3-container\">"
                this.html += "<label><b>Currency</b></label>";
                this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
                this.html += "<option disabled selected>Please Select</option>"
                this.html += "<option value=EUR>EUR</option>"
                this.html += "<option value=BPD>UK Pound</option>"
                this.html += "<option value=USD>US Dollar</option>"
                this.html += "<option value=>Request More Contact Support</option>"
                this.html += "</select>"
                this.html += "</div>"

                this.html += "<div class=\"w3-quarter w3-container\">"
                this.html += "<label><b>Annotation</b></label>";
                this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. business hours only\" required />"
                this.html += "</div>"

                this.html += "<button id=btnAdd_" + this.counter + " class=\"addPostal w3-btn w3-round-xxlarge w3-padding-large w3-green w3-right\" >+</button>";
                this.html += "</div>"
                this.saveId(this.counter);
            }

            this.html += "<br>";

            this.html += "<span id=pnpContent></span>";

            this.html += "<br>";
            this.html += "<div class='w3-row w3-center'>";
            this.html += "<div class=w3-half>";
            this.html += "<button  class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnSavePnP\" >Save</button>";
            this.html += "</div>";
            this.html += "<div class=w3-half>";
            this.html += "<button  class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnExitPnP\" >Close</button>";
            this.html += "</div>";
            this.html += "<br>";
            this.html += "<br>";

            return this.html;
        }
    };


    this.add = function () {
        this.counter++;

        this.html = "<div id=container_" + this.counter + " class=\"w3-row \">"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Grade</b></label>";
        this.html += "<select id=grade_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled >Please Select</option>"
        this.html += "<option value=standard >Standard 5-10 Days</option>"
        this.html += "<option value=expresss>Express 1-3 Days</option>"
        this.html += "<option value=sameday>Same Day</option>"
        this.html += "<option value=inhouse>On prem</option>"
        this.html += "</select>"
        this.html += "</div>"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Cost</b></label>";
        this.html += "<input id=cost_" + this.counter + " class=\"w3-input w3-hover-grey\" type=number min=0.00   step=0.01 required />"
        this.html += "</div>"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Currency</b></label>";
        this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=EUR>EUR</option>"
        this.html += "<option value=BPD>UK Pound</option>"
        this.html += "<option value=USD>US Dollar</option>"
        this.html += "<option value=>Request More Contact Support</option>"
        this.html += "</select>"
        this.html += "</div>"


        this.html += "<div class=\"w3-quarter w3-container\">"
        this.html += "<label><b>Annotation</b></label>";
        this.html += "<input id=annotate_" + this.counter + " class=\"annotate w3-input w3-hover-grey\" type=\"text\" placeholder=\"E.g. business hours only\" required />"
        this.html += "</div>"


        this.html += "<br>";
        this.html += "<button id=btnAdd_" + this.counter + " class=\"addPostal w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<button id=btnDel_" + this.counter + " class=\"delPostal w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";

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
        this.data.set(counter,
            {
                "costId": "cost_" + counter,
                "gradeId": "grade_" + counter,
                "currencyId": "currency_" + counter,
                "annotateId": "annotate_" + counter
            })
    }
    this.removeId = function (counter) {
        this.data.delete(counter)
    }
    this.getIds = function (counter) {
        return Array.from(this.data.values())
    }

};

//# sourceURL=api_pnp_ux.js