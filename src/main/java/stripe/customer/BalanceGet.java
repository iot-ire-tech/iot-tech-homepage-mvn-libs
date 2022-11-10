/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.customer;

import com.google.gson.Gson;
import com.models.enterprise.EntIds;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
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

/**
 * @author ennisa Customer objects allow you to perform recurring charges to track multiple charges, that are associated with the same customer.
 */
@WebServlet(name = "BalanceGet", urlPatterns = {"/BalanceGet"})
public class BalanceGet extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntIds uxPayload;
    String responseLoad;

    PropsReader pr = new PropsReader();
    Map<String, Object> entityParams = new HashMap<>();
    Map<String, Object> accountParams = new HashMap<>();
    Balance entity;
    RequestOptions auth;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            response.setContentType("application/json;charset=UTF-8");
            sb = new StringBuilder();
            while ((s = request.getReader().readLine()) != null) {
                sb.append(s);
            }
            uxPayload = gson.fromJson(sb.toString(), EntIds.class);
            Stripe.apiKey = pr.setKey("key").getVal();

            if (uxPayload.getAccountId().length() > 0) {
                auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
                System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
                System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
                System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

            }
// https://stripe.com/docs/api/balance/balance_retrieve
            System.out.println("INF: Processed Balance(X) Starting");
            if (uxPayload.getAccountId().length() > 0) {
                entity = Balance.retrieve(auth);
            } else {
                entity = Balance.retrieve();
            }

        } catch (StripeException ex) {
            System.out.println("ERR: " + ex.getMessage());
            response.getOutputStream().print(entity.toJson());
            response.getOutputStream().flush();
            Logger.getLogger(BalanceGet.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        System.out.println("INF: " + uxPayload.toString());
        System.out.println("INF: " + entity.toJson());
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();
        System.out.println("INF: Processed Account Balance (X) Completed");
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
        uxPayload = new EntIds();

        // Properties
        pr.init("env.comms.properties");
    }
}
