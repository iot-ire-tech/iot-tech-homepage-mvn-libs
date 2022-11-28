var BarcodeReader = require('../../dist/dbr-6.5.1.min');
// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
BarcodeReader.licenseKey = 't0068NQAAAFeJdZvVCv5zUVt28fw9NTSE6wlI5ICBRRKQfrRh7UTrmDY+Jh8gcB1mi2EzlQ1EGVVNFC4U2pbFKOeKngokOeg=';
var reader;
BarcodeReader.createInstance().then(r => 
    (reader = r) && r.decode('../sample.png')
).then(results => {
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
    reader.deleteInstance();
});