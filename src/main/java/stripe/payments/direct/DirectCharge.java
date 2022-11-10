/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.payments.direct;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.RequestOptions;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import com.models.stripe.charge.EntCharge;

/**
 *
 */
@WebServlet(name = "AddDirectCharge", urlPatterns = {"/AddDirectCharge"})
public class DirectCharge extends HttpServlet {

    String s;
    Gson gson;

    PropsReader pr = new PropsReader();
    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntCharge uxPayload;

    LinkedHashMap<String, Object> entityParams = new LinkedHashMap<>();
    LinkedHashMap<String, Object> transferDataParams = new LinkedHashMap<>();

    Charge entity;
    RequestOptions auth;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            System.out.println("INF: JSON S  (" + s + ")");
            sb.append(s);
        }
        System.out.println("INF: JSON SB (" + sb + ")");
        uxPayload = gson.fromJson(sb.toString(), EntCharge.class);
        Stripe.apiKey = pr.setKey("key").getVal();

        System.out.println("INF: Processing Direct Charges On Account(" + uxPayload.getAccountId() + ") Starting");
        if (uxPayload.getAccountId().length() > 0) {
            auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
            System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
            System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
            System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

        }
        entityParams.clear();

        // https://stripe.com/docs/connect/direct-charges
// Transaction Amount
        entityParams.put("currency", uxPayload.getTransaction().getCurrency());
        entityParams.put("amount", uxPayload.getTransaction().getAmount());
//        entityParams.put("statement_descriptor", uxPayload.getTransaction().getDescription().substring(0, 15));
        int descLen = 0;
        if (uxPayload.getTransaction().getDescription().length() <= 5) {
            entityParams.put("statement_descriptor", "mybussinesspal.com");
        } else if (uxPayload.getTransaction().getDescription().length() > 5 && uxPayload.getTransaction().getDescription().length() <= 15) {
            descLen = 15;
            entityParams.put("statement_descriptor", uxPayload.getTransaction().getDescription().replaceAll(" ", "_").substring(0, descLen - 1));
        } else if (uxPayload.getTransaction().getDescription().length() > 15) {
            entityParams.put("statement_descriptor", uxPayload.getTransaction().getDescription().replaceAll(" ", "_").substring(0, 14));
        }
        entityParams.put("statement_descriptor_suffix", uxPayload.getTransaction().getSuffix());

// Charge Source
        if (uxPayload.getSourceId().

                length() > 0) {
            entityParams.put("source", uxPayload.getSourceId());
        } else if (uxPayload.getTokenId().

                length() > 0) {
            entityParams.put("source", uxPayload.getTokenId());
        }
// Charge Customer
        if (uxPayload.getCustomerId().

                length() > 0) {
            entityParams.put("customer", uxPayload.getCustomerId());
        }
        if (uxPayload.getEmailReceipt().

                length() > 0) {
            entityParams.put("receipt_email", uxPayload.getEmailReceipt());
        }
// Application Fees
        if (uxPayload.getApplicationFeeAmount() > 0) {
            entityParams.put("application_fee_amount", uxPayload.getApplicationFeeAmount());
        }

        try {
            if (uxPayload.getAccountId().length() > 0) {
                entity = Charge.create(entityParams, auth);
            } else {
                entity = Charge.create(entityParams);
            }
        } catch (
                StripeException ex) {
            System.out.println("ERR: Payload: " + gson.toJson(uxPayload));
            System.out.println("ERR: Error Message: " + ex.getMessage());
            // Error Catalogue / Failure codes , Responses.
            response.sendError(HttpServletResponse.SC_BAD_REQUEST);
            response.getOutputStream().print(entity.toJson());
            response.getOutputStream().flush();
            Logger.getLogger(DirectCharge.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        response.getOutputStream().

                print(entity.toJson());
        response.getOutputStream().

                flush();
        System.out.println("INF: Processed Completed");

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
        uxPayload = new EntCharge();

        // Properties
        pr.init("env.comms.properties");
    }
}
