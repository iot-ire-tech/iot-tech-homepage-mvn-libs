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
import com.stripe.model.Person;

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
@WebServlet(name = "AccountAddCompanyLite", urlPatterns = {"/AccountAddCompanyLite"})
public class AccountAddCompanyLean extends HttpServlet {

    String s;
    Gson gson;

    StringBuilder sb;
    MailCreditCardTransactionUx mailer;
    EntAccount uxPayload;
    Verification verf = new Verification();

    PropsReader pr = new PropsReader();
    Map<String, Object> accountParams = new HashMap<>();
    Map<String, Object> company = new HashMap<>();
    Map<String, Object> verification = new HashMap<>();
    Map<String, Object> proof = new HashMap<>();
    Map<String, Object> additional_doc = new HashMap<>();
    Map<String, Object> dob = new HashMap<>();
    Map<String, Object> business_profile = new HashMap<>();
    Map<String, Object> address = new HashMap<>();
    Map<String, Object> relationship = new HashMap<>();
    Map<String, Object> roleDirector = new HashMap<>();
    Map<String, Object> roleOwner = new HashMap<>();
    Map<String, Object> roleRepresentative = new HashMap<>();
    Map<String, Object> roleExecutive = new HashMap<>();
    Map<String, Object> subRelationship = new HashMap<>();

    // Roles
    Map<String, Object> person = new HashMap<>();
    Map<String, Object> pDirector = new HashMap<>();
    Map<String, Object> pRep = new HashMap<>();
    Map<String, Object> pOwner = new HashMap<>();
    boolean verificationNeededRep = true;
    boolean verificationNeededDir = true;
    boolean verificationNeededExe = true;
    boolean verificationNeededOwn = true;
    Account account = null;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, StripeException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();
        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }

        uxPayload = gson.fromJson(sb.toString(), EntAccount.class);
        if (uxPayload.getAccountId().length() > 0) {
            Stripe.apiKey = pr.setKey("key").getVal();

            account = Account.retrieve(uxPayload.getAccountId());
        } else {
            System.out.println("WRN: Cannot Upate Platform Account");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST, "Cannot retrieve account ID (" + uxPayload.getAccountId() + ")");
            response.getOutputStream().print(gson.toJson(uxPayload));
            response.getOutputStream().flush();
            return;
        }
        System.out.println("INF: Account Id (" + account.getId() + ")");
        accountParams.clear();
        dob.clear();

        account = Account.retrieve(uxPayload.getAccountId());

        boolean pastDue = false;
        boolean currentDue = false;
        boolean pendingDue = false;
        for (String outstanding : account.getRequirements().getPastDue()) {
            System.out.println("INF: Past Due (" + outstanding + ")");
            pastDue = true;
        }
        boolean companyVerificationDue = false;
        for (String outstanding : account.getRequirements().getCurrentlyDue()) {
            System.out.println("INF: Currently Due (" + outstanding + ")");
            if (outstanding.contains("company")) {
                companyVerificationDue = true;
            }
            currentDue = true;
        }
        for (String outstanding : account.getRequirements().getPendingVerification()) {
            System.out.println("INF: Pending Verification (" + outstanding + ")");
            pendingDue = true;
        }

        accountParams.put("business_type", "company");

        // Start Of Company
        company.put("name", uxPayload.getCompany().getName());
        company.put("phone", uxPayload.getCompany().getPhone());
        company.put("tax_id", uxPayload.getCompany().getTaxId());
        company.put("vat_id", uxPayload.getCompany().getVatId());

        // https://stripe.com/docs/api/accounts/create#create_account-company-address
        address.put("line1", uxPayload.getCompany().getAddress().getAddressLine1());
        address.put("city", uxPayload.getCompany().getAddress().getCity());
        address.put("state", uxPayload.getCompany().getAddress().getState());
        address.put("country", uxPayload.getCompany().getAddress().getCountry());
        company.put("address", address);
// Business registration
        companyVerificationDue = true;
        if (companyVerificationDue) {
            verf = new Verification();
            company.put("verification",
                    verf.addDocumentFontOnly(uxPayload.getCompany().getVerification().getDocument().getFront().getFile(),
                            "additional_verification").getVerification()
            );
        }

