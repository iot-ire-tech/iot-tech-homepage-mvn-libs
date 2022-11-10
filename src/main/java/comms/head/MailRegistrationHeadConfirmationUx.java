/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.head;

import servlet.Mailer;

/**
 * @author ae
 */
public class MailRegistrationHeadConfirmationUx extends Mailer {

    StringBuilder b = new StringBuilder();

    // Next Steps
    String endPointHomepage;
    String endPointSupport;

    // Logins
    String endPointDashboard;
    String endPointPortalRegistration;
    String endPointPortalBusinessServices;
    String endPointPortalEndUser;
    String endPointLoginEndUser;

    String customerIdPlatform;
    String customerIdConnect;
    String title;
    String ts;
    String date;
    String time;

    String email;
    String accountId;
    String primaryId;
    String phone;
    String fname;
    String lname;
    String hostname;

    public static void main(String[] args) {

    }

    public MailRegistrationHeadConfirmationUx(String to, String from, String fromAlias, String subject, String msgbody) {
        super(to, from, fromAlias, subject, msgbody);
    }

    public MailRegistrationHeadConfirmationUx(String to, String from, String fromAlias, String subject) {
        super(to, from, fromAlias, subject);
    }

    /**
     *
     */
    public MailRegistrationHeadConfirmationUx() {
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
        b.append("a.fb {\n"
                + "    font-family: Lucida Grande, Helvetica Neue, Helvetica, Arial, sans-serif;\n"
                + "    display: inline-block;\n"
                + "    font-size: 10px;\n"
                + "    padding: 13px 30px 15px 44px;\n"
                + "    background: #3A5A97;\n"
                + "    color: #fff;\n"
                + "    text-shadow: 0 -1px 0 rgba(0,0,20,.4);\n"
                + "    text-decoration: none;\n"
                + "    line-height: 1;\n"
                + "    position: relative;\n"
                + "    border-radius: 5px;\n"
                + "}\n"
                + "\n"
                + ".connect:before {\n"
                + "    display: inline-block;\n"
                + "    position: relative;\n"
                + "    background-image: url(data:image/png;base64,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);\n"
                + "    height: 23px;\n"
                + "    background-repeat: no-repeat;\n"
                + "    background-position: 0px 3px;\n"
                + "    text-indent: -9999px;\n"
                + "    text-align: center;\n"
                + "    width: 29px;\n"
                + "    line-height: 23px;\n"
                + "    margin: -8px 7px -7px -30px;\n"
                + "    padding: 2 25px 0 0;\n"
                + "    content: \"f\";\n"
                + "}");
        b.append("</style>");
        b.append("</style>");
        b.append("</head>");
        b.append("<body>");
        b.append("<center><img src=\"cid:logo\" alt='company-logo'></center>");

        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Automated Registration Notification</center></b>");
        b.append("<hr>");
        b.append("Welcome " + getFname() + ", its great to have you onboard. We hope you find our platform both intuitive and effective. ");
        if (getPrimaryId().length() > 0) {
            b.append("Congratulations, you have been invited onto this platform as a business affiliate, as such you are mandated to list out your assets, and present an online present asap. ");
            b.append("Dont forget, by inviting others onto the platform, you will increase your customer base immediately, and thus sales potential. ");
        } else {
            b.append("As the primary platform owner, you are mandated to list out your assets, and present an online present. ");
            b.append("Dont forget, by inviting others onto the platform, you will increase your customer base immediately, and thus sales potential. ");
        }
        b.append("Below are a series of steps that need to be followed, so that your account can be finalized. ");
        b.append("If you are unsure about any steps reach out to support, and we will guide you along. ");
        b.append("<br>").append("<br>");

        b.append("<b><center>Your Registration Details</center></b>").append("<br>");
        b.append("Signup Date: " + getTs()).append("<br>");
        b.append("First Name: " + getFname()).append("<br>");
        b.append("Surname: " + getLname()).append("<br>");
        b.append("Email: " + getEmail()).append("<br>");
        b.append("Contact Number: " + getPhone()).append("<br>");
        b.append("Business URL: " + "https://" + getHostname() + ".mybusinesspal.com/").append("<br>");
        b.append("Host Key: " + getPrimaryId()).append("<br>");
        b.append("Account Key: " + getAccountId()).append("<br>");
//		b.append("Business Plan: " + getEndPointBusinessPlan()).append("<br>");
        b.append("Admin Username: " + getEmail()).append("<br>");
        b.append("Password: " + getPhone()).append("<br>");


        b.append("<br>");
        b.append("<hr>");
        b.append("<b><center>Dashboard Portal</center></b>").append("<br>");
        b.append("Here you will you progress through the steps to fully onboard, and provision your platform instance!").append("<br>");
        tmp = "href=" + getEndPointDashboard();
        b.append("Portal Launch : <a target='_blank'" + tmp + " >Let Go!</a>").append("<br>");


//        b.append("<br>");
//        b.append("<hr>");
//        b.append("<b><center>Onboarding Portal</center></b>").append("<br>");
//        b.append("Here you will find details required to setup your billing and payments routes").append("<br>");
//        tmp = "href=" + getEndPointPortalRegistration();
//        b.append("Portal Launch : <a target='_blank'" + tmp + " >Let Go!</a>").append("<br>");
//
//        b.append("<br>");
//        b.append("<br>");
//        b.append("<b><center>Provisioning & Business Services Portal </center></b>").append("<br>");
//        b.append("This is the where you build your platform instance up, have fun!").append("<br>");
//        tmp = "href=" + getEndPointPortalBusinessServices();
//        b.append("Portal Launch : <a target='_blank'" + tmp + " >Lets Go!</a>").append("<br>");
//
//        b.append("<br>");
//        b.append("<br>");
//        b.append("<b><center>Customer Portal </center></b>").append("<br>");
//        b.append("If you dont have a website of your own, simply socialise this link with your customers so they can login!");
//        b.append("<br>");
//        tmp = "href=" + getEndPointLoginEndUser();
//        b.append("Portal Launch : <a target='_blank'" + tmp + " >Lets Go!</a>").append("<br>");
        b.append("<br>");
        b.append("<br>");
        b.append("<br>");
        b.append("If you do have your own website, contact our support team, and we will guide you on how you can integrate your business platform instance with your existing site!");
        b.append("<br>");
        b.append("<br>");
//		b.append("<b><center>Social Media</center></b>").append("<br>");
        b.append("Click and share MyBusinessPal.Com with your friends").append("<br>");
        b.append("<br>");
        // https://blog.hootsuite.com/how-to-create-social-media-buttons/
        // https://support.imcreator.com/hc/en-us/articles/232392888-Creating-a-Facebook-share-link-on-your-page
        // https://blog.hootsuite.com/how-to-create-social-media-buttons/
        tmp = "href=" + getEndPointHomepage();
        b.append("Facebook : <a target='_blank' class=\"fb connect\""
                + "href=https://www.facebook.com/plugins/like.php?href=https://www.facebook.com/mybusinesspal.info/>"
                + "Like Us On Facebook</a>").append("<br>");

        b.append("<br>");
        b.append("<hr>");
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
        tmp = "href=" + getEndPointSupport();
        b.append("Online Support: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
        tmp = "href=tel:016602353";
        b.append("Telephone Support: <a" + tmp + ">+353 1 254 2326</a>").append("<br>");
        b.append("<br>");

        b.append("</body>");
        b.append("</html>");

        return b.toString();

    }

    public String getEndPointHomepage() {
        return endPointHomepage;
    }

    public void setEndPointHomepage(String endPointHomepage) {
        this.endPointHomepage = endPointHomepage;
    }

    public String getEndPointSupport() {
        return endPointSupport;
    }

    public void setEndPointSupport(String endPointSupport) {
        this.endPointSupport = endPointSupport;
    }

    public String getEndPointPortalRegistration() {
        return endPointPortalRegistration;
    }

    public void setEndPointPortalRegistration(String endPointPortalRegistration) {
        this.endPointPortalRegistration = endPointPortalRegistration;
    }

    public String getEndPointPortalBusinessServices() {
        return endPointPortalBusinessServices;
    }

    public void setEndPointPortalBusinessServices(String endPointPortalBusinessServices) {
        this.endPointPortalBusinessServices = endPointPortalBusinessServices;
    }

    public String getEndPointPortalEndUser() {
        return endPointPortalEndUser;
    }

    public void setEndPointPortalEndUser(String endPointPortalEndUser) {
        this.endPointPortalEndUser = endPointPortalEndUser;
    }

    public String getEndPointLoginEndUser() {
        return endPointLoginEndUser;
    }

    public void setEndPointLoginEndUser(String endPointLoginEndUser) {
        this.endPointLoginEndUser = endPointLoginEndUser;
    }

    public String getCustomerIdPlatform() {
        return customerIdPlatform;
    }

    public void setCustomerIdPlatform(String customerIdPlatform) {
        this.customerIdPlatform = customerIdPlatform;
    }

    public String getCustomerIdConnect() {
        return customerIdConnect;
    }

    public void setCustomerIdConnect(String customerIdConnect) {
        this.customerIdConnect = customerIdConnect;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTs() {
        return ts;
    }

    public void setTs(String ts) {
        this.ts = ts;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPrimaryId() {
        return primaryId;
    }

    public void setPrimaryId(String primaryId) {
        this.primaryId = primaryId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public StringBuilder getB() {
        return b;
    }

    public void setB(StringBuilder b) {
        this.b = b;
    }

    public String getEndPointDashboard() {
        return endPointDashboard;
    }

    public void setEndPointDashboard(String endPointDashboard) {
        this.endPointDashboard = endPointDashboard;
    }
}
