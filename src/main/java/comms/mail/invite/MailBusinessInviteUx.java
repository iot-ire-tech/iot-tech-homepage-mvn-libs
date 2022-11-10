/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.invite;

import entities.EntMailBusinessInvite;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailBusinessInviteUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointSignup;
	String endPointSupport;

	String ts;
	String title;
	EntMailBusinessInvite source;

	public static void main(String[] args) {

	}

	public MailBusinessInviteUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailBusinessInviteUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailBusinessInviteUx() {
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
		b.append("<b><center>Automated Card Confirmaton Detail</center></b>");
		b.append("<hr>");
		b.append("Contragulations, " + getSource().getFname() + " you have been select to join our online business platform " + getSource().getBizName() + " ");
		b.append("Soon you will be able to sell your wares to an online community!");
		b.append("<br>").append("<br>");

		b.append("<b><center>Your Invitte's Business Details</center></b>").append("<br>");
		b.append("Invite Date: " + getTs()).append("<br>");
		b.append("Requester: " + getSource().getFullName()).append("<br>");
		b.append("Business: " + getSource().getBizName()).append("<br>");
		b.append("Website: " + getSource().getWebsite()).append("<br>");
		b.append("Email: " + getSource().getEmailInviter()).append("<br>");
		b.append("<br>").append("<br>");
		b.append("<b><center>Business Offerings</center></b>").append("<br>");
		b.append("Shopping Zone: " + getSource().isShopping()).append("<br>");
		b.append("Event Management: " + getSource().isEvents()).append("<br>");
		b.append("Activitiy Management: " + getSource().isActivities()).append("<br>");
		b.append("Welcome Message: ").append("<br>");
		b.append(getSource().getGreetingmsg()).append("<br>");
		b.append("<br>").append("<br>");

		// Update Card Details Link
		b.append("<b><center>Start Onboarding Process</center></b>").append("<br>");
		b.append("Clicking on the link below, is the first phase to becoming a full online partner with " + getSource().getBizName() + ", please precede.").append("<br>");
		tmp = "href=" + getEndPointSignup();
		b.append("To Start Platform Onboarding: <a target='_blank'" + tmp + " >click here!</a>").append("<br>");

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
		tmp = "href=" + getEndPointSupport();
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

	public String getUrlApp() {
		return urlApp;
	}

	public void setUrlApp(String urlApp) {
		this.urlApp = urlApp;
	}

	public String getTs() {
		return ts;
	}

	public void setTs(String ts) {
		this.ts = ts;
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

	public String getEndPointSignup() {
		return endPointSignup;
	}

	public void setEndPointSignup(String endPointSignup) {
		this.endPointSignup = endPointSignup;
	}

	public EntMailBusinessInvite getSource() {
		return source;
	}

	public void setSource(EntMailBusinessInvite source) {
		this.source = source;
	}

}
