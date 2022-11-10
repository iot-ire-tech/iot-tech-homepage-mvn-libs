/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions.plans;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Plan;
import com.stripe.net.RequestOptions;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import com.models.stripe.entities.EntPlan;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 */
@WebServlet(name = "PlanUpdate", urlPatterns = {"/PlanUpdate"})
public class PlanUpdate extends HttpServlet {
    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntPlan uxPayload;

    PropsReader pr = new PropsReader();
    Map<String, Object> productParams = new HashMap<>();
    Map<String, Object> planParams = new HashMap<>();
    Plan entity, entityOld;
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
            System.out.println("INF: Connect Account getApiKey (" + auth.getApiKey() + ")");
            System.out.println("INF: Connect Account getClientId (" + auth.getClientId() + ")");
            System.out.println("INF: Connect Account getStripeAccount (" + auth.getStripeAccount() + ")");

        }

        System.out.println("INF: Processing Plan");
        planParams.clear();
        try {
            if (uxPayload.getAccountId().length() > 0) {
                entity = Plan.retrieve(uxPayload.getPlanId(), auth);
            } else {
                entity = Plan.retrieve(uxPayload.getPlanId());
            }
        } catch (StripeException ex) {
            System.out.println("ERR: " + ex.getMessage());
            System.out.println("ERR: " + gson.toJson(uxPayload));
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            Logger.getLogger(PlanUpdate.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }

        planParams.put("active", uxPayload.isActive());

        try {

            if (uxPayload.getAccountId().length() > 0) {
                entity = entity.update(planParams, auth);
            } else {
                entity = entity.update(planParams);
            }

        } catch (StripeException ex) {
            System.out.println("ERR: " + ex.getMessage());
            System.out.println("ERR: " + gson.toJson(uxPayload));
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            Logger.getLogger(PlanUpdate.class.getName()).log(Level.SEVERE, null, ex);
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
