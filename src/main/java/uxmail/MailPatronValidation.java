/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package uxmail;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonValueFormat;
import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailPatronValidation extends Mailer {

	StringBuilder b = new StringBuilder();
	String urlApp;
	String endPointHomePage;
	String endPointSupport;

	String endPointPatronValidation;
	String sendersName;
	String patronId;
	String patronDbId;
	String clientId;

	public static void main(String[] args) {

		MailPatronValidation m = new MailPatronValidation();
		m.setFrom("bookings@mybusinesspal.com");
		m.setFromAlias("IOT-Booking-Admin");
		m.setTo("tonyennis@yahoo.com");

		m.setSubject("INF: Account Activation");
// clientId=673859&patronId=787833
		m.setClientId("673859");
		m.setPatronId("787833");
		m.setPatronDbId("5c619aae1f6e4f18ee119d42");
		m.setSendersName("Anto");

		m.setMsgbody(m.generateHTML());
		m.init();
	}

	/**
	 *
	 */
	public MailPatronValidation() {
		super();

	}

	public String generateHTML() {
		String tmp = "";
		String style = "padding:10px;"
			+ "font-weight:bold;"
			+ "text-decoration:none;"
			+ "font-family:Arial;"
			+ "background-color:#199de0;"
			+ "border-radius:5px;color:#ffffff;cursor:pointer;display:inline-block;font-size:14px;font-weight:bold;margin:0;text-decoration:none;text-transform:capitalize;";

		b = new StringBuilder();
		b.append("<html>");
		b.append("<head>");
		b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
		b.append("<link rel=\"stylesheet\" href=\"https://www.w3schools.com/w3css/4/w3.css\">");
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
		b.append("Congratulations, " + sendersName + " click on the button below to activate your account<br>");
		b.append("<br>");
		b.append("Client Id: " + getClientId()).append("<br>");
		b.append("Patron Id: " + getPatronId()).append("<br>");

		tmp = "href=" + getEndPointPatronValidation();
		b.append("<center><a style=" + style + " target='_blank'" + tmp + " >Activate</a></center>").append("<br>");

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

	public String getSendersName() {
		return sendersName;
	}

	public void setSendersName(String sendersName) {
		this.sendersName = sendersName;
	}

	public String getPatronId() {
		return patronId;
	}

	public void setPatronId(String patronId) {
		this.patronId = patronId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getPatronDbId() {
		return patronDbId;
	}

	public void setPatronDbId(String patronDbId) {
		this.patronDbId = patronDbId;
	}

	public String getEndPointPatronValidation() {
		return endPointPatronValidation;
	}

	public void setEndPointPatronValidation(String endPointPatronValidation) {
		this.endPointPatronValidation = endPointPatronValidation;
	}

}
