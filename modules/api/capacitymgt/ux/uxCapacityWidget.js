
function UxCapacityWidget() {
	this.counter = 0;
	this.units_total_max = 0;

	this.init = function (counter) {
		this.counter = counter;
		this.html = "<div class=\"w3-container\" >";

		this.html += "<span >Identify the capacity for which this items is available for use</span>";

		this.html += "<fieldset>"
		this.html += "<legend><b>Capacity Planning</b></legend>"
		this.html += "<br>"
		this.html += "<label>Maximum available units</label>"
		if (this.units_total_max > 0)
			this.html += "<input class=\"w3-input w3-hover-grey units_total\" type=\"number\"  min=1 max=" + this.units_total_max + " value=0 required title=\"This is the physical amount available, please adjust accordingly.This will affect your sales capacity, if reflected wrong!\"/>"
		else
			this.html += "<input class=\"w3-input w3-hover-grey units_total\" type=\"number\"  min=1 value=0 required title=\"This is the physical amount available, please adjust accordingly.This will affect your sales capacity, if reflected wrong!\"/>"
		this.html += "<br>"
		this.html += "<label>Apply 20/80% Default</label>"
		this.html += "<input class=\"w3-input w3-hover-grey checkboxtext inventory_applyDefault\" type=\"checkbox\" title=\"check box, to apply default settings\"/>"


		this.html += "<br>"
		this.html += "<label>Buffer Overflow </label>"
		this.html += "<select  class=\"w3-select w3-hover-grey bufferoverflow\" title=\"When stock levels drop to zero, sales will be prohibited. If you wish to add overflow butter to continue sales, and give time to restock, address here as a percentage of your total stock\"  required>"
		this.html += "<option  disabled selected>Please Select</option>"
		this.html += "<option value=0 >0%</option>"
		this.html += "<option value=.05 >5%</option>"
		this.html += "<option value=.10 >10%</option>"
		this.html += "<option value=.15 >15%</option>"
		this.html += "<option value=.20 >20%</option>"
		this.html += "<option value=.25 >25%</option>"

		this.html += "<option value=.50 >50%</option>"
		this.html += "<option value=.75 >75%</option>"
		this.html += "<option value=1 >100%</option>"
		this.html += "</select>"
		this.html += "<br>"

		this.html += "<br>"
		this.html += "<p>Setting an alert level will better help with analytics</p>"
		this.html += "<label>Minimum threshold before alerting: <span class=\"lowerHook\">0</span> [%]</label>"
		this.html += "<br>"

		this.html += "<input type=\"range\" min=\"1\" max=\"100\" value=0 class=\"slider units_lower\" title=\"Email Alert will be sent out once threshold is met\" / > "
		this.html += "<br>"

		this.html += "<p>Setting an alert level will better help with analytics</p>"
		this.html += "<label>Safe threshold level: <span class=\"upperHook\" >0</span>[%]</label> "
		this.html += "<br>"

		this.html += "<input type=\"range\" min=50 max=\"100\" value=\"51\" class=\"slider units_upper\" \" title=\"Email Update will be sent out once threshold is met\" / > "
		this.html += "<br>"
		this.html += "<hr>"
		this.html += "<br>"





		this.html += "</fieldset>"
		this.html += "<br>";

		this.html += "<br>";
		this.html += "<div class='w3-row w3-center'>";
		this.html += "<div class=w3-half>";
		this.html += "<button class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnSaveCapacityPlan\" >Save</button>";
		this.html += "</div>";
		this.html += "<div class=w3-half>";
		this.html += "<button class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnExitCapacityPlan\" >Close</button>";
		this.html += "</div>";
		this.html += "<br>";
		this.html += "<br>";

		this.html += "</div>"
		return this.html;
	}




}
;
//# sourceURL=api_capacity_widget.js