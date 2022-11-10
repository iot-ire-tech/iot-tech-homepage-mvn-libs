/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.models.stripe.entities.connect;

/**
 *
 * @author ennisa
 */
public class EntVerification {

	EntDocument document;
	EntDocument additionaDocument;

	public EntDocument getDocument() {
		return document;
	}

	public void setDocument(EntDocument document) {
		this.document = document;
	}

	public EntDocument getAdditionaDocument() {
		return additionaDocument;
	}

	public void setAdditionaDocument(EntDocument additionaDocument) {
		this.additionaDocument = additionaDocument;
	}

}
