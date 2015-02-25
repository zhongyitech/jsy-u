package com.zhongyi.rest.manager;

import java.util.Map.Entry;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

public class FundManager extends Manager{
	private FundManager(){
		
	}
	
	public static final String KEY_NUMBER = "fundNo";
	public static final String KEY_ID = "id";
	public static final String KEY_FUND_KEY = "tr_key";
	
//	public static final String URL_FUND = "/api/guest/fund";
	public static final String URL_GET = "/api/fund/mainPage";
	public static final String URL_GET_ALL = "/api/fund";
	
	public static final String URL_ADD = "/api/fund/createfund";
	public static final String URL_UPDATE = "/api/fund/update";
	
	private static FundManager instance;
	
	public static synchronized FundManager getInstance(){
		if(instance == null){
			instance = new FundManager();
		}
		return instance;
	}
	
	public ManagerResponse get(String cookie, JSONObject params){
		String url = getServiceURL() + URL_GET;
		return super.post(cookie, url, params);
	}
	
	public ManagerResponse getAll(String cookie){
		JSONObject params = new JSONObject();
		String url = getServiceURL() + URL_GET_ALL;
        return super.get(cookie, url, params);
	}
	
	public ManagerResponse put(String cookie, JSONArray funds){
		JSONArray result = new JSONArray();
		Integer restStatus = ManagerResponse.OK;
		for (Object object : funds) {
			JSONObject fund = (JSONObject)object;
			Object number = fund.get(KEY_NUMBER);
			Object key  = fund.get(KEY_FUND_KEY);
			
			//没有id或编号则新增基金
			if(number == null){
				ManagerResponse response = add(cookie, fund);
				restStatus = response.status;
				JSONObject resultJSON = JSONObject.fromObject(response.response);
				if(resultJSON != null){
					fund = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
				}
			//有id或编号则更新基金
			}else{
				ManagerResponse response = update(cookie, fund);
				restStatus = response.status;
				JSONObject resultJSON = JSONObject.fromObject(response.response);
				if(resultJSON != null){
					fund = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
				}
			}
			fund.put(KEY_FUND_KEY, key);
			result.add(fund);
		}
		ManagerResponse response = new ManagerResponse();
		response.status = restStatus;
		
		JSONObject entity = new JSONObject();
		entity.put(ManagerResponse.REST_STATUS, ManagerResponse.STATUS_SUCCESS);
		entity.put(ManagerResponse.REST_RESULT, result);
		response.response = entity.toString();
        return response;
	}
	
	public ManagerResponse add(String cookie, JSONObject fund){
		String url = getServiceURL() + URL_ADD;
		ManagerResponse response = super.post(cookie, url, fund);
		JSONObject resultJSON = JSONObject.fromObject(response.response);
		
    	JSONObject result = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
		for (Object o : result.entrySet()) {
			Entry<String, Object> entry =  (Entry<String, Object>)o;
			if(entry.getValue() == JSONNull.getInstance()){
				entry.setValue("");
			}
		}
		JSONObject entity = new JSONObject();
		entity.put(ManagerResponse.REST_RESULT, result);
		response.response = entity.toString();
        return response;
	}
	
	public ManagerResponse update(String cookie, JSONObject fund){
		String url = getServiceURL() + URL_UPDATE;
		JSONObject params = new JSONObject();
		if(fund != null){
			params.put(KEY_ID, fund.get(KEY_ID));
		}
		ManagerResponse response = super.put(cookie, url, params, fund);
		JSONObject resultJSON = JSONObject.fromObject(response.response);
		JSONObject result = JSONObject.fromObject(resultJSON.get(ManagerResponse.REST_RESULT));
		for (Object o : result.entrySet()) {
			Entry<String, Object> entry =  (Entry<String, Object>)o;
			if(entry.getValue() == JSONNull.getInstance()){
				entry.setValue("");
			}
		}
		JSONObject entity = new JSONObject();
		entity.put(ManagerResponse.REST_RESULT, result);
		response.response = entity.toString();
        return response;
	}
}
