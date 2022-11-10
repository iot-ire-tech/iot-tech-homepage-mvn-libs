<!DOCTYPE html>
<html>
	<script src='https://www.google.com/recaptcha/api.js'></script>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">-->
		<title></title>
		<link id=favicon rel="icon" href="" type="image/gif" sizes="16x16">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<script src="../../js/env.js"></script>
		<script src="../../js/globals.js"></script>
		<script src="../../js/utilFunctions.js"></script>
		<script src="../../js/queryDb.js"></script>
		<script src="../../js/bootstrap.js"></script>
		<script src="../../js/time.js"></script>

		<script src="../../jqueryAuthenticate.js"></script>
		<script src="../../analytics/analytics.js"></script>

		<link rel="stylesheet" href="../../css/fullscreenvideo.css">
		<link rel="stylesheet" href="../../css/page.css">
		<link rel="stylesheet" href="../../css/sticky-elements.css">
		<link rel="stylesheet" href="../branding/branding.css">
		<script src="../branding/init.js"></script>
		<script src="init.js"></script>

		<script src="../../lib/jsonserverDb.js"></script>
		<script src="../../branding/modelsBranding.js"></script>


	</head>
	<body>
		<div id=brandingHeader >
			<span id=header></span>
		</div>


		<video autoplay muted loop id="myVideo"> <source src="../../resources/media/clients/392436_583897_xxx_vid1.mp4" type="video/mp4"> </video>


		<div class="contentFS">
			<h1>Heading</h1>
			<p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.</p>
			<button id="myBtn" onclick="myFunction()">Pause</button>
		</div>


	</body>


	<script>
		var video = document.getElementById("myVideo");
		var btn = document.getElementById("myBtn");

		function myFunction() {
			if (video.paused) {
				video.play();
				btn.innerHTML = "Pause";
			} else {
				video.pause();
				btn.innerHTML = "Play";
			}
			// Continue To Next Page!!!!
		}
	</script>
</html>
