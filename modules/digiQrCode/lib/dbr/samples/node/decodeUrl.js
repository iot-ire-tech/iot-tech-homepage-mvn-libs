var BarcodeReader = require('../../dist/dbr-6.5.1.min');
// https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
BarcodeReader.licenseKey = 't0068NQAAAKRohiNf37H4tNmJ/CSJ6oHOc0tRP4ghpFqZgMEiShvPlqu415IpwGcsWVC+LHoh8TqY8Vf7ww3m1u9sRltTw2w=';
var reader;
BarcodeReader.createInstance().then(r => 
    (reader = r) && r.decode('https://demo.dynamsoft.com/dbr/img/AllSupportedBarcodeTypes.png')
).then(results => {
    for(var i = 0; i < results.length; ++i){
        console.log(results[i].BarcodeText);
    }
    reader.deleteInstance();
});