//		((Map) accountParams.get("company")).put("address", address);
        boolean hasRep = false;

        for (Person p : account.persons().autoPagingIterable()) {

            try {
                if (p.getRelationship().getRepresentative()) {
                    // Update
//					Relationship arelationship = new Relationship();
//					arelationship.setRepresentative(false);
//					p.setRelationship(arelationship);
//
//					relationship.put("representative", false);
//					roleRepresentative.put("relationship", relationship);
//					p.update(roleRepresentative);
//					relationship.clear();
//					roleRepresentative.clear();

                    // Or Start from fresh
                    p.delete();
                    hasRep = true;
                    account.update(accountParams);
                }

                if (p.getRelationship().getDirector()) {
                    p.delete();
                    account.update(accountParams);
                }
                if (p.getRelationship().getOwner()) {
                    p.delete();
                    account.update(accountParams);
                }
                if (p.getRelationship().getExecutive()) {
                    p.delete();
                    account.update(accountParams);
                }
            } catch (StripeException ex) {
                System.out.println("WRN: Person already deleted (" + ex.getMessage() + ")");

            }
        }


        hasRep = true;
        // An account can only have one representative.
        // If you want to change the representative, first remove the existing representative (person_H4TPFrYJUX7BaH) by setting relationship.representative=false and try again.
        // See https://support.stripe.com/questions/change-the-account-representative-for-connected-accounts for more information.; request-id: req_A1Djwfl1ln06D4

        //  person known as a representative must activate this connected account. This person must be a beneficial owner who is authorized to sign for the organization.
        // Indicate this relationship to Stripe by setting relationship[executive] to true, or relationship[owner] to true if the representative owns more than 25% of the company.
        if (hasRep) {
            // https://stripe.com/docs/api/persons/create#create_person-relationship-director
            relationship.clear();
            roleRepresentative.put("first_name", uxPayload.getRep().getFirstName());
            roleRepresentative.put("last_name", uxPayload.getRep().getLastName());
            roleRepresentative.put("email", uxPayload.getRep().getEmail());
            roleRepresentative.put("phone", uxPayload.getRep().getPhone());
            dob.put("year", uxPayload.getRep().getDob().getYear());
            dob.put("month", uxPayload.getRep().getDob().getMonth());
            dob.put("day", uxPayload.getRep().getDob().getDay());
            roleRepresentative.put("dob", dob);
            address.put("city", uxPayload.getRep().getAddress().getCity());
            address.put("country", uxPayload.getRep().getAddress().getCountry());
            address.put("line1", uxPayload.getRep().getAddress().getAddressLine1());
            address.put("postal_code", uxPayload.getRep().getAddress().getPostalCode());
            address.put("state", uxPayload.getRep().getAddress().getState());
            roleRepresentative.put("address", address);

            // R
            relationship.put("title", uxPayload.getRep().getRelationship().getTitle());
            // The representative must also be an executive or owner.
            relationship.put("representative", true);
            relationship.put("owner", true);
            roleRepresentative.put("relationship", relationship);

            if (verificationNeededRep) {
                verf = new Verification();
                roleRepresentative.put("verification",
                        verf.addDocument(
                                // Passport
                                uxPayload.getRep().getVerification().getDocument().getFront().getFile(),
                                uxPayload.getRep().getVerification().getDocument().getBack().getFile(), "identity_document"
                        ).addAdditionalFrontOnly(
                                // A document showing address
                                uxPayload.getRep().getVerification().getDocument().getFront().getFile(), "identity_document"
                        ).getVerification()
                );
            }

            try {
                account.persons().create(roleRepresentative);
            } catch (Exception ex) {
                System.out.println("INF: Update Person Error (" + ex.getMessage() + ")");
                System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
                response.setStatus(response.SC_BAD_REQUEST);
                response.getOutputStream().flush();
                return;

            }
            // only set after person is created.
            // https://stripe.com/docs/api/accounts/create#create_account-company-directors_provided
            // does anyone else serve as director or owner
            company.put("directors_provided", true);
            company.put("owners_provided", true);

        }

        accountParams.put("company", company);

        // End Of Company
        // https://stripe.com/docs/api/accounts/create#create_account-business_profile
        business_profile.put("name", uxPayload.getBusinessProfile().getName()); // Sector
        business_profile.put("mcc", uxPayload.getBusinessProfile().getMcc()); // Sector
        business_profile.put("product_description", uxPayload.getBusinessProfile().getProductDescription()); // Sector
        business_profile.put("support_phone", uxPayload.getBusinessProfile().getSupportPhone());
        business_profile.put("support_url", uxPayload.getBusinessProfile().getSupportUrl());
        business_profile.put("url", uxPayload.getBusinessProfile().getUrl());
        accountParams.put("business_profile", business_profile);

        tryAgain:
        try {
            account.update(accountParams);
        } catch (Exception ex) {
            System.out.println("INF: Error Msg (" + ex.getMessage() + ")");
            System.out.println("INF:  uxPayload (" + gson.toJson(uxPayload) + ")");
            System.out.println("INF:  Params (" + gson.toJson(accountParams) + ")");

            Logger.getLogger(AccountAddCompanyLean.class.getName()).log(Level.SEVERE, null, ex);

            response.getOutputStream().print(gson.toJson(uxPayload));
            response.setStatus(response.SC_BAD_REQUEST);
            response.getOutputStream().flush();

            // Try Again if Rate Limitiing Exception
//			break tryAgain;
            return;
        }
        response.setStatus(response.SC_OK);
        response.getOutputStream().print(account.toJson());
        response.getOutputStream().flush();

        System.out.println("INF: Processed Account Update Completed");

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            processRequest(request, response);

        } catch (StripeException ex) {
            Logger.getLogger(AccountAddCompanyLean.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);

        } catch (StripeException ex) {
            Logger.getLogger(AccountAddCompanyLean.class
                    .getName()).log(Level.SEVERE, null, ex);
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
