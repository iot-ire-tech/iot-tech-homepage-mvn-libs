/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils.os;

import java.io.File;
import java.io.IOException;

/**
 *
 * @author ennisa
 */
public class CmdConvert {

	Process proc;
	File file;
	String filename;
	String ext;

	String absoluteOutputFile;
	String newfilename;
	String base;

	public CmdConvert(File file, String newfilename) {
		this.file = file;
		this.newfilename = newfilename;
	}

	public void init() {

		System.out.println("INF: Uploaded getAbsoluteFile: (" + file.getAbsoluteFile() + ")");
		System.out.println("INF: The filename (" + file.getName() + ")");
		filename = file.getName().split("\\.")[0];
		System.out.println("INF: The filename - ext (" + filename + ")");
		ext = file.getName().split("\\.")[1];
		System.out.println("INF: The filename ext only (" + ext + ")");

	}
	String tmp;

	public void resize(String value, String tag) throws IOException, InterruptedException {
		this.base = file.toString().split("\\.")[0];
		this.absoluteOutputFile = this.base + "_" + tag + "." + ext;
		System.out.println("INF: Base (" + base + ")");
		this.newfilename = this.absoluteOutputFile.split("clients/")[1];

		if (!tag.contains("cantResizeVid")) {
			StringBuilder sb = new StringBuilder();
			sb.append("convert");
			sb.append(" ");
			sb.append("-resize " + value);
			sb.append(" ");
			sb.append(file);
			sb.append(" ");
			sb.append(this.absoluteOutputFile);
			proc = Runtime.getRuntime().exec(sb.toString());
			proc.waitFor();
			System.out.println("INF: Executing Command (" + sb.toString() + ")");
		} else {
			this.absoluteOutputFile = this.base + "." + ext;
			this.newfilename = this.absoluteOutputFile.split("clients/")[1];
		}
	}

	public void resize2(String percentage) throws IOException, InterruptedException {
		StringBuilder sb2 = new StringBuilder();
		sb2.append("convert ");
		sb2.append("-resize 640x500 ");
		sb2.append(file + " ");
		sb2.append(filename + "_large." + ext);
		System.out.println("INF: Executing Command (" + sb2.toString() + ")");
		proc = Runtime.getRuntime().exec(sb2.toString());
		proc.waitFor();
	}

	public void resize3(String percentage) throws IOException, InterruptedException {
		StringBuilder sb3 = new StringBuilder();
		sb3.append("convert ");
		sb3.append("-resize 300x300 ");
		sb3.append(file + " ");
		sb3.append(filename + "_medium." + ext);
		System.out.println("INF: Executing Command (" + sb3.toString() + ")");
		proc = Runtime.getRuntime().exec(sb3.toString());
		proc.waitFor();
	}

	public void resize4(String percentage) throws IOException, InterruptedException {
		StringBuilder sb4 = new StringBuilder();
		sb4.append("convert ");
		sb4.append("-resize 150x150 ");
		sb4.append(file + " ");

	}

	public String getAbsoluteOutputFile() {
		return absoluteOutputFile;
	}

	public void setAbsoluteOutputFile(String absoluteOutputFile) {
		this.absoluteOutputFile = absoluteOutputFile;
	}

	public String getNewfilename() {
		return newfilename;
	}

	public void setNewfilename(String newfilename) {
		this.newfilename = newfilename;
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

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public String getBase() {
		return base;
	}

	public void setBase(String base) {
		this.base = base;
	}

}
