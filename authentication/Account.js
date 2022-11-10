/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Account {

	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
	setAccessLevel(level) {

		this.accessLevel = level;
	}

	validate() {
		var msg = "<b>Sorry we cannot authenticate you, check your username/password<br><span>Remove any cached User/Pass from browser</span><br><br></b>";
		if (this.username === undefined || this.password === undefined) {

			$("#processingMessageAuthenticate")
				.html(msg);
			return false;
		}
		if (this.username === "" || this.password === "") {
			$("#processingMessageAuthenticate")
				.html(msg);
			return false;
		}

		return true;
	}
}
//# sourceURL=auth_service_account.js