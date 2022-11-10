/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import com.models.enterprise.EntIds;
import com.models.stripe.entities.connect.EntAccount;
import com.models.stripe.entities.connect.EntPerson;

/**
 *
 * @author ennisa
 */
public class EntMailLegalIndi extends EntIds {

	String ts;
	EntAccount account = new EntAccount();
	EntPerson person = new EntPerson();

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
	}

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

	public EntAccount getAccount() {
		return account;
	}

	public void setAccount(EntAccount account) {
		this.account = account;
	}

}
