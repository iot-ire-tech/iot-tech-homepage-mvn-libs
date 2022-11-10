/*
 # Leading Motivatoins for concept
 new money in what to do
 money out what to do

 #roles / duties
 Admin - key owner
 Accountant - accounts payable / recieveable.
 accountsRecievable
 accountsPaid

 clientPct
 patronPct
 freq
 # amounts
 billing key!!
 */




class BillEngine {
	constructor() {
//		this.bill = billObj;
		this.total = 0;
		// Does this RESET all previous values!!!
		return this;
	}
// Associations
	setPatron(patron) {
		this.patron = patron;
		return this;
	}
	getPatron() {
		return this.patron;
	}
// UX Service
// When modifing branding, you can pull up a list box with this heading.
	setTagLine() {
	}
// Test Service
// 1. Logic Statements
	isValidate() {
		return this;
	}
// Main Service
// Given a bill, need to process it, then hand it to payments to make it happen
	setDue(due) {
		this.due = due;
		return this;
	}
	getDue(due) {
		return this.due;
	}
	setVat(vat) {
		this.vat = vat;
		return this;
	}
	setDiscount(discount) {
		this.discount = discount;
		return this;
	}
	setCredit(credit) {
		this.credit = credit;
		return this;
	}
	getCredit() {
		return this.credit;
	}
	setPenality(penality) {
		this.penality = penality;
		return this;
	}
	setService(service) {
		this.service = service;
		return this;
	}
	setTotal(total) {
		this.total = total;
		return this;
	}
	getTotal() {
		return this.total;
	}

	toString() {

		//console.log("INF: due : %s", this.due);
		//console.log("INF: service : %s", this.service);
		//console.log("INF: vat : %s", this.vat);
		//console.log("INF: penality : %s", this.penality);
		//console.log("INF: discount : %s", this.discount);
		//console.log("INF: credit : %s", this.credit);
		return this;
	}
	compute() {

		this.total = this.due;
		this.total += this.service;
		this.total += this.vat;
		this.total += this.penality;
		this.total -= this.discount;
		this.total -= this.credit;
		return {
			"status": "unpaid",
			"due": this.due,
			"service": this.service,
			"vat": this.vat,
			"penality": this.penality,
			"discount": this.discount,
			"credit": this.credit,
			"total": this.total
		};
	}

}



//# sourceURL=finance_billingengine_srv.js