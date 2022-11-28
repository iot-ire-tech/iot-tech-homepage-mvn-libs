<!DOCTYPE html>
<html>
<head>

    <script src="http://localhost:8084/services/nw/httpHandler.js"></script>
    <script src="http://localhost:8084/services/utils/time/Time.js"></script>
    <script src="http://localhost:8084/services/utils/numbers/Numbers.js"></script>
    <script src="http://localhost:8084/services/modules/stripe/functions.js"></script>


    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css">
    <link rel=stylesheet href="//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
    <link rel=stylesheet href="/lib/jquery/datetimepicker-master/jquery.datetimepicker.css">

    <script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js'></script>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


    <script src="/lib/jquery/datetimepicker-master/build/jquery.datetimepicker.full.min.js"></script>
    <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
    <script src="https://cdn.rawgit.com/Automattic/expect.js/0.3.1/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js"></script>

</head>
<body>
<div id="mocha"></div>
<div id="ux"></div>
<div id="dialogBooking" title="Online Booking Point">
    <span id="dialogBookingHook"></span>
</div>
<div id="msgNotification" class="msgNotification"></div>
<button offering="event" assetId="prod_HhQYITA1r08U2j" productId="prod_HIqrrSdRkT5srg" accountId="acct_1GRdJxF6KR5nnzB2"
        class='w3-button w3-small w3-gray bookingMgt'>Event Booking
</button>
<button offering="activity" assetId="prod_HhQYITA1r08U2j" productId="prod_HIqrrSdRkT5srg"
        accountId="acct_1GRdJxF6KR5nnzB2" class='w3-button w3-small w3-gray bookingMgt'>Activity Booking
</button>
<div id="tabOnly"></div>


<script>mocha.setup("bdd")</script>


<script src="../../service-core.js"></script>
<script src="../../comms/service.js"></script>
<script src="../../seating/service.js"></script>
<script src="../../fixtures/service.js"></script>
<script src="../../capacitymgt/service.js"></script>
<script src="../../timebasedbilling/service.js"></script>
<script src="../../businessHours/ux/widgetListing.js"></script>
<script src="../../businessHours/service.js"></script>
<script src="../../businessHours/utils.js"></script>

<script src="../../revenue/service.js"></script>


<script src="../../usage/model.js"></script>
<script src="../../usage/service.js"></script>

<script src="../ux/uxBookingReservationWidget.js"></script>
<script src="../ux/uxBookingReservationWidgetListing.js"></script>
<script src="../init.js"></script>
<script src="../utils.js"></script>
<script src="../events/screen.js"></script>
<script src="../service.js"></script>

<script src="test-service.js"></script>
<script>
    //			mocha.checkLeaks();
    mocha.globals(['jQuery', "build", "getHtml"]);
    mocha.run();
</script>

</body>


</html>
