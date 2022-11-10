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


var modelUx = {
    "businessProfile": {
        ...new BizProfile(
            {
                "mcc": "5734",
                "name": "BusinessAccountII",
                "description": "SW services",
                "supportPhone": "",
                "supportUrl": "https://www.mybusinesspal.com/support.jsp",
                "url": "https://www.mybusinesspal.com/index.jsp"
            })
    },
    "individual": {
        ...new Person({
            "firstName": "Anto",
            "lastName": "Ennis...",
            "phone": "+353877461070",
            "gender": "male",
            "idNumber": "9900984R", // every where else
            "ssnNumber": "9900984R", // The last four digits of the individual’s Social Security Number (U.S. only).
            "email": "tonyennis@yahoo.com",
            "year": "1972",
            "month": "2",
            "day": "1"
        }),
        "address": new Address(),
        "verification": new Verfification()
    }
};

//# sourceURL=onboarding_legal_indi_model.js