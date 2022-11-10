/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

import stripe.file.FileItNow;
import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import com.models.stripe.entities.connect.EntAccount;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountCreateWorks", urlPatterns = {"/AccountCreateWorks"})
public class AccountCreateWorks extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntAccount uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> company = new HashMap<>();
	Map<String, Object> business_profile = new HashMap<>();
	Map<String, Object> company_address = new HashMap<String, Object>();
	Map<String, Object> person_address = new HashMap<String, Object>();
	Map<String, Object> external_account = new HashMap<String, Object>();
	Map<String, Object> individual = new HashMap<String, Object>();
	Map<String, Object> individual_address = new HashMap<String, Object>();
	Map<String, Object> dob = new HashMap<String, Object>();
	Map<String, Object> settings = new HashMap<String, Object>();
	Map<String, Object> settings_card_payments = new HashMap<String, Object>();
	Map<String, Object> settings_card_payments_declineOn = new HashMap<String, Object>();
	Map<String, Object> tos_acceptance = new HashMap<String, Object>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		Account account = null;

		uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
		Stripe.apiKey = pr.setKey("key").getVal();

//			account = Account.retrieve("acct_1EhLFcBhBNfORHgl", null).delete();
// https://stripe.com/docs/connect/required-verification-information
// https://stripe.com/ie/connect/account-types
		accountParams.put("type", "custom");
		//accountParams.put("country", "US");
		accountParams.put("country", "IE");
		// Only for US
//		accountParams.put("requested_capabilities", Arrays.asList("card_payments"));
// https://stripe.com/docs/api/accounts/create
		account = Account.create(accountParams);
		accountParams.clear();
		System.out.println("INF: Account Id (" + account.getId() + ")");

		account = Account.retrieve(account.getId());

// Persons Account :https://stripe.com/docs/api/persons/create
		Map<String, Object> person = new HashMap<String, Object>();
		Map<String, Object> person_relationship = new HashMap<String, Object>();
		Map<String, Object> person_verification = new HashMap<String, Object>();
		Map<String, Object> person_document = new HashMap<String, Object>();
		person.put("first_name", "Jane");
		person.put("last_name", "Diaz II");
		person.put("email", "tonytest@yahoo.com");
		person.put("ssn_last_4", "1234");

		person_address.put("city", "SIDNEY");
		person_address.put("country", "US");
		person_address.put("line1", "133 Terry Lane");
		person_address.put("line2", "Olive Branch");
		person_address.put("postal_code", "51652");
		person_address.put("state", "IOWA");
		person.put("address", person_address);

		dob.put("day", "1");
		dob.put("month", "2");
		dob.put("year", "1972");
		person.put("dob", dob);
		person_relationship.put("account_opener", true);
		person_relationship.put("director", true);
		person_relationship.put("owner", true);
		person_relationship.put("percent_ownership", "100");
		person_relationship.put("title", "CEO");
		person.put("relationship", person_relationship);
// https://stripe.com/docs/file-upload
		if (false) {
			String fn = "";
			fn = getClass().getResource("/stripe/connect/account/code.png").getFile();
//		fn = getClass().getResource("/media/imgs/code.png").getFile();
			java.io.File f = new java.io.File(fn);

			final Map<String, Object> params = new HashMap<>();
			params.put("purpose", "identity_document");
			params.put("file", f);
			final com.stripe.model.File sfile = com.stripe.model.File.create(params);
			Logger.getLogger(FileItNow.class.getName()).log(Level.SEVERE, "INF: Stripe File I (" + sfile.getId() + ")");

			person_document.put("back", sfile.getId());
			person_document.put("front", sfile.getId());
			person_verification.put("document", person_document);
			person.put("verification", person_verification);
		}
		person.put("id_number", "PRSI11990");
		person.put("phone", "(555) 678-1212");
		account.persons().create(person);

// Update!!!
		accountParams.put("email", "bob@example.com");
		accountParams.put("business_type", "company");
//		accountParams.put("business_type", "individual");
		business_profile.put("mcc", "5734");
		business_profile.put("name", "abc inc");
		business_profile.put("product_description", "SW services");
		business_profile.put("support_email", "billing@iot-tech.ie");
		business_profile.put("support_phone", "(555) 678-1212");
		business_profile.put("support_url", "5734");
		business_profile.put("url", "https://sites.google.com/view/iottech/home?authuser=3");
		accountParams.put("business_profile", business_profile);

		if (false) {
			company_address.put("city", "SIDNEY");
			company_address.put("country", "US");
			company_address.put("line1", "133 Terry Lane");
			company_address.put("line2", "Olive Branch");
			company_address.put("postal_code", "51652");
			company_address.put("state", "IA");
		} else {

		}
		company.put("name", "IOT X");
		company.put("phone", "(555) 678-1212");
		company.put("tax_id", "00-77461070");
		company.put("tax_id_registrar", null);
		company.put("vat_id", null);
// Mandatory : Additional owners
		company.put("owners_provided", true);
		company.put("directors_provided", true);
		company.put("address", company_address);
		accountParams.put("company", company);

		external_account.put("object", "bank_account");
		external_account.put("country", "US");
		external_account.put("currency", "USD");
		external_account.put("account_holder_name", "Test Account");
		external_account.put("account_holder_type", "company");
// https://stripe.com/docs/connect/testing#account-numbers
		external_account.put("account_number", "000123456789");
		external_account.put("routing_number", "110000000");
//		external_account.put("routing_number", null);
		accountParams.put("external_account", external_account);

		individual_address.put("city", "SIDNEY");
		individual_address.put("country", "US");
		individual_address.put("line1", "133 Terry Lane");
		individual_address.put("line2", "Olive Branch");
		individual_address.put("postal_code", "51652");
		individual_address.put("state", "IOWA");
		individual.put("address", individual_address);

		settings_card_payments_declineOn.put("avs_failure", false);
		settings_card_payments_declineOn.put("cvc_failure", false);
		settings_card_payments.put("decline_on", settings_card_payments_declineOn);
		settings.put("card_payments", settings_card_payments);
		accountParams.put("settings", settings);

// https://stripe.com/docs/connect/updating-accounts#tos-acceptance
		tos_acceptance.put("date", (long) System.currentTimeMillis() / 1000L);
		tos_acceptance.put("ip", "79.97.73.251"); // request.getRemoteAddr()
		accountParams.put("tos_acceptance", tos_acceptance);

		account.update(accountParams);
// https://stripe.com/docs/api/accounts/create
		System.out.println("INF: Account Id (" + account.getId() + ")");
		System.out.println("INF: getCountry (" + account.getCountry() + ")");
		System.out.println("INF: getEmail (" + account.getEmail() + ")");
		System.out.println("INF: getType (" + account.getType() + ")");

		response.getOutputStream().print("{ "
			+ "\"id\": \"" + account.getId() + "\", "
			+ "\"country\": \"" + account.getCountry() + "\", "
			+ "\"email\": \"" + account.getEmail() + "\", "
			+ "\"type\": \"" + account.getType() + "\" "
			+ "}");
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountCreateWorks.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountCreateWorks.class.getName()).log(Level.SEVERE, null, ex);
		}

	}

	@Override
	public void init() throws ServletException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

		// Base Classs
		mailer = new MailCreditCardTransactionUx();
		mailer.setCcDate(dateFormat.format(date));
		mailer.setSubject("INF: Payment Services, Account Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new EntAccount();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadAccountOrg {

	String country;
	String businessUrl;
	String email;

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getBusinessUrl() {
		return businessUrl;
	}

	public void setBusinessUrl(String businessUrl) {
		this.businessUrl = businessUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
