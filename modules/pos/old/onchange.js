/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */


/*
 *
 * Menu Items
 *
 */
$(document).on("click ", '#addBooking01', function () {
//	http://localhost:3000/prototype_maven/pages/portal/userPortalMembers.jsp#The%20Box%20League
	url = "../login/login.jsp?clientId=" + localStorage.getItem("clientId");
	window.open(url, '_blank');
});

/*
 *
 * Widgets
 *
 */
var youObj = [];
var youFullName = "";
var groupDetails;
$(document).on("change", '#selectYouAre', function () {
	selectYouAre = $(this).val();
	youFullName = $("#selectYouAre option:selected").text();

// Your current statss
	url = urlRest + "/patron/" + selectYouAre + "/leagueResults";
	youObj = boxLeagueResults(url);
	if (youObj.length === 0) {
		youObj = initStats("your", selectYouAre);
	} else if (youObj.length > 0) {
		displayStats("your", youObj);
	}

// Your contact profile
// Get Age, Name
	url = urlRest + "/patron/" + selectYouAre;
	var patronId = printPatronInfo("your", url);
// Default Muttually Exclusive Group Member ship
	// My Patron Id is..

	// Sub Event
//	http://localhost:3000/subEvent/1/subEvent
	// Sub Event Members
	// http://localhost:3000/subEvent/1/subEventMembers
// Check : sub events, on match, get sub event ID., then get box name!!!
	groupDetails = queryMyBoxMemberShip(patronId, boxLeagueEventId);
	if (groupDetails === "Not Found") {
		alert("INF: You have not been added as a member to this box league, contact Sports Administrator, to get added");
		return
	}

// $("#selectBoxListing option[value=\""+boxName+"\"]").attr("selected", "selected");;
	$("#boxListing").text("Your Group Membership is: " + groupDetails.boxName);
	selectedBox = groupDetails.boxName;
	$("#theyAre").html(loadAllUsersInMyGroup("selectTheyAre", selectedBox, patronId));
});


var theirObj = [];
var theirFullName = "";
$(document).on("change", '#selectTheyAre', function () {
	selectTheyAre = $(this).val();
	theirFullName = $("#selectTheyAre option:selected").text();
	url = urlRest + "/patron/" + selectTheyAre + "/leagueResults";
	theirObj = boxLeagueResults(url);
	if (theirObj.length === 0) {
		theirObj = initStats("their", selectTheyAre);
	} else if (theirObj.length > 0) {
		displayStats("their", theirObj);
	}


// Get Age, Name
	url = urlRest + "/patron/" + selectTheyAre;
	printPatronInfo("their", url);
});


$(document).on("change", '#notes', function () {
	message = $(this).val();
});

$(document).on("click", '#notes', function () {
	$(this).text("");
});


var goodGame = 0;
// The more likes you get the more people will want to play you.
$(document).on("click", '.yourRating', function () {

	id = $(this).attr("id");
	$("#" + id).animate({height: 50}, 500);
	if (id === "good")
		goodGame = true;
	else if (id === "bad")
		goodGame = false;
});

var enteredYourScore = false;
$(document).on("change", '#yourScore', function () {
	enteredYourScore = true;
	yourScore = $(this).val();
});

var diff = 0;
var youWon = false;
$(document).on("change", '#theirScore', function () {
	theirScore = $(this).val();
	if (enteredYourScore) {

		if (yourScore > theirScore) {
			diff = yourScore - theirScore;
			consoleIt("Your won by: " + diff);
			youWon = true;
		} else if (yourScore < theirScore) {
			diff = theirScore - yourScore;
			consoleIt("Your lost by: " + diff);
			youWon = false;
		} else if (yourScore === theirScore) {
			diff = theirScore - yourScore;
			consoleIt("Your Draw : " + diff);
			youWon = 0;
		}
	}
});
var yourRemaining = 0;
$(document).on("change", '#yourGameRemaining', function () {
	yourRemaining = $(this).text();
});
var theirRemaining = 0;
$(document).on("change", '#theirGameRemaining', function () {
	theirRemaining = $(this).text();
});



//# sourceURL=module_squash_onchange.js