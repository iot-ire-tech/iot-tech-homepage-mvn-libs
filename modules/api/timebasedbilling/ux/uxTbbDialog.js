var uxTbbDialog = function () {
    this.counter = 0;
    this.data = [];
    this.addInit = false;

    this.init = function (counter) {
        this.counter = counter;
        this.counter++;
        if (this.counter === 1) {
            this.addInit = true;
            this.counter = getRandInt(2, 100000)

            this.html = "<fieldset id=container_" + this.counter + ">";
            this.html += "<legend>Time/Money Constraint... </legend><br>";
            this.html += "<label><b>Choose a time based billing increment</b></label>";
            this.html += "<select id=time_" + this.counter + " class='w3-select w3-hover-grey ttbUnitTime'  required>"
            this.html += "<option disabled selected>Please Select</option>"
            // this.html += "<optgroup label=\"Gratis Billing\">"
            // this.html += "<option value=0 incId=min>Free To Purchase</option>"
            // this.html += "</optgroup>"
            this.html += "<optgroup label=\"Per Minute Billing\">"
            this.html += "<option value=15 incId=min>15 Minutes</option>"
            this.html += "<option value=30 incId=min>30 Minutes</option>"
            this.html += "<option value=45 incId=min>45 Minutes</option>"
            this.html += "</optgroup>"
            this.html += "<optgroup label=\"Per Hour Billing\">"
            this.html += "<option value=1 incId=hr>1hr 00 Minutes</option>"
            this.html += "<option value=2 incId=hr>2hrs 00 Minutes</option>"
            this.html += "<option value=3 incId=hr>3hrs 00 Minutes</option>"
            this.html += "<option value=4 incId=hr>4hrs 00 Minutes</option>"
            this.html += "<option value=5 incId=hr>5hrs 00 Minutes</option>"
            this.html += "<option value=6 incId=hr>6hrs 00 Minutes</option>"
            this.html += "<option value=7 incId=hr>7hrs 00 Minutes</option>"
            this.html += "<option value=8 incId=hr>8hrs 00 Minutes</option>"
            this.html += "</optgroup>"
            this.html += "<optgroup disabled label=\"Per Day Billing\">"
            this.html += "<option value=1 incId=day>1 Day 00 Hours</option>"
            this.html += "<option value=2 incId=day>2 Days 00 Hours</option>"
            this.html += "<option value=3 incId=day>3 Days 00 Hours</option>"
            this.html += "<option value=4 incId=day>4 Days 00 Hours</option>"
            this.html += "<option value=4 incId=day>5 Days 00 Hours</option>"
            this.html += "<option value=6 incId=day>6 Days 00 Hours</option>"
            this.html += "<option value=7 incId=day>7 Days 00 Hours</option>"
            this.html += "</optgroup>"
            this.html += "<optgroup disabled label=\"Per Week Billing\">"
            this.html += "<option value=1 incId=week>1 Week 00 Days</option>"
            this.html += "<option value=2 incId=week>2 Weeks 00 Hours</option>"
            this.html += "<option value=3 incId=week>3 Weeks 00 Hours</option>"
            this.html += "<option value=4 incId=week>4 Weeks 00 Hours</option>"
            this.html += "</optgroup>"
            this.html += "</select>"

            this.html += "<label><b>Cost of this duration</b></label>";
            this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey cost\" type=\"number\" step='0.01' min='0.00' value='0.00' placeholder='0.00' required />"

            this.html += "<label><b>What currency is to be applied</b></label>";
            this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey currency'  required>"
            this.html += "<option disabled selected>Please Select</option>"
            this.html += "<option value=EUR>EUR</option>"
            this.html += "<option value=BPD>UK Pound</option>"
            this.html += "<option value=USD>US Dollar</option>"
            this.html += "<option value=>Request More Contact Support</option>"
            this.html += "</select>"

            this.html += "<br>";
            this.html += "<label><b>Supply a meaningful note for this rate</b></label>";
            this.html += "<input id=annotate_" + this.counter + " class=\" w3-input w3-hover-grey annotate\" type=\"text\" placeholder=\"E.g. members only rate\" required />"

            this.html += "<br>";
//			this.html += "<label><b>Mark as best price offering?</b></label>";
//			this.html += "<input id=bestprice_" + this.counter + " class=\"bestprice w3-input w3-hover-grey\" value=yes type=\"checkbox\" placeholder=\"\" required />"
//			this.html += "<input id=bestprice_" + this.counter + " class=\"tbbbestprice w3-input w3-hover-grey\" name=bestprice type=\"checkbox\" placeholder=\"\" required />"


            this.html += "<br>";
            this.html += "<button id=btnAdd_" + this.counter + " class=\"addTbb w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
            this.html += "<br>";
            this.html += "</fieldset>";

            this.html += "<br>";
            this.html += "<div class='w3-row w3-center'>";
            this.html += "<div class=w3-half>";
            this.html += "<button id=btnSaveTbb class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green \" >Save</button>";
            this.html += "</div>";
            this.html += "<div class=w3-half>";
            this.html += "<button id=btnExitTbb class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green \" >Close</button>";
            this.html += "</div>";
            this.html += "<br>";
            this.html += "<br>";
            this.saveId(this.counter);

            return this.html;
        }
    };


    this.add = function () {
        this.counter++;
        this.html = "<fieldset id=container_" + this.counter + ">";
        this.html += "<legend>Add New Time/Money Constraint... </legend><br>";

        this.html += "<label><b>Per Minute Billing</b></label>";
        this.html += "<select id=time_" + this.counter + " class='w3-select w3-hover-grey ttbUnitTime '  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<optgroup label=\"Gratis Billing\">"
        this.html += "<option value=0>Free To Purchase</option>"
        this.html += "</optgroup>"
        this.html += "<optgroup label=\"Per Minute Billing\">"
        this.html += "<option value=15 incId=min>15 Minutes</option>"
        this.html += "<option value=30 incId=min>30 Minutes</option>"
        this.html += "<option value=45 incId=min>45 Minutes</option>"
        this.html += "</optgroup>"
        this.html += "<optgroup label=\"Per Hour Billing\">"
        this.html += "<option value=1 incId=hr>1hr 00 Minutes</option>"
        this.html += "<option value=2 incId=hr>2hrs 00 Minutes</option>"
        this.html += "<option value=3 incId=hr>3hrs 00 Minutes</option>"
        this.html += "<option value=4 incId=hr>4hrs 00 Minutes</option>"
        this.html += "<option value=5 incId=hr>5hrs 00 Minutes</option>"
        this.html += "<option value=6 incId=hr>6hrs 00 Minutes</option>"
        this.html += "<option value=7 incId=hr>7hrs 00 Minutes</option>"
        this.html += "<option value=7 incId=hr>8hrs 00 Minutes</option>"
        this.html += "</optgroup>"
        this.html += "<optgroup label=\"Per Day Billing\">"
        this.html += "<option value=1 incId=day>1 Day 00 Hours</option>"
        this.html += "<option value=2 incId=day>2 Days 00 Hours</option>"
        this.html += "<option value=3 incId=day>3 Days 00 Hours</option>"
        this.html += "<option value=4 incId=day>4 Days 00 Hours</option>"
        this.html += "<option value=5 incId=day>5 Days 00 Hours</option>"
        this.html += "<option value=6 incId=day>6 Days 00 Hours</option>"
        this.html += "<option value=7 incId=day>7 Days 00 Hours</option>"
        this.html += "</optgroup>"
        this.html += "<optgroup label=\"Per Week Billing\">"
        this.html += "<option value=1 incId=week>1 Week 00 Days</option>"
        this.html += "<option value=2 incId=week>2 Weeks 00 Hours</option>"
        this.html += "<option value=3 incId=week>3 Weeks 00 Hours</option>"
        this.html += "<option value=4 incId=week>4 Weeks 00 Hours</option>"
        this.html += "</optgroup>"
        this.html += "</select>"

        this.html += "<label><b>Cost</b></label>";
        this.html += "<input id=cost_" + this.counter + " class=\"data w3-input w3-hover-grey cost\" type=\"number\" step='0.01'  min='0.00' value='0.00' placeholder='0.00' required />"

        this.html += "<label><b>Currency</b></label>";
        this.html += "<select id=currency_" + this.counter + " class='w3-select w3-hover-grey currency'  required>"
        this.html += "<option disabled selected>Please Select</option>"
        this.html += "<option value=EUR>EUR</option>"
        this.html += "<option value=BPD>UK Pound</option>"
        this.html += "<option value=USD>US Dollar</option>"
        this.html += "<option value=0>Request Other, Contact Support</option>"
        this.html += "</select>"

        this.html += "<label><b>Annotation</b></label>";
        this.html += "<input id=annotate_" + this.counter + " class=\" w3-input w3-hover-grey annotate\" type=\"text\" placeholder=\"E.g. members only rate\" />"

        this.html += "<br>";
//		this.html += "<label><b>Mark as best price offering?</b></label>";
//		this.html += "<input id=bestprice_" + this.counter + " class=\"bestprice w3-input w3-hover-grey\" value=yes type=\"checkbox\" placeholder=\"\" required />"
//		this.html += "<input id=bestprice_" + this.counter + " class=\"tbbbestprice w3-input w3-hover-grey\" name=bestprice type=\"checkbox\" placeholder=\"\" required />"


        this.html += "<br>";
        this.html += "<button id=btnAdd_" + this.counter + " class=\"addTbb w3-btn w3-round-xxlarge w3-padding-large w3-green w3-left\" >+</button>";
        this.html += "<button id=btnDel_" + this.counter + " class=\"delTbb w3-btn w3-round-xxlarge w3-padding-large w3-red w3-right\" >-</button>";
        this.html += "<br>";
        this.html += "</fieldset>";


        this.saveId(this.counter);
        return this.html;
    };
    this.del = function (that) {
        var thisId = $(that).attr("id");
        thisId = parseInt(thisId.split("_")[1]);
// Delete Data
//		this.inputIdsArr.splice(thisId - 1, 1);
// Delete UX
        $("#container_" + thisId).empty().remove();

        this.removeId(thisId);

    };

    this.getCounter = function () {
        return this.counter;
    }

    this.saveId = function (counter) {

        old = {
            "incId": "incId" + counter,
            "timeId": "time_" + counter,
            "costId": "cost_" + counter,
            "bestpriceId": "bestprice_" + counter,
            "currencyId": "currency_" + counter,
            "annotateId": "annotate_" + counter
        }

        this.data.push(
            {
                // "sellable": false,
                "bestprice": false,
                // C
                "currency": "currency_" + counter,
                "annotate": "annotate_" + counter,
                // volume based billing
                vbb: {
                    "quantity": 0,

                },
                tbb: {
                    "unitTime": "time_" + counter,
                    "inc": $("option:selected, this").attr("incId"),
                    // "inc": "incId" + counter,
                },
                "transaction": "cost_" + counter,
                "discount": 0,
                "tax": {
                    "vat": 0.00,
                    "other": 0.00
                },
                "barcode": "",
                "status": {
                    "paid": false,
                    "date": getTs()
                }
            }
        )
    }

    this.removeId = function (counter) {
        this.data.splice(counter - 1, 1)
    }
    this.getIds = function (counter) {
        return this.data
    }


};
//# sourceURL=api_ttb_widget.js