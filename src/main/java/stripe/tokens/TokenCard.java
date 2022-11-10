/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.tokens;

import com.google.gson.Gson;
import com.models.stripe.entities.EntCard;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Token;
import com.stripe.net.RequestOptions;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;

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
@WebServlet(name = "AddTokenCard", urlPatterns = {"/AddTokenCard"})
public class TokenCard extends HttpServlet {

    String s;
    Gson gson;

    PropsReader pr = new PropsReader();
    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntCard uxPayload;

    Map<String, Object> data = new HashMap<>();
    Map<String, Object> tokenParams = new HashMap<>();
    Map<String, Object> entityParams = new HashMap<>();

    Token entity;
    RequestOptions auth;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        uxPayload = gson.fromJson(sb.toString(), EntCard.class);
        Stripe.apiKey = pr.setKey("key").getVal();
        if (uxPayload.getAccountId().length() > 0) {
            auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
            System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
            System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
            System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

        }
        System.out.println("INF: Processing Card Tokens Starting");

        // https://stripe.com/docs/api/tokens/create_card
        tokenParams.clear();
        data.clear();

        if (uxPayload.getCustomerId().length() > 0 && uxPayload.getCardId().length() == 0) {
            // used for customer payment cloning...
            tokenParams.put("customer", uxPayload.getCustomerId());
        } else if (uxPayload.getCustomerId().length() > 0 && uxPayload.getCardId().length() > 0) {
            tokenParams.put("customer", uxPayload.getCustomerId());
            tokenParams.put("card", uxPayload.getCardId()); //
        } else {
//			data.put("object", "card");
            data.put("number", uxPayload.getNumber());
            data.put("currency", uxPayload.getCurrency());
            data.put("exp_year", uxPayload.getYear());
            data.put("exp_month", uxPayload.getMonth());
//		data.put("address_country", uxPayload.getAddress().getCountry());
//			data.put("default_for_currency", true); // Customer Accounts!
            tokenParams.put("card", data); // Customer Accounts!
            // opts
//		data.put("cvc", "314");
//		data.put("name", "Anto Ennis(US-DebitCardNumber)");
        }

        try {
            if (uxPayload.getAccountId().length() > 0) {
                // Platform Customer Id sent
                entity = Token.create(tokenParams, auth);

            } else {
                entity = Token.create(tokenParams);
            }

        } catch (StripeException ex) {
            System.out.println("ERR: Error Message: " + ex.getMessage());
            System.out.println("ERR: Payload : " + gson.toJson(tokenParams));
            Logger.getLogger(TokenCard.class.getName()).log(Level.SEVERE, null, ex);
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            return;
        }
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();
        System.out.println("INF: Processed  Card Tokens Completed");
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
        uxPayload = new EntCard();

        // Properties
        pr.init("env.comms.properties");
    }
}
