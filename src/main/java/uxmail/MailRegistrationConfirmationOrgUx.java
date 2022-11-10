/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uxmail;

import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailRegistrationConfirmationOrgUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;
	String endPointResource;
	String endPointResourceAvailability;
	String endPointEvent;
	String endPointActivity;
	String endPointUsers;
	String endPointLoginHomepage;
	String endPointLoginPortal;
	String endPointLoginEndUser;
	String endPointPortal;
	String endPointHomepage;
	String endPointPayments;
	String endPointSupport;
	String endPointMessaging;
	String endPointBooking;
	String endPointModule_BoxLeague;
	String endPointModule_Ladder;

	String title;
	String ts;
	String sector;
	String date;
	String time;

	String email;
	String company;
	String accountId;
	String phone;
	String fname;
	String lname;
	String client;
	String clientKey;
	String username;
	String password;
	String service;

	public static void main(String[] args) {

	}

	public MailRegistrationConfirmationOrgUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailRegistrationConfirmationOrgUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailRegistrationConfirmationOrgUx() {
		super();

	}

	public String generateHTML() {
		String tmp = "";
		String clientId = "?clientId=" + getClientKey();

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
		b.append("Welcome, " + getFname() + " its great to have you ond your organisation on board. We hope you find our platform intuitive, and affective. Below are two accounts, The data entry account is your first port of call. You need to provisioning the back-end of the system, using the Data Entry account link below. Build your resource, event, and activity chains accordingly. Make them rich in context, by providing great multimedia content, and language that will entice your clients to purchase your services.<br>");
		b.append("<br>");
		b.append("Once you have provisioned your first service, you can can login with the service Service Portfolio account link, and preview your serice, as your clients will see it. Pay attention to descriptions, duration and pricing detail. But dont worry, you can change any entry, at any time!!!");
		b.append("<br>").append("<br>");

		b.append("<b><center>Your Registration Details</center></b>").append("<br>");
		b.append("Joining Date: " + getTs()).append("<br>");
		b.append("First Name: " + getFname()).append("<br>");
		b.append("Family Name: " + getLname()).append("<br>");
		b.append("Email: " + getEmail()).append("<br>");
		b.append("Company: " + getClient()).append("<br>");
		b.append("Phone: " + getPhone()).append("<br>");
		b.append("Client Key: " + getClientKey()).append("<br>");
		b.append("Account Key: " + getAccountId()).append("<br>");

		b.append("<hr>");
		b.append("<b><center>System Entry Points</center></b>").append("<br>");

		b.append("<b>Enable Payments On You Account (System Admins)</b>").append("<br>");
		tmp = "href=" + getEndPointPayments();
		b.append("Access URL: <a target='_blank'" + tmp + " >Update</a>").append("<br>");

		b.append("<b>Login Details (System Admins)</b>").append("<br>");
		b.append("Username: " + getUsername()).append("<br>");
		b.append("Password: " + getPassword()).append("<br>");
		tmp = "href=" + getEndPointHomepage() + clientId;
		b.append("Access URL: <a target='_blank'" + tmp + " >Login</a>").append("<br>");

		b.append("<b>Login Details (End Users)</b>").append("<br>");
		b.append("Username: " + getUsername()).append("<br>");
		b.append("Password: " + getPassword()).append("<br>");
		tmp = "href=" + getEndPointLoginEndUser();
		b.append("Access URL: <a target='_blank'" + tmp + " >Login</a>").append("<br>");

//		System.out.println("INF: Access URL Services (" + tmp + ")");
//
//		b.append("<hr>");
//		b.append("<center><b>Resource Links</b></center>").append("<br>");
//		b.append("You can bookmark these links in your browser for your convenience").append("<br>");
//		tmp = "href=" + getEndPointResource() + clientId;
//		b.append("Resource Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//		tmp = "href=" + getEndPointResourceAvailability() + clientId;
//		b.append("Resource Capacity Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//
//		tmp = "href=" + getEndPointEvent() + clientId;
//		b.append("Event Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//
//		tmp = "href=" + getEndPointActivity() + clientId;
//		b.append("Activity Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//
//		tmp = "href=" + getEndPointUsers() + clientId;
//		b.append("End User Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
//
//		tmp = "href=" + getEndPointMessaging() + clientId;
//		b.append("Messaging Management URL: <a target='_blank'" + tmp + " >Enter</a>").append("<br>");
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
		tmp = "href=" + getEndPointSupport() + clientId;
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

	public String getUrlApp() {
		return urlApp;
	}

	public void setUrlApp(String urlApp) {
		this.urlApp = urlApp;
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

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getEndPointActivity() {
		return endPointActivity;
	}

	public void setEndPointActivity(String endPointActivity) {
		this.endPointActivity = endPointActivity;
	}

	public String getEndPointUsers() {
		return endPointUsers;
	}

	public void setEndPointUsers(String endPointUsers) {
		this.endPointUsers = endPointUsers;
	}

	public String getEndPointPortal() {
		return endPointPortal;
	}

	public void setEndPointPortal(String endPointPortal) {
		this.endPointPortal = endPointPortal;
	}

	public String getEndPointHomepage() {
		return endPointHomepage;
	}

	public void setEndPointHomepage(String endPointHomepage) {
		this.endPointHomepage = endPointHomepage;
	}

	public String getEndPointMessaging() {
		return endPointMessaging;
	}

	public void setEndPointMessaging(String endPointMessaging) {
		this.endPointMessaging = endPointMessaging;
	}

	public String getEndPointBooking() {
		return endPointBooking;
	}

	public void setEndPointBooking(String endPointBooking) {
		this.endPointBooking = endPointBooking;
	}

	public String getEndPointModule_BoxLeague() {
		return endPointModule_BoxLeague;
	}

	public void setEndPointModule_BoxLeague(String endPointModule_BoxLeague) {
		this.endPointModule_BoxLeague = endPointModule_BoxLeague;
	}

	public String getEndPointModule_Ladder() {
		return endPointModule_Ladder;
	}

	public void setEndPointModule_Ladder(String endPointModule_Ladder) {
		this.endPointModule_Ladder = endPointModule_Ladder;
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

	public String getClientKey() {
		return clientKey;
	}

	public void setClientKey(String clientKey) {
		this.clientKey = clientKey;
	}

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public String getEndPointResource() {
		return endPointResource;
	}

	public void setEndPointResource(String endPointResource) {
		this.endPointResource = endPointResource;
	}

	public String getEndPointEvent() {
		return endPointEvent;
	}

	public void setEndPointEvent(String endPointEvent) {
		this.endPointEvent = endPointEvent;
	}

	public String getEndPointResourceAvailability() {
		return endPointResourceAvailability;
	}

	public void setEndPointResourceAvailability(String endPointResourceAvailability) {
		this.endPointResourceAvailability = endPointResourceAvailability;
	}

	public String getEndPointSupport() {
		return endPointSupport;
	}

	public void setEndPointSupport(String endPointSupport) {
		this.endPointSupport = endPointSupport;
	}

	public String getEndPointLoginHomepage() {
		return endPointLoginHomepage;
	}

	public void setEndPointLoginHomepage(String endPointLoginHomepage) {
		this.endPointLoginHomepage = endPointLoginHomepage;
	}

	public String getEndPointLoginPortal() {
		return endPointLoginPortal;
	}

	public void setEndPointLoginPortal(String endPointLoginPortal) {
		this.endPointLoginPortal = endPointLoginPortal;
	}

	public String getEndPointLoginEndUser() {
		return endPointLoginEndUser;
	}

	public void setEndPointLoginEndUser(String endPointLoginEndUser) {
		this.endPointLoginEndUser = endPointLoginEndUser;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getEndPointPayments() {
		return endPointPayments;
	}

	public void setEndPointPayments(String endPointPayments) {
		this.endPointPayments = endPointPayments;
	}

}
