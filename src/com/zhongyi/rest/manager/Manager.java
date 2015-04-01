package com.zhongyi.rest.manager;

import java.util.Map.Entry;

import net.sf.json.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.codehaus.jackson.annotate.JsonValue;

import javax.servlet.http.HttpServletRequest;


public class Manager {
	public static final String STATUS = "status";
	public static final String ENTITY = "entity";
	public static final String ACCESS_TOKEN_RESPONSE = "access_token";
	public static final String ACCESS_TOKEN_REQUEST = "authorization";
	// public static final String ACCESS_TOKEN_REQUEST = "X-Auth-Token";

	public static final String ACCEPT_TYPE_KEY = "accept";
	public static final String ACCEPT_TYPE_VALUE = "application/json";

	public static final String CONTENT_TYPE_KEY = "Content-Type";
	public static final String CONTENT_TYPE_VALUE = "application/json;charset=UTF-8";

	public static final String CHARSET = "UTF-8";

	public String getServiceURL() {
//		return "http://192.168.1.59:18080/jsy-rest";
//		return "http://192.168.0.50:8080/jsy";
//		return "http://192.168.4.129:8080/jsy";
//		return "http://192.168.3.124:8080/jsy";
		//张佳
//		return "http://192.168.3.109:8080/jsy";
		//佳文
//		return "http://192.168.8.122:8080/jsy";
//		return "http://192.168.30.121:8080/jsy";
//		return "http://192.168.7.116:8080/jsy";
//		return "http://192.168.1.59:18080/jsy-rest";
//		return "http://192.168.0.37:8080/jsy";
//		return "http://127.0.0.1:18080/jsy-rest";
//		return "http://192.168.0.18:18080/jsy";
//		return "http://jsy-pc:18080/jsy-rest";
		return "http://localhost:8080/jsy";
	}

