/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var modelUx = {
//	"businessProfile": {
//		...new BizProfile({"mcc": "5734", "name": "BusinessAccount", "description": "SW services", "supportUrl": "https://sites.google.com/view/iottech/home?authuser=3", "url": "https://sites.google.com/view/iottech/home?authuser=0"})
//	},
//	"individual": {
//		...new Person({"firstName": "Anto", "lastName": "Ennis..."}),
//		"address": new Address(),
//		"verfification": new Verfification()
//	},
//	"director": new Person(),
//	"owner": new Person(),
//	"rep": new Person(),
//	"address": new Address(),
//	"verfification": new Verfification()
//};
//EntPerson director;
//EntPerson owner;
//EntPerson rep;
//EntIndividual individual;
//EntCompany company;
//EntBusinessProfile businessProfile;

var modelUx = {

"rep": {
	...new Person(
		{
				"firstName": "Anthony",
				"lastName": "Ennis",
				"sex": "male",
				"phone": "+353877461070",
				"year": 1972,
				"month": 2,
				"day": 1,
				"email": "tonyennis@yahoo.com"
		}),
	"address": new Address(),
	"relationship": new Relationship({"title": "Director,Owner", "executive": false, "representative": true, "owner": true, "director": true}),
	"verification": new Verfification()
}
,
"exec": {
	...new Person({"firstName": "Anto(Exec)", "lastName": "Ennis", "email": "exec@yahoo.com"}),
	"address": new Address(),
	"relationship": new Relationship({"title": "Herr Rep", "executive": true, "representative": false, "owner": false, "director": false}),
	"verification": new Verfification()
}
,
"owner": {
	...new Person({"firstName": "Anto(Owner)", "lastName": "Ennis", "email": "owner@yahoo.com"}),
	"address": new Address(),
	"relationship": new Relationship({"title": "Herr Owner", "executive": false, "representative": false, "owner": true, "director": false}),
	"verification": new Verfification()
}
,
"director": {
	...new Person({"firstName": "Anto(director)", "lastName": "Ennis", "email": "director@yahoo.com"}),
	"address": new Address(),
	"relationship": new Relationship({"title": "Herr Director", "executive": false, "representative": false, "owner": false, "director": true}),
	"verification": new Verfification()
}
,
//345-3485LH
//00-77461070
"company": {
	...new Company({"name": "IOT Tech", "phone": "+353877461070", "taxId": "345-3485LH", "vatId": "IE3453485LH", "directorsProvided": true, "ownersProvided": true, "address": new Address()})
		,
		"verification": new Verfification()
	}
	,
	"businessProfile": {
		...new BizProfile({"mcc": "5734", "name": "MyBusinessPal.Com", "description": "SW services",
				"supportUrl": "https://www.mybusinesspal.com/support.jsp",
				"supportPhone": "+353877461070",
				"url": "https://www.mybusinesspal.com/index.jsp"})
	}
};
//# sourceURL=onboarding_legal_biz_model.js