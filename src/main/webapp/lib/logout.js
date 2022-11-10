/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Set timeout variables.
var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 60000; // Warning has been shown, give the user 1 minute to interact
var logoutUrl = 'logout.php'; // URL to logout page.

var warningTimer;
var timeoutTimer;

// Start warning timer.
function StartWarningTimer() {
	warningTimer = setTimeout("IdleWarning()", timoutWarning);
}

// Reset timers.
function ResetTimeOutTimer() {
	clearTimeout(timeoutTimer);
	StartWarningTimer();
	$("#timeout").dialog('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
	clearTimeout(warningTimer);
	timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
	$("#timeout").dialog({
		modal: true
	});
	// Add code in the #timeout element to call ResetTimeOutTimer() if
	// the "Stay Logged In" button is clicked
}

// Logout the user.
function IdleTimeout() {
	window.close();
	window.location = logoutUrl;
}
