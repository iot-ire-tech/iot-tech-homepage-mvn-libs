/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class SalesRule extends Common {
	constructor(ctrl, msg) {
		super(ctrl, msg);
	}

// Test Layer
	isValid(type) {
		switch (type) {
			case "props":
				if (this.payload.name.length === 0)
					return false;
				break;
			default:
				return false;
				break;
		}
		return true;
	}

	uxUpdateNameTag() {
		this.payload.ux.pk.id = this.payload.pk.id
		this.payload.ux.name = this.payload.name
		return this;
	}
	queryBuilder(key) {
		this.queryMap = new Map();
		switch (key) {
			case "Q. List All?":
				this.query = {};
				this.queryMap.set(key, this.query);
				break;

			case "Q. By Id?":
				this.query = {"pk.id": this.payload.pk.id};
				this.queryMap.set(key, this.query);
				break;

//Alerts
			case "Q. By StockLevel?":
				this.query = {"props.stock.thresholds.low": this.payload}
				this.queryMap.set(key, this.query);
				break;

//Alerts
			case "Q. By Expiry Date?":
				this.query = {"props.timings.expiryTime.$date": this.payload}
				this.queryMap.set(key, this.query);
				break;

			case "Q. By Entry Time?":
				this.query = {"props.timings.startTime.$date": this.payload}
				this.queryMap.set(key, this.query);
				break;

//Alerts
			case "Q. By Typecast(highvalue)?":
				this.query = {"props.typecast.highvalue": this.payload}
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Typecast(fragile)?":
				this.query = {"props.typecast.highvalue": this.payload}
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Typecast(heavy)?":
				this.query = {"props.typecast.highvalue": this.payload}
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Typecast(selflife)?":
				this.query = {"props.typecast.highvalue": this.payload}
				this.queryMap.set(key, this.query);
				break;
			case "Q. By Typecast(large)?":
				this.query = {"props.typecast.highvalue": this.payload}
				this.queryMap.set(key, this.query);
				break;

//Alerts
			case "Q. By Alerts(sms)?":
				this.query = {"alerts.sms": this.payload}
				this.queryMap.set(key, this.query);
				break;

		}
		return this.queryMap.get(key);
	}

// Service Layer.
}



