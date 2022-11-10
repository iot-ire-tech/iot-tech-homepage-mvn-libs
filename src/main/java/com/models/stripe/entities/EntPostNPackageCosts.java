/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

/**
 *
 * @author ennisa To charge a credit card or other payment source, you create a Charge object. Rule If your API key is in test mode, the supplied payment source (e.g., card) won’t actually be charged, although everything else will occur as if in live mode. (Stripe assumes that the charge would have completed successfully).
 */
public class EntPostNPackageCosts {

	double cost = 0.00;
	String grade = "";
	String currency = "";
	String annotate = "";

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getAnnotate() {
		return annotate;
	}

	public void setAnnotate(String annotate) {
		this.annotate = annotate;
	}

}
