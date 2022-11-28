/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var parsedUrl = new URL(window.location.href);
var clientId = parseInt(parsedUrl.searchParams.get("clientId"));
var patronId = parseInt(parsedUrl.searchParams.get("patronId"));


$(document).ready(function () {


	$("#moduleSquashLaunch").attr("href", location.origin + contextPath + "/services/modules/boxleague/release/boxleague.jsp?clientId=" + clientId + "&patronId=" + patronId);
	$("#moduleBookingsLaunch").attr("href", location.origin + contextPath + "/services/modules/booking/release/bookings.jsp?clientId=" + clientId + "&patronId=" + patronId);
	$("#modulePortalLaunch").attr("href", location.origin + contextPath + "/services/modules/portal/release/portal.jsp?clientId=" + clientId + "&patronId=" + patronId);
	$("#modulePoSLaunch").attr("href", location.origin + contextPath + "/services/modules/pos/release/pointOfSales.jsp?clientId=" + clientId + "&patronId=" + patronId);
	$("#moduleStockControlLaunch").attr("href", location.origin + contextPath + "/services/modules/monitoring/stock/release/admin.jsp?clientId=" + clientId + "&patronId=" + patronId);
	$("#moduleSalesControlLaunch").attr("href", location.origin + contextPath + "/services/modules/monitoring/sales/release/admin.jsp?clientId=" + clientId + "&patronId=" + patronId);

});

