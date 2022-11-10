/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities.connect;

/**
 *
 * @author ennisa
 */
public class EntCapabilities {

	String cardPayments;
	String legacyPayments;
	String platformPayments;

	public String getCardPayments() {
		return cardPayments;
	}

	public void setCardPayments(String cardPayments) {
		this.cardPayments = cardPayments;
	}

	public String getLegacyPayments() {
		return legacyPayments;
	}

	public void setLegacyPayments(String legacyPayments) {
		this.legacyPayments = legacyPayments;
	}

	public String getPlatformPayments() {
		return platformPayments;
	}

	public void setPlatformPayments(String platformPayments) {
		this.platformPayments = platformPayments;
	}

}
