/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;
import com.models.stripe.charge.EntTransaction;

/**
 *
 * @author ennisa
 */
public class EntSource extends EntIds {

	String object;
	String type;
	String id;
	EntTransaction transaction;
	EntCard card;
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

	public EntCard getCard() {
		return card;
	}

	public void setCard(EntCard card) {
		this.card = card;
	}

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

}
