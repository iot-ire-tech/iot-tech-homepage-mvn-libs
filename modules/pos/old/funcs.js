/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */


function putResults(dataIn, Id) {
// Put Data
	url = urlRest + "/leagueResults/" + Id;

	nw.setUrl(url).setMethod("put")
		.setPayload(dataIn)
		.setMessage("Modify Results for patron " + Id)
		.sendMe().getStatus();
	console.log("INF: Payload Sent : (" + nw.getPayload() + ")");


}

function queryBoxLeagueResults(BoxId) {
	url = urlRest + "/leagueResults?box=" + BoxId;
	return query(url, "No Box Results Found For This ID" + BoxId, "");
}
function queryBoxLeagueHaveIAlreadyPlayedYou(id) {
	url = urlRest + "/leagueResults?patronId=" + id;
	return query(url, "No Box Results Found for me: " + id, "");
}

function queryMyBoxMemberShip(patronId, boxLeagueId) {
	var groupArr = [];
	try {
		url = urlRest + "/subEvent?eventId=" + boxLeagueId;
		tmpObj = nw.setUrl(url).setMessage("Loading SubEvents For Box League ").getMe().getResult();
		tmpObj.forEach(function (subEvent) {
			url = urlRest + "/subEvent/" + subEvent.id + "/subEventMembers";
			tmpObj = nw.setUrl(url).setMessage("Loading SubEvents Members ").getMe().getResult();
			tmpObj.forEach(function (subEventMember) {
				groupArr = subEventMember.members;
				subEventMember.members.forEach(function (member) {
					if (member.patronId === patronId) {
						// Match Found, you are a member of this group..
						boxName = subEvent.name;
						throw BreakException;
					}
				});
			});
		});
	} catch (e) {
		var emails = [];
		groupArr.forEach(function (item) {
			emails.push(item.email);
		});

		return {boxName: boxName, members: emails};
	}
	return "Not Found";
}



function postResults(dataIn) {
	url = urlRest + "/leagueResults";
	nw.setUrl(url).setMethod("post")
		.setPayload(dataIn)
		.setMessage("Posting Init Results data")
		.sendMe().getStatus();
	console.log("INF: Payload Sent : (" + nw.getPayload() + ")");


}

function printPatronInfo(id, url) {
	tmpObj = nw.setUrl(url).setMessage("Patron Info").getMe().getResult();
	$("#" + id + "Name").text(tmpObj.name);
	$("#" + id + "Email").replaceWith("<a href=\"mailto:" + tmpObj.email + "\">" + tmpObj.email + "</a>");
	$("#" + id + "Mobile").replaceWith("<a href=\"tel:" + tmpObj.mobile + "\">" + tmpObj.mobile + "</a>");
	return tmpObj.id;
}



function initStats(id, patronId) {
	var tmpObj = [];
	var Obj = {};
	Obj.id = getRand();
	Obj.scored = 0;
	Obj.scoredHistory = [];
	Obj.wins = 0;
	Obj.winsHistory = [];
	Obj.loses = 0;
	Obj.losesHistory = [];
	Obj.draws = 0;
	Obj.drawsHistory = [];
	// Members in your box
	Obj.remaining = squashBoxSize;
	Obj.rating = 0;
	Obj.patronOpponent = [];
	Obj.patronId = parseInt(patronId);
	tmpObj.push(Obj);

	postResults(Obj);

	displayGamesRemaining(id, Obj)
	return tmpObj;
}

function displayStats(id, myStats) {
	var counter = 0, total = 0, avg = 0, max = 0, min = 0;
	var scores = [];
	var remaining = [];

	myStats.forEach(function (previousresult) {
		total += previousresult.scored;
		scores.push(previousresult.scored);
		remaining.push(previousresult.remaining);
		counter++;
	});
	var overall = getRandInt(1, 20);
//
//	$("#" + id + "OverallRanking").text(overall);
//	$("#" + id + "Ranking").text(getRandInt(1, overall));
	displayGamesRemaining(id, myStats[0])
}

function displayGamesRemaining(id, myStats) {
	var scoreRt = myStats.scoredHistory;

	if (myStats.scoredHistory.length > 0)
		var max = scoreRt.reduce(function (a, b) {
			return Math.max(a, b);
		});
	else
		max = 0;

	if (myStats.scoredHistory.length > 0)
		var min = scoreRt.reduce(function (a, b) {
			return Math.min(a, b);
		});
	else
		min = 0;

	if (myStats.scoredHistory.length > 0) {
		var sum = scoreRt.reduce(function (a, b) {
			return  a + b;
		});
		var avg = sum / scoreRt.length;
	} else
		avg = 0;

	$("#" + id + "MaxScore").text(max);
	$("#" + id + "MinScore").text(min);
	$("#" + id + "AvgScore").text(avg);
	$("#" + id + "GameRemaining").text(myStats.remaining).trigger("change)");
	$("#" + id + "SocialLiking").text(myStats.rating).trigger("change)");
}

function boxLeagueResults(url) {
	tmpObj = nw.setUrl(url).setMessage("Retrieving all your box results data").getMe().getResult();
	if (tmpObj.length === 0) {
//		alert("INF: You have not results to talk about, this must be your first game!!!");
		return tmpObj;
	}
	return tmpObj;
}

var membersDistributionList = [];
function loadAllUsersWithSquashOffering(offeringId, selectId, selectLabel) {

	html = "<label>" + selectLabel + "</label>";
	html += "<select id=" + selectId + " class=\"w3-select w3-hover-grey\">";
	html += "<option value=\"\" disabled selected>Select Player</option>";

// We have users with the correct offerings.
	if (hasOffering(offeringId)) {
// Yes : List All those users in the league.
		tmpObj.forEach(function (item) {
			html += "<option value=" + item.id + ">" + item.name + "</option>";
			membersDistributionList.push(item.email);
		});
	} else {
// No : List All those users in the league.
		html += "<option value=>No Users Subscribed</option>";
	}

	html += "</select>";
	return html;
}

function loadAllUsersInMyGroup(id, boxName, patronId) {

	html = "<label>Next, Identify Your Opponent?</label>";
	html += "<select id=" + id + " class=\"w3-select w3-hover-grey\">";
	html += "<option value=\"\" disabled selected>Select Player</option>";

// Get Group Id
	url = urlRest + "/subEvent?name=" + boxName;
	if (query(url, "Retrieving Group Users", "ERR: No box users found, you need to add users to this group, contact Admin/Helpdesk")) {

// Get subEventMember
		url = urlRest + "/subEvent/" + tmpObj[0].id + "/subEventMembers";
		tmpObj = nw.setUrl(url).setMessage("Loading SubEvents Members ").getMe().getResult();
		tmpObj.forEach(function (subEventMember) {
			subEventMember.members.forEach(function (member) {
// Call Patron To Get Name Back
				url = urlRest + "/patron?id=" + member.patronId;
				query(url, "Retrieving Patron Detail", "ERR: No Patron found with that Id contact Admin/Helpdesk")
				if (tmpObj[0].id !== patronId)
					html += "<option value=" + tmpObj[0].id + ">" + tmpObj[0].name + "</option>";
			});
		});



	} else {
		html += "</select>";
	}
	return html;
}

function countDownRef(obj) {

	var counter = 10;
	var newYearCountdown = setTimeout(function () {
		console.log(counter);
		counter--
		if (counter === 0) {
			console.log("HAPPY NEW YEAR!!");
			clearInterval(newYearCountdown);
		}
	}, 1000);

}
