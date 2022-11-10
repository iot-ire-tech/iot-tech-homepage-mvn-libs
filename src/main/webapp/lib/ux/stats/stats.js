/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function uxStats(resourcesCount, eventsCount, activitiesCount, staffCount) {

	html = "<div class=\"ui four statistics\">";
	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"address book icon\"></i> Over " + resourcesCount + " </div>";
	html += "<div class=\"label\"> Business Assets </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"calendar check outline icon\"></i> " + eventsCount + " </div>";
	html += "<div class=\"label\"> Events </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"smile icon\"></i> " + activitiesCount + " </div>";
	html += "<div class=\"label\"> Activities </div>";
	html += "</div>";

	html += "<div class=\"statistic\">";
	html += "<div class=\"text value\"> <i class=\"smile icon\"></i> Over " + staffCount + " </div>";
	html += "<div class=\"label\"> Customers Onboarded!!</div>";
	html += "</div>";

	html += "</div>";
	html += "<br>";
	return html;

}