/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import java.util.ArrayList;

/**
 *
 * @author ennisa
 */
public class EntBooking {

	int startTimeMins = 0;
	int unitsRemaining = 0;
	ArrayList<BookingItems> items = new ArrayList<>();

	public int getUnitsRemaining() {
		return unitsRemaining;
	}

	public void setUnitsRemaining(int unitsRemaining) {
		this.unitsRemaining = unitsRemaining;
	}

	public int getStartTimeMins() {
		return startTimeMins;
	}

	public void setStartTimeMins(int startTimeMins) {
		this.startTimeMins = startTimeMins;
	}

	public ArrayList<BookingItems> getItems() {
		return items;
	}

	public void setItems(ArrayList<BookingItems> items) {
		this.items = items;
	}

}

class BookingItems {

	int id = 0;
	boolean paid = false;
	int endTimeMins = 0;
	String alerts = "";
	String reminders = "";
	String comms = "";

	BookingItems() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public int getEndTimeMins() {
		return endTimeMins;
	}

	public void setEndTimeMins(int endTimeMins) {
		this.endTimeMins = endTimeMins;
	}

	public String getAlerts() {
		return alerts;
	}

	public void setAlerts(String alerts) {
		this.alerts = alerts;
	}

	public String getReminders() {
		return reminders;
	}

	public void setReminders(String reminders) {
		this.reminders = reminders;
	}

	public String getComms() {
		return comms;
	}

	public void setComms(String comms) {
		this.comms = comms;
	}

}
