/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package google;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.*;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.dns.Dns;
import com.google.api.services.dns.DnsScopes;
import com.google.api.services.dns.model.Change;
import com.google.api.services.dns.model.ChangesListResponse;
import com.google.api.services.dns.model.ResourceRecordSet;
import com.google.gson.Gson;
import com.models.enterprise.EntIds;
import com.models.stripe.entities.connect.EntAccount;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import servlet.MailCreditCardTransactionUx;
import servlet.PropsReader;
import stripe.account.AccountGet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 * @author ennisa Provide more information in order to enable payments and payouts for this account. https://stripe.com/docs/connect/quickstart
 */
@WebServlet(name = "DnsCreateRecord", urlPatterns = {"/DnsCreateRecord"})
public class GoogleDnsRecordCreate extends HttpServlet {
    String s;
    Gson gson;
    StringBuilder sb;
    String project = "sportsco-217112";
    String managedZone = "myzone";

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        gson = new Gson();

        try {
            response.setContentType("application/json;charset=UTF-8");
            sb = new StringBuilder();
            while ((s = request.getReader().readLine()) != null) {
                sb.append(s);
            }
            EntRecordSet uxPayload = gson.fromJson(sb.toString(), EntRecordSet.class);

            System.out.println("INF: Processed DNS Starting");

            ServletContext application = getServletContext();

            // Get Access to Change
            Change requestBody = new Change();

            // Add Record.
            ResourceRecordSet rs = new ResourceRecordSet();
            rs.setName(uxPayload.getName());
            rs.setType("A");
            rs.setTtl(300);
            List<String> ips = new ArrayList<>();
            ips.add(uxPayload.getIp());
            rs.setRrdatas(ips);

            List<ResourceRecordSet> additions = new ArrayList<>();
            additions.add(rs);
            requestBody.setAdditions(additions);

            // Get DNS handle
            Dns dnsService = null;
            dnsService = createDnsService2(application);


            // Do It
            Dns.Changes.Create req = dnsService.changes().create(project, managedZone, requestBody);
            Change recordRsp = req.execute();

            // List
            Dns.Changes.List listReq = dnsService.changes().list(project, managedZone);
            ChangesListResponse listResponse;
            do {
                listResponse = listReq.execute();
                if (listResponse.getChanges() == null) {
                    continue;
                }
                for (Change change : listResponse.getChanges()) {
                    // TODO: Change code below to process each `change` resource:
                    System.out.println(change);
                }
                listReq.setPageToken(listResponse.getNextPageToken());
            } while (listResponse.getNextPageToken() != null);


            response.getOutputStream().print(gson.toJson(recordRsp));
            response.getOutputStream().flush();
            System.out.println("INF: Processed DNS Completed");
            System.out.println(listResponse);


        } catch (GeneralSecurityException e) {
            e.printStackTrace();
        }

    }

    public static Dns createDnsService() throws IOException, GeneralSecurityException {

        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();


        GoogleCredential credential = GoogleCredential.getApplicationDefault();
        if (credential.createScopedRequired()) {
            credential = credential.createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));
        }

        return new Dns.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName("Google-DnsSample/0.1")
                .build();
    }


    public static Dns createDnsService2(ServletContext application) throws IOException, GeneralSecurityException {

        String afile = "/WEB-INF/sk.json";
        afile = "/WEB-INF/sk-dns.json";
        String apath = application.getRealPath(afile);
        File file = new File(apath);
        FileInputStream in = new FileInputStream(file);

        GoogleCredential credential = GoogleCredential
                .fromStream(in)
                .createScoped(Collections.singleton(DnsScopes.NDEV_CLOUDDNS_READWRITE)); // GOOGLE_APPLICATION_CRE

        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        if (credential.createScopedRequired()) {
            credential = credential.createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));
        }

        return new Dns.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName("Google-DnsSample/0.1")
                .build();
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);

    }

    @Override
    public void init() throws ServletException {

    }

    public void googlejwtStugff() {
//        Date dateNow = new Date();
//        Date exp = new Date();
//
//        long nowMillis = System.currentTimeMillis();
//        nowMillis = dateNow.getTime();
//        dateNow = new Date(nowMillis);
//        long epoch_secs = (nowMillis / 1000);
//        long epoch_plus_min = epoch_secs + 60;
//        long epoch_plus_hr = epoch_secs + ((60 * 60) * 1);
//        exp = new Date(epoch_plus_hr * 1000);
//        System.out.println("INF: Date Now (" + dateNow + "), " + epoch_secs);
//        System.out.println("INF: Date Exp (" + exp + "), " + epoch_plus_hr);
//
//
//        // signing
//        String client_email = "sportsco-217112@appspot.gserviceaccount.com";
//        String private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5arNv9CWCJsu6\nuhjU2Qs6jTuSETBGSLqM/lw0L3VwNpCDoHCjZ1Rbl/PaV0o0h5l5uXS9aPUd1mbF\nXY6sX6WP8Vf+pb2qCRDJnYL3D/3AVCbabZMqT0XvHB2sgkyhvWyrYr73MXx6aoeW\nCHAzsWZcJBZ+yUhli5v1KiK0up8A1bNkttyyKescANKFsTVhTHT3kiAnkVYFsCAt\n6PPguh/rsV4d6fWG0ARRqdLgbBL2YokLO0URtRFSw7ngV3/IuRl52mIOG6ktofKn\nERKA2rV6pQJ85LtzxO2WkKwtr0EiwCfALzggK2pJw5lOXV7j5GJnCfZnQ0jTMCZl\nX7FeQ++nAgMBAAECggEAHNq+MOUe3y8YE6d5TMpiunUXI6c5dX6aSsMcveGdgN3P\nmy72cx9rRn5nrFSwOhYuFqjQl4IEFJAfLzCyOXYAXF2zvW+1NocG+JvisShpFgCi\niT8gdfxJ3FOU9JnUa3PV5k1NfZzTC8k/RLnByEb1BdAh5g9/N4+Z23XNWoW+T9Eu\nCchusgLeqwREhwsEL0KyqCFR9+LgTytu3fFZ1m4JyRBfoDW+EVAV8YRrTUXiIMbR\n/QbSM8fbCSTKM+MtWHdSqi6hQMjjjIhGK+wC2ZRw0uOVNzitdNtoJLMMyK4yeaGO\nEE1HKrqF1aUOxxDWgAD4fgzffzUWC5S3sOknLkmdSQKBgQDaIWRZOp0XGkO+32rg\nIIphyaYZWhsCbFm8w/kELRYxv0NS63uPHGcPk1hMmEAye43pxZkv+P1CGHp/k7g8\nP5u/IP6ctjHLwHhv/R1CHqFTxeXJgF8yKX6NWG/mnfOgznWL4KZNFI0E4BT6I7rW\nL2p/J95nHKTCa7A+DE8KIOjyTwKBgQDZm2GYdg0AXw6YVE1sKLGG8eXdsue5L3W9\nCz4m8AYRzCwYPkHQWkhxpJoSGgol3gSiMANzkuZAMtKpywiH+3DeZP3Wr6RPcN+H\nWlLToLbEbqR4hH3jeyQ1nD0wyFcSg3BFp7f0L6aIDEFK4PcK/bVxoZLCzPugVnQm\nPUYdrPWPKQKBgApHKINLz7sW8bo8rLyCzAJvjfQD2uHyWQgb88/OkA0oBfQSRHAp\n1nFVcAOr6Np4F+e798va35QNszfvre6o0J3g4B5iN1ZyazpbotVKvC9GU916vwGO\nEvh2Ak/LgX9COyesHinjngFszZA7vsH42fvD1SbmopzGljdWPSMtCczhAoGAKpBV\nB7BXnLH7NdqPhk9zYhTgxHuhDbz1x7NyRcV/Om34Vgmfb/So5OmwZUgIoh2KRHsl\nwa6DMR1/zUx0b7zD+AxDBoI2nn9SibQmLVTrSwLlUtl/kkZc78uOwIL/XRSumkFT\nHwVPCp9zCgV07QZxPje/cDEOKu+eKnijxVw2b/kCgYB/jDRcKUTX7BDsF7GmpLoI\nC5EkooS7HFNk87+mtUvpitf19WYRViAkP7et1lah8xYGbv7Z7jV3QexKsPgxH8fP\nAOs0QIDW6T2ASc6o7Eeugr9G1jLzjQ/pFS0yXIVIDWjTdtenhgMvm/765Fn7R0FU\nn4wPO22iy9ZZ+yaUGKVNHg==\n-----END PRIVATE KEY-----\n";
//        private_key = "-----BEGIN PRIVATE KEY-----" +
//                "\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5arNv9CWCJsu6" +
//                "\nuhjU2Qs6jTuSETBGSLqM/lw0L3VwNpCDoHCjZ1Rbl/PaV0o0h5l5uXS9aPUd1mbF" +
//                "\nXY6sX6WP8Vf+pb2qCRDJnYL3D/3AVCbabZMqT0XvHB2sgkyhvWyrYr73MXx6aoeW" +
//                "\nCHAzsWZcJBZ+yUhli5v1KiK0up8A1bNkttyyKescANKFsTVhTHT3kiAnkVYFsCAt" +
//                "\n6PPguh/rsV4d6fWG0ARRqdLgbBL2YokLO0URtRFSw7ngV3/IuRl52mIOG6ktofKn" +
//                "\nERKA2rV6pQJ85LtzxO2WkKwtr0EiwCfALzggK2pJw5lOXV7j5GJnCfZnQ0jTMCZl" +
//                "\nX7FeQ++nAgMBAAECggEAHNq+MOUe3y8YE6d5TMpiunUXI6c5dX6aSsMcveGdgN3P" +
//                "\nmy72cx9rRn5nrFSwOhYuFqjQl4IEFJAfLzCyOXYAXF2zvW+1NocG+JvisShpFgCi" +
//                "\niT8gdfxJ3FOU9JnUa3PV5k1NfZzTC8k/RLnByEb1BdAh5g9/N4+Z23XNWoW+T9Eu" +
//                "\nCchusgLeqwREhwsEL0KyqCFR9+LgTytu3fFZ1m4JyRBfoDW+EVAV8YRrTUXiIMbR" +
//                "\n/QbSM8fbCSTKM+MtWHdSqi6hQMjjjIhGK+wC2ZRw0uOVNzitdNtoJLMMyK4yeaGO" +
//                "\nEE1HKrqF1aUOxxDWgAD4fgzffzUWC5S3sOknLkmdSQKBgQDaIWRZOp0XGkO+32rg" +
//                "\nIIphyaYZWhsCbFm8w/kELRYxv0NS63uPHGcPk1hMmEAye43pxZkv+P1CGHp/k7g8" +
//                "\nP5u/IP6ctjHLwHhv/R1CHqFTxeXJgF8yKX6NWG/mnfOgznWL4KZNFI0E4BT6I7rW" +
//                "\nL2p/J95nHKTCa7A+DE8KIOjyTwKBgQDZm2GYdg0AXw6YVE1sKLGG8eXdsue5L3W9" +
//                "\nCz4m8AYRzCwYPkHQWkhxpJoSGgol3gSiMANzkuZAMtKpywiH+3DeZP3Wr6RPcN+H" +
//                "\nWlLToLbEbqR4hH3jeyQ1nD0wyFcSg3BFp7f0L6aIDEFK4PcK/bVxoZLCzPugVnQm" +
//                "\nPUYdrPWPKQKBgApHKINLz7sW8bo8rLyCzAJvjfQD2uHyWQgb88/OkA0oBfQSRHAp" +
//                "\n1nFVcAOr6Np4F+e798va35QNszfvre6o0J3g4B5iN1ZyazpbotVKvC9GU916vwGO" +
//                "\nEvh2Ak/LgX9COyesHinjngFszZA7vsH42fvD1SbmopzGljdWPSMtCczhAoGAKpBV" +
//                "\nB7BXnLH7NdqPhk9zYhTgxHuhDbz1x7NyRcV/Om34Vgmfb/So5OmwZUgIoh2KRHsl" +
//                "\nwa6DMR1/zUx0b7zD+AxDBoI2nn9SibQmLVTrSwLlUtl/kkZc78uOwIL/XRSumkFT" +
//                "\nHwVPCp9zCgV07QZxPje/cDEOKu+eKnijxVw2b/kCgYB/jDRcKUTX7BDsF7GmpLoI" +
//                "\nC5EkooS7HFNk87+mtUvpitf19WYRViAkP7et1lah8xYGbv7Z7jV3QexKsPgxH8fP" +
//                "\nAOs0QIDW6T2ASc6o7Eeugr9G1jLzjQ/pFS0yXIVIDWjTdtenhgMvm/765Fn7R0FU" +
//                "\nn4wPO22iy9ZZ+yaUGKVNHg==" +
//                "\n-----END PRIVATE KEY-----" +
//                "\n";
//        private_key = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5arNv9CWCJsu6" +
//                "uhjU2Qs6jTuSETBGSLqM/lw0L3VwNpCDoHCjZ1Rbl/PaV0o0h5l5uXS9aPUd1mbF" +
//                "XY6sX6WP8Vf+pb2qCRDJnYL3D/3AVCbabZMqT0XvHB2sgkyhvWyrYr73MXx6aoeW" +
//                "CHAzsWZcJBZ+yUhli5v1KiK0up8A1bNkttyyKescANKFsTVhTHT3kiAnkVYFsCAt" +
//                "6PPguh/rsV4d6fWG0ARRqdLgbBL2YokLO0URtRFSw7ngV3/IuRl52mIOG6ktofKn" +
//                "ERKA2rV6pQJ85LtzxO2WkKwtr0EiwCfALzggK2pJw5lOXV7j5GJnCfZnQ0jTMCZl" +
//                "X7FeQ++nAgMBAAECggEAHNq+MOUe3y8YE6d5TMpiunUXI6c5dX6aSsMcveGdgN3P" +
//                "my72cx9rRn5nrFSwOhYuFqjQl4IEFJAfLzCyOXYAXF2zvW+1NocG+JvisShpFgCi" +
//                "iT8gdfxJ3FOU9JnUa3PV5k1NfZzTC8k/RLnByEb1BdAh5g9/N4+Z23XNWoW+T9Eu" +
//                "CchusgLeqwREhwsEL0KyqCFR9+LgTytu3fFZ1m4JyRBfoDW+EVAV8YRrTUXiIMbR" +
//                "/QbSM8fbCSTKM+MtWHdSqi6hQMjjjIhGK+wC2ZRw0uOVNzitdNtoJLMMyK4yeaGO" +
//                "EE1HKrqF1aUOxxDWgAD4fgzffzUWC5S3sOknLkmdSQKBgQDaIWRZOp0XGkO+32rg" +
//                "IIphyaYZWhsCbFm8w/kELRYxv0NS63uPHGcPk1hMmEAye43pxZkv+P1CGHp/k7g8" +
//                "P5u/IP6ctjHLwHhv/R1CHqFTxeXJgF8yKX6NWG/mnfOgznWL4KZNFI0E4BT6I7rW" +
//                "L2p/J95nHKTCa7A+DE8KIOjyTwKBgQDZm2GYdg0AXw6YVE1sKLGG8eXdsue5L3W9" +
//                "Cz4m8AYRzCwYPkHQWkhxpJoSGgol3gSiMANzkuZAMtKpywiH+3DeZP3Wr6RPcN+H" +
//                "WlLToLbEbqR4hH3jeyQ1nD0wyFcSg3BFp7f0L6aIDEFK4PcK/bVxoZLCzPugVnQm" +
//                "PUYdrPWPKQKBgApHKINLz7sW8bo8rLyCzAJvjfQD2uHyWQgb88/OkA0oBfQSRHAp" +
//                "1nFVcAOr6Np4F+e798va35QNszfvre6o0J3g4B5iN1ZyazpbotVKvC9GU916vwGO" +
//                "Evh2Ak/LgX9COyesHinjngFszZA7vsH42fvD1SbmopzGljdWPSMtCczhAoGAKpBV" +
//                "B7BXnLH7NdqPhk9zYhTgxHuhDbz1x7NyRcV/Om34Vgmfb/So5OmwZUgIoh2KRHsl" +
//                "wa6DMR1/zUx0b7zD+AxDBoI2nn9SibQmLVTrSwLlUtl/kkZc78uOwIL/XRSumkFT" +
//                "HwVPCp9zCgV07QZxPje/cDEOKu+eKnijxVw2b/kCgYB/jDRcKUTX7BDsF7GmpLoI" +
//                "C5EkooS7HFNk87+mtUvpitf19WYRViAkP7et1lah8xYGbv7Z7jV3QexKsPgxH8fP" +
//                "AOs0QIDW6T2ASc6o7Eeugr9G1jLzjQ/pFS0yXIVIDWjTdtenhgMvm/765Fn7R0FU" +
//                "n4wPO22iy9ZZ+yaUGKVNHg==";
//
//        System.out.println(private_key);
//        //
//        String secret = "95b073b020d87bc8f22e7db7780bb7108946e500";
//        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
//        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(private_key);
//        Key signingKey = new SecretKeySpec(apiKeySecretBytes, private_key);
//
//
//        String scope = "https://www.googleapis.com/auth/userinfo.email";
//        scope = "https://www.googleapis.com/auth/ndev.clouddns.readonly";
//        scope = "https://www.googleapis.com/auth/userinfo.email";
//        String client_id = "dns-sla@sportsco-217112.iam.gserviceaccount.com";
//
//        String aud = "https://oauth2.googleapis.com/token"; // official
//        aud = "https://accounts.google.com/o/oauth2/token"; // actual
//
//        String jwt = Jwts.builder()
//                .setIssuer(client_id)
//                .setAudience("https://oauth2.googleapis.com/token")
//                .setExpiration(Date.from(Instant.ofEpochSecond(epoch_secs)))
//                .setIssuedAt(Date.from(Instant.ofEpochSecond(epoch_plus_min)))
//                .claim("iss", client_id)
//                .claim("scope", scope)
//                .claim("aud", "https://oauth2.googleapis.com/token")
//                .signWith(SignatureAlgorithm.HS256, signingKey)
//                .compact();
//
//        System.out.println("INF: JWT (" + jwt + ")");
//        // Next Call OAuth Server to token
//
//
    }
}

