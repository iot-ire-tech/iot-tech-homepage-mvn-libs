/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.file;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.net.RequestOptions;
import java.io.File;
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
import com.models.stripe.entities.EntFile;

/**
 *
 * @author ennisa
 */
@WebServlet(name = "FileIt", urlPatterns = {"/FileIt"})
public class FileItNow extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntFile uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	Map<String, Object> accountParams = new HashMap<>();
	final Map<String, Object> params = new HashMap<>();

	com.stripe.model.File entity;
	RequestOptions auth;
	Account account = null;
	String fn = "";
	File afile;
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		response.setContentType("image/png;charset=UTF-8");

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}

			uxPayload = gson.fromJson(sb.toString(), EntFile.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (uxPayload.getAccountId().length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");
			}

			System.out.println("INF: Processed File(X) Starting");
			fn = getClass().getResource(uxPayload.getPath()).getFile();
			afile = new File(fn);
			if (afile.exists()) {
				params.put("purpose", uxPayload.getPurpose());
				params.put("file", afile);

				if (uxPayload.getAccountId().length() > 0) {
					entity = com.stripe.model.File.create(params, auth);
				} else {
					entity = com.stripe.model.File.create(params);
				}
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("INF: Payload" + gson.toJson(uxPayload));
			Logger.getLogger(FileItNow.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}
		System.out.println("INF: Payload" + gson.toJson(uxPayload));
		System.out.println("INF: " + entity.toJson());
		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processed File(X) Completed");

	}

	@Override
	public void init() throws ServletException {

		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

		// Base Classs
		mailer = new MailCreditCardTransactionUx();
		mailer.setCcDate(dateFormat.format(date));
		mailer.setSubject("INF: Credit Services, Top Up Details");
		mailer.setFrom("billing@mybusinesspal.com");
		mailer.setFromAlias("IOT-Client-Admin");

		// Derived Class
		mailer.setTitle("MyBusinessPal.Com");
		gson = new Gson();
		sb = new StringBuilder();
		uxPayload = new EntFile();

		// Properties
		pr.init("env.comms.properties");
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Returns a short description of the servlet.
	 *
	 * @return a String containing servlet description
	 */
	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

}
