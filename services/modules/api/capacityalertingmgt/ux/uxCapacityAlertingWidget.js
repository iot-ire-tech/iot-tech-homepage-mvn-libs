
function UxCapacityAlertingWidget() {
	this.counter = 0;
	this.html = ""

	this.init = function () {
		this.html = "<div class=\"w3-container\" >";

		this.html += "<span >Identify the capacity thresholds for which this items is to be monitored for</span>";

		this.html += "<fieldset>"
		this.html += "<legend><b>Capacity Alert Planning</b></legend>"
		this.html += "<br>"

		this.html += "<label>Activate Alerts</label>"
		this.html += "<br>"
		this.html += "<input class=\"w3-input w3-hover-grey alert_inventory\" type=\"checkbox\"  required / > <br>"
		this.html += "<br>"

		this.html += "<label>Contact email in the case of an alert</label>"
		this.html += "<br>"
		this.html += "<input class=\"w3-input w3-hover-grey email_inventory\" type=\"email\"  required  / > <br>"
		this.html += "<br>"

		this.html += "<label>Contact SMS in the advent of an alert</label>"
		this.html += "<br>"
		this.html += "<input class=\"w3-input w3-hover-grey sms_inventory\" type=\"tel\"  required /> <br>"
		this.html += "<br>"


		this.html += "<label title=\"alerts will be trigger each time a customer transaciton is processed successfully.\">Real Time Alerting Levels</label>"
		this.html += "<input class=\"w3-input w3-hover-grey l1alerting\" type=\"checkbox\" value=\"l1\" name=stockLevels title=\"When zero stock items are available to sell to customers\"/> <label>Level#1 Alerting</label>"
		this.html += "<input class=\"w3-input w3-hover-grey l2alerting\" type=\"checkbox\" value=\"l2\" name=stockLevels title=\"When stock items are between zero and min alert levels\"/> <label>Level#2 Alerting</label>"
		this.html += "<input class=\"w3-input w3-hover-grey l3alerting\" type=\"checkbox\" value=\"l3\" name=stockLevels title=\"When stock items are between min and max alerting levels\"/> <label>Level#3 Alerting</label>"
		this.html += "<br>"
		this.html += "<br>"
		this.html += "<label>Cap Alerting Reminder Count</label>"
		this.html += "<input class=\"w3-input w3-hover-grey alertReminderCap\"  type=number  min=0  step=1 placeholder=3 required title=\"You will be remind a max of this amount of times, that your stock levels are critical\"/> <br>"
		this.html += "<label>Schedule Alerting</label>"
		this.html += "<select  class=\"w3-select w3-hover-grey alertSchedule\" title=\"When stock levels drop to zero, sales will be prohibited. If you wish to add overflow butter to continue sales, and give time to restock, address here as a percentage of your total stock\"  required>"
		this.html += "<option disabled selected>Please Select</option>"
		this.html += "<option value=daily >Daily</option>"
		this.html += "<option value=weekly >Weekly</option>"
		this.html += "<option value=biweekly >BiWeekly</option>"
		this.html += "<option value=monthly >Monthly</option>"
		this.html += "</select>"

		this.html += "</fieldset>"
		this.html += "<br>";

		this.html += "<br>";
		this.html += "<div class='w3-row w3-center'>";
		this.html += "<div class=w3-half>";
		this.html += "<button class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnSaveCapacityAlertingPlan\" >Save</button>";
		this.html += "</div>";
		this.html += "<div class=w3-half>";
		this.html += "<button class=\"w3-btn w3-round-xxlarge w3-padding-large w3-green btnExitCapacityAlertingPlan\" >Close</button>";
		this.html += "</div>";
		this.html += "<br>";
		this.html += "<br>";

		this.html += "</div>"
		return this.html;
	}




}
;
//# sourceURL=capacity_alerting_widget.js