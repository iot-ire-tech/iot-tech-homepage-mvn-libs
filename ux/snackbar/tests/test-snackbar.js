/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */

$(document).ready(function name(parameters) {


	$('#x').on("click", function () {
		var options = {
			content: "Some text", // text of the snackbar
			style: "toast", // add a custom class to your snackbar
			timeout: 100, // time in milliseconds after the snackbar autohides, 0 is disabled
			htmlAllowed: true, // allows HTML as content value
			pos: "top-center",
			actionTextColor: "#000000",
			textColor: "#000000",
			text: "hi",
			width: "auto",
			backgroundColor: "#f1f1f1",
			actionText: 'Thanks!',
			onClose: function () { } // callback called when the snackbar gets closed.
		};

		Snackbar.show(options);

	});
});
