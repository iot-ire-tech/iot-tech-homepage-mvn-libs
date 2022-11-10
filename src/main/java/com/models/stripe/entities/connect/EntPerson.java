/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities.connect;

import com.models.stripe.entities.EntAddress;
import com.models.stripe.entities.EntDob;

/**
 *
 * @author ennisa
 */
public class EntPerson {

	String fullName = "";
	String firstName = "";
	String lastName = "";
	String email = "";
	String phone = "";
	String sex = "";
	EntDob dob = new EntDob();
	EntAddress address = new EntAddress();
	EntVerification verification = new EntVerification();
	EntRelationship relationship = new EntRelationship();

	public String getFullName() {
		return this.firstName + " " + this.lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public EntDob getDob() {
		return dob;
	}

	public void setDob(EntDob dob) {
		this.dob = dob;
	}

	public EntAddress getAddress() {
		return address;
	}

	public void setAddress(EntAddress address) {
		this.address = address;
	}

	public EntVerification getVerification() {
		return verification;
	}

	public void setVerification(EntVerification verification) {
		this.verification = verification;
	}

	public EntRelationship getRelationship() {
		return relationship;
	}

	public void setRelationship(EntRelationship relationship) {
		this.relationship = relationship;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

}
