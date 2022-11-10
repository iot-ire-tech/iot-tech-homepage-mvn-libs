<!DOCTYPE html>
<html>
	<script src='https://www.google.com/recaptcha/api.js'></script>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!--<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">-->
		<title>MyBusinessPal.Com</title>
		<link rel="icon" href="favicon.ico" type="image/gif" sizes="16x16">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<script src="../../../js/env.js"></script>
		<script src="../../../js/globals.js"></script>
		<script src="../../../js/time.js"></script>

		<script src="../../../js/utilFunctions.js"></script>
		<script src="../../../js/bootstrap.js"></script>
		<script src="../../../js/objects/business/patron.js"></script>
		<script src="../../../js/objects/business/patronAccounts.js"></script>
		<script src="../../../analytics/analytics.js"></script>
		<script src="processAccount.js"></script>



	</head>
	<body>
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
			<h1>User Account</h1>
			<h3>This account will allow you to browse all offerings.</h3>
		</div>

		<div class="w3-container" style="margin-left: 35%; min-width: 30%; margin-right: 35%;" >
			<div class="w3-section">
				<label><b>Gender</b></label>
				<select class="w3-select" required id="gender">
					<option value="" disabled selected>Please Choose</option>
					<option value="female" >Female</option>
					<option value="male">Male</option>
				</select>
				<label><b>Occupation</b></label>
				<input class="w3-input w3-border" type="text" placeholder="" id="occupation" required>

				<label><b>Date Of Birth</b></label>
				<input class="w3-input w3-border" type="date" placeholder="dd/mm/yyyy" id="dob" required>

				<label><b>Mobile</b></label>
				<input class="w3-input w3-border" type="tel" placeholder="" title="Used to send booking confirmations too" id="mobile" required>

				<label><b>First Name</b></label>
				<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="First Name *" id="fname" required>
				<label><b>Last Name</b></label>
				<input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Family Name *" id="lname" required>
				<label><b>Email</b></label>
				<input class="w3-input w3-border w3-margin-bottom" type="email" placeholder="Email *" id="email" title="This is your username" required>
				<!--<span>Your account will be sent here, to verify. </span><br>-->


				<label><b>Password</b></label>
				<input class="w3-input w3-border" type="password" placeholder="Password *" id="pass" required>



				<input id ="agree" class="w3-check w3-margin-top" type="checkbox" required>
				<span>I agree to with the </span> <a href="toc.jsp" target="_blank">terms of service</a><br>

				<hr>
				<div class="g-recaptcha" data-sitekey="6LeL0XIUAAAAAA0nZxdlrXQxgr2yfwVlNuCfM8TV"></div>

				<button id="btnAccount" class="w3-button w3-block w3-light-grey w3-section w3-padding" type="submit">Create User Account</button>
			</div>
		</div>

























	</body>
</html>
