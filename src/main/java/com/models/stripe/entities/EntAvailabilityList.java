/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

/**
 *
 * @author ennisa
 */
public class EntAvailabilityList {

	String dow = "";
	String ot = "";
	String ct = "";
	String annotate = "";

	public EntAvailabilityList() {
	}

	public EntAvailabilityList(String dow, String ot, String ct, String annotate) {
		this.dow = dow;
		this.ot = ot;
		this.ct = ct;
		this.annotate = annotate;

	}

	public String getDow() {
		return dow;
	}

	public String getAnnotate() {
		return annotate;
	}

	public void setAnnotate(String annotate) {
		this.annotate = annotate;
	}

	public void setDow(String dow) {
		this.dow = dow;
	}

	public String getOt() {
		return ot;
	}

	public void setOt(String ot) {
		this.ot = ot;
	}

	public String getCt() {
		return ct;
	}

	public void setCt(String ct) {
		this.ct = ct;
	}

}
