/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package utils.stripe;

import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import utils.maths.RandomInts;

/**
 *
 * @author ae
 */
public class ChargeByCard {
// Based on Customer Information Colected!!

	String destination;
	Map<String, Object> chargeParams = new HashMap<String, Object>();
	Map<String, String> metaParams = new HashMap<String, String>();
//
// Charge
	String token;
	int amount;
	String currency;
	String description;
	String email;
	String reference;

	Charge charge;

	// Meta
	String orderId;

	public static void main(String[] args) {

		try {
			ClientCardDetails client = new ClientCardDetails();
			client.setApiKey("sk_test_PWxKayhQchfhGUlEaMT6DE8x");

			client.setNumber("4242424242424242");
			client.setExpMonth("3");
			client.setExpYear("2019");
			client.setCvc("314");

			ChargeByCard p = new ChargeByCard();
			p.setAmount(100);
			p.setCurrency("eur");
			p.setDescription("This is one");
			p.setReference("Ref: None");
			p.setEmail("tonyennis@yahoo.com");
			p.setOrderId(new RandomInts(10000, 1000000) + "");

			p.setToken(client.getToken());

			p.create();

			ChargeResponse cr = new ChargeResponse(p.getCharge());
			System.out.println(cr.getStatus());
		} catch (StripeException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

// Charge the user's card:
	public void create() {

		try {
			chargeParams.put("amount", getAmount());
			chargeParams.put("currency", "eur");
			chargeParams.put("description", getDescription());
			chargeParams.put("statement_descriptor", getReference());
			chargeParams.put("receipt_email", getEmail());
			// C
			chargeParams.put("source", getToken());

			// If Meta...
			chargeParams.put("metadata", metaParams);

			setCharge(Charge.create(chargeParams));
		} catch (StripeException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		}

	}

	public void update(Map<String, String> metaParams) {
	}

	public void list(Map<String, String> metaParams) {
	}

	public void capture(Map<String, String> metaParams) {
	}

	public void addMeta(Map<String, String> metaParams) {
		metaParams.put("order_id", getOrderId());
	}

	public String getReference() {
		return reference;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Charge getCharge() {
		return charge;
	}

	public void setCharge(Charge charge) {
		this.charge = charge;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
