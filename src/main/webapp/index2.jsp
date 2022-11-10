<!DOCTYPE html>
<html lang="en">
<head>
    <title>MyBusinessPal.Com</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!--With context path, cant use /services-->

    <script>
        //https://api.jquery.com/jquery.getscript/
        console.log = function () {
        };
        try {
            var urlInitScript = "/services/bootstrap.js"
            $.getScript(urlInitScript)
                .done(function (script, textStatus) {
//					cache: true
                    bootStrap("homepageReleased")
                }).fail(function (jqxhr, settings, exception) {

                // var urlInitScript = "/green/services/bootstrap.js"
                // $.getScript(urlInitScript, function (data, textStatus, jqxhr) {
                //     console.log(data); // Data returned
                //     console.log(textStatus); // Success
                //     console.log(jqxhr.status); // 200
                //     console.log("Load was performed.");
                //     bootStrap("homepageReleased")
                // });

            });
        } catch (e) {


        }

    </script>

</head>

</html>