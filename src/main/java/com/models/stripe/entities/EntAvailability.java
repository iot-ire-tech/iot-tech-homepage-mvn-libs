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
public class EntAvailability extends EntIds {

	String dow = "";
	int hod = 0;
	int mod = 0;
	int mins = 0;

	public EntAvailability() {
	}

	public EntAvailability(String dow, int hod, int mod, int mins) {
		this.dow = dow;
		this.hod = hod;
		this.mod = mod;
		this.mins = mins;

	}

	public String getDow() {
		return dow;
	}

	public void setDow(String dow) {
		this.dow = dow;
	}

	public int getHod() {
		return hod;
	}

	public void setHod(int hod) {
		this.hod = hod;
	}

	public int getMod() {
		return mod;
	}

	public void setMod(int mod) {
		this.mod = mod;
	}

	public int getMins() {
		return mins;
	}

	public void setMins(int mins) {
		this.mins = mins;
	}

}
