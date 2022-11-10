/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions.products;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Product;
import com.stripe.net.RequestOptions;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import com.models.stripe.entities.EntTimebasedReveuneList;

/**
 * @author ennisa Customer objects allow you to perform recurring charges to track multiple charges, that are associated with the same customer.
 *
 * The API allows you to create, delete, and update your customers.
 *
 * You can retrieve individual customers as well as a list of all your customers
 *
 */
@WebServlet(name = "productsGetTimebasedRevenueList", urlPatterns = {"/productsGetTimebasedRevenueList"})
public class ProductsGetTimebaseRevenue extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntProduct uxPayload;
	String responseLoad;

	PropsReader pr = new PropsReader();
	Product entity;
	ArrayList<EntTimebasedReveuneList> timebasedReveune = new ArrayList<>();

	RequestOptions auth;
	Map<String, String> metadata;
	int rt = 0;
	Account account = null;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
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

			System.out.println("INF: Processed Product Get Starting");
			if (uxPayload.getAccountId().length() > 0) {
				entity = Product.retrieve(uxPayload.getProductId(), auth);
			} else {
				entity = Product.retrieve(uxPayload.getProductId());
			}
			// Key = billing_min_30, Value = 30 [mins] costs 0.6 EUR (good)
			// unitTime=15|costs=0.01|currency=EUR|annotate=sdfsdfsd)|inc=min)
			metadata = entity.getMetadata();

			timebasedReveune = new ArrayList<>();
			for (Map.Entry< String, String> entry : metadata.entrySet()) {
				System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
				if (entry.getKey().contains("billing_time_")) {
					// Check Incoming Day and Time
					// 1. Is day an opening Day?
					System.out.println("INF: Value: (" + entry.getValue() + ")");
					int time = Integer.parseInt(entry.getValue().split("__")[0].split("=")[1]);
					double cost = Double.parseDouble(entry.getValue().split("__")[1].split("=")[1]);
					String currency = entry.getValue().split("__")[2].split("=")[1];
					//String annotate = entry.getValue().split("__")[3].split("=")[1].toString().replaceAll("(", "").replaceAll(")", "");
					String annotate = entry.getValue().split("__")[3].split("=")[1];
					String inc = entry.getValue().split("__")[4].split("=")[1];
					boolean bestprice = Boolean.parseBoolean(entry.getValue().split("__")[5].split("=")[1]);

					timebasedReveune.add(new EntTimebasedReveuneList(inc, time, cost, currency, annotate, bestprice));
				}

			}

		} catch (StripeException ex) {
			response.getOutputStream().print(gson.toJson(entity));
			response.getOutputStream().flush();
			Logger.getLogger(ProductsGetTimebaseRevenue.class.getName()).log(Level.SEVERE, null, ex);
		}

		// Return Product Listings.
		System.out.println("INF: " + gson.toJson(uxPayload));
		response.getOutputStream().print(gson.toJson(timebasedReveune));
		response.getOutputStream().flush();

		System.out.println("INF: Processed Product Get Completed");
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
