/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.billing.subscriptions.products;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.net.RequestOptions;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
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
import com.models.stripe.entities.EntKeyValuePair;
import com.models.stripe.entities.EntProduct;
import com.models.stripe.entities.EntMap;
import com.models.stripe.entities.EntRevenue;

/**
 */
@WebServlet(name = "ProductAdd", urlPatterns = {"/ProductAdd"})
public class ProductsAdd extends HttpServlet {

	String s;
	Gson gson;
	int descriptorLen = 20;

	StringBuilder sb;
	MailCreditCardTransactionUx mailer;
	EntProduct uxPayload;

	PropsReader pr = new PropsReader();
	Map<String, Object> item = new HashMap<>();
	Map<String, Object> items = new HashMap<>();
	List<String> expandList = new LinkedList<>();
	Map<String, Object> productParams = new HashMap<>();
	ArrayList prodAttribs = new ArrayList();
	Map<String, Object> attribs = new HashMap<>();
	Map<String, Object> metadata = new HashMap<>();
	Product entity;
	RequestOptions auth;

	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {

		response.setContentType("application/json;charset=UTF-8");
		sb = new StringBuilder();
		while ((s = request.getReader().readLine()) != null) {
			sb.append(s);
		}
		uxPayload = gson.fromJson(sb.toString(), EntProduct.class);
		Stripe.apiKey = pr.setKey("key").getVal();
		if (uxPayload.getAccountId().length() > 0) {
			auth = RequestOptions.builder().setStripeAccount(uxPayload.getAccountId()).build();
			System.out.println("INF: Connect Acccount getApiKey (" + auth.getApiKey() + ")");
			System.out.println("INF: Connect Acccount getClientId (" + auth.getClientId() + ")");
			System.out.println("INF: Connect Acccount getStripeAccount (" + auth.getStripeAccount() + ")");

		}
		System.out.println("INF: Processing Product");
		prodAttribs.clear();
		productParams.clear();

		productParams.put("active", uxPayload.isActive());
		productParams.put("name", uxPayload.getName());
		productParams.put("type", uxPayload.getType());
		if (uxPayload.getType().contains("service")) {
			productParams.put("unit_label", uxPayload.getUnits());
			if (uxPayload.getDescription().length() > descriptorLen) {
				productParams.put("statement_descriptor", uxPayload.getDescription().substring(0, (descriptorLen - 1)).trim());
			} else {
				productParams.put("statement_descriptor", uxPayload.getDescription().trim());
			}
		}

//		for (EntMap attrib : uxPayload.getAttributes()) {
//			System.out.println(attrib);
//			prodAttribs.add(attrib.getKey());
//		}
//		productParams.put("attributes", uxPayload.getAttribs());
		metadata.clear();

// Mediat
// Integretity Relationships
		if (uxPayload.getUpstreamAccountId().length() > 0) {
			metadata.put("upstream_accountId", uxPayload.getUpstreamAccountId());
		}
		if (uxPayload.getUpstreamProductId().length() > 0) {
			metadata.put("upstream_productId", uxPayload.getUpstreamProductId());
		}
		if (uxPayload.getScope().size() > 0) {
			metadata.put("downstreamConsumersHolders", gson.toJson(uxPayload.getScope()));
		}
//		if (uxPayload.getWhitelistAccountHolder().size() > 0) {
//			metadata.put("whitelistAccountsHolders", gson.toJson(uxPayload.getWhitelistAccountHolder()));
//		}
// Asset.
		if (uxPayload.getUrlShop().length() > 0) {
			metadata.put("urlShop", uxPayload.getUrlShop());
		}
		if (uxPayload.getUrlSocialYt().length() > 0) {
			metadata.put("urlSocialYt", uxPayload.getUrlSocialYt());
		}
		if (uxPayload.getUrlSocialFb().length() > 0) {
			metadata.put("urlSocialFb", uxPayload.getUrlSocialFb());
		}
		if (uxPayload.getPromoVideo().length() > 0) {
			metadata.put("videoPromo", uxPayload.getPromoVideo());
		}

		if (uxPayload.getImage1().length() > 0) {
			metadata.put("image1", uxPayload.getImage1());
		}
		if (uxPayload.getImage2().length() > 0) {
			metadata.put("image2", uxPayload.getImage2());
		}
		if (uxPayload.getImage3().length() > 0) {
			metadata.put("image3", uxPayload.getImage3());
		}

		if (uxPayload.getImage4().length() > 0) {
			metadata.put("image3", uxPayload.getImage4());
		}
		if (uxPayload.getImage5().length() > 0) {
			metadata.put("image5", uxPayload.getImage5());
		}

// Communication Managment
		if (uxPayload.getFullName().length() > 0) {
			metadata.put("pocFullname", uxPayload.getFullName());
		}
		if (uxPayload.getEmailPoc().length() > 0) {
			metadata.put("pocEmail", uxPayload.getEmailPoc());
		}
		if (uxPayload.getPhonePoc().length() > 0) {
			metadata.put("pocPhone", uxPayload.getPhonePoc());
		}

		// Mandator for Shop/Events.
		if (uxPayload.getSeatingGrades().size() > 0) {
			metadata.put("seating", gson.toJson(uxPayload.getSeatingGrades()));
		}

		if (uxPayload.getMode().length() > 0) {
			metadata.put("mode", uxPayload.getMode());
		}
// Volument based billing
		if (uxPayload.getVbb().size() > 0) {
			metadata.put("volumeBasedBilling", gson.toJson(uxPayload.getVbb()));
		}

// Time Management
		if (uxPayload.getDateTimeStart().length() > 0) {
			metadata.put("dateTimeStart", uxPayload.getDateTimeStart());
		}
		if (uxPayload.getDateTimeEnd().length() > 0) {
			metadata.put("dateTimeEnd", uxPayload.getDateTimeEnd());
		}

		if (uxPayload.getTimemanagement().size() > 0) {
			for (EntKeyValuePair availability : uxPayload.getTimemanagement()) {
				metadata.put(availability.getKey(), availability.getValue());
			}
		}

// Add Revenue Stream
		if (uxPayload.getTnc().length() > 0) {
			metadata.put("tnc", uxPayload.getTnc());
		}
		if (uxPayload.getCouponId().length() > 0) {
			metadata.put("coupon_id", uxPayload.getCouponId());
		}

		// Unit Cost Shop Item
		if (uxPayload.getCost() > 0) {
			metadata.put("cost", uxPayload.getCost());
		}
		if (uxPayload.getDiscount() > 0) {
			metadata.put("discount", uxPayload.getDiscount());
		}

//		if (uxPayload.getPnpCosts().size() >= 0) {
//			metadata.put("postNpackageCosts", gson.toJson(uxPayload.getPnpCosts()));
//		}
//		metadata.put("shippable", uxPayload.isShippable());
//		metadata.put("postNpackageVendorSelection", gson.toJson(uxPayload.getPnpVendorSelection()));
//		if (uxPayload.getTbbFee() > 0) {
//			metadata.put("tbbFee", uxPayload.getTbbFee());
//		}
		metadata.put("sellable", uxPayload.isSellable());

		if (uxPayload.getMoneymanagement().size() > 0) {
			for (EntRevenue revenue : uxPayload.getMoneymanagement()) {
				metadata.put(revenue.getKey(), revenue.getValue());
			}
		}

		// Analytics....
		if (uxPayload.getMetadata().size() > 0) {
			// Add Additional Meta
			for (EntMap metaMap : uxPayload.getMetadata()) {
				if (metaMap.getKey().length() > 0) {
					metadata.put(metaMap.getKey(), metaMap.getValue());
				}
			}
		}
		productParams.put("metadata", metadata);

		if (uxPayload.getDescription().length() > 0) {
			productParams.put("description", uxPayload.getDescription());
		}

		if (uxPayload.getUrl().length() > 0) {
			productParams.put("url", uxPayload.getUrl());
		}

		if (uxPayload.getImages().size() > 0) {
			productParams.put("images", uxPayload.getImages());
		}
		try {

			if (uxPayload.getAccountId().length() > 0) {
				entity = Product.create(productParams, auth);
			} else {
				entity = Product.create(productParams);
			}

		} catch (StripeException ex) {
			System.out.println("ERR: " + ex.getMessage());
			System.out.println("ERR: " + gson.toJson(ex.getMessage()));
			Logger.getLogger(EntProduct.class.getName()).log(Level.SEVERE, null, ex);
			return;
		}

		response.getOutputStream().print(entity.toJson());
		response.getOutputStream().flush();
		System.out.println("INF: Processing Product Complete");
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
		uxPayload = new EntProduct();

		// Properties
		pr.init("env.comms.properties");
	}
}
