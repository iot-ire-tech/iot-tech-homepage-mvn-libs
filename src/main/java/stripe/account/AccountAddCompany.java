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
@WebServlet(name = "AccountAddCompany", urlPatterns = {"/AccountAddCompany"})
public class AccountAddCompany extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntAccount uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> company = new HashMap<>();
	Map<String, Object> verification = new HashMap<>();
	Map<String, Object> proof = new HashMap<>();
	Map<String, Object> additional_doc = new HashMap<>();
	Map<String, Object> dob = new HashMap<>();
	Map<String, Object> business_profile = new HashMap<>();
	Map<String, Object> address = new HashMap<>();
	Map<String, Object> relationship = new HashMap<>();
	Map<String, Object> roleDirector = new HashMap<>();
	Map<String, Object> roleOwner = new HashMap<>();
	Map<String, Object> roleRepresentative = new HashMap<>();
	Map<String, Object> subRelationship = new HashMap<>();

// Roles
	Map<String, Object> person = new HashMap<>();
	Map<String, Object> pDirector = new HashMap<>();
	Map<String, Object> pRep = new HashMap<>();
	Map<String, Object> pOwner = new HashMap<>();
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
		System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();
		dob.clear();

//		account = Account.retrieve("acct_1FWpcIDCzZnjfs8i").delete();
		account = Account.retrieve(uxPayload.getAccountId());
		System.out.println("INF: Account Id (" + account.getId() + ")");

		accountParams.put("business_type", "company");

		// Start Of Company
		// Start Of Company
		// Start Of Company
		boolean hasDirector = false;
		boolean hasOwner = false;
		boolean hasRep = false;
		for (Person p : account.persons().autoPagingIterable()) {
			if (p.getRelationship().getDirector()) {
				hasDirector = true;
			}
			if (p.getRelationship().getRepresentative()) {
				hasRep = true;
			}
			if (p.getRelationship().getOwner()) {
				hasOwner = true;
			}
		}

		try {
			relationship.clear();
			if (!hasRep) {

				roleRepresentative.put("first_name", uxPayload.getRep().getFirstName());
				roleRepresentative.put("last_name", uxPayload.getRep().getLastName());
				roleRepresentative.put("email", uxPayload.getRep().getEmail());
				roleRepresentative.put("phone", uxPayload.getRep().getPhone());
				dob.put("year", uxPayload.getRep().getDob().getYear());
				dob.put("month", uxPayload.getRep().getDob().getMonth());
				dob.put("day", uxPayload.getRep().getDob().getDay());
				roleRepresentative.put("dob", dob);
				address.put("city", uxPayload.getRep().getAddress().getCity());
				address.put("country", uxPayload.getRep().getAddress().getCountry());
				address.put("line1", uxPayload.getRep().getAddress().getAddressLine1());
				address.put("postal_code", uxPayload.getRep().getAddress().getPostalCode());
				address.put("state", uxPayload.getRep().getAddress().getState());
				roleRepresentative.put("address", address);
				relationship.put("title", uxPayload.getRep().getRelationship().getTitle());
				relationship.put("executive", true);
				relationship.put("representative", uxPayload.getRep().getRelationship().isRepresentative());
				roleRepresentative.put("relationship", relationship);
				roleRepresentative.put("verification", addVerification(true));
				account.persons().create(roleRepresentative);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}
// account_opener
		try {
			relationship.clear();
			if (!hasOwner) {
				roleOwner.put("first_name", uxPayload.getOwner().getFirstName());
				roleOwner.put("last_name", uxPayload.getOwner().getLastName());
				roleOwner.put("email", uxPayload.getOwner().getEmail());
				roleOwner.put("phone", uxPayload.getDirector().getPhone());
				dob.put("year", uxPayload.getOwner().getDob().getYear());
				dob.put("month", uxPayload.getOwner().getDob().getMonth());
				dob.put("day", uxPayload.getOwner().getDob().getDay());
				roleOwner.put("dob", dob);
				address.put("city", uxPayload.getOwner().getAddress().getCity());
				address.put("country", uxPayload.getOwner().getAddress().getCountry());
				address.put("line1", uxPayload.getOwner().getAddress().getAddressLine1());
				address.put("postal_code", uxPayload.getOwner().getAddress().getPostalCode());
				address.put("state", uxPayload.getOwner().getAddress().getState());
				roleOwner.put("address", address);

				relationship.put("title", uxPayload.getOwner().getRelationship().getTitle());
				relationship.put("owner", uxPayload.getOwner().getRelationship().isOwner());
				roleOwner.put("relationship", relationship);
				roleOwner.put("verification", addVerification(true));
				account.persons().create(roleOwner);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}
// Director
		try {

			relationship.clear();
			if (!hasDirector) {
				roleDirector.put("first_name", uxPayload.getDirector().getFirstName());
				roleDirector.put("last_name", uxPayload.getDirector().getLastName());
				roleDirector.put("email", uxPayload.getDirector().getEmail());
				roleDirector.put("phone", uxPayload.getDirector().getPhone());
				dob.put("year", uxPayload.getDirector().getDob().getYear());
				dob.put("month", uxPayload.getDirector().getDob().getMonth());
				dob.put("day", uxPayload.getDirector().getDob().getDay());
				roleDirector.put("dob", dob);
				address.put("city", uxPayload.getDirector().getAddress().getCity());
				address.put("country", uxPayload.getDirector().getAddress().getCountry());
				address.put("line1", uxPayload.getDirector().getAddress().getAddressLine1());
				address.put("postal_code", uxPayload.getDirector().getAddress().getPostalCode());
				address.put("state", uxPayload.getDirector().getAddress().getState());
				roleDirector.put("address", address);

				relationship.put("title", uxPayload.getDirector().getRelationship().getTitle());
				relationship.put("director", uxPayload.getDirector().getRelationship().isDirector());
				roleDirector.put("relationship", relationship);
				account.persons().create(roleDirector);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}

		address.put("city", uxPayload.getCompany().getAddress().getCity());
		address.put("line1", uxPayload.getCompany().getAddress().getAddressLine1());
		address.put("state", uxPayload.getCompany().getAddress().getState());
		company.put("address", address);
//		((Map) accountParams.get("company")).put("address", address);

		company.put("name", uxPayload.getCompany().getName());
		company.put("phone", uxPayload.getCompany().getPhone());
		company.put("tax_id", uxPayload.getCompany().getTaxId());
		company.put("verification", addVerification(false));
		company.put("directors_provided", uxPayload.getCompany().isDirectorsProvided());
		company.put("owners_provided", uxPayload.getCompany().isOwnersProvided());
		accountParams.put("company", company);
		// End Of Company
		// End Of Company
		// End Of Company

		business_profile.put("mcc", uxPayload.getBusinessProfile().getMcc()); // Sector
		business_profile.put("name", uxPayload.getBusinessProfile().getName()); // Sector
		business_profile.put("product_description", uxPayload.getBusinessProfile().getProductDescription()); // Sector
		business_profile.put("support_url", uxPayload.getBusinessProfile().getSupportUrl());
		business_profile.put("url", uxPayload.getBusinessProfile().getUrl());
		accountParams.put("business_profile", business_profile);

		tryAgain:
		try {
			account.update(accountParams);
		} catch (Exception ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
			// Try Again if Rate Limitiing Exception
			break tryAgain;
		}
		response.getOutputStream()
			.print(account.toJson());
		response.getOutputStream()
			.flush();

		System.out.println(
			"INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompany.class
				.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompany.class
				.getName()).log(Level.SEVERE, null, ex);
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

	public Map<String, Object> addVerification(boolean additionalDoc) {
		try {
			com.stripe.model.File sfile;
			Map<String, Object> params = new HashMap<>();
			java.io.File fh;
			String fn = "";
			proof.clear();
			verification.clear();

			fn = getClass().getResource("/media/code1.png").getFile();
			fh = new java.io.File(fn);
			params.clear();
			params.put("purpose", "identity_document");
			params.put("file", fh);
			sfile = com.stripe.model.File.create(params);
			proof.put("front", sfile.getId());

			fn = getClass().getResource("/media/code2.png").getFile();
			fh = new java.io.File(fn);
			params.clear();
			params.put("purpose", "identity_document");
			params.put("file", fh);
			sfile = com.stripe.model.File.create(params);
			proof.put("back", sfile.getId());

			verification.put("document", proof);

			//
			// Addmtional Doc
			//
			if (additionalDoc) {
				proof.clear();
				fn = getClass().getResource("/media/code3.png").getFile();
				fh = new java.io.File(fn);
				params.clear();
				params.put("purpose", "identity_document");
				params.put("file", fh);
				sfile = com.stripe.model.File.create(params);
				proof.put("front", sfile.getId());
				fn = getClass().getResource("/media/code4.png").getFile();
				fh = new java.io.File(fn);
				params.clear();
				params.put("purpose", "identity_document");
				params.put("file", fh);
				sfile = com.stripe.model.File.create(params);
				proof.put("back", sfile.getId());

				verification.put("additional_document", proof);

			}

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompany.class
				.getName()).log(Level.SEVERE, null, ex);
		}

		return verification;

	}
}
