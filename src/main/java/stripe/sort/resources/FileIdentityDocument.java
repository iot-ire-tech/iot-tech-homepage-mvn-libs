/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.sort.resources;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.net.URL;
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

/**
 * @author ennisa
 *
 *
 *
 */
@WebServlet(name = "FileIdentityDocument", urlPatterns = {"/FileIdentityDocument"})
public class FileIdentityDocument extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	UXPayloadFile uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Map<String, Object> entityParams = new HashMap<>();
	String accountIdConnect = "acct_1ElKMUEUIbzLqhwX"; 	// Test : Connect Account - Works
	String accountIdPlatform = "";				// Test : Connect Account - Works
	String accountId = accountIdPlatform;
	URL resource;
	String fn;
	com.stripe.model.File entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			response.setContentType("application/json;charset=UTF-8");
			sb = new StringBuilder();
			while ((s = request.getReader().readLine()) != null) {
				sb.append(s);
			}
			uxPayload = gson.fromJson(sb.toString(), UXPayloadFile.class);
			Stripe.apiKey = pr.setKey("key").getVal();
			if (accountId.length() > 0) {
				auth = RequestOptions.builder().setStripeAccount(accountId).build();
				System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
				System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
				System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

			}
			System.out.println("INF: Processed File(X) Starting");
// https://www.mkyong.com/java/java-read-a-file-from-resources-folder/
// https://stripe.com/docs/api/files/create
			entityParams.clear();

			// File must be in src/main/resources or src/test/resources
			// Remember is getResources, and its JAVA
			resource = getClass().getResource("//media//code.png"); // Works
			fn = resource.getFile();
			java.io.File f = new java.io.File(fn);
			entityParams.put("purpose", "identity_document");
			entityParams.put("file", f);
			entity = com.stripe.model.File.create(entityParams);
			responseLoad = entity.toJson();
			response.getOutputStream().print(responseLoad);
			System.out.println("INF: Processed File(X) Completed");

		} catch (StripeException ex) {
			response.getOutputStream().print("{ "
				+ "\"errorMsg\": \"" + ex.getMessage() + "\", "
				+ "\"status\": \"failed\" "
				+ "}");
			Logger.getLogger(FileIdentityDocument.class.getName()).log(Level.SEVERE, null, ex);
		}
		response.getOutputStream().flush();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);

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
		uxPayload = new UXPayloadFile();

		// Properties
		pr.init("env.comms.properties");
	}
}

class UXPayloadFile {

	String id;
	String reason;
	int amount;

}

/*

{
created: 1561661078,
filename: "code.png",
id: "file_1Eq2aIFOjjfpNUIxygUusJzp",
links: {
object: "list",
data: [ ],
has_more: false,
total_count: null,
url: "/v1/file_links?file=file_1Eq2aIFOjjfpNUIxygUusJzp",
count: null,
request_options: null,
request_params: null,
},
object: "file",
purpose: "identity_document",
size: 544,
title: null,
type: "png",
url: null,
}

 */
