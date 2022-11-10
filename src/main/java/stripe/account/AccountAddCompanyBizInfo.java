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
import com.models.stripe.entities.EntCompanyBizInfo;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
@WebServlet(name = "AccountAddCompanyBizInfo", urlPatterns = {"/AccountAddCompanyBizInfo"})
public class AccountAddCompanyBizInfo extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntCompanyBizInfo uxPayload;

	PropsReader pr = new PropsReader();
	HashMap<String, Object> accountParams = new HashMap<>();
	HashMap<String, Object> company = new HashMap<>();
	HashMap<String, Object> address = new HashMap<>();
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntCompanyBizInfo.class);
		Stripe.apiKey = pr.setKey("key").getVal();

		accountParams.clear();
//		account = Account.retrieve(uxPayload.getCompany().getAccountId());
		account = Account.retrieve("acct_1FG0S6L4EJM4TcRu");
		System.out.println("INF: Account Id (" + account.getId() + ")");

// Payouts are disabled for this account until missing business information is updated.
		company.clear();
		company.put("name", "IOT X");
		company.put("phone", "(555) 678-1212");
		company.put("tax_id", "00-77461070");
		company.put("tax_id_registrar", null);
		company.put("vat_id", null);
// Mandatory : Additional owners
		company.put("owners_provided", true);
		company.put("directors_provided", true);
		accountParams.put("company", company);

		address.clear();
		address.put("city", "Dublin");
		address.put("country", "IE");
		address.put("line1", "133 Terry Lane");
		address.put("line2", "Olive Branch");
		address.put("postal_code", "51652");
		address.put("state", "Dublin"); // County!!!
		((Map) accountParams.get("company")).put("address", address);

		try {
			account.update(accountParams);
		} catch (StripeException ex) {
			response.getOutputStream().print(account.toJson());
			response.getOutputStream().flush();
			System.out.println("INF: " + account.toJson());
			Logger.getLogger(AccountAddCompanyBizInfo.class.getName()).log(Level.SEVERE, null, ex);
		}
		System.out.println("INF: " + uxPayload.toString());
		System.out.println("INF: " + account.toJson());
		response.getOutputStream().print(account.toJson());
		response.getOutputStream().flush();

		System.out.println("INF: Processed Account Biz Info Completed");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyBizInfo.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (StripeException ex) {
			Logger.getLogger(AccountAddCompanyBizInfo.class.getName()).log(Level.SEVERE, null, ex);
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
		uxPayload = new EntCompanyBizInfo();

		// Properties
		pr.init("env.comms.properties");
	}
}
