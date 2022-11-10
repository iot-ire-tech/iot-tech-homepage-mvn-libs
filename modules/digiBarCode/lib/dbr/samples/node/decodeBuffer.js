var BarcodeReader = require('../../dist/dbr-6.5.1.min');
// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
BarcodeReader.licenseKey = 't0068NQAAAJxejd6DE9LGaRttUz/jyds47GGKiCe5TzExqhGyyFCMPyLYOAdlOrosenKrxqPqszcwyeJSVjnMLD86m56nIt0=';

var fs = require('fs');
var buffer = fs.readFileSync('../sample.png');

var reader;
BarcodeReader.createInstance().then(r => 
    (reader = r) && r.decode(buffer)
).then(results => {
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
    reader.deleteInstance();
});