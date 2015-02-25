package com.zhongyi.rest.manager;

import net.sf.json.JSONObject;

public class YieldRangeManager extends Manager{
	
	public static final String URL_GET = "/api/yieldRange/getyieldrangebyid";
	
	public static final String ID_KEY = "id";
	
	private static YieldRangeManager instance;
	
	public static synchronized YieldRangeManager getInstance(){
		if(instance == null){
			instance = new YieldRangeManager();
		}
		return instance;
	}
	
	public ManagerResponse get(String cookie, String id){
		String url = getServiceURL() + URL_GET;
		JSONObject params = new JSONObject();
		params.put(ID_KEY, id);
		return super.get(cookie, url, params);
	}
}
