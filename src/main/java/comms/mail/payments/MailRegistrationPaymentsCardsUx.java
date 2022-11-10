/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.payments;

import entities.EntMailCard;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailRegistrationPaymentsCardsUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointPaymentsSEPA;
	String endPointSupport;

	String ts;
	String title;
	EntMailCard source;

	public static void main(String[] args) {

	}

	public MailRegistrationPaymentsCardsUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailRegistrationPaymentsCardsUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailRegistrationPaymentsCardsUx() {
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
		b.append("Contragulations, " + getSource().getPerson().getFirstName() + " you have added a card payment point to your platform.");
		b.append("Soon you will be able to recieve payments from customers via this card!");
		b.append("<br>").append("<br>");

		b.append("<b><center>Your Payment Details</center></b>").append("<br>");
		b.append("Date: " + getTs()).append("<br>");
		b.append("Name On Card: " + getSource().getPerson().getFullName()).append("<br>");
		b.append("Number: " + getSource().getNumber()).append("<br>");
//		b.append("Day: " + getSource().getDay()).append("<br>");
		b.append("Month: " + getSource().getMonth()).append("<br>");
		b.append("Year: " + getSource().getYear()).append("<br>");

		b.append("TokenId: " + getSource().getTokenId()).append("<br>");
		b.append("SourceId: " + getSource().getSourceId()).append("<br>");

		// Update Card Details Link
		b.append("<b><center>Enable SEPA Payments On Your Account (System Admins)</center></b>").append("<br>");
		b.append("If not already so, you could add a SEPA payments-in method too, reassuring your payments-in capability").append("<br>");
		tmp = "href=" + getEndPointPaymentsSEPA();
		b.append("SEPA Payments: <a target='_blank'" + tmp + " >Add</a>").append("<br>");

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

	public String getEndPointPaymentsSEPA() {
		return endPointPaymentsSEPA;
	}

	public void setEndPointPaymentsSEPA(String endPointPaymentsSEPA) {
		this.endPointPaymentsSEPA = endPointPaymentsSEPA;
	}

	public EntMailCard getSource() {
		return source;
	}

	public void setSource(EntMailCard source) {
		this.source = source;
	}

}
