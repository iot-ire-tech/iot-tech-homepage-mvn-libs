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
import com.stripe.model.Person;
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
@WebServlet(name = "AccountAddIndividual", urlPatterns = {"/AccountAddIndividual"})
public class AccountAddIndividual extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntAccount uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> relationship = new HashMap<>();
	Map<String, Object> individual = new HashMap<>();
	Map<String, Object> roleIndividual = new HashMap<>();
	Map<String, Object> verification = new HashMap<>();
	Map<String, Object> document = new HashMap<>();
	Map<String, Object> additional_doc = new HashMap<>();
	Map<String, Object> dob = new HashMap<>();
	Map<String, Object> business_profile = new HashMap<>();
	Map<String, Object> address = new HashMap<>();
	Account account = null;
	Verification verf = new Verification();
	int retries = 3, i = 0;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
		if (uxPayload.getAccountId().length() > 0) {
			Stripe.apiKey = pr.setKey("key").getVal();
			account = Account.retrieve(uxPayload.getAccountId());
		} else {
			System.out.println("WRN: Cannot Update Platform Account");
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST, "Cannot retrieve account ID (" + uxPayload.getAccountId() + ")");
			response.getOutputStream().print(gson.toJson(uxPayload));
			response.getOutputStream().flush();
			return;
		}
		System.out.println("INF: Account Id (" + account.getId() + ")");

		accountParams.clear();
		accountParams.put("business_type", "individual");

		try {
			for (Person p : account.persons().autoPagingIterable()) {

				if (p.getRelationship().getRepresentative()) {
					p.delete();
					account.update(accountParams);
				}

				if (p.getRelationship().getDirector()) {
					p.delete();
					account.update(accountParams);

				}
				if (p.getRelationship().getOwner()) {
					p.delete();
					account.update(accountParams);
				}
				if (p.getRelationship().getExecutive()) {
					p.delete();
					account.update(accountParams);
				}
			}
		} catch (StripeException ex) {
			System.out.println("WRN: Person already deleted (" + ex.getMessage() + ")");
		}

		individual.clear();
		individual.put("first_name", uxPayload.getIndividual().getFirstName());
		individual.put("last_name", uxPayload.getIndividual().getLastName());
		individual.put("email", uxPayload.getIndividual().getEmail());
		individual.put("phone", uxPayload.getIndividual().getPhone());
		individual.put("gender", uxPayload.getIndividual().getGender());

//		if (!account.getIndividual().getIdNumberProvided()) {
		if (uxPayload.getIndividual().getIdNumber().length() > 0) {
			individual.put("id_number", uxPayload.getIndividual().getIdNumber());
		}
		dob.clear();
		dob.put("year", uxPayload.getIndividual().getDob().getYear());
		dob.put("month", uxPayload.getIndividual().getDob().getMonth());
		dob.put("day", uxPayload.getIndividual().getDob().getDay());
		individual.put("dob", dob);
		address.clear();
		address.put("line1", uxPayload.getIndividual().getAddress().getAddressLine1());
		address.put("postal_code", uxPayload.getIndividual().getAddress().getPostalCode());
		address.put("city", uxPayload.getIndividual().getAddress().getCity());
		address.put("state", uxPayload.getIndividual().getAddress().getState());
		address.put("country", uxPayload.getIndividual().getAddress().getCountry());
		individual.put("address", address);

		boolean currentDue = false;
		try {
			account = Account.retrieve(uxPayload.getAccountId());
			System.out.println("INF: Account Id (" + account.getId() + ")");

			for (String outstanding : account.getRequirements().getCurrentlyDue()) {
				System.out.println("INF: Currently Due (" + outstanding + ")");
				if (outstanding.contains("verification")) {
					currentDue = true;
				}
			}

		} catch (Exception ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		if (currentDue) {
			individual.put("verification",
				verf.addDocument(
					uxPayload.getIndividual().getVerification().getDocument().getFront().getFile(),
					uxPayload.getIndividual().getVerification().getDocument().getBack().getFile(), "identity_document"
				).addAdditional(
					uxPayload.getIndividual().getVerification().getAdditionaDocument().getFront().getFile(),
					uxPayload.getIndividual().getVerification().getAdditionaDocument().getBack().getFile(), "identity_document"
				).getVerification());
		}

		accountParams.put("individual", individual);

		business_profile.put("mcc", uxPayload.getBusinessProfile().getMcc()); // Sector
		business_profile.put("name", uxPayload.getBusinessProfile().getName()); // Sector
		business_profile.put("product_description", uxPayload.getBusinessProfile().getProductDescription()); // Sector
		business_profile.put("support_url", uxPayload.getBusinessProfile().getSupportUrl());
		business_profile.put("support_phone", uxPayload.getBusinessProfile().getSupportPhone());
		business_profile.put("url", uxPayload.getBusinessProfile().getUrl());
		accountParams.put("business_profile", business_profile);

		tryAgain:
		try {
			account.update(accountParams);
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());

			if (i <= retries) {
				System.out.println("ERR:  Possible Stripe Busy Error, Retrying# (" + i++ + ")");
				//	break tryAgain;
			}
			Logger.getLogger(AccountAddIndividual.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.setStatus(HttpServletResponse.SC_CREATED);
		response.getOutputStream().print(account.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddIndividual.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddIndividual.class.getName()).log(Level.SEVERE, null, ex);
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
		mailer.setSubject("INF: Account Details");
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
