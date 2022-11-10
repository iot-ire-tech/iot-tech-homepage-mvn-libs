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
public class MailBusinessRequestAcceptedUx extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;
	String endPointHomePage;
	String endPointSupport;

	public String sendersName;
	public String recipientsId;
	public String reason;
	public String recipientsName;
	public String recipientsEmail;

	public String clientName;
	public String notes;

	public static void main(String[] args) {

	}

	/**
	 *
	 */
	public MailBusinessRequestAcceptedUx() {
		super();

	}

	public String generateHTML() {
		String tmp = "";
		//	String clientId = "?clientId=" + getClientKey();

		b = new StringBuilder();
		b.append("<html>");
		b.append("<head>");
		//	b.append("<title>" + getTitle() + "</title>");
		b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		b.append("<style>");
		b.append("#header,#footer { background-color:CornflowerBlue; }");
		b.append("h1 { color:black; text-align: center; }");
		b.append("</style>");
		b.append("</head>");
		b.append("<body>");

		b.append("<br>");
		b.append("<hr>");
		b.append("<b><center>Automated Notification</center></b>");
		b.append("<hr>");
		b.append("Congratulations, " + recipientsName + " Your new business affiliate, " + sendersName + " has accepted your offer!<br>");
		b.append("<br>");
		b.append("<b><center>Business Acceptance Detail</center></b>").append("<br>");
		b.append("Clients Name: " + sendersName + "<br>");
		b.append("Comments: " + notes + "<br>");

		b.append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email. Instead use support links below");

		b.append("<br>");
		b.append("<br>");
		b.append("<span>Kind Regards,</span><br>");
		b.append("<span>MyBusinessPal.Com</span><br>");
		b.append("<br>");
		//	tmp = "href=" + getEndPointHomePage();
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

	public String getUrlApp() {
		return urlApp;
	}

	public void setUrlApp(String urlApp) {
		this.urlApp = urlApp;
	}

}
