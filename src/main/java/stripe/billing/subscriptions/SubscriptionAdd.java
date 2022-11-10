/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Subscription;
import com.stripe.net.RequestOptions;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import com.models.stripe.entities.EntSubscription;

/**
 *
 */
@WebServlet(name = "SubscriptionAdd", urlPatterns = {"/SubscriptionAdd"})
public class SubscriptionAdd extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntSubscription uxPayload;

    PropsReader pr = new PropsReader();
    Map<String, Object> item = new HashMap<>();
    List<Object> items = new ArrayList<>();
    Map<String, Object> subParams = new HashMap<>();
    Charge charge;
    Subscription entity;

    RequestOptions auth;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        uxPayload = gson.fromJson(sb.toString(), EntSubscription.class);
        Stripe.apiKey = pr.setKey("key").getVal();
        if (uxPayload.getAccountId().length() > 0) {
            auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
            System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
            System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
            System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

        }
        System.out.println("INF: Processing Subscriptions");
        /// MANADTORY OPTONS
// Plan I am signing up too.
// Or Plans
        subParams.clear();
        item.clear();
        items.clear();

        //https://stackoverrun.com/ru/q/13607623
        if (uxPayload.getCustomerId().length() > 0) {
            subParams.put("customer", uxPayload.getCustomerId());
        }

        // Items here are plans, but can also be subscription items to a subsription!
        for (String planId : uxPayload.getPlanIds()) {
            item = new HashMap<>();
            item.put("plan", planId);
            items.add(item);
        }
        subParams.put("items", items);

        /// Optional OPTONS
        subParams.put("cancel_at_period_end", uxPayload.isCancelAtPeriodEnd());

// Collection Method
        if (uxPayload.getCollectionMethod().contentEquals("send_invoice")) {
            subParams.put("collection_method", uxPayload.getCollectionMethod());
            if (uxPayload.getDueDateDays() > 0) {
                subParams.put("days_until_due", uxPayload.getDueDateDays());
            }
        } else if (uxPayload.getCollectionMethod().contentEquals("charge_automatically")) {
            subParams.put("collection_method", uxPayload.getCollectionMethod());
        }

// Application Fee
        // Connect Accounts Only
        if (uxPayload.getAppFee() > 0) {
            subParams.put("application_fee_percent", uxPayload.getAppFee());
//			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
        }
// coupon
        if (!uxPayload.getCouponId().isEmpty()) {
            subParams.put("coupon", uxPayload.getCouponId());
        }

        if (uxPayload.isTrialFromPlan() == true) {
            subParams.put("trial_from_plan", uxPayload.isTrialFromPlan());
        }

        try {
            if (uxPayload.getAccountId().length() > 0) {
                entity = Subscription.create(subParams, auth);
            } else {
                entity = Subscription.create(subParams);
            }

        } catch (StripeException ex) {
            System.out.println("ERR: " + ex.getMessage());
            System.out.println("ERR: " + gson.toJson(uxPayload));
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            response.getOutputStream().flush();
            Logger.getLogger(EntSubscription.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();

        System.out.println("INF: Processing Connect Subscriptions Completed");
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
        uxPayload = new EntSubscription();

        // Properties
        pr.init("env.comms.properties");
    }
}
