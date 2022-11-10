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
import com.models.stripe.entities.connect.EntAccount;

/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
// https://github.com/stripe/stripe-java/blob/master/src/test/java/com/stripe/functional/FileTest.java
@WebServlet(name = "AccountCreate", urlPatterns = {"/AccountCreate"})
public class AccountAdd extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntAccount uxPayload;

    Account account = new Account();
    PropsReader pr = new PropsReader();
    Map<String, Object> accountParams = new HashMap<>();
    Map<String, Object> relationship = new HashMap<>();
    Map<String, Object> tos_acceptance = new HashMap<>();
    Map<String, Object> settings = new HashMap<>();
    Map<String, Object> settingsCard = new HashMap<>();
    Map<String, Object> settingsPayments = new HashMap<>();
    Map<String, Object> settingsPayOuts = new HashMap<>();
    Map<String, Object> metaParams = new HashMap<>();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }

        uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
        Stripe.apiKey = pr.setKey("key").getVal();

        System.out.println("INF: Process Account Creation Started");
        accountParams.put("type", uxPayload.getType());
        accountParams.put("email", uxPayload.getEmail());
        accountParams.put("country", uxPayload.getCountry());
        accountParams.put("requested_capabilities", uxPayload.getCapabilities());
//		accountParams.put("requested_capabilities", Arrays.asList("card_payments", "transfers", "platformPayments"));

        tos_acceptance.put("date", (long) System.currentTimeMillis() / 1000L);
        tos_acceptance.put("ip", "79.97.73.251"); // request.getRemoteAddr()
        accountParams.put("tos_acceptance", tos_acceptance);

        // Legal
        settingsCard.put("statement_descriptor_prefix", "iot-tech");
        settings.put("card_payments", settingsCard);
        settingsPayments.put("statement_descriptor", "iot-tech");
        settings.put("payments", settingsPayments);
        settingsPayOuts.put("statement_descriptor", "iot-tech");
        settings.put("payouts", settingsPayOuts);

        accountParams.put("settings", settings);

        // Get Total In
//		metaParams.put("total", 0);
//		accountParams.put("metadata", metaParams);

        try {
            account = Account.create(accountParams);
        } catch (StripeException ex) {
            System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
            System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
            System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");
            Logger.getLogger(EntAccount.class.getName()).log(Level.SEVERE, null, ex);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            response.getOutputStream().flush();
            return;
        }
        response.getOutputStream().print(account.toJson());
        response.getOutputStream().flush();
        System.out.println("INF: New Account Id (" + account.getId() + ")");
        System.out.println("INF: Processed Account Completed");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (StripeException ex) {
            Logger.getLogger(AccountAdd.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (StripeException ex) {
            Logger.getLogger(AccountAdd.class.getName()).log(Level.SEVERE, null, ex);
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
        mailer.setSubject("INF: Payment Services, Account Details");
        mailer.setFrom("billing@mybusinesspal.com");
        mailer.setFromAlias("IOT-Client-Admin");

        // Derived Class
        mailer.setTitle("MyBusinessPal.Com");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntAccount();

        // Properties
        pr.init("env.comms.properties");
    }
}
