/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

/**
 *
 * @author ennisa
 */
public class EntSourceJuntion {

// push / pull methods to transfer payment from customer
	String flow = "";
// flow what a customer must do to authenticate a payment
	String customerAuthenticationFlow = "";
// is source reusable!
	String usage = "";
// Can we confirm charge now, or must we wait
	String chargeConfirmation = "";

	public String getCustomerAuthenticationFlow() {
		return customerAuthenticationFlow;
	}

	public void setCustomerAuthenticationFlow(String customerAuthenticationFlow) {
		this.customerAuthenticationFlow = customerAuthenticationFlow;
	}

	public String getChargeConfirmation() {
		return chargeConfirmation;
	}

	public void setChargeConfirmation(String chargeConfirmation) {
		this.chargeConfirmation = chargeConfirmation;
	}

	public String getFlow() {
		return flow;
	}

	public void setFlow(String flow) {
		this.flow = flow;
	}

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

}
