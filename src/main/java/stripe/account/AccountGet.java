/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

import com.google.gson.Gson;
import com.models.enterprise.EntIds;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountCollection;
import com.stripe.model.File;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
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
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountGet", urlPatterns = {"/AccountGet"})
public class AccountGet extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntIds uxPayload;

    Account entity = null;
    PropsReader pr = new PropsReader();
    Map<String, Object> accountParams = new HashMap<>();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }

        uxPayload = gson.fromJson(sb.toString(), EntIds.class);
        Stripe.apiKey = pr.setKey("key").getVal();

        System.out.println("INF: Processed Account Retrieval Started");
        System.out.println("INF: Account Id (" + uxPayload.getAccountId() + ")");

        try {
            entity = Account.retrieve(uxPayload.getAccountId());
        } catch (Exception e) {
            response.getOutputStream().print(entity.toJson());
            response.getOutputStream().flush();
            System.out.println("ERR: Account Retrieval failed, payload (" + gson.toJson(uxPayload) + ")");
            System.out.println("ERR: Account Retrieval failed, entity (" + entity.toJson() + ")");
//            System.exit(0);
            // Mail Alert!!!!

            // TODO account doesnt exist!
//			if (true)
//                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();
        System.out.println("INF: Processed Account Retrieval Completed");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (StripeException ex) {
            Logger.getLogger(AccountGet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (StripeException ex) {
            Logger.getLogger(AccountGet.class.getName()).log(Level.SEVERE, null, ex);
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
        mailer.setSubject("INF: Account Services, Account Details");
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

class UXPayloadAccountFilter {

    String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
