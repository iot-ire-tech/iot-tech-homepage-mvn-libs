<!DOCTYPE html>
<html>
	<head>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


	</head>
	<body>

	</body>

	<script >

		var contextPath = "/iot-base"
		// Version of UX content to release!!!
		var root = location.origin + contextPath;




		var urlBody = root + "/services/userManagement/ux/bodyPasswordReset.html";
		$.get(urlBody, function (response) {
			$("body").html(response);
		});


		var urlHead = root + "/services/head.html";
		var urlRt = contextPath + "/services/authentication/init.js";
		var rtScript = "<script src=" + urlRt + "><\/script>";
		$.get(urlHead, function (response) {
			rt = response.toString().replace(/\/ContextPath/g, contextPath);
			$("head").html(rt);
			$("head").append(rtScript);
		});




	</script>


</html>