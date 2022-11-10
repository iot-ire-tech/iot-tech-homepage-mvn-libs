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
 * @author ennisa
 */
public class EntSourceSepa extends EntIds {

	String type;
	String id;
	EntPerson person;
	EntTransaction transaction;
	EntBankSepa bank;
	EntSourceJuntion cc;

	public EntSourceJuntion getCc() {
		return cc;
	}

	public void setCc(EntSourceJuntion cc) {
		this.cc = cc;
	}

	public EntTransaction getTransaction() {
		return transaction;
	}

	public void setTransaction(EntTransaction transaction) {
		this.transaction = transaction;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public EntBankSepa getBank() {
		return bank;
	}

	public void setBank(EntBankSepa bank) {
		this.bank = bank;
	}

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

}
