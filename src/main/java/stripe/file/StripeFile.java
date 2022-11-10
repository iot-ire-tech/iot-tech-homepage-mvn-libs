/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package stripe.file;

import com.stripe.exception.StripeException;
import com.stripe.model.File;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author ennisa
 */
public class StripeFile {

	public static void main() throws StripeException {

		File f;
		f = new File();
		f.setFilename("avatar.png");
		Map<String, Object> fileParams = new HashMap<String, Object>();
		fileParams.put("purpose", "dispute_evidence");
		fileParams.put("file", f);
		File.create(fileParams);
	}
}
