/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities.connect;

import com.models.enterprise.EntIds;

import java.util.List;

/**
 *
 * @author ennisa
 */
public class EntAccount extends EntIds {

	// Account Head
	String type;
	String phone;
	String email;
	String country;
	List<String> capabilities;

	// Account Biz/Indivual
	EntPerson director;
	EntPerson owner;
	EntPerson rep;
	EntPerson exec;
	EntIndividual individual;
	EntCompany company;
	EntBusinessProfile businessProfile;

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getCapabilities() {
		return capabilities;
	}

	public void setCapabilities(List<String> capabilities) {
		this.capabilities = capabilities;
	}

	public EntPerson getDirector() {
		return director;
	}

	public void setDirector(EntPerson director) {
		this.director = director;
	}

	public EntCompany getCompany() {
		return company;
	}

	public void setCompany(EntCompany company) {
		this.company = company;
	}

	public EntBusinessProfile getBusinessProfile() {
		return businessProfile;
	}

	public void setBusinessProfile(EntBusinessProfile businessProfile) {
		this.businessProfile = businessProfile;
	}

	public EntPerson getOwner() {
		return owner;
	}

	public void setOwner(EntPerson owner) {
		this.owner = owner;
	}

	public EntPerson getRep() {
		return rep;
	}

	public void setRep(EntPerson rep) {
		this.rep = rep;
	}

	public EntIndividual getIndividual() {
		return individual;
	}

	public void setIndividual(EntIndividual individual) {
		this.individual = individual;
	}

	public EntPerson getExec() {
		return exec;
	}

	public void setExec(EntPerson exec) {
		this.exec = exec;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
