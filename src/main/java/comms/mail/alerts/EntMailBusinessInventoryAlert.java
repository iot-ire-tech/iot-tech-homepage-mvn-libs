/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.alerts;

import com.models.enterprise.EntIds;

/**
 *
 * @author ennisa
 */
public class EntMailBusinessInventoryAlert extends EntIds {

	String productName = "";
	String ts = "";
	String email = "";
	String sms = "";
	String overflow = "";
	String level = "";

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSms() {
		return sms;
	}

	public void setSms(String sms) {
		this.sms = sms;
	}

	public String getOverflow() {
		return overflow;
	}

	public void setOverflow(String overflow) {
		this.overflow = overflow;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
	}

}
