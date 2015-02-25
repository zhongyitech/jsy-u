package com.zhongyi.rest.manager;

import net.sf.json.JSONObject;

public class DepartmentManager extends Manager{
	private DepartmentManager(){
		
	}
	
	public static final String KEY_AUTHORITY = "authority";
	public static final String KEY_ID = "id";
	public static final String KEY_ITEM_KEY = "item_key";
	
	public static final String URL_GET_ALL = "/api/department";
	
	private static DepartmentManager instance;
	
	public static synchronized DepartmentManager getInstance(){
		if(instance == null){
			instance = new DepartmentManager();
		}
		return instance;
	}
	
	public ManagerResponse getAll(String cookie){
		String url = getServiceURL() + URL_GET_ALL;
		JSONObject params = new JSONObject();
        return super.get(cookie, url, params);
	}
}
