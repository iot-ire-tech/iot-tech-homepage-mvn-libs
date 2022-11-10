/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

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
import com.models.stripe.entities.EntAddress;
import com.models.stripe.entities.EntCompany;
import com.models.stripe.entities.EntCustomer;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountAddCompanyProfile", urlPatterns = {"/AccountAddCompanyProfile"})
public class AccountAddCompanyProfile extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadAccountAddCompanyProfile uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> company = new HashMap<>();
	Map<String, Object> business_profile = new HashMap<>();

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		Account account = null;

		uxPayload = gson.fromJson(sb.toString(), UXPayloadAccountAddCompanyProfile.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		accountParams.clear();
		account = Account.retrieve(uxPayload.getCompany().getAccountId());
		System.out.println("INF: Account Id (" + account.getId() + ")");

		business_profile.put("business_type", "company");
		business_profile.put("mcc", "5734");
		business_profile.put("name", uxPayload.getCompany().getName()); // Comany Name
		business_profile.put("product_description", "SW services"); // Sector
		business_profile.put("support_email", uxPayload.getCompany().getEmail());
		business_profile.put("support_phone", uxPayload.getCompany().getPhone());
		business_profile.put("support_url", uxPayload.getCompany().getWebsite());
		business_profile.put("url", uxPayload.getCompany().getWebsite());

		accountParams.put("business_profile", business_profile);

		account.update(accountParams);

		response.getOutputStream().print(account.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyProfile.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyProfile.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new UXPayloadAccountAddCompanyProfile();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadAccountAddCompanyProfile {

	String id;
	EntAddress address;
	EntCustomer person;
	EntCompany company;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public EntAddress getAddress() {
		return address;
	}

	public void setAddress(EntAddress address) {
		this.address = address;
	}

	public EntCustomer getPerson() {
		return person;
	}

	public void setPerson(EntCustomer person) {
		this.person = person;
	}

	public EntCompany getCompany() {
		return company;
	}

	public void setCompany(EntCompany company) {
		this.company = company;
	}
}
