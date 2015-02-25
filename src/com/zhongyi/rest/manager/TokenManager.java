package com.zhongyi.rest.manager;

import java.util.HashMap;
import java.util.Map;

public class TokenManager {
	private TokenManager(){
		
	}
	
	private static TokenManager instance;
	
	private Map<String, String> items;
	
	public static synchronized TokenManager getInstance(){
		if(instance == null){
			instance = new TokenManager();
		}
		return instance;
	}
	
	public  Map<String, String> getItems(){
		if(items == null){
			items = new HashMap<String, String>();
		}
		return items;
	}
	
	public String get(String cookie){
		return getItems().get(cookie);
	}
	
	public void put(String cookie, String token){
		getItems().put(cookie, token);
	}
	
	public void remove(String cookie){
		getItems().remove(cookie);
	}
}
