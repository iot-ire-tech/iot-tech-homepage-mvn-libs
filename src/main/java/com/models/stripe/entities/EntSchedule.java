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
public class EntSchedule {

	int trialPeriodDays;
	String interval;
	String count;

	public String getInterval() {
		return interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public int getTrialPeriodDays() {
		return trialPeriodDays;
	}

	public void setTrialPeriodDays(int trialPeriodDays) {
		this.trialPeriodDays = trialPeriodDays;
	}

}
