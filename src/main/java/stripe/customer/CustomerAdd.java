/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.customer;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Customer;
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
import com.models.stripe.entities.EntCustomer;

/**
 * @author ennisa Customer objects allow you to perform recurring charges to track multiple charges, that are associated with the same customer.
 * <p>
 * The API allows you to create, delete, and update your customers.
 * <p>
 * You can retrieve individual customers as well as a list of all your customers
 */
@WebServlet(name = "CustomerAdd", urlPatterns = {"/CustomerAdd"})
public class CustomerAdd extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntCustomer uxPayload;
    String responseLoad;

    PropsReader pr = new PropsReader();
    Map<String, Object> entityParams = new HashMap<>();
    Map<String, Object> metaParams = new HashMap<>();
    Map<String, Object> accountParams = new HashMap<>();
    Map<String, Object> referenceMap = new HashMap<>();
    Map<String, Object> userAccountMap = new HashMap<>();
    Map<String, Object> invoicePaymentParams = new HashMap<>();
    Customer entity;
    RequestOptions auth;
    Account account = null;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            response.setContentType("application/json;charset=UTF-8");
            sb = new StringBuilder();
            while ((s = request.getReader().readLine()) != null) {
                sb.append(s);
            }

            uxPayload = gson.fromJson(sb.toString(), EntCustomer.class);

            Stripe.apiKey = pr.setKey("key").getVal();
// Account Magic
            if (uxPayload.getAccountId().length() > 0) {
                auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
                System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
                System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
                System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

            }
// Builder
// https://stripe.com/docs/api/customers/create
            System.out.println("INF: Processed Customer(X) Starting");
            entityParams.clear();
            entityParams.put("name", uxPayload.getPerson().getFullName());
            entityParams.put("email", uxPayload.getPerson().getEmail());
            entityParams.put("phone", uxPayload.getPerson().getPhone());

            if (uxPayload.getUserAccount().getUser().length() > 0) {
//                userAccountMap.put("role", uxPayload.getUserAccount().getRole());
//                userAccountMap.put("username", uxPayload.getUserAccount().getUser());
//                userAccountMap.put("password", uxPayload.getUserAccount().getPass());
//                entityParams.put("metadata", userAccountMap);
            }
//			if (uxPayload.getEntCustomerRef().getAccountId().length() > 0) {
//				userAccountMap.put("accountId", uxPayload.getEntCustomerRef().getAccountId());
//				userAccountMap.put("customerId", uxPayload.getEntCustomerRef().getCustomerId());
////					gson.toJson(new EntCustomerRef(uxPayload.getEntCustomerRef().getAccountId(), uxPayload.getEntCustomerRef().getCustomerId())));
////				metaParams.put("customerRef", referenceMap);
//				entityParams.put("metadata", userAccountMap);
//			}

            metaParams.put("role", uxPayload.getRole());
            entityParams.put("metadata", metaParams);

            if (uxPayload.getDescription().length() > 0) {
                entityParams.put("description", uxPayload.getDescription());
            }

            // Lets Get a payment
            // A Token’s or a Source’s ID, as returned by Elements.
            if (uxPayload.getSourceId().length() > 0) {
                entityParams.put("source", uxPayload.getSourceId());
            } else if (uxPayload.getTokenId().length() > 0) {
                entityParams.put("source", uxPayload.getTokenId());
            }

            if (uxPayload.getDefaultSource().length() > 0) {
                invoicePaymentParams.put("default_payment_method", uxPayload.getDefaultSource());
                entityParams.put("invoice_settings", invoicePaymentParams);
            }

            // Add Payment method
            if (uxPayload.getPaymentMethodId().length() > 0) {
                entityParams.put("payment_method", uxPayload.getPaymentMethodId());
            }

            if (uxPayload.getAccountId().length() > 0) {
                entity = Customer.create(entityParams, auth);
            } else {
                entity = Customer.create(entityParams);
            }

        } catch (StripeException ex) {
            System.out.println("ERR: " + ex.getMessage());
            System.out.println("INF: Payload" + gson.toJson(uxPayload));
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, ex.getMessage());
            Logger.getLogger(CustomerAdd.class.getName()).log(Level.SEVERE, null, ex);
            return;
        }
        System.out.println("INF: Payload" + gson.toJson(uxPayload));
        System.out.println("INF: " + entity.toJson());
        response.getOutputStream().print(entity.toJson());
        response.getOutputStream().flush();
        System.out.println("INF: Processed Customer(X) Completed");
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
        uxPayload = new EntCustomer();

        // Properties
        pr.init("env.comms.properties");
    }
}

/*

{
account_balance: 0,
address: null,
created: 1561577886,
currency: null,
default_source: null,
deleted: null,
delinquent: false,
description: "Customer for jenny.rosen@example.com",
discount: null,
email: null,
id: "cus_FKLd1EwLOHnqFT",
invoice_prefix: "ADD028F6",
invoice_settings: {
custom_fields: null,
default_payment_method: null,
footer: null,
},
livemode: false,
metadata: { },
name: null,
object: "customer",
phone: null,
preferred_locales: [ ],
shipping: null,
sources: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/sources",
count: null,
request_options: null,
request_params: null,
},
subscriptions: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/subscriptions",
count: null,
request_options: null,
request_params: null,
},
tax_exempt: "none",
tax_ids: {
object: "list",
data: [ ],
has_more: false,
total_count: 0,
url: "/v1/customers/cus_FKLd1EwLOHnqFT/tax_ids",
count: null,
request_options: null,
request_params: null,
},
tax_info: null,
tax_info_verification: null,
}
 */
