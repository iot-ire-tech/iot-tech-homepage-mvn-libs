package comms.mail.customer.videohub;

import com.models.db.mm.EntMm;
import com.models.db.mm.MmItems;
import com.models.enterprise.endpoints.EntEndpoints;
import kong.unirest.HttpResponse;
import kong.unirest.Unirest;

public class MailBusinessReceiptVideoHub {


    public static void main(String args) {
        int counter = 0;
        EntEndpoints ep = new EntEndpoints();


        String url = "http://localhost:8084/resources/media/clients/acct/video/photoId";

        // Input
        String mmId = "5f4675304ddf8b6c0004122c";

        // Service .....
        HttpResponse<EntMm> mmItem = Unirest.get(ep.dbMm + "/" + mmId)
                .header("accept", "application/json")
                .header("x-apikey", ep.key)
                .header("Access-Control-Allow-Headers", "*")
                .asObject(EntMm.class);
        for (MmItems mmItems : mmItem.getBody().getItems()) {
            System.out.println("Media Link#" + ++counter + ": <a target='_blank' href=" + url + "/" + mmItems.getMedia().getLink() + ">Video Hub File #" + counter + "</a>");
        }


    }
}
