/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
//stripe = Stripe('sk_test_PWxKayhQchfhGUlEaMT6DE8x');

document.querySelector('#fileinfo').addEventListener('submit', function (event) {
	event.preventDefault();

	var data = new FormData();
	data.append('file', document.querySelector('#file-box').files[0]);
	data.append('purpose', 'identity_document');

	var oReq = new XMLHttpRequest();
	oReq.open("POST", 'https://uploads.stripe.com/v1/files', true);
	oReq.open("POST", 'http://localhost:8084/FileItNow', true);
	oReq.setRequestHeader('Authorization', 'Bearer ' + stripe._apiKey);


	oReq.onload = function (oEvent) {
		if (oReq.status == 200) {
			document.querySelector('#label-results').textContent = 'Success!';
		} else {
			document.querySelector('#label-results').textContent = 'Failure: ' + oReq.status;
		}
		document.querySelector('#upload-results').textContent = oReq.response;
	}
	oReq.send(data);
});