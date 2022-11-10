/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.coupons;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Coupon;
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
import stripe.sources.SourceSepa;
import com.models.stripe.entities.EntCoupon;

/**
 *
 */
@WebServlet(name = "CouponsAdd", urlPatterns = {"/CouponsAdd"})
public class Coupons extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntCoupon uxPayload;

    PropsReader pr = new PropsReader();
    Map<String, Object> entityParams = new HashMap<>();
    Coupon entity;

    // Create a subscription on a connected account by performing a standard create subscription call while authenticated as the connected account.
// Again, both the customer and the plan must be defined on the connected account for this to work.
    RequestOptions auth;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        System.out.println("INF: Processing Coupon");
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }

        uxPayload = gson.fromJson(sb.toString(), EntCoupon.class);
        Stripe.apiKey = pr.setKey("key").getVal();
        if (uxPayload.getAccountId().length() > 0) {
            auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
            System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
            System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
            System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

        }
        entityParams.clear();
        if (uxPayload.getName().length() > 0) {
            entityParams.put("name", uxPayload.getName());
        }

		/*
		Time
		 */
        if (uxPayload.getRedeemBy() > 0) {
            entityParams.put("redeem_by", uxPayload.getRedeemBy());
        }

        if (uxPayload.getDuration().contains("once")) {
            entityParams.put("duration", uxPayload.getDuration());
        } else {
            entityParams.put("duration", uxPayload.getDuration());
            entityParams.put("duration_in_months", uxPayload.getDurationInMonths());
        }

		/*
			Money
		 */
        if (uxPayload.getAmountOff() > 0) {
            entityParams.put("amount_off", uxPayload.getAmountOff());
            entityParams.put("currency", uxPayload.getCurrency());
        } else {
            entityParams.put("percent_off", uxPayload.getPercentageOff());
        }
        if (uxPayload.getTimesRedeemed() > 0) {
            entityParams.put("max_redemptions", uxPayload.getTimesRedeemed());
        }

//		entityParams.put("id", uxPayload.getCouponId());
        try {
            if (uxPayload.getAccountId().length() > 0) {
                entity = Coupon.create(entityParams, auth);
            } else {
                entity = Coupon.create(entityParams);
            }
        } catch (StripeException ex) {
            System.out.println("ERR: Error Message: " + ex.getMessage());
            System.out.println("ERR: Payload: " + gson.toJson(uxPayload));
            Logger.getLogger(SourceSepa.class.getName()).log(Level.SEVERE, null, ex);
            response.sendError(HttpServletResponse.SC_BAD_GATEWAY, ex.getMessage());
            response.getOutputStream().flush();
            return;
        }
        response.getOutputStream().print(entity.toJson());
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
        uxPayload = new EntCoupon();

        // Properties
        pr.init("env.comms.properties");
    }
}
