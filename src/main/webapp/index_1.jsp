<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>MyBusinessPal.Com</title>
		<link rel="icon" href="resources/media/icons/favicon.ico" type="image/gif" sizes="16x16">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://cdn.rawgit.com/mdehoog/Semantic-UI/6e6d051d47b598ebab05857545f242caf2b4b48c/dist/semantic.min.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.rawgit.com/mdehoog/Semantic-UI/6e6d051d47b598ebab05857545f242caf2b4b48c/dist/semantic.min.js"></script>

		<link rel="stylesheet" href="css/homepage/background-image.css">

		<script src="services/bootstrap/bootStrap.js"></script>
		<script src="services/nw/crudIt.js"></script>
		<script src="services/db/dbAllocation.js"></script>
		<script src="services/db/dbHandler.js"></script>
		<script src="services/nw/httpHandler.js"></script>
		<script src="services/utils/env/env-controller.js"></script>
		<!--// Need Patron as its init in evn-->
		<script src="services/userManagement/model.js"></script>
		<script src="services/userManagement/Patron.js"></script>
		<script src="env.js"></script>



		<!--Env updated by profile-->
		<script src="services/ux/pageLoad.js"></script>
		<script src="services/utils/time/Time.js"></script>
		<script src="services/utils/numbers/Numbers.js"></script>
		<script src="services/utils/logging/Log.js"></script>
		<script src="services/utils/browser/Browser.js"></script>
		<script src="services/utils/strings/Strings.js"></script>

		<script src="services/analytics/itemAnalytics.js"></script>

		<script src="services/branding/model.js"></script>
		<script src="services/branding/Branding.js"></script>

		<!--// Auth-->

		<!--<script src="js/globals.js"></script>-->

		<!--Library Funcs-->
		<!--<script src="js/utilFunctions.js"></script>-->
		<!--<script src="js/bootstrap.js"></script>-->
		<!--<script src="services/bootstrap/bootStrapWrapper.js"></script>-->

		<script src="services/authentication/ux/authenticate.html"></script>
		<script src="services/authentication/Account.js"></script>
		<script src="services/authentication/itemAuthenticate.js"></script>
		<script src="services/authentication/model.js"></script>
		<script src="services/authentication/controller.js"></script>

		<style>
			@media screen and (max-width: 600px) {
			    .vid_mobile {
				width: 150px;
			    }
			    #img_mobile {
				visibility: hidden;
				clear: both;
				float: left;
				margin: 10px auto 5px 20px;
				width: 28%;
				display: none;
			    }
			}
		</style>

	</head>
	<body>



		<!--		<div class="w3-panel w3-center w3-leftbar w3-light-grey">
					<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
					<ins class="adsbygoogle"
					     style="display:block"
					     data-ad-client="ca-pub-6158262624303549"
					     data-ad-slot="8328011038"
					     data-ad-format="auto"
					     data-full-width-responsive="true"></ins>
					<script>
								(adsbygoogle = window.adsbygoogle || []).push({});
					</script>
				</div>-->

		<div class="w3-display-top w3-container w3-center w3-mobile w3-white">
			<div class="w3-row-padding  " >
				<div class="w3-half" >
					<div class="w3-container">
						<p><i class="fa fa-spinner" style="font-size:48px;color:black"></i>MyBusinessPal.Com</p>
					</div>
				</div>
				<div class="w3-half" >
					<div class="w3-container">
						<p><span id="loggedinMsg"></span> Phone support<i class="fa fa-mobile" style="font-size:48px;color:black"></i> +353 1 254 2326</p>

					</div>
				</div>
			</div>
			<!--			<div class="w3-bar">
							<a href="products.jsp" target="_blank" class="w3-bar-item w3-mobile"> Products </a>
							<a href="pricing.jsp" target="_blank"  class="w3-bar-item w3-mobile">Pricing</a>
							<span id="loggedinLinks">
								<a href="#" class="w3-bar-item w3-ul w3-mobile" onclick="document.getElementById('id01').style.display = 'block'"> Sign In </a>
							</span>
						</div>-->

		</div>






		<div id="img_mobile" class="w3-display-container w3-text-white">

			<img style="-webkit-user-select: none;cursor: zoom-out;" src="https://applitools.com/images/artwork/homepage_banner.jpg" width="100%" height="700"></img>

			<div class="w3-container w3-display-topmiddle w3-center w3-xlarge w3-text-white">

				<div class="">
					<br>
					<a href="product.jsp" target="_blank" class="w3-mobile w3-padding"> Products </a>
					<a href="pricing.jsp" target="_blank"  class="w3-mobile w3-padding">Pricing</a>
					<span id="loggedinLinks">
						<a href="#" class="w3-mobile w3-padding" onclick="document.getElementById('id01').style.display = 'block'"> Sign In </a>
					</span>
				</div>


			</div>

			<div class="w3-container w3-display-left w3-center  w3-border-right" style="min-width: 20%; min-height: 80%">
				<br> <br> <br>
				<br> <br> <br>
				<br> <br> <br>
				<br> <br> <br>
				<button class="w3-button w3-border-red btn-play fa fa-play w3-padding" onclick="document.getElementById('id02').style.display = 'block'" > </button>
				<div class="w3-padding w3-large w3-text-white"> Our Story </div>
			</div>
			<div class="w3-container w3-display-middle w3-center w3-xlarge w3-text-white w3-padding-64">
				<div class="w3-padding"> All Empowering Business Platform </div>
				<div class="w3-padding"> Online Booking and Asset Management</div>
				<br> <br> <br>
				<button class="w3-button w3-padding  w3-round-large w3-large w3-border-white" style="background-color: rgba(1,184,172,.66)" onclick="" > Get Started </button>
				<button class="w3-button w3-padding  w3-round-large w3-large w3-border w3-border-gray " style="z-index: 1 " onclick="" > Request Demo </button>

			</div>
			<div class="w3-container w3-display-right w3-padding w3-round-large w3-center w3-xlarge w3-text-white " style="background-color: rgba(1,184,172,.66); margin-right: 5%">
				<div class="w3-padding"> My Biz Pal Expands Left! </div>
				<div class="w3-padding"> Ultrafast customer Onboarding </div>
				<br> <br> <br>
				<hr>
				<div class="w3-padding"> Bulk User Onboarding</div>
				<div class="w3-padding"> Dedicated Storage Plan</div>
				<div class="w3-padding"> Service Portfolio Management </div>
				<div class="w3-padding"> Business-to-Business Enablement </div>
				<div class="w3-padding"> Online Booking </div>
				<div class="w3-padding"> Billing </div>
				<div class="w3-padding"> Messaging </div>
				<div class="w3-padding"> Analytics </div>
				<div class="w3-padding"> Corporate Branding </div>
			</div>
		</div>




		<div class="w3-container w3-center">
			<span id="processingMessage"></span>
		</div>

		<div class="w3-row-padding w3-center  w3-padding-large ">
			<div class="w3-third"> <i class="fa fa-apple" style="font-size:48px;color:lightblue"></i> </div>
			<div class="w3-third"> <i class="fa fa-linux" style="font-size:48px;color:lightblue"></i></div>
			<div class="w3-third"> <i class="fa fa-whatsapp" style="font-size:48px;color:lightblue"></i></div>
		</div>
		<hr>

		<div class="w3-container w3-center w3-padding-large w3-light-grey">
			<h3>Services Portfolio Management</h3>
			<h5>Specialists in Service and Booking Management</h5>
			<p>Ideal for businesses or organizations with multi-service offerings</p>
		</div>

		<div class="w3-row-padding  w3-padding-large" style="margin-left: 10%;width:80%; margin-right: 10%">
			<div class="w3-third w3-card" style="min-height: 300px">
				<header class="w3-container w3-center">
					<h5> <i class="birthday cake icon"></i>Sports & Fitness Centers</h5>
				</header>
				<div class="w3-container">
					<p>New Gym, New Fitness center, but no way to book services</p>
				</div>
			</div>
			<div class="w3-third w3-card" style="min-height: 300px">
				<header class="w3-container w3-center">
					<h5> <i class="birthday cake icon"></i>Hotel & Leisure Centers</h5>

				</header>
				<div class="w3-container">
					<p>Discerning customers think ahead, of a planned visit, complement that visit with online booking capability</p>
				</div>

			</div>
			<div class="w3-third w3-card" style="min-height: 300px">

				<header class="w3-container w3-center">
					<h5> <i class="birthday cake icon"></i>Holiday Resorts Centers</h5>
				</header>
				<div class="w3-container">
					<p>Families love to plan there activities, love to see whats available, enrich their experience</p>
				</div>
			</div>
		</div>

		<div class="w3-panel w3-center  w3-padding-large w3-leftbar w3-light-grey" >
			<h3>How does it work?</h3>
			<p>IOT social is a public cloud service offering</p>
		</div>

		<!--
		Three Rows , divided in half
		-->

		<div class="w3-container w3-center   w3-padding-large " style="margin-left: 10%;width:80%; margin-right: 10%" >
			<div class="w3-row-padding w3-center  w3-padding-large">
				<div class="w3-half w3-left-align">
					<h1>Step 1</h1>
					<h5>Resources Management </h5>
					<p >
						It all starts here, identify your business assets<br>
						It is these assets which we will align events up with in step 2<br>
						Appoint business owner<br>
						Associate social media with your asset
					</p>
				</div>
				<div class="w3-half">
					<video class="vid_mobile" width="300" muted="" loop="" controls="" poster="resources/media/imgs/vid-poster.jpg">
						<source src="resources/media/vids/vid1.mp4" type="video/mp4"> </video>
				</div>
			</div>
			<hr>
			<div class="w3-row-padding w3-center  w3-padding-large">
				<div class="w3-half">
					<video class="vid_mobile" width="300" muted="" loop="" controls="" poster="resources/media/imgs/vid-poster.jpg" > <source src="resources/media/vids/vid1.mp4" type="video/mp4"> </video>
				</div>
				<div class="w3-half">
					<div class="w3-half w3-left-align">
						<h1>Step 2</h1>
						<h5>Event Management </h5>
						<p >
							Identify events associated with your revenue generating assets from step 1<br>
							Consider events like business units, lines of business.
						</p>
					</div>
				</div>
				<hr>
				<div class="w3-row-padding w3-center  w3-padding-large">
					<div class="w3-half w3-left-align">
						<h1>Step 3</h1>
						<h5>Service & Membership Management</h5>
						<p >
							Identify services associated with your with your lines of business from step 2<br>
							Appoint service owners<br>
							Allocate booking schedules<br>
							Allocate costs and durations to the service
						</p>
					</div>
					<div class="w3-half">
						<video class="vid_mobile" width="300" muted="" loop="" controls="" poster="resources/media/imgs/vid-poster.jpg" > <source src="resources/media/vids/vid1.mp4" type="video/mp4"> </video>
					</div>
				</div>
			</div>


			<hr>
			<div class="w3-panel w3-center  w3-padding-large w3-leftbar w3-light-grey" >
				<h3>Start adding online service and booking management to your business today?</h3>
				<p>No obligations. No credit-card required</p>
				<button class="w3-button w3-white w3-border w3-border-red w3-round-large">START NOW</button>
			</div>


			<hr>
			<div class="w3-container w3-center   w3-padding-large " style="margin-left: 10%;width:80%; margin-right: 10%" >
				<div class="w3-row-padding w3-center">
					<div class="w3-third">
						<ul class="w3-ul w3-center">
							<li class="w3-small w3-padding-32 w3-bold">Product</li>
							<li class="w3-padding-16">Insurance People Limit</li>
							<li class="w3-padding-16">Full Site Branding</li>
						</ul>
					</div>
					<div class="w3-third">
						<ul class="w3-ul w3-center">
							<li class="w3-small w3-padding-32">Resources</li>
							<li class="w3-padding-16">Insurance People Limit</li>
							<li class="w3-padding-16">Full Site Branding</li>
						</ul>
					</div>
					<div class="w3-third">
						<ul class="w3-ul w3-center">
							<li class="w3-small w3-padding-32">Company</li>
							<li class="w3-padding-16">Insurance People Limit</li>
							<li class="w3-padding-16">Full Site Branding</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="w3-container w3-center w3-padding-large">
				<a class="social-button fa fa-facebook" style="font-size:38px;color:black" href="https://www.facebook.com/pages/Applitools/163528770501019" target="_blank" rel="noopener noreferrer"></a>
				<a class="social-button fa fa-twitter" style="font-size:38px;color:black" href="https://twitter.com/applitoolseyes" target="_blank" rel="noopener noreferrer"></a>
				<a class="social-button fa fa-linkedin" style="font-size:38px;color:black" href="http://www.linkedin.com/company/2837526?trk=tyah" target="_blank" rel="noopener noreferrer"></a>
				<a class="social-button fa fa-youtube-play" style="font-size:38px;color:black" href="http://www.youtube.com/channel/UCk13Ucc26mWqI4xvsbO13jw" target="_blank" rel="noopener noreferrer"></a>
				<a class="social-button fa fa-slideshare" style="font-size:38px;color:black" href="https://www.slideshare.net/Applitools/" target="_blank" rel="noopener noreferrer"></a>
				<a class="social-button fa fa-github" style="font-size:38px;color:black" href="https://github.com/applitools" target="_blank" rel="noopener noreferrer"></a>
			</div>

			<div class="w3-container w3-center w3-padding-large">

				<a class="link item" href="/terms-of-use">Terms &amp; Conditions</a>
				<span class="spacer">|</span>
				<a class="link item" href="/privacy-policy">Privacy Policy</a>
				<span class="spacer">|</span>
				<span class="item">� 2018 IOT Tech. All rights reserved.</span>
			</div>


			<div class="w3-container w3-left-align">
				<span id="authenticationWidgetTarget"></span>

				<div id="id02" class="w3-modal">
					<div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

						<div class="w3-center"><br>
							<span onclick="document.getElementById('id02').style.display = 'none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
						</div>

						<div class="w3-container" >
							<div class="w3-section">
								<iframe style="margin-left: 0%; width: 100%; height: 300px; margin-right: 0%" frameborder="1"
									allow="encrypted-media" allowfullscreen
									src="https://www.youtube.com/embed/tgbNymZ7vqY?HD=1;autoplay=0;rel=0;showinfo=0;controls=0;">
								</iframe>

							</div>
						</div>


					</div>
				</div>
			</div>


	</body>
</html>
