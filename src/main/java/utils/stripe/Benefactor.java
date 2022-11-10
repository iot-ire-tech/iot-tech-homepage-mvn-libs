/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package utils.stripe;

import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ae
 */
// https://stripe.com/docs/saving-cards
public class Benefactor implements I_Charge {

	String id;

	Map<String, Object> chargeParams = new HashMap<>();
	Map<String, Object> metaData = new HashMap<>();
	Customer c;

	// Meta Params
	String mfname;
	String mlname;
	String mcontact;
	String mstreetLine1;
	String mstreetLine2;
	String mcity;
	String mregion;
	String mpostalCode;
	String mcountry;
	String mlanguage;

	// Customer Params
	String source;
	String email;
	String description;
	String balance;
	String discount;
	String lastResponse;
	String liveMode;
	String shipping;

	Benefactor charge;
	CustomerCollection collection;

	public static void main(String[] args) {
		ClientCardDetails s = new ClientCardDetails();
		s.setApiKey("sk_test_PWxKayhQchfhGUlEaMT6DE8x");
		s.setNumber("4242424242424242");
		s.setExpMonth("3");
		s.setExpYear("2019");
		s.setCvc("314");

		Benefactor c = new Benefactor();
		// Add Meta
		c.setMfname("Anthony");
		c.setMlname("Ennis");
		c.setMcity("Dublin");
		c.addMeta();
		// Add Basic
		c.setEmail("tonyennis@yahoo.com");
		try {
			c.setSource(s.getToken());
		} catch (StripeException ex) {
			Logger.getLogger(Benefactor.class.getName()).log(Level.SEVERE, null, ex);
		}
		c.create();

		System.out.println("INF : Customer ID: (" + c.getId() + ")");

	}

	public void addMeta() {

		metaData.put("first_name", getMfname());
		metaData.put("last_name", getMlname());
		metaData.put("city", getMcity());
		metaData.put("contact_person", getMcontact());
		metaData.put("country", getMcountry());
		metaData.put("language", getMlanguage());
		metaData.put("postal_code", getMpostalCode());
		metaData.put("region", getMregion());
		metaData.put("street_line_1", getMstreetLine1());
		metaData.put("street_line_2", getMstreetLine2());

	}

	// Create a Customer:
	public void create() {

		//	chargeParams.put("source", "tok_mastercard");
		chargeParams.put("source", getSource());
		chargeParams.put("email", getEmail());
		chargeParams.put("email", getEmail());

		chargeParams.put("metadata", getMetaData());

		try {
			c = Customer.create(chargeParams);
		} catch (StripeException ex) {
			Logger.getLogger(Benefactor.class.getName()).log(Level.SEVERE, null, ex);
		}
		setId(c.getId());

	}

	public Benefactor loadCustomer() {
		try {
			c = Customer.retrieve(getId());
			return this;
		} catch (StripeException ex) {
			Logger.getLogger(Benefactor.class.getName()).log(Level.SEVERE, null, ex);
		}
		return this;
	}

	public String getId() {
		return id;
	}

	public Benefactor setId(String id) {
		this.id = id;
		return this;
	}

	public Customer getCustomer() {
		return c;
	}

	public void setCustomer(Customer customer) {
		this.c = customer;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getLastResponse() {
		return lastResponse;
	}

	public void setLastResponse(String lastResponse) {
		this.lastResponse = lastResponse;
	}

	public String getLiveMode() {
		return liveMode;
	}

	public void setLiveMode(String liveMode) {
		this.liveMode = liveMode;
	}

	public String getShipping() {
		return shipping;
	}

	public void setShipping(String shipping) {
		this.shipping = shipping;
	}

	public Benefactor getCharge() {
		return charge;
	}

	public void setCharge(Benefactor charge) {
		this.charge = charge;
	}

	public CustomerCollection getCollection() {
		return collection;
	}

	public void setCollection(CustomerCollection collection) {
		this.collection = collection;
	}

	public Map<String, Object> getMetaData() {
		return metaData;
	}

	public String getMfname() {
		return mfname;
	}

	public void setMfname(String mfname) {
		this.mfname = mfname;
	}

	public String getMlname() {
		return mlname;
	}

	public void setMlname(String mlname) {
		this.mlname = mlname;
	}

	public String getMcontact() {
		return mcontact;
	}

	public void setMcontact(String mcontact) {
		this.mcontact = mcontact;
	}

	public String getMstreetLine1() {
		return mstreetLine1;
	}

	public void setMstreetLine1(String mstreetLine1) {
		this.mstreetLine1 = mstreetLine1;
	}

	public String getMstreetLine2() {
		return mstreetLine2;
	}

	public void setMstreetLine2(String mstreetLine2) {
		this.mstreetLine2 = mstreetLine2;
	}

	public String getMcity() {
		return mcity;
	}

	public void setMcity(String mcity) {
		this.mcity = mcity;
	}

	public String getMregion() {
		return mregion;
	}

	public void setMregion(String mregion) {
		this.mregion = mregion;
	}

	public String getMpostalCode() {
		return mpostalCode;
	}

	public void setMpostalCode(String mpostalCode) {
		this.mpostalCode = mpostalCode;
	}

	public String getMcountry() {
		return mcountry;
	}

	public void setMcountry(String mcountry) {
		this.mcountry = mcountry;
	}

	public String getMlanguage() {
		return mlanguage;
	}

	public void setMlanguage(String mlanguage) {
		this.mlanguage = mlanguage;
	}

}
