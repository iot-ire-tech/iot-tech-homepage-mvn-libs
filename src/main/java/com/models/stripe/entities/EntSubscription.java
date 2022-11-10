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
public class EntSubscription extends EntIds {

	int limit;
	boolean prorate;
	boolean invoiceNow;

	String status;
// Cancel
	boolean cancelAtPeriodEnd = false;
	String collectionMethod = "";
	int dueDateDays = 0;

// Create
	float appFee = (float) 0.00;

	boolean trialFromPlan = false;

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCollectionMethod() {
		return collectionMethod;
	}

	public void setCollectionMethod(String collectionMethod) {
		this.collectionMethod = collectionMethod;
	}

	public boolean isProrate() {
		return prorate;
	}

	public void setProrate(boolean prorate) {
		this.prorate = prorate;
	}

	public boolean isInvoiceNow() {
		return invoiceNow;
	}

	public void setInvoiceNow(boolean invoiceNow) {
		this.invoiceNow = invoiceNow;
	}

	public boolean isCancelAtPeriodEnd() {
		return cancelAtPeriodEnd;
	}

	public void setCancelAtPeriodEnd(boolean cancelAtPeriodEnd) {
		this.cancelAtPeriodEnd = cancelAtPeriodEnd;
	}

	public float getAppFee() {
		return appFee;
	}

	public void setAppFee(float appFee) {
		this.appFee = appFee;
	}

	public int getDueDateDays() {
		return dueDateDays;
	}

	public void setDueDateDays(int dueDateDays) {
		this.dueDateDays = dueDateDays;
	}

	public boolean isTrialFromPlan() {
		return trialFromPlan;
	}

	public void setTrialFromPlan(boolean trialFromPlan) {
		this.trialFromPlan = trialFromPlan;
	}

}
