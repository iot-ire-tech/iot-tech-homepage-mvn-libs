/*
 *  This code, and its usage is subject to the sole authorization of IOT Tech.
 */
package servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author ae
 */
public class PropsReader {

	String propsFile;
	Properties env = new Properties();
	InputStream input = null;
	String key;

	public PropsReader init(String propsFile) {

		try {
			//	input = new FileInputStream(propsFile);
			input = PropsReader.class.getClassLoader().getResourceAsStream(propsFile);
			getEnv().load(input);

			return this;
		} catch (IOException ex) {
			Logger.getLogger(PropsReader.class.getName()).log(Level.SEVERE, null, ex);
		}

		return this;
	}

	public String getPropsFile() {
		return propsFile;
	}

	public void setPropsFile(String propsFile) {
		this.propsFile = propsFile;
	}

	public Properties getEnv() {
		return env;
	}

	public PropsReader setEnv(Properties env) {
		this.env = env;
		return this;
	}

	public String getVal() {
		System.out.println("INF: Prop: (" + key + ") : (" + getEnv().getProperty(key) + ")");
		return getEnv().getProperty(key);
	}

	public PropsReader setKey(String key) {
		this.key = key;
		return this;
	}

	public static void main(String[] args) {
		PropsReader p = new PropsReader();
		String path = "/media/ae/ssd-workspace/workspace/sw/projects/bookings/prototype-maven/src/main/resources/props";
		path = "../prototype-maven/src/main/resources/props";
		path = "";
		p.init("env.properties"); 	// No need to think about path!!!
		System.out.println(p.setKey("alias").getVal());
		System.out.println(p.setKey("subjectBooking").getVal());
		System.out.println(p.setKey("basePathJsonServer").getVal());

		// Method II : Reads from class path, root path , target/classes
//		try {
//			Properties configProperties = new Properties();
//			InputStream inputStream = PropsReader.class.getClassLoader().getResourceAsStream("env.properties");
//			configProperties.load(inputStream);
//			System.out.println(configProperties.getProperty("subjectBooking"));
//		} catch (Exception e) {
//			System.out.println("Could not load the file");
//			e.printStackTrace();
//		}
	}

}
