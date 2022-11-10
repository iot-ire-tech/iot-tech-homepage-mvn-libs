<!DOCTYPE html>
<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js"></script>
		<script>
			mocha.setup('bdd'); // minimal setup
		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
		<script>
			// chai has a lot of stuff, let's make assert global
			let assert = chai.assert;
		</script>
		<script src="../../../../../bootstrap.js"></script>

	</head>
	<script >
			bootStrap("adminPlanTests")
	</script>

</html>