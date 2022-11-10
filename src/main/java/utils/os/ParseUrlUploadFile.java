/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils.os;

/**
 *
 * @author ennisa
 */
public class ParseUrlUploadFile {

	String url;
	String uniqueKeyValue;
	String clientId;
	String targetId;
	// Category of item uplaoded
	String itemTagKeyValue;
	String itemTag;

	String mediaTypeKeyValue;
	String mediaType;
	String tmp;

	public ParseUrlUploadFile(String url) {
		this.url = url;
	}

	public void init() {

		// 392436_0
		tmp = url.split("&")[0];
		uniqueKeyValue = tmp.split("=")[1];

		clientId = uniqueKeyValue.split("_")[0];
		targetId = uniqueKeyValue.split("_")[1];
		System.out.println("INF: clientId (" + clientId + ")");
		System.out.println("INF: targetId (" + targetId + ")");

		itemTagKeyValue = url.split("&")[1];
		itemTag = itemTagKeyValue.split("=")[1];
		itemTag = itemTag.replace(" ", "");
		System.out.println("INF: itemTag (" + itemTag + ")");

		mediaTypeKeyValue = url.split("&")[2];
		mediaType = mediaTypeKeyValue.split("=")[1];
		mediaType = mediaType.replace(" ", "");
		System.out.println("INF: mediaType (" + mediaType + ")");
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getUniqueKeyValue() {
		return uniqueKeyValue;
	}

	public void setUniqueKeyValue(String uniqueKeyValue) {
		this.uniqueKeyValue = uniqueKeyValue;
	}

	public String getTargetId() {
		return targetId;
	}

	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getItemTagKeyValue() {
		return itemTagKeyValue;
	}

	public void setItemTagKeyValue(String itemTagKeyValue) {
		this.itemTagKeyValue = itemTagKeyValue;
	}

	public String getItemTag() {
		return itemTag;
	}

	public void setItemTag(String itemTag) {
		this.itemTag = itemTag;
	}

	public String getMediaTypeKeyValue() {
		return mediaTypeKeyValue;
	}

	public void setMediaTypeKeyValue(String mediaTypeKeyValue) {
		this.mediaTypeKeyValue = mediaTypeKeyValue;
	}

}
