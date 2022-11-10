/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions.products;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
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
import com.models.stripe.entities.EntProduct;

/**
 */
@WebServlet(name = "ProductUpdateMeta", urlPatterns = {"/ProductUpdateMeta"})
public class ProductsUpdateMeta extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntProduct uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> item = new HashMap<>();
	Map<String, Object> items = new HashMap<>();
	List<String> expandList = new LinkedList<>();
	Map<String, Object> productParams = new HashMap<>();
	Map<String, Object> attribs = new HashMap<>();
	Map<String, Object> metadata = new HashMap<>();
	Product entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntProduct.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		System.out.println("INF: Processing Product");
		productParams.clear();
		metadata.clear();

		if (uxPayload.getUrlShop().length() > 0) {
			metadata.put("urlShop", uxPayload.getUrlShop());
		}
		if (uxPayload.getUrlSocialYt().length() > 0) {
			metadata.put("urlSocialYt", uxPayload.getUrlSocialYt());
		}
		if (uxPayload.getUrlSocialFb().length() > 0) {
			metadata.put("urlSocialFb", uxPayload.getUrlSocialFb());
		}
		// what if 
		metadata.put("units", uxPayload.getUnits());
		// String
		if (uxPayload.getCost() > 0) {
			metadata.put("cost", uxPayload.getCost());
		}
//		if (uxPayload.getBookings().size() > 0) {
//			metadata.put("bookings", gson.toJson(uxPayload.getBookings()));
//		}

		productParams.put("metadata", metadata);

		try {

			if (uxPayload.getAccountId().length() > 0) {
				entity = Product.retrieve(uxPayload.getProductId(), auth);
				entity = entity.update(productParams, auth);
			} else {
				entity = Product.retrieve(uxPayload.getProductId());
				entity = entity.update(productParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("ERR: " + gson.toJson(uxPayload));
			Logger.getLogger(EntProduct.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processing Product Complete");
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
		uxPayload = new EntProduct();

		// Properties
		pr.init("env.comms.properties");
	}
}
