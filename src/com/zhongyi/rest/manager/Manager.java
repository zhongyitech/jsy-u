package com.zhongyi.rest.manager;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.Map.Entry;

import com.zhongyi.utils.Util;
import net.sf.json.JSONObject;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;
import org.apache.http.client.utils.URIBuilder;
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
	private CloseableHttpClient client = HttpClients.createDefault();

//	public static final String CHARSET = "UTF-8";
	public String getServiceURL() {
//		return "http://192.168.1.59:18080/jsy-rest";
		return "http://localhost:8080/jsy";
	}
	/**
	 * 执行请求
	 * @param httpUriRequest
	 * @param cookie
	 * @return
	 */
	private ManagerResponse execute(HttpUriRequest httpUriRequest,String cookie){
		ManagerResponse manageResponse = new ManagerResponse();
		try {
			String token = TokenManager.getInstance().get(cookie);
			if (token != null) {
				httpUriRequest.setHeader(ACCESS_TOKEN_REQUEST, token);
			}
			httpUriRequest.setHeader(CONTENT_TYPE_KEY, CONTENT_TYPE_VALUE);
			httpUriRequest.setHeader(ACCEPT_TYPE_KEY, ACCEPT_TYPE_VALUE);
			CloseableHttpResponse response  = client.execute(httpUriRequest);
			manageResponse.status = response.getStatusLine().getStatusCode();
			manageResponse.response = Util.toString(response.getEntity());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				httpUriRequest.abort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return manageResponse;
	}

	public ManagerResponse get(String cookie, String url, Map<String,Object> params) {
		HttpGet get = new HttpGet(Util.getURI(url,params));
		return execute(get,cookie);
	}
	
	public ManagerResponse post(String cookie, String url, Map<String,Object> params) {
		HttpPost post = new HttpPost(url);
		post.setEntity(Util.toEntity(params.toString()));
		return execute(post,cookie);
	}
	
	public ManagerResponse post(String cookie, String url, Map<String,Object> params, Object entity) {
		HttpPost post = new HttpPost(Util.getURI(url,params));
		post.setEntity(Util.toEntity(entity.toString()));
		return execute(post,cookie);
	}
	
	public ManagerResponse put(String cookie, String url, Map<String,Object> params, Object entity) {
		HttpPut put = new HttpPut(Util.getURI(url,params));
		put.setEntity(Util.toEntity(entity.toString()));
		return execute(put,cookie);
	}
	
	public ManagerResponse delete(String cookie, String url, Map<String,Object> params) {
		HttpDelete delete = new HttpDelete(Util.getURI(url,params));
		return execute(delete,cookie);
	}
}
