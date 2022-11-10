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
public class EntAvailabilityStatus {

	boolean status = false;
	String reason = "";

	public EntAvailabilityStatus() {
	}

	public EntAvailabilityStatus(boolean status, String reason) {
		this.status = status;
		this.reason = reason;

	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
