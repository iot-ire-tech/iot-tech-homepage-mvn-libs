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
public class EntReciept extends EntIds {

	ArrayList<EntProduct> items = new ArrayList<>();

	public ArrayList<EntProduct> getItems() {
		return items;
	}

	public void setItems(ArrayList<EntProduct> items) {
		this.items = items;
	}

}
