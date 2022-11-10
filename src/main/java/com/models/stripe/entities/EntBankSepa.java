/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

/**
 *
 * @author ennisa bankAccountParams.put("country", "US"); bankAccountParams.put("currency", "usd"); bankAccountParams.put("account_holder_name", "#{Opus::Site::Docs::Constants::CARD_NAME}"); bankAccountParams.put("account_holder_type", "#{Opus::Site::Docs::Constants::ACCOUNT_HOLDER_TYPE}"); bankAccountParams.put("routing_number", "110000000"); bankAccountParams.put("account_number", "000123456789");
 */
public class EntBankSepa extends EntIds {

	String accountHolderName;
	String accountHolderType;
	String accountNumber;
	String country;

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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}
