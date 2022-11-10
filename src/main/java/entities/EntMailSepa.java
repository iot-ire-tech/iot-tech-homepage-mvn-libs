/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import com.models.enterprise.EntIds;
import com.models.stripe.entities.connect.EntPerson;

/**
 *
 * @author ennisa
 */
public class EntMailSepa extends EntIds {

	String accountHolderName;
	String accountHolderType;
	String accountNumber;
	String country;
	EntPerson person = new EntPerson();

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

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

}
