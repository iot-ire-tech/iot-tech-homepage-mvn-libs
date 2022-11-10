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
@WebServlet(name = "AccountAddCompanyValidation", urlPatterns = {"/AccountAddCompanyValidation"})
public class AccountAddCompanyValidation extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntAccount uxPayload;
	Verification verf = new Verification();

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
	Map<String, Object> roleExecutive = new HashMap<>();
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

		boolean pastDue = false;
		boolean currentDue = false;
		boolean pendingDue = false;
		for (String outstanding : account.getRequirements().getPastDue()) {
			System.out.println("INF: Past Due (" + outstanding + ")");
			pastDue = true;
		}
		boolean companyVerificationDue = false;
		for (String outstanding : account.getRequirements().getCurrentlyDue()) {
			System.out.println("INF: Currently Due (" + outstanding + ")");
			if (outstanding.contains("company")) {
				companyVerificationDue = true;
			}
			currentDue = true;
		}
		for (String outstanding : account.getRequirements().getPendingVerification()) {
			System.out.println("INF: Pending Verification (" + outstanding + ")");
			pendingDue = true;
		}

		if (pastDue == true || currentDue == true || pendingDue == true) {
		}
		boolean hasDirector = false;
		boolean hasOwner = false;
		boolean hasRep = false;
		boolean hasExec = false;

		try {

			for (Person p : account.persons().autoPagingIterable()) {

				if (p.getRelationship().getDirector()) {
					p.delete();
					hasDirector = true;

				}
				if (p.getRelationship().getRepresentative()) {
					p.delete();
					hasRep = true;
				}
				if (p.getRelationship().getOwner()) {
					p.delete();
					hasOwner = true;
				}
				if (p.getRelationship().getExecutive()) {
					p.delete();
					hasExec = true;
				}
			}
		} catch (Exception ex) {
			System.out.println("INF:Persons Error Msg (" + ex.getMessage() + ")");

		}

		hasDirector = true;
		hasOwner = true;
		hasRep = true;
		hasExec = true;
		try {
			// An account can only have one representative.
			// If you want to change the representative, first remove the existing representative (person_H4TPFrYJUX7BaH) by setting relationship.representative=false and try again.
			// See https://support.stripe.com/questions/change-the-account-representative-for-connected-accounts for more information.; request-id: req_A1Djwfl1ln06D4

			//  person known as a representative must activate this connected account. This person must be a beneficial owner who is authorized to sign for the organization.
			// Indicate this relationship to Stripe by setting relationship[executive] to true, or relationship[owner] to true if the representative owns more than 25% of the company.
			if (hasRep) {
				// https://stripe.com/docs/api/persons/create#create_person-relationship-director
				relationship.clear();
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

				// R
				relationship.put("title", uxPayload.getRep().getRelationship().getTitle());
				// The representative must also be an executive or owner.
				relationship.put("representative", true);
				relationship.put("owner", true);
				roleRepresentative.put("relationship", relationship);

				verf = new Verification();
				roleRepresentative.put("verification",
					verf.addDocument(
						// Passport
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(),
						uxPayload.getCompany().getVerification().getDocument().getBack().getFile(), "identity_document"
					).addAdditionalFrontOnly(
						// A document showing address
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(), "identity_document"
					).getVerification()
				);
				account.persons().create(roleRepresentative);
				// only set after person is created.
				// https://stripe.com/docs/api/accounts/create#create_account-company-directors_provided
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}

		try {
			if (hasExec) {
				https://stripe.com/docs/api/persons/create#create_person-relationship-director
				relationship.clear();
				roleExecutive.put("first_name", uxPayload.getExec().getFirstName());
				roleExecutive.put("last_name", uxPayload.getExec().getLastName());
				roleExecutive.put("email", uxPayload.getExec().getEmail());
				roleExecutive.put("phone", uxPayload.getExec().getPhone());
				dob.put("year", uxPayload.getExec().getDob().getYear());
				dob.put("month", uxPayload.getExec().getDob().getMonth());
				dob.put("day", uxPayload.getExec().getDob().getDay());
				roleExecutive.put("dob", dob);
				address.put("city", uxPayload.getExec().getAddress().getCity());
				address.put("country", uxPayload.getExec().getAddress().getCountry());
				address.put("line1", uxPayload.getExec().getAddress().getAddressLine1());
				address.put("postal_code", uxPayload.getExec().getAddress().getPostalCode());
				address.put("state", uxPayload.getExec().getAddress().getState());
				roleExecutive.put("address", address);

				// R
				relationship.put("title", uxPayload.getExec().getRelationship().getTitle());
				relationship.put("executive", true);
				roleExecutive.put("relationship", relationship);
				verf = new Verification();
				roleExecutive.put("verification",
					verf.addDocument(
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(),
						uxPayload.getCompany().getVerification().getDocument().getBack().getFile(), "identity_document"
					).addAdditionalFrontOnly(
						// A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(), "identity_document"
					).getVerification()
				);
				account.persons().create(roleExecutive);
				company.put("executives_provided", true);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}
		try {
			if (hasDirector) {
				// https://stripe.com/docs/api/persons/create#create_person-relationship-director
				relationship.clear();
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

				// R
				relationship.put("title", uxPayload.getDirector().getRelationship().getTitle());
				relationship.put("director", true);
				roleDirector.put("relationship", relationship);

				verf = new Verification();
				roleDirector.put("verification",
					verf.addDocument(
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(),
						uxPayload.getCompany().getVerification().getDocument().getBack().getFile(), "identity_document"
					).addAdditionalFrontOnly(
						// A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(), "identity_document"
					).getVerification()
				);
				account.persons().create(roleDirector);
				// only set after person is created.
				// https://stripe.com/docs/api/accounts/create#create_account-company-directors_provided
				company.put("directors_provided", true);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}

		try {
			// An account can only have one representative.
			// If you want to change the representative, first remove the existing representative (person_H4TPFrYJUX7BaH) by setting relationship.representative=false and try again.
			// See https://support.stripe.com/questions/change-the-account-representative-for-connected-accounts for more information.; request-id: req_A1Djwfl1ln06D4

			if (hasOwner) {
				relationship.clear();
				roleOwner.put("first_name", uxPayload.getOwner().getFirstName());
				roleOwner.put("last_name", uxPayload.getOwner().getLastName());
				roleOwner.put("email", uxPayload.getOwner().getEmail());
				roleOwner.put("phone", uxPayload.getOwner().getPhone());
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

				// R
				relationship.put("title", uxPayload.getOwner().getRelationship().getTitle());
				relationship.put("owner", true);
				roleOwner.put("relationship", relationship);

				verf = new Verification();
				roleOwner.put("verification",
					verf.addDocument(
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(),
						uxPayload.getCompany().getVerification().getDocument().getBack().getFile(), "identity_document"
					).addAdditionalFrontOnly(
						// A document showing address, either a passport, local ID card, or utility bill from a well-known utility company.
						uxPayload.getCompany().getVerification().getDocument().getFront().getFile(), "identity_document"
					).getVerification()
				);
				account.persons().create(roleOwner);
				company.put("owners_provided", true);
			}
		} catch (StripeException ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
		}
		accountParams.put("company", company);

		try {
			account.update(accountParams);
		} catch (Exception ex) {
			System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
			System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
			System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
			Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
			// Try Again if Rate Limitiing Exception
//			break tryAgain;
			return;
		}
		response.getOutputStream().print(account.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Update Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyValidation.class
				.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);

		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyValidation.class
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

}
