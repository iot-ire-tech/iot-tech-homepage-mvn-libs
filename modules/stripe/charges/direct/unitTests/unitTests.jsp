<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">

		<script src="http://localhost:8084/services/nw/httpHandler.js"></script>
		<script src="http://localhost:8084/services/utils/time/Time.js"></script>
		<script src="http://localhost:8084/services/utils/numbers/Numbers.js"></script>
		<script src="http://localhost:8084/services/modules/stripe/functions.js"></script>




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
		<script	> contextPath = ""</script>
		<script	> ts = ""</script>
		<script src="../../../../../bootstrap.js"></script>
		<script >addTestData()</script>

	</head>

	<script src="unitTests.js"></script>
</html>