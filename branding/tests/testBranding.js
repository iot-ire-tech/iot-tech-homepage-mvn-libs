/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var q = ""
var b = {}
var branding;
try {
	//console.clear()
// Test Data
//	Client ID is supplied via URL - 673859
// Patron Obj with classification of 40s
	var patrons = new crudIt(bs.patronCtrl, "Query Patron").setPayload("{\"clientId\":" + clientId + "}").query()
// Test Data - xxxx
	q = "{\"clientId\":" + clientId + ", \"classification.gender\":\"male\"}";
	var patronObjMales = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()
// Test Data - xxxx
	q = "{\"clientId\":" + clientId + ", \"classification.gender\":\"male\"  , \"classification.generation\":\"40s\"}";
	var patronObjMale40s = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()[0]
	patronObjMale40s = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()
// Test Data - xxxx
	q = "{\"clientId\":" + clientId + ", \"classification.gender\":\"female\"  , \"classification.generation\":\"40s\"}";
	var patronObjFeMale40s = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()[0]
	patronObjFeMale40s = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()

// Test Data - xxxx
	q = "{\"clientId\":" + clientId + ", \"classification.gender\":\"female\"}"
	var patronObjFemales = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()
// Test Data - xxxx
	q = "{\"clientId\":" + clientId + ",\"age\":46}";
	var patronObjAge = new crudIt(bs.patronCtrl, "Query Patron").setPayload(q).query()
	// classification.gender:\"male\"
	// classification.generation:\"40s\"




// Possible Work Flowsss



// Test Case#1 : Patron / Client Brandings Male in 40s
	b = new Branding(bs.brandCtrl, "INIT");
	if (patronObjMale40s.length > 0) {
		b.setPatron(patronObjMale40s[0]);
		branding = b.getBranding(clientId, "patron");
		//console.table(branding)
	} else {
		// no such population
	}

// Test Case#2 : No Patron / Client Branding Exists for this category - FeMale 40s!!
	b = new Branding(bs.brandCtrl, "INIT");
	if (patronObjFeMale40s.length > 0) {
		// Females / 40 exist, but is there brandins.
		b.setPatron(patronObjFeMale40s[0]);
		//console.log("IMF: lassification.gender %s", b.getPatron().classification.gender)
		//console.log("IMF: lassification.generation %s", b.getPatron().classification.generation)
		var brt = brandingWorkFlow(b)
		//console.table(brt)
	} else {
	}




// Test Case#2 : Get Generic Branding !!
	b = new Branding(bs.brandCtrl, "INIT");
	branding = b.getBranding(clientId, "generic");

// Test Case#3 : Patron Branding Whos Publish Date is today.
// Test Case#3 : Patron Branding Whos Publish Date is today.


// Load UX !!!
	throw "End Of Test";


} catch (exception) {
//	//console.error("INF: Msg : %s", exception.message)
//	//console.error("INF: stack : %s", exception.stack)

}

function brandingWorkFlow(b) {
	// no such branding defined for ladies / 40 ?
	if ((b.getBranding(clientId, "patron")) === undefined) {
		//console.log("WRN: No Patron Branding Exists - UnHappy Path -L1, Lets try Generic");

		if ((b.getBranding(clientId, "generic")) === undefined) {
			//console.log("ERR: No Generic/Non Specific Branding Exists - UnHappy Path -L2. Lets use System Default Branding");
			b.setRtBranding(modelBrandingDefault);
			return b.getRtBranding();
		} else {
			// Use Generic Branding Then
			return b.getRtBranding();
		}

	} else {
		// Patron Branding Exists - Happy Days
		//console.log("INF: Patron Branding Exists - Happy Path!!");
		return b.getRtBranding();
	}

}

function brandingWorkFlowGeneric(b) {
	// no such branding defined for ladies / 40 ?

	if ((b.getBranding(clientId, "generic")) === undefined) {
		//console.log("ERR: No Generic/Non Specific Branding Exists - UnHappy Path -L2. Lets use System Default Branding");
		b.setRtBranding(modelBrandingDefault);
		return b.getRtBranding();
	} else {
		// Use Generic Branding Then
		return b.getRtBranding();
	}

}