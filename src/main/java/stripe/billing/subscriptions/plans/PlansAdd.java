/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions.plans;

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
import com.models.stripe.entities.EntPlan;

/**
 */
@WebServlet(name = "PlanAdd", urlPatterns = {"/PlanAdd"})
public class PlansAdd extends HttpServlet {

	String s;
	Gson gson;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntPlan uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> productParams = new HashMap<>();
	Map<String, Object> planParams = new HashMap<>();
	Plan entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}

		uxPayload = gson.fromJson(sb.toString(), EntPlan.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}

		System.out.println("INF: Processing Plan");
		planParams.clear();

		planParams.put("usage_type", uxPayload.getUsageType());
		if (!uxPayload.getScheme().isEmpty()) {
			planParams.put("billing_scheme", uxPayload.getScheme());
		}

		if (uxPayload.getTransaction().getAmountDec() > 0) {
			planParams.put("amount_decimal", uxPayload.getTransaction().getAmountDec());
		} else {
			planParams.put("amount", uxPayload.getTransaction().getAmount());
		}
		planParams.put("currency", uxPayload.getTransaction().getCurrency());

		planParams.put("interval", uxPayload.getSchedule().getInterval());
		planParams.put("interval_count", uxPayload.getSchedule().getCount());

		if (uxPayload.getSchedule().getTrialPeriodDays() > 0) {
			planParams.put("trial_period_days", uxPayload.getSchedule().getTrialPeriodDays());
		}

		planParams.put("nickname", uxPayload.getName());
		planParams.put("product", uxPayload.getProductId());

		try {

			if (uxPayload.getAccountId().length() > 0) {
				entity = Plan.create(planParams, auth);
			} else {
				entity = Plan.create(planParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("ERR: " + gson.toJson(uxPayload));
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			Logger.getLogger(PlansAdd.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processing Plan Completed");
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
		uxPayload = new EntPlan();

		// Properties
		pr.init("env.comms.properties");
	}
}
