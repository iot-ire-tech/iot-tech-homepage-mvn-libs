/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import stripe.billing.coupons.CouponGet;
import com.models.stripe.entities.connect.EntAccount;

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
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
@WebServlet(name = "AccountUpdateBusinessName", urlPatterns = {"/AccountUpdateBusinessName"})
public class AccountUpdateBusinessName extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntAccount uxPayload;
    Account entity;

    PropsReader pr = new PropsReader();
    Map<String, Object> accountParams = new HashMap<>();
    Map<String, Object> business_profile = new HashMap<>();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
//        sb = new StringBuilder();
//        while ((s = request.getReader().readLine()) != null) {
//            sb.append(s);
//        }
//
//        uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
        Stripe.apiKey = pr.setKey("key").getVal();

        accountParams.clear();
        System.out.println("INF: Processed Account Starting");
//        System.out.println("INF: Account Id (" + entity.getId() + ")");

//        business_profile.put("mcc", "5734");
        business_profile.put("name", "Squash Incorporated");
//        business_profile.put("product_description", "SW services");
//        business_profile.put("support_email", "billing@iot-tech.ie");
//        business_profile.put("support_phone", "(555) 678-1212");
//        business_profile.put("support_url", "5734");
//        business_profile.put("url", "https://sites.google.com/view/iottech/home?authuser=3");
        accountParams.put("business_profile", business_profile);
// acct_1GRdJxF6KR5nnzB2
        try {
//            entity = Account.retrieve(entity.getId());
            entity = Account.retrieve("acct_1GRdJxF6KR5nnzB2");
            entity.update(accountParams);
        } catch (StripeException ex) {
            System.out.println("ERR: Error Message: " + ex.getMessage());
            System.out.println("ERR: Payload: " + gson.toJson(uxPayload));
            Logger.getLogger(CouponGet.class.getName()).log(Level.SEVERE, null, ex);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            response.getOutputStream().flush();
            return;
        }
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();

        System.out.println("INF: Processed Account Completed");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
        mailer.setSubject("INF: Payment Services, Account Details");
        mailer.setFrom("billing@mybusinesspal.com");
        mailer.setFromAlias("IOT-Client-Admin");

        // Derived Class
        mailer.setTitle("MyBusinessPal.Com");
        gson = new Gson();
        sb = new StringBuilder();
//        uxPayload = new EntAddress();

        // Properties
        pr.init("env.comms.properties");
    }
}
