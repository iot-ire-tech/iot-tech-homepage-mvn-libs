/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils.restclient;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientRequest;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 *
 * @author ae
 */
public class RestClient {

	Client client;
	WebResource webResource;	// Could have one for earch rest service
	String url;

	String payload;
	ClientResponse response;
	ClientRequest request;

	public RestClient(String url) {
		this.url = url;
		client = Client.create();
		webResource = client.resource(url);

	}

	public RestClient() {

	}

	public RestClient init() {
		client = Client.create();
		return this;
	}

	// 1.
	public RestClient updateRequestSource(String url) {
		this.url = url;
		client = Client.create();
		webResource = client.resource(url);
		return this;
	}

	public Client getClient() {
		return client;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public RestClient sendGetRequest() {
		try {
			response = webResource.accept("application/json").get(ClientResponse.class);
		} catch (Exception e) {
			System.out.println("ERR: Connection Refused By JSON Server !!!! On Get Request");
			System.out.println("INF: Message (" + e.getMessage() + ")");
			System.exit(-1);
		}
		return this;
	}

	public RestClient sendPostRequest(String json) {
		try {
			response = webResource.type("application/json").post(ClientResponse.class, json);
		} catch (Exception e) {
			System.out.println("ERR: Connection Refused By JSON Server !!!! On Post Request");
			System.out.println("INF: Payload (" + json + ")");
			System.out.println("INF: URL (" + url + ")");
			System.out.println("INF: Message (" + e.getMessage() + ")");
			if (response.getStatus() != 201) {
				throw new RuntimeException("ERR : HTTP error code : " + response.getStatus());
			}
			System.exit(-1);
		}
		return this;
	}

	public RestClient sendPutRequest(String json) {
		response = webResource.type("application/json").put(ClientResponse.class, json);
		return this;
	}

	public RestClient sendDeleteRequest() {
		response = webResource.type("application/json").delete(ClientResponse.class);
		return this;
	}

	public RestClient sendHeadRequest(String json) {
		response = webResource.type("application/json").head();
		return this;
	}

	public RestClient sendOptionsRequest(String json) {
		response = webResource.type("application/json").options(ClientResponse.class);
		return this;
	}

	public int getExitCode() {

		return response.getStatus();
	}

	public boolean isResponseGood() {

		switch (response.getStatus()) {
			case 200:
				return true;
			case 201:
				return true;
			case 500:
				System.err.println("\nFailed : Possible You tried to create duplicate resource: " + response.getStatus());
				System.err.println("Failed : Status Info: " + response.getStatusInfo());
				System.err.println("Failed : HTTP error code : " + response.getStatus());
				return false;
			default:
				return false;
		}

	}

	public String getPayload() {

		return response.getEntity(String.class);
	}

	public String getObjectWrappedPayload(String tag) {

		return "{\n\"" + tag + "\" : " + response.getEntity(String.class) + "\n}";
	}

	public static void main(String[] args) {

		String username = "";
		String password = "";
		String basepath = "http://localhost:3001";
		String query = basepath + "/patrons?account.username=" + username + "&account.password=" + password;
		RestClient jr = new RestClient(query);

		jr.init();
		jr.sendGetRequest();
		String payload = jr.getPayload();
		System.out.println("INF: Payload Returned (" + payload + ")");

		System.exit(0);
		// First Request
//		if (jr.sendGetRequest().isResponseGood()) {
//			System.out.println("Bookable Resources .... \n" + jr.getPayload());
//		}
		// New Request
//		jr.updateRequestSource("http://localhost:3000/resources");
//		if (jr.sendGetRequest().isResponseGood()) {
//			System.out.println("Resource Pool .... \n" + jr.getPayload());
//		}
		// Post Request
		String json_students;

		// Notice Object is wrapped
		// Notice ID is a number!!!
		json_students = " {\n"
			+ "			\"id\": 3.1,\n"
			+ "			\"name\": \"Squash Court\",\n"
			+ "			\"version\": \"1\",\n"
			+ "			\"note\": \"Rental Cost just 5 EUR!!!\",\n"
			+ "			\"type\": \"Place\",\n"
			+ "			\"resourceAccessibility\": \"Private\",\n"
			+ "			\"cost\": {\n"
			+ "				\"amount\": 5000.0,\n"
			+ "				\"currency\": \"EUR\"\n"
			+ "			},\n"
			+ "			\"rentalCost\": {\n"
			+ "				\"amount\": 5.0,\n"
			+ "				\"currency\": \"EUR\"\n"
			+ "			},\n"
			+ "			\"owner\": {\n"
			+ "				\"name\": \"SportsLink\"\n"
			+ "			}\n"
			+ "		}";

		jr.updateRequestSource("http://localhost:3000/students_unrooted");
		if (jr.sendPostRequest(json_students).isResponseGood()) {
			System.out.println("\n\nResource Pool .... \n" + jr.getPayload());
			System.exit(0);
		}
		System.exit(-1);

	}
}
