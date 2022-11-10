/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;
import com.models.stripe.charge.EntTransaction;
import com.models.stripe.entities.connect.EntPerson;

/**
 *
 * @author ennisa bankAccountParams.put("country", "US"); bankAccountParams.put("currency", "usd"); bankAccountParams.put("account_holder_name", "#{Opus::Site::Docs::Constants::CARD_NAME}"); bankAccountParams.put("account_holder_type", "#{Opus::Site::Docs::Constants::ACCOUNT_HOLDER_TYPE}"); bankAccountParams.put("routing_number", "110000000"); bankAccountParams.put("account_number", "000123456789");
 */
public class EntBank extends EntIds {

	EntPerson person;
	EntTransaction transaction = new EntTransaction();
	String country = "";

	boolean defaultForCurrency;
	String accountHolderName = "";
	String accountHolderType = "";
	String accountNumber = "";

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public EntTransaction getTransaction() {
		return transaction;
	}

	public void setTransaction(EntTransaction transaction) {
		this.transaction = transaction;
	}

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

	public String getAccountHolderName() {
		return accountHolderName;
	}

	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}

	public String getAccountHolderType() {
		return accountHolderType;
	}

	public void setAccountHolderType(String accountHolderType) {
		this.accountHolderType = accountHolderType;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public boolean isDefaultForCurrency() {
		return defaultForCurrency;
	}

	public void setDefaultForCurrency(boolean defaultForCurrency) {
		this.defaultForCurrency = defaultForCurrency;
	}

}
