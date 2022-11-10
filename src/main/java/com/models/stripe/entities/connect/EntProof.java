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
public class EntProof {

	String file = "";
	String purpose = "";

	String details = "";
	String details_code = "";

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getDetails_code() {
		return details_code;
	}

	public void setDetails_code(String details_code) {
		this.details_code = details_code;
	}

}
