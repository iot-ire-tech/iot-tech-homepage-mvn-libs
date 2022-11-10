<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Mocha Tests</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
	</head>
	<body>
		<div id="mocha"></div>

		<script src="https://unpkg.com/chai/chai.js"></script>
		<script src="https://unpkg.com/mocha/mocha.js"></script>
		<script>
			// chai has a lot of stuff, let's make assert global
			let assert = chai.assert;
		</script>


		<script class="mocha-init">
			mocha.setup('bdd');
			mocha.growl(); // <-- Enables web notifications
			var responseStrucObj = {
				"load": "",
				"message": "",
				"loadLen": "",
				"message": "",
				"status": "",
				"code": ""
			}
		</script>
		<script src="/services/utils/numbers/Numbers.js"></script>
		<script src="/services/testFunctions.js"></script>
		<script src="/services/modules/stripe/testMaps.js"></script>


		<script src="/services/modules/stripe/testdataAccountsHead.js"></script>
		<script src="/services/modules/stripe/connectaccount/head/unitTests/unitTests.js"></script>


		<!--Indiv Account-->
		<script src="/services/modules/stripe/testdataAccountsIndividual.js"></script>
		<script src="/services/modules/stripe/connectaccount/individual/unitTests/unitTests.js"></script>



		<!--Add Banking-->
		<script src="/services/modules/stripe/testdataBankAccount.js"></script>
		<script src="/services/modules/stripe/bank/bankaccount/unitTests/unitTests.js"></script>

		<!--Add Cards -->
		<script src="/services/modules/stripe/testdataCardsAccount.js"></script>
		<script src="/services/modules/stripe/cards/cardAccount/unitTests/unitTests.js"></script>


		<!-- Customer Data Mix... -->
		<script src="/services/modules/stripe/testdataBillingCoupon.js"></script>
		<script src="/services/modules/stripe/testdataTokenCard.js"></script>
		<script src="/services/modules/stripe/testdataSources.js"></script>
		<script src="/services/modules/stripe/testdataSourcesSepa.js"></script>
		<script src="/services/modules/stripe/testdataCustomer.js"></script>

		<!--Adding Banks On Customer -->
		<script src="/services/modules/stripe/testdataBankCustomer.js"></script>
		<script src="/services/modules/stripe/bank/customer/unitTests/unitTests.js"></script>

		<!--Adding Cards On Customer -->
		<script src="/services/modules/stripe/testdataCardsCustomer.js"></script>
		<script src="/services/modules/stripe/cards/customer/unitTests/unitTests.js"></script>



		<!--Billing-->
		<script src="/services/modules/stripe/testdataBillingProducts.js"></script>
		<script src="/services/modules/stripe/testdataBillingPlans.js"></script>
		<script src="/services/modules/stripe/testdataBillingSubscriptions.js"></script>
		<script src="/services/modules/stripe/billing/coupons/unitTests/unitTestsPlatform.js"></script>
		<script src="/services/modules/stripe/billing/plan/unitTests/unitTestsPlatform.js"></script>
		<script src="/services/modules/stripe/billing/product/unitTests/unitTestsPlatform.js"></script>
		<script src="/services/modules/stripe/billing/subscription/unitTests/unitTestsPlatform.js"></script>

		<!--Customers-->
		<!--<script src="/services/modules/stripe/customer/unitTests/unitTestsPlatform.js"></script>-->
		<!--<script src="/services/modules/stripe/customer/unitTests/unitTestsConnect.js"></script>-->

		<!--Add Charges -->
		<script src="/services/modules/stripe/testdataCharges.js"></script>
		<script src="/services/modules/stripe/charges/direct/unitTests/unitTests.js"></script>
		<script src="/services/modules/stripe/testdataChargesDestination.js"></script>
		<script src="/services/modules/stripe/charges/destination/unitTests/unitTests.js"></script>




		<script class="mocha-exec">
			mocha.run();
		</script>

		<script src="/services/modules/stripe/testdataAccountsBiz.js"></script>
		<script src="/services/modules/stripe/testdataAccountsSepa.js"></script>
		<script src="/services/modules/stripe/testdataAccountsToc.js"></script>





		<script src="/services/modules/stripe/testdataCharges.js"></script>
		<script src="/services/modules/stripe/testdataChargesDestination.js"></script>




		<script src="/services/nw/crudIt.js"></script>
		<script src="/services/db/dbHandler.js"></script>
		<script src="/services/db/dbAllocation.js"></script>
		<script src="/services/analytics/model.js"></script>
		<script src="/services/nw/httpHandler.js"></script>
		<script src="/services/utils/env/env-controller.js"></script>
		<!--<script src="/env.js"></script>-->







	</body>
</html>