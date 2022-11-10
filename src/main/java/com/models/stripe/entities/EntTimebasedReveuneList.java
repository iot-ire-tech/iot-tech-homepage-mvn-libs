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
public class EntTimebasedReveuneList {

	String inc = "";
	int time = 0;
	double cost = 0.00;
	String currency = "";
	String annotate = "";
	boolean bestprice = false;

	public EntTimebasedReveuneList(String inc, int time, double cost, String currency, String annotate, boolean bestprice) {
		this.inc = inc;
		this.time = time;
		this.cost = cost;
		this.currency = currency;
		this.annotate = annotate;
		this.bestprice = bestprice;

	}

	public String getAnnotate() {
		return annotate;
	}

	public void setAnnotate(String annotate) {
		this.annotate = annotate;
	}

	public String getInc() {
		return inc;
	}

	public void setInc(String inc) {
		this.inc = inc;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

}
