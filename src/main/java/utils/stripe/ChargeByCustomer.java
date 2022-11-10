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
public class ChargeByCustomer {
// Based on Customer Information Colected!!

	Charge charge;
	String destination;
	Map<String, Object> chargeParams = new HashMap<String, Object>();
	Map<String, String> metaParams = new HashMap<String, String>();
//
// Charge
	String customerId;
	int amount;
	String currency;
	String description;
	String email;
	String reference;
// Charge Response!!1
	String id;

	// Meta
	String orderId;

	public static void main(String[] args) {
// Collect Client info to gen token
		ClientCardDetails client = new ClientCardDetails();
		client.setApiKey("sk_test_PWxKayhQchfhGUlEaMT6DE8x");

		client.setNumber("4242424242424242");
		client.setExpMonth("3");
		client.setExpYear("2020");
		client.setCvc("314");

// Create dummy customer/benefactor...
		Benefactor bene = new Benefactor();
// Add Meta
		bene.setMfname("Anthony");
		bene.setMlname("Ennis");
		bene.setMstreetLine1("19 kerlogue road");
		bene.setMstreetLine2("Ringsend");
		bene.setMcity("Dublin");
		bene.setMpostalCode("4");
		bene.setMcontact("Mum");
		bene.setMlanguage("EN");
		bene.setMregion("Leinster");
		bene.addMeta();

		bene.setEmail("tonyennis@yahoo.com");
		try {
			bene.setSource(client.getToken());
		} catch (StripeException ex) {
			Logger.getLogger(ChargeByCustomer.class.getName()).log(Level.SEVERE, null, ex);
		}
		bene.create();
		System.out.println("INF : Customer ID: (" + bene.getId() + ")");

// Charge customer
		ChargeByCustomer p = new ChargeByCustomer();
		p.setAmount(100);
		p.setCurrency("eur");
		p.setDescription("This is one");
		p.setReference("Ref: None");
		p.setEmail("tonyennis@yahoo.com");
		p.setOrderId(new RandomInts(10000, 1000000) + "");

		p.setCustomerId(bene.getId());
		p.create();

		ChargeResponse cr = new ChargeResponse(p.getCharge());
		System.out.println("INF: Charge ID: (" + cr.getChargeId() + ")");
		System.out.println("INF: Charge Status: (" + cr.getStatus() + ")");
	}

// Charge the customer:
	public void create() {

		try {
			chargeParams.put("amount", getAmount());
			chargeParams.put("currency", "eur");
			if (getDescription() != null) {
				chargeParams.put("description", getDescription());
			}
			if (getReference() != null) {
				chargeParams.put("statement_descriptor", getReference());
			}
			if (getEmail() != null) {
				chargeParams.put("receipt_email", getEmail());
			}

			// Customer ID
			chargeParams.put("customer", getCustomerId());

			// If Meta...
			if (metaParams.size() > 0) {
				chargeParams.put("metadata", metaParams);
			}

			setCharge(Charge.create(chargeParams));
		} catch (StripeException ex) {
			Logger.getLogger(ChargeByCustomer.class.getName()).log(Level.SEVERE, null, ex);
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

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
