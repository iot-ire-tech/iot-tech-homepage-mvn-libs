/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package comms.mail.customer.payment;

import entities.EntMailSepa;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailCustomerPaymentsSEPAUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;

	String endPointHomepage;
	String endPointPayments;
	String endPointSupport;

	String ts;
	String title;
	String endPointPaymentsCARD;
	EntMailSepa source;

	public static void main(String[] args) {

	}

	public MailCustomerPaymentsSEPAUx(String to, String from, String fromAlias, String subject, String msgbody) {
		super(to, from, fromAlias, subject, msgbody);
	}

	public MailCustomerPaymentsSEPAUx(String to, String from, String fromAlias, String subject) {
		super(to, from, fromAlias, subject);
	}

	/**
	 *
	 */
	public MailCustomerPaymentsSEPAUx() {
		super();

	}

	public String generateHTML() {
		String tmp = "";

		b = new StringBuilder();
		b.append("<html>");
		b.append("<head>");
		b.append("<title></title>");
		b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		b.append("<style>");
		b.append("#header,#footer { background-color:CornflowerBlue; }");
		b.append("h1 { color:black; text-align: center; }");
		b.append("</style>");
		b.append("</head>");
		b.append("<body>");

		b.append("<br>");
		b.append("<hr>");
		b.append("<b><center>Automated Banking Confirmaton Detail</center></b>");
		b.append("<hr>");
		b.append("Contragulations, " + getSource().getPerson().getFirstName() + " you have added a banking payment point to your platform.");
		b.append("Soon you will be able to pay for services and goods offered by your platform by bank payments!");
		b.append("<br>").append("<br>");

		b.append("<b><center>Your Payment Details</center></b>").append("<br>");
		b.append("Date: " + getTs()).append("<br>");
		b.append("Account Holders Name: " + getSource().getPerson().getFullName()).append("<br>");
		b.append("Accout Type: " + getSource().getAccountHolderType()).append("<br>");
		b.append("IBAN: " + getSource().getAccountNumber()).append("<br>");
		b.append("TokenId: " + getSource().getTokenId()).append("<br>");
		b.append("SourceId: " + getSource().getSourceId()).append("<br>");
		// Update Banking Details Link
		// Reissue Banking Details Email

//		b.append("<b><center>Enable Payments On You Account </center></b>").append("<br>");
//		b.append("If not already so, you could add a card payments too").append("<br>");
//		// tmp = "href=" + getEndPointPaymentsCARD();
//		b.append("CARD Payments: <a target='_blank'" + tmp + " >Add</a>").append("<br>");

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

	public String getEndPointPayments() {
		return endPointPayments;
	}

	public void setEndPointPayments(String endPointPayments) {
		this.endPointPayments = endPointPayments;
	}

	public String getEndPointSupport() {
		return endPointSupport;
	}

	public void setEndPointSupport(String endPointSupport) {
		this.endPointSupport = endPointSupport;
	}

	public String getEndPointPaymentsCARD() {
		return endPointPaymentsCARD;
	}

	public void setEndPointPaymentsCARD(String endPointPaymentsCARD) {
		this.endPointPaymentsCARD = endPointPaymentsCARD;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public EntMailSepa getSource() {
		return source;
	}

	public void setSource(EntMailSepa source) {
		this.source = source;
	}

}
