/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package comms.mail.customer.account;

import com.google.gson.Gson;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import servlet.PropsReader;
import com.models.stripe.entities.EntCustomer;

/**
 * @author ae
 */
@WebServlet(name = "AddUserRegistrationMail", urlPatterns = {"/AddUserRegistrationMail"})
public class CustomerRegistrationMail extends HttpServlet {

    String basePath;
    String query;
    String s;
    String jsonPatron;
    Gson gson;

    StringBuilder sb;
    MailRegistrationEndUserConfirmationUx mailer;
    EntCustomer uxPayload;

    PropsReader pr = new PropsReader();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        sb = new StringBuilder();

        while ((s = request.getReader().readLine()) != null) {
            sb.append(s);
        }
        // Map JSON data to Array Of Bookings Object!!!
        uxPayload = gson.fromJson(sb.toString(), EntCustomer.class);
//  Build Endpoints
        String hostnameHome = pr.setKey("proto").getVal() + pr.setKey("hostnameHomePage").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnamePortal = pr.setKey("proto").getVal() + pr.setKey("hostnamePortal").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnameEndUser = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();
        String hostnamePayment = pr.setKey("proto").getVal() + pr.setKey("hostnameEndUser").getVal() + pr.setKey("appServPort").getVal() + pr.setKey("contextPath").getVal();

        mailer.setAccountId(uxPayload.getAccountId());
        mailer.setCustomerId(uxPayload.getCustomerId());
        mailer.setEmail(uxPayload.getPerson().getEmail());
        mailer.setPhone(uxPayload.getPerson().getPhone());
//		mailer.set(uxPayload.getPerson().getDob());
        mailer.setFname(uxPayload.getPerson().getFirstName());
        mailer.setLname(uxPayload.getPerson().getLastName());
        mailer.setEndPointHomepage(hostnameHome + pr.setKey("endPointHome").getVal());
        mailer.setEndPointSupport(hostnameHome + pr.setKey("endPointSupport").getVal());

        // EndPoints...
        // EndEuser
        mailer.setEndPointPaymentCard(hostnamePayment + pr.setKey("endPointPaymentsCustomerCardCustomer").getVal() + "?accountId=" + uxPayload.getAccountId() + "&customerId=" + uxPayload.getCustomerId());
        // Invitee : accountId=acct_1GRdJxF6KR5nnzB2&accountIdP=acct_1GRdJxF6KR5nnzB2&accountIdC=acct_1GRdJxF6KR5nnzB2&originId=dashboard
        // Primary : accountId=acct_1GRdJxF6KR5nnzB2&accountIdP=acct_1GRdJxF6KR5nnzB2&accountIdC=&originId=dashboard
        // Afilli  : accountId=acct_1HPtUNC7HMYXL8w8&accountIdP=acct_1HPtUNC7HMYXL8w8&accountIdC=&originId=dashboard
        mailer.setEndPointLoginEndUser(hostnameEndUser + pr.setKey("endPointLogin").getVal() +
                "?accountId=" + uxPayload.getAccountId() + "&" +
                "accountIdP=" + uxPayload.getAccountId() + "&" +
                "accountIdC=" + "&" +
                "originId=onboarding"
        );
        // Derived
        mailer.setMsgbody(mailer.generateHTML());
        // Base
        mailer.setTo(uxPayload.getPerson().getEmail());
        mailer.init();

        response.getOutputStream().print(gson.toString());
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
        mailer = new MailRegistrationEndUserConfirmationUx();
        mailer.setSubject("INF: MyBusinessPal.Com - Customer Registration");
        mailer.setFrom("registar@mybusinesspal.com");
        mailer.setFromAlias("MyBusinessPal.Com - Customer Registration");

        // Derived Class
        mailer.setTitle("MyBusinessPal.Com - Registration");
        gson = new Gson();
        sb = new StringBuilder();
        uxPayload = new EntCustomer();

        // Properties
        pr.init("env.comms.properties");
    }

}
