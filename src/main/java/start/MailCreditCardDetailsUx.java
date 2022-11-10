package start;

import servlet.Mailer;

/**
 *
 * @author ae
 */
public class MailCreditCardDetailsUx extends Mailer {

	StringBuilder b;
	String title;
	String name;
	String email;
	String ccNumber;
	String ccCSV;
	String ccDate;
	String ccStreet1;
	String ccStreet2;
	String ccCity;
	String ccZip;
	String ccCustomerId;

	public MailCreditCardDetailsUx() {
		super();
		b = new StringBuilder();
	}

	public String generateHTML() {

		b.append("<html>");
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
		b.append("<center>Credit Card Details</center>");
		b.append("<hr>");
		b.append("<br>");
		b.append("<br>");
		b.append("<b>Card Details</b>");
		b.append("<br>");
		b.append("Name On Card: " + getName());
		b.append("<br>");
		b.append("Number: " + getCcNumber());
		b.append("<br>");
		b.append("CSV: " + getCcCSV());
		b.append("<br>");
		b.append("Expiry Date [YYYY-MM]: " + getCcDate());
		b.append("<br>");
//		b.append("<br>");
//		b.append("<b>Billing Address</b>");
//		b.append("<br>");
//		b.append("Street#1: " + getCcStreet1());
//		b.append("<br>");
//		b.append("City: " + getCcCity());
//		b.append("<br>");
		b.append("Email: " + getEmail());
		b.append("<br>");
		b.append("Customer Id: " + getCcCustomerId());
		b.append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("<br>");
		b.append("This is an automated email from MyBusinessPal.Com. Please do not reply to this email.");
		b.append("<br>");
		b.append("<br>");
		b.append("<span>Kind Regards,</span><br>");
		b.append("<span>IOT Tech</span><br>");
		b.append("<br>");

		b.append("</body>");
		b.append("</html>");

		return b.toString();

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public StringBuilder getB() {
		return b;
	}

	public void setB(StringBuilder b) {
		this.b = b;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCcNumber() {
		return ccNumber;
	}

	public void setCcNumber(String ccNumber) {
		this.ccNumber = ccNumber;
	}

	public String getCcCSV() {
		return ccCSV;
	}

	public void setCcCSV(String ccCSV) {
		this.ccCSV = ccCSV;
	}

	public String getCcDate() {
		return ccDate;
	}

	public void setCcDate(String ccDate) {
		this.ccDate = ccDate;
	}

	public String getCcStreet1() {
		return ccStreet1;
	}

	public void setCcStreet1(String ccStreet1) {
		this.ccStreet1 = ccStreet1;
	}

	public String getCcStreet2() {
		return ccStreet2;
	}

	public void setCcStreet2(String ccStreet2) {
		this.ccStreet2 = ccStreet2;
	}

	public String getCcCity() {
		return ccCity;
	}

	public void setCcCity(String ccCity) {
		this.ccCity = ccCity;
	}

	public String getCcZip() {
		return ccZip;
	}

	public void setCcZip(String ccZip) {
		this.ccZip = ccZip;
	}

	public String getCcCustomerId() {
		return ccCustomerId;
	}

	public void setCcCustomerId(String ccCustomerId) {
		this.ccCustomerId = ccCustomerId;
	}

}
