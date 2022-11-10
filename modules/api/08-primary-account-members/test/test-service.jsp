<!DOCTYPE html>
<html>
<head>

    <script src="http://localhost:8084/services/nw/httpHandler.js"></script>
    <script src="http://localhost:8084/services/utils/time/Time.js"></script>
    <script src="http://localhost:8084/services/utils/numbers/Numbers.js"></script>
    <script src="http://localhost:8084/services/modules/stripe/functions.js"></script>
    <!--<script src="http://localhost:8084/services/utils/logging/Log.js"></script>-->


    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
    <link rel=stylesheet href="//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">

    <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script src="https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>
</head>
<body>
<div id="mocha"></div>
<div id="ux"></div>
<button accountId="acct_1GRdJxF6KR5nnzB2" class='w3-button w3-small w3-gray '>
    Open Me
</button>

<script>mocha.setup("bdd")</script>

<script src="../../service-core.js"></script>
<script src="../init.js"></script>
<script src="../service.js"></script>

<script src="../init.js"></script>
<script src="test-service-component.js"></script>
<script>
    //			mocha.checkLeaks();
    mocha.globals(['jQuery', "build", "getHtml"]);
    mocha.run();
</script>

</body>


</html>
