/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

/**
 *
 * @author ennisa
 */
public class EntCard extends EntIds {

	boolean customerCard;
	//String country;
	String number;
	String currency;
	String country;
	int year;
	int month;
	// Optional
	String name = "";
	String cvc = "";
	EntAddress address;

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public String getCvc() {
		return cvc;
	}

	public void setCvc(String cvc) {
		this.cvc = cvc;
	}

	public EntAddress getAddress() {
		return address;
	}

	public void setAddress(EntAddress address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isCustomerCard() {
		return customerCard;
	}

	public void setCustomerCard(boolean customerCard) {
		this.customerCard = customerCard;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
