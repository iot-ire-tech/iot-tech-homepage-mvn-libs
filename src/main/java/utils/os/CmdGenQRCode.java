/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils.os;

import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ennisa
 */
public class CmdGenQRCode {

	Process proc;
	File file;

	String clientId;
	String patronId;
	String token;
	String outputDir;

	public CmdGenQRCode(String clientId, String patronId, String outputDir) {
		this.clientId = clientId;
		this.patronId = patronId;
		this.outputDir = outputDir;
	}

	public void init() {
		this.token = clientId + "_" + patronId;
	}

	public void createUserValidationCode() {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("qrencode");
			sb.append(" ");
			sb.append("-o");
			sb.append(" ");
			sb.append(this.outputDir + "/" + this.token + "_qr_auth.png");
			sb.append(" ");
			sb.append(this.token);
			proc = Runtime.getRuntime().exec(sb.toString());
			proc.waitFor();
			System.out.println("INF: Executing Command (" + sb.toString() + ")");
		} catch (IOException ex) {
			Logger.getLogger(CmdGenQRCode.class.getName()).log(Level.SEVERE, null, ex);
		} catch (InterruptedException ex) {
			Logger.getLogger(CmdGenQRCode.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public void readValidationCode() throws IOException, InterruptedException {

	}

	public static void main(String args[]) {

	}

	public Process getProc() {
		return proc;
	}

	public void setProc(Process proc) {
		this.proc = proc;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getPatronId() {
		return patronId;
	}

	public void setPatronId(String patronId) {
		this.patronId = patronId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
