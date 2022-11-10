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
@WebServlet(name = "AccountAddBusiness", urlPatterns = {"/AccountAddBusiness"})
public class AccountAddBusiness extends HttpServlet {

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
	Verification verf = new Verification();
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		accountParams.clear();
		dob.clear();

//		account = Account.retrieve("acct_1FVKzaEorBpR5gzM").delete();
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

		accountParams.put("business_type", "individual");

		// Start Of Indiviual
		// Start Of Indiviual
		// Start Of Indiviual
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
			address.put("country", "IE");
			address.put("line1", uxPayload.getRep().getAddress().getAddressLine1());
			address.put("state", uxPayload.getRep().getAddress().getState());
			roleRepresentative.put("address", address);

			relationship.put("title", uxPayload.getRep().getRelationship().getTitle());
			relationship.put("executive", uxPayload.getRep().getRelationship().isExecutive());
			relationship.put("representative", uxPayload.getRep().getRelationship().isRepresentative());
			roleRepresentative.put("relationship", relationship);
//			roleRepresentative.put("verification", addVerification(true));
			roleRepresentative.put("verification",
				verf.addDocument("front", "back", "identity_document")
					.addAdditional("front", "back", "identity_document").getVerification());
			account.persons().create(roleRepresentative);
		}
// account_opener
		relationship.clear();
		if (!hasOwner) {
			roleOwner.put("first_name", "Anto(Owner)");
			roleOwner.put("last_name", "Ennis.");
			roleOwner.put("email", "tonyennis@yahoo.com");
			roleOwner.put("phone", "(555) 678-1212");
			dob.put("year", 1972);
			dob.put("month", 12);
			dob.put("day", 2);
			roleOwner.put("dob", dob);
			address.put("city", "Dublin");
			address.put("country", "IE");
			address.put("line1", "48 tritonville road");
			address.put("postal_code", "40000");
			address.put("state", "D");
			roleOwner.put("address", address);
			relationship.put("title", "Herr Owner");
			relationship.put("owner", true);
			roleOwner.put("relationship", relationship);
//			roleOwner.put("verification", addVerification(true));
			roleOwner.put("verification", verf.addDocument("front", "back", "identity_document").addAdditional("front", "back", "identity_document").getVerification());
			account.persons().create(roleOwner);
		}
// Director
		relationship.clear();
		if (!hasDirector) {
			roleDirector.put("first_name", "Anto(Director)");
			roleDirector.put("last_name", "Ennis.");
			roleDirector.put("email", "tonyennis@yahoo.com");
			roleDirector.put("phone", "(555) 678-1212");
			dob.put("year", 1972);
			dob.put("month", 12);
			dob.put("day", 3);
			roleDirector.put("dob", dob);
			address.put("city", "Dublin");
			address.put("country", "IE");
			address.put("line1", "48 tritonville road");
			address.put("postal_code", "40000");
			address.put("state", "D");
			roleDirector.put("address", address);
			relationship.put("title", "Herr Director");
			relationship.put("director", true);
			roleDirector.put("relationship", relationship);
			account.persons().create(roleDirector);
		}

		address.put("city", "Dublin");
		address.put("line1", "48 tritonville road");
		address.put("state", "D");
		company.put("address", address);
//		((Map) accountParams.get("company")).put("address", address);

		company.put("name", "MyCompany");
		company.put("phone", "(555) 678-1212");
		company.put("tax_id", "00-77461070");
//		company.put("verification", addVerification(false));
		company.put("verification", verf.addDocument("front", "back", "identity_document").getVerification());
		company.put("directors_provided", true);
		company.put("owners_provided", true);
		accountParams.put("company", company);
		// End Of Company
		// End Of Company
		// End Of Company

		business_profile.put("mcc", "5734"); // Sector
		business_profile.put("name", "BusinessAccount"); // Sector
		business_profile.put("product_description", "SW services"); // Sector
		business_profile.put("support_url", "https://sites.google.com/view/iottech/home?authuser=3");
		business_profile.put("url", "https://sites.google.com/view/iottech/home?authuser=33");
		accountParams.put("business_profile", business_profile);

		try {
			account.update(accountParams);
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.getOutputStream().print(account.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddBusiness.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddBusiness.class.getName()).log(Level.SEVERE, null, ex);
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

			fn = getClass().getResource("/media/code.png").getFile();
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
			Logger.getLogger(AccountAddBusiness.class.getName()).log(Level.SEVERE, null, ex);
		}

		return verification;

	}
}
