<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"></script>
		<script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
		<script> mocha.setup('bdd');</script>
		<script>
//			mocha.checkLeaks();
			mocha.globals(['jQuery']);
//			mocha.run();
		</script>
		<script	> let assert = chai.assert;</script>
		<script src="../../../../../bootstrap.js"></script>

	</head>
	<script	>
			bootStrap("endUserConnectAccountAddToC")
	</script>

</html>