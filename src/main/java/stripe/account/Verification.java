/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.account;

import com.stripe.exception.StripeException;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author ennisa
 */
public class Verification {

    Map<String, Object> verification = new HashMap<>();
    Map<String, Object> proof = new HashMap<>();
    com.stripe.model.File sfile;
    Map<String, Object> params = new HashMap<>();
    java.io.File fh;
    String fn = "";

    // Mave copies the resource folder to target classes folder!!!!
    String prefix = "/media/clients/acct/image/default/";


    public Verification() {
        // Test Mode
        prefix = "";
        prefix = "/src/main/resources/media/clients/acct/image/default/passport.png";
        prefix = "/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/resources/media/clients/acct/image/default/passport.png";
        prefix = "/home/ennisa/workspace/projects/iot-tech-homepage-mvn/src/main/webapp/resources/media/clients/acct/image/default";
        // /acct/image/default/1HR0M7B5TxLur0iI_proof-address-revenue.jpeg
    }

    public Verification addDocument(String front, String back, String purpose) {
        try {
            proof.clear();
            verification.clear();

            fh = new java.io.File(prefix + front);
            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("front", sfile.getId());

            fh = new java.io.File(prefix + back);
            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("back", sfile.getId());

            verification.put("document", proof);
        } catch (StripeException ex) {
            Logger.getLogger(AccountAddCompany.class
                    .getName()).log(Level.SEVERE, null, ex);
        }

        return this;

    }

    public Verification addDocumentFontOnly(String front, String purpose) {
        try {
            proof.clear();
            verification.clear();
            fh = new java.io.File(prefix + front);

            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("front", sfile.getId());

            verification.put("document", proof);
        } catch (StripeException e) {
            e.printStackTrace();
        }

        return this;

    }

    public Verification addAdditionalFrontOnly(String front, String purpose) {
        try {
            proof.clear();
            fh = new java.io.File(prefix + front);
            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("front", sfile.getId());
            verification.put("additional_document", proof);
        } catch (StripeException ex) {
            Logger.getLogger(AccountAddCompany.class
                    .getName()).log(Level.SEVERE, null, ex);
        }

        return this;

    }

    public Verification addAdditional(String front, String back, String purpose) {
        try {
            proof.clear();
            fh = new java.io.File(prefix + front);
            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("front", sfile.getId());

            fh = new java.io.File(prefix + back);
            params.clear();
            params.put("purpose", purpose);
            params.put("file", fh);
            sfile = com.stripe.model.File.create(params);
            proof.put("back", sfile.getId());

            verification.put("additional_document", proof);

        } catch (StripeException ex) {
            Logger.getLogger(AccountAddCompany.class
                    .getName()).log(Level.SEVERE, null, ex);
        }

        return this;

    }

    public Map<String, Object> getVerification() {
        return verification;
    }

    public void setVerification(Map<String, Object> verification) {
        this.verification = verification;
    }

}
