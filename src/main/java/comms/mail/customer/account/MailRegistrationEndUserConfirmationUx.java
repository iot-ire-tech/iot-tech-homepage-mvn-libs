package comms.mail.customer.account;/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.Date;

import servlet.Mailer;

/**
 * @author ae
 */
public class MailRegistrationEndUserConfirmationUx extends Mailer {

    StringBuilder b = new StringBuilder();
    String endPointUsers;
    String endPointLoginHomepage;
    String endPointSupport;
    String endPointHomepage;
    String endPointPaymentCard;
    String endPointLoginEndUser;

    String title;
    String ts;
    String date;
    String time;

    String accountId;
    String customerId;
    String email;
    String company;
    String phone;
    String fname;
    String lname;

    public static void main(String[] args) {

    }

    public MailRegistrationEndUserConfirmationUx(String to, String from, String fromAlias, String subject, String msgbody) {
        super(to, from, fromAlias, subject, msgbody);
    }

    public MailRegistrationEndUserConfirmationUx(String to, String from, String fromAlias, String subject) {
        super(to, from, fromAlias, subject);
    }

    /**
     *
     */
    public MailRegistrationEndUserConfirmationUx() {
        super();

    }

    public String generateHTML() {
        String tmp = "";

        b = new StringBuilder();
        b.append("<html>");
        b.append("<head>");
        b.append("<title>" + getTitle() + "</title>");
        b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
        b.append("<style>");
        b.append("#header,#footer { background-color:CornflowerBlue; }");
        b.append("h1 { color:black; text-align: center; }");
        b.append("</style>");
        b.append("</head>");
        b.append("<body>");

        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Automated Registration Notification</center></b>");
        b.append("<hr>");
        b.append("Welcome, " + getFname() + ", we hope you find our platform intuitive, and affective. <br>");
        b.append("<br>");
        b.append("<br>").append("<br>");

        b.append("<b><center>Your Registration Details</center></b>").append("<br>");
        b.append("Joining Date: " + new Date().toGMTString()).append("<br>");
        b.append("First Name: " + getFname()).append("<br>");
        b.append("Family Name: " + getLname()).append("<br>");
        b.append("Email: " + getEmail()).append("<br>");
        b.append("Phone: " + getPhone()).append("<br>");
        b.append("Account Key: " + getAccountId()).append("<br>");
        b.append("Customer Key: " + getCustomerId()).append("<br>");

        b.append("<hr>");

//		b.append("<b>Add Card Additional Card Payment To Your Account</b>").append("<br>");
//		tmp = "href=" + getEndPointPaymentCard();
//		b.append("Access URL: <a target='_blank'" + tmp + " >Add Card Payment Source</a>").append("<br>");
        b.append("<br>");
        b.append("<br>");
        b.append("<b>Login Details</b>").append("<br>");
        b.append("Username: " + getEmail()).append("<br>");
        b.append("Password: " + getPhone()).append("<br>");
        tmp = "href=" + getEndPointLoginEndUser();
        b.append("Access URL: <a target='_blank'" + tmp + " >Login</a>").append("<br>");

        b.append("<br>");
        b.append("<br>");
        b.append("<br>");
        b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email. Instead use support links below");

        b.append("<br>");
        b.append("<br>");
        b.append("<span>Kind Regards,</span><br>");
        b.append("<span>MyBusinessPal.Com</span><br>");
        b.append("<br>");
        tmp = "href=" + getEndPointHomepage();
        b.append("MyBusinessPal.Com Homepage: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//		tmp = "href=" + getEndPointSupport() + clientId;
        b.append("Online Support: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
        tmp = "href=tel:016602353";
        b.append("Telephone Support: <a" + tmp + ">+353 1 254 2326</a>").append("<br>");
        b.append("<br>");

        b.append("</body>");
        b.append("</html>");

        return b.toString();

    }

    public StringBuilder getB() {
        return b;
    }

    public void setB(StringBuilder b) {
        this.b = b;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEndPointUsers() {
        return endPointUsers;
    }

    public void setEndPointUsers(String endPointUsers) {
        this.endPointUsers = endPointUsers;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
    }

    public String getEndPointLoginHomepage() {
        return endPointLoginHomepage;
    }

    public void setEndPointLoginHomepage(String endPointLoginHomepage) {
        this.endPointLoginHomepage = endPointLoginHomepage;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getEndPointSupport() {
        return endPointSupport;
    }

    public void setEndPointSupport(String endPointSupport) {
        this.endPointSupport = endPointSupport;
    }

    public String getEndPointHomepage() {
        return endPointHomepage;
    }

    public void setEndPointHomepage(String endPointHomepage) {
        this.endPointHomepage = endPointHomepage;
    }

    public String getEndPointLoginEndUser() {
        return endPointLoginEndUser;
    }

    public void setEndPointLoginEndUser(String endPointLoginEndUser) {
        this.endPointLoginEndUser = endPointLoginEndUser;
    }

    public String getEndPointPaymentCard() {
        return endPointPaymentCard;
    }

    public void setEndPointPaymentCard(String endPointPaymentCard) {
        this.endPointPaymentCard = endPointPaymentCard;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

}
