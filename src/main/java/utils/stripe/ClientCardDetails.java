/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package utils.stripe;

import com.stripe.Stripe;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ae
 */
public class ClientCardDetails {

	Token atoken;
	String apiKey;
	String token;
	String number;
	String expMonth;
	String expYear;
	String cvc;

	// Billing name and address
	String billingName = " Stripe";
	String billingAddressCountry = " United States,";
	String billingAddressZip = " 94111,";
	String billingAddressState = " CA,";
	String billingAddressLine1 = " 1234 Main Street,";
	String billingAddressCity = " San Francisco,";
	String billingAddressCountrycode = " US,";

	Map<String, Object> tokenParams = new HashMap<String, Object>();
	Map<String, Object> cardParams = new HashMap<String, Object>();

	public static void main(String[] args) throws StripeException {
		ClientCardDetails s = new ClientCardDetails();
		s.setApiKey("sk_test_PWxKayhQchfhGUlEaMT6DE8x");

		s.setNumber("4242424242424242");
		s.setExpMonth("3");
		s.setExpYear("2019");
		s.setCvc("314");

		s.getToken();

	}

	public String getToken() throws StripeException {

		try {
			Stripe.apiKey = getApiKey();

			cardParams.put("name", getBillingName());

			cardParams.put("address_line1", getBillingAddressLine1());
			// com.stripe.exception.InvalidRequestException: Received unknown parameter: card[address_c]; request-id
			cardParams.put("address_city", getBillingAddressCity());
			cardParams.put("address_zip", getBillingAddressZip());
			cardParams.put("address_country", getBillingAddressCountry());

			cardParams.put("number", getNumber());
			cardParams.put("exp_month", getExpMonth());
			cardParams.put("exp_year", getExpYear());
			cardParams.put("cvc", getCvc());

			tokenParams.put("card", cardParams);
			atoken = Token.create(tokenParams);
			System.out.println("INF : Token ID: (" + atoken.getId() + ")");

		} catch (AuthenticationException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		} catch (InvalidRequestException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		}

		return atoken.getId();
	}

	public String getTokenOrg() throws StripeException {

		try {
			Stripe.apiKey = getApiKey();

			cardParams.put("name", getBillingName());

			cardParams.put("address_line1", getBillingAddressLine1());
			// com.stripe.exception.InvalidRequestException: Received unknown parameter: card[address_c]; request-id
			cardParams.put("address_city", getBillingAddressCity());
			cardParams.put("address_zip", getBillingAddressZip());
			cardParams.put("address_country", getBillingAddressCountry());

			cardParams.put("number", getNumber());
			cardParams.put("exp_month", getExpMonth());
			cardParams.put("exp_year", getExpYear());
			cardParams.put("cvc", getCvc());

			tokenParams.put("card", cardParams);
			atoken = Token.create(tokenParams);
			System.out.println("INF : Token ID: (" + atoken.getId() + ")");

		} catch (AuthenticationException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		} catch (InvalidRequestException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		}

		return atoken.getId();
	}
// https://gist.github.com/tschaeff/d1793c1a565f45eed606ccfd52c3fc81

	public String genKeyExtra() throws StripeException {

		try {
			Stripe.apiKey = getApiKey();

			cardParams.put("number", getNumber());
			cardParams.put("exp_month", getExpMonth());
			cardParams.put("exp_year", getExpYear());
			cardParams.put("cvc", getCvc());

			cardParams.put("cvc", getCvc());

			tokenParams.put("card", cardParams);
			atoken = Token.create(tokenParams);
			System.out.println("INF : Token ID: (" + atoken.getId() + ")");

		} catch (AuthenticationException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		} catch (InvalidRequestException ex) {
			Logger.getLogger(ChargeByCard.class.getName()).log(Level.SEVERE, null, ex);
		}

		return atoken.getId();
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getExpMonth() {
		return expMonth;
	}

	public void setExpMonth(String expMonth) {
		this.expMonth = expMonth;
	}

	public String getExpYear() {
		return expYear;
	}

	public void setExpYear(String expYear) {
		this.expYear = expYear;
	}

	public String getCvc() {
		return cvc;
	}

	public void setCvc(String cvc) {
		this.cvc = cvc;
	}

	public String getBillingName() {
		return billingName;
	}

	public void setBillingName(String billingName) {
		this.billingName = billingName;
	}

	public String getBillingAddressCountry() {
		return billingAddressCountry;
	}

	public void setBillingAddressCountry(String billingAddressCountry) {
		this.billingAddressCountry = billingAddressCountry;
	}

	public String getBillingAddressZip() {
		return billingAddressZip;
	}

	public void setBillingAddressZip(String billingAddressZip) {
		this.billingAddressZip = billingAddressZip;
	}

	public String getBillingAddressState() {
		return billingAddressState;
	}

	public void setBillingAddressState(String billingAddressState) {
		this.billingAddressState = billingAddressState;
	}

	public String getBillingAddressLine1() {
		return billingAddressLine1;
	}

	public void setBillingAddressLine1(String billingAddressLine1) {
		this.billingAddressLine1 = billingAddressLine1;
	}

	public String getBillingAddressCity() {
		return billingAddressCity;
	}

	public void setBillingAddressCity(String billingAddressCity) {
		this.billingAddressCity = billingAddressCity;
	}

	public String getBillingAddressCountrycode() {
		return billingAddressCountrycode;
	}

	public void setBillingAddressCountrycode(String billingAddressCountrycode) {
		this.billingAddressCountrycode = billingAddressCountrycode;
	}

}
