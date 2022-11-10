package servlet;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author ae
 */
public class Mailer {

    String result;

    String to;
    List<String> toList;
    String from;
    String fromAlias;
    String subject;
    String msgbody;
    private static final String SMTP_HOST_NAME = "smtp.sendgrid.net";
    private static final String SMTP_AUTH_USER = "ennisa";
    private static final String SMTP_AUTH_PWD = "FionnAnto1972!";

    String username;
    String password;

    public Mailer(String to, String from, String fromAlias, String subject, String msgbody) {
        this.to = to;
        this.from = from;
        this.fromAlias = fromAlias;
        this.subject = subject;
        this.msgbody = msgbody;
    }

    public Mailer(String to, String from, String fromAlias, String subject) {
        this.to = to;
        this.from = from;
        this.fromAlias = fromAlias;
        this.subject = subject;
    }

    public Mailer() {
    }

    public void init() {
//		initGmail();
//		initSendGrid();
        initgmail();
        //https://stackoverflow.com/questions/14744197/best-practices-sending-javamail-mime-multipart-emails-and-gmail
//        initgmailImage();
    }

    public void initgmail() {
        try {
            PropsReader pr = new PropsReader();

            pr.init("env.comms.properties");
            username = pr.setKey("mailUsername").getVal();
            password = pr.setKey("mailPassword").getVal();

            // Get system properties object
            Properties props = System.getProperties();

            // Gmail mail server
            props.put("mail.smtp.starttls.enable", "true");
// SendGrid
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", SMTP_HOST_NAME);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");

// Get the default Session object.
            Authenticator auth = new SMTPAuthenticator();

            Session mailSession = Session.getDefaultInstance(props, auth);
            mailSession.setDebug(true);

            MimeMessage message = new MimeMessage(mailSession);
            try {
                message.setFrom(new InternetAddress(getFrom(), getFromAlias()));
            } catch (UnsupportedEncodingException ex) {
                Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
            }
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(getTo()));

//
//            Address myBccList = InternetAddress.parse("Usha.B@xyz.com");
//            message.addRecipient(Message.RecipientType.BCC, );
//            InternetAddress[] myCcList = InternetAddress.parse("NEHA.SIVA@xyz.com");
//            message.addRecipient(Message.RecipientType.CC, myCcList);


            message.setSubject(getSubject());
            message.setContent(getMsgbody(), "text/html; charset=utf-8");

// Transport It
            Transport transport = mailSession.getTransport();
            transport.connect();
            transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
            transport.close();
        } catch (NoSuchProviderException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        }

    }


    public void initgmailImage() {
        try {
            PropsReader pr = new PropsReader();

            pr.init("env.comms.properties");
            username = pr.setKey("mailUsername").getVal();
            password = pr.setKey("mailPassword").getVal();

            // Get system properties object
            Properties props = System.getProperties();

            // Gmail mail server
            props.put("mail.smtp.starttls.enable", "true");
// SendGrid
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", SMTP_HOST_NAME);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");

// Get the default Session object.
            Authenticator auth = new SMTPAuthenticator();

            Session mailSession = Session.getDefaultInstance(props, auth);
            mailSession.setDebug(true);

            MimeMessage message = new MimeMessage(mailSession);
            //// Image Start
            MimeMultipart multipart = new MimeMultipart("related");

            // MP#1
            BodyPart messageBodyPart = new MimeBodyPart();
            DataSource fds = new FileDataSource("/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/webapp/logo.jpg");
            fds = new FileDataSource("/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/webapp/logos/LogoFiles/ForWeb/small.png");
            fds = new FileDataSource("/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/webapp/logos/LogoFiles/ForWeb/100x100.png");
            messageBodyPart.setDataHandler(new DataHandler(fds));
            messageBodyPart.setHeader("Content-ID", "<logo>");
            multipart.addBodyPart(messageBodyPart);


            // MP#1
            messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(getMsgbody(), "text/html; charset=utf-8");
            multipart.addBodyPart(messageBodyPart);
            //// Image End

            // Join up multipart content
            message.setContent(multipart);
            try {
                message.setFrom(new InternetAddress(getFrom(), getFromAlias()));
            } catch (UnsupportedEncodingException ex) {
                Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
            }
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(getTo()));
            message.setSubject(getSubject());


