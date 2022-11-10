package security.googleapi;


import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.*;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.PrivateKey;

public class AuthMe {


    public static void main(String args[]) throws FileNotFoundException {
        String apiAccessToken = null;
        String project = "sportsco-217112";
        String zone = "myzone";

//
        try {
//            ServletContext application = getServletContext();
//
//            String path = "/WEB-INF/template/input.xls";
//            String realPath = getServleStContext().getRealPath(path);
//            FileInputStream in = new FileInputStream(file);


            GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream("/WEB-INF/sk.json"));
            PrivateKey privateKey = credential.getServiceAccountPrivateKey();
            String privateKeyId = credential.getServiceAccountPrivateKeyId();

            apiAccessToken = credential.getAccessToken();
            System.out.println("Token **********" + apiAccessToken);
            credential.getServiceAccountPrivateKey();
            privateKeyId = credential.getServiceAccountPrivateKeyId();
            System.out.println(" privateKeyId *************" + privateKeyId);

            HttpTransport httpTransport = credential.getTransport();
            HttpRequestFactory httReqFactory = httpTransport.createRequestFactory(credential);

            // https://www.googleapis.com/dns/v1/projects/PROJECT-NAME/managedZones/DNSZONE/changes
            // POST https://www.googleapis.com/dns/v1/projects/sportsco-217112/managedZones/myzone/changes
            String listChanges = "https://dns.googleapis.com/dns/v1beta2/projects/" + project + "/managedZones/" + zone + "/changes";

            GenericUrl url = new GenericUrl(listChanges);
            HttpRequest req = httReqFactory.buildGetRequest(url);
            req.getHeaders().setContentType("application/json");
            HttpResponse response = req.execute();
            System.out.println("service response" + response.getContent().toString());

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
