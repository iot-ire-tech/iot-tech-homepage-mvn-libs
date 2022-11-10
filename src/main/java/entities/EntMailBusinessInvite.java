/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import com.models.enterprise.EntIds;

/**
 *
 * @author ennisa
 */
public class EntMailBusinessInvite extends EntIds {

	String fname = "";
	String lname = "";
	String fullName = "";
	String bizName = "";
	String website = "";
	String emailInvitee = "";
	String emailInviter = "";
	boolean shopping;
	boolean events;
	boolean activities;
	String greetingmsg = "";

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getEmailInvitee() {
		return emailInvitee;
	}

	public void setEmailInvitee(String emailInvitee) {
		this.emailInvitee = emailInvitee;
	}

	public String getEmailInviter() {
		return emailInviter;
	}

	public void setEmailInviter(String emailInviter) {
		this.emailInviter = emailInviter;
	}

	public boolean isShopping() {
		return shopping;
	}

	public void setShopping(boolean shopping) {
		this.shopping = shopping;
	}

	public boolean isEvents() {
		return events;
	}

	public void setEvents(boolean events) {
		this.events = events;
	}

	public boolean isActivities() {
		return activities;
	}

	public void setActivities(boolean activities) {
		this.activities = activities;
	}

	public String getGreetingmsg() {
		return greetingmsg;
	}

	public void setGreetingmsg(String greetingmsg) {
		this.greetingmsg = greetingmsg;
	}

	public String getFullName() {
		return fname + " " + lname;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getBizName() {
		return bizName;
	}

	public void setBizName(String bizName) {
		this.bizName = bizName;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

}
