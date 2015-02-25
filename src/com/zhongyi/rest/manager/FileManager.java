package com.zhongyi.rest.manager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.tomcat.util.http.fileupload.DefaultFileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileItemFactory;
import org.apache.tomcat.util.http.fileupload.FileUpload;


public class FileManager {
	private FileManager(){
		
	}
	
	private static FileManager instance;
	private final String DIR_PATH = "/home/oswaldl/A_temp";
	private final String PATH_KEY = "filePath";
	private final String NAME_KEY = "fileName";
	private final String REQUEST_ENCODING = "UTF-8";
	private final String NOT_FOUND = "404";
	
	public static synchronized FileManager getInstance(){
		if(instance == null){
			instance = new FileManager();
		}
		return instance;
	}
	
	public ManagerResponse upload(HttpServletRequest request){
		ManagerResponse response = new ManagerResponse();
		JSONObject result = new JSONObject();
		response.status = ManagerResponse.OK;
		
		JSONArray files = new JSONArray();
        FileItemFactory factory = new DefaultFileItemFactory();
        FileUpload upload = new FileUpload(factory);
        upload.setHeaderEncoding(REQUEST_ENCODING);
        File directory = new File(DIR_PATH);
        directory.mkdirs();
        
        List<FileItem> items = new ArrayList<FileItem>();  
        try {
            items = upload.parseRequest(request);
            for (FileItem fileItem : items) {
            	if (!fileItem.isFormField()){
            		String filename = fileItem.getName();
            		if(filename != null && !("".equals(filename))) {
            			filename = filename.substring(filename.lastIndexOf(File.separator) + 1);
            			Long time = System.currentTimeMillis();
            			String filePath = DIR_PATH + File.separator + time;
            			InputStream is = fileItem.getInputStream();
            			FileOutputStream fos = new FileOutputStream(filePath);
            			byte[] buffer = new byte[1024];  
            			while (is.read(buffer) > 0) {  
            				fos.write(buffer, 0, buffer.length);  
            			}  
            			fos.flush();  
            			fos.close(); 
            			
            			JSONObject file = new JSONObject();
            			file.put(PATH_KEY, time);
            			file.put(NAME_KEY, filename);
            			files.add(file);
            		}
            	}
			}
        } catch (Exception e) {
        	e.printStackTrace();
        }
        result.put(ManagerResponse.REST_RESULT, files);
        result.put(ManagerResponse.REST_STATUS, ManagerResponse.STATUS_SUCCESS);
        response.response = result.toString();
        return response;
	}
	
	public String download(String path){
		File file = new File(DIR_PATH + File.separator + path);
		if(file.exists()){
			return file.getPath();
		}else{
			return DIR_PATH + File.separator + NOT_FOUND;
		}
	}
}