	public ManagerResponse get(String cookie, String url, JSONObject params) {
		ManagerResponse manageResponse = new ManagerResponse();
		HttpClient client = HttpClients.createDefault();
		StringBuffer paramUrl = new StringBuffer();
		for (Object o : params.entrySet()) {
			Entry<String, Object> entry = (Entry<String, Object>) o;
			if (paramUrl.length() == 0) {
				paramUrl.append("?");
			} else {
				paramUrl.append("&");
			}
			paramUrl.append(entry.getKey());
			paramUrl.append("=");
			paramUrl.append(entry.getValue());
		}
		HttpGet get = new HttpGet(url + paramUrl);
		String token = TokenManager.getInstance().get(cookie);
		if (token != null) {
			get.setHeader(ACCESS_TOKEN_REQUEST, token);
		}
		get.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
		get.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
		try {
			HttpResponse response = client.execute(get);
			manageResponse.status = response.getStatusLine().getStatusCode();
			manageResponse.response = toString(response.getEntity());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				get.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return manageResponse;
	}
	
	public ManagerResponse post(String cookie, String url, JSONObject params) {
		ManagerResponse manageResponse = new ManagerResponse();

		HttpClient client = HttpClients.createDefault();
		HttpPost post = new HttpPost(url);
		try {
			String token = TokenManager.getInstance().get(cookie);
			if (token != null) {
				post.setHeader(ACCESS_TOKEN_REQUEST, token);
			}
			post.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
			post.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);

			post.setEntity(new StringEntity(params.toString(), CHARSET));
			HttpResponse response = client.execute(post);
			manageResponse.status = response.getStatusLine().getStatusCode();
			manageResponse.response = toString(response.getEntity());
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				post.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return manageResponse;
	}
	
	public String toString(HttpEntity entity){
		String s = null;
		try {
			s = EntityUtils.toString(entity, CHARSET);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}
	
	public ManagerResponse post(String cookie, String url, JSONObject params, JSONObject entity) {
		ManagerResponse manageResponse = new ManagerResponse();
		CloseableHttpClient client = HttpClients.createDefault();
		StringBuffer paramUrl = new StringBuffer();
		for (Object o : params.entrySet()) {
			Entry<String, Object> entry = (Entry<String, Object>) o;
			if (paramUrl.length() == 0) {
				paramUrl.append("?");
			} else {
				paramUrl.append("&");
			}
			paramUrl.append(entry.getKey());
			paramUrl.append("=");
			paramUrl.append(String.valueOf(entry.getValue()));
		}
		HttpPost post = new HttpPost(url + paramUrl);
		try {
			String token = TokenManager.getInstance().get(cookie);
			if (token != null) {
				post.setHeader(ACCESS_TOKEN_REQUEST, token);
			}
			post.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
			post.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);

			post.setEntity(new StringEntity(entity.toString(), CHARSET));
			HttpResponse response = client.execute(post);
			manageResponse.status = response.getStatusLine().getStatusCode();
			String string = toString(response.getEntity());
			manageResponse.response = string;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				post.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return manageResponse;
	}
	
	public ManagerResponse put(String cookie, String url, JSONObject params, JSONObject entity) {
		ManagerResponse manageResponse = new ManagerResponse();
		HttpClient client = HttpClients.createDefault();
		StringBuffer paramUrl = new StringBuffer();
		if (params != null) {
			for (Object o : params.entrySet()) {
				Entry<String, Object> entry = (Entry<String, Object>) o;
				if (paramUrl.length() == 0) {
					paramUrl.append("?");
				} else {
					paramUrl.append("&");
				}
				paramUrl.append(entry.getKey());
				paramUrl.append("=");
				paramUrl.append(entry.getValue());
			}
		}
		HttpPut put = new HttpPut(url + paramUrl);

		try {
			String token = TokenManager.getInstance().get(cookie);
			if (token != null) {
				put.setHeader(ACCESS_TOKEN_REQUEST, token);
			}
			put.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
			put.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);

			put.setEntity(new StringEntity(entity.toString(), CHARSET));
			HttpResponse response = client.execute(put);
			manageResponse.status = response.getStatusLine().getStatusCode();
			String string = toString(response.getEntity());
			manageResponse.response = string;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				put.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return manageResponse;
	}
	
	public ManagerResponse delete(String cookie, String url, JSONObject params, JSONObject entity) {
		ManagerResponse manageResponse = new ManagerResponse();
		HttpClient client = HttpClients.createDefault();
		StringBuffer paramUrl = new StringBuffer();
		if (params != null) {
			for (Object o : params.entrySet()) {
				Entry<String, Object> entry = (Entry<String, Object>) o;
				if (paramUrl.length() == 0) {
					paramUrl.append("?");
				} else {
					paramUrl.append("&");
				}
				paramUrl.append(entry.getKey());
				paramUrl.append("=");
				paramUrl.append(entry.getValue());
			}
		}
		HttpDelete http = new HttpDelete(url + paramUrl);
		
		try {
			String token = TokenManager.getInstance().get(cookie);
			if (token != null) {
				http.setHeader(ACCESS_TOKEN_REQUEST, token);
			}
			http.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
			http.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
			
			HttpResponse response = client.execute(http);
			manageResponse.status = response.getStatusLine().getStatusCode();
			String string = toString(response.getEntity());
			manageResponse.response = string;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				http.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return manageResponse;
	}

/*	public Object toResponseValue(Object o) {
		if (o instanceof JSONNull) {
			return "";
		} else if (o instanceof JSONObject) {
			JSONObject json = (JSONObject) o;
			for (Object object : json.entrySet()) {
				Entry<String, Object> entry = (Entry<String, Object>) object;
				entry.setValue(toResponseValue(entry.getValue()));
			}
			return json;
		} else if (o instanceof JSONArray) {
			JSONArray array = new JSONArray();
			JSONArray json = (JSONArray) o;
			for (Object object : json) {
				array.add(toResponseValue(object));
			}
			return array;
		}
		return o;
	}

	public JSONObject toResponseEntity(JSONObject o) {
		for (Object object : o.entrySet()) {
			Entry<String, Object> entry = (Entry<String, Object>) object;
			entry.setValue(toResponseValue(entry.getValue()));
		}
		return o;
	}*/
}
