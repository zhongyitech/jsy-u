package com.zhongyi.rest.manager;

import net.sf.json.JSONObject;

public class UserManager extends Manager{
	private UserManager(){
		
	}
	
	public static final String KEY_AUTHORITY = "authority";
	public static final String KEY_ID = "id";
	public static final String KEY_ITEM_KEY = "item_key";
	
	public static final String URL_GET_ALL = "/api/user/findUserFromRole";
	public static final String URL_GET_ROLE_DEPARTMENT = "/api/user/findUserFromRoleAndDepartment";
	
	private static UserManager instance;
	
	public static synchronized UserManager getInstance(){
		if(instance == null){
			instance = new UserManager();
		}
		return instance;
	}
	
	public ManagerResponse getAll(String cookie){
		String url = getServiceURL() + URL_GET_ALL;
		JSONObject params = new JSONObject();
        return super.get(cookie, url, params);
	}
	
	public ManagerResponse get(String cookie, JSONObject params){
		String url = getServiceURL() + URL_GET_ROLE_DEPARTMENT;
		return super.get(cookie, url, params);
	}
}
