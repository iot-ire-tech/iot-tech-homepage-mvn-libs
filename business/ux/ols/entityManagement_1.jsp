<!DOCTYPE html>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


		<link id="favicon" rel="icon" href="" type="image/gif" sizes="16x16">

		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/api2/v1549866690836/recaptcha__en.js">

		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

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



		<script src="/iot-base/services/mediahub/media.js"></script>



		<script src="/iot-base/lib/ux/widgets.js"></script>
		<script src="/iot-base/services/ux/pageLoad.js"></script>
		<script src="/iot-base/services/ux/widget/builder.js"></script>



		<!--		<script >

					var contextPath = "/iot-base"
					var remote_host = location.origin + contextPath;
					var servicePath = "/services/business/entity";


					urlBody = remote_host + servicePath + "/ux/body.html";


					var loader = "<script src=" + urlRt + "><\/script>";
					$.get(urlBody, function (response) {
						$("body").html(response);
					});



				</script>-->
		<script src="/iot-base/services/business/entity/controller.js"></script>
		<script src="/iot-base/services/business/entity/integrity.js"></script>
		<script src="/iot-base/services/business/entity/init.js"></script>
		<script src="/iot-base/services/business/entity/onchange.js"></script>
		<style>

			iframe {
				pointer-events: none;
			}

		</style>
	</head>

	<body>

		<!DOCTYPE html>
	<div class="w3-container w3-center w3-mobile w3-white">
		<div class="w3-row-padding  " >
			<div class="w3-half" >
				<div class="w3-container">
					<p><i class="fa fa-spinner" style="font-size:48px;color:black"></i>MyBusinessPal.Com</p>
				</div>
			</div>
			<div class="w3-half" >
				<div class="w3-container">
					<p>Phone support<i class="fa fa-mobile" style="font-size:48px;color:black"></i> +353 1 254 2326</p>
				</div>

			</div>
		</div>


	</div>



	<div class="w3-panel  w3-leftbar w3-light-grey">
		<h1>Business Infrastructure</h1>
		<h3>Lets build up a portfolio, by identifying your business assets, events, and activities!</h3>
	</div>
	<br>

	<div class="w3-container w3-center" >
		<div class="ui ordered steps">
			<div class="completed step">
				<div class="content">
					<div class="title">1. Assets</div>
					<div class="description">Identify Business Assets</div>
				</div>
			</div>

			<div class="completed step">
				<div class="content">
					<div class="title">2. Events</div>
					<div class="description">Associate Events With Assets</div>
				</div>
			</div>

			<div class="completed step">
				<div class="content">
					<div class="title">3. Activities</div>
					<div class="description">Associate Activities With Events</div>
				</div>
			</div>

			<div class="completed step">
				<div class="content">
					<div class="title">4. Repeat Steps 1-3 </div>
					<div class="description">Build Up Your Portfolio</div>
				</div>
			</div>

		</div>
		<br>
		<hr>Overall Provisioning Statistics Panel<hr>
		<br>

		<span id="statsHook"></span>
	</div>
	<br>



	<div class="w3-bar w3-black" >
		<button class="w3-bar-item w3-button tablink w3-gray" onclick="openCity(event, 'Assets')">Assets</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Events')">Events</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Activities')">Activities</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Patrons')">AssociatedMembers</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Geo')">Geo</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Dow')">Availability Times</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Costs')">Booking Costs</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'ViewAll')">Online Browser</button>
		<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Preview')">Portal Preview</button>
		<!--<button class="w3-bar-item w3-button tablink" onclick="openCity(event, 'Associations')">Value Added Services</button>-->
	</div>



	<div id="Assets" class="w3-container w3-border city" style="height: 200%; display:block">
		<h2>Asset Management</h2>
		<p>Insight - Look around your business organization, and see how much you have invested into resources, beit People, Places, or Structures, now bring them to all to life here</p>
		<p>lets start building!!!</p>


		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">

			<label><b>Management Option</b></label>
			<fieldset  class="w3-padding-32 ">
				<legend>Select as needed</legend>
				<div class="w3-container w3-center">
					New  <input class="w3-radio mgtEntities " type="radio" name="assetsCat" value="new" >
					Modify Existing <input class="w3-radio mgtEntities"  type="radio" name="assetsCat" value="mod">
				</div>
				<br> <hr> <br>
				<span id="targetManagementAssets"></span>
			</fieldset>

		</div>
	</div>

	<div id="Events" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Event Management</h2>
		<p>Insight - The more events you can organize around your business assets, the more profitable you'll be!!!</p>
		<p>Buildup an amazing events portfolio right here, right now</p>
		<p>Select which of your Events you would like to share with the community</p>




		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label><b>Management Option</b></label>
			<fieldset  class="w3-padding-32 ">
				<legend>Select as needed</legend>
				<div class="w3-container w3-center">
					New <input class="w3-radio mgtEntities" type="radio" name="eventCat" value="new" >
					Modify Existing <input class="w3-radio mgtEntities"  type="radio" name="eventCat" value="mod">
				</div>
				<br> <hr> <br>


				<span id="targetManagementEvents"></span>

			</fieldset>
		</div>
	</div>

	<div id="Activities" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Activity Management</h2>
		<p> Insight - You have identified amazing events, now lets add business value to them!!! </p>
		<p> Select which of your Activities you would like to share with the community</p>

		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label><b>Management Option</b></label>
			<fieldset class="w3-padding-32 ">
				<legend>Select as needed</legend>
				<div class="w3-container w3-center">
					New <input class="w3-radio mgtActivities" type="radio" name="ActivitiesCat" value="new" >
					Modify Existing <input class="w3-radio mgtActivities"  type="radio" name="ActivitiesCat" value="mod">
				</div>
				<br> <hr> <br>
				<span id="targetManagementActivities"></span>
			</fieldset>
		</div>
	</div>




	<div id="Geo" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Geo Asset Management</h2>
		<p>Insight - Know where your business assets are! Communicate to other , Communicate location to others</p>

		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label>Entity Type</label>
			<div class="w3-container w3-center">
				Asset <input class="w3-radio entityCat" type="radio" name="entityCat" value="resource" >
				Event <input class="w3-radio entityCat"  type="radio" name="entityCat" value="event">
				Activity <input class="w3-radio entityCat"  type="radio" name="entityCat" value="subEvent">
				<br>
				<br>
				<span class="existingListFk"  ></span>
				<br>
			</div>

			<label><b>Management Option</b></label>
			<div class="w3-container w3-center">
				New <input class="w3-radio mgtGeo" type="radio" name="geoCat" value="new" >
				Modify Existing <input class="w3-radio mgtGeo"  type="radio" name="geoCat" value="mod">
			</div>
			<br>

			<label>Sub Management Option</label>
			<div class="w3-container w3-center" >
				Street <input class="w3-radio mgtGeoType" type="radio" name="geoTypeCat" value="external" >
				Campus <input class="w3-radio mgtGeoType"  type="radio" name="geoTypeCat" value="campus">
				GPS <input class="w3-radio mgtGeoType"  type="radio" name="geoTypeCat" value="gps">
			</div>


			<span id="targetManagementGeo"></span>




		</div>
	</div>

	<div id="Patrons" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Patron/Entity Management</h2>
		<p>Insight - Know where your business assets are! Communicate to other </p>

		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label>Entity Type</label>
			<div class="w3-container w3-center">
				Asset <input class="w3-radio entityCat" type="radio" name="entityCat" value="resource" >
				Event <input class="w3-radio entityCat"  type="radio" name="entityCat" value="event">
				Activity <input class="w3-radio entityCat"  type="radio" name="entityCat" value="subEvent">
				<br>
				<br>
				<span class="existingListFk"  ></span>
			</div>

			<label><b>Management Option</b></label>
			<div class="w3-container w3-center">
				New <input class="w3-radio mgtMembers" type="radio" name="PatCat" value="new" >
				Modify Existing <input class="w3-radio mgtMembers"  type="radio" name="PatCat" value="mod">
			</div>
			<br>


			<span id="targetManagementAssociatedMembers"></span>


		</div>
	</div>

	<div id="Dow" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Availability Management</h2>
		<p>Insight - Make bookings with precision </p>

		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label>Entity Type</label>
			<div class="w3-container w3-center">
				Asset <input class="w3-radio entityCat" type="radio" name="entityCat" value="resource" >
				Event <input class="w3-radio entityCat"  type="radio" name="entityCat" value="event">
				Activity <input class="w3-radio entityCat"  type="radio" name="entityCat" value="subEvent">
				<br>
				<br>
				<span class="existingListFk"  ></span>
			</div>

			<label><b>Management Option</b></label>
			<div class="w3-container w3-center">
				New <input class="w3-radio mgtDow" type="radio" name="dowCat" value="new" >
				Modify Existing <input class="w3-radio mgtDow"  type="radio" name="dowCat" value="mod">
			</div>
			<br>


			<span id="targetManagementDow"></span>


		</div>
	</div>

	<div id="Costs" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h2>Cost Management</h2>
		<p>Insight - Apply booking costs and durations here, for your entity types</p>

		<div class="w3-container" style="margin-left: 10%; width: 80%; margin-right: 10%">
			<label>Entity Type</label>
			<div class="w3-container w3-center">
				Asset <input class="w3-radio entityCat" type="radio" name="entityCat" value="resource" >
				Event <input class="w3-radio entityCat"  type="radio" name="entityCat" value="event">
				Activity <input class="w3-radio entityCat"  type="radio" name="entityCat" value="subEvent">
				<br>
				<br>
				<span class="existingListFk"  ></span>
			</div>

			<label><b>Management Option</b></label>
			<div class="w3-container w3-center">
				New <input class="w3-radio mgtCosts" type="radio" name="costCat" value="new" >
				Modify Existing <input class="w3-radio mgtCosts"  type="radio" name="costCat" value="mod">
			</div>
			<br>


			<span id="targetManagementCosts"></span>


		</div>
	</div>

	<div id="ViewAll" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h>Online Browser </h2>
			<p>Insight - Preview your entities before releasing to public </p>
			<div class="w3-container w3-center" style="margin-left: 10%; width: 80%; margin-right: 10%">
				<div class="w3-container w3-center">
					Assets <input class="w3-radio mgtBrowser" type="radio" name="browserCat" value="resources" >
					Events <input class="w3-radio mgtBrowser" type="radio" name="browserCat" value="events" >
					Activities <input class="w3-radio mgtBrowser" type="radio" name="browserCat" value="subEvents" >
					Geos <input class="w3-radio mgtBrowser"  type="radio" name="browserCat" value="geos">
					Associated Members <input class="w3-radio mgtBrowser"  type="radio" name="browserCat" value="members">
					Business Hours <input class="w3-radio mgtBrowser"  type="radio" name="browserCat" value="dow">
					Business Costs <input class="w3-radio mgtBrowser"  type="radio" name="browserCat" value="costs">
				</div>
				<br> <br>
				<span id="targetManagementBrowser"></span>
			</div>
	</div>

	<div id="Preview" class="w3-container w3-border city" style="height: 200%;  display:none">
		<h>Online Browser </h2>
			<p>Insight - Preview your entities before releasing to public </p>
			<div class="w3-container w3-center" >
				<iframe
					src="http://localhost:8084/iot-base/ux/client/portal/userPortal.jsp?clientId=673859&patronId=841113#backOntop"
					style="margin-left: 10%; width: 80%; margin-right: 10% ; height: 3000px"
					frameborder="0"
					>
				</iframe>
			</div>
	</div>




	<script>


		function openCity(evt, cityName) {
			var i, x, tablinks;
			x = document.getElementsByClassName("city");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablink");
			for (i = 0; i < x.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" w3-gray", "");
			}
			document.getElementById(cityName).style.display = "block";
			evt.currentTarget.className += " w3-gray";
		}


	</script>


</body>
</html>