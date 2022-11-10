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
public class EntMailSubscriptions extends EntIds {

	String subscriptionTable = "";
	EntPerson person = new EntPerson();

	public String getSubscriptionTable() {
		return subscriptionTable;
	}

	public void setSubscriptionTable(String subscriptionTable) {
		this.subscriptionTable = subscriptionTable;
	}

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

}
