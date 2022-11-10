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
import com.models.stripe.entities.EntAddress;

public class EntCompany {

	String name = "";
	String phone = "";
	String taxId = "";
	String vatId = "";
	boolean directorsProvided;
	boolean ownersProvided;
	EntVerification verification;
//	boolean taxIdProvided;
	EntAddress address;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getTaxId() {
		return taxId;
	}

	public void setTaxId(String taxId) {
		this.taxId = taxId;
	}

	public boolean isDirectorsProvided() {
		return directorsProvided;
	}

	public void setDirectorsProvided(boolean directorsProvided) {
		this.directorsProvided = directorsProvided;
	}

	public boolean isOwnersProvided() {
		return ownersProvided;
	}

	public void setOwnersProvided(boolean ownersProvided) {
		this.ownersProvided = ownersProvided;
	}

	public EntVerification getVerification() {
		return verification;
	}

	public void setVerification(EntVerification verification) {
		this.verification = verification;
	}

	public EntAddress getAddress() {
		return address;
	}

	public void setAddress(EntAddress address) {
		this.address = address;
	}

	public String getVatId() {
		return vatId;
	}

	public void setVatId(String vatId) {
		this.vatId = vatId;
	}

}
