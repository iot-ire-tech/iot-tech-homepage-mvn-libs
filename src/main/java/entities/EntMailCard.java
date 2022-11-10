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
public class EntMailCard extends EntIds {

	String number;
	String currency;
	String year;
	String month;
	String day;
	EntPerson person = new EntPerson();


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

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public EntPerson getPerson() {
		return person;
	}

	public void setPerson(EntPerson person) {
		this.person = person;
	}

}