// Transport It
            Transport transport = mailSession.getTransport();
            transport.connect();
            transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
            transport.close();
        } catch (NoSuchProviderException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void initSendGrid() {
        try {
            PropsReader pr = new PropsReader();

            pr.init("env.comms.properties");
            username = pr.setKey("mailUsername").getVal();
            password = pr.setKey("mailPassword").getVal();

            // Get system properties object
            Properties props = System.getProperties();

            // Gmail mail server
            props.put("mail.smtp.starttls.enable", "true");
// SendGrid
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", SMTP_HOST_NAME);
            props.put("mail.smtp.port", "587");
            props.put("mail.smtp.auth", "true");

// Get the default Session object.
            Authenticator auth = new SMTPAuthenticator();
            Session mailSession = Session.getDefaultInstance(props, auth);
            mailSession.setDebug(true);
            Transport transport = mailSession.getTransport();

            MimeMessage message = new MimeMessage(mailSession);

            Multipart multipart = new MimeMultipart("alternative");
            BodyPart part1 = new MimeBodyPart();
            part1.setText("This is multipart mail and u read part1……");
            BodyPart part2 = new MimeBodyPart();
            part2.setContent("<b>This is multipart mail and u read part2……</b>", "text/html");
            multipart.addBodyPart(part1);
            multipart.addBodyPart(part2);

            message.setContent(multipart);
            message.setFrom(new InternetAddress("tonyennis@yahoo.com"));
            message.setSubject("This is the subject");
            //		message.addRecipient(Message.RecipientType.TO, new InternetAddress("tonyennis@yahoo.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(getTo()));

            transport.connect();
            transport.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
            transport.close();
        } catch (NoSuchProviderException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    private class SMTPAuthenticator extends javax.mail.Authenticator {

        public PasswordAuthentication getPasswordAuthentication() {
            String username = SMTP_AUTH_USER;
            String password = SMTP_AUTH_PWD;
            return new PasswordAuthentication(username, password);
        }
    }

    public void initGmail() {
        PropsReader pr = new PropsReader();

        pr.init("env.comms.properties");
        username = pr.setKey("mailUsername").getVal();
        password = pr.setKey("mailPassword").getVal();

        // Get system properties object
        Properties props = System.getProperties();

        // Gmail mail server
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        // Get the default Session object.
        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {

            Message message = new MimeMessage(session);

            try {
                message.setFrom(new InternetAddress(getFrom(), getFromAlias()));
            } catch (UnsupportedEncodingException ex) {
                Logger.getLogger(Mailer.class.getName()).log(Level.SEVERE, null, ex);
            }
            InternetAddress[] addresses = InternetAddress.parse(getTo());
            message.setRecipients(Message.RecipientType.TO, addresses);

            message.setSubject(getSubject());
            message.setContent(getMsgbody(), "text/html; charset=utf-8");

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getTo() {
        return this.to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMsgbody() {
        return msgbody;
    }

    public void setMsgbody(String msgbody) {
        this.msgbody = msgbody;
    }

    public String getFromAlias() {
        return fromAlias;
    }

    public void setFromAlias(String fromAlias) {
        this.fromAlias = fromAlias;
    }

    public List<String> getToList() {
        return toList;
    }

    public void setToList(List<String> toList) {
        this.toList = toList;
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

    public static void main(String[] args) {
        Mailer m = new Mailer();
        m.setFrom("bookings@mybusinesspal.com");
        m.setFromAlias("IOT-Booking-Admin");
        m.setTo("tonyennis@yahoo.com, tonygennis@gmail.com, philip.ennis@yahoo.ie");

        m.setSubject("INF: Bookings Confirmation Email");

        StringBuilder b = new StringBuilder();
        b.append("<html>");
        b.append("<head>");
        b.append("<title>Bookings with Sports Manager</title>");
        b.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
        b.append("<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>");
        b.append("<style>");
        b.append("#header,#footer { background-color:CornflowerBlue; }");
        b.append("h1 { color:black; text-align: center; }");
        b.append("</style>");
        b.append("</head>");
        b.append("<body>");
        b.append("<div id=header>");
        b.append("<h2>Sports Manager 360 - Online Booking Systems</h2>");
        b.append("<h3>Bringing booking to a new level!!!</h3>");
        b.append("</div>");

        m.setMsgbody(b.toString());
        m.init();

    }

}
