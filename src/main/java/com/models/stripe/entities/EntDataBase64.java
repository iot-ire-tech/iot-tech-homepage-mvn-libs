/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

/**
 *
 * @author ennisa
 */
public class EntDataBase64 extends EntIds {

	String uploadDir = "";
	String imgExt = "";
	String imgString = "";

	public String getUploadDir() {
		return uploadDir;
	}

	public void setUploadDir(String uploadDir) {
		this.uploadDir = uploadDir;
	}

	public String getImgString() {
		return imgString;
	}

	public void setImgString(String imgString) {
		this.imgString = imgString;
	}

	public String getImgExt() {
		return imgExt;
	}

	public void setImgExt(String imgExt) {
		this.imgExt = imgExt;
	}

}
