/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadSnackbarNewBooking(msg) {

	var options = {
//		content: "New Booking Added To Cart!", // text of the snackbar
		text: msg, // text of the snackbar
//		text: "hi",
		style: "toast", // add a custom class to your snackbar
		timeout: 100, // time in milliseconds after the snackbar autohides, 0 is disabled
		htmlAllowed: true, // allows HTML as content value
		pos: "top-center",
		actionTextColor: "#000000",
		textColor: "#000000",
		width: "auto",
		backgroundColor: "#f1f1f1",
		actionText: 'Thanks!',
		onClose: function () { } // callback called when the snackbar gets closed.
	};

	Snackbar.show(options);
}
