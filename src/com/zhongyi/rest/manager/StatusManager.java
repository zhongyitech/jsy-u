package com.zhongyi.rest.manager;

import net.sf.json.JSONObject;

public class StatusManager extends Manager{
	
	public static final String URL_GET = "/api/typeConfig/type";
	
	public static final String PARAMS_TYPE = "type";
	
	private static StatusManager instance;
	
	public static synchronized StatusManager getInstance(){
		if(instance == null){
			instance = new StatusManager();
		}
		return instance;
	}
	
	
	public ManagerResponse get(String cookie, String type){
		String url = getServiceURL() + URL_GET;
		JSONObject params = new JSONObject();
		params.put(PARAMS_TYPE, type);
        return super.get(cookie, url, params);
	}
}
