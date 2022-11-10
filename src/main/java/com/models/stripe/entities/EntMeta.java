/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities;

import com.models.enterprise.EntIds;

import java.util.ArrayList;

/**
 *
 * @author ennisa
 */
public class EntMeta extends EntIds {

	ArrayList<EntMap> metadata = new ArrayList<>();

	public ArrayList<EntMap> getMetadata() {
		return metadata;
	}

	public void setMetadata(ArrayList<EntMap> metadata) {
		this.metadata = metadata;
	}

}
