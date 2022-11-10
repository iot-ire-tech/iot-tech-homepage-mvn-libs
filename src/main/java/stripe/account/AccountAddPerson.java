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
import com.models.stripe.entities.EntCustomer;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountAddPerson", urlPatterns = {"/AccountAddPerson"})
public class AccountAddPerson extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntCustomer uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> accountParams = new HashMap<>();
	Map<String, Object> person_address = new HashMap<String, Object>();
	Map<String, Object> dob = new HashMap<String, Object>();
	Map<String, Object> person = new HashMap<String, Object>();
	Map<String, Object> person_relationship = new HashMap<String, Object>();
	Map<String, Object> person_verification = new HashMap<String, Object>();
	Map<String, Object> person_document = new HashMap<String, Object>();
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntCustomer.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		account = Account.retrieve(uxPayload.getAccountId());
		accountParams.clear();
		System.out.println("INF: Account Id (" + account.getId() + ")");

// Persons Account :https://stripe.com/docs/api/persons/create
		person.put("first_name", uxPayload.getPerson().getFirstName() + "-");
		person.put("last_name", uxPayload.getPerson().getLastName());
		person.put("email", uxPayload.getPerson().getEmail());
		person.put("ssn_last_4", "1234");

		person_address.put("city", "SIDNEY");
		person_address.put("country", "US");
		person_address.put("line1", "133 Terry Lane");
		person_address.put("line2", "Olive Branch");
		person_address.put("postal_code", "51652");
		person_address.put("state", "IOWA");
		person.put("address", person_address);

		dob.put("day", uxPayload.getPerson().getDob().getDay());
		dob.put("month", uxPayload.getPerson().getDob().getMonth());
		dob.put("year", uxPayload.getPerson().getDob().getYear());
		person.put("dob", dob);

//		person_relationship.put("account_opener", true);
//		person_relationship.put("director", true);
//		person_relationship.put("owner", true);
//		person_relationship.put("percent_ownership", "100");
//		person_relationship.put("title", "CEO");
//		person.put("relationship", person_relationship);
//		person.put("id_number", "PRSI11990");
//		person.put("phone", "(555) 678-1212");
		try {
			//  com.stripe.exception.InvalidRequestException: The same person cannot be provided on an account more than once. This person is identical to 'person_FlvbQzr9Vx7R24'
			account.persons().create(person);
			response.getOutputStream().print(account.toJson());

			try {
				account.update(accountParams);
				response.getOutputStream().print(account.toJson());
			} catch (StripeException ex) {
				System.out.println("ERR: " + ex.getMessage());
				response.getOutputStream().print(account.toJson());
				return;
			}
			//
		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			response.getOutputStream().print("{\"ERRMSG\":\"" + ex.getMessage() + "\"}");
			return;
		}

		response.getOutputStream().flush();
		System.out.println("INF: " + account.toJson());
		System.out.println("INF: Processed Person Added To Account Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddPerson.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddPerson.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new EntCustomer();

		// Properties
		pr.init("env.comms.properties");
	}
}
