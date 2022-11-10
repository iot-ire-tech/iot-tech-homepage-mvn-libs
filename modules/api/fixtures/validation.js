/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function checkFixtureStartTime() {
// Check it against Fixtures DB..

	var datein = $(this).val();
//	availabilityRsp = isAvailable(primaryId, pstreamProductId, datein)

	if (availabilityRsp.status === false) {
		$("#fixturesMsgBox").html("<br><b>Unfortunately, this event _start_ date outside of business hours :&#10060<br>, reason (" + availabilityRsp.reason + ")<b>")
//		uxEventFixtures.del(this);
	} else {
		$("#fixturesMsgBox").html("<br><b>Congratulations, this event _start_ date is available:&#9989 <b>")
	}
}


function checkFixtureStartTime() {
	availabilityRsp = fixturesLookup(datein, modelContext.upstreamProductId)

	if (availabilityRsp.status === false) {
		$("#fixturesMsgBox2").html("<br><b>Unfortunately, this event _start_ date is already taken:&#10060<br>, reason (" + availabilityRsp.reason + ")<b>")
//		uxEventFixtures.del(this);
	} else {
		$("#fixturesMsgBox2").html("<br><b>Congratulations, this event fixtures _start_ date is available:&#9989 <b>")
	}

}

function checkFixtureEndTime() {

	var datein = $(this).val();
	availabilityRsp = isAvailable(primaryId, modelContext.upstreamProductId, datein)

	if (availabilityRsp.status === false) {
		$("#fixturesMsgBox").html("<br><b>Unfortunately, this event _end_ date outside of business hours :&#10060<br>, reason (" + availabilityRsp.reason + ")<b>")
		addFixtureAvailStart = false
//		uxEventFixtures.del(this);
	} else {
		$("#fixturesMsgBox").html("<br><b>Congratulations, this event fixtures _end_ date is available:&#9989 <b>")
		addFixtureAvailStart = false
		addFixtureStart = false;
	}
}


function checkFixtureEndTime() {
	availabilityRsp = fixturesLookup(datein, modelContext.upstreamProductId)

	if (availabilityRsp.status === false) {
		$("#fixturesMsgBox2").html("<br><b>Unfortunately, this event _end_ date is already taken:&#10060<br>, reason (" + availabilityRsp.reason + ")<b>")
		addFixtureStart = false;
//		uxEventFixtures.del(this);
	} else {
		$("#fixturesMsgBox2").html("<br><b>Congratulations, this event fixtures _end_ date is available:&#9989 <b>")
		addFixtureStart = false;
	}
}

//# sourceURL=api_fixtures_validations.js