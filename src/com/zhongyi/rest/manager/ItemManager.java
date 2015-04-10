package com.zhongyi.rest.manager;

import java.util.Map;

public class ItemManager extends Manager{
	private ItemManager(){
		
	}
	
	private static ItemManager instance;
	
	public static synchronized ItemManager getInstance(){
		if(instance == null){
			instance = new ItemManager();
		}
		return instance;
	}
	
	public ManagerResponse get(String cookie, String url, Map<String,Object> params){
		url = getServiceURL() + url;
		return super.get(cookie, url, params);
	}
	
	public ManagerResponse post(String cookie, String url, Map<String,Object> params, Object entity){
		url = getServiceURL() + url;
		return super.post(cookie, url, params, entity);
	}
	
	public ManagerResponse put(String cookie, String url, Map<String,Object> params, Object entity){
		url = getServiceURL() + url;
		return super.put(cookie, url, params, entity);
	}
	
	public ManagerResponse delete(String cookie, String url, Map<String,Object> params){
		url = getServiceURL() + url;
		return super.delete(cookie, url, params);
	}
}
