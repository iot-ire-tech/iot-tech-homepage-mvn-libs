/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.util.ArrayList;

import com.models.enterprise.EntIds;
import com.models.stripe.entities.EntDataBase64;
import com.models.stripe.entities.EntProduct;

/**
 *
 * @author ennisa
 */
public class EntMailShoppingReceipt extends EntIds {

	String email = "";
	String fullName = "";
	String webinarData = "";
	ArrayList<String> mediaLink = new ArrayList<>();
	EntDataBase64 barcode = new EntDataBase64();
	EntProduct shoppingItem = new EntProduct();

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public EntDataBase64 getBarcode() {
		return barcode;
	}

	public void setBarcode(EntDataBase64 barcode) {
		this.barcode = barcode;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public EntProduct getShoppingItem() {
		return shoppingItem;
	}

	public void setShoppingItem(EntProduct shoppingItem) {
		this.shoppingItem = shoppingItem;
	}

	public ArrayList<String> getMediaLink() {
		return mediaLink;
	}

	public void setMediaLink(ArrayList<String> mediaLink) {
		this.mediaLink = mediaLink;
	}

	public String getWebinarData() {
		return webinarData;
	}

	public void setWebinarData(String webinarData) {
		this.webinarData = webinarData;
	}

}
