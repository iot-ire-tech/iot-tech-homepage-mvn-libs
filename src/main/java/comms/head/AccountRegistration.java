/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.head;

import com.google.gson.Gson;
import entities.EntMailClientHead;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.PropsReader;

/**
 * @author ae
 */
@WebServlet(name = "MailerAccountRegistration", urlPatterns = {"/MailerAccountRegistration"})
public class AccountRegistration extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    MailRegistrationHeadConfirmationUx mailer;
    EntMailClientHead uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        // Map JSON data to Array Of Bookings Object!!!
        uxPayload = gson.fromJson(sb.toString(), EntMailClientHead.class);
//  Build Endpoints
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnamePortal = pr.setKey("proto").getVal() + pr.setKey("hostnamePortal").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        mailer.setTs(uxPayload.getTs());
        mailer.setCustomerIdConnect(uxPayload.getCustomerId());
        mailer.setCustomerIdPlatform(uxPayload.getCustomerIdPlatform());
        mailer.setAccountId(uxPayload.getAccountId());
        mailer.setPrimaryId(uxPayload.getPrimaryId()); // host ID
        mailer.setEmail(uxPayload.getCustomer().getPerson().getEmail());
        mailer.setPhone(uxPayload.getCustomer().getPerson().getPhone());
        mailer.setFname(uxPayload.getCustomer().getPerson().getFirstName());
        mailer.setLname(uxPayload.getCustomer().getPerson().getLastName());
        mailer.setHostname(uxPayload.getHostname());

//		mailer.setEndPointBusinessPlan(uxPayload.getBusinessPlan());
        System.out.println("INF: Business Type (" + uxPayload.getBusinessType() + ")");
        // Derived Class
        if (!uxPayload.getBusinessType().contains("individual")) {
            mailer.setTitle("MyBusinessPal.Com: Business Bundle Pack");
        } else {
            mailer.setTitle("MyBusinessPal.Com: Retail Bundle Pack");
        }
        if (uxPayload.getBusinessType().contains("business")) {
//			mailer.setEndPointBusinessType(hostnameEndUser + pr.setKey("endPointSignupLegalBusiness").getVal() + "?accountId=" + uxPayload.getAccountId());
        } else {
//			mailer.setEndPointBusinessType(hostnameEndUser + pr.setKey("endPointSignupLegalIndividual").getVal() + "?accountId=" + uxPayload.getAccountId());

        }

        String accountId = "";
        accountId = uxPayload.getAccountId();
// If primary is present in payload, that means account creation was trigger by primary, therefore this is an invited account
        if (uxPayload.getPrimaryId().length() > 0) {
            mailer.setSubject("MyBusinessPal.Com - New Invitee Registration Details");
            mailer.setEndPointDashboard(
                    hostnameEndUser + pr.setKey("endPointDashboard").getVal() + "?" +
                            "accountId=" + uxPayload.getAccountId() + "&" +
                            "originId=" + uxPayload.getPrimaryId()
            );
            mailer.setEndPointLoginEndUser(hostnameEndUser + pr.setKey("endPointLogin").getVal() + "?accountId=" + uxPayload.getPrimaryId());
        } else {
            mailer.setSubject("MyBusinessPal.Com - New Platform Owner Registration Details");
            mailer.setEndPointDashboard(
                    hostnameEndUser + pr.setKey("endPointDashboard").getVal() + "?" +
                            "accountId=" + uxPayload.getAccountId()
            );
            mailer.setEndPointLoginEndUser(hostnameEndUser + pr.setKey("endPointLogin").getVal() + "?accountId=" + uxPayload.getAccountId());
        }

        // Bill The Connect Account Or Customer on account!
        // Will bill customer who signs up on

        // EndPoints...
        // If primary and secondary are different!!! then action is taken.
        // Reseller Links
        // EndEuser
        // Welcome Back anthony, look at whats new
        mailer.setEndPointHomepage(hostnameEndUser + pr.setKey("endPointHome").getVal());
        // So you need help
        mailer.setEndPointSupport(hostnameEndUser + pr.setKey("endPointSupport").getVal());
        // Derived
        System.out.println("Mail Message(" + mailer.generateHTML() + ")");
        mailer.setMsgbody(mailer.generateHTML());
        // Base
        mailer.setTo(uxPayload.getCustomer().getPerson().getEmail() + ", accounts@mybusinesspal.com");
        mailer.init();

        response.getOutputStream().print("{ \"name\" : \"Anto\", \"grade\" : \"A\" }");
        response.getOutputStream().flush();

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    @Override
    public void init() throws ServletException {

        // Base Classs
        mailer = new MailRegistrationHeadConfirmationUx();
        mailer.setFrom("accounts@mybusinesspal.com");
        mailer.setFromAlias("MyBusinessPal.Com Account Information");

//        // Derived Class
//        if (!uxPayload.getBusinessType().contains("individual")) {
//            mailer.setTitle("MyBusinessPal.Com: Business Bundle Pack");
//        } else {
//            mailer.setTitle("MyBusinessPal.Com: Retail Bundle Pack");
//        }
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntMailClientHead();

        // Properties
        pr.init("env.comms.properties");
    }

}
