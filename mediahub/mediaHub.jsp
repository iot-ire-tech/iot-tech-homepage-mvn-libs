<!DOCTYPE html>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


		<link rel="icon" href="" type="image/gif" sizes="16x16">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/api2/v1549866690836/recaptcha__en.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<script src="https://cdn.rawgit.com/mdehoog/Semantic-UI-Calendar/76959c6f7d33a527b49be76789e984a0a407350b/dist/calendar.min.js"></script>
		<link rel="stylesheet" href="https://semantic-ui.com/dist/semantic.css">
		<script src="https://semantic-ui.com/dist/semantic.js"></script>


		<script src="https://www.google.com/recaptcha/api.js"></script>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">




		<script src="/iot-base/services/utils/numbers/Numbers.js"></script>
		<script src="/iot-base/services/utils/time/Time.js"></script>
		<script src="/iot-base/services/utils/prototypes/Prototypes.js"></script>
		<script src="/iot-base/services/utils/browser/Browser.js"></script>
		<script src="/iot-base/services/utils/strings/Strings.js"></script>






		<!--<script src="/iot-base/services/bootstrap/bootStrapWrapper.js"></script>-->
		<script src="/iot-base/services/bootstrap/bootStrap.js"></script>
		<script src="/iot-base/services/nw/crudIt.js"></script>
		<script src="/iot-base/services/utils/logging/Log.js"></script>
		<script src="/iot-base/services/db/dbAllocation.js"></script>
		<script src="/iot-base/services/db/dbHandler.js"></script>
		<script src="/iot-base/services/nw/httpHandler.js"></script>
		<script src="/iot-base/services/utils/env/env-controller.js"></script>


		<!--// Crud is Main Dependency-->
		<script src="/iot-base/services/sms/Sms.js"></script>
		<script src="/iot-base/services/analytics/Analytics.js"></script>
		<script src="/iot-base/services/authentication/Account.js"></script>
		<script src="/iot-base/services/authentication/Authenticate.js"></script>
		<script src="/iot-base/services/booking/BookingEngine.js"></script>
		<!--// Need Patron as its init in evn-->
		<!--// Used by User Management-->
		<!--// Class Up front-->
		<script src="/iot-base/services/branding/Branding.js"></script>
		<script src="/iot-base/services/onboarding/address/Address.js"></script>
		<script src="/iot-base/services/mediahub/SocialHub.js"></script>
		<script src="/iot-base/services/mediahub/MediaHub.js"></script>
		<script src="/iot-base/services/userManagement/Patron.js"></script>
		<script src="/iot-base/services/business/entity/Entities.js"></script>



		<!--// Env - will give you access to BS services.-->
		<script src="/iot-base/env.js"></script>


		<script src="/iot-base/services/business/entity/model.js"></script>
		<script src="/iot-base/services/mediahub/model.js"></script>
		<script src="/iot-base/services/userManagement/model.js"></script>
		<script src="/iot-base/services/sms/model.js"></script>



		<script src="/iot-base/services/mediahub/controller.js"></script>
		<script src="/iot-base/services/mediahub/init.js"></script>
		<script src="/iot-base/services/mediahub/media.js"></script>
		<script src="/iot-base/services/mediahub/onchange.js"></script>
		<script src="/iot-base/services/mediahub/integrity.js"></script>



		<script src="/iot-base/lib/ux/widgets.js"></script>
		<script src="/iot-base/services/ux/pageLoad.js"></script>
		<script src="/iot-base/services/ux/widget/builder.js"></script>



		<script >
			var contextPath = "/iot-base"
			var root = location.origin + contextPath;
			var servicePath = "/services/mediahub";


			urlBody = root + servicePath + "/ux/body.html";
			urlHead = root + "/services/mediahub/release/head.html";


			$.get(urlBody, function (response) {
				$("body").html(response);
			});

		</script>
	</head>

</html>