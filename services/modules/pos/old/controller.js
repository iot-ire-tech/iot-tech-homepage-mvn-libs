/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click", '#save', function () {

	$(this).attr("enabled", "false");





// Collect Data : You
	var dataIn = {};
// case : First Game
	dataIn.id = youObj[0].id;
	dataIn.ts = new Date().toJSON();
	dataIn.box = selectedBox;
	dataIn.scored = youObj[0].scored + parseInt(yourScore);
	tmpArr = youObj[0].scoredHistory;
	tmpArr.push(parseInt(yourScore));
	dataIn.scoredHistory = tmpArr;

	if (youWon === true) {
		dataIn.wins = youObj[0].wins + 1;

		tmpArr = youObj[0].winsHistory;
		tmpArr.push(1);
		dataIn.winsHistory = tmpArr;
	} else
		dataIn.wins = youObj[0].wins;


	if (youWon === false) {
		dataIn.loses = youObj[0].loses + 1;
	} else
		dataIn.loses = youObj[0].loses;
	if (youWon === 0) {
		dataIn.draws = youObj[0].draws + 1;
	} else
		dataIn.draws = youObj[0].draws;
	dataIn.rating = youObj[0].rating;
	dataIn.remaining = youObj[0].remaining -= 1;
	dataIn.message = message;
	dataIn.patronName = youFullName;
	tmpArr = youObj[0].patronOpponent;
	tmpArr.push(selectTheyAre);
	dataIn.patronOpponent = tmpArr;
	dataIn.patronId = parseInt(selectYouAre);
	//postResults(dataIn);
	putResults(dataIn, dataIn.id);



	dataIn = {};
	dataIn.id = theirObj[0].id;
	dataIn.ts = new Date().toJSON();
	dataIn.box = selectedBox;
	dataIn.scored = theirObj[0].scored + parseInt(theirScore);
	tmpArr = theirObj[0].scoredHistory;
	tmpArr.push(parseInt(theirScore));
	dataIn.scoredHistory = tmpArr;

	if (youWon === true) {
		dataIn.loses = theirObj[0].loses + 1;
		tmpArr = theirObj[0].winsHistory;
		tmpArr.push(1);
		dataIn.winsHistory = tmpArr;
	} else
		dataIn.loses = theirObj[0].loses;

	if (youWon === false) {
		dataIn.wins = theirObj[0].wins + 1;
	} else
		dataIn.wins = theirObj[0].wins;

	if (youWon === 0) {
		dataIn.draws = theirObj[0].draws + 1;
	} else
		dataIn.draws = theirObj[0].draws;

	if (goodGame)
		dataIn.rating = theirObj[0].rating + 1;
	else
		dataIn.rating = theirObj[0].rating - 1;
	dataIn.remaining = theirObj[0].remaining -= 1;
//	dataIn.message = message;
	dataIn.patronName = theirFullName;
	tmpArr = theirObj[0].patronOpponent;
	tmpArr.push(selectYouAre);
	dataIn.patronOpponent = tmpArr;
	dataIn.patronId = parseInt(selectTheyAre);
	// postResults(dataIn);
	putResults(dataIn, dataIn.id);

	emailBookingCompletion();
});

//// Game Validation : Have I already played you?
//	var duplicates = [];
//	try {
//		duplicates = queryBoxLeagueHaveIAlreadyPlayedYou(selectYouAre)
//		duplicates.forEach(function (result) {
//
//			result.patronOpponent.forEach(function (opps) {
//				if (opps === selectTheyAre) {
//					throw BreakException
//				}
//
//			});
//		});
//	} catch (e) {
//
//		alert("ERR: You have already played this opponent");
//		return;
//	}


//# sourceURL=module_squash_controller.js