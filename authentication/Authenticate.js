/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Give Account Data authenticate on it.
class Authenticate extends  Account {

	constructor(siteUrl, patronObj, account) {
		super(account.username, account.password);
		this.referrer = siteUrl;
		this.patronObj = patronObj;
		this.username = account.username;
		this.password = account.password;

		this.authentication = false;
//		this.isAdmin = false;
//		this.isMember = false;
		this.patronAccounts = [];
		this.authenticatedAccount = undefined;
		return  this;
	}
	getPatronAccounts(patronAccountCtrl) {

		super.setPayload(this.payload).query()[0]
		return this;
	}

	logout() {

		localStorage.removeItem("patronArr");
		localStorage.removeItem("patronEmail");
		localStorage.removeItem("resourceArr");
		localStorage.removeItem("subEventArr");
		localStorage.removeItem("eventArr");
		localStorage.removeItem("bookingPayload");
		localStorage.removeItem("alreadyAlerted");
		localStorage.removeItem("patronId");

		localStorage.removeItem("username");
		localStorage.removeItem("password");
		localStorage.removeItem("clientId");
		localStorage.removeItem("client");
	}
	authenticate(patronAccounts) {
		var that = this;
		try {
			patronAccounts.account.some(function (account) {

				if (that.isAuthenticated(account)) {
					that.authenticatedAccount = account;
					throw "INF: Autenticated";
				}


//				if (account.username === this.username && account.password === this.password) {
//					this.authentication = true;
//					this.authenticatedAccount = that.account;
//					throw "INF: Autenticated";
//				}





			});

		} catch (e) {
			return  true;
		}

		return  false;
	}

// From which DB!!!
	isPatron() {

		patronObj = super.setPayload("{\"email\":\"" + this.username + "\"}").query()[0]
		if (objsOut.length < 1) {
			$("#processingMessageAuthenticate").html("<b>Sorry this email (" + this.username + ") is not recognised, check customer support</b><br>");
			return
		}
		this.patronId = patronObj.id;
		return  patronObj;
	}

	setDomain() {

		if (this.referrer.includes("client/login/login.jsp")) {
			account.accessLevel === "member"
			clientId = parseInt(parsedUrl.searchParams.get("clientId"));
			objsOut = new crudIt(clientCtrl, "Client Id Validation")
				.setPayload("{\"id\":" + clientId + "}")
				.query()

			if (objsOut.length < 1) {
				$("#processingMessageAuthenticate").html("<b>ERR: Sorry this client id (" + clientId + ") is not recognised, check customer support</b><br>");
				return
			}
		} else {
			account.accessLevel === "admin"
		}

		return  this;
	}

// Private
	isAuthenticated(account) {

		//console.log("INF : Super username %s", this.username);
		//console.log("INF : Super password %s", this.password);
		if (account.username === this.username && account.password === this.password) {
			this.authentication = true;
		}
		return  this.authentication;
	}
	isAdmin() {
		if (this.authenticatedAccount.accessLevel === "admin") {
//			this.isAdmin = true;
			return true;
		}
		return false;
	}
	isMember() {
		if (this.authenticatedAccount.accessLevel === "member") {
//			this.isMember = true;
			return true;
		}
		return false;
	}
	displayError(e) {
		//console.log("ERR: Detected")
		//console.log("INF: Message (" + e + ")")
		//console.log("INF: Message (" + e.message + ")")
		//console.log("INF: Stack (" + e.stack + ")")
		//console.log("INF: Column (" + e.columnNumber + ")")
		//console.log("INF: Line (" + e.lineNumber + ")")
	}
	buildAdminMenu() {

		return html;
	}
	create() {
		super.setPayload(this.payload).post()
	}
	setPayload(payload) {
		super.payload = payload;
		return this;
	}
	setCtrl(ctrl) {
		super.ctrl = ctrl;
		return this;
	}
	setMsg(msg) {
		super.msg = msg;
		return this;
	}
}

//# sourceURL=auth_service_auth.js