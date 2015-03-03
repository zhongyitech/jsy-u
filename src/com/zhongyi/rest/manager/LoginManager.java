package com.zhongyi.rest.manager;

import javax.ws.rs.core.Response.Status;

import net.sf.json.JSONObject;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

public class LoginManager extends Manager{
	private LoginManager(){
		
	}
	
	public static final String LOGIN_URL = "/api/login";
	public static final String USER_URL = "/api/user/getUser";
	
	public static final String USERNAME_KEY = "username";
	public static final String PASSWORD_KEY = "password";
	
	private static LoginManager instance;
	
	public static synchronized LoginManager getInstance(){
		if(instance == null){
			instance = new LoginManager();
		}
		return instance;
	}
	
	public ManagerResponse login(String cookie, String username, String password){
		ManagerResponse mr = new ManagerResponse();
        CloseableHttpClient client= HttpClients.createDefault();
        String url = getServiceURL() + LOGIN_URL;
        HttpPost post = new HttpPost(url);
        post.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
        try{
        	JSONObject entity = new JSONObject();
        	entity.put(USERNAME_KEY, username);
        	entity.put(PASSWORD_KEY, password);
        	post.setEntity(new StringEntity(entity.toString(), CHARSET));
            HttpResponse response = client.execute(post);
            mr.status = response.getStatusLine().getStatusCode();
            mr.response = toString(response.getEntity());
            if(mr.status == Status.OK.getStatusCode()){
            	JSONObject responseJSON = JSONObject.fromObject(mr.response);
            	TokenManager.getInstance().put(cookie, responseJSON.getString(ACCESS_TOKEN_RESPONSE));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            try {
            	post.abort();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        return mr;
	}
	
	public ManagerResponse logout(String cookie){
		ManagerResponse mr = new ManagerResponse();
		TokenManager.getInstance().remove(cookie);
		mr.status = ManagerResponse.OK;
		return mr;
	}
	
	public ManagerResponse getUser(String sesion){
		ManagerResponse mr = new ManagerResponse();

        CloseableHttpClient client= HttpClients.createDefault();
    	String url = getServiceURL() + USER_URL;
        HttpGet get = new HttpGet(url);
        String token = TokenManager.getInstance().get(sesion);
        if(token != null){
        	get.setHeader(ACCESS_TOKEN_REQUEST, token);
        }
        get.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
        get.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
        try{
            HttpResponse response = client.execute(get);
            mr.status = response.getStatusLine().getStatusCode();
            mr.response = toString(response.getEntity());
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            try {
            	get.abort();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return mr;
	}
}
