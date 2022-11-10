var account = {
	"accessLevel": "n/a",
	"term": "n/a",
	"username": "n/a",
	"password": "n/a"
}

/*
 * Create new object named patron
 */
function PatronAccountX(patronId, email, pass, accessLevel, term) {
// constructor start
	this.patronId = patronId;
	this.email = email;
	this.pass = pass;
	this.accessLevel = accessLevel;
	this.term = term;
// constructor end
	var accountObj = {};
	var accounts = [];
	this.init = function () {
		accountObj.accessLevel = this.accessLevel;
		accountObj.term = this.term;
		accountObj.username = this.email;
		accountObj.password = this.pass;
		accounts.push(accountObj);
		return this;
	}

// To List of accounts
	this.removeAccount = function () {

	}
	this.addNewAccount = function (accountObj) {
		accounts.push(accountObj);
		return this;
	}

	this.post = function () {
		var accountPayload = {}
		accountPayload.id = getRand();
		accountPayload.patronId = this.patronId;
		accountPayload.accounts = accounts;
		url = urlRest + "/" + "patronAccounts";
		if (nw.setUrl(url).setMethod("post").setPayload(accountPayload).setMessage("Posting New Patron Account").sendMe().getStatus() === false) {
			//console.log("ERR: Cannot provision new admin patron ");
			//console.log("INF: Payload Sent : (" + nw.getPayload() + ")");
			return true;
		} else {
			return false;
		}

	}
	this.getPayload = function () {
		var accountPayload = {}
		accountPayload.id = getRand();
		accountPayload.patronId = this.patronId;
		accountPayload.accounts = accounts;
		return accountPayload;
	}

}




