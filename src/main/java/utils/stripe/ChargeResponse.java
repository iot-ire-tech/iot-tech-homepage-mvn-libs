/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package utils.stripe;

import com.stripe.model.Charge;

/**
 *
 * @author ae
 */
// https://stripe.com/docs/api#create_charge-verification-responses
public class ChargeResponse extends Charge {

	Charge c;
	boolean cvs = false;
	boolean address = false;
	StringBuilder msg;
	String id;

	public ChargeResponse(Charge c) {
		this.c = c;

	}

	public boolean isVerfied() {

		c.getStatus().compareToIgnoreCase("succeeded");

		return true;
	}

	public String getChargeId() {
		return c.getId();
	}

	public String getStatus() {

		return this.c.getStatus();
	}

	public String getStatusMessage() {

		msg = new StringBuilder();
		msg.append("\n");
		msg.append("\n");
		msg.append("INF : Payment Message");
		msg.append("\n");
		msg.append("Status: " + this.c.getStatus());
		msg.append("\n");
		msg.append("Code: " + this.c.getFailureCode());
		msg.append("\n");
		msg.append("Message: " + this.c.getFailureCode());
		msg.append("\n");

		return msg.toString();

	}

};
