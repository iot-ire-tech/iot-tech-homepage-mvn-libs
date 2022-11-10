

/*
 * Create new object named patron
 */
function PatronXXX(clientId, fname, lname, phone, mobile, email, pass, sector, occupation, dob, gender) {
// constructor start
	this.clientId = clientId;
	this.type = "guest";
	this.fname = fname;
	this.lname = lname;
	this.name = this.fname + this.lname;
	this.phone = phone;
	this.mobile = mobile;
	this.email = email;
	this.pass = pass;
	this.sector = sector;
	this.occupation = occupation;
	this.dob = dob;
	this.gender = gender;
// constructor end
	var patronObj = {};


	this.init = function () {
		//var mm = new MM_Ref(456, new Array(1, 2, 3));
	}

	this.name = function () {
		return this.fname

	}

	this.getAdmin = function () {
		patronObj = {};
		patronObj.id = getRand();
		patronObj.clientId = this.clientId;
		patronObj.type = "guest";
		patronObj.fname = this.fname;
		patronObj.lname = this.lname;

		patronObj.phone = this.phone;
		patronObj.email = this.email;
		patronObj.sector = this.sector;
		patronObj.customerId = "-1";
		return patronObj;
	}
	this.getMember = function () {
		patronObj = {};
		patronObj.id = getRand();
		patronObj.clientId = this.clientId;
		patronObj.type = "guest";
		patronObj.fname = this.fname;
		patronObj.lname = this.lname;
		patronObj.name = this.name;
		patronObj.gender = this.gender;
		patronObj.dob = this.dob;
		patronObj.mobile = this.mobile;
		patronObj.email = this.email;
		patronObj.occupation = this.occupation;
		patronObj.customerId = "-1";
		return patronObj;
	}

	this.getId = function () {
		return patronObj.id;
	}

	this.post = function (patronObj) {
		url = urlRest + patronEndpoint;
		if (nw.setUrl(url).setMethod("post").setPayload(patronObj).setMessage("Posting New Patron Type Admin").sendMe().getStatus() === false) {
			//console.log("ERR: Cannot provision new admin patron ");
			//console.log("INF: Payload Sent : (" + nw.getPayload() + ")");
			return true;
		} else {
			return false;
		}

	}

}




/*
 * End User Additions
 */
Patron.prototype.addPics = function () {
	uploadFile(clientName);
	var pics = {
		"pic1": $('#file1').val(),
		"pic2": $('#file2').val(),
		"pic3": $('#file3').val()
	};
};

Patron.prototype.nationality = "English";
Patron.prototype.getEndUser = function () {

	patron.id = getRand();
	patron.title = $('#title').val();
	patron.fname = $('#fname').val();
	patron.lname = $('#lname').val();
	patron.name = dataIn.fname + " " + dataIn.lname;
	patron.patronType = $('#type').val();

	patron.address = $('#address').val();
	patron.address2 = $('#address2').val();
	patron.city = $('#city').val();
	patron.zip = $('#zip').val();
	patron.country = $('#country').val();

	patron.mobile = $('#mobile').val();
	patron.email = $('#email').val();
	patron.dob = $('#dob').val();		// select box

	patron.account = {username: $('#username').val(), password: $('#pass').val()};
	patron.clientId = parseInt(localStorage.clientId);		// select box
	patron.customerId = "-1";
	//dataIn.note = $('#note').val();

};